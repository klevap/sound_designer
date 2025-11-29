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
        document.getElementById('nav-sound').classList.toggle('active', tab === 'sound');
        document.getElementById('nav-music').classList.toggle('active', tab === 'music');
        document.getElementById('sidebar-sound').classList.toggle('hidden', tab !== 'sound');
        document.getElementById('sidebar-music').classList.toggle('hidden', tab !== 'music');
        document.getElementById('view-sound').classList.toggle('hidden', tab !== 'sound');
        document.getElementById('view-music').classList.toggle('hidden', tab !== 'music');
        
        this.stopSoundLoop();
        this.audio.stopMusic();
        this.renderEditor();
    }

    // --- SOUND ACTIONS ---
    addNewSound() {
        const id = 'snd_' + Date.now();
        this.sounds.push({
            id: id, name: 'New - Category - Sound', desc: 'Description...',
            layers: [{ type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5, attack: 0.01, shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100 }]
        });
        this.selectedSoundId = id;
        this.renderSoundList();
        this.renderEditor();
    }

    duplicateSound() {
        if (!this.selectedSoundId) return;
        const original = this.sounds.find(s => s.id === this.selectedSoundId);
        const copy = JSON.parse(JSON.stringify(original));
        copy.id = 'snd_' + Date.now(); copy.name += ' (Copy)';
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
        if (type === 'tone') s.layers.push({ type: 'tone', active: true, wave: 'sine', start: 440, end: 220, dur: 0.2, vol: 0.5, attack: 0.01, shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100 });
        else s.layers.push({ type: 'noise', active: true, dur: 0.2, vol: 0.5, filter: 1000 });
        this.renderEditor();
    }

    removeLayer(idx) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) { s.layers.splice(idx, 1); this.renderEditor(); }
    }

    updateSoundProp(key, value) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) { s[key] = value; if (key === 'name') this.renderSoundList(); this.updateCodeOutput(s); }
    }

    updateLayer(idx, key, value) {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s && s.layers[idx]) {
            if (['start', 'end', 'dur', 'vol', 'filter', 'shapeParam', 'fmRatio', 'fmDepth', 'attack'].includes(key)) value = parseFloat(value);
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

    toggleSoundLoop() { this.isLoopingSound ? this.stopSoundLoop() : this.startSoundLoop(); this.renderEditor(); }
    startSoundLoop() { if (this.isLoopingSound) return; this.isLoopingSound = true; this.playSound(); this.loopTimer = setInterval(() => this.playSound(), this.loopInterval); }
    stopSoundLoop() { this.isLoopingSound = false; clearInterval(this.loopTimer); }
    updateLoopInterval(val) {
        this.loopInterval = parseInt(val);
        document.getElementById('loopVal').innerText = this.loopInterval;
        if (this.isLoopingSound) { clearInterval(this.loopTimer); this.loopTimer = setInterval(() => this.playSound(), this.loopInterval); }
    }

    async downloadWav() {
        const s = this.sounds.find(x => x.id === this.selectedSoundId);
        if (s) {
            const blob = await this.audio.renderSound(s);
            MusicUtils.downloadBlob(blob, s.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.wav');
        }
    }

    collapseAllSounds() {
        this.collapsedGroups.clear(); this.collapsedSubgroups.clear();
        this.sounds.forEach(s => {
            const parts = s.name.split(' - ');
            this.collapsedGroups.add(parts[0] || 'Uncategorized');
            if (parts.length > 2) this.collapsedSubgroups.add(`${parts[0]}|${parts[1]}`);
        });
        this.renderSoundList();
    }

    // --- MELODY ACTIONS ---
    addNewMelody() {
        const id = 'mel_' + Date.now();
        // Default pattern is now a string
        this.melodies.push({ id: id, name: 'New Melody', bpm: 120, tracks: [{ instrumentId: this.sounds[0]?.id, vol: 1.0, active: true, pattern: "C4 - C4 -" }] });
        this.selectedMelodyId = id;
        this.renderMelodyList();
        this.renderEditor();
    }

    duplicateMelody() {
        if (!this.selectedMelodyId) return;
        const original = this.melodies.find(m => m.id === this.selectedMelodyId);
        const copy = JSON.parse(JSON.stringify(original));
        copy.id = 'mel_' + Date.now(); copy.name += ' (Copy)';
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
        // Default pattern is now a string
        if (m) { m.tracks.push({ instrumentId: this.sounds[0]?.id, vol: 1.0, active: true, pattern: "- - - -" }); this.renderEditor(); }
    }

    removeTrack(idx) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) { m.tracks.splice(idx, 1); this.renderEditor(); }
    }

    updateMelodyProp(key, value) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) {
            m[key] = (key === 'bpm') ? parseInt(value) : value;
            if (key === 'name') this.renderMelodyList();
            this.updateCodeOutput(m);
            if (this.audio.isPlayingMusic) this.toggleMusic();
            if (!this.audio.isPlayingMusic) this.toggleMusic();
        }
    }

    updateTrack(idx, key, value) {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m && m.tracks[idx]) {
            if (key === 'pattern') {
                // Store directly as string, just uppercase it
                m.tracks[idx].pattern = value.toUpperCase();
            }
            else if (key === 'vol') m.tracks[idx].vol = parseFloat(value);
            else m.tracks[idx][key] = value;
            
            if (key === 'active') this.renderEditor(); // Re-render to update UI state
            this.updateCodeOutput(m);
        }
    }

    toggleMusic() {
        if (this.audio.isPlayingMusic) { this.audio.stopMusic(); this.renderEditor(); }
        else {
            const m = this.melodies.find(x => x.id === this.selectedMelodyId);
            if (m) { this.audio.playMusic(m, this.sounds); this.renderEditor(); }
        }
    }

    async downloadMelodyWav() {
        const m = this.melodies.find(x => x.id === this.selectedMelodyId);
        if (m) {
            const blob = await this.audio.renderMelody(m, this.sounds);
            MusicUtils.downloadBlob(blob, m.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.wav');
        }
    }

    // --- RENDERERS ---
    renderSoundList() {
        UIRenderer.renderSoundList(this.sounds, this.selectedSoundId, this.collapsedGroups, this.collapsedSubgroups, {
            onToggleGroup: (cat) => { this.collapsedGroups.has(cat) ? this.collapsedGroups.delete(cat) : this.collapsedGroups.add(cat); this.renderSoundList(); },
            onToggleSubgroup: (sub) => { this.collapsedSubgroups.has(sub) ? this.collapsedSubgroups.delete(sub) : this.collapsedSubgroups.add(sub); this.renderSoundList(); },
            onPlay: (id) => { this.audio.resume(); this.playSound(id); },
            onSelect: (id) => { this.selectedSoundId = id; this.stopSoundLoop(); this.renderSoundList(); this.renderEditor(); }
        });
    }

    renderMelodyList() {
        UIRenderer.renderMelodyList(this.melodies, this.selectedMelodyId, {
            onSelect: (id) => { this.selectedMelodyId = id; this.audio.stopMusic(); this.renderMelodyList(); this.renderEditor(); }
        });
    }

    renderEditor() {
        if (this.activeTab === 'sound') {
            const s = this.sounds.find(x => x.id === this.selectedSoundId);
            UIRenderer.renderSoundEditor(s, this.isLoopingSound, this.loopInterval);
            if(s) this.updateCodeOutput(s);
        } else {
            const m = this.melodies.find(x => x.id === this.selectedMelodyId);
            UIRenderer.renderMusicEditor(m, this.sounds, this.audio.isPlayingMusic);
            if(m) this.updateCodeOutput(m);
        }
    }

    updateCodeOutput(obj) { document.getElementById('codeOutput').innerText = JSON.stringify(obj, null, 4); }
    copyCode() { navigator.clipboard.writeText(document.getElementById('codeOutput').innerText); alert('JSON Copied!'); }

    saveLibrary(type) {
        const data = type === 'sound' ? this.sounds : this.melodies;
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        MusicUtils.downloadBlob(blob, type === 'sound' ? 'sounds.json' : 'melodies.json');
    }

    loadLibrary(input, type) {
        const file = input.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (type === 'sound') { this.sounds = data; this.selectedSoundId = this.sounds[0]?.id; this.renderSoundList(); }
                else { this.melodies = data; this.selectedMelodyId = this.melodies[0]?.id; this.renderMelodyList(); }
                this.renderEditor();
            } catch(err) { alert('Error loading file'); }
        };
        reader.readAsText(file); input.value = '';
    }

    resetLibrary(type) {
        if(!confirm("Reset to defaults?")) return;
        if (type === 'sound') { this.stopSoundLoop(); this.sounds = JSON.parse(JSON.stringify(DEFAULT_SOUNDS)); this.selectedSoundId = this.sounds[0]?.id; this.renderSoundList(); }
        else { this.audio.stopMusic(); this.melodies = JSON.parse(JSON.stringify(DEFAULT_MELODIES)); this.selectedMelodyId = this.melodies[0]?.id; this.renderMelodyList(); }
        this.renderEditor();
    }
}

const app = new App();