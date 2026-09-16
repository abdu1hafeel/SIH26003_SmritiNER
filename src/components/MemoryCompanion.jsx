import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Pill, 
  Droplet, 
  Calendar, 
  Volume2, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Camera, 
  Heart,
  Plus,
  Play
} from 'lucide-react';
import { INITIAL_PATIENT_PROFILE, UI_TRANSLATIONS, LANGUAGES } from '../data/culturalData';
import { speakPrompt, audioFx } from '../utils/speechHelper';

export default function MemoryCompanion({ currentLang, highContrast, onBackToHub }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const langCode = LANGUAGES[currentLang]?.code || 'en-IN';

  const [activeTab, setActiveTab] = useState('meds'); // 'meds' | 'vault' | 'orientation'
  const [meds, setMeds] = useState(INITIAL_PATIENT_PROFILE.medications);
  const [waterGlasses, setWaterGlasses] = useState(4); // Out of 8
  const [vaultPhotos, setVaultPhotos] = useState(INITIAL_PATIENT_PROFILE.memoryVaultPhotos);
  const [orientationMood, setOrientationMood] = useState('Happy');

  // Toggle Medication Taken
  const handleToggleMed = (id) => {
    const updated = meds.map(m => {
      if (m.id === id) {
        const nextState = !m.takenToday;
        if (nextState) {
          audioFx.playSuccessChime();
          confetti({ particleCount: 35, spread: 50 });
          speakPrompt(`Great job! You have taken ${m.name}.`, langCode);
        }
        return { ...m, takenToday: nextState };
      }
      return m;
    });
    setMeds(updated);
  };

  const handleDrinkWater = () => {
    if (waterGlasses < 8) {
      const nextCount = waterGlasses + 1;
      setWaterGlasses(nextCount);
      audioFx.playSuccessChime();
      speakPrompt(`Wonderful! Glass ${nextCount} of fresh water recorded. Staying hydrated keeps the mind sharp.`, langCode);
    }
  };

  const playVoiceMemory = (photo) => {
    audioFx.playFluteMelody();
    setTimeout(() => {
      speakPrompt(photo.voiceNote, langCode);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => { setActiveTab('meds'); audioFx.playGentleTone(440, 0.1); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'meds' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Medications & Water</span>
          </button>
          <button
            onClick={() => { setActiveTab('vault'); audioFx.playGentleTone(440, 0.1); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'vault' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Memory Vault (স্মৃতি সঞ্চয়)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MEDICATIONS & HYDRATION */}
      {activeTab === 'meds' && (
        <div className="space-y-6">
          
          {/* Hydration Tracker Card */}
          <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-200 text-blue-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-md">
                <Droplet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-blue-950">Daily Hydration Care</h3>
                <p className="text-xs text-blue-800">
                  {waterGlasses} of 8 glasses recorded today ({Math.round((waterGlasses / 8) * 100)}% target)
                </p>
                {/* Visual Glass Dots */}
                <div className="flex items-center gap-1.5 mt-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-7 rounded-md transition-all ${
                        i < waterGlasses ? 'bg-blue-600 shadow-xs' : 'bg-blue-200'
                      }`}
                      title={`Glass ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleDrinkWater}
              disabled={waterGlasses >= 8}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Droplet className="w-4 h-4" />
              <span>Drank 1 Glass of Water</span>
            </button>
          </div>

          {/* Medication Schedule List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Pill className="w-6 h-6 text-emerald-700" />
                  <span>Prescribed Medication Schedule</span>
                </h3>
                <p className="text-xs text-slate-500">Supervised by Dr. Bhupen Sharma, Guwahati</p>
              </div>
              <button
                onClick={() => speakPrompt('Here is your daily medication schedule. Tap the green check when you have taken your medicine.', langCode)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Aloud</span>
              </button>
            </div>

            <div className="grid gap-3">
              {meds.map((med) => (
                <div
                  key={med.id}
                  onClick={() => handleToggleMed(med.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    med.takenToday
                      ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${
                      med.takenToday ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base sm:text-lg">{med.name}</h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                          {med.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{med.for}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakPrompt(`Reminder: It is time for ${med.name} at ${med.time} for ${med.for}. Please take it with warm water.`, langCode);
                      }}
                      className="p-2 rounded-xl hover:bg-slate-200 text-slate-600"
                      title="Audio reminder"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>

                    <div className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      med.takenToday 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      <span>{med.takenToday ? t.taken : t.markTaken}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REMINISCENCE VAULT */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose-600" />
                  <span>Smriti Sanchay: Family Reminiscence Vault</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Familiar faces and soothing recorded voice notes from loved ones
                </p>
              </div>

              <button
                onClick={() => speakPrompt('Here are your cherished family photographs. Tap any card to hear their loving voice note.', langCode)}
                className="p-2 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 flex items-center gap-1.5 text-xs font-bold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Voice Guide</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {vaultPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-3xl p-5 bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 hover:border-emerald-500 shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div className="text-center space-y-3">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-inner flex items-center justify-center text-5xl border border-slate-200">
                      {photo.avatarEmoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{photo.title}</h4>
                      <p className="text-xs font-semibold text-emerald-800 mt-0.5">{photo.relationship}</p>
                      <p className="text-[11px] text-slate-500">{photo.location} • {photo.year}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => playVoiceMemory(photo)}
                      className="w-full py-2.5 px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Voice Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
