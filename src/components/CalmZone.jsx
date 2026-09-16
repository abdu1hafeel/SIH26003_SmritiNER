import React, { useState, useEffect } from 'react';
import { Wind, Volume2, ArrowLeft, Heart, Play, Pause, Sparkles, Moon } from 'lucide-react';
import { audioFx, speakPrompt } from '../utils/speechHelper';
import { UI_TRANSLATIONS, LANGUAGES } from '../data/culturalData';

export default function CalmZone({ currentLang, highContrast, onBackToHub }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const langCode = LANGUAGES[currentLang]?.code || 'en-IN';

  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale gently...');
  const [breathingScale, setBreathingScale] = useState(1);

  useEffect(() => {
    // 4-4-4 Gentle breathing rhythm
    const interval = setInterval(() => {
      setBreathingPhase(prev => {
        if (prev.startsWith('Inhale')) {
          setBreathingScale(1.4);
          return 'Hold gently...';
        } else if (prev.startsWith('Hold')) {
          setBreathingScale(1);
          return 'Exhale softly...';
        } else {
          setBreathingScale(1.2);
          return 'Inhale gently...';
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayFlute = () => {
    setIsPlayingMelody(true);
    audioFx.playFluteMelody();
    speakPrompt('Listen to the gentle bamboo flute of the hills. Relax your shoulders and breathe slowly.', langCode);
    setTimeout(() => {
      setIsPlayingMelody(false);
    }, 8000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800">
      
      {/* Back button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs bg-emerald-100 px-3 py-1.5 rounded-full">
          <Moon className="w-4 h-4 text-emerald-700" />
          <span>Dementia Agitation Calming Zone</span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-teal-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-8">
          
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
              North Eastern Nature Therapy
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-1">Peaceful Hills & Rivers</h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-2">
              Soothing sights, rhythmic breathing, and melodies from bamboo flutes to calm the heart.
            </p>
          </div>

          {/* Breathing Circle Visualizer */}
          <div className="py-6">
            <div 
              className="w-44 h-44 sm:w-56 sm:h-56 mx-auto rounded-full bg-emerald-600/30 border-4 border-emerald-400/40 flex items-center justify-center transition-transform duration-3000 ease-in-out shadow-2xl backdrop-blur-xs"
              style={{ transform: `scale(${breathingScale})` }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-emerald-500/50 flex flex-col items-center justify-center p-3 text-center">
                <Heart className="w-8 h-8 text-rose-300 mb-1 animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-white">{breathingPhase}</span>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handlePlayFlute}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Play Folk Bamboo Flute Melodies</span>
            </button>

            <button
              onClick={() => {
                audioFx.playGentleTone(261.63, 2.0); // C4 deep drone
                speakPrompt('Deep calming hum. Feel the peace of the flowing Brahmaputra river.', langCode);
              }}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <Wind className="w-5 h-5" />
              <span>Brahmaputra River Drone</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
