// Web Audio API Synthesizer for Xianxia Epic Effects (Zero external audio file dependency)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a resonant ancient celestial bell / sword chime effect when seal breaks
 */
export function playSealBreakSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Deep fundamental tone (Huyền âm)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(146.83, now); // D3
    osc1.frequency.exponentialRampToValueAtTime(110.0, now + 1.8);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 2.5);

    // High crystalline overtone (Kiếm minh / Phong ấn phá toái)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(587.33, now); // D5
    osc2.frequency.exponentialRampToValueAtTime(440.0, now + 1.5);
    gain2.gain.setValueAtTime(0.3, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 2.0);

    // Shimmering harmonic
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(880.0, now); // A5
    osc3.frequency.exponentialRampToValueAtTime(880.0, now + 0.3);
    gain3.gain.setValueAtTime(0.15, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now);
    osc3.stop(now + 1.2);
  } catch (err) {
    console.warn('Web Audio playback error:', err);
  }
}
