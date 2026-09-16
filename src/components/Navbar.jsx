import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Globe, 
  Volume2, 
  Wifi, 
  WifiOff, 
  ShieldAlert, 
  SunMedium, 
  Type, 
  UserCheck, 
  Sparkles, 
  Lock, 
  FileText,
  HelpCircle 
} from 'lucide-react';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/culturalData';
import { speakPrompt, audioFx } from '../utils/speechHelper';

export default function Navbar({ 
  currentLang, 
  onLangChange, 
  currentMode, 
  onModeChange,
  highContrast,
  onToggleHighContrast,
  textSize,
  onChangeTextSize,
  onOpenFlowchartModal,
  onTriggerSOS
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCaregiverSwitch = () => {
    if (currentMode === 'patient') {
      setShowPinModal(true);
      setPinInput('');
      setPinError(false);
    } else {
      onModeChange('patient');
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default demo PIN: 1234 or 26003
    if (pinInput === '1234' || pinInput === '26003') {
      setShowPinModal(false);
      audioFx.playSuccessChime();
      onModeChange('caregiver');
    } else {
      setPinError(true);
      audioFx.playGentleTone(220, 0.4);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white/95 text-slate-800 border-emerald-100 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner font-bold text-xl ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-700 text-white'
            }`}>
              স্মৃ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight flex items-center gap-1.5">
                  Smriti<span className={highContrast ? 'text-white' : 'text-emerald-700'}>NER</span>
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  highContrast ? 'bg-yellow-900 text-yellow-300 border border-yellow-500' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  SIH26003
                </span>
              </div>
              <p className="text-xs opacity-75 hidden sm:block font-medium">
                MDoNER • North East Dementia & Cognitive Care
              </p>
            </div>
          </div>

          {/* Center Accessibility & Status Controls */}
          <div className="flex items-center gap-2">
            
            {/* Offline-First Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isOnline 
                ? (highContrast ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
                : (highContrast ? 'bg-amber-950 text-amber-300 border border-amber-500' : 'bg-amber-50 text-amber-800 border border-amber-200')
            }`} title="Resilient offline-first local storage for remote hilly areas of NER">
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isOnline ? t.onlineSync : t.offlineReady}</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <Globe className="w-4 h-4 text-slate-500 ml-1.5" />
              <select 
                value={currentLang}
                onChange={(e) => {
                  onLangChange(e.target.value);
                  audioFx.playGentleTone(440, 0.15);
                  speakPrompt(UI_TRANSLATIONS[e.target.value]?.welcomePatient || 'Welcome', LANGUAGES[e.target.value]?.code);
                }}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-100 py-1 px-1.5 outline-none cursor-pointer"
                aria-label="Select Regional Language"
              >
                {Object.values(LANGUAGES).map(lang => (
                  <option key={lang.id} value={lang.id} className="text-slate-900 bg-white">
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* High Contrast Accessibility Toggle */}
            <button
              onClick={onToggleHighContrast}
              className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 font-medium ${
                highContrast 
                  ? 'bg-yellow-300 text-black border-yellow-400 font-bold' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Toggle High Contrast for Elderly Vision Support"
            >
              <SunMedium className="w-4 h-4" />
              <span className="hidden lg:inline">{t.highContrast}</span>
            </button>

            {/* Text Scaler */}
            <button
              onClick={() => {
                const nextSize = textSize === 'normal' ? 'large' : textSize === 'large' ? 'xlarge' : 'normal';
                onChangeTextSize(nextSize);
              }}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1"
              title="Scale Font Size"
            >
              <Type className="w-4 h-4" />
              <span className="text-[11px] uppercase">{textSize === 'normal' ? '1x' : textSize === 'large' ? '1.2x' : '1.4x'}</span>
            </button>

            {/* System Flowchart & Architecture Modal Button */}
            <button
              onClick={onOpenFlowchartModal}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
              title="View Architecture Flowcharts, Adaptive AI logic & SIH Specifications"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Specs & Flowchart</span>
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onTriggerSOS}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 animate-pulse"
              title="Emergency Elder Alert & Caregiver Notification"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.emergencySOS}</span>
            </button>

            {/* Caregiver Switch Toggle */}
            <button
              onClick={handleCaregiverSwitch}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                currentMode === 'caregiver'
                  ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
              }`}
            >
              {currentMode === 'caregiver' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t.patientMode}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.caregiverMode}</span>
                </>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Caregiver PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-100 text-teal-800 rounded-xl">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Caregiver Verification</h3>
                <p className="text-xs text-slate-500">Enter PIN to prevent accidental elder access</p>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Access PIN (Demo PIN: <strong className="text-emerald-700">1234</strong> or <strong className="text-emerald-700">26003</strong>)
                </label>
                <input
                  type="password"
                  maxLength={5}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  autoFocus
                  className="w-full text-center tracking-widest text-2xl py-2 px-3 border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none"
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium text-center">
                    Incorrect PIN. Please use demo PIN: 1234
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md"
                >
                  Unlock Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
