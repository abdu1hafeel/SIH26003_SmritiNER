// Speech & Audio Helper for SmritiNER
// Provides native speech synthesis, soothing auditory feedback, and binaural nature tones

export const speakPrompt = (text, langCode = 'en-IN') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Choose voice suitable for language
  const voices = window.speechSynthesis.getVoices();
  const matchVoice = voices.find(v => v.lang.startsWith(langCode.slice(0, 2))) ||
                     voices.find(v => v.lang.includes('IN')) ||
                     voices[0];

  if (matchVoice) {
    utterance.voice = matchVoice;
  }

  // Paced for elderly cognition: gentle, slightly slowed cadence
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Gentle Audio Chimes using Web Audio API (Zero external assets required, 100% offline)
class SoundGenerator {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playSuccessChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Soothing pentatonic harmony (C5, E5, G5)
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      
      gain.gain.setValueAtTime(0.001, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.6);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.65);
    });
  }

  playGentleTone(freq = 440, duration = 0.4) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  playFluteMelody() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // North Eastern Folk Pentatonic Sequence (D, F#, G, A, B)
    const melody = [293.66, 369.99, 392.00, 440.00, 493.88, 587.33];
    melody.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // Warm, flute-like timbre
      osc.frequency.setValueAtTime(freq, now + idx * 0.28);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.28 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.28 + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + idx * 0.28);
      osc.stop(now + idx * 0.28 + 0.55);
    });
  }
}

export const audioFx = new SoundGenerator();
