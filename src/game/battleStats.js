/**
 * WWI Tactical Game - Battle Statistics System
 * Tracks and rates battle performance
 */

// ============================================================================
// BATTLE STATS TRACKING
// ============================================================================

/**
 * Create a new battle stats tracker
 */
export function createBattleStats(missionId, missionName, difficulty) {
  return {
    missionId,
    missionName,
    difficulty,
    startTime: Date.now(),
    endTime: null,

    // Turn tracking
    turnsPlayed: 0,
    playerTurns: 0,
    enemyTurns: 0,

    // Combat stats
    totalKills: 0,
    killsByUnitType: {},
    damageDealt: 0,
    damageReceived: 0,

    // Unit stats
    unitsLost: 0,
    unitsLostByType: {},
    startingUnits: 0,
    survivingUnits: 0,

    // Action tracking
    totalMoves: 0,
    totalAttacks: 0,
    abilitiesUsed: 0,
    healsPerformed: 0,
    healingDone: 0,

    // Special tracking
    criticalHits: 0,
    missedAttacks: 0,
    veteransDeployed: 0,
    veteransLost: 0,
    tanksDestroyed: 0,
    officersKilled: 0,

    // Turn-by-turn kills (for "5 kills in one turn" medal)
    killsThisTurn: 0,
    maxKillsInOneTurn: 0,
  };
}

/**
 * Record a kill
 */
export function recordKill(stats, killerType, victimType) {
  stats.totalKills++;
  stats.killsByUnitType[killerType] = (stats.killsByUnitType[killerType] || 0) + 1;
  stats.killsThisTurn++;

  // Track special kills
  if (victimType === 'tank') {
    stats.tanksDestroyed++;
  }
  if (victimType === 'officer') {
    stats.officersKilled++;
  }

  return stats;
}

/**
 * Record damage dealt
 */
export function recordDamage(stats, damage, isPlayerAttack) {
  if (isPlayerAttack) {
    stats.damageDealt += damage;
  } else {
    stats.damageReceived += damage;
  }
  return stats;
}

/**
 * Record unit lost
 */
export function recordUnitLost(stats, unitType, isVeteran) {
  stats.unitsLost++;
  stats.unitsLostByType[unitType] = (stats.unitsLostByType[unitType] || 0) + 1;

  if (isVeteran) {
    stats.veteransLost++;
  }

  return stats;
}

/**
 * Record a move
 */
export function recordMove(stats) {
  stats.totalMoves++;
  return stats;
}

/**
 * Record an attack
 */
export function recordAttack(stats, hit, critical = false) {
  stats.totalAttacks++;

  if (!hit) {
    stats.missedAttacks++;
  } else if (critical) {
    stats.criticalHits++;
  }

  return stats;
}

/**
 * Record ability use
 */
export function recordAbilityUse(stats, abilityType, healAmount = 0) {
  stats.abilitiesUsed++;

  if (healAmount > 0) {
    stats.healsPerformed++;
    stats.healingDone += healAmount;
  }

  return stats;
}

/**
 * End turn and update turn tracking
 */
export function endTurn(stats, isPlayerTurn) {
  stats.turnsPlayed++;

  if (isPlayerTurn) {
    stats.playerTurns++;

    // Track max kills in a single turn
    if (stats.killsThisTurn > stats.maxKillsInOneTurn) {
      stats.maxKillsInOneTurn = stats.killsThisTurn;
    }
    stats.killsThisTurn = 0;
  } else {
    stats.enemyTurns++;
  }

  return stats;
}

/**
 * Finalize battle stats
 */
export function finalizeBattleStats(stats, victory, startingUnits, survivingUnits) {
  stats.endTime = Date.now();
  stats.victory = victory;
  stats.startingUnits = startingUnits;
  stats.survivingUnits = survivingUnits;
  stats.durationMs = stats.endTime - stats.startTime;
  stats.durationMinutes = Math.round(stats.durationMs / 60000);

  return stats;
}

// ============================================================================
// RATING SYSTEM
// ============================================================================

/**
 * Calculate star rating (1-3 stars)
 */
export function calculateRating(stats) {
  let score = 0;
  let maxScore = 0;

  // Turn efficiency (max 30 points)
  // Fewer turns = better
  const turnTarget = 10;
  const turnBonus = Math.max(0, 30 - (stats.playerTurns - turnTarget) * 3);
  score += turnBonus;
  maxScore += 30;

  // Casualties (max 40 points)
  // Fewer losses = better
  const casualtyRatio = stats.startingUnits > 0
    ? stats.unitsLost / stats.startingUnits
    : 0;
  const casualtyBonus = Math.max(0, 40 - casualtyRatio * 80);
  score += casualtyBonus;
  maxScore += 40;

  // Kill efficiency (max 20 points)
  const killEfficiency = stats.totalAttacks > 0
    ? stats.totalKills / stats.totalAttacks
    : 0;
  const killBonus = Math.min(20, killEfficiency * 40);
  score += killBonus;
  maxScore += 20;

  // Veteran survival bonus (max 10 points)
  const veteranSurvivalRate = stats.veteransDeployed > 0
    ? (stats.veteransDeployed - stats.veteransLost) / stats.veteransDeployed
    : 1;
  score += veteranSurvivalRate * 10;
  maxScore += 10;

  // Calculate percentage and stars
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  let stars = 1;
  if (percentage >= 80) stars = 3;
  else if (percentage >= 50) stars = 2;

  return {
    score: Math.round(score),
    maxScore,
    percentage: Math.round(percentage),
    stars,
  };
}

/**
 * Get rating description
 */
export function getRatingDescription(stars) {
  switch (stars) {
    case 3:
      return {
        title: 'Decisive Victory',
        description: 'An exemplary display of tactical prowess!',
        color: '#F59E0B',
      };
    case 2:
      return {
        title: 'Hard-Fought Victory',
        description: 'Victory achieved, but at significant cost.',
        color: '#9CA3AF',
      };
    case 1:
    default:
      return {
        title: 'Pyrrhic Victory',
        description: 'We won, but barely...',
        color: '#78350F',
      };
  }
}

// ============================================================================
// REQUISITION REWARDS
// ============================================================================

/**
 * Calculate requisition points earned
 */
export function calculateRequisitionReward(stats, rating, difficultyBonus = 1) {
  const baseReward = 25;

  // Star bonus
  const starBonus = rating.stars * 10;

  // Performance bonuses
  let performanceBonus = 0;

  // Perfect victory (no casualties)
  if (stats.unitsLost === 0) {
    performanceBonus += 15;
  }

  // Quick victory
  if (stats.playerTurns <= 8) {
    performanceBonus += 10;
  }

  // Kill bonus (1 point per 2 kills)
  performanceBonus += Math.floor(stats.totalKills / 2);

  // Veteran survival bonus
  if (stats.veteransDeployed > 0 && stats.veteransLost === 0) {
    performanceBonus += 10;
  }

  const total = Math.round((baseReward + starBonus + performanceBonus) * difficultyBonus);

  return {
    base: baseReward,
    starBonus,
    performanceBonus,
    difficultyBonus,
    total,
  };
}

// ============================================================================
// STAT SUMMARIES
// ============================================================================

/**
 * Get key stats for display
 */
export function getStatSummary(stats) {
  return [
    {
      label: 'Enemies Defeated',
      value: stats.totalKills,
      icon: '💀',
    },
    {
      label: 'Units Lost',
      value: stats.unitsLost,
      icon: '⚰️',
    },
    {
      label: 'Turns Taken',
      value: stats.playerTurns,
      icon: '⏱️',
    },
    {
      label: 'Damage Dealt',
      value: stats.damageDealt,
      icon: '⚔️',
    },
    {
      label: 'Damage Received',
      value: stats.damageReceived,
      icon: '🛡️',
    },
    {
      label: 'Accuracy',
      value: stats.totalAttacks > 0
        ? `${Math.round(((stats.totalAttacks - stats.missedAttacks) / stats.totalAttacks) * 100)}%`
        : 'N/A',
      icon: '🎯',
    },
  ];
}

/**
 * Get detailed combat breakdown
 */
export function getCombatBreakdown(stats) {
  return {
    attacks: {
      total: stats.totalAttacks,
      hits: stats.totalAttacks - stats.missedAttacks,
      criticals: stats.criticalHits,
      misses: stats.missedAttacks,
    },
    kills: {
      total: stats.totalKills,
      byType: stats.killsByUnitType,
      maxInOneTurn: stats.maxKillsInOneTurn,
    },
    losses: {
      total: stats.unitsLost,
      byType: stats.unitsLostByType,
      veterans: stats.veteransLost,
    },
    support: {
      heals: stats.healsPerformed,
      healingDone: stats.healingDone,
      abilitiesUsed: stats.abilitiesUsed,
    },
  };
}

export default {
  createBattleStats,
  recordKill,
  recordDamage,
  recordUnitLost,
  recordMove,
  recordAttack,
  recordAbilityUse,
  endTurn,
  finalizeBattleStats,
  calculateRating,
  getRatingDescription,
  calculateRequisitionReward,
  getStatSummary,
  getCombatBreakdown,
};
