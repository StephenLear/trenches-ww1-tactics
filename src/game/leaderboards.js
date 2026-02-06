/**
 * WWI Tactical Game - Leaderboards System
 * Track best times, scores, and achievements per mission
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const LEADERBOARD_KEY = '@ww1_leaderboards';

// Score calculation weights
export const SCORE_WEIGHTS = {
  BASE_VICTORY: 1000,
  KILL_POINTS: 50,
  VETERAN_KILL_BONUS: 25,
  TANK_KILL_BONUS: 100,
  OFFICER_KILL_BONUS: 75,
  PERFECT_VICTORY_BONUS: 500,  // No units lost
  FAST_VICTORY_BONUS: 200,     // Under par turns
  HARD_MODE_MULTIPLIER: 1.5,
  ELITE_MODE_MULTIPLIER: 2.0,
  NO_DAMAGE_BONUS: 300,        // If any unit takes no damage
  OBJECTIVE_BONUS: 150,
};

// Par turns for each mission (expected completion time)
export const MISSION_PAR_TURNS = {
  1: 8,
  2: 10,
  3: 12,
  4: 10,
  5: 12,
  6: 14,
  7: 10,
  8: 12,
  9: 14,
  10: 12,
  11: 14,
  12: 12,
  13: 14,
  14: 16,
  15: 14,
  16: 12,
  17: 14,
  18: 16,
  19: 16,
  20: 18,
};

// Default empty leaderboard entry
const createEmptyLeaderboard = () => ({
  bestScore: 0,
  bestScoreDate: null,
  bestScoreFaction: null,
  bestScoreDifficulty: null,
  fastestVictory: null,  // Turns
  fastestVictoryDate: null,
  mostKills: 0,
  mostKillsDate: null,
  perfectVictories: 0,
  totalAttempts: 0,
  totalVictories: 0,
  history: [],  // Last 10 attempts
});

/**
 * Load all leaderboards from storage
 */
export async function loadLeaderboards() {
  try {
    const data = await AsyncStorage.getItem(LEADERBOARD_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('Error loading leaderboards:', error);
  }
  return {};
}

/**
 * Save leaderboards to storage
 */
export async function saveLeaderboards(leaderboards) {
  try {
    await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboards));
    return { success: true };
  } catch (error) {
    console.log('Error saving leaderboards:', error);
    return { success: false, error };
  }
}

/**
 * Calculate score for a mission completion
 */
export function calculateScore(battleStats, difficulty = 'normal') {
  let score = SCORE_WEIGHTS.BASE_VICTORY;

  // Kill points
  score += (battleStats.kills || 0) * SCORE_WEIGHTS.KILL_POINTS;

  // Bonus for tank kills
  score += (battleStats.tanksDestroyed || 0) * SCORE_WEIGHTS.TANK_KILL_BONUS;

  // Bonus for officer kills
  score += (battleStats.officersKilled || 0) * SCORE_WEIGHTS.OFFICER_KILL_BONUS;

  // Perfect victory bonus (no units lost)
  if (battleStats.unitsLost === 0) {
    score += SCORE_WEIGHTS.PERFECT_VICTORY_BONUS;
  }

  // Fast victory bonus
  const parTurns = MISSION_PAR_TURNS[battleStats.missionId] || 12;
  if (battleStats.turns && battleStats.turns < parTurns) {
    score += SCORE_WEIGHTS.FAST_VICTORY_BONUS;
    // Extra bonus for very fast victories
    const turnsUnderPar = parTurns - battleStats.turns;
    score += turnsUnderPar * 50;
  }

  // Objective bonus
  score += (battleStats.objectivesCaptured || 0) * SCORE_WEIGHTS.OBJECTIVE_BONUS;

  // Difficulty multiplier
  if (difficulty === 'hard') {
    score = Math.round(score * SCORE_WEIGHTS.HARD_MODE_MULTIPLIER);
  } else if (difficulty === 'elite') {
    score = Math.round(score * SCORE_WEIGHTS.ELITE_MODE_MULTIPLIER);
  }

  return score;
}

/**
 * Record a mission completion
 */
export async function recordMissionCompletion(missionId, battleStats, faction, difficulty = 'normal') {
  const leaderboards = await loadLeaderboards();

  // Get or create mission leaderboard
  const missionKey = `mission_${missionId}`;
  if (!leaderboards[missionKey]) {
    leaderboards[missionKey] = createEmptyLeaderboard();
  }

  const board = leaderboards[missionKey];
  const score = calculateScore({ ...battleStats, missionId }, difficulty);
  const timestamp = Date.now();

  // Create attempt record
  const attempt = {
    score,
    turns: battleStats.turns || 0,
    kills: battleStats.kills || 0,
    unitsLost: battleStats.unitsLost || 0,
    faction,
    difficulty,
    date: timestamp,
    isPerfect: battleStats.unitsLost === 0,
  };

  // Update statistics
  board.totalAttempts += 1;
  board.totalVictories += 1;

  // Check for new best score
  const newRecords = [];
  if (score > board.bestScore) {
    board.bestScore = score;
    board.bestScoreDate = timestamp;
    board.bestScoreFaction = faction;
    board.bestScoreDifficulty = difficulty;
    newRecords.push('bestScore');
  }

  // Check for fastest victory
  const turns = battleStats.turns || 0;
  if (board.fastestVictory === null || turns < board.fastestVictory) {
    board.fastestVictory = turns;
    board.fastestVictoryDate = timestamp;
    newRecords.push('fastestVictory');
  }

  // Check for most kills
  const kills = battleStats.kills || 0;
  if (kills > board.mostKills) {
    board.mostKills = kills;
    board.mostKillsDate = timestamp;
    newRecords.push('mostKills');
  }

  // Perfect victory
  if (battleStats.unitsLost === 0) {
    board.perfectVictories += 1;
  }

  // Add to history (keep last 10)
  board.history.unshift(attempt);
  if (board.history.length > 10) {
    board.history = board.history.slice(0, 10);
  }

  // Update global stats
  if (!leaderboards.global) {
    leaderboards.global = {
      totalScore: 0,
      totalVictories: 0,
      totalPerfectVictories: 0,
      totalKills: 0,
      highestScore: 0,
      highestScoreMission: null,
    };
  }

  leaderboards.global.totalScore += score;
  leaderboards.global.totalVictories += 1;
  leaderboards.global.totalKills += kills;
  if (battleStats.unitsLost === 0) {
    leaderboards.global.totalPerfectVictories += 1;
  }
  if (score > leaderboards.global.highestScore) {
    leaderboards.global.highestScore = score;
    leaderboards.global.highestScoreMission = missionId;
  }

  await saveLeaderboards(leaderboards);

  return {
    score,
    newRecords,
    missionBoard: board,
    globalStats: leaderboards.global,
  };
}

/**
 * Get leaderboard for a specific mission
 */
export async function getMissionLeaderboard(missionId) {
  const leaderboards = await loadLeaderboards();
  const missionKey = `mission_${missionId}`;
  return leaderboards[missionKey] || createEmptyLeaderboard();
}

/**
 * Get global statistics
 */
export async function getGlobalStats() {
  const leaderboards = await loadLeaderboards();
  return leaderboards.global || {
    totalScore: 0,
    totalVictories: 0,
    totalPerfectVictories: 0,
    totalKills: 0,
    highestScore: 0,
    highestScoreMission: null,
  };
}

/**
 * Get all mission leaderboards sorted by best score
 */
export async function getAllMissionLeaderboards() {
  const leaderboards = await loadLeaderboards();
  const missions = [];

  for (let i = 1; i <= 20; i++) {
    const missionKey = `mission_${i}`;
    const board = leaderboards[missionKey];
    if (board && board.bestScore > 0) {
      missions.push({
        missionId: i,
        ...board,
      });
    }
  }

  return missions.sort((a, b) => b.bestScore - a.bestScore);
}

/**
 * Get star rating for a score (1-3 stars)
 */
export function getStarRating(score, missionId) {
  // Base thresholds that scale with mission difficulty
  const missionMultiplier = 1 + (missionId - 1) * 0.05; // Later missions need higher scores
  const oneStarThreshold = Math.round(1000 * missionMultiplier);
  const twoStarThreshold = Math.round(1500 * missionMultiplier);
  const threeStarThreshold = Math.round(2000 * missionMultiplier);

  if (score >= threeStarThreshold) return 3;
  if (score >= twoStarThreshold) return 2;
  if (score >= oneStarThreshold) return 1;
  return 0;
}

/**
 * Format score with commas
 */
export function formatScore(score) {
  return score.toLocaleString();
}

/**
 * Get rank title based on total score
 */
export function getScoreRank(totalScore) {
  const ranks = [
    { min: 0, title: 'Private', icon: '🪖' },
    { min: 5000, title: 'Corporal', icon: '⚊' },
    { min: 15000, title: 'Sergeant', icon: '⚌' },
    { min: 30000, title: 'Lieutenant', icon: '⭐' },
    { min: 50000, title: 'Captain', icon: '⭐⭐' },
    { min: 75000, title: 'Major', icon: '🎖️' },
    { min: 100000, title: 'Colonel', icon: '🎖️⭐' },
    { min: 150000, title: 'Brigadier', icon: '🎖️⭐⭐' },
    { min: 200000, title: 'General', icon: '⚔️' },
    { min: 300000, title: 'Field Marshal', icon: '👑' },
  ];

  let currentRank = ranks[0];
  for (const rank of ranks) {
    if (totalScore >= rank.min) {
      currentRank = rank;
    }
  }

  // Calculate progress to next rank
  const nextRank = ranks[ranks.indexOf(currentRank) + 1];
  let progress = 1;
  if (nextRank) {
    const rangeStart = currentRank.min;
    const rangeEnd = nextRank.min;
    progress = (totalScore - rangeStart) / (rangeEnd - rangeStart);
  }

  return {
    ...currentRank,
    progress: Math.min(1, progress),
    nextRank: nextRank || null,
  };
}

/**
 * Reset leaderboards (for testing)
 */
export async function resetLeaderboards() {
  try {
    await AsyncStorage.removeItem(LEADERBOARD_KEY);
    return { success: true };
  } catch (error) {
    console.log('Error resetting leaderboards:', error);
    return { success: false, error };
  }
}

export default {
  SCORE_WEIGHTS,
  MISSION_PAR_TURNS,
  loadLeaderboards,
  saveLeaderboards,
  calculateScore,
  recordMissionCompletion,
  getMissionLeaderboard,
  getGlobalStats,
  getAllMissionLeaderboards,
  getStarRating,
  formatScore,
  getScoreRank,
  resetLeaderboards,
};
