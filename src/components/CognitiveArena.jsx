import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  ArrowLeft, 
  Trophy, 
  Brain, 
  Layers, 
  CalendarClock, 
  Shapes, 
  Lightbulb, 
  Activity,
  Heart
} from 'lucide-react';
import { CULTURAL_MEMORY_CARDS, DAILY_ROUTINE_STEPS, UI_TRANSLATIONS, LANGUAGES } from '../data/culturalData';
import { speakPrompt, audioFx } from '../utils/speechHelper';
import { aiEngine } from '../utils/aiAdaptiveEngine';

export default function CognitiveArena({ currentLang, highContrast, onBackToHub }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const langCode = LANGUAGES[currentLang]?.code || 'en-IN';

  // Active Game Domain: 'memory' | 'attention' | 'routine' | 'pattern'
  const [activeTab, setActiveTab] = useState('memory');
  
  // Real-time AI Adaptive Telemetry State
  const [aiTelemetry, setAiTelemetry] = useState({
    level: 1,
    avgLatency: 2.8,
    accuracy: 100,
    fatigueIndex: 12,
    scaffoldHint: null,
  });

  // ----------------------------------------------------
  // DOMAIN 1: MEMORY RECALL (CULTURAL CARDS)
  // ----------------------------------------------------
  const [memoryDeck, setMemoryDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [touchStartTime, setTouchStartTime] = useState(Date.now());
  const [activeStoryCard, setActiveStoryCard] = useState(null);

  const initMemoryGame = (level = aiTelemetry.level) => {
    // Level 1: 4 cards (2 pairs)
    // Level 2: 6 cards (3 pairs)
    // Level 3: 8 cards (4 pairs)
    const pairsCount = level === 1 ? 2 : level === 2 ? 3 : 4;
    const selectedSource = CULTURAL_MEMORY_CARDS.slice(0, pairsCount);
    
    // Create twin pairs with unique instance ids
    const deck = [];
    selectedSource.forEach(item => {
      deck.push({ ...item, instanceId: `${item.id}_a` });
      deck.push({ ...item, instanceId: `${item.id}_b` });
    });

    // Shuffle
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setMemoryDeck(shuffled);
    setFlippedCards([]);
    setMatchedIds([]);
    setTouchStartTime(Date.now());
    setActiveStoryCard(null);

    // Friendly spoken introduction
    speakPrompt(
      currentLang === 'as' 
        ? 'মনৰ খেল: একে ধৰণৰ দুখন কাৰ্ড বিচাৰি উলিয়াওক।'
        : 'Welcome to Heritage Recall. Gently tap two matching cards from North East India.', 
      langCode
    );
  };

  useEffect(() => {
    initMemoryGame(aiTelemetry.level);
  }, [activeTab]);

  const handleCardClick = (card, index) => {
    if (flippedCards.length === 2 || flippedCards.some(f => f.index === index) || matchedIds.includes(card.id)) {
      return;
    }

    const latencyMs = Date.now() - touchStartTime;
    audioFx.playGentleTone(520, 0.12);

    const newFlipped = [...flippedCards, { card, index }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const isMatch = first.card.id === second.card.id;

      // Evaluate via AI Adaptive Engine
      const adaptiveResult = aiEngine.evaluateAction({
        isCorrect: isMatch,
        latencyMs,
        domain: 'memory'
      });

      setAiTelemetry({
        level: adaptiveResult.currentLevel,
        avgLatency: adaptiveResult.avgLatencySec,
        accuracy: adaptiveResult.accuracyPercent,
        fatigueIndex: adaptiveResult.fatigueIndex,
        scaffoldHint: adaptiveResult.needsScaffold ? first.card.name : null,
      });

      if (isMatch) {
        audioFx.playSuccessChime();
        const updatedMatched = [...matchedIds, first.card.id];
        setMatchedIds(updatedMatched);
        setFlippedCards([]);
        setActiveStoryCard(first.card);
        setTouchStartTime(Date.now());

        // Audio story voice prompt
        speakPrompt(`${first.card.name}. ${first.card.description}`, langCode);

        // Check if round complete
        if (updatedMatched.length === memoryDeck.length / 2) {
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        }
      } else {
        // Mismatch: delay and flip back
        setTimeout(() => {
          setFlippedCards([]);
          setTouchStartTime(Date.now());
        }, 1300);
      }
    }
  };

  // ----------------------------------------------------
  // DOMAIN 2: ATTENTION & CONCENTRATION (MOTIF SORTER)
  // ----------------------------------------------------
  const attentionTargets = [
    { id: 'rhino', label: 'Kaziranga Rhino (গড়)', symbol: '🦏', voice: 'Touch the peaceful Rhino grazing in Kaziranga.' },
    { id: 'tea', label: 'Fresh Assam Tea (ৰঙা চাহ)', symbol: '☕', voice: 'Look for the warm steaming morning tea cup.' },
    { id: 'dhol', label: 'Bihu Dhol (বিহু ঢোল)', symbol: '🥁', voice: 'Can you spot the musical Bihu dhol?' },
    { id: 'feather', label: 'Hornbill Headdress (হৰ্ণবিল)', symbol: '🪶', voice: 'Find the vibrant Hornbill feather.' }
  ];

  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [attentionGrid, setAttentionGrid] = useState([]);
  const [attentionStreak, setAttentionStreak] = useState(0);

  const initAttentionRound = (targetIdx = currentTargetIndex) => {
    const target = attentionTargets[targetIdx % attentionTargets.length];
    const symbols = ['🦏', '☕', '🥁', '🪶', '🌸', '🎋', '🪔', '🦌'];
    
    // Create 9 grid items with 1 to 3 correct target matches
    const items = [];
    const correctCount = 2;
    for (let i = 0; i < correctCount; i++) items.push({ symbol: target.symbol, isTarget: true, id: `tgt_${i}` });
    
    while (items.length < 8) {
      const randomSym = symbols[Math.floor(Math.random() * symbols.length)];
      if (randomSym !== target.symbol) {
        items.push({ symbol: randomSym, isTarget: false, id: `dist_${items.length}` });
      }
    }
    
    setAttentionGrid(items.sort(() => Math.random() - 0.5));
    speakPrompt(target.voice, langCode);
  };

  useEffect(() => {
    if (activeTab === 'attention') {
      initAttentionRound(currentTargetIndex);
    }
  }, [activeTab, currentTargetIndex]);

  const handleAttentionItemClick = (item) => {
    if (item.isTarget) {
      audioFx.playSuccessChime();
      setAttentionStreak(s => s + 1);
      confetti({ particleCount: 30, spread: 45 });
      aiEngine.evaluateAction({ isCorrect: true, latencyMs: 1800, domain: 'attention' });
      // Move to next target
      setCurrentTargetIndex(i => i + 1);
    } else {
      audioFx.playGentleTone(300, 0.2);
      aiEngine.evaluateAction({ isCorrect: false, latencyMs: 3200, domain: 'attention' });
    }
  };

  // ----------------------------------------------------
  // DOMAIN 3: DAILY ROUTINE SEQUENCING
  // ----------------------------------------------------
  const [routineList, setRoutineList] = useState([]);
  const [routineSolved, setRoutineSolved] = useState(false);

  useEffect(() => {
    if (activeTab === 'routine') {
      // Scramble routine steps
      const scrambled = [...DAILY_ROUTINE_STEPS].sort(() => Math.random() - 0.5);
      setRoutineList(scrambled);
      setRoutineSolved(false);
      speakPrompt('Daily Routine: Tap the cards to arrange a peaceful day from morning tea to lunch.', langCode);
    }
  }, [activeTab]);

  const moveRoutineStep = (index, direction) => {
    const newItems = [...routineList];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setRoutineList(newItems);
    audioFx.playGentleTone(480, 0.1);

    // Check if sorted
    const isSorted = newItems.every((item, idx) => item.expectedOrder === idx + 1);
    if (isSorted) {
      setRoutineSolved(true);
      audioFx.playSuccessChime();
      confetti({ particleCount: 50, spread: 70 });
      speakPrompt('Wonderful! You have sequenced the entire day gracefully.', langCode);
      aiEngine.evaluateAction({ isCorrect: true, latencyMs: 2500, domain: 'routine' });
    }
  };

  // ----------------------------------------------------
  // DOMAIN 4: VISUOSPATIAL PATTERN WEAVER
  // ----------------------------------------------------
  const weavePatterns = [
    { name: 'Muga Silk Chevron', pattern: ['🟩', '🟨', '🟩', '🟨'], solution: '🟩' },
    { name: 'Naga Shawl Geometric', pattern: ['🟥', '⬛', '🟥', '⬛'], solution: '🟥' },
    { name: 'Bamboo Cane Wicker', pattern: ['🟫', '🟨', '🟫', '🟨'], solution: '🟫' },
  ];
  const [currentWeaveIdx, setCurrentWeaveIdx] = useState(0);
  const activeWeave = weavePatterns[currentWeaveIdx % weavePatterns.length];

  const handleWeaveChoice = (choice) => {
    if (choice === activeWeave.solution) {
      audioFx.playSuccessChime();
      confetti({ particleCount: 40, spread: 50 });
      speakPrompt('Correct pattern match! The traditional textile weave is complete.', langCode);
      aiEngine.evaluateAction({ isCorrect: true, latencyMs: 2000, domain: 'visuospatial' });
      setCurrentWeaveIdx(i => i + 1);
    } else {
      audioFx.playGentleTone(330, 0.2);
      aiEngine.evaluateAction({ isCorrect: false, latencyMs: 3800, domain: 'visuospatial' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        {/* AI Telemetry Realtime Pill */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border text-xs font-semibold ${
          highContrast 
            ? 'bg-black text-yellow-300 border-yellow-400' 
            : 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <Brain className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>AI Adaptive Engine: Level {aiTelemetry.level}</span>
          </div>
          <span className="opacity-40">|</span>
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            Avg Latency: {aiTelemetry.avgLatency}s
          </span>
          <span className="opacity-40">|</span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Comfort Index: {100 - aiTelemetry.fatigueIndex}%
          </span>
        </div>
      </div>

      {/* 4 Cognitive Domain Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        
        <button
          onClick={() => { setActiveTab('memory'); audioFx.playGentleTone(440, 0.1); }}
          className={`p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-all ${
            activeTab === 'memory'
              ? (highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-[1.02]')
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>1. Memory Recall</span>
        </button>

        <button
          onClick={() => { setActiveTab('attention'); audioFx.playGentleTone(440, 0.1); }}
          className={`p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-all ${
            activeTab === 'attention'
              ? (highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-[1.02]')
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>2. Attention Focus</span>
        </button>

        <button
          onClick={() => { setActiveTab('routine'); audioFx.playGentleTone(440, 0.1); }}
          className={`p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-all ${
            activeTab === 'routine'
              ? (highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-[1.02]')
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <CalendarClock className="w-5 h-5" />
          <span>3. Daily Routine</span>
        </button>

        <button
          onClick={() => { setActiveTab('pattern'); audioFx.playGentleTone(440, 0.1); }}
          className={`p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-all ${
            activeTab === 'pattern'
              ? (highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-[1.02]')
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Shapes className="w-5 h-5" />
          <span>4. Pattern Weave</span>
        </button>

      </div>

      {/* Active Domain Workspace */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-colors ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-800 border-slate-200'
      }`}>
        
        {/* TAB 1: MEMORY RECALL */}
        {activeTab === 'memory' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b pb-4 border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-emerald-800">
                  <span>North East Cultural Heritage Recall</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Match pairs of traditional North Eastern symbols (Level {aiTelemetry.level}: {memoryDeck.length} cards)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakPrompt('Find matching pairs of cultural cards from the valleys and hills of North East India.', langCode)}
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs flex items-center gap-1.5"
                  title="Spoken audio instructions"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Voice Prompt</span>
                </button>
                <button
                  onClick={() => initMemoryGame()}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                  title="Shuffle & Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Shuffle</span>
                </button>
              </div>
            </div>

            {/* AI Scaffolding Gentle Banner */}
            {aiTelemetry.scaffoldHint && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs text-amber-900 animate-in fade-in">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Gentle AI Clue:</strong> Look for the warm cultural symbol: <em>{aiTelemetry.scaffoldHint}</em>
                </span>
              </div>
            )}

            {/* Card Grid */}
            <div className={`grid gap-4 sm:gap-6 ${
              memoryDeck.length <= 4 
                ? 'grid-cols-2 max-w-lg mx-auto' 
                : memoryDeck.length <= 6 
                  ? 'grid-cols-2 sm:grid-cols-3 max-w-2xl mx-auto' 
                  : 'grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto'
            }`}>
              {memoryDeck.map((card, idx) => {
                const isFlipped = flippedCards.some(f => f.index === idx) || matchedIds.includes(card.id);
                const isMatched = matchedIds.includes(card.id);

                return (
                  <button
                    key={card.instanceId}
                    onClick={() => handleCardClick(card, idx)}
                    disabled={isMatched}
                    className={`h-36 sm:h-44 rounded-3xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 transform active:scale-95 shadow-xs border-2 ${
                      isMatched 
                        ? 'bg-emerald-50 border-emerald-400 opacity-90 scale-95 ring-2 ring-emerald-200' 
                        : isFlipped
                          ? `${card.color} border-current shadow-md scale-100`
                          : 'bg-gradient-to-b from-slate-100 to-slate-200 border-slate-300 hover:border-emerald-500 hover:shadow-md'
                    }`}
                  >
                    {isFlipped ? (
                      <div className="flex flex-col items-center justify-center space-y-1 animate-in zoom-in-75">
                        <span className="text-4xl sm:text-5xl">{card.symbol}</span>
                        <span className="font-extrabold text-xs sm:text-sm leading-tight mt-1">{card.name}</span>
                        <span className="text-[10px] font-medium opacity-80">{card.region}</span>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1" />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-emerald-800 font-bold text-lg">
                          স্মৃতি
                        </div>
                        <span className="text-xs font-semibold text-slate-500">Tap to Reveal</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Cultural Story / Reminiscence Modal Card */}
            {activeStoryCard && (
              <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center gap-4 text-emerald-950">
                <span className="text-5xl">{activeStoryCard.symbol}</span>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-bold text-base text-emerald-900">{activeStoryCard.name}</h4>
                    <span className="text-xs px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-full font-semibold">
                      {activeStoryCard.region}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                    {activeStoryCard.description}
                  </p>
                </div>
                <button
                  onClick={() => speakPrompt(activeStoryCard.description, langCode)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Again</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ATTENTION & CONCENTRATION */}
        {activeTab === 'attention' && (
          <div>
            <div className="mb-6 border-b pb-4 border-slate-100">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-800">
                Nature & Cultural Motif Sorter
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Target: Tap all cards showing <strong>{attentionTargets[currentTargetIndex % attentionTargets.length].label}</strong>
              </p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-emerald-100 text-emerald-900 rounded-2xl flex items-center gap-3 border border-emerald-300">
                <span className="text-4xl">{attentionTargets[currentTargetIndex % attentionTargets.length].symbol}</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Find This Symbol</span>
                  <div className="font-extrabold text-base">{attentionTargets[currentTargetIndex % attentionTargets.length].label}</div>
                </div>
                <button
                  onClick={() => speakPrompt(attentionTargets[currentTargetIndex % attentionTargets.length].voice, langCode)}
                  className="p-2 rounded-xl bg-white text-emerald-800 shadow-xs hover:bg-emerald-50"
                  title="Hear Voice Prompt"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
              {attentionGrid.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAttentionItemClick(item)}
                  className="h-24 sm:h-28 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 hover:border-emerald-600 flex items-center justify-center text-4xl sm:text-5xl transition-transform active:scale-90 shadow-xs"
                >
                  {item.symbol}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              Focus Streak: <strong className="text-emerald-700 text-sm">{attentionStreak} successful matches</strong>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY ROUTINE SEQUENCING */}
        {activeTab === 'routine' && (
          <div>
            <div className="mb-6 border-b pb-4 border-slate-100">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-800">
                Daily Living Routine Sequencing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Use the arrows (▲ ▼) to place your morning and daytime steps in natural, peaceful order.
              </p>
            </div>

            {routineSolved && (
              <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 flex items-center gap-3 animate-in fade-in">
                <Trophy className="w-6 h-6 text-amber-600" />
                <div>
                  <h4 className="font-bold text-sm">Perfect Day Sequence Completed!</h4>
                  <p className="text-xs text-emerald-800">Your daily orientation and routine recall is in excellent form today.</p>
                </div>
              </div>
            )}

            <div className="space-y-3 max-w-xl mx-auto">
              {routineList.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-3xl">{step.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-500">{step.desc} • <span className="font-semibold text-emerald-700">{step.time}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveRoutineStep(idx, -1)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-30 text-xs font-bold"
                      title="Move earlier"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveRoutineStep(idx, 1)}
                      disabled={idx === routineList.length - 1}
                      className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-30 text-xs font-bold"
                      title="Move later"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VISUOSPATIAL PATTERN WEAVE */}
        {activeTab === 'pattern' && (
          <div>
            <div className="mb-6 border-b pb-4 border-slate-100">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-800">
                Traditional North Eastern Weave Pattern
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Complete the traditional loom sequence for: <strong>{activeWeave.name}</strong>
              </p>
            </div>

            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="p-6 bg-slate-100 rounded-3xl border-2 border-slate-300 flex items-center justify-center gap-3 text-4xl">
                {activeWeave.pattern.map((block, i) => (
                  <span key={i} className="p-2 bg-white rounded-xl shadow-xs">{block}</span>
                ))}
                <span className="p-2 bg-emerald-100 border-2 border-dashed border-emerald-600 rounded-xl text-emerald-700 text-2xl font-bold">
                  ?
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-600 mb-3">Which yarn completes the pattern?</p>
                <div className="flex justify-center gap-4">
                  {['🟩', '🟨', '🟥', '🟫'].map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleWeaveChoice(choice)}
                      className="w-16 h-16 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-emerald-600 text-3xl shadow-sm flex items-center justify-center transition-transform active:scale-95"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
