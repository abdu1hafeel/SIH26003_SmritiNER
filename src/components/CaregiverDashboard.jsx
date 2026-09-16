import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  MapPin, 
  Printer, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Calendar, 
  FileText, 
  User, 
  Compass, 
  BellRing,
  Download,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_PATIENT_PROFILE, UI_TRANSLATIONS } from '../data/culturalData';
import { audioFx } from '../utils/speechHelper';

export default function CaregiverDashboard({ currentLang, onExitToPatientMode }) {
  const patient = INITIAL_PATIENT_PROFILE;
  const [wanderingAlertTriggered, setWanderingAlertTriggered] = useState(false);
  const [patientLocationStatus, setPatientLocationStatus] = useState('INSIDE_SAFE_ZONE');
  const [showPrintView, setShowPrintView] = useState(false);

  // Simulated Wandering Test
  const toggleWanderingSimulation = () => {
    if (patientLocationStatus === 'INSIDE_SAFE_ZONE') {
      setPatientLocationStatus('OUTSIDE_SAFE_ZONE');
      setWanderingAlertTriggered(true);
      audioFx.playGentleTone(220, 0.5);
    } else {
      setPatientLocationStatus('INSIDE_SAFE_ZONE');
      setWanderingAlertTriggered(false);
      audioFx.playSuccessChime();
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header with Patient Profile Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-900 font-extrabold text-2xl flex items-center justify-center border border-teal-200">
            PB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">{patient.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                Age {patient.age}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {patient.diagnosis} • {patient.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintReport}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Clinical PDF</span>
          </button>
          <button
            onClick={onExitToPatientMode}
            className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm"
          >
            Switch to Elder Mode
          </button>
        </div>
      </div>

      {/* Early Cognitive Decline & Anomaly Alert Banner */}
      <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-200 text-amber-900 rounded-xl mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-amber-900">
              AI Cognitive Health Telemetry: Mild Friday Fatigue Anomaly Detected
            </h4>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              Reaction latency rose from 3.2s to 4.6s on Friday morning. The AI adaptive engine automatically reduced cognitive game card count from 8 to 4 to preserve confidence. Patient mood remained positive.
            </p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-amber-200/80 text-amber-900 font-bold text-xs shrink-0">
          Status: Monitored & Stable
        </div>
      </div>

      {/* Grid: MoCA/MMSE Domain Scores & Weekly Latency Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Card 1: MoCA Aligned Cognitive Faculties */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-700" />
              <h3 className="font-extrabold text-base text-slate-900">MoCA / MMSE Domain Analysis</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md border border-teal-200">
              Standardized Scale
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Delayed Memory Recall (NER Heritage)', score: patient.mocaDomainScores.memoryRecall, color: 'bg-emerald-600' },
              { label: 'Attention & Focus (Nature Soundscape)', score: patient.mocaDomainScores.attentionFocus, color: 'bg-blue-600' },
              { label: 'Visuospatial Orientation (Weave Pattern)', score: patient.mocaDomainScores.visuospatial, color: 'bg-purple-600' },
              { label: 'Executive Function (Routine Sequencing)', score: patient.mocaDomainScores.executiveRoutine, color: 'bg-amber-600' },
              { label: 'Temporal & Geographic Orientation', score: patient.mocaDomainScores.orientation, color: 'bg-teal-600' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{d.label}</span>
                  <span className="text-slate-900">{d.score}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${d.color} rounded-full transition-all duration-700`} 
                    style={{ width: `${d.score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Cognitive Stability: <strong className="text-emerald-700">84/100 (Stable)</strong></span>
            <span>Refreshed: Today, 11:30 AM</span>
          </div>
        </div>

        {/* Card 2: Weekly Latency & Routine Adherence Trend */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-base text-slate-900">Weekly Reaction Latency (Seconds)</h3>
            </div>
            <span className="text-xs text-slate-500">Lower latency is better</span>
          </div>

          <div className="pt-2">
            <div className="flex items-end justify-between gap-2 h-44 pt-6 pb-2 px-2 border-b border-slate-200">
              {patient.weeklyScores.map((item, i) => {
                const heightPercent = Math.min(100, Math.round((item.latencySec / 5.0) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-600">{item.latencySec}s</span>
                    <div 
                      className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                        item.latencySec > 4.0 ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                      title={`${item.day}: ${item.latencySec}s reaction latency`}
                    />
                    <span className="text-[11px] font-bold text-slate-700">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Normal Cognitive Flow (&lt;3.8s)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Fatigue Scaffolding Activated</span>
            </div>
          </div>
        </div>

      </div>

      {/* Geofence & Dementia Wandering Safety Simulator */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Geofence & Safe-Zone Wandering Guard (GPS Simulator)
              </h3>
              <p className="text-xs text-slate-500">
                Protects elderly patients with dementia from wandering in the hilly terrains of NER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleWanderingSimulation}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                patientLocationStatus === 'INSIDE_SAFE_ZONE'
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
              }`}
            >
              {patientLocationStatus === 'INSIDE_SAFE_ZONE'
                ? 'Simulate Patient Wandering Outside'
                : 'Reset to Home Safe Zone'}
            </button>
          </div>
        </div>

        {/* Wandering Alert Banner */}
        {wanderingAlertTriggered && (
          <div className="p-4 bg-rose-600 text-white rounded-2xl flex items-center justify-between gap-4 shadow-lg animate-bounce">
            <div className="flex items-center gap-3">
              <BellRing className="w-6 h-6 shrink-0" />
              <div>
                <h4 className="font-black text-sm">EMERGENCY WANDERING ALERT: Outside 300m Safe Zone!</h4>
                <p className="text-xs opacity-90">
                  Patient detected near Guwahati Brahmaputra Ghat (520m away). SMS alert dispatched to daughter Ananya (+91 94350 XXXXX).
                </p>
              </div>
            </div>
            <button
              onClick={() => setWanderingAlertTriggered(false)}
              className="px-3 py-1.5 rounded-xl bg-white text-rose-800 font-bold text-xs"
            >
              Acknowledge
            </button>
          </div>
        )}

        {/* Map Visualization Box */}
        <div className="relative h-64 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 p-6 flex flex-col justify-between text-white overflow-hidden shadow-inner">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-mono">
              GPS: {patient.currentLocation.lat}° N, {patient.currentLocation.lng}° E
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              patientLocationStatus === 'INSIDE_SAFE_ZONE' ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white animate-pulse'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{patientLocationStatus === 'INSIDE_SAFE_ZONE' ? 'Inside Safe Zone (300m)' : 'BREACH DETECTED (520m)'}</span>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-1">
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-emerald-300/60 flex items-center justify-center bg-emerald-500/20">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                patientLocationStatus === 'INSIDE_SAFE_ZONE' ? 'bg-emerald-400 text-black' : 'bg-rose-500 text-white animate-ping'
              }`}>
                PB
              </div>
            </div>
            <p className="font-bold text-sm text-emerald-200">{patient.currentLocation.address}</p>
            <p className="text-[11px] text-slate-300">Geofence Radius: {patient.safeZoneRadiusMeters} meters around residence</p>
          </div>

          <div className="relative z-10 flex justify-between text-[11px] text-slate-300">
            <span>Mesh Node: Brahmaputra Riverfront Gateway</span>
            <span>Offline Positioning: Satellite Assisted GPS</span>
          </div>
        </div>
      </div>

    </div>
  );
}
