/**
 * EXTENDED MUSIC LIBRARY - ULTIMATE EDITION
 * Optimized for New Realistic Instruments (PWM & Filter Envelopes)
 * All melodies restored and enhanced.
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_neon_chase',
        name: 'Neon Chase (128 BPM)',
        bpm: 128,
        tracks: [
            {
                // Driving Analog Bass using PWM + Filter
                instrumentId: 'inst_real_bass', vol: 0.8,
                pattern: "C2 - C2 - C3 - C2 - G1 - G1 - A#1 - C2 - C2 - C2 - C3 - C2 - F2 - D#2 - D2 - C2 -"
            },
            {
                // Kick Drum
                instrumentId: 'jump_4', vol: 0.6,
                pattern: "C2 - - - C2 - - - C2 - - - C2 - - - C2 - - - C2 - - - C2 - - - C2 - C2 -"
            },
            {
                // Hi-Hats
                instrumentId: 'shoot_4', vol: 0.3,
                pattern: "- - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - C4 C4 C4 -"
            },
            {
                // HyperSaw Lead - Cyberpunk melody
                instrumentId: 'inst_hyper_lead', vol: 0.5,
                pattern: "C4 - - D#4 - G4 - A#4 C5 - - G4 - - F4 D#4 C4 - - C4 D#4 F4 - G4 F4 - D#4 - C4 - - - C5 - - A#4 - G4 - F4 G4 - - C5 - - D#5 - F5 - - G5 F5 - D#5 - C5 - A#4 - C5 - - -"
            },
            {
                // Background Pad
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
                // Orchestral Percussion
                instrumentId: 'exp_2', vol: 0.6,
                pattern: "C1 - - C1 - - C1 - C1 - - - C1 - - - C1 - - C1 - - C1 - C1 - C1 - C1 - - - C1 - - C1 - - C1 - C1 - - - C1 - - - C1 - C1 - - - C1 - C1 - C1 - C1 - C1 -"
            },
            {
                // Fast Violin Arpeggios (New Real Violin)
                instrumentId: 'inst_real_violin', vol: 0.6,
                pattern: "A3 C4 E4 A4 G3 B3 D4 G4 F3 A3 C4 F4 E3 G#3 B3 E4 A3 C4 E4 A4 G3 B3 D4 G4 F3 A3 C4 F4 E3 G#3 B3 E4"
            },
            {
                // Heroic Trumpet Melody (New Real Trumpet)
                instrumentId: 'inst_real_trumpet', vol: 0.7,
                pattern: "A4 - - - - - - - B4 - - - - - - - C5 - - - - - - - B4 - - - - - - - E5 - - - - - - - D5 - - - - - - - C5 - - - - - - - B4 - - - - - - -"
            },
            {
                // Heavy Piano Chords (New Real Piano)
                instrumentId: 'inst_real_piano', vol: 0.6,
                pattern: "A2 - - - - - - - G2 - - - - - - - F2 - - - - - - - E2 - - - - - - - A2 - - - - - - - G2 - - - - - - - F2 - - - - - - - E2 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_deep_blue',
        name: 'Deep Blue (70 BPM)',
        bpm: 70,
        tracks: [
            {
                // Deep Sub Bass
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "C2 - - - - - - - - - - - - - - - G1 - - - - - - - - - - - - - - - A#1 - - - - - - - - - - - - - - - F1 - - - - - - - - - - - - - - -"
            },
            {
                // Real Piano Chords
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "C4 - D#4 G4 - - - - - - - - - - - A#3 - D4 F4 - - - - - - - - - - - G#3 - C4 D#4 - - - - - - - - - - - G3 - A#3 D4 - - - - - - - - - - -"
            },
            {
                // Breathy Flute Melody (New Real Flute)
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "- - - - G4 - - - D#4 - - - C4 - - - - - - - - - - - - - - - - - - - - - - - C5 - - - G#4 - - - F4 - - - - - - - A#4 - - - G4 - - - D#4 - - -"
            },
            {
                // Atmospheric Pad
                instrumentId: 'inst_ice_pad', vol: 0.4,
                pattern: "C3 - - - - - - - - - - - - - - - A#2 - - - - - - - - - - - - - - - G#2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_space_waltz',
        name: 'Space Waltz (140 BPM)',
        bpm: 140,
        tracks: [
            {
                // Pizzicato Bass (Oom-pah-pah feel)
                instrumentId: 'inst_str_pizz', vol: 0.6,
                pattern: "C2 - - - - - - - C2 - - - - - - - A1 - - - - - - - A1 - - - - - - - F1 - - - - - - - F1 - - - - - - - G1 - - - - - - - G1 - - - - - - -"
            },
            {
                // Clarinet Rhythm (New Real Clarinet)
                instrumentId: 'inst_real_clarinet', vol: 0.5,
                pattern: "- - E4 G4 - - E4 G4 - - E4 G4 - - E4 G4 - - C4 E4 - - C4 E4 - - C4 E4 - - C4 E4 - - A3 C4 - - A3 C4 - - A3 C4 - - A3 C4 - - B3 D4 - - B3 D4 - - B3 D4 - - B3 D4"
            },
            {
                // Violin Melody
                instrumentId: 'inst_real_violin', vol: 0.6,
                pattern: "E5 - - - - - F5 - G5 - - - - - - - C6 - - - - - B5 - A5 - - - - - - - F5 - - - - - G5 - A5 - - - - - - - B5 - - - - - C6 - D6 - - - - - - -"
            },
            {
                // Glass Bell Accents
                instrumentId: 'inst_glass_bell', vol: 0.4,
                pattern: "C5 - - - - - - - - - - - - - - - A4 - - - - - - - - - - - - - - - F4 - - - - - - - - - - - - - - - G4 - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_secret_garden',
        name: 'Secret Garden (100 BPM)',
        bpm: 100,
        tracks: [
            {
                // Pizzicato Arp
                instrumentId: 'inst_str_pizz', vol: 0.5,
                pattern: "D3 - A3 - F3 - A3 - D3 - A3 - F3 - A3 - G3 - B3 - D3 - B3 - G3 - B3 - D3 - B3 - A3 - C#4 - E3 - C#4 - A3 - C#4 - E3 - C#4 - D3 - A3 - F3 - A3 - D3 - A3 - F3 - A3 -"
            },
            {
                // Real Flute Lead
                instrumentId: 'inst_real_flute', vol: 0.7,
                pattern: "F4 - E4 - D4 - - - A4 - - - F4 - - - G4 - F#4 - G4 - - - B4 - - - G4 - - - E4 - D4 - C#4 - - - E4 - - - A4 - - - F4 - E4 - D4 - - - D5 - - - - - - -"
            },
            {
                // Piano Support
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "D3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - A3 - - - - - - - - - - - - - - - D3 - - - - - - - - - - - - - - -"
            },
            {
                // High Bell
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - - - A5 - - - - - - - D5 - - - - - - - B5 - - - - - - - G5 - - - - - - - C#6 - - - - - - - A5 - - - - - - - D6 - - - - - - - A5 - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_study',
        name: 'Lofi Study Beats (85 BPM)',
        bpm: 85,
        tracks: [
            {
                // Analog Bass (Smooth)
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "F2 - - - - - - - - - F2 - - - - - E2 - - - - - - - - - E2 - - - - - D2 - - - - - - - - - D2 - - - - - C2 - - - - - - - - - C2 - - - - -"
            },
            {
                // Soft Hi-Hats
                instrumentId: 'shoot_4', vol: 0.2,
                pattern: "- - - - C4 - - - - - - - C4 - - C4 - - - - C4 - - - - - - - C4 - - - - - - - C4 - - - - - - - C4 - - C4 - - - - C4 - - - - - - - C4 - - -"
            },
            {
                // Real Piano Chords (Jazzy)
                instrumentId: 'inst_real_piano', vol: 0.6,
                pattern: "F3 A3 C4 E4 - - - - - - F3 A3 - - - - E3 G3 B3 D4 - - - - - - E3 G3 - - - - D3 F3 A3 C4 - - - - - - D3 F3 - - - - C3 E3 G3 B3 - - - - - - C3 E3 - - - -"
            },
            {
                // Muted Trumpet Solo (Wah effect)
                instrumentId: 'inst_real_trumpet', vol: 0.5,
                pattern: "- - - - - - - - - - - - - - - - - - - - A4 - - G4 - - F4 - - E4 - - - - - - - - - - - - - - - - - - - - D4 - - E4 - - F4 - - G4 - - A4 - -"
            }
        ]
    },
    {
        id: 'mel_lofi_rain',
        name: 'Lofi - Rainy Window (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Kick
                instrumentId: 'jump_4', vol: 0.5,
                pattern: "C2 - - - - - - - C2 - - - - - C2 - C2 - - - - - - - - - C2 - - - - - C2 - - - - - - - C2 - - - - - C2 - C2 - - - - - - - - - C2 - - - - -"
            },
            {
                // Real Piano Melody
                instrumentId: 'inst_real_piano', vol: 0.7,
                pattern: "- - C5 - - - B4 - G4 - - - - - - - - - E4 - - - G4 - A4 - - - - - - - - - C5 - - - B4 - G4 - - - - - - - - - E4 - - - D4 - C4 - - - - - - -"
            },
            {
                // Dark Pad
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "A2 - - - - - - - E3 - - - - - - - F3 - - - - - - - C3 - - - - - - - A2 - - - - - - - E3 - - - - - - - F3 - - - - - - - G3 - - - - - - -"
            },
            {
                // Clarinet Counter-melody
                instrumentId: 'inst_real_clarinet', vol: 0.4,
                pattern: "A3 - - - - - - - E3 - - - - - - - F3 - - - - - - - C3 - - - - - - - A3 - - - - - - - E3 - - - - - - - F3 - - - - - - - G3 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_coffee',
        name: 'Lofi - Coffee Shop (90 BPM)',
        bpm: 90,
        tracks: [
            {
                // Organ Chords
                instrumentId: 'inst_organ', vol: 0.6,
                pattern: "D3 F3 A3 - - - D3 F3 A3 - - - G2 B2 D3 - - - G2 B2 D3 - - - C3 E3 G3 - - - C3 E3 G3 - - - A2 C3 E3 - - - A2 C3 E3 - - - D3 F3 A3 - - - D3 F3 A3 - - - G2 B2 D3 - - - G2 B2 D3 - - - C3 E3 G3 - - - C3 E3 G3 - - - C3 E3 G3 - - - C3 E3 G3 - - -"
            },
            {
                // Walking Bass (Real Bass)
                instrumentId: 'inst_real_bass', vol: 0.6,
                pattern: "D2 - - - A1 - - - G1 - - - B1 - - - C2 - - - G1 - - - A1 - - - E1 - - - D2 - - - A1 - - - G1 - - - B1 - - - C2 - - - G1 - - - C2 - - - G1 - - -"
            },
            {
                // Flute Solo
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "- - - - - - A4 - B4 - A4 - G4 - - - E4 - - - - - D4 - E4 - - - - - - - - - - - A4 - B4 - A4 - G4 - - - C5 - - - - - B4 - C5 - - - - - - -"
            },
            {
                // Soft Percussion
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
                // Deep Bass
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "F1 - - - - - - - - - - - - - - - G1 - - - - - - - - - - - - - - - E1 - - - - - - - - - - - - - - - A1 - - - - - - - - - - - - - - -"
            },
            {
                // E-Piano Chords
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "- - A3 C4 E4 - - - - - B3 D4 F#4 - - - - - G3 B3 D4 - - - - - C4 E4 G4 - - - - - F3 A3 C4 - - - - - B3 D4 F#4 - - - - - E4 G#4 B4 - - - - - - - - - - - -"
            },
            {
                // Noir Trumpet
                instrumentId: 'inst_real_trumpet', vol: 0.5,
                pattern: "C4 - - - - - D4 - E4 - - - - - - - B3 - - - - - - - - - - - - - - - G3 - - - - - - - A3 - B3 - - - - - C4 - - - - - - - - - - - - - - - - - - - - - -"
            },
            {
                // Slow Kick
                instrumentId: 'exp_1', vol: 0.5,
                pattern: "C1 - - - - - - - - - - - - - - - C1 - - - - - - - - - - - - - - - C1 - - - - - - - - - - - - - - - C1 - - - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_sunrise',
        name: 'Ethereal Sunrise (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Ice Pad Atmosphere
                instrumentId: 'inst_ice_pad', vol: 0.5,
                pattern: "C3 - - - - - - - - - - - - - - - F3 - - - - - - - - - - - - - - - A2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - C3 - - - - - - - - - - - - - - - F3 - - - - - - - - - - - - - - - A2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - -"
            },
            {
                // Real Piano Arpeggios
                instrumentId: 'inst_real_piano', vol: 0.6,
                pattern: "E4 - - G4 - - C5 - E4 - - G4 - - C5 - F4 - - A4 - - C5 - F4 - - A4 - - C5 - E4 - - A4 - - C5 - E4 - - A4 - - C5 - D4 - - G4 - - B4 - D4 - - G4 - - B4 - E4 - - G4 - - C5 - E4 - - G4 - - C5 - F4 - - A4 - - C5 - F4 - - A4 - - C5 - E4 - - A4 - - C5 - E4 - - A4 - - C5 - D4 - - G4 - - B4 - D4 - - G4 - - B4 -"
            },
            {
                // Real Flute Melody
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "C5 - - - - - B4 - C5 - - - G4 - - - A4 - - - - - G4 - F4 - - - E4 - - - C5 - - - - - D5 - E5 - - - C5 - - - B4 - - - - - A4 - G4 - - - - - - - C5 - - - - - B4 - C5 - - - G4 - - - A4 - - - - - G4 - F4 - - - E4 - - - C5 - - - - - D5 - E5 - - - C5 - - - B4 - - - - - A4 - G4 - - - - - - -"
            },
            {
                // Glass Bell Sparkles
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - - - - - - - - - - - C6 - G5 - - - - - - - - - - - - - A5 - F5 - - - - - - - - - - - - - E6 - C6 - - - - - - - - - - - - - D6 - B5 - - - - - - - - - - - - - C6 - G5 - - - - - - - - - - - - - A5 - F5 - - - - - - - - - - - - - E6 - C6 - - - - - - - - - - - - - D6 - B5 -"
            }
        ]
    },
    {
        id: 'mel_ethereal_islands',
        name: 'Ethereal - Floating Islands (70 BPM)',
        bpm: 70,
        tracks: [
            {
                // Dark Pad Base
                instrumentId: 'inst_pad_dark', vol: 0.6,
                pattern: "C2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - F2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - - G2 - - - - - - - - - - - - - - - F2 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - -"
            },
            {
                // Woodwind Duet (Flute)
                instrumentId: 'inst_real_flute', vol: 0.5,
                pattern: "- - - - E4 - - - - - - - G4 - - - - - - - D4 - - - - - - - B3 - - - - - - - C4 - - - - - - - A3 - - - - - - - G3 - - - - - - - - - - - - - - - E4 - - - - - - - G4 - - - - - - - D4 - - - - - - - B3 - - - - - - - C4 - - - - - - - A3 - - - - - - - C4 - - - - - - - - - - -"
            },
            {
                // Woodwind Duet (Clarinet)
                instrumentId: 'inst_real_clarinet', vol: 0.5,
                pattern: "C4 - - - - - - - - - - - - - - - B3 - - - - - - - - - - - - - - - A3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - C4 - - - - - - - - - - - - - - - B3 - - - - - - - - - - - - - - - A3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - -"
            },
            {
                // Piano Sparse Chords
                instrumentId: 'inst_real_piano', vol: 0.4,
                pattern: "C4 E4 G4 - - - - - - - - - - - - - B3 D4 G4 - - - - - - - - - - - - - A3 C4 F4 - - - - - - - - - - - - - G3 C4 E4 - - - - - - - - - - - - - C4 E4 G4 - - - - - - - - - - - - - B3 D4 G4 - - - - - - - - - - - - - A3 C4 F4 - - - - - - - - - - - - - G3 C4 E4 - - - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_aurora',
        name: 'Ethereal - Aurora (90 BPM)',
        bpm: 90,
        tracks: [
            {
                // Dark Pad Base
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "D3 - - - - - - - A3 - - - - - - - B3 - - - - - - - F#3 - - - - - - - G3 - - - - - - - D3 - - - - - - - A3 - - - - - - - A2 - - - - - - - D3 - - - - - - - A3 - - - - - - - B3 - - - - - - - F#3 - - - - - - - G3 - - - - - - - D3 - - - - - - - A3 - - - - - - - D3 - - - - - - -"
            },
            {
                // HyperSaw Lead (Reverb-like)
                instrumentId: 'inst_hyper_lead', vol: 0.3,
                pattern: "- - F#4 - - - A4 - - - D5 - - - A4 - - - F#4 - - - D4 - - - F#4 - - - A4 - - - B4 - - - G4 - - - D4 - - - G4 - - - E4 - - - C#4 - - - E4 - - - A4 - - - F#4 - - - A4 - - - D5 - - - A4 - - - F#4 - - - D4 - - - F#4 - - - A4 - - - B4 - - - G4 - - - D4 - - - G4 - - - E4 - - - C#4 - - - E4 - - - D4 -"
            },
            {
                // Real Violin Sustains
                instrumentId: 'inst_real_violin', vol: 0.4,
                pattern: "F#3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - E3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - F#3 - - - - - - - - - - - - - - - G3 - - - - - - - - - - - - - - - E3 - - - - - - - - - - - - - - -"
            },
            {
                // Real Piano Chords
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - C#4 - - - C#4 - - - C#4 - - - C#4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - D4 - - - C#4 - - - C#4 - - - C#4 - - - C#4 - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_underwater',
        name: 'Ethereal - Underwater (60 BPM)',
        bpm: 60,
        tracks: [
            {
                // Sub Bass (Filtered)
                instrumentId: 'inst_real_bass', vol: 0.6,
                pattern: "C2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - G1 - - - - - - - - - - - - - - - A#1 - - - - - - - - - - - - - - - C2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - G1 - - - - - - - - - - - - - - - A#1 - - - - - - - - - - - - - - -"
            },
            {
                // Watery E-Piano
                instrumentId: 'inst_epiano', vol: 0.5,
                pattern: "C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G#4 - C5 - G#4 - D#4 - C4 - - - A#3 - D4 - F4 - A#4 - F4 - D4 - A#3 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G4 - C5 - G4 - D#4 - C4 - - - C4 - D#4 - G#4 - C5 - G#4 - D#4 - C4 - - - A#3 - D4 - F4 - A#4 - F4 - D4 - A#3 - - -"
            },
            {
                // Echoing Flute
                instrumentId: 'inst_real_flute', vol: 0.5,
                pattern: "- - - - G4 - - - - - - - C5 - - - - - - - - - - - - - - - D#5 - - - - - - - C5 - - - - - - - F4 - - - - - - - D4 - - - - - - - G4 - - - - - - - C5 - - - - - - - - - - - - - - - D#5 - - - - - - - C5 - - - - - - - F4 - - - - - - - D4 - - -"
            },
            {
                // Bubble Bells
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "C5 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C5 - - - - - - - - - - - - - - - C5 - - - - - - - - - - - - - - - C5 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - C5 - - - - - - - - - - - - - - - C5 - - - - - - - - - - - - - - -"
            }
        ]
    }
];