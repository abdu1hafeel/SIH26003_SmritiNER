import React, { useState } from 'react';
import { 
  X, 
  Workflow, 
  Cpu, 
  Database, 
  Smartphone, 
  WifiOff, 
  HeartHandshake, 
  Layers, 
  Activity, 
  CheckCircle2,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export default function SystemFlowchartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto text-slate-800 p-6 sm:p-8 animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900">SmritiNER Architecture & Flowcharts</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  SIH26003 Specification
                </span>
              </div>
              <p className="text-xs text-slate-500">
                AI Cognitive Platform for Elderly Dementia Patients in North East India (MDoNER)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: End-to-End System Flowchart */}
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>1. System Architecture & Component Hierarchy</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tablet-first PWA with offline-first persistence and dual patient/caregiver modules
            </p>
          </div>

          {/* Visual Architecture Flow Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            
            {/* Box 1: Client Front-End */}
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-indigo-200 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Patient Interaction Layer</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High-Contrast & Large Touch Targets</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Regional Audio (AS, MNI, BN, HI)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4 Cognitive Games (Memory, Focus, Routine, Weave)</span>
                </li>
              </ul>
            </div>

            {/* Box 2: AI Adaptive Core */}
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <Cpu className="w-4 h-4" />
                <span>AI Adaptive Engine</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Latency & Touch Hesitation Tracking</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dynamic Scaffolding (Audio Clues)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cognitive Fatigue Index ($F_{score}$)</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Caregiver & Tele-Health */}
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-teal-200 space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
                <HeartHandshake className="w-4 h-4" />
                <span>Caregiver & Clinician</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MoCA / MMSE Domain Radar Chart</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Early Decline Anomaly Detector</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GPS Geofence Wandering Simulator</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Section 2: Flowchart Step Sequence */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
            <h5 className="font-extrabold text-sm text-indigo-950">Patient Interaction & Adaptive Loop Flowchart</h5>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Patient Selects Cognitive Exercise:</strong> UI initializes game deck scaled to user baseline (Level 1, 2, or 3) with culturally resonant North Eastern assets (e.g. Bihu Dhol, Hornbill headdress, Muga silk).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Real-time Telemetry Collection:</strong> Touch hesitation, time-to-first-tap, and error sequences are recorded client-side in IndexedDB with zero latency.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Dynamic Difficulty Adaptation:</strong> If latency exceeds 6.0s or 2 consecutive misses occur, scaffolding activates (gentle voice clue, card glow). If accuracy &gt;85% with smooth speed, level advances.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Clinical Aggregation & Offline Sync:</strong> Data queues in local cache and auto-syncs to caregiver cloud when network connects in remote NER valleys.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: SIH PPT Deck Blueprint */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-extrabold text-sm text-emerald-950">Hackathon Presentation Deck Ready</h5>
              <p className="text-xs text-emerald-800 mt-0.5">
                Full 7-slide SIH presentation script & python automation script generated in project root.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-900 bg-emerald-200/80 px-3 py-1.5 rounded-xl">
              Template Adaptable
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
          >
            Close Flowchart View
          </button>
        </div>

      </div>
    </div>
  );
}
