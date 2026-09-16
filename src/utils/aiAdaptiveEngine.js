// AI Adaptive Difficulty Engine for SmritiNER
// Dynamically personalizes cognitive stimulation, prevents dementia frustration/agitation,
// and logs clinical telemetry for clinician review.

const STORAGE_KEY = 'smriti_ner_telemetry_v1';

export class AIAdaptiveEngine {
  constructor() {
    this.session = {
      level: 1, // 1 = Gentle (4 cards), 2 = Moderate (6 cards), 3 = Advanced (8 cards)
      consecutiveErrors: 0,
      consecutiveSuccess: 0,
      totalTrials: 0,
      totalSuccess: 0,
      latencies: [],
      scaffoldTriggered: false,
      fatigueIndex: 15, // 0 to 100
    };
  }

  // Record a player action and get real-time adaptive response
  evaluateAction({ isCorrect, latencyMs, domain = 'memory' }) {
    this.session.totalTrials += 1;
    this.session.latencies.push(latencyMs);

    if (isCorrect) {
      this.session.consecutiveSuccess += 1;
      this.session.consecutiveErrors = 0;
      this.session.totalSuccess += 1;
      this.session.scaffoldTriggered = false;
    } else {
      this.session.consecutiveErrors += 1;
      this.session.consecutiveSuccess = 0;
    }

    // Calculate rolling average latency (seconds)
    const recentLatencies = this.session.latencies.slice(-5);
    const avgLatencySec = (recentLatencies.reduce((a, b) => a + b, 0) / recentLatencies.length) / 1000;

    // Evaluate Fatigue Index
    // Longer delays (>6s) and recurring errors elevate fatigue
    if (avgLatencySec > 6.0 || this.session.consecutiveErrors >= 2) {
      this.session.fatigueIndex = Math.min(100, this.session.fatigueIndex + 12);
    } else if (isCorrect && avgLatencySec < 3.5) {
      this.session.fatigueIndex = Math.max(5, this.session.fatigueIndex - 5);
    }

    // Adaptive Scaffolding Decision
    let actionRecommendation = 'CONTINUE_NORMAL';
    let hintCardId = null;

    if (this.session.consecutiveErrors >= 2 || avgLatencySec > 7.0) {
      // Patient is hesitating or feeling anxious: lower pressure, provide audio clue
      this.session.scaffoldTriggered = true;
      actionRecommendation = 'TRIGGER_SCAFFOLD_HINT';
      
      // If at higher level, drop difficulty to maintain patient dignity & comfort
      if (this.session.level > 1 && this.session.consecutiveErrors >= 3) {
        this.session.level -= 1;
        actionRecommendation = 'REDUCE_DIFFICULTY_GENTLE';
      }
    } else if (this.session.consecutiveSuccess >= 3 && this.session.level < 3 && avgLatencySec < 4.0) {
      // Patient is thriving: encourage with gentle step up
      this.session.level += 1;
      this.session.consecutiveSuccess = 0;
      actionRecommendation = 'INCREASE_DIFFICULTY';
    }

    // Check if rest is needed
    if (this.session.fatigueIndex > 75) {
      actionRecommendation = 'SUGGEST_REST_CALM';
    }

    // Persist event to offline storage
    this.logTelemetryEvent({
      timestamp: new Date().toISOString(),
      domain,
      level: this.session.level,
      isCorrect,
      latencyMs,
      fatigueIndex: this.session.fatigueIndex,
      actionRecommendation
    });

    return {
      currentLevel: this.session.level,
      recommendation: actionRecommendation,
      fatigueIndex: this.session.fatigueIndex,
      avgLatencySec: Number(avgLatencySec.toFixed(2)),
      accuracyPercent: Math.round((this.session.totalSuccess / Math.max(1, this.session.totalTrials)) * 100),
      needsScaffold: this.session.scaffoldTriggered,
    };
  }

  logTelemetryEvent(eventData) {
    try {
      if (typeof window === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEY);
      const history = raw ? JSON.parse(raw) : [];
      history.push(eventData);
      // Keep last 100 events
      if (history.length > 100) history.shift();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to persist telemetry to localStorage', e);
    }
  }

  getTelemetryHistory() {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  resetSession() {
    this.session.consecutiveErrors = 0;
    this.session.consecutiveSuccess = 0;
    this.session.scaffoldTriggered = false;
  }
}

export const aiEngine = new AIAdaptiveEngine();
