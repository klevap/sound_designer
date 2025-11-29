/**
 * EXTENDED MUSIC LIBRARY - V4 (String Optimized)
 * Patterns are now single strings to save JSON space.
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_neon_chase',
        name: 'Neon Chase (128 BPM)',
        bpm: 128,
        tracks: [
            {
                instrumentId: 'exp_1', vol: 0.7,
                pattern: "C1 - - - C1 - - - C1 - - - C1 - - - C1 - - - C1 - - - C1 - - - C1 - C1 - C1 - - - C1 - - - C1 - - - C1 - - - C1 - C1 - C1 - - - C1 - C1 C1 C1 - - -"
            },
            {
                instrumentId: 'jump_4', vol: 0.5,
                pattern: "- - C2 - - C2 - C2 - - D#2 - - D#2 - D#2 - - F2 - - F2 - F2 - - C2 - - C2 A#1 - - - C2 - - C2 - C2 - - G2 - - G2 - G2 - - F2 - - F2 - F2 - - D#2 - D2 - C2 -"
            },
            {
                instrumentId: 'shoot_4', vol: 0.2,
                pattern: "C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 C4 C4 - C4 - C4 - C4 - C4 - C4 C4 C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 C4 C4 - C4 - C4 - C4 - C4 - C4 C4 C4 C4 C4 -"
            },
            {
                instrumentId: 'inst_hyper_lead', vol: 0.4,
                pattern: "C4 - - D#4 - G4 - A#4 C5 - - G4 - - F4 D#4 C4 - - C4 D#4 F4 - G4 F4 - D#4 - C4 - - - C5 - - A#4 - G4 - F4 G4 - - C5 - - D#5 - F5 - - G5 F5 - D#5 - C5 - A#4 - C5 - - -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "C3 - - - - - - - D#3 - - - - - - - F3 - - - - - - - G3 - - - - - - - C3 - - - - - - - A#2 - - - - - - - G#2 - - - - - - - G2 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_boss_battle',
        name: 'Final Boss (150 BPM)',
        bpm: 150,
        tracks: [
            {
                instrumentId: 'exp_2', vol: 0.5,
                pattern: "C1 - - C1 - - C1 - C1 - - - C1 - - - C1 - - C1 - - C1 - C1 - C1 - C1 - - - C1 - - C1 - - C1 - C1 - - - C1 - - - C1 - C1 - - - C1 - C1 - C1 - C1 - C1 -"
            },
            {
                instrumentId: 'inst_str_pizz', vol: 0.5,
                pattern: "A2 - E3 - C3 - E3 - G2 - D3 - B2 - D3 - F2 - C3 - A2 - C3 - E2 - B2 - G#2 - B2 - A2 - E3 - C3 - E3 - G2 - D3 - B2 - D3 - F2 - C3 - A2 - C3 - E2 - B2 - E2 - E2 -"
            },
            {
                instrumentId: 'inst_brass', vol: 0.5,
                pattern: "A2 - - - - - - - G2 - - - - - - - F2 - - F2 - - - - E2 - E2 - E2 - - - A2 - - C3 - - - - G2 - - B2 - - - - F2 - A2 C3 - - - - E2 - G#2 B2 E3 - - -"
            },
            {
                instrumentId: 'inst_str_ens', vol: 0.4,
                pattern: "A4 - - - - - - - B4 - - - - - - - C5 - - - - - - - B4 - - - - - - - E5 - - - - - - - D5 - - - - - - - C5 - - - - - - - B4 - - - - - - -"
            },
            {
                instrumentId: 'p_adv_1', vol: 0.4,
                pattern: "- - A4 - E5 - - - - - G4 - D5 - - - - - F4 - C5 - - - - - E4 - B4 - E5 - A5 - E5 - A4 - - - G5 - D5 - G4 - - - F5 - C5 - F4 - - - E5 - C5 - A4 - - -"
            }
        ]
    },
    {
        id: 'mel_deep_blue',
        name: 'Deep Blue (70 BPM)',
        bpm: 70,
        tracks: [
            {
                instrumentId: 'exp_3', vol: 0.7,
                pattern: "C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - G#0 - - - - - - - - - - - - - - - A#0 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "C5 - - - - - - - G4 - - - - - - - - - - - - - - - - - - - D#4 - - - - - - - - - - - C5 - - - - - - - - - - - - - - - A#4 - - - - - - -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "G3 - - - - - - - G3 - - - - - - - G3 - - - - - - - G3 - - - - - - - F3 - - - - - - - F3 - - - - - - - G3 - - - - - - - G3 - - - - - - -"
            },
            {
                instrumentId: 'inst_flute', vol: 0.5,
                pattern: "- - - - G4 - - - D#4 - - - C4 - - - - - - - - - - - - - - - - - - - - - - - C5 - - - G#4 - - - F4 - - - - - - - A#4 - - - G4 - - - D#4 - - -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - G#1 - - - - - - - G#1 - - - - - - - A#1 - - - - - - - A#1 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_space_waltz',
        name: 'Space Waltz (140 BPM)',
        bpm: 140,
        tracks: [
            {
                instrumentId: 'inst_str_ens', vol: 0.5,
                pattern: "C2 - - - - - - - C2 - - - - - - - A1 - - - - - - - A1 - - - - - - - F1 - - - - - - - F1 - - - - - - - G1 - - - - - - - G1 - - - - - - -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.4,
                pattern: "- - E3 G3 - - E3 G3 - - E3 G3 - - E3 G3 - - C3 E3 - - C3 E3 - - C3 E3 - - C3 E3 - - A2 C3 - - A2 C3 - - A2 C3 - - A2 C3 - - B2 D3 - - B2 D3 - - B2 D3 - - B2 D3"
            },
            {
                instrumentId: 'inst_str_ens', vol: 0.6,
                pattern: "E4 - - - - - F4 - G4 - - - - - - - C5 - - - - - B4 - A4 - - - - - - - F4 - - - - - G4 - A4 - - - - - - - B4 - - - - - C5 - D5 - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.5,
                pattern: "C4 - E4 - G4 - C5 - G4 - E4 - C4 - - - A3 - C4 - E4 - A4 - E4 - C4 - A3 - - - F3 - A3 - C4 - F4 - C4 - A3 - F3 - - - G3 - B3 - D4 - G4 - D4 - B3 - G3 - - -"
            },
            {
                instrumentId: 'exp_3', vol: 0.5,
                pattern: "C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - F0 - - - - - - - - - - - - - - - G0 - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_secret_garden',
        name: 'Secret Garden (100 BPM)',
        bpm: 100,
        tracks: [
            {
                instrumentId: 'inst_str_pizz', vol: 0.5,
                pattern: "D2 - A2 - F2 - A2 - D2 - A2 - F2 - A2 - G2 - B2 - D2 - B2 - G2 - B2 - D2 - B2 - A2 - C#3 - E2 - C#3 - A2 - C#3 - E2 - C#3 - D2 - A2 - F2 - A2 - D2 - A2 - F2 - A2 -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "F4 - E4 - D4 - - - A4 - - - F4 - - - G4 - F#4 - G4 - - - B4 - - - G4 - - - E4 - D4 - C#4 - - - E4 - - - A4 - - - F4 - E4 - D4 - - - D5 - - - - - - -"
            },
            {
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - - - A4 - - - - - - - D4 - - - - - - - B4 - - - - - - - G4 - - - - - - - C#5 - - - - - - - A4 - - - - - - - D5 - - - - - - - A4 - - -"
            },
            {
                instrumentId: 'inst_str_ens', vol: 0.3,
                pattern: "D3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - A3 - - - - - - - - - - - - - - - D3 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'hook_a_2', vol: 0.3,
                pattern: "- - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - C4 -"
            }
        ]
    },
    {
        id: 'mel_lofi_study',
        name: 'Lofi Study Beats (85 BPM)',
        bpm: 85,
        tracks: [
            {
                instrumentId: 'exp_1', vol: 0.6,
                pattern: "C1 - - - - - - - - - C1 - - - - - C1 - - - - - C1 - - - - - - - C1 - C1 - - - - - - - - - C1 - - - - - C1 - - C1 - - - - - - - C1 - - - - -"
            },
            {
                instrumentId: 'shoot_4', vol: 0.4,
                pattern: "- - - - C4 - - - - - - - C4 - - C4 - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - C4 - - - - C4 - - - - - - - C4 - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "F3 A3 C4 E4 - - - - - - F3 A3 - - - - E3 G3 B3 D4 - - - - - - E3 G3 - - - - D3 F3 A3 C4 - - - - - - D3 F3 - - - - C3 E3 G3 B3 - - - - - - C3 E3 - - - -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.5,
                pattern: "F1 - - - - - - - - - F1 - - - A1 - E1 - - - - - - - - - E1 - - - G1 - D1 - - - - - - - - - D1 - - - F1 - C1 - - - - - - - - - C1 - - - E1 -"
            },
            {
                instrumentId: 'hook_l_3', vol: 0.15,
                pattern: "C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_rain',
        name: 'Lofi - Rainy Window (80 BPM)',
        bpm: 80,
        tracks: [
            {
                instrumentId: 'exp_1', vol: 0.5,
                pattern: "C1 - - - - - - - C1 - - - - - C1 - C1 - - - - - - - - - C1 - - - - - C1 - - - - - - - C1 - - - - - C1 - C1 - - - - - - - - - C1 - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "- - C5 - - - B4 - G4 - - - - - - - - - E4 - - - G4 - A4 - - - - - - - - - C5 - - - B4 - G4 - - - - - - - - - E4 - - - D4 - C4 - - - - - - -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "A2 - - - - - - - E3 - - - - - - - F3 - - - - - - - C3 - - - - - - - A2 - - - - - - - E3 - - - - - - - F3 - - - - - - - G3 - - - - - - -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.5,
                pattern: "A1 - - - - - - - E1 - - - - - - - F1 - - - - - - - C1 - - - - - - - A1 - - - - - - - E1 - - - - - - - F1 - - - - - - - G1 - - - - - - -"
            },
            {
                instrumentId: 'hook_l_3', vol: 0.2,
                pattern: "C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 -"
            }
        ]
    },
    {
        id: 'mel_lofi_coffee',
        name: 'Lofi - Coffee Shop (90 BPM)',
        bpm: 90,
        tracks: [
            {
                instrumentId: 'inst_organ', vol: 0.6,
                pattern: "D2 - - - D2 - - - G1 - - - G1 - - - C2 - - - C2 - - - A1 - - - A1 - - - D2 - - - D2 - - - G1 - - - G1 - - - C2 - - - C2 - - - C2 - - - C2 - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.5,
                pattern: "- - F3 A3 - - - - - - F3 B3 - - - - - - E3 G3 - - - - - - E3 A3 - - - - - - F3 A3 - - - - - - F3 B3 - - - - - - E3 G3 - - - - - - E3 G3 - - - -"
            },
            {
                instrumentId: 'hook_a_2', vol: 0.4,
                pattern: "- - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - -"
            },
            {
                instrumentId: 'inst_flute', vol: 0.5,
                pattern: "- - - - - - A4 - B4 - A4 - G4 - - - E4 - - - - - D4 - E4 - - - - - - - - - - - A4 - B4 - A4 - G4 - - - C5 - - - - - B4 - C5 - - - - - - -"
            },
            {
                instrumentId: 'shoot_4', vol: 0.2,
                pattern: "C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 -"
            }
        ]
    },
    {
        id: 'mel_lofi_night',
        name: 'Lofi - Night Walk (75 BPM)',
        bpm: 75,
        tracks: [
            {
                instrumentId: 'exp_1', vol: 0.6,
                pattern: "C1 - - - - - C1 - - - - - - - - - C1 - - - - - C1 - - - - - - - C1 - C1 - - - - - C1 - - - - - - - - - C1 - - - - - C1 - - - - - - - C1 -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "F2 - - - - - - - G2 - - - - - - - E2 - - - - - - - A2 - - - - - - - D2 - - - - - - - G2 - - - - - - - C2 - - - - - - - C3 - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "- - A3 - C4 - - - - - B3 - D4 - - - - - G3 - B3 - - - - - C4 - E4 - - - - - F3 - A3 - - - - - B3 - D4 - - - - - E4 - - - - - - - - - - - -"
            },
            {
                instrumentId: 'shoot_4', vol: 0.15,
                pattern: "C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 - C4 -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.5,
                pattern: "F1 - - - - - - - G1 - - - - - - - E1 - - - - - - - A1 - - - - - - - D1 - - - - - - - G1 - - - - - - - C1 - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_sunrise',
        name: 'Ethereal Sunrise (80 BPM)',
        bpm: 80,
        tracks: [
            {
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "C3 - - - - - - - - - - - - - - - F3 - - - - - - - - - - - - - - - A2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - C3 - - - - - - - - - - - - - - - F3 - - - - - - - - - - - - - - - A2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "E4 - - G4 - - C5 - E4 - - G4 - - C5 - F4 - - A4 - - C5 - F4 - - A4 - - C5 - E4 - - A4 - - C5 - E4 - - A4 - - C5 - D4 - - G4 - - B4 - D4 - - G4 - - B4 - E4 - - G4 - - C5 - E4 - - G4 - - C5 - F4 - - A4 - - C5 - F4 - - A4 - - C5 - E4 - - A4 - - C5 - E4 - - A4 - - C5 - D4 - - G4 - - B4 - D4 - - G4 - - B4 -"
            },
            {
                instrumentId: 'inst_flute', vol: 0.5,
                pattern: "C5 - - - - - B4 - C5 - - - G4 - - - A4 - - - - - G4 - F4 - - - E4 - - - C5 - - - - - D5 - E5 - - - C5 - - - B4 - - - - - A4 - G4 - - - - - - - C5 - - - - - B4 - C5 - - - G4 - - - A4 - - - - - G4 - F4 - - - E4 - - - C5 - - - - - D5 - E5 - - - C5 - - - B4 - - - - - A4 - G4 - - - - - - -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.3,
                pattern: "C2 - - - C2 - - - C2 - - - C2 - - - F2 - - - F2 - - - F2 - - - F2 - - - A1 - - - A1 - - - A1 - - - A1 - - - G1 - - - G1 - - - G1 - - - G1 - - - C2 - - - C2 - - - C2 - - - C2 - - - F2 - - - F2 - - - F2 - - - F2 - - - A1 - - - A1 - - - A1 - - - A1 - - - G1 - - - G1 - - - G1 - - - G1 - - -"
            },
            {
                instrumentId: 'inst_glass_bell', vol: 0.2,
                pattern: "- - - - - - - - - - - - C5 - G4 - - - - - - - - - - - - - A4 - F4 - - - - - - - - - - - - - E5 - C5 - - - - - - - - - - - - - D5 - B4 - - - - - - - - - - - - - C5 - G4 - - - - - - - - - - - - - A4 - F4 - - - - - - - - - - - - - E5 - C5 - - - - - - - - - - - - - D5 - B4 -"
            }
        ]
    },
    {
        id: 'mel_ethereal_islands',
        name: 'Ethereal - Floating Islands (70 BPM)',
        bpm: 70,
        tracks: [
            {
                instrumentId: 'inst_pad_dark', vol: 0.6,
                pattern: "C2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - F2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - F2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_flute', vol: 0.5,
                pattern: "- - - - E4 - - - - - - - G4 - - - - - - - D4 - - - - - - - B3 - - - - - - - C4 - - - - - - - A3 - - - - - - - G3 - - - - - - - - - - - - - - - E4 - - - - - - - G4 - - - - - - - D4 - - - - - - - B3 - - - - - - - C4 - - - - - - - A3 - - - - - - - C4 - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.4,
                pattern: "C4 - G3 - C4 - G3 - C4 - G3 - C4 - G3 - B3 - G3 - B3 - G3 - B3 - G3 - B3 - G3 - A3 - F3 - A3 - F3 - A3 - F3 - A3 - F3 - G3 - E3 - G3 - E3 - G3 - E3 - G3 - E3 - C4 - G3 - C4 - G3 - C4 - G3 - C4 - G3 - B3 - G3 - B3 - G3 - B3 - G3 - B3 - G3 - A3 - F3 - A3 - F3 - A3 - F3 - A3 - F3 - G3 - E3 - G3 - E3 - G3 - E3 - G3 - E3 -"
            },
            {
                instrumentId: 'hook_l_3', vol: 0.2,
                pattern: "C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'exp_3', vol: 0.5,
                pattern: "C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_aurora',
        name: 'Ethereal - Aurora (90 BPM)',
        bpm: 90,
        tracks: [
            {
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "D3 - - - - - - - A3 - - - - - - - B3 - - - - - - - F#3 - - - - - - - G3 - - - - - - - D3 - - - - - - - A3 - - - - - - - A2 - - - - - - - D3 - - - - - - - A3 - - - - - - - B3 - - - - - - - F#3 - - - - - - - G3 - - - - - - - D3 - - - - - - - A3 - - - - - - - D3 - - - - - - -"
            },
            {
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - F#4 - - - A4 - - - D5 - - - A4 - - - F#4 - - - D4 - - - F#4 - - - A4 - - - B4 - - - G4 - - - D4 - - - G4 - - - E4 - - - C#4 - - - E4 - - - A4 - - - F#4 - - - A4 - - - D5 - - - A4 - - - F#4 - - - D4 - - - F#4 - - - A4 - - - B4 - - - G4 - - - D4 - - - G4 - - - E4 - - - C#4 - - - E4 - - - D4 -"
            },
            {
                instrumentId: 'inst_organ', vol: 0.4,
                pattern: "D2 - - - - - - - A2 - - - - - - - B2 - - - - - - - F#2 - - - - - - - G2 - - - - - - - D2 - - - - - - - A2 - - - - - - - A1 - - - - - - - D2 - - - - - - - A2 - - - - - - - B2 - - - - - - - F#2 - - - - - - - G2 - - - - - - - D2 - - - - - - - A2 - - - - - - - D2 - - - - - - -"
            },
            {
                instrumentId: 'inst_str_ens', vol: 0.3,
                pattern: "F#3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - E3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - E3 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.4,
                pattern: "D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - C#4 - - - C#4 - - - C#4 - - - C#4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - C#4 - - - C#4 - - - C#4 - - - C#4 - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_underwater',
        name: 'Ethereal - Underwater (60 BPM)',
        bpm: 60,
        tracks: [
            {
                instrumentId: 'exp_3', vol: 0.6,
                pattern: "C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - G#0 - - - - - - - - - - - - - - - A#0 - - - - - - - - - - - - - - - C1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - G#0 - - - - - - - - - - - - - - - A#0 - - - - - - - - - - - - - - -"
            },
            {
                instrumentId: 'inst_epiano', vol: 0.5,
                pattern: "C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G#4 - C5 - G#4 - D#4 - C4 - - - A#3 - D4 - F4 - A#4 - F4 - D4 - A#3 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G#4 - C5 - G#4 - D#4 - C4 - - - A#3 - D4 - F4 - A#4 - F4 - D4 - A#3 - - -"
            },
            {
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - G#1 - - - - - - - G#1 - - - - - - - A#1 - - - - - - - A#1 - - - - - - - C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - C2 - - - - - - - G#1 - - - - - - - G#1 - - - - - - - A#1 - - - - - - - A#1 - - - - - - -"
            },
            {
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - - - G4 - - - - - - - C5 - - - - - - - - - - - - - - - D#5 - - - - - - - C5 - - - - - - - F4 - - - - - - - D4 - - - - - - - G4 - - - - - - - C5 - - - - - - - - - - - - - - - D#5 - - - - - - - C5 - - - - - - - F4 - - - - - - - D4 - - -"
            },
            {
                instrumentId: 'hook_l_3', vol: 0.2,
                pattern: "C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - -"
            }
        ]
    }
];