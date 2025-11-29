/**
 * EXTENDED MUSIC LIBRARY
 * Complex arrangements with 5 layers and 32-step patterns.
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_neon_chase',
        name: 'Neon Chase (128 BPM)',
        bpm: 128,
        tracks: [
            {
                // LAYER 1: Kick Drum (Four-on-the-floor)
                instrumentId: 'exp_1', 
                vol: 0.7,
                pattern: [
                    "C1","-","-","-", "C1","-","-","-", "C1","-","-","-", "C1","-","-","-",
                    "C1","-","-","-", "C1","-","-","-", "C1","-","-","-", "C1","-","C1","-"
                ]
            },
            {
                // LAYER 2: Rolling Bassline (Off-beat drive)
                instrumentId: 'jump_4', 
                vol: 0.6,
                pattern: [
                    "-","-","C2","-", "-","C2","-","C2", "-","-","D#2","-", "-","D#2","-","D#2",
                    "-","-","F2","-", "-","F2","-","F2", "-","-","C2","-", "-","C2","A#1","-"
                ]
            },
            {
                // LAYER 3: Hi-Hats (Fast 16ths with gaps)
                instrumentId: 'shoot_4',
                vol: 0.3,
                pattern: [
                    "C4","C4","C4","-", "C4","C4","C4","-", "C4","C4","C4","-", "C4","C4","C4","C4",
                    "C4","-","C4","-", "C4","C4","C4","-", "C4","C4","C4","C4", "C4","-","C4","-"
                ]
            },
            {
                // LAYER 4: HyperSaw Lead (Main Melody)
                instrumentId: 'inst_hyper_lead',
                vol: 0.5,
                pattern: [
                    "C4","-","-","D#4", "-","G4","-","A#4", "C5","-","-","G4", "-","-","F4","D#4",
                    "C4","-","-","C4", "D#4","F4","-","G4", "F4","-","D#4","-", "C4","-","-","-"
                ]
            },
            {
                // LAYER 5: Atmospheric Pad (Sustained chords)
                instrumentId: 'inst_pad_dark',
                vol: 0.4,
                pattern: [
                    "C3","-","-","-", "-","-","-","-", "D#3","-","-","-", "-","-","-","-",
                    "F3","-","-","-", "-","-","-","-", "G3","-","-","-", "-","-","-","-"
                ]
            }
        ]
    },
    {
        id: 'mel_boss_battle',
        name: 'Final Boss (150 BPM)',
        bpm: 150,
        tracks: [
            {
                // LAYER 1: Heavy Orchestral Percussion
                instrumentId: 'exp_2',
                vol: 0.6,
                pattern: [
                    "C1","-","-","C1", "-","-","C1","-", "C1","C1","-","-", "C1","-","-","-",
                    "C1","-","-","C1", "-","-","C1","-", "C1","-","C1","C1", "C1","-","-","-"
                ]
            },
            {
                // LAYER 2: Staccato Strings (Ostinato)
                instrumentId: 'inst_str_pizz',
                vol: 0.5,
                pattern: [
                    "A2","A2","E3","A2", "C3","A2","E3","A2", "G2","G2","D3","G2", "B2","G2","D3","G2",
                    "F2","F2","C3","F2", "A2","F2","C3","F2", "E2","E2","B2","E2", "G#2","E2","B2","-"
                ]
            },
            {
                // LAYER 3: Brass Stabs (Dramatic accents)
                instrumentId: 'inst_brass',
                vol: 0.6,
                pattern: [
                    "A2","-","-","-", "-","-","-","-", "G2","-","-","-", "-","-","-","-",
                    "F2","-","-","F2", "-","-","-","-", "E2","-","E2","-", "E2","-","-","-"
                ]
            },
            {
                // LAYER 4: High Tension Strings
                instrumentId: 'inst_str_ens',
                vol: 0.4,
                pattern: [
                    "A4","-","-","-", "-","-","-","-", "B4","-","-","-", "-","-","-","-",
                    "C5","-","-","-", "-","-","-","-", "B4","-","-","-", "-","-","-","-"
                ]
            },
            {
                // LAYER 5: Arpeggiated Lead
                instrumentId: 'p_adv_1',
                vol: 0.4,
                pattern: [
                    "-","-","A4","C5", "E5","-","-","-", "-","-","G4","B4", "D5","-","-","-",
                    "-","-","F4","A4", "C5","-","-","-", "-","-","E4","G#4", "B4","-","E5","-"
                ]
            }
        ]
    },
    {
        id: 'mel_crystal_cave',
        name: 'Crystal Cave (90 BPM)',
        bpm: 90,
        tracks: [
            {
                // LAYER 1: Deep Sub Drone
                instrumentId: 'exp_3',
                vol: 0.7,
                pattern: [
                    "C1","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-",
                    "G0","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-"
                ]
            },
            {
                // LAYER 2: Glass Bell Melody (Sparse & Echoey)
                instrumentId: 'inst_glass_bell',
                vol: 0.6,
                pattern: [
                    "C5","-","-","-", "G4","-","-","-", "D#5","-","-","-", "-","-","C5","-",
                    "-","-","A#4","-", "-","-","G4","-", "C5","-","-","-", "-","-","-","-"
                ]
            },
            {
                // LAYER 3: Ice Pad (Atmosphere)
                instrumentId: 'inst_ice_pad',
                vol: 0.4,
                pattern: [
                    "C3","-","-","-", "-","-","-","-", "D#3","-","-","-", "-","-","-","-",
                    "F3","-","-","-", "-","-","-","-", "D#3","-","-","-", "-","-","-","-"
                ]
            },
            {
                // LAYER 4: Magic Sparkles (Texture)
                instrumentId: 'hook_l_4',
                vol: 0.3,
                pattern: [
                    "-","-","-","-", "-","-","C6","-", "-","-","-","-", "-","-","-","-",
                    "-","-","-","-", "G5","-","-","-", "-","-","-","-", "C6","-","G6","-"
                ]
            },
            {
                // LAYER 5: Soft Pulse (Rhythm)
                instrumentId: 'inst_epiano',
                vol: 0.5,
                pattern: [
                    "C4","-","C4","-", "C4","-","C4","-", "C4","-","C4","-", "C4","-","C4","-",
                    "A#3","-","A#3","-", "A#3","-","A#3","-", "G3","-","G3","-", "G3","-","G3","-"
                ]
            }
        ]
    },
    {
        id: 'mel_retro_fun',
        name: 'Retro Adventure (110 BPM)',
        bpm: 110,
        tracks: [
            {
                // LAYER 1: Bouncy Bass
                instrumentId: 'jump_1',
                vol: 0.6,
                pattern: [
                    "C2","-","-","C2", "G1","-","C2","-", "F1","-","-","F1", "C2","-","F1","-",
                    "G1","-","-","G1", "D2","-","G1","-", "C2","-","G1","-", "C2","-","-","-"
                ]
            },
            {
                // LAYER 2: Chords (Off-beat Skank)
                instrumentId: 'inst_epiano',
                vol: 0.5,
                pattern: [
                    "-","-","E3","G3", "-","-","E3","G3", "-","-","F3","A3", "-","-","F3","A3",
                    "-","-","G3","B3", "-","-","G3","B3", "-","-","E3","G3", "-","-","E3","G3"
                ]
            },
            {
                // LAYER 3: Happy Lead
                instrumentId: 'p_adv_1',
                vol: 0.5,
                pattern: [
                    "C4","-","D4","-", "E4","-","C4","-", "F4","-","E4","-", "D4","-","C4","-",
                    "D4","-","E4","-", "F4","-","D4","-", "E4","D4","C4","-", "-","-","-","-"
                ]
            },
            {
                // LAYER 4: Snare/Clap
                instrumentId: 'shoot_1',
                vol: 0.3,
                pattern: [
                    "-","-","-","-", "C4","-","-","-", "-","-","-","-", "C4","-","-","-",
                    "-","-","-","-", "C4","-","-","-", "-","-","-","-", "C4","-","C4","-"
                ]
            },
            {
                // LAYER 5: High Arp Decoration
                instrumentId: 'jump_5',
                vol: 0.3,
                pattern: [
                    "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-",
                    "-","-","-","-", "-","-","-","-", "C5","E5","G5","C6", "E6","-","-","-"
                ]
            }
        ]
    }
];