/**
 * ADVANCED AUDIO ENGINE
 */
class AudioEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);
        
        // Pre-generate noise for live playback
        this.liveNoiseBuffer = this.createNoiseBuffer(this.ctx);
        
        // Caches
        this.shaperCache = {};
    }

    resume() {
        if (this.ctx.state === 'suspended') this.ctx.resume();
    }

    createNoiseBuffer(ctx) {
        const bufferSize = ctx.sampleRate * 2; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        return buffer;
    }

    // --- CUSTOM WAVE GENERATORS (Context Agnostic) ---

    getTrapezoidWave(ctx, sharpness) {
        const numCoeffs = 64;
        const real = new Float32Array(numCoeffs);
        const imag = new Float32Array(numCoeffs);
        for (let i = 1; i < numCoeffs; i += 2) {
            const sq = 1 / i;
            const tri = 1 / (i * i);
            imag[i] = sq * (1 - sharpness) + tri * sharpness;
        }
        return ctx.createPeriodicWave(real, imag);
    }

    getOrganWave(ctx) {
        const real = new Float32Array([0, 0, 0, 0, 0, 0]); 
        const imag = new Float32Array([0, 1, 0.8, 0.6, 0.4, 0.2]); 
        return ctx.createPeriodicWave(real, imag);
    }

    getMetallicWave(ctx) {
        const num = 32;
        const real = new Float32Array(num);
        const imag = new Float32Array(num);
        for(let i=1; i<num; i++) {
            if (i % 2 !== 0 && i > 5) imag[i] = 0.5;
            if (i === 1) imag[i] = 1;
        }
        return ctx.createPeriodicWave(real, imag);
    }

    getPulseWave(ctx) {
        const num = 64;
        const real = new Float32Array(num);
        const imag = new Float32Array(num);
        for (let i = 1; i < num; i++) {
            imag[i] = (2 / (i * Math.PI)) * Math.sin(i * Math.PI * 0.25);
        }
        return ctx.createPeriodicWave(real, imag);
    }

    getBassoonWave(ctx) {
        const real = new Float32Array(10).fill(0);
        const imag = new Float32Array([0, 1.0, 0.2, 0.8, 0.1, 0.4, 0.1, 0.2, 0.0, 0.1]);
        return ctx.createPeriodicWave(real, imag);
    }

    // --- WAVESHAPERS (Cached, Context Agnostic) ---

    getPowerCurve(amount) {
        const key = `pow_${amount}`;
        if (this.shaperCache[key]) return this.shaperCache[key];
        const n_samples = 256;
        const curve = new Float32Array(n_samples);
        let exponent = 1;
        if (amount < 0.5) exponent = 0.1 + (amount * 1.8);
        else exponent = 1.0 + ((amount - 0.5) * 4);
        for (let i = 0; i < n_samples; ++i ) {
            let x = i * 2 / n_samples - 1;
            curve[i] = Math.sign(x) * Math.pow(Math.abs(x), exponent);
        }
        this.shaperCache[key] = curve;
        return curve;
    }

    getBitCrushCurve(amount) {
        const key = `crush_${amount}`;
        if (this.shaperCache[key]) return this.shaperCache[key];
        const n_samples = 256;
        const curve = new Float32Array(n_samples);
        const steps = 1 + (amount * 15); 
        for (let i = 0; i < n_samples; ++i ) {
            let x = i * 2 / n_samples - 1;
            curve[i] = Math.round(x * steps) / steps;
        }
        this.shaperCache[key] = curve;
        return curve;
    }

    getFoldbackCurve(amount) {
        const key = `fold_${amount}`;
        if (this.shaperCache[key]) return this.shaperCache[key];
        const n_samples = 1024;
        const curve = new Float32Array(n_samples);
        const drive = 1 + (amount * 5);
        for (let i = 0; i < n_samples; ++i ) {
            let x = i * 2 / n_samples - 1;
            curve[i] = Math.sin(x * drive * (Math.PI / 2));
        }
        this.shaperCache[key] = curve;
        return curve;
    }

    // --- SCHEDULING LOGIC (Works for Live & Offline) ---

    scheduleTone(ctx, destination, params) {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // 1. Setup Waveform
        if (['sine', 'square', 'sawtooth', 'triangle'].includes(params.wave)) {
            osc.type = params.wave;
        } 
        else if (params.wave === 'trapezoid') osc.setPeriodicWave(this.getTrapezoidWave(ctx, params.shapeParam));
        else if (params.wave === 'organ') osc.setPeriodicWave(this.getOrganWave(ctx));
        else if (params.wave === 'metal') osc.setPeriodicWave(this.getMetallicWave(ctx));
        else if (params.wave === 'pulse25') osc.setPeriodicWave(this.getPulseWave(ctx));
        else if (params.wave === 'bassoon') osc.setPeriodicWave(this.getBassoonWave(ctx));
        else if (['powersine', 'bitcrush', 'foldback'].includes(params.wave)) {
            osc.type = 'sine';
        }

        // 2. Frequency
        osc.frequency.setValueAtTime(params.start, t);
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, params.end), t + params.dur);

        // 3. FM
        if (params.fmActive) {
            const modulator = ctx.createOscillator();
            const modGain = ctx.createGain();
            modulator.frequency.setValueAtTime(params.start * params.fmRatio, t);
            modulator.frequency.exponentialRampToValueAtTime(params.end * params.fmRatio, t + params.dur);
            modGain.gain.value = params.fmDepth;
            modulator.connect(modGain);
            modGain.connect(osc.frequency);
            modulator.start();
            modulator.stop(t + params.dur);
        }

        // 4. Routing
        let outputNode = osc;
        if (params.wave === 'powersine') {
            const shaper = ctx.createWaveShaper();
            shaper.curve = this.getPowerCurve(params.shapeParam);
            osc.connect(shaper);
            outputNode = shaper;
        } else if (params.wave === 'bitcrush') {
            const shaper = ctx.createWaveShaper();
            shaper.curve = this.getBitCrushCurve(params.shapeParam);
            osc.connect(shaper);
            outputNode = shaper;
        } else if (params.wave === 'foldback') {
            const shaper = ctx.createWaveShaper();
            shaper.curve = this.getFoldbackCurve(params.shapeParam);
            osc.connect(shaper);
            outputNode = shaper;
        }

        // 5. Volume
        gain.gain.setValueAtTime(params.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);

        outputNode.connect(gain);
        gain.connect(destination);

        osc.start();
        osc.stop(t + params.dur);
    }

    scheduleNoise(ctx, destination, params, noiseBuffer) {
        const t = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(params.filter, t);
        filter.frequency.exponentialRampToValueAtTime(10, t + params.dur);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(params.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(destination);
        src.start();
        src.stop(t + params.dur);
    }

    // --- PUBLIC PLAYBACK ---

    playTone(params) {
        this.scheduleTone(this.ctx, this.masterGain, params);
    }

    playNoise(params) {
        this.scheduleNoise(this.ctx, this.masterGain, params, this.liveNoiseBuffer);
    }

    // --- EXPORT TO WAV ---

    async renderAndDownload(sound) {
        // 1. Calculate total duration
        let maxDur = 0;
        sound.layers.forEach(l => {
            if (l.active !== false && l.dur > maxDur) maxDur = l.dur;
        });
        if (maxDur === 0) return;

        // Add a small tail for release
        const renderDur = maxDur + 0.1;
        const sampleRate = 44100;

        // 2. Create Offline Context
        const offlineCtx = new OfflineAudioContext(1, sampleRate * renderDur, sampleRate);
        
        // 3. Create a noise buffer specifically for this context (cannot share buffers across contexts easily)
        const offlineNoiseBuffer = this.createNoiseBuffer(offlineCtx);

        // 4. Schedule all layers
        sound.layers.forEach(l => {
            if (l.active !== false) {
                if (l.type === 'tone') {
                    this.scheduleTone(offlineCtx, offlineCtx.destination, l);
                } else {
                    this.scheduleNoise(offlineCtx, offlineCtx.destination, l, offlineNoiseBuffer);
                }
            }
        });

        // 5. Render
        const renderedBuffer = await offlineCtx.startRendering();

        // 6. Encode to WAV
        const wavBlob = this.bufferToWav(renderedBuffer, renderDur * sampleRate);
        
        // 7. Download
        const url = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (sound.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + '.wav';
        a.click();
    }

    bufferToWav(abuffer, len) {
        const numOfChan = abuffer.numberOfChannels;
        const length = len * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let i;
        let sample;
        let offset = 0;
        let pos = 0;

        // write WAVE header
        setUint32(0x46464952);                         // "RIFF"
        setUint32(length - 8);                         // file length - 8
        setUint32(0x45564157);                         // "WAVE"

        setUint32(0x20746d66);                         // "fmt " chunk
        setUint32(16);                                 // length = 16
        setUint16(1);                                  // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2);                      // block-align
        setUint16(16);                                 // 16-bit (hardcoded in this encoder)

        setUint32(0x61746164);                         // "data" - chunk
        setUint32(length - pos - 4);                   // chunk length

        // write interleaved data
        for(i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while(pos < length) {
            for(i = 0; i < numOfChan; i++) {             // interleave channels
                sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
                view.setInt16(pos, sample, true);          // write 16-bit sample
                pos += 2;
            }
            offset++;                                     // next source sample
        }

        return new Blob([buffer], {type: "audio/wav"});

        function setUint16(data) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data) {
            view.setUint32(pos, data, true);
            pos += 4;
        }
    }
}

/**
 * APP LOGIC
 */
class App {
    constructor() {
        this.audio = new AudioEngine();
        this.sounds = [];
        this.selectedId = null;
        this.collapsedGroups = new Set();
        this.collapsedSubgroups = new Set();
        this.loopTimer = null;
        this.isLooping = false;
        this.loopInterval = 200;

        this.loadDefaults();
        this.renderList();
        window.addEventListener('click', () => this.audio.resume(), { once: true });
    }

    loadDefaults() {
        if (typeof DEFAULT_SOUNDS !== 'undefined') {
            this.sounds = JSON.parse(JSON.stringify(DEFAULT_SOUNDS));
        } else {
            this.sounds = [];
        }
        if (this.sounds.length > 0) this.selectedId = this.sounds[0].id;
    }

    // --- DATA ---
    addNewSound() {
        const id = 'sound_' + Date.now();
        this.sounds.push({
            id: id,
            name: 'New - Category - Sound',
            desc: 'Description...',
            layers: [{ 
                type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5,
                shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100
            }]
        });
        this.selectedId = id;
        this.renderList();
        this.renderEditor();
    }

    duplicateSound() {
        if (!this.selectedId) return;
        const original = this.sounds.find(s => s.id === this.selectedId);
        const copy = JSON.parse(JSON.stringify(original));
        copy.id = 'sound_' + Date.now();
        copy.name = copy.name + ' (Copy)';
        this.sounds.push(copy);
        this.selectedId = copy.id;
        this.renderList();
        this.renderEditor();
    }

    deleteCurrentSound() {
        if (!this.selectedId || !confirm('Delete sound?')) return;
        this.sounds = this.sounds.filter(s => s.id !== this.selectedId);
        this.selectedId = this.sounds.length ? this.sounds[0].id : null;
        this.renderList();
        this.renderEditor();
    }

    addLayer(type) {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (!sound) return;
        if (type === 'tone') {
            sound.layers.push({ 
                type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5,
                shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100
            });
        } else {
            sound.layers.push({ type: 'noise', active: true, dur: 0.2, vol: 0.5, filter: 1000 });
        }
        this.renderEditor();
    }

    removeLayer(index) {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (sound) {
            sound.layers.splice(index, 1);
            this.renderEditor();
        }
    }

    importLayers() {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (!sound) return;
        const textarea = document.getElementById('layerDataInput');
        if (!textarea) return;

        const text = textarea.value;
        const lines = text.split('\n');
        let addedCount = 0;

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;
            try {
                const layer = JSON.parse(line);
                if (layer.type && (layer.type === 'tone' || layer.type === 'noise')) {
                    layer.active = true;
                    sound.layers.push(layer);
                    addedCount++;
                }
            } catch (e) { console.log('Skipping invalid line'); }
        });

        if (addedCount > 0) {
            this.renderEditor();
            alert(`Imported ${addedCount} layers.`);
        } else {
            alert('No valid layer data found to import.');
        }
    }

    updateSoundProp(key, value) {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (sound) {
            sound[key] = value;
            if (key === 'name') this.renderList();
            this.generateCode();
        }
    }

    updateLayer(index, key, value) {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (sound && sound.layers[index]) {
            if (['start', 'end', 'dur', 'vol', 'filter', 'shapeParam', 'fmRatio', 'fmDepth'].includes(key)) {
                value = parseFloat(value);
            }
            sound.layers[index][key] = value;
            
            if (key === 'active' || key === 'wave' || key === 'fmActive') this.renderEditor();
            else {
                this.generateCode();
                this.updateLayerDataBox();
            }
        }
    }

    updateLayerDataBox() {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        const box = document.getElementById('layerDataInput');
        if (sound && box) {
            const lines = sound.layers.map(l => JSON.stringify(l));
            box.value = lines.join('\n');
        }
    }

    // --- PLAYBACK & EXPORT ---
    playSound(specificId = null) {
        const idToPlay = specificId || this.selectedId;
        const sound = this.sounds.find(s => s.id === idToPlay);
        if (!sound) return;
        
        this.audio.resume();
        sound.layers.forEach(l => {
            if (l.active !== false) {
                if (l.type === 'tone') this.audio.playTone(l);
                else this.audio.playNoise(l);
            }
        });
    }

    downloadWav() {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (!sound) return;
        this.audio.renderAndDownload(sound);
    }

    toggleLoop() {
        this.isLooping ? this.stopLoop() : this.startLoop();
        this.renderEditor();
    }

    startLoop() {
        if (this.isLooping) return;
        this.isLooping = true;
        this.playSound();
        this.loopTimer = setInterval(() => this.playSound(), this.loopInterval);
    }

    stopLoop() {
        this.isLooping = false;
        clearInterval(this.loopTimer);
    }

    updateLoopInterval(val) {
        this.loopInterval = parseInt(val);
        document.getElementById('loopVal').innerText = this.loopInterval;
        if (this.isLooping) {
            clearInterval(this.loopTimer);
            this.loopTimer = setInterval(() => this.playSound(), this.loopInterval);
        }
    }

    // --- UI RENDERING ---
    collapseAll() {
        const groups = {};
        this.sounds.forEach(s => {
            const parts = s.name.split(' - ');
            const cat = parts[0] || 'Uncategorized';
            const sub = parts.length > 2 ? parts[1] : 'General';
            this.collapsedGroups.add(cat);
            this.collapsedSubgroups.add(`${cat}|${sub}`);
        });
        this.renderList();
    }

    renderList() {
        const list = document.getElementById('soundList');
        list.innerHTML = '';
        const tree = {};
        this.sounds.forEach(s => {
            const parts = s.name.split(' - ');
            const cat = parts[0] || 'Uncategorized';
            const sub = parts.length > 2 ? parts[1] : 'General';
            const name = parts.length > 2 ? parts.slice(2).join(' - ') : (parts[1] || parts[0]);
            if (!tree[cat]) tree[cat] = {};
            if (!tree[cat][sub]) tree[cat][sub] = [];
            tree[cat][sub].push({ ...s, displayName: name });
        });

        Object.keys(tree).sort().forEach(cat => {
            const catHeader = document.createElement('div');
            const isCatCollapsed = this.collapsedGroups.has(cat);
            catHeader.className = `category-header ${isCatCollapsed ? 'collapsed' : ''}`;
            catHeader.innerHTML = `<span class="arrow">▼</span> ${cat}`;
            catHeader.onclick = () => {
                isCatCollapsed ? this.collapsedGroups.delete(cat) : this.collapsedGroups.add(cat);
                this.renderList();
            };
            list.appendChild(catHeader);

            if (!isCatCollapsed) {
                Object.keys(tree[cat]).sort().forEach(sub => {
                    const subKey = `${cat}|${sub}`;
                    const isSubCollapsed = this.collapsedSubgroups.has(subKey);
                    const subHeader = document.createElement('div');
                    subHeader.className = `subgroup-header ${isSubCollapsed ? 'collapsed' : ''}`;
                    subHeader.innerHTML = `<span class="arrow">▼</span> ${sub}`;
                    subHeader.onclick = () => {
                        isSubCollapsed ? this.collapsedSubgroups.delete(subKey) : this.collapsedSubgroups.add(subKey);
                        this.renderList();
                    };
                    list.appendChild(subHeader);

                    if (!isSubCollapsed) {
                        tree[cat][sub].forEach(s => {
                            const el = document.createElement('div');
                            el.className = `sound-item ${s.id === this.selectedId ? 'active' : ''}`;
                            
                            const nameSpan = document.createElement('span');
                            nameSpan.innerText = s.displayName;
                            el.appendChild(nameSpan);

                            const playBtn = document.createElement('button');
                            playBtn.className = 'btn btn-green btn-sm';
                            playBtn.innerText = '▶';
                            playBtn.style.marginLeft = '10px';
                            playBtn.onclick = (e) => {
                                e.stopPropagation();
                                this.audio.resume();
                                this.playSound(s.id);
                            };
                            el.appendChild(playBtn);

                            el.onclick = () => {
                                this.selectedId = s.id;
                                this.stopLoop();
                                this.renderList();
                                this.renderEditor();
                            };
                            list.appendChild(el);
                        });
                    }
                });
            }
        });
    }

    renderEditor() {
        const container = document.getElementById('editor');
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (!sound) return container.innerHTML = '';

        let layersHtml = '';
        sound.layers.forEach((l, idx) => {
            const isActive = l.active !== false;
            const activeClass = isActive ? '' : 'disabled';
            const checked = isActive ? 'checked' : '';

            if (l.type === 'tone') {
                let shapeControl = '';
                if (['trapezoid', 'powersine', 'bitcrush', 'foldback'].includes(l.wave)) {
                    let label = 'Param';
                    if (l.wave === 'trapezoid') label = 'Sharpness';
                    if (l.wave === 'powersine') label = 'Power';
                    if (l.wave === 'bitcrush') label = 'Crush';
                    if (l.wave === 'foldback') label = 'Drive';
                    
                    shapeControl = `
                        <div class="control-group">
                            <label>${label} <span class="val-display">${l.shapeParam}</span></label>
                            <input type="range" min="0" max="1" step="0.05" value="${l.shapeParam}" 
                                oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'shapeParam', this.value)">
                        </div>
                    `;
                }

                const fmChecked = l.fmActive ? 'checked' : '';
                const fmDisplay = l.fmActive ? 'grid' : 'none';

                layersHtml += `
                <div class="layer-card type-tone ${activeClass}">
                    <div class="layer-header">
                        <span>TONE LAYER ${idx+1}</span>
                        <div class="layer-actions">
                            <label class="toggle-label">
                                <input type="checkbox" ${fmChecked} onchange="app.updateLayer(${idx}, 'fmActive', this.checked)"> FM
                            </label>
                            <label class="toggle-label">
                                <input type="checkbox" ${checked} onchange="app.updateLayer(${idx}, 'active', this.checked)"> ACTIVE
                            </label>
                            <button class="btn btn-red btn-sm" onclick="app.removeLayer(${idx})">X</button>
                        </div>
                    </div>
                    <div class="layer-controls">
                        <div class="control-group">
                            <label>Waveform</label>
                            <select onchange="app.updateLayer(${idx}, 'wave', this.value)">
                                <optgroup label="Standard">
                                    <option value="sine" ${l.wave==='sine'?'selected':''}>Sine</option>
                                    <option value="square" ${l.wave==='square'?'selected':''}>Square</option>
                                    <option value="sawtooth" ${l.wave==='sawtooth'?'selected':''}>Sawtooth</option>
                                    <option value="triangle" ${l.wave==='triangle'?'selected':''}>Triangle</option>
                                </optgroup>
                                <optgroup label="Advanced">
                                    <option value="trapezoid" ${l.wave==='trapezoid'?'selected':''}>Trapezoid</option>
                                    <option value="organ" ${l.wave==='organ'?'selected':''}>Organ</option>
                                    <option value="metal" ${l.wave==='metal'?'selected':''}>Metallic</option>
                                    <option value="pulse25" ${l.wave==='pulse25'?'selected':''}>Pulse 25% (NES)</option>
                                    <option value="bassoon" ${l.wave==='bassoon'?'selected':''}>Bassoon (Heavy)</option>
                                </optgroup>
                                <optgroup label="Shapers">
                                    <option value="powersine" ${l.wave==='powersine'?'selected':''}>Power Sine</option>
                                    <option value="bitcrush" ${l.wave==='bitcrush'?'selected':''}>BitCrush</option>
                                    <option value="foldback" ${l.wave==='foldback'?'selected':''}>Wavefolder</option>
                                </optgroup>
                            </select>
                        </div>
                        ${shapeControl}
                        <div class="control-group">
                            <label>Start Hz <span class="val-display">${l.start}</span></label>
                            <input type="range" min="50" max="3000" step="10" value="${l.start}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'start', this.value)">
                        </div>
                        <div class="control-group">
                            <label>End Hz <span class="val-display">${l.end}</span></label>
                            <input type="range" min="10" max="3000" step="10" value="${l.end}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'end', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Duration <span class="val-display">${l.dur}</span></label>
                            <input type="range" min="0.01" max="1.0" step="0.01" value="${l.dur}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'dur', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Volume <span class="val-display">${l.vol}</span></label>
                            <input type="range" min="0" max="1" step="0.05" value="${l.vol}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'vol', this.value)">
                        </div>
                    </div>
                    
                    <div class="fm-section" style="display:${fmDisplay}">
                        <div class="fm-grid">
                            <div class="control-group">
                                <label>FM Ratio <span class="val-display">${l.fmRatio}x</span></label>
                                <input type="range" min="0.5" max="10" step="0.1" value="${l.fmRatio}" oninput="this.previousElementSibling.children[0].innerText=this.value+'x'; app.updateLayer(${idx}, 'fmRatio', this.value)">
                            </div>
                            <div class="control-group">
                                <label>FM Depth <span class="val-display">${l.fmDepth}</span></label>
                                <input type="range" min="0" max="2000" step="10" value="${l.fmDepth}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'fmDepth', this.value)">
                            </div>
                        </div>
                    </div>
                </div>`;
            } else {
                layersHtml += `
                <div class="layer-card type-noise ${activeClass}">
                    <div class="layer-header">
                        <span>NOISE LAYER ${idx+1}</span>
                        <div class="layer-actions">
                            <label class="toggle-label">
                                <input type="checkbox" ${checked} onchange="app.updateLayer(${idx}, 'active', this.checked)"> ACTIVE
                            </label>
                            <button class="btn btn-red btn-sm" onclick="app.removeLayer(${idx})">X</button>
                        </div>
                    </div>
                    <div class="layer-controls">
                        <div class="control-group">
                            <label>Filter Hz <span class="val-display">${l.filter}</span></label>
                            <input type="range" min="100" max="8000" step="100" value="${l.filter}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'filter', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Duration <span class="val-display">${l.dur}</span></label>
                            <input type="range" min="0.01" max="1.0" step="0.01" value="${l.dur}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'dur', this.value)">
                        </div>
                        <div class="control-group">
                            <label>Volume <span class="val-display">${l.vol}</span></label>
                            <input type="range" min="0" max="1" step="0.05" value="${l.vol}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'vol', this.value)">
                        </div>
                    </div>
                </div>`;
            }
        });

        container.innerHTML = `
            <div class="editor-header">
                <div class="header-inputs">
                    <input type="text" value="${sound.name}" oninput="app.updateSoundProp('name', this.value)">
                    <textarea placeholder="Description..." oninput="app.updateSoundProp('desc', this.value)">${sound.desc}</textarea>
                </div>
                <div class="play-controls">
                    <button class="play-btn ${this.isLooping?'playing':''}" onclick="app.toggleLoop()">${this.isLooping?'STOP':'PLAY<br>LOOP'}</button>
                    <button class="download-btn" onclick="app.downloadWav()">DOWNLOAD WAV</button>
                    <div style="text-align:center; margin-top:5px;">
                        <span id="loopVal" style="color:var(--accent); font-weight:bold;">${this.loopInterval}</span> ms
                        <input type="range" min="50" max="1000" step="10" value="${this.loopInterval}" style="width:100%" oninput="app.updateLoopInterval(this.value)">
                    </div>
                </div>
            </div>

            <div class="data-exchange">
                <h4>Layer Data Exchange (Copy/Paste Lines)</h4>
                <textarea id="layerDataInput" placeholder="Paste layer data here..."></textarea>
                <div class="data-exchange-controls">
                    <button class="btn btn-blue btn-sm" onclick="app.importLayers()">IMPORT LAYERS</button>
                </div>
            </div>

            <div class="layers-container">${layersHtml}</div>
            <div class="add-buttons">
                <button class="btn btn-blue" onclick="app.addLayer('tone')">+ ADD TONE</button>
                <button class="btn btn-orange" onclick="app.addLayer('noise')">+ ADD NOISE</button>
            </div>
            <div class="code-block">
                <button class="btn btn-gray btn-sm copy-btn" onclick="app.copyCode()">COPY JSON</button>
                <div id="codeOutput"></div>
            </div>
        `;
        this.generateCode();
        this.updateLayerDataBox();
    }

    generateCode() {
        const sound = this.sounds.find(s => s.id === this.selectedId);
        if (!sound) return;
        const cleanData = {
            name: sound.name,
            layers: sound.layers.filter(l => l.active !== false).map(l => {
                const copy = {...l};
                delete copy.active;
                return copy;
            })
        };
        document.getElementById('codeOutput').innerText = JSON.stringify(cleanData, null, 4);
    }

    copyCode() {
        const code = document.getElementById('codeOutput').innerText;
        navigator.clipboard.writeText(code).then(() => alert('JSON Data Copied!'));
    }

    saveLibrary() {
        const data = JSON.stringify(this.sounds, null, 2);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'game_sounds_v2.json';
        a.click();
    }

    loadLibrary(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.sounds = JSON.parse(e.target.result);
                this.selectedId = this.sounds[0]?.id;
                this.renderList();
                this.renderEditor();
            } catch(err) { alert('Error loading file'); }
        };
        reader.readAsText(file);
        input.value = '';
    }

    resetLibrary() {
        if(confirm("Reset to defaults?")) {
            this.stopLoop();
            this.loadDefaults();
            this.renderList();
            this.renderEditor();
        }
    }
}

const app = new App();