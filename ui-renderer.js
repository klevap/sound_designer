const UIRenderer = {
    renderSoundList(sounds, selectedId, collapsedGroups, collapsedSubgroups, callbacks) {
        const list = document.getElementById('soundList');
        list.innerHTML = '';
        const tree = {};
        
        sounds.forEach(s => {
            const parts = s.name.split(' - ');
            const cat = parts[0] || 'Uncategorized';
            const sub = parts.length > 2 ? parts[1] : 'General';
            const name = parts.length > 2 ? parts.slice(2).join(' - ') : (parts[1] || parts[0]);
            if (!tree[cat]) tree[cat] = {};
            if (!tree[cat][sub]) tree[cat][sub] = [];
            tree[cat][sub].push({ ...s, displayName: name });
        });

        Object.keys(tree).sort().forEach(cat => {
            const isCatCollapsed = collapsedGroups.has(cat);
            const catHeader = document.createElement('div');
            catHeader.className = `category-header ${isCatCollapsed ? 'collapsed' : ''}`;
            catHeader.innerHTML = `<span class="arrow">▼</span> ${cat}`;
            catHeader.onclick = () => callbacks.onToggleGroup(cat);
            list.appendChild(catHeader);

            if (!isCatCollapsed) {
                Object.keys(tree[cat]).sort().forEach(sub => {
                    const subKey = `${cat}|${sub}`;
                    const isSubCollapsed = collapsedSubgroups.has(subKey);
                    const subHeader = document.createElement('div');
                    subHeader.className = `subgroup-header ${isSubCollapsed ? 'collapsed' : ''}`;
                    subHeader.innerHTML = `<span class="arrow">▼</span> ${sub}`;
                    subHeader.onclick = () => callbacks.onToggleSubgroup(subKey);
                    list.appendChild(subHeader);

                    if (!isSubCollapsed) {
                        tree[cat][sub].forEach(s => {
                            const el = document.createElement('div');
                            el.className = `list-item ${s.id === selectedId ? 'active' : ''}`;
                            el.innerHTML = `<span>${s.displayName}</span>`;
                            
                            const playBtn = document.createElement('button');
                            playBtn.className = 'btn btn-green btn-sm';
                            playBtn.innerText = '▶';
                            playBtn.style.marginLeft = '10px';
                            playBtn.onclick = (e) => { e.stopPropagation(); callbacks.onPlay(s.id); };
                            el.appendChild(playBtn);

                            el.onclick = () => callbacks.onSelect(s.id);
                            list.appendChild(el);
                        });
                    }
                });
            }
        });
    },

    renderMelodyList(melodies, selectedId, callbacks) {
        const list = document.getElementById('melodyList');
        list.innerHTML = '';
        melodies.forEach(m => {
            const el = document.createElement('div');
            el.className = `list-item ${m.id === selectedId ? 'active' : ''}`;
            el.innerText = m.name;
            el.onclick = () => callbacks.onSelect(m.id);
            list.appendChild(el);
        });
    },

    renderSoundEditor(sound, isLooping, loopInterval) {
        const container = document.getElementById('view-sound');
        if (!sound) return container.innerHTML = '<div style="padding:20px">No sound selected</div>';

        let layersHtml = sound.layers.map((l, idx) => {
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
                    shapeControl = `<div class="control-group"><label>${label} <span class="val-display">${l.shapeParam}</span></label><input type="range" min="0" max="1" step="0.05" value="${l.shapeParam}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'shapeParam', this.value)"></div>`;
                }
                const fmChecked = l.fmActive ? 'checked' : '';
                const fmDisplay = l.fmActive ? 'grid' : 'none';
                const attackVal = l.attack !== undefined ? l.attack : 0.01;

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
                                <optgroup label="Standard"><option value="sine" ${l.wave==='sine'?'selected':''}>Sine</option><option value="square" ${l.wave==='square'?'selected':''}>Square</option><option value="sawtooth" ${l.wave==='sawtooth'?'selected':''}>Sawtooth</option><option value="triangle" ${l.wave==='triangle'?'selected':''}>Triangle</option></optgroup>
                                <optgroup label="Advanced"><option value="hypersaw" ${l.wave==='hypersaw'?'selected':''}>HyperSaw</option><option value="violin" ${l.wave==='violin'?'selected':''}>Violin</option><option value="trapezoid" ${l.wave==='trapezoid'?'selected':''}>Trapezoid</option><option value="organ" ${l.wave==='organ'?'selected':''}>Organ</option><option value="metal" ${l.wave==='metal'?'selected':''}>Metallic</option><option value="pulse25" ${l.wave==='pulse25'?'selected':''}>Pulse 25%</option><option value="bassoon" ${l.wave==='bassoon'?'selected':''}>Bassoon</option></optgroup>
                                <optgroup label="Shapers"><option value="powersine" ${l.wave==='powersine'?'selected':''}>Power Sine</option><option value="bitcrush" ${l.wave==='bitcrush'?'selected':''}>BitCrush</option><option value="foldback" ${l.wave==='foldback'?'selected':''}>Wavefolder</option></optgroup>
                            </select>
                        </div>
                        ${shapeControl}
                        <div class="control-group"><label>Start Hz <span class="val-display">${l.start}</span></label><input type="range" min="50" max="3000" step="10" value="${l.start}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'start', this.value)"></div>
                        <div class="control-group"><label>End Hz <span class="val-display">${l.end}</span></label><input type="range" min="10" max="3000" step="10" value="${l.end}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'end', this.value)"></div>
                        <div class="control-group"><label>Attack (s) <span class="val-display">${attackVal}</span></label><input type="range" min="0.01" max="1.0" step="0.01" value="${attackVal}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'attack', this.value)"></div>
                        <div class="control-group"><label>Duration (s) <span class="val-display">${l.dur}</span></label><input type="range" min="0.01" max="2.0" step="0.01" value="${l.dur}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'dur', this.value)"></div>
                        <div class="control-group"><label>Volume <span class="val-display">${l.vol}</span></label><input type="range" min="0" max="1" step="0.05" value="${l.vol}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'vol', this.value)"></div>
                    </div>
                    <div class="fm-section" style="display:${fmDisplay}">
                        <div class="fm-grid">
                            <div class="control-group"><label>FM Ratio <span class="val-display">${l.fmRatio}x</span></label><input type="range" min="0.5" max="10" step="0.1" value="${l.fmRatio}" oninput="this.previousElementSibling.children[0].innerText=this.value+'x'; app.updateLayer(${idx}, 'fmRatio', this.value)"></div>
                            <div class="control-group"><label>FM Depth <span class="val-display">${l.fmDepth}</span></label><input type="range" min="0" max="2000" step="10" value="${l.fmDepth}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'fmDepth', this.value)"></div>
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
                        <div class="control-group"><label>Filter Hz <span class="val-display">${l.filter}</span></label><input type="range" min="100" max="8000" step="100" value="${l.filter}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'filter', this.value)"></div>
                        <div class="control-group"><label>Duration <span class="val-display">${l.dur}</span></label><input type="range" min="0.01" max="1.0" step="0.01" value="${l.dur}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'dur', this.value)"></div>
                        <div class="control-group"><label>Volume <span class="val-display">${l.vol}</span></label><input type="range" min="0" max="1" step="0.05" value="${l.vol}" oninput="this.previousElementSibling.children[0].innerText=this.value; app.updateLayer(${idx}, 'vol', this.value)"></div>
                    </div>
                </div>`;
            }
        }).join('');

        container.innerHTML = `
            <div class="editor-header">
                <div class="header-inputs">
                    <input type="text" value="${sound.name}" oninput="app.updateSoundProp('name', this.value)">
                    <textarea placeholder="Description..." oninput="app.updateSoundProp('desc', this.value)">${sound.desc || ''}</textarea>
                </div>
                <div class="play-controls">
                    <button class="play-btn ${isLooping?'playing':''}" onclick="app.toggleSoundLoop()">${isLooping?'STOP':'PLAY<br>LOOP'}</button>
                    <button class="download-btn" onclick="app.downloadWav()">WAV</button>
                    <div style="text-align:center; margin-top:5px;">
                        <span id="loopVal" style="color:var(--accent); font-weight:bold;">${loopInterval}</span> ms
                        <input type="range" min="50" max="1000" step="10" value="${loopInterval}" style="width:100%" oninput="app.updateLoopInterval(this.value)">
                    </div>
                </div>
            </div>
            <div class="layers-container">${layersHtml}</div>
            <div class="add-buttons">
                <button class="btn btn-blue" onclick="app.addLayer('tone')">+ TONE</button>
                <button class="btn btn-orange" onclick="app.addLayer('noise')">+ NOISE</button>
            </div>
        `;
    },

    renderMusicEditor(melody, sounds, isPlaying) {
        const container = document.getElementById('view-music');
        if (!melody) return container.innerHTML = '<div style="padding:20px">No melody selected</div>';

        let tracksHtml = melody.tracks.map((t, i) => {
            const isActive = t.active !== false;
            // t.pattern is now a string, so we use it directly
            const patternVal = t.pattern; 
            
            return `
            <div class="track-row ${isActive ? '' : 'disabled'}">
                <div class="track-header">
                    <div style="display:flex; align-items:center;">
                        <input type="checkbox" class="track-active-check" ${isActive ? 'checked' : ''} onchange="app.updateTrack(${i}, 'active', this.checked)" title="Mute/Unmute Track">
                        <select class="track-instrument-select" onchange="app.updateTrack(${i}, 'instrumentId', this.value)">
                            ${sounds.map(s => `<option value="${s.id}" ${s.id === t.instrumentId ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>
                    <div style="display:flex; align-items:center; gap:5px">
                        <label style="font-size:10px; color:#95a5a6">VOL</label>
                        <input class="track-vol-slider" type="range" min="0" max="1" step="0.1" value="${t.vol !== undefined ? t.vol : 1}" onchange="app.updateTrack(${i}, 'vol', this.value)">
                    </div>
                    <button class="btn btn-red btn-sm" onclick="app.removeTrack(${i})">X</button>
                </div>
                <input class="track-pattern-input" type="text" value="${patternVal}" onchange="app.updateTrack(${i}, 'pattern', this.value)">
            </div>
        `}).join('');

        container.innerHTML = `
            <div class="editor-header">
                <div class="header-inputs">
                    <input type="text" value="${melody.name}" oninput="app.updateMelodyProp('name', this.value)">
                    <div style="display:flex; align-items:center; gap:10px; color:var(--accent); font-weight:bold;">
                        BPM: <input type="number" value="${melody.bpm}" style="width:60px" onchange="app.updateMelodyProp('bpm', this.value)">
                    </div>
                </div>
                <div class="play-controls">
                    <button class="play-btn ${isPlaying ? 'playing' : ''}" onclick="app.toggleMusic()">
                        ${isPlaying ? 'STOP' : 'PLAY'}
                    </button>
                    <button class="download-btn" onclick="app.downloadMelodyWav()">WAV</button>
                </div>
            </div>
            <div class="track-list">${tracksHtml}</div>
            <div class="add-buttons">
                <button class="btn btn-blue" onclick="app.addTrack()">+ ADD TRACK</button>
            </div>
        `;
    }
};