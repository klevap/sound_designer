/**
 * DEFAULT SOUND LIBRARY
 */

// Helper functions
const _tone = (wave, start, end, dur, vol) => ({ 
    type: 'tone', active: true, wave, start, end, dur, vol, 
    shapeParam: 0.5, fmActive: false, fmRatio: 2, fmDepth: 100 
});

const _noise = (dur, vol, filter) => ({ 
    type: 'noise', active: true, dur, vol, filter 
});

const DEFAULT_SOUNDS = [
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
    // New Advanced Jumps
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
    // New Advanced Shoots
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
    // New Advanced Explosions
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
    
    // --- PICKUP (New) ---
    { 
        id: 'p_adv_1', name: 'Pickup - Advanced - Organ', desc: 'Organ wave', 
        layers: [{ ..._tone('organ', 800, 1600, 0.15, 0.4) }]
    }
];