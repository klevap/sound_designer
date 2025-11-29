class AudioEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);
        
        this.liveNoiseBuffer = this.createNoiseBuffer(this.ctx);
        this.shaperCache = {};

        // Sequencer State
        this.isPlayingMusic = false;
        this.musicTimer = null;
        this.nextNoteTime = 0;
        this.currentStep = 0;
        this.currentMelody = null;
        this.soundLibrary = [];
    }

    resume() { if (this.ctx.state === 'suspended') this.ctx.resume(); }

    createNoiseBuffer(ctx) {
        const bufferSize = ctx.sampleRate * 2; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        return buffer;
    }

    // --- WAVE GENERATORS & SHAPERS ---
    getTrapezoidWave(ctx, sharpness) {
        const numCoeffs = 64; const real = new Float32Array(numCoeffs); const imag = new Float32Array(numCoeffs);
        for (let i = 1; i < numCoeffs; i += 2) {
            const sq = 1 / i; const tri = 1 / (i * i); imag[i] = sq * (1 - sharpness) + tri * sharpness;
        }
        return ctx.createPeriodicWave(real, imag);
    }
    getOrganWave(ctx) { return ctx.createPeriodicWave(new Float32Array([0,0,0,0,0,0]), new Float32Array([0,1,0.8,0.6,0.4,0.2])); }
    getMetallicWave(ctx) {
        const num = 32; const real = new Float32Array(num); const imag = new Float32Array(num);
        for(let i=1; i<num; i++) { if (i % 2 !== 0 && i > 5) imag[i] = 0.5; if (i === 1) imag[i] = 1; }
        return ctx.createPeriodicWave(real, imag);
    }
    getPulseWave(ctx) {
        const num = 64; const real = new Float32Array(num); const imag = new Float32Array(num);
        for (let i = 1; i < num; i++) imag[i] = (2 / (i * Math.PI)) * Math.sin(i * Math.PI * 0.25);
        return ctx.createPeriodicWave(real, imag);
    }
    getBassoonWave(ctx) { return ctx.createPeriodicWave(new Float32Array(10).fill(0), new Float32Array([0,1.0,0.2,0.8,0.1,0.4,0.1,0.2,0.0,0.1])); }
    
    // NEW: Violin-like wave (Rich Sawtooth variation)
    getViolinWave(ctx) {
        const num = 32; const real = new Float32Array(num); const imag = new Float32Array(num);
        for (let i = 1; i < num; i++) { imag[i] = 1 / (i * 0.8); } // Brighter than standard saw
        return ctx.createPeriodicWave(real, imag);
    }

    getPowerCurve(amount) {
        const key = `pow_${amount}`; if (this.shaperCache[key]) return this.shaperCache[key];
        const n = 256; const curve = new Float32Array(n);
        let exp = amount < 0.5 ? 0.1 + (amount * 1.8) : 1.0 + ((amount - 0.5) * 4);
        for (let i = 0; i < n; ++i ) { let x = i * 2 / n - 1; curve[i] = Math.sign(x) * Math.pow(Math.abs(x), exp); }
        return this.shaperCache[key] = curve;
    }
    getBitCrushCurve(amount) {
        const key = `crush_${amount}`; if (this.shaperCache[key]) return this.shaperCache[key];
        const n = 256; const curve = new Float32Array(n); const steps = 1 + (amount * 15); 
        for (let i = 0; i < n; ++i ) { let x = i * 2 / n - 1; curve[i] = Math.round(x * steps) / steps; }
        return this.shaperCache[key] = curve;
    }
    getFoldbackCurve(amount) {
        const key = `fold_${amount}`; if (this.shaperCache[key]) return this.shaperCache[key];
        const n = 1024; const curve = new Float32Array(n); const drive = 1 + (amount * 5);
        for (let i = 0; i < n; ++i ) { let x = i * 2 / n - 1; curve[i] = Math.sin(x * drive * (Math.PI / 2)); }
        return this.shaperCache[key] = curve;
    }

    // --- SCHEDULING CORE ---
    scheduleTone(ctx, dest, params, when) {
        const t = when;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        if (['sine', 'square', 'sawtooth', 'triangle'].includes(params.wave)) osc.type = params.wave;
        else if (params.wave === 'trapezoid') osc.setPeriodicWave(this.getTrapezoidWave(ctx, params.shapeParam));
        else if (params.wave === 'organ') osc.setPeriodicWave(this.getOrganWave(ctx));
        else if (params.wave === 'metal') osc.setPeriodicWave(this.getMetallicWave(ctx));
        else if (params.wave === 'pulse25') osc.setPeriodicWave(this.getPulseWave(ctx));
        else if (params.wave === 'bassoon') osc.setPeriodicWave(this.getBassoonWave(ctx));
        else if (params.wave === 'violin') osc.setPeriodicWave(this.getViolinWave(ctx));
        else osc.type = 'sine';

        osc.frequency.setValueAtTime(params.start, t);
        if (params.start !== params.end) osc.frequency.exponentialRampToValueAtTime(Math.max(1, params.end), t + params.dur);

        if (params.fmActive) {
            const mod = ctx.createOscillator();
            const modGain = ctx.createGain();
            mod.frequency.setValueAtTime(params.start * params.fmRatio, t);
            if (params.start !== params.end) mod.frequency.exponentialRampToValueAtTime(params.end * params.fmRatio, t + params.dur);
            modGain.gain.value = params.fmDepth;
            mod.connect(modGain); modGain.connect(osc.frequency);
            mod.start(t); mod.stop(t + params.dur);
        }

        let outputNode = osc;
        if (params.wave === 'powersine') {
            const shaper = ctx.createWaveShaper(); shaper.curve = this.getPowerCurve(params.shapeParam);
            osc.connect(shaper); outputNode = shaper;
        } else if (params.wave === 'bitcrush') {
            const shaper = ctx.createWaveShaper(); shaper.curve = this.getBitCrushCurve(params.shapeParam);
            osc.connect(shaper); outputNode = shaper;
        } else if (params.wave === 'foldback') {
            const shaper = ctx.createWaveShaper(); shaper.curve = this.getFoldbackCurve(params.shapeParam);
            osc.connect(shaper); outputNode = shaper;
        }

        // VOLUME ENVELOPE LOGIC (Updated for Attack)
        const attack = params.attack !== undefined ? params.attack : 0.01;
        const release = 0.05;
        const sustainTime = Math.max(0, params.dur - attack - release);

        gain.gain.setValueAtTime(0, t);
        
        if (attack > 0) {
            gain.gain.linearRampToValueAtTime(params.vol, t + attack);
        } else {
            gain.gain.setValueAtTime(params.vol, t);
        }

        // Sustain -> Release
        gain.gain.setValueAtTime(params.vol, t + attack + sustainTime);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);

        outputNode.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + params.dur);
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
        
        // Simple envelope for noise
        gain.gain.setValueAtTime(params.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + params.dur);
        
        src.connect(filter); filter.connect(gain); gain.connect(dest);
        src.start(t); src.stop(t + params.dur);
    }

    // --- PLAYBACK ---
    playSound(soundDef, when = 0) {
        const t = when || this.ctx.currentTime;
        soundDef.layers.forEach(l => {
            if (l.active !== false) {
                if (l.type === 'tone') this.scheduleTone(this.ctx, this.masterGain, l, t);
                else this.scheduleNoise(this.ctx, this.masterGain, l, this.liveNoiseBuffer, t);
            }
        });
    }

    playNote(soundDef, freq, when, duration, volumeScale = 1.0) {
        const t = when;
        soundDef.layers.forEach(l => {
            if (l.active === false) return;
            const p = { ...l };
            p.vol *= volumeScale;
            if (p.type === 'tone') {
                p.start = freq; p.end = freq; p.dur = duration; 
                this.scheduleTone(this.ctx, this.masterGain, p, t);
            } else {
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
        const lookahead = 25.0; 
        const scheduleAheadTime = 0.1;
        const bpm = this.currentMelody.bpm;
        const stepTime = (60.0 / bpm) / 4;

        while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
            this.scheduleStep(this.currentStep, this.nextNoteTime, stepTime, this.ctx, this.masterGain, this.liveNoiseBuffer);
            this.nextNoteTime += stepTime;
            this.currentStep++;
            
            let maxLen = 0;
            this.currentMelody.tracks.forEach(t => { if (t.pattern.length > maxLen) maxLen = t.pattern.length; });
            if (maxLen === 0) maxLen = 16;
            if (this.currentStep >= maxLen) this.currentStep = 0;
        }
        this.musicTimer = setTimeout(() => this.scheduler(), lookahead);
    }

    scheduleStep(step, time, stepDuration, ctx, dest, noiseBuf) {
        this.currentMelody.tracks.forEach(track => {
            if (track.active === false) return;
            if (!track.pattern || track.pattern.length === 0) return;
            
            const noteStr = track.pattern[step % track.pattern.length];
            if (noteStr && noteStr !== '-' && noteStr !== '.') {
                const sound = this.soundLibrary.find(s => s.id === track.instrumentId);
                if (sound) {
                    const freq = MusicUtils.noteToFreq(noteStr);
                    const vol = track.vol !== undefined ? track.vol : 1.0;
                    
                    if (freq) {
                        // Tonal Note
                        sound.layers.forEach(l => {
                            if (l.active === false) return;
                            const p = { ...l }; p.vol *= vol;
                            if (p.type === 'tone') {
                                // For musical notes, we usually want steady pitch unless it's a specific SFX
                                // If the preset has start!=end (slide), we might want to keep it relative or flatten it.
                                // Here we flatten it to the note frequency for musical consistency.
                                p.start = freq; p.end = freq; 
                                
                                // Allow notes to be longer than step if needed, but default to step
                                // If the sound has a very long defined duration (like a pad), use that, otherwise use step
                                p.dur = Math.max(p.dur, stepDuration * 1.5); 
                                
                                this.scheduleTone(ctx, dest, p, time);
                            } else {
                                this.scheduleNoise(ctx, dest, p, noiseBuf, time);
                            }
                        });
                    } else {
                        // Percussion Hit (No pitch change)
                        sound.layers.forEach(l => {
                            if (l.active !== false) {
                                const lp = {...l}; lp.vol *= vol;
                                if (lp.type === 'tone') this.scheduleTone(ctx, dest, lp, time);
                                else this.scheduleNoise(ctx, dest, lp, noiseBuf, time);
                            }
                        });
                    }
                }
            }
        });
    }

    // --- EXPORT SOUND ---
    async renderSound(sound) {
        let maxDur = 0;
        sound.layers.forEach(l => { if (l.active !== false && l.dur > maxDur) maxDur = l.dur; });
        if (maxDur === 0) return;

        const renderDur = maxDur + 0.5; // Extra tail
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
        return MusicUtils.bufferToWav(renderedBuffer, renderDur * sampleRate);
    }

    // --- EXPORT MELODY ---
    async renderMelody(melody, soundLibrary) {
        this.soundLibrary = soundLibrary;
        this.currentMelody = melody;

        const bpm = melody.bpm;
        const stepTime = (60.0 / bpm) / 4;
        
        let maxSteps = 0;
        melody.tracks.forEach(t => {
            if (t.active !== false && t.pattern.length > maxSteps) maxSteps = t.pattern.length;
        });
        if (maxSteps === 0) maxSteps = 16;

        const duration = (maxSteps * stepTime) + 4.0; // Extra tail for reverb/release
        const sampleRate = 44100;
        const offlineCtx = new OfflineAudioContext(2, sampleRate * duration, sampleRate);
        const offlineNoiseBuffer = this.createNoiseBuffer(offlineCtx);

        for (let step = 0; step < maxSteps; step++) {
            const time = step * stepTime;
            this.scheduleStep(step, time, stepTime, offlineCtx, offlineCtx.destination, offlineNoiseBuffer);
        }

        const renderedBuffer = await offlineCtx.startRendering();
        return MusicUtils.bufferToWav(renderedBuffer, duration * sampleRate);
    }
}