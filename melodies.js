/**
 * DEFAULT MUSIC LIBRARY
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_cyber_groove',
        name: 'Cyber Groove (120 BPM)',
        bpm: 120,
        tracks: [
            {
                // Bassline
                instrumentId: 'jump_1', 
                vol: 0.8,
                pattern: ["C2","-","-","C2", "C2","-","G1","-", "D#2","-","-","D#2", "F2","-","G1","-"]
            },
            {
                // Hi-Hats
                instrumentId: 'shoot_4',
                vol: 0.4,
                pattern: ["C4","-","C4","-", "C4","-","C4","-", "C4","-","C4","-", "C4","C4","C4","-"]
            },
            {
                // Kick/Snare accent
                instrumentId: 'exp_2',
                vol: 0.6,
                pattern: ["C1","-","-","-", "C1","-","-","-", "C1","-","-","-", "C1","-","-","-"]
            },
            {
                // NEW: String Pad
                instrumentId: 'inst_str_ens',
                vol: 0.5,
                pattern: ["C4","-","-","-", "-","-","-","-", "D#4","-","-","-", "-","-","-","-"]
            }
        ]
    },
    {
        id: 'mel_boss_tension',
        name: 'Boss Tension (140 BPM)',
        bpm: 140,
        tracks: [
            {
                // Arpeggio
                instrumentId: 'p_adv_1',
                vol: 0.5,
                pattern: ["A3","C4","E4","A4", "E4","C4","A3","-", "G3","B3","D4","G4", "D4","B3","G3","-"]
            },
            {
                // Driving Bass
                instrumentId: 'jump_4',
                vol: 0.7,
                pattern: ["A1","-","A1","-", "A1","-","A1","-", "G1","-","G1","-", "G1","-","G1","-"]
            },
            {
                // NEW: Brass Hits
                instrumentId: 'inst_brass',
                vol: 0.6,
                pattern: ["A2","-","-","-", "-","-","A2","-", "G2","-","-","-", "-","-","G2","-"]
            }
        ]
    },
    {
        id: 'mel_victory',
        name: 'Victory Fanfare (100 BPM)',
        bpm: 100,
        tracks: [
            {
                // Lead
                instrumentId: 'p_adv_1',
                vol: 0.6,
                pattern: ["C4","C4","C4","-", "E4","-","G4","-", "C5","-","-","-", "-","-","-","-"]
            },
            {
                // Harmony
                instrumentId: 'jump_5',
                vol: 0.4,
                pattern: ["C3","-","E3","-", "G3","-","C4","-", "E4","-","-","-", "-","-","-","-"]
            },
            {
                // NEW: Flute Counter-melody
                instrumentId: 'inst_flute',
                vol: 0.5,
                pattern: ["-","-","-","-", "C5","-","E5","-", "G5","-","-","-", "C6","-","-","-"]
            }
        ]
    },
    {
        id: 'mel_creepy',
        name: 'Creepy Ambience (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Spooky Lead
                instrumentId: 'hook_l_4',
                vol: 0.7,
                pattern: ["F#4","-","-","-", "C5","-","-","-", "F4","-","-","-", "C#5","-","-","-"]
            },
            {
                // Low Drone
                instrumentId: 'exp_3',
                vol: 0.8,
                pattern: ["C1","-","-","-", "-","-","-","-", "C#1","-","-","-", "-","-","-","-"]
            },
            {
                // NEW: Dark Pad
                instrumentId: 'inst_pad_dark',
                vol: 0.6,
                pattern: ["F#2","-","-","-", "-","-","-","-", "F2","-","-","-", "-","-","-","-"]
            }
        ]
    }
];