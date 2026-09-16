import React, { useState } from 'react';
import { 
  Brain, 
  Pill, 
  Heart, 
  Moon, 
  Volume2, 
  Calendar, 
  Sparkles, 
  Sun, 
  Smile, 
  SmilePlus, 
  Coffee,
  Check
} from 'lucide-react';
import { UI_TRANSLATIONS, LANGUAGES, INITIAL_PATIENT_PROFILE } from '../data/culturalData';
import { speakPrompt, audioFx } from '../utils/speechHelper';

export default function PatientHub({ 
  currentLang, 
  highContrast, 
  onNavigate 
}) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const langCode = LANGUAGES[currentLang]?.code || 'en-IN';
  const [selectedMood, setSelectedMood] = useState('peaceful');

  const todayStr = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const handleSpeakGreeting = () => {
    const greeting = `${t.welcomePatient} ${t.welcomePrompt}`;
    audioFx.playGentleTone(523.25, 0.2);
    speakPrompt(greeting, langCode);
  };

  const handleMoodSelect = (mood, label) => {
    setSelectedMood(mood);
    audioFx.playSuccessChime();
    speakPrompt(`Thank you, Boruah Aita. We are glad you are feeling ${label} today.`, langCode);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      
      {/* Elderly Welcome Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-colors ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-800 border-emerald-200'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Sun className="w-5 h-5" />
              </span>
              <span className="text-xs sm:text-sm font-bold opacity-80">
                {todayStr} • Guwahati, Assam
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-emerald-950">
              {t.welcomePatient}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-medium">
              {t.welcomePrompt}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSpeakGreeting}
              className="px-5 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Voice Guidance (মাত শুনিবলৈ)</span>
            </button>
          </div>
        </div>

        {/* Morning Mood & Orientation Check */}
        <div className="mt-6 pt-6 border-t border-emerald-100/80 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Today’s Feeling:</span>
          
          <button
            onClick={() => handleMoodSelect('happy', t.feelingGood)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              selectedMood === 'happy'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <span>🌸</span>
            <span>{t.feelingGood}</span>
          </button>

          <button
            onClick={() => handleMoodSelect('peaceful', t.feelingCalm)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              selectedMood === 'peaceful'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <span>🌿</span>
            <span>{t.feelingCalm}</span>
          </button>

          <button
            onClick={() => handleMoodSelect('tired', t.feelingTired)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              selectedMood === 'tired'
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <span>☕</span>
            <span>{t.feelingTired}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Navigation Action Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        
        {/* CARD 1: COGNITIVE GAMES */}
        <div
          onClick={() => {
            audioFx.playGentleTone(523.25, 0.15);
            onNavigate('games');
          }}
          className="group p-6 sm:p-8 rounded-3xl bg-white hover:bg-emerald-50/40 border-2 border-slate-200 hover:border-emerald-600 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-800">
                  {t.games}
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  4 Domains
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.gamesDesc} (Memory, Attention, Daily Sequence & Weaves)
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>Adaptive AI Assisted</span>
            <span className="group-hover:translate-x-1 transition-transform">Start Playing →</span>
          </div>
        </div>

        {/* CARD 2: DAILY ROUTINE & MEDICINE */}
        <div
          onClick={() => {
            audioFx.playGentleTone(523.25, 0.15);
            onNavigate('companion');
          }}
          className="group p-6 sm:p-8 rounded-3xl bg-white hover:bg-blue-50/40 border-2 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Pill className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-800">
                  {t.reminders}
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  Scheduled
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.remindersDesc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
            <span>2 of 4 Taken Today</span>
            <span className="group-hover:translate-x-1 transition-transform">View Schedule →</span>
          </div>
        </div>

        {/* CARD 3: MEMORY VAULT & FAMILY */}
        <div
          onClick={() => {
            audioFx.playGentleTone(523.25, 0.15);
            onNavigate('companion');
          }}
          className="group p-6 sm:p-8 rounded-3xl bg-white hover:bg-rose-50/40 border-2 border-slate-200 hover:border-rose-600 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-rose-800">
                  {t.vault}
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                  Family Voices
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.vaultDesc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-800">
            <span>Reminiscence Therapy</span>
            <span className="group-hover:translate-x-1 transition-transform">Open Album →</span>
          </div>
        </div>

        {/* CARD 4: PEACEFUL CALM ZONE */}
        <div
          onClick={() => {
            audioFx.playGentleTone(523.25, 0.15);
            onNavigate('calm');
          }}
          className="group p-6 sm:p-8 rounded-3xl bg-white hover:bg-teal-50/40 border-2 border-slate-200 hover:border-teal-600 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Moon className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-teal-800">
                  {t.calm}
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                  Sensory Care
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.calmDesc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-800">
            <span>Dementia Agitation Relief</span>
            <span className="group-hover:translate-x-1 transition-transform">Enter Calm →</span>
          </div>
        </div>

      </div>

    </div>
  );
}
