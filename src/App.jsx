import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PatientHub from './components/PatientHub';
import CognitiveArena from './components/CognitiveArena';
import MemoryCompanion from './components/MemoryCompanion';
import CalmZone from './components/CalmZone';
import CaregiverDashboard from './components/CaregiverDashboard';
import SystemFlowchartModal from './components/SystemFlowchartModal';
import { speakPrompt, audioFx } from './utils/speechHelper';
import { ShieldAlert, PhoneCall, X } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentMode, setCurrentMode] = useState('patient'); // 'patient' | 'caregiver'
  const [activeView, setActiveView] = useState('hub'); // 'hub' | 'games' | 'companion' | 'calm'
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [flowchartModalOpen, setFlowchartModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Allow URL query parameters for direct view navigation (e.g. ?view=games, ?view=caregiver, ?view=flowchart)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const requestedView = params.get('view');
      if (requestedView === 'caregiver') {
        setCurrentMode('caregiver');
        setActiveView('caregiver');
      } else if (requestedView === 'games' || requestedView === 'companion' || requestedView === 'calm') {
        setActiveView(requestedView);
      } else if (requestedView === 'flowchart') {
        setFlowchartModalOpen(true);
      }
    }
  }, []);

  const handleModeChange = (newMode) => {
    setCurrentMode(newMode);
    if (newMode === 'caregiver') {
      setActiveView('caregiver');
    } else {
      setActiveView('hub');
    }
  };

  const handleTriggerSOS = () => {
    setSosModalOpen(true);
    audioFx.playGentleTone(880, 0.5);
    speakPrompt('Emergency alert dispatched to your caregiver and local health center.', currentLang === 'as' ? 'as-IN' : 'en-IN');
  };

  const getTextSizeClass = () => {
    if (textSize === 'large') return 'text-[1.12rem]';
    if (textSize === 'xlarge') return 'text-[1.25rem]';
    return 'text-base';
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-200 ${
      highContrast 
        ? 'bg-black text-yellow-300 high-contrast' 
        : 'bg-ner-calm text-slate-900'
    } ${getTextSizeClass()}`}>
      
      {/* Universal Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        onOpenFlowchartModal={() => setFlowchartModalOpen(true)}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {currentMode === 'caregiver' ? (
          <CaregiverDashboard
            currentLang={currentLang}
            onExitToPatientMode={() => handleModeChange('patient')}
          />
        ) : (
          <>
            {activeView === 'hub' && (
              <PatientHub
                currentLang={currentLang}
                highContrast={highContrast}
                onNavigate={(view) => setActiveView(view)}
              />
            )}

            {activeView === 'games' && (
              <CognitiveArena
                currentLang={currentLang}
                highContrast={highContrast}
                onBackToHub={() => setActiveView('hub')}
              />
            )}

            {activeView === 'companion' && (
              <MemoryCompanion
                currentLang={currentLang}
                highContrast={highContrast}
                onBackToHub={() => setActiveView('hub')}
              />
            )}

            {activeView === 'calm' && (
              <CalmZone
                currentLang={currentLang}
                highContrast={highContrast}
                onBackToHub={() => setActiveView('hub')}
              />
            )}
          </>
        )}
      </main>

      {/* Senior-Friendly Footer */}
      <footer className={`border-t py-4 text-center text-xs transition-colors ${
        highContrast 
          ? 'bg-black text-yellow-400 border-yellow-500' 
          : 'bg-white/80 text-slate-500 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>SmritiNER</strong> • Smart India Hackathon 2026 (Problem ID: <strong>SIH26003</strong>)
          </span>
          <span>
            Ministry of Development of North Eastern Region (MDoNER) • Offline-First PWA
          </span>
        </div>
      </footer>

      {/* System Flowchart Modal */}
      <SystemFlowchartModal
        isOpen={flowchartModalOpen}
        onClose={() => setFlowchartModalOpen(false)}
      />

      {/* Emergency SOS Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl border-4 border-rose-600 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-lg">
                <ShieldAlert className="w-7 h-7 animate-bounce" />
                <span>Emergency SOS Activated</span>
              </div>
              <button
                onClick={() => setSosModalOpen(false)}
                className="p-1 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Help alert has been dispatched with GPS coordinates to registered contacts:
              </p>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-rose-950">
                  <span>Primary Caregiver: Ananya Boruah</span>
                  <span className="text-rose-700 font-mono">+91 94350 XXXXX</span>
                </div>
                <div className="flex items-center justify-between font-bold text-rose-950">
                  <span>Guwahati Medical College (Emergency)</span>
                  <span className="text-rose-700 font-mono">108 / 102</span>
                </div>
                <div className="text-[11px] text-rose-800 pt-1 border-t border-rose-200">
                  Location: Uzanbazar Riverfront, Guwahati (26.1445° N, 91.7362° E)
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSosModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md"
                >
                  I Am Safe (Cancel Alert)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
