/**
 * EXTENDED MUSIC LIBRARY - ULTIMATE EDITION
 * Optimized for New Realistic Instruments (PWM & Filter Envelopes)
 * All melodies restored and enhanced with complex harmonies and rhythms.
 */

const DEFAULT_MELODIES = [
    {
        id: 'mel_neon_chase',
        name: 'Neon Chase (128 BPM)',
        bpm: 128,
        tracks: [
            {
                // Driving Analog Bass - Octave jumping for energy
                instrumentId: 'inst_real_bass', vol: 0.8,
                pattern: "C2 - C3 - C2 - G1 - A#1 - A#2 - A#1 - F1 - G#1 - G#2 - G#1 - D#1 - G1 - G2 - G1 - D1 -"
            },
            {
                // Kick Drum - Four on the floor with syncopation
                instrumentId: 'jump_4', vol: 0.7,
                pattern: "C2 - - - C2 - - - C2 - - - C2 - C2 - C2 - - - C2 - - - C2 - - - C2 - C2 -"
            },
            {
                // Hi-Hats - Open/Closed interplay
                instrumentId: 'shoot_4', vol: 0.4,
                pattern: "- - C4 - - - C4 C4 - - C4 - - - C4 - - - C4 - - - C4 C4 - - C4 - C4 C4 C4 -"
            },
            {
                // HyperSaw Lead - Catchy Synthwave hook
                instrumentId: 'inst_hyper_lead', vol: 0.6,
                pattern: "C5 - - A#4 - G4 - D#4 - - F4 G4 - - - C5 - - A#4 - C5 - D#5 - - D5 - C5 - A#4 - G4 - - F4 - D#4 - C4 - - D#4 - F4 - G4 - - A#4 - C5 - -"
            },
            {
                // Background Pad - Sidechained rhythm feel
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "- - C3 D#3 G3 - - - - - A#2 D3 F3 - - - - - G#2 C3 D#3 - - - - - G2 A#2 D3 - - -"
            },
            {
                // Mid Arp - Fast 16th notes run
                instrumentId: 'inst_epiano', vol: 0.4,
                pattern: "C4 G3 D#4 G3 C4 G3 D#4 G3 A#3 F3 D4 F3 A#3 F3 D4 F3 G#3 D#3 C4 D#3 G#3 D#3 C4 D#3 G3 D3 A#3 D3 G3 D3 A#3 D3"
            }
        ]
    },
    {
        id: 'mel_boss_battle',
        name: 'Final Boss (150 BPM)',
        bpm: 150,
        tracks: [
            {
                // Orchestral Percussion - Cinematic War Drums
                instrumentId: 'exp_2', vol: 0.7,
                pattern: "C1 - C1 C1 - - C1 - C1 - - - C1 C1 C1 - C1 - C1 C1 - - C1 - C1 C1 - C1 C1 C1 C1 -"
            },
            {
                // Fast Violin - Spiccato Ostinato
                instrumentId: 'inst_real_violin', vol: 0.6,
                pattern: "A3 E4 A4 E4 A3 E4 A4 E4 G3 D4 G4 D4 G3 D4 G4 D4 F3 C4 F4 C4 F3 C4 F4 C4 E3 B3 E4 B3 E3 B3 E4 B3"
            },
            {
                // Heroic Trumpet - Epic Fanfare
                instrumentId: 'inst_real_trumpet', vol: 0.8,
                pattern: "A4 - - - E5 - - - C5 - - - A4 - - - B4 - - - - - G4 - - - - - - - - - F4 - - - C5 - - - A4 - - - F4 - - - E4 - - - - - G#4 - - - B4 - - -"
            },
            {
                // Heavy Piano - Low Octave Impact
                instrumentId: 'inst_real_piano', vol: 0.7,
                pattern: "A1 A2 - - - - - - G1 G2 - - - - - - F1 F2 - - - - - - E1 E2 - - - - - -"
            },
            {
                // Dark Pad Choir - Dramatic swells
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "A3 C4 E4 - - - - - G3 B3 D4 - - - - - F3 A3 C4 - - - - - E3 G#3 B3 - - - - -"
            }
        ]
    },
    {
        id: 'mel_deep_blue',
        name: 'Deep Blue (70 BPM)',
        bpm: 70,
        tracks: [
            {
                // Deep Sub Bass - Slow movement
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "C2 - - - - - - - - - - - - - - - G1 - - - - - - - - - - - - - - - A#1 - - - - - - - - - - - - - - - F1 - - - - - - - - - - - - - - -"
            },
            {
                // Real Piano - Satie-esque chords
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "G3 C4 D#4 - - - - - - - - - - - - F3 A#3 D4 - - - - - - - - - - - - D#3 G#3 C4 - - - - - - - - - - - - D3 G3 A#3 - - - - - - - - - - - -"
            },
            {
                // Breathy Flute - Pentatonic drift
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "C5 - - - G4 - - - D#4 - - - C4 - - - D4 - - - - - - - F4 - - - G4 - - - G#4 - - - G4 - - - F4 - - - D#4 - - - C4 - - - - - - - - - - -"
            },
            {
                // Atmospheric Pad - Texture
                instrumentId: 'inst_ice_pad', vol: 0.4,
                pattern: "C3 G3 - - - - - - - - - - - - - - A#2 F3 - - - - - - - - - - - - - - G#2 D#3 - - - - - - - - - - - - - - G2 D3 - - - - - - - - - - - - - -"
            },
            {
                // Clarinet - Call and response
                instrumentId: 'inst_real_clarinet', vol: 0.4,
                pattern: "- - - - - - - - - - - - G3 - A#3 - C4 - - - - - - - - - - - - D4 - F4 - D#4 - - - - - - - - - - - - C4 - D4 - C4 - - - - - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_space_waltz',
        name: 'Space Waltz (140 BPM)',
        bpm: 140,
        tracks: [
            {
                // Pizzicato Bass - 3/4 feel in 4/4 grid (12/8 feel)
                instrumentId: 'inst_str_pizz', vol: 0.6,
                pattern: "C2 - - G2 - - C2 - - G2 - - A1 - - E2 - - A1 - - E2 - - F1 - - C2 - - F1 - - C2 - - G1 - - D2 - - G1 - - B1 - -"
            },
            {
                // Clarinet - Counterpoint triplets
                instrumentId: 'inst_real_clarinet', vol: 0.5,
                pattern: "- - E4 - - G4 - - E4 - - G4 - - C4 - - E4 - - C4 - - E4 - - A3 - - C4 - - A3 - - C4 - - B3 - - D4 - - B3 - - D4"
            },
            {
                // Violin - Soaring Waltz Melody
                instrumentId: 'inst_real_violin', vol: 0.7,
                pattern: "E5 - - - - - D5 - - C5 - - B4 - - - - - A4 - - G4 - - F4 - - - - - E4 - - D4 - - G4 - - - - - F4 - - E4 - - D4 - - - - - - - -"
            },
            {
                // Glass Bell - Magical accents on beat 1
                instrumentId: 'inst_glass_bell', vol: 0.4,
                pattern: "C5 - - - - - - - - - - - A4 - - - - - - - - - - - F4 - - - - - - - - - - - G4 - - - - - - - - - - -"
            },
            {
                // Piano - Arpeggiated accompaniment
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "C4 G3 E4 C4 G3 E4 C4 G3 E4 C4 G3 E4 A3 E4 C4 A3 E4 C4 A3 E4 C4 A3 E4 C4 F3 C4 A3 F3 C4 A3 F3 C4 A3 F3 C4 A3 G3 D4 B3 G3 D4 B3 G3 D4 B3 G3 D4 B3"
            }
        ]
    },
    {
        id: 'mel_secret_garden',
        name: 'Secret Garden (100 BPM)',
        bpm: 100,
        tracks: [
            {
                // Pizzicato - Playful interaction
                instrumentId: 'inst_str_pizz', vol: 0.5,
                pattern: "D3 - A3 F3 - A3 D3 - G3 - B3 D4 - B3 G3 - A3 - C#4 E4 - C#4 A3 - D3 - F3 A3 - F3 D3 -"
            },
            {
                // Real Flute - Celtic/Fantasy style
                instrumentId: 'inst_real_flute', vol: 0.7,
                pattern: "D5 - A4 - F4 E4 D4 - G4 - B4 - D5 C5 B4 - A4 - C#5 - E5 - G5 - F#5 - D5 - A4 - F4 E4 D4 -"
            },
            {
                // Piano - Broken chords
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "D3 F3 A3 - - - - - G3 B3 D4 - - - - - A3 C#4 E4 - - - - - D3 F3 A3 - - - - -"
            },
            {
                // High Bell - Sparkles
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - - - A5 - - - - - - - B5 - - - - - - - C#6 - - - - - - - D6 - A5 F5 - - - -"
            },
            {
                // Warm Pad - Sustained harmony
                instrumentId: 'inst_ice_pad', vol: 0.4,
                pattern: "F3 - - - - - - - G3 - - - - - - - E3 - - - - - - - F3 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_study',
        name: 'Lofi Study Beats (85 BPM)',
        bpm: 85,
        tracks: [
            {
                // Analog Bass - Smooth slides
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "F2 - - - - - C3 - A2 - E2 - - - - - B2 - G2 - D2 - - - - - A2 - F2 - C2 - - - - - G2 - E2 -"
            },
            {
                // Soft Hi-Hats - Swing feel
                instrumentId: 'shoot_4', vol: 0.3,
                pattern: "C4 - - C4 - C4 - - C4 - - C4 - C4 - - C4 - - C4 - C4 - - C4 - - C4 - C4 - -"
            },
            {
                // Real Piano - Jazz Chords (Maj7, min7)
                instrumentId: 'inst_real_piano', vol: 0.6,
                pattern: "F3 A3 C4 E4 - - - - E3 G3 B3 D4 - - - - D3 F3 A3 C4 - - - - C3 E3 G3 B3 - - - -"
            },
            {
                // Muted Trumpet - Lazy solo
                instrumentId: 'inst_real_trumpet', vol: 0.5,
                pattern: "- - - - A4 - G4 - F4 - - - - - - - G4 - - - - - F4 - E4 - D4 - - - - - - - C4 - -"
            },
            {
                // E-Piano - Texture layers
                instrumentId: 'inst_epiano', vol: 0.4,
                pattern: "- - C4 E4 - - - - - - B3 D4 - - - - - - A3 C4 - - - - - - G3 B3 - - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_rain',
        name: 'Lofi - Rainy Window (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Kick - Broken beat
                instrumentId: 'jump_4', vol: 0.5,
                pattern: "C2 - - - - - C2 - - - C2 - - - - - C2 - - - - - C2 - - - C2 - - - C2 -"
            },
            {
                // Real Piano - Melancholic melody
                instrumentId: 'inst_real_piano', vol: 0.7,
                pattern: "E5 - - - B4 - - - C5 - A4 - - - - - G4 - - - D4 - - - E4 - C4 - - - - - A3 - - - E4 - - - F4 - D4 - - - - - C4 - - - G3 - - - A3 - - - - - - -"
            },
            {
                // Dark Pad - Minor 9th chords
                instrumentId: 'inst_pad_dark', vol: 0.4,
                pattern: "A2 C3 E3 G3 - - - - F2 A2 C3 E3 - - - - G2 B2 D3 F3 - - - - C3 E3 G3 B3 - - - -"
            },
            {
                // Clarinet - Low register warmth
                instrumentId: 'inst_real_clarinet', vol: 0.4,
                pattern: "E3 - - - - - - - F3 - - - - - - - D3 - - - - - - - E3 - - - - - - -"
            },
            {
                // Warm Bass - Simple root notes
                instrumentId: 'inst_real_bass', vol: 0.6,
                pattern: "A1 - - - - - - - F1 - - - - - - - G1 - - - - - - - C2 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_coffee',
        name: 'Lofi - Coffee Shop (90 BPM)',
        bpm: 90,
        tracks: [
            {
                // Organ - Gospel/Soul chords
                instrumentId: 'inst_organ', vol: 0.5,
                pattern: "D3 F3 A3 C4 - - - - G2 B2 D3 F3 - - - - C3 E3 G3 B3 - - - - A2 C#3 E3 G3 - - - -"
            },
            {
                // Walking Bass - Jazz lines
                instrumentId: 'inst_real_bass', vol: 0.6,
                pattern: "D2 - - - A1 - - - G1 - - - B1 - - - C2 - - - G1 - - - A1 - - - C#2 - - -"
            },
            {
                // Flute - Improvisation
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "A4 - C5 - D5 - F5 - E5 - C5 - A4 - - - B4 - G4 - - - - - C5 - G4 - E4 - - - - - A4 - E4 - C#4 - - -"
            },
            {
                // Soft Percussion - Shaker feel
                instrumentId: 'shoot_4', vol: 0.2,
                pattern: "C4 - C4 C4 C4 - C4 - C4 - C4 C4 C4 - C4 - C4 - C4 C4 C4 - C4 - C4 - C4 C4 C4 - C4 -"
            },
            {
                // E-Piano - Syncopated stabs
                instrumentId: 'inst_epiano', vol: 0.4,
                pattern: "- - F3 A3 - - - - - - G3 B3 - - - - - - E3 G3 - - - - - - A2 C#3 - - - -"
            }
        ]
    },
    {
        id: 'mel_lofi_night',
        name: 'Lofi - Night Walk (75 BPM)',
        bpm: 75,
        tracks: [
            {
                // Deep Bass - Sustained
                instrumentId: 'inst_real_bass', vol: 0.7,
                pattern: "F1 - - - - - - - G1 - - - - - - - E1 - - - - - - - A1 - - - - - - -"
            },
            {
                // E-Piano - Dreamy chords
                instrumentId: 'inst_epiano', vol: 0.6,
                pattern: "F3 A3 C4 E4 - - - - G3 B3 D4 F#4 - - - - E3 G#3 B3 D#4 - - - - A2 C3 E3 G3 - - - -"
            },
            {
                // Noir Trumpet - Muted melody
                instrumentId: 'inst_real_trumpet', vol: 0.5,
                pattern: "C4 - - - D4 - - - B3 - - - - - - - G#3 - - - - - - - A3 - - - - - - -"
            },
            {
                // Slow Kick - Heartbeat
                instrumentId: 'exp_1', vol: 0.5,
                pattern: "C1 - - - - - - - - - C1 - - - - - - C1 - - - - - - - - - C1 - - - - - -"
            },
            {
                // Soft Hi-Hat - Ticking clock
                instrumentId: 'shoot_4', vol: 0.2,
                pattern: "C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - - C4 - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_sunrise',
        name: 'Ethereal Sunrise (80 BPM)',
        bpm: 80,
        tracks: [
            {
                // Ice Pad - Slow morphing chords
                instrumentId: 'inst_ice_pad', vol: 0.5,
                pattern: "C3 E3 G3 - - - - - F3 A3 C4 - - - - - A2 C3 E3 - - - - - G2 B2 D3 - - - - -"
            },
            {
                // Real Piano - Flowing arpeggios
                instrumentId: 'inst_real_piano', vol: 0.6,
                pattern: "C4 G4 E5 G4 C4 G4 E5 G4 F4 A4 C5 A4 F4 A4 C5 A4 A3 E4 C5 E4 A3 E4 C5 E4 G3 D4 B4 D4 G3 D4 B4 D4"
            },
            {
                // Real Flute - Morning bird call
                instrumentId: 'inst_real_flute', vol: 0.6,
                pattern: "- - - - E5 - - - - - - - C5 - - - - - - - A4 - - - - - - - G4 - - - B4 - - -"
            },
            {
                // Glass Bell - Light refraction
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "C6 - - - - - - - A5 - - - - - - - E6 - - - - - - - D6 - - - - - - -"
            },
            {
                // Sub Bass - Foundation
                instrumentId: 'inst_real_bass', vol: 0.5,
                pattern: "C2 - - - - - - - F2 - - - - - - - A1 - - - - - - - G1 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_islands',
        name: 'Ethereal - Floating Islands (70 BPM)',
        bpm: 70,
        tracks: [
            {
                // Dark Pad - Drone
                instrumentId: 'inst_pad_dark', vol: 0.6,
                pattern: "C2 G2 - - - - - - G2 D3 - - - - - - F2 C3 - - - - - - C2 G2 - - - - - -"
            },
            {
                // Flute - Airy melody
                instrumentId: 'inst_real_flute', vol: 0.5,
                pattern: "E4 - G4 - B4 - C5 - D5 - B4 - G4 - - - C5 - A4 - F4 - - - E4 - D4 - C4 - - -"
            },
            {
                // Clarinet - Harmony layer
                instrumentId: 'inst_real_clarinet', vol: 0.5,
                pattern: "C4 - - - - - - - B3 - - - - - - - A3 - - - - - - - G3 - - - - - - -"
            },
            {
                // Piano - Raindrops
                instrumentId: 'inst_real_piano', vol: 0.4,
                pattern: "- - G4 - - - E4 - - - D4 - - - B3 - - - C4 - - - A3 - - - G3 - - - C4 -"
            },
            {
                // Glass Shimmer - High texture
                instrumentId: 'inst_glass_bell', vol: 0.35,
                pattern: "E5 G5 B5 - E5 G5 B5 - E5 G5 B5 - E5 G5 B5 - E5 G5 B5 - E5 G5 B5 - E5 G5 B5 - E5 G5 B5 -"
            }
        ]
    },
    {
        id: 'mel_ethereal_aurora',
        name: 'Ethereal - Aurora (90 BPM)',
        bpm: 90,
        tracks: [
            {
                // Dark Pad - Moving 5ths
                instrumentId: 'inst_pad_dark', vol: 0.5,
                pattern: "D3 A3 - - - - - - A3 E4 - - - - - - B3 F#4 - - - - - - G3 D4 - - - - - -"
            },
            {
                // HyperSaw - Filter sweep simulation (via notes)
                instrumentId: 'inst_hyper_lead', vol: 0.3,
                pattern: "F#4 - A4 - D5 - - - E5 - C#5 - A4 - - - F#5 - D5 - B4 - - - G4 - B4 - D5 - - -"
            },
            {
                // Violin - Long bows
                instrumentId: 'inst_real_violin', vol: 0.4,
                pattern: "F#4 - - - - - - - E4 - - - - - - - D4 - - - - - - - B3 - - - - - - -"
            },
            {
                // Piano - Sparse high notes
                instrumentId: 'inst_real_piano', vol: 0.5,
                pattern: "- - - - A5 - - - - - - - E5 - - - - - - - F#5 - - - - - - - G5 - - - -"
            },
            {
                // Bass - Root motion
                instrumentId: 'inst_real_bass', vol: 0.5,
                pattern: "D2 - - - - - - - A1 - - - - - - - B1 - - - - - - - G1 - - - - - - -"
            }
        ]
    },
    {
        id: 'mel_ethereal_underwater',
        name: 'Ethereal - Underwater (60 BPM)',
        bpm: 60,
        tracks: [
            {
                // Sub Bass - Deep pulse
                instrumentId: 'inst_real_bass', vol: 0.6,
                pattern: "C2 - - - - - - - G1 - - - - - - - A#1 - - - - - - - F1 - - - - - - -"
            },
            {
                // E-Piano - Ripples (Triplets feel)
                instrumentId: 'inst_epiano', vol: 0.5,
                pattern: "C4 D#4 G4 C4 D#4 G4 A#3 D4 F4 A#3 D4 F4 G#3 C4 D#4 G#3 C4 D#4 G3 A#3 D4 G3 A#3 D4"
            },
            {
                // Flute - Whale song imitation
                instrumentId: 'inst_real_flute', vol: 0.5,
                pattern: "C5 - - - - - - - - - - - A#4 - - - G#4 - - - - - - - G4 - - - - - - -"
            },
            {
                // Bubble Bells - Random droplets
                instrumentId: 'inst_glass_bell', vol: 0.3,
                pattern: "- - C5 - - - - - - - G4 - - - - - - D5 - - - - - - - - - C5 - - -"
            },
            {
                // Pad - Ocean swell
                instrumentId: 'inst_ice_pad', vol: 0.45,
                pattern: "C3 G3 C4 - - - - - A#2 F3 A#3 - - - - - G#2 D#3 G#3 - - - - - G2 D3 G3 - - - - -"
            }
        ]
    }
];