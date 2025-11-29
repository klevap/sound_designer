/**
 * MUSIC UTILITIES
 * Converts note strings (C4, F#3) to frequencies.
 */
const MusicUtils = {
    A4: 440,
    NOTES: { "C": -9, "C#": -8, "D": -7, "D#": -6, "E": -5, "F": -4, "F#": -3, "G": -2, "G#": -1, "A": 0, "A#": 1, "B": 2 },

    noteToFreq(noteStr) {
        if (!noteStr || noteStr === '-' || noteStr === '.') return null;
        
        const regex = /^([A-G]#?)(\d)$/;
        const match = noteStr.match(regex);
        if (!match) return null;

        const note = match[1];
        const octave = parseInt(match[2]);
        
        // Calculate semitones relative to A4
        const semitones = this.NOTES[note] + (octave - 4) * 12;
        
        // f = 440 * 2^(n/12)
        return this.A4 * Math.pow(2, semitones / 12);
    }
};

/**
 * AUDIO ENGINE
 * Handles both Sound Synthesis (Layers, FM, Custom Waves) and Music Sequencing.
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

        // Sequencer State
        this.isPlayingMusic = false;
        this.musicTimer = null;
        this.nextNoteTime = 0;
        this.currentStep = 0;
        this.currentMelody = null;
        this.soundLibrary = [];
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

    // --- CUSTOM WAVE GENERATORS ---

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

    // --- WAVESHAPERS ---

    getPowerCurve(amount) {
        const key = `pow_${amount}`;
        if (this.shaperCache[key]) return this.shaperCache[key];
        const n_samples = 256;
        const curve = new Float32Array(n_samples);
        let exponent = amount < 0.5 ? 0.1 + (amount * 1.8) : 1.0 + ((amount - 0.5) * 4);
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

    // --- SCHEDULING LOGIC ---

    scheduleTone(ctx, dest, params, when) {
        const t = when;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Waveform
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

        // Frequency
        osc.frequency.setValueAtTime(params.start, t);
        if (params.start !== params.end) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(1, params.end), t + params.dur);
        }

        // FM
        if (params.fmActive) {
            const modulator = ctx.createOscillator();
            const modGain = ctx.createGain();
            modulator.frequency.setValueAtTime(params.start * params.fmRatio, t);
            if (params.start !== params.end) {
                modulator.frequency.exponentialRampToValueAtTime(params.end * params.fmRatio, t + params.dur);
            }
            modGain.gain.value = params.fmDepth;
            modulator.connect(modGain);
            modGain.connect(osc.frequency);
            modulator.start(t);
            modulator.stop(t + params.dur);
        }

        // Routing & Shapers
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

        // Volume Envelope
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(params.vol, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);

        outputNode.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + params.dur);
    }

    scheduleNoise(ctx, dest, params, buffer, when) {
        const t = when;
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(params.filter, t);
        filter.frequency.exponentialRampToValueAtTime(10, t + params.dur);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(params.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        src.start(t);
        src.stop(t + params.dur);
    }

    // --- PLAYBACK METHODS ---

    // Play a sound effect (one-shot)
    playSound(soundDef, when = 0) {
        const t = when || this.ctx.currentTime;
        soundDef.layers.forEach(l => {
            if (l.active !== false) {
                if (l.type === 'tone') this.scheduleTone(this.ctx, this.masterGain, l, t);
                else this.scheduleNoise(this.ctx, this.masterGain, l, this.liveNoiseBuffer, t);
            }
        });
    }

    // Play a sound as a musical note (overriding frequency)
    playNote(soundDef, freq, when, duration, volumeScale = 1.0) {
        const t = when;
        soundDef.layers.forEach(l => {
            if (l.active === false) return;
            
            // Clone layer params to modify them
            const p = { ...l };
            p.vol *= volumeScale;

            if (p.type === 'tone') {
                // Override pitch for tonal layers
                p.start = freq;
                p.end = freq;
                p.dur = duration; 
                this.scheduleTone(this.ctx, this.masterGain, p, t);
            } else {
                // For noise layers (percussion), usually keep original pitch/filter
                // but respect duration/volume
                this.scheduleNoise(this.ctx, this.masterGain, p, this.liveNoiseBuffer, t);
            }
        });
    }

    // --- SEQUENCER ---

    playMusic(melody, soundLibrary) {
        if (this.isPlayingMusic) this.stopMusic();
        
        this.currentMelody = melody;
        this.soundLibrary = soundLibrary;
        this.isPlayingMusic = true;
        this.currentStep = 0;
        this.nextNoteTime = this.ctx.currentTime + 0.1;
        
        this.scheduler();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.musicTimer) clearTimeout(this.musicTimer);
    }

    scheduler() {
        if (!this.isPlayingMusic) return;

        const lookahead = 25.0; // ms
        const scheduleAheadTime = 0.1; // s
        const bpm = this.currentMelody.bpm;
        const secondsPerBeat = 60.0 / bpm;
        const stepTime = secondsPerBeat / 4; // 16th notes

        while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
            this.scheduleStep(this.currentStep, this.nextNoteTime, stepTime);
            this.nextNoteTime += stepTime;
            this.currentStep++;
            
            // Loop logic: find max track length
            let maxLen = 0;
            this.currentMelody.tracks.forEach(t => {
                if (t.pattern.length > maxLen) maxLen = t.pattern.length;
            });
            if (maxLen === 0) maxLen = 16;
            
            if (this.currentStep >= maxLen) this.currentStep = 0;
        }
        
        this.musicTimer = setTimeout(() => this.scheduler(), lookahead);
    }

    scheduleStep(step, time, stepDuration) {
        this.currentMelody.tracks.forEach(track => {
            if (!track.pattern || track.pattern.length === 0) return;
            
            // Wrap pattern index
            const noteStr = track.pattern[step % track.pattern.length];
            
            if (noteStr && noteStr !== '-' && noteStr !== '.') {
                const sound = this.soundLibrary.find(s => s.id === track.instrumentId);
                if (sound) {
                    const freq = MusicUtils.noteToFreq(noteStr);
                    const vol = track.vol !== undefined ? track.vol : 1.0;
                    
                    if (freq) {
                        // It's a tonal note
                        this.playNote(sound, freq, time, stepDuration * 0.9, vol);
                    } else {
                        // It's a percussion hit (no pitch change)
                        // We just play the sound as is
                        const p = { ...sound }; // shallow clone wrapper
                        // We can't easily scale volume of playSound without modifying layers, 
                        // so we do a quick manual loop here
                        sound.layers.forEach(l => {
                            if (l.active !== false) {
                                const lp = {...l};
                                lp.vol *= vol;
                                if (lp.type === 'tone') this.scheduleTone(this.ctx, this.masterGain, lp, time);
                                else this.scheduleNoise(this.ctx, this.masterGain, lp, this.liveNoiseBuffer, time);
                            }
                        });
                    }
                }
            }
        });
    }

    // --- EXPORT TO WAV ---

    async renderAndDownload(sound) {
        let maxDur = 0;
        sound.layers.forEach(l => {
            if (l.active !== false && l.dur > maxDur) maxDur = l.dur;
        });
        if (maxDur === 0) return;

        const renderDur = maxDur + 0.1;
        const sampleRate = 44100;
        const offlineCtx = new OfflineAudioContext(1, sampleRate * renderDur, sampleRate);
        const offlineNoiseBuffer = this.createNoiseBuffer(offlineCtx);

        sound.layers.forEach(l => {
            if (l.active !== false) {
                if (l.type === 'tone') this.scheduleTone(offlineCtx, offlineCtx.destination, l, 0);
                else this.scheduleNoise(offlineCtx, offlineCtx.destination, l, offlineNoiseBuffer, 0);
            }
        });

        const renderedBuffer = await offlineCtx.startRendering();
        const wavBlob = this.bufferToWav(renderedBuffer, renderDur * sampleRate);
        
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
        let i, sample, offset = 0, pos = 0;

        function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }

        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8); // file length - 8
        setUint32(0x45564157); // "WAVE"
        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16); // length = 16
        setUint16(1); // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16); // 16-bit

        setUint32(0x61746164); // "data" - chunk
        setUint32(length - pos - 4); // chunk length

        for(i = 0; i < abuffer.numberOfChannels; i++) channels.push(abuffer.getChannelData(i));

        while(pos < length) {
            for(i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset])); 
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; 
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }
        return new Blob([buffer], {type: "audio/wav"});
    }
}

/**
 * APP LOGIC
 */
class App {
    constructor() {
        this.audio = new AudioEngine();
        
        // Load Data
        this.sounds = typeof DEFAULT_SOUNDS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_SOUNDS)) : [];
        this.melodies = typeof DEFAULT_MELODIES !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_MELODIES)) : [];
        
        // State
        this.activeTab = 'sound';
        this.selectedSoundId = this.sounds.length > 0 ? this.sounds[0].id : null;
        this.selectedMelodyId = this.melodies.length > 0 ? this.melodies[0].id : null;
        
        this.collapsedGroups = new Set();
        this.collapsedSubgroups = new Set();
        
        this.loopTimer = null;
        this.isLoopingSound = false;
        this.loopInterval = 200;

        this.initUI();
        window.addEventListener('click', () => this.audio.resume(), { once: true });
    }

    initUI() {
        this.renderSoundList();
        this.renderMelodyList();
        this.renderEditor();
    }

    switchTab(tab) {
        this.activeTab = tab;
        
        // Toggle Nav Buttons
        document.getElementById('nav-sound').classList.toggle('active', tab === 'sound');
        document.getElementById('nav-music').classList.toggle('active', tab === 'music');
        
        // Toggle Sidebars
        document.getElementById('sidebar-sound').classList.toggle('hidden', tab !== 'sound');
        document.getElementById('sidebar-music').classList.toggle('hidden', tab !== 'music');
        
        // Toggle Views
        document.getElementById('view-sound').classList.toggle('hidden', tab !== 'sound');
        document.getElementById('view-music').classList.toggle('hidden', tab !== 'music');
        
        // Stop playback when switching
        this.stopSoundLoop();
        this.audio.stopMusic();
        
        this.renderEditor();
    }

    // ==========================================
    // SOUND LOGIC
    // ==========================================

    addNewSound() {
        const id = 'snd_' + Date.now();
        this.sounds.push({
            id: id,
            name: 'New - Category - Sound',
            desc: 'Description...',
            layers: [{ type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5, shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100 }]
        });
        this.selectedSoundId = id;
        this.renderSoundList();
        this.renderEditor();
    }

    duplicateSound() {
        if (!this.selectedSoundId) return;
        const original = this.sounds.find(s => s.id === this.selectedSoundId);
        const copy = JSON.parse(JSON.stringify(original));
        copy.id = 'snd_' + Date.now();
        copy.name += ' (Copy)';
        this.sounds.push(copy);
        this.selectedSoundId = copy.id;
        this.renderSoundList();
        this.renderEditor();
    }

    deleteCurrentSound() {
        if (!this.selectedSoundId || !confirm('Delete sound?')) return;
        this.sounds = this.sounds.filter(s => s.id !== this.selectedSoundId);
        this.selectedSoundId = this.sounds.length ? this.sounds[0].id : null;
        this.renderSoundList();
        this.renderEditor();
    }

    addLayer(type) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (!s) return;
        if (type === 'tone') {
            s.layers.push({ type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5, shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100 });
        } else {
            s.layers.push({ type: 'noise', active: true, dur: 0.2, vol: 0.5, filter: 1000 });
        }
        this.renderEditor();
    }

    removeLayer(idx) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) {
            s.layers.splice(idx, 1);
            this.renderEditor();
        }
    }

    updateSoundProp(key, value) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) {
            s[key] = value;
            if (key === 'name') this.renderSoundList();
            this.updateCodeOutput(s);
        }
    }

    updateLayer(idx, key, value) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s && s.layers[idx]) {
            if (['start', 'end', 'dur', 'vol', 'filter', 'shapeParam', 'fmRatio', 'fmDepth'].includes(key)) {
                value = parseFloat(value);
            }
            s.layers[idx][key] = value;
            if (key === 'active' || key === 'wave' || key === 'fmActive') this.renderEditor();
            else this.updateCodeOutput(s);
        }
    }

    playSound(id = null) {
        const sid = id || this.selectedSoundId;
        const s = this.sounds.find(x => x.id === sid);
        if (s) this.audio.playSound(s);
    }

    toggleSoundLoop() {
        this.isLoopingSound ? this.stopSoundLoop() : this.startSoundLoop();
        this.renderEditor();
    }

    startSoundLoop() {
        if (this.isLoopingSound) return;
        this.isLoopingSound = true;
        this.playSound();
        this.loopTimer = setInterval(() => this.playSound(), this.loopInterval);
    }

    stopSoundLoop() {
        this.isLoopingSound = false;
        clearInterval(this.loopTimer);
    }

    updateLoopInterval(val) {
        this.loopInterval = parseInt(val);
        document.getElementById('loopVal').innerText = this.loopInterval;
        if (this.isLoopingSound) {
            clearInterval(this.loopTimer);
            this.loopTimer = setInterval(() => this.playSound(), this.loopInterval);
        }
    }

    downloadWav() {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) this.audio.renderAndDownload(s);
    }

    collapseAllSounds() {
        const groups = {};
        this.sounds.forEach(s => {
            const parts = s.name.split(' - ');
            const cat = parts[0] || 'Uncategorized';
            const sub = parts.length > 2 ? parts[1] : 'General';
            this.collapsedGroups.add(cat);
            this.collapsedSubgroups.add(`${cat}|${sub}`);
        });
        this.renderSoundList();
    }

    // ==========================================
    // MUSIC LOGIC
    // ==========================================

    addNewMelody() {
        const id = 'mel_' + Date.now();
        this.melodies.push({
            id: id,
            name: 'New Melody',
            bpm: 120,
            tracks: [{ instrumentId: this.sounds[0]?.id, vol: 1.0, pattern: ["C4","-","C4","-"] }]
        });
        this.selectedMelodyId = id;
        this.renderMelodyList();
        this.renderEditor();
    }

    duplicateMelody() {
        if (!this.selectedMelodyId) return;
        const original = this.melodies.find(m => m.id === this.selectedMelodyId);
        const copy = JSON.parse(JSON.stringify(original));
        copy.id = 'mel_' + Date.now();
        copy.name += ' (Copy)';
        this.melodies.push(copy);
        this.selectedMelodyId = copy.id;
        this.renderMelodyList();
        this.renderEditor();
    }

    deleteCurrentMelody() {
        if (!this.selectedMelodyId || !confirm('Delete melody?')) return;
        this.melodies = this.melodies.filter(m => m.id !== this.selectedMelodyId);
        this.selectedMelodyId = this.melodies.length ? this.melodies[0].id : null;
        this.renderMelodyList();
        this.renderEditor();
    }

    addTrack() {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) {
            m.tracks.push({ instrumentId: this.sounds[0]?.id, vol: 1.0, pattern: ["-","-","-","-"] });
            this.renderEditor();
        }
    }

    removeTrack(idx) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) {
            m.tracks.splice(idx, 1);
            this.renderEditor();
        }
    }

    updateMelodyProp(key, value) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) {
            m[key] = (key === 'bpm') ? parseInt(value) : value;
            if (key === 'name') this.renderMelodyList();
            this.updateCodeOutput(m);
            if (this.audio.isPlayingMusic) this.toggleMusic(); // Restart to apply BPM
            if (!this.audio.isPlayingMusic) this.toggleMusic(); // Restart to apply BPM
        }
    }

    updateTrack(idx, key, value) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m && m.tracks[idx]) {
            if (key === 'pattern') {
                // Convert string back to array
                m.tracks[idx].pattern = value.toUpperCase().split(/\s+/).filter(x => x);
            } else if (key === 'vol') {
                m.tracks[idx].vol = parseFloat(value);
            } else {
                m.tracks[idx][key] = value;
            }
            this.updateCodeOutput(m);
        }
    }

    toggleMusic() {
        if (this.audio.isPlayingMusic) {
            this.audio.stopMusic();
            this.renderEditor();
        } else {
            const m = this.melodies.find(x => x.id === this.selectedMelodyId);
            if (m) {
                this.audio.playMusic(m, this.sounds);
                this.renderEditor();
            }
        }
    }

    // ==========================================
    // RENDERING
    // ==========================================

    renderSoundList() {
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
            const isCatCollapsed = this.collapsedGroups.has(cat);
            const catHeader = document.createElement('div');
            catHeader.className = `category-header ${isCatCollapsed ? 'collapsed' : ''}`;
            catHeader.innerHTML = `<span class="arrow">▼</span> ${cat}`;
            catHeader.onclick = () => {
                isCatCollapsed ? this.collapsedGroups.delete(cat) : this.collapsedGroups.add(cat);
                this.renderSoundList();
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
                        this.renderSoundList();
                    };
                    list.appendChild(subHeader);

                    if (!isSubCollapsed) {
                        tree[cat][sub].forEach(s => {
                            const el = document.createElement('div');
                            el.className = `list-item ${s.id === this.selectedSoundId ? 'active' : ''}`;
                            
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
                                this.selectedSoundId = s.id;
                                this.stopSoundLoop();
                                this.renderSoundList();
                                this.renderEditor();
                            };
                            list.appendChild(el);
                        });
                    }
                });
            }
        });
    }

    renderMelodyList() {
        const list = document.getElementById('melodyList');
        list.innerHTML = '';
        this.melodies.forEach(m => {
            const el = document.createElement('div');
            el.className = `list-item ${m.id === this.selectedMelodyId ? 'active' : ''}`;
            el.innerText = m.name;
            el.onclick = () => {
                this.selectedMelodyId = m.id;
                this.audio.stopMusic();
                this.renderMelodyList();
                this.renderEditor();
            };
            list.appendChild(el);
        });
    }

    renderEditor() {
        if (this.activeTab === 'sound') this.renderSoundEditor();
        else this.renderMusicEditor();
    }

    renderSoundEditor() {
        const container = document.getElementById('view-sound');
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (!s) return container.innerHTML = '<div style="padding:20px">No sound selected</div>';

        let layersHtml = s.layers.map((l, idx) => {
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

                return `
                <div class="layer-card type-tone ${activeClass}">
                    <div class="layer-header">
                        <span>TONE LAYER ${idx+1}</span>
                        <div class="layer-actions">
                            <label class="toggle-label"><input type="checkbox" ${fmChecked} onchange="app.updateLayer(${idx}, 'fmActive', this.checked)"> FM</label>
                            <label class="toggle-label"><input type="checkbox" ${checked} onchange="app.updateLayer(${idx}, 'active', this.checked)"> ACTIVE</label>
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
                                    <option value="pulse25" ${l.wave==='pulse25'?'selected':''}>Pulse 25%</option>
                                    <option value="bassoon" ${l.wave==='bassoon'?'selected':''}>Bassoon</option>
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
                return `
                <div class="layer-card type-noise ${activeClass}">
                    <div class="layer-header">
                        <span>NOISE LAYER ${idx+1}</span>
                        <div class="layer-actions">
                            <label class="toggle-label"><input type="checkbox" ${checked} onchange="app.updateLayer(${idx}, 'active', this.checked)"> ACTIVE</label>
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
        }).join('');

        container.innerHTML = `
            <div class="editor-header">
                <div class="header-inputs">
                    <input type="text" value="${s.name}" oninput="app.updateSoundProp('name', this.value)">
                    <textarea placeholder="Description..." oninput="app.updateSoundProp('desc', this.value)">${s.desc || ''}</textarea>
                </div>
                <div class="play-controls">
                    <button class="play-btn ${this.isLoopingSound?'playing':''}" onclick="app.toggleSoundLoop()">${this.isLoopingSound?'STOP':'PLAY<br>LOOP'}</button>
                    <button class="download-btn" onclick="app.downloadWav()">WAV</button>
                    <div style="text-align:center; margin-top:5px;">
                        <span id="loopVal" style="color:var(--accent); font-weight:bold;">${this.loopInterval}</span> ms
                        <input type="range" min="50" max="1000" step="10" value="${this.loopInterval}" style="width:100%" oninput="app.updateLoopInterval(this.value)">
                    </div>
                </div>
            </div>
            <div class="layers-container">${layersHtml}</div>
            <div class="add-buttons">
                <button class="btn btn-blue" onclick="app.addLayer('tone')">+ TONE</button>
                <button class="btn btn-orange" onclick="app.addLayer('noise')">+ NOISE</button>
            </div>
        `;
        this.updateCodeOutput(s);
    }

    renderMusicEditor() {
        const container = document.getElementById('view-music');
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (!m) return container.innerHTML = '<div style="padding:20px">No melody selected</div>';

        const soundOptions = this.sounds.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

        let tracksHtml = m.tracks.map((t, i) => `
            <div class="track-row">
                <div class="track-header">
                    <select class="track-instrument-select" onchange="app.updateTrack(${i}, 'instrumentId', this.value)">
                        ${this.sounds.map(s => `<option value="${s.id}" ${s.id === t.instrumentId ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                    <div style="display:flex; align-items:center; gap:5px">
                        <label style="font-size:10px; color:#95a5a6">VOL</label>
                        <input class="track-vol-slider" type="range" min="0" max="1" step="0.1" value="${t.vol !== undefined ? t.vol : 1}" onchange="app.updateTrack(${i}, 'vol', this.value)">
                    </div>
                    <button class="btn btn-red btn-sm" onclick="app.removeTrack(${i})">X</button>
                </div>
                <input class="track-pattern-input" type="text" value="${t.pattern.join(' ')}" onchange="app.updateTrack(${i}, 'pattern', this.value)">
            </div>
        `).join('');

        container.innerHTML = `
            <div class="editor-header">
                <div class="header-inputs">
                    <input type="text" value="${m.name}" oninput="app.updateMelodyProp('name', this.value)">
                    <div style="display:flex; align-items:center; gap:10px; color:var(--accent); font-weight:bold;">
                        BPM: <input type="number" value="${m.bpm}" style="width:60px" onchange="app.updateMelodyProp('bpm', this.value)">
                    </div>
                </div>
                <div class="play-controls">
                    <button class="play-btn ${this.audio.isPlayingMusic ? 'playing' : ''}" onclick="app.toggleMusic()">
                        ${this.audio.isPlayingMusic ? 'STOP' : 'PLAY'}
                    </button>
                </div>
            </div>
            <div class="track-list">${tracksHtml}</div>
            <div class="add-buttons">
                <button class="btn btn-blue" onclick="app.addTrack()">+ ADD TRACK</button>
            </div>
        `;
        this.updateCodeOutput(m);
    }

    // --- COMMON UTILS ---
    updateCodeOutput(obj) {
        document.getElementById('codeOutput').innerText = JSON.stringify(obj, null, 4);
    }

    copyCode() {
        navigator.clipboard.writeText(document.getElementById('codeOutput').innerText);
        alert('JSON Copied!');
    }

    saveLibrary(type) {
        const data = type === 'sound' ? this.sounds : this.melodies;
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = type === 'sound' ? 'sounds.json' : 'melodies.json';
        a.click();
    }

    loadLibrary(input, type) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (type === 'sound') {
                    this.sounds = data;
                    this.selectedSoundId = this.sounds[0]?.id;
                    this.renderSoundList();
                } else {
                    this.melodies = data;
                    this.selectedMelodyId = this.melodies[0]?.id;
                    this.renderMelodyList();
                }
                this.renderEditor();
            } catch(err) { alert('Error loading file'); }
        };
        reader.readAsText(file);
        input.value = '';
    }

    resetLibrary(type) {
        if(!confirm("Reset to defaults?")) return;
        if (type === 'sound') {
            this.stopSoundLoop();
            this.sounds = typeof DEFAULT_SOUNDS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_SOUNDS)) : [];
            this.selectedSoundId = this.sounds[0]?.id;
            this.renderSoundList();
        } else {
            this.audio.stopMusic();
            this.melodies = typeof DEFAULT_MELODIES !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_MELODIES)) : [];
            this.selectedMelodyId = this.melodies[0]?.id;
            this.renderMelodyList();
        }
        this.renderEditor();
    }
}

const app = new App();