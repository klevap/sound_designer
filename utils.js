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
        const semitones = this.NOTES[note] + (octave - 4) * 12;
        return this.A4 * Math.pow(2, semitones / 12);
    },

    // Converts AudioBuffer to WAV Blob
    // Uses the exact length of the buffer provided
    bufferToWav(abuffer) {
        const numOfChan = abuffer.numberOfChannels;
        const len = abuffer.length;
        const length = len * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let i, sample, offset = 0, pos = 0;

        function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
        function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }

        // RIFF identifier
        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8); // file length - 8
        // RIFF type
        setUint32(0x45564157); // "WAVE"
        // format chunk identifier
        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16); // length = 16
        setUint16(1); // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16); // 16-bit

        // data chunk identifier
        setUint32(0x61746164); // "data" - chunk
        setUint32(length - pos - 4); // chunk length

        // Get channel data
        for(i = 0; i < abuffer.numberOfChannels; i++) {
            channels.push(abuffer.getChannelData(i));
        }

        // Interleave data
        while(pos < length) {
            for(i = 0; i < numOfChan; i++) {
                // Clamp the sample to [-1, 1]
                sample = Math.max(-1, Math.min(1, channels[i][offset])); 
                // Convert float to 16-bit PCM
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; 
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }
        
        return new Blob([buffer], {type: "audio/wav"});
    },

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a); 
        a.click();
        document.body.removeChild(a); 
        URL.revokeObjectURL(url);
    }
};