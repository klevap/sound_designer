/**
 * DEFAULT MUSIC LIBRARY
 * Format: Array of melody objects.
 * 
 * Structure:
 * {
 *   id: string,
 *   name: string,
 *   bpm: number,
 *   tracks: [
 *     {
 *       instrumentId: string (must match an ID from presets.js),
 *       vol: number (0.0 to 1.0),
 *       pattern: string[] (Array of notes like "C4", "A#3" or "-" for rest)
 *     }
 *   ]
 * }
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_cyber_groove',
        name: 'Cyber Groove (120 BPM)',
        bpm: 120,
        tracks: [
            {
                // Bassline - using 'jump_1' (Sine wave) acts as a sub-bass
                instrumentId: 'jump_1', 
                vol: 0.8,
                pattern: ["C2","-","-","C2", "C2","-","G1","-", "D#2","-","-","D#2", "F2","-","G1","-"]
            },
            {
                // Hi-Hats - using 'shoot_4' (Silenced/Noise)
                instrumentId: 'shoot_4',
                vol: 0.4,
                pattern: ["C4","-","C4","-", "C4","-","C4","-", "C4","-","C4","-", "C4","C4","C4","-"]
            },
            {
                // Kick/Snare accent - using 'exp_2' (8bit explosion)
                instrumentId: 'exp_2',
                vol: 0.6,
                pattern: ["C1","-","-","-", "C1","-","-","-", "C1","-","-","-", "C1","-","-","-"]
            }
        ]
    },
    {
        id: 'mel_boss_tension',
        name: 'Boss Tension (140 BPM)',
        bpm: 140,
        tracks: [
            {
                // Arpeggio - using 'p_adv_1' (Organ)
                instrumentId: 'p_adv_1',
                vol: 0.5,
                pattern: ["A3","C4","E4","A4", "E4","C4","A3","-", "G3","B3","D4","G4", "D4","B3","G3","-"]
            },
            {
                // Driving Bass - using 'jump_4' (Heavy Square)
                instrumentId: 'jump_4',
                vol: 0.7,
                pattern: ["A1","-","A1","-", "A1","-","A1","-", "G1","-","G1","-", "G1","-","G1","-"]
            }
        ]
    },
    {
        id: 'mel_victory',
        name: 'Victory Fanfare (100 BPM)',
        bpm: 100,
        tracks: [
            {
                // Lead - Organ
                instrumentId: 'p_adv_1',
                vol: 0.6,
                pattern: ["C4","C4","C4","-", "E4","-","G4","-", "C5","-","-","-", "-","-","-","-"]
            },
            {
                // Harmony - 'jump_5' (Double Jump / Sine)
                instrumentId: 'jump_5',
                vol: 0.4,
                pattern: ["C3","-","E3","-", "G3","-","C4","-", "E4","-","-","-", "-","-","-","-"]
            }
        ]
    },
    {
        id: 'mel_creepy',
        name: 'Creepy Ambience (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Spooky Lead - 'hook_l_4' (Magic Sine)
                instrumentId: 'hook_l_4',
                vol: 0.7,
                pattern: ["F#4","-","-","-", "C5","-","-","-", "F4","-","-","-", "C#5","-","-","-"]
            },
            {
                // Low Drone - 'exp_3' (Distant Rumble)
                instrumentId: 'exp_3',
                vol: 0.8,
                pattern: ["C1","-","-","-", "-","-","-","-", "C#1","-","-","-", "-","-","-","-"]
            }
        ]
    }
];