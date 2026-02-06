/**
 * WWI Tactical Game - Morale System
 * Army morale tracking with surrender mechanics
 */

// ============================================================================
// MORALE CONSTANTS
// ============================================================================

export const MORALE_CONFIG = {
  // Starting morale
  BASE_MORALE: 100,

  // Morale thresholds
  THRESHOLDS: {
    HIGH: 75,      // Above this: +1 attack to all units
    MEDIUM: 50,    // Normal state
    LOW: 25,       // Below this: -1 attack to all units
    CRITICAL: 10,  // Below this: units may flee
    SURRENDER: 0,  // At 0: automatic defeat
  },

  // Morale changes
  CHANGES: {
    // Negative events
    UNIT_KILLED: -8,
    VETERAN_KILLED: -15,
    OFFICER_KILLED: -20,
    TANK_DESTROYED: -12,
    CRITICAL_HIT_RECEIVED: -3,
    OBJECTIVE_LOST: -10,

    // Positive events
    ENEMY_KILLED: 3,
    ENEMY_OFFICER_KILLED: 8,
    ENEMY_TANK_DESTROYED: 6,
    OBJECTIVE_CAPTURED: 10,
    HEAL_PERFORMED: 2,
    RALLY_USED: 5,
    TURN_NO_LOSSES: 2,

    // Per-turn changes
    TURN_START_BONUS: 1, // Small morale recovery each turn
  },

  // Difficulty modifiers
  DIFFICULTY_MODIFIERS: {
    easy: {
      playerMoraleLoss: 0.75,   // Take 25% less morale damage
      playerMoraleGain: 1.25,   // Gain 25% more morale
      enemySurrenderThreshold: 15, // Enemy surrenders at higher morale
    },
    normal: {
      playerMoraleLoss: 1.0,
      playerMoraleGain: 1.0,
      enemySurrenderThreshold: 0,
    },
    hard: {
      playerMoraleLoss: 1.25,
      playerMoraleGain: 0.85,
      enemySurrenderThreshold: 0,
    },
    elite: {
      playerMoraleLoss: 1.5,
      playerMoraleGain: 0.7,
      enemySurrenderThreshold: 0,
    },
  },
};

// ============================================================================
// MORALE STATE
// ============================================================================

/**
 * Create initial morale state for a battle
 */
export function createMoraleState(difficulty = 'normal') {
  return {
    player: {
      current: MORALE_CONFIG.BASE_MORALE,
      max: MORALE_CONFIG.BASE_MORALE,
      status: 'high',
      modifiers: [],
    },
    enemy: {
      current: MORALE_CONFIG.BASE_MORALE,
      max: MORALE_CONFIG.BASE_MORALE,
      status: 'high',
      modifiers: [],
    },
    difficulty,
    history: [], // Track morale changes for display
  };
}

/**
 * Get morale status based on current value
 */
export function getMoraleStatus(morale) {
  const { THRESHOLDS } = MORALE_CONFIG;

  if (morale >= THRESHOLDS.HIGH) return 'high';
  if (morale >= THRESHOLDS.MEDIUM) return 'steady';
  if (morale >= THRESHOLDS.LOW) return 'shaken';
  if (morale >= THRESHOLDS.CRITICAL) return 'critical';
  return 'broken';
}

/**
 * Get status display info
 */
export function getMoraleStatusInfo(status) {
  const statusInfo = {
    high: {
      name: 'High Morale',
      icon: '💪',
      color: '#10B981',
      description: 'Troops are confident! +1 attack',
      attackModifier: 1,
    },
    steady: {
      name: 'Steady',
      icon: '😐',
      color: '#F59E0B',
      description: 'Troops are holding firm',
      attackModifier: 0,
    },
    shaken: {
      name: 'Shaken',
      icon: '😰',
      color: '#EF4444',
      description: 'Troops are wavering! -1 attack',
      attackModifier: -1,
    },
    critical: {
      name: 'Critical',
      icon: '😱',
      color: '#7C2D12',
      description: 'Near collapse! Units may flee',
      attackModifier: -2,
    },
    broken: {
      name: 'Broken',
      icon: '🏳️',
      color: '#374151',
      description: 'Army has surrendered!',
      attackModifier: -3,
    },
  };

  return statusInfo[status] || statusInfo.steady;
}

// ============================================================================
// MORALE MODIFICATION
// ============================================================================

/**
 * Apply morale change
 */
export function changeMorale(moraleState, team, change, reason, difficulty = 'normal') {
  const diffMod = MORALE_CONFIG.DIFFICULTY_MODIFIERS[difficulty] || MORALE_CONFIG.DIFFICULTY_MODIFIERS.normal;

  // Apply difficulty modifiers for player
  let actualChange = change;
  if (team === 'player') {
    if (change < 0) {
      actualChange = Math.round(change * diffMod.playerMoraleLoss);
    } else {
      actualChange = Math.round(change * diffMod.playerMoraleGain);
    }
  }

  // Apply the change
  const oldMorale = moraleState[team].current;
  moraleState[team].current = Math.max(0, Math.min(
    moraleState[team].max,
    moraleState[team].current + actualChange
  ));

  // Update status
  moraleState[team].status = getMoraleStatus(moraleState[team].current);

  // Record in history
  moraleState.history.push({
    team,
    change: actualChange,
    reason,
    oldMorale,
    newMorale: moraleState[team].current,
    timestamp: Date.now(),
  });

  return {
    moraleState,
    change: actualChange,
    newMorale: moraleState[team].current,
    status: moraleState[team].status,
  };
}

/**
 * Process morale for unit death
 */
export function onUnitKilled(moraleState, killedUnit, killerTeam, difficulty = 'normal') {
  const { CHANGES } = MORALE_CONFIG;
  const losingTeam = killedUnit.team;
  const gainingTeam = killerTeam;

  let lossAmount = CHANGES.UNIT_KILLED;
  let gainAmount = CHANGES.ENEMY_KILLED;
  let reason = `${killedUnit.type} killed`;

  // Special unit modifiers
  if (killedUnit.isVeteran) {
    lossAmount = CHANGES.VETERAN_KILLED;
    reason = `Veteran ${killedUnit.type} killed`;
  }

  if (killedUnit.type === 'officer') {
    lossAmount = CHANGES.OFFICER_KILLED;
    gainAmount = CHANGES.ENEMY_OFFICER_KILLED;
    reason = 'Officer killed';
  }

  if (killedUnit.type === 'tank') {
    lossAmount = CHANGES.TANK_DESTROYED;
    gainAmount = CHANGES.ENEMY_TANK_DESTROYED;
    reason = 'Tank destroyed';
  }

  // Apply losses to the team that lost a unit
  changeMorale(moraleState, losingTeam, lossAmount, reason, difficulty);

  // Apply gains to the team that killed the unit
  changeMorale(moraleState, gainingTeam, gainAmount, `${reason} (enemy)`, difficulty);

  return moraleState;
}

/**
 * Process morale at turn start
 */
export function onTurnStart(moraleState, team, unitsLostThisTurn, difficulty = 'normal') {
  const { CHANGES } = MORALE_CONFIG;

  // Small morale recovery at turn start
  changeMorale(moraleState, team, CHANGES.TURN_START_BONUS, 'Turn start', difficulty);

  // Bonus if no units were lost
  if (unitsLostThisTurn === 0) {
    changeMorale(moraleState, team, CHANGES.TURN_NO_LOSSES, 'No casualties', difficulty);
  }

  return moraleState;
}

/**
 * Process morale for healing
 */
export function onHealPerformed(moraleState, team, difficulty = 'normal') {
  const { CHANGES } = MORALE_CONFIG;
  changeMorale(moraleState, team, CHANGES.HEAL_PERFORMED, 'Medical aid', difficulty);
  return moraleState;
}

/**
 * Process morale for rally ability
 */
export function onRallyUsed(moraleState, team, difficulty = 'normal') {
  const { CHANGES } = MORALE_CONFIG;
  changeMorale(moraleState, team, CHANGES.RALLY_USED, 'Rally cry', difficulty);
  return moraleState;
}

/**
 * Process morale for objective capture
 */
export function onObjectiveCaptured(moraleState, capturingTeam, difficulty = 'normal') {
  const { CHANGES } = MORALE_CONFIG;
  const losingTeam = capturingTeam === 'player' ? 'enemy' : 'player';

  changeMorale(moraleState, capturingTeam, CHANGES.OBJECTIVE_CAPTURED, 'Objective captured', difficulty);
  changeMorale(moraleState, losingTeam, CHANGES.OBJECTIVE_LOST, 'Objective lost', difficulty);

  return moraleState;
}

// ============================================================================
// MORALE CHECKS
// ============================================================================

/**
 * Check if a team has surrendered
 */
export function hasSurrendered(moraleState, team, difficulty = 'normal') {
  const morale = moraleState[team].current;
  const diffMod = MORALE_CONFIG.DIFFICULTY_MODIFIERS[difficulty] || MORALE_CONFIG.DIFFICULTY_MODIFIERS.normal;

  // Check if enemy surrenders early on easier difficulties
  if (team === 'enemy' && morale <= diffMod.enemySurrenderThreshold) {
    return true;
  }

  return morale <= MORALE_CONFIG.THRESHOLDS.SURRENDER;
}

/**
 * Check if unit should flee (when morale is critical)
 */
export function shouldUnitFlee(moraleState, team, unit) {
  const morale = moraleState[team].current;

  if (morale > MORALE_CONFIG.THRESHOLDS.CRITICAL) {
    return false;
  }

  // Officers and tanks never flee
  if (unit.type === 'officer' || unit.type === 'tank') {
    return false;
  }

  // Veterans are less likely to flee
  const fleeChance = unit.isVeteran ? 0.1 : 0.2;

  return Math.random() < fleeChance;
}

/**
 * Get combat modifier based on morale
 */
export function getMoraleCombatModifier(moraleState, team) {
  const status = moraleState[team].status;
  const statusInfo = getMoraleStatusInfo(status);
  return statusInfo.attackModifier;
}

// ============================================================================
// DISPLAY HELPERS
// ============================================================================

/**
 * Get morale bar color based on percentage
 */
export function getMoraleBarColor(morale, max) {
  const percentage = (morale / max) * 100;

  if (percentage >= 75) return '#10B981'; // Green
  if (percentage >= 50) return '#F59E0B'; // Yellow
  if (percentage >= 25) return '#EF4444'; // Red
  return '#7C2D12'; // Dark red
}

/**
 * Get recent morale changes for display
 */
export function getRecentMoraleChanges(moraleState, team, count = 5) {
  return moraleState.history
    .filter(entry => entry.team === team)
    .slice(-count)
    .reverse();
}

/**
 * Format morale change for display
 */
export function formatMoraleChange(change) {
  if (change > 0) {
    return `+${change} Morale`;
  }
  return `${change} Morale`;
}

export default {
  MORALE_CONFIG,
  createMoraleState,
  getMoraleStatus,
  getMoraleStatusInfo,
  changeMorale,
  onUnitKilled,
  onTurnStart,
  onHealPerformed,
  onRallyUsed,
  onObjectiveCaptured,
  hasSurrendered,
  shouldUnitFlee,
  getMoraleCombatModifier,
  getMoraleBarColor,
  getRecentMoraleChanges,
  formatMoraleChange,
};
