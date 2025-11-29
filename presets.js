/**
 * DEFAULT SOUND LIBRARY - ULTIMATE EDITION
 * Includes:
 * 1. New Realistic Instruments (Subtractive Synthesis & PWM)
 * 2. HyperSaw Specials
 * 3. Standard Musical Instruments
 * 4. Full SFX Suite (Jumps, Shoots, Explosions, Hooks)
 */

// Helper functions
// Updated to include defaults for Pulse Width and Dynamic Filter
const _tone = (wave, start, end, dur, vol, attack = 0.01) => ({ 
    type: 'tone', active: true, wave, start, end, dur, vol, attack,
    shapeParam: 0.5, 
    fmActive: false, fmRatio: 2, fmDepth: 100,
    hyperOdd: 0.5, hyperEven: 0.5, 
    pulseWidth: 0.5,
    filterActive: false, filterFreq: 2000, filterQ: 0, filterEnv: 0, filterAttack: 0.05, filterDecay: 0.1
});

const _noise = (dur, vol, filter) => ({ 
    type: 'noise', active: true, dur, vol, filter 
});

const DEFAULT_SOUNDS = [
    // --- REALISTIC INSTRUMENTS (NEW: Subtractive & PWM) ---
    {
        id: 'inst_real_violin', name: 'Inst - Strings - Violin Solo', desc: 'Expressive violin with vibrato and filter swell.',
        layers: [
            { 
                ..._tone('hypersaw', 440, 440, 0.8, 0.5, 0.15), 
                hyperOdd: 1.0, hyperEven: 1.0, // Pure Sawtooth
                fmActive: true, fmRatio: 6.0, fmDepth: 15, // Vibrato
                filterActive: true, filterFreq: 800, filterQ: 2, filterEnv: 1500, filterAttack: 0.2, filterDecay: 0.3 // Swell
            }
        ]
    },
    {
        id: 'inst_real_trumpet', name: 'Inst - Brass - Trumpet', desc: 'Bright brass with opening filter envelope.',
        layers: [
            { 
                ..._tone('sawtooth', 440, 440, 0.4, 0.5, 0.05), 
                filterActive: true, filterFreq: 400, filterQ: 1, filterEnv: 3000, filterAttack: 0.05, filterDecay: 0.2 // "Wah" effect
            }
        ]
    },
    {
        id: 'inst_real_clarinet', name: 'Inst - Winds - Clarinet', desc: 'Woody sound using Pulse wave (approx 50%).',
        layers: [
            { 
                ..._tone('pulse', 440, 440, 0.5, 0.5, 0.08), 
                pulseWidth: 0.52, // Slightly offset square for realism
                filterActive: true, filterFreq: 900, filterQ: 0.5, filterEnv: -200, filterAttack: 0.1, filterDecay: 0.1
            }
        ]
    },
    {
        id: 'inst_real_flute', name: 'Inst - Winds - Flute Real', desc: 'Breathy flute with noise layer.',
        layers: [
            { 
                ..._tone('triangle', 440, 440, 0.6, 0.5, 0.1),
                filterActive: true, filterFreq: 1500, filterQ: 0, filterEnv: 0
            },
            _noise(0.1, 0.05, 3000) // Breath noise
        ]
    },
    {
        id: 'inst_real_piano', name: 'Inst - Keys - Piano Real', desc: 'Plucky filter envelope on Pulse wave.',
        layers: [
            { 
                ..._tone('pulse', 440, 440, 0.8, 0.5, 0.01), 
                pulseWidth: 0.2, // Thin pulse
                filterActive: true, filterFreq: 600, filterQ: 0, filterEnv: 2000, filterAttack: 0.01, filterDecay: 0.3 // Pluck
            }
        ]
    },
    {
        id: 'inst_real_bass', name: 'Inst - Bass - Analog Fat', desc: 'Fat Moog-style bass using PWM and Filter.',
        layers: [
            { 
                ..._tone('pulse', 110, 110, 0.4, 0.6, 0.01), 
                pulseWidth: 0.4, 
                filterActive: true, filterFreq: 100, filterQ: 3, filterEnv: 800, filterAttack: 0.01, filterDecay: 0.2 // Resonant pluck
            }
        ]
    },

    // --- HYPERSAW SPECIALS ---
    {
        id: 'inst_hyper_lead', name: 'Inst - Lead - HyperSaw', desc: 'Aggressive, bright lead using 1/sqrt(n).',
        layers: [
            { ..._tone('hypersaw', 440, 440, 0.4, 0.4, 0.05), hyperOdd: 0.5, hyperEven: 0.5 },
            { ..._tone('hypersaw', 440, 440, 0.4, 0.2, 0.05), fmActive: true, fmRatio: 2.01, fmDepth: 20, hyperOdd: 0.5, hyperEven: 0.5 } // Detuned layer
        ]
    },
    {
        id: 'inst_ice_pad', name: 'Inst - Pad - Ice World', desc: 'Cold, glassy atmosphere.',
        layers: [
            { ..._tone('hypersaw', 440, 440, 1.5, 0.3, 0.8), hyperOdd: 0.5, hyperEven: 0.5 }, // Slow attack
            { ..._tone('sine', 880, 880, 1.5, 0.2, 0.8), fmActive: true, fmRatio: 3.5, fmDepth: 100 } // Shimmer
        ]
    },
    {
        id: 'inst_glass_bell', name: 'Inst - Keys - Glass Bell', desc: 'Sharp, crystalline impact.',
        layers: [
            { ..._tone('hypersaw', 880, 880, 0.6, 0.5, 0.01), hyperOdd: 0.5, hyperEven: 0.5 },
            { ..._tone('triangle', 440, 440, 0.6, 0.3, 0.01) } // Body
        ]
    },
    {
        id: 'sfx_hyper_laser', name: 'SFX - Laser - Hyper', desc: 'High energy laser blast.',
        layers: [
            { ..._tone('hypersaw', 2000, 200, 0.2, 0.4, 0.01), hyperOdd: 0.5, hyperEven: 0.5 },
            _noise(0.1, 0.2, 5000)
        ]
    },

    // --- STANDARD MUSICAL INSTRUMENTS ---
    {
        id: 'inst_str_ens', name: 'Inst - Strings - Ensemble', desc: 'Slow attack string section.',
        layers: [
            { ..._tone('violin', 440, 440, 0.8, 0.4, 0.4), fmActive: true, fmRatio: 1.01, fmDepth: 5 },
            { ..._tone('sawtooth', 440, 440, 0.8, 0.3, 0.4), fmActive: true, fmRatio: 0.99, fmDepth: 5 }
        ]
    },
    {
        id: 'inst_str_pizz', name: 'Inst - Strings - Pizzicato', desc: 'Short plucked strings.',
        layers: [
            { ..._tone('triangle', 440, 440, 0.15, 0.6, 0.01) },
            { ..._tone('sawtooth', 440, 440, 0.15, 0.3, 0.01) }
        ]
    },
    {
        id: 'inst_flute', name: 'Inst - Winds - Flute (Legacy)', desc: 'Legacy flute sound.',
        layers: [
            { ..._tone('triangle', 440, 440, 0.6, 0.5, 0.1) },
            _noise(0.1, 0.1, 3000)
        ]
    },
    {
        id: 'inst_brass', name: 'Inst - Winds - Brass Hit', desc: 'Punchy synth brass.',
        layers: [
            { ..._tone('sawtooth', 440, 440, 0.3, 0.5, 0.05), shapeParam: 0.8 },
            { ..._tone('trapezoid', 440, 440, 0.3, 0.4, 0.05), shapeParam: 0.3 }
        ]
    },
    {
        id: 'inst_epiano', name: 'Inst - Keys - E-Piano', desc: 'FM Bell-like keys.',
        layers: [
            { ..._tone('sine', 440, 440, 0.5, 0.6, 0.01), fmActive: true, fmRatio: 4.0, fmDepth: 150 }
        ]
    },
    {
        id: 'inst_organ', name: 'Inst - Keys - Church Organ', desc: 'Rich harmonic organ.',
        layers: [
            { ..._tone('organ', 440, 440, 0.8, 0.5, 0.1) },
            { ..._tone('sine', 880, 880, 0.8, 0.2, 0.1) }
        ]
    },
    {
        id: 'inst_pad_dark', name: 'Inst - Pad - Dark Space', desc: 'Low, slow moving atmosphere.',
        layers: [
            { ..._tone('trapezoid', 220, 220, 1.5, 0.4, 0.8), shapeParam: 0.1 },
            { ..._tone('sine', 220, 220, 1.5, 0.3, 0.8), fmActive: true, fmRatio: 0.5, fmDepth: 50 }
        ]
    },

    // --- JUMP VARIATIONS ---
    {
        id: 'jump_1', name: 'Jump - Classic - Standard', desc: 'Standard platformer jump. Sine wave slide.',
        layers: [_tone('sine', 150, 350, 0.15, 0.5)]
    },
    {
        id: 'jump_2', name: 'Jump - Classic - Spring', desc: 'Bouncy spring effect using Triangle wave.',
        layers: [_tone('triangle', 200, 600, 0.25, 0.4)]
    },
    {
        id: 'jump_3', name: 'Jump - Classic - Jet', desc: 'Mechanical assisted jump. Sawtooth + Noise.',
        layers: [
            _tone('sawtooth', 100, 200, 0.2, 0.2),
            _noise(0.15, 0.3, 2000)
        ]
    },
    {
        id: 'jump_4', name: 'Jump - Classic - Heavy', desc: 'Heavy boots lifting off. Low freq square.',
        layers: [
            _tone('square', 80, 150, 0.2, 0.3),
            _tone('sine', 150, 300, 0.2, 0.3)
        ]
    },
    {
        id: 'jump_5', name: 'Jump - Classic - Double', desc: 'High pitched, quick air jump.',
        layers: [_tone('sine', 400, 600, 0.1, 0.4)]
    },
    // Advanced Jumps
    { 
        id: 'j_adv_1', name: 'Jump - Advanced - Trapezoid', desc: 'Using custom Trapezoid wave (Sharpness 0.2)', 
        layers: [{ ..._tone('trapezoid', 150, 400, 0.2, 0.5), shapeParam: 0.2 }]
    },
    { 
        id: 'j_adv_2', name: 'Jump - Advanced - FM Boost', desc: 'Sine with FM modulation for metallic texture', 
        layers: [{ ..._tone('sine', 200, 500, 0.2, 0.5), fmActive: true, fmRatio: 4.5, fmDepth: 300 }]
    },

    // --- SHOOT VARIATIONS ---
    {
        id: 'shoot_1', name: 'Shoot - Retro - Blaster', desc: 'Retro arcade blaster. Square wave slide.',
        layers: [_tone('square', 800, 100, 0.12, 0.3), _noise(0.05, 0.2, 4000)]
    },
    {
        id: 'shoot_2', name: 'Shoot - Retro - Plasma', desc: 'Sci-fi energy shot. Triangle + Sine.',
        layers: [_tone('triangle', 1200, 600, 0.15, 0.2), _tone('sine', 600, 100, 0.15, 0.3)]
    },
    {
        id: 'shoot_3', name: 'Shoot - Retro - Shotgun', desc: 'Heavy impact. Noise dominant + Sawtooth bass.',
        layers: [_noise(0.2, 0.6, 2500), _tone('sawtooth', 150, 50, 0.2, 0.4)]
    },
    {
        id: 'shoot_4', name: 'Shoot - Retro - Silenced', desc: 'Quick, high filter noise "pfft".',
        layers: [_noise(0.05, 0.4, 6000), _tone('sine', 300, 100, 0.05, 0.2)]
    },
    {
        id: 'shoot_5', name: 'Shoot - Retro - Sniper', desc: 'High velocity crack + long tail.',
        layers: [_tone('sawtooth', 2000, 50, 0.1, 0.2), _noise(0.3, 0.3, 1500)]
    },
    // Advanced Shoots
    { 
        id: 's_adv_1', name: 'Shoot - Advanced - PowerSine', desc: 'Distorted Sine (Power 0.8)', 
        layers: [{ ..._tone('powersine', 900, 100, 0.15, 0.4), shapeParam: 0.8 }]
    },
    { 
        id: 's_adv_2', name: 'Shoot - Advanced - BitCrush', desc: 'BitCrushed Sine', 
        layers: [{ ..._tone('bitcrush', 600, 200, 0.2, 0.4), shapeParam: 0.8 }]
    },

    // --- EXPLOSION VARIATIONS ---
    {
        id: 'exp_1', name: 'Explosion - Basic - Standard', desc: 'Balanced noise and sub bass.',
        layers: [_noise(0.4, 0.7, 1000), _tone('sine', 100, 10, 0.4, 0.6)]
    },
    {
        id: 'exp_2', name: 'Explosion - Basic - 8bit', desc: 'Crunchy square wave decay.',
        layers: [_tone('square', 200, 10, 0.3, 0.5), _noise(0.2, 0.4, 3000)]
    },
    {
        id: 'exp_3', name: 'Explosion - Basic - Distant', desc: 'Muffled low rumble.',
        layers: [_noise(0.8, 0.8, 400)]
    },
    {
        id: 'exp_4', name: 'Explosion - Basic - Sharp', desc: 'High impact grenade.',
        layers: [_noise(0.2, 0.8, 5000), _tone('sawtooth', 300, 50, 0.2, 0.4)]
    },
    {
        id: 'exp_5', name: 'Explosion - Basic - Implosion', desc: 'Reverse-like suction sound.',
        layers: [_tone('sine', 50, 10, 0.5, 0.8), _noise(0.3, 0.3, 800)]
    },
    // Advanced Explosions
    { 
        id: 'e_adv_1', name: 'Explosion - Advanced - Metallic', desc: 'Using Metallic custom wave', 
        layers: [
            { ..._tone('metal', 300, 50, 0.5, 0.5), fmActive: true, fmRatio: 1.4, fmDepth: 200 },
            _noise(0.3, 0.5, 2000)
        ]
    },

    // --- HOOK LAUNCH ---
    {
        id: 'hook_l_1', name: 'Hook Launch - Zip', desc: 'Fast rope zip.',
        layers: [_tone('triangle', 600, 1200, 0.15, 0.3)]
    },
    {
        id: 'hook_l_2', name: 'Hook Launch - Mech', desc: 'Mechanical spring release.',
        layers: [_tone('sawtooth', 200, 400, 0.1, 0.3), _noise(0.05, 0.2, 3000)]
    },
    {
        id: 'hook_l_3', name: 'Hook Launch - Air', desc: 'Pneumatic compressed air.',
        layers: [_noise(0.15, 0.5, 2000)]
    },
    {
        id: 'hook_l_4', name: 'Hook Launch - Magic', desc: 'Ethereal grapple.',
        layers: [_tone('sine', 800, 1600, 0.2, 0.3)]
    },
    {
        id: 'hook_l_5', name: 'Hook Launch - Heavy', desc: 'Heavy chain throw.',
        layers: [_tone('square', 100, 300, 0.2, 0.3), _noise(0.2, 0.2, 1000)]
    },

    // --- HOOK ATTACH ---
    {
        id: 'hook_a_1', name: 'Hook Attach - Clink', desc: 'Metal on metal.',
        layers: [_tone('sine', 2000, 1000, 0.08, 0.4)]
    },
    {
        id: 'hook_a_2', name: 'Hook Attach - Thud', desc: 'Hook hitting wood/dirt.',
        layers: [_noise(0.1, 0.5, 600), _tone('sine', 100, 50, 0.1, 0.3)]
    },
    {
        id: 'hook_a_3', name: 'Hook Attach - Latch', desc: 'Mechanical locking click.',
        layers: [_tone('square', 1500, 1500, 0.03, 0.3), _tone('square', 1000, 1000, 0.03, 0.3)]
    },
    {
        id: 'hook_a_4', name: 'Hook Attach - Dig', desc: 'Sharp digging sound.',
        layers: [_tone('sawtooth', 400, 100, 0.1, 0.4)]
    },
    {
        id: 'hook_a_5', name: 'Hook Attach - Mag', desc: 'Magnetic lock.',
        layers: [_tone('sawtooth', 500, 500, 0.15, 0.2), _tone('sine', 2000, 100, 0.1, 0.3)]
    },
    
    // --- PICKUP ---
    { 
        id: 'p_adv_1', name: 'Pickup - Advanced - Organ', desc: 'Organ wave', 
        layers: [{ ..._tone('organ', 800, 1600, 0.15, 0.4) }]
    }
];