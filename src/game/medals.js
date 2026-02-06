/**
 * WWI Tactical Game - Medal/Achievement System
 * Authentic WW1 medals from British, French, German, and American armies
 */

// ============================================================================
// MEDAL DEFINITIONS
// ============================================================================

export const MEDALS = {
  // Campaign Progress Medals
  first_blood: {
    id: 'first_blood',
    name: 'Baptism of Fire',
    icon: '🔥',
    description: 'Complete your first mission',
    rarity: 'common',
    category: 'campaign',
    check: (stats) => stats.missionsCompleted >= 1,
  },

  veteran_commander: {
    id: 'veteran_commander',
    name: 'Veteran Commander',
    icon: '⭐',
    description: 'Complete 5 missions',
    rarity: 'uncommon',
    category: 'campaign',
    check: (stats) => stats.missionsCompleted >= 5,
  },

  war_hero: {
    id: 'war_hero',
    name: 'War Hero',
    icon: '🏅',
    description: 'Complete 10 missions',
    rarity: 'rare',
    category: 'campaign',
    check: (stats) => stats.missionsCompleted >= 10,
  },

  armistice: {
    id: 'armistice',
    name: 'Armistice Day',
    icon: '🕊️',
    description: 'Complete all 20 campaign missions',
    rarity: 'legendary',
    category: 'campaign',
    check: (stats) => stats.missionsCompleted >= 20,
  },

  // Faction Medals (Based on real WW1 medals)
  victoria_cross: {
    id: 'victoria_cross',
    name: 'Victoria Cross',
    icon: '🎖️',
    description: 'Win 5 battles as British Empire',
    rarity: 'epic',
    category: 'faction',
    historicalNote: 'The highest British military decoration for valor',
    check: (stats) => stats.britishWins >= 5,
  },

  croix_de_guerre: {
    id: 'croix_de_guerre',
    name: 'Croix de Guerre',
    icon: '✝️',
    description: 'Win 5 battles as French Republic',
    rarity: 'epic',
    category: 'faction',
    historicalNote: 'French military decoration for acts of heroism',
    check: (stats) => stats.frenchWins >= 5,
  },

  iron_cross: {
    id: 'iron_cross',
    name: 'Iron Cross',
    icon: '✠',
    description: 'Win 5 battles as German Empire',
    rarity: 'epic',
    category: 'faction',
    historicalNote: 'Prussian/German military decoration since 1813',
    check: (stats) => stats.germanWins >= 5,
  },

  medal_of_honor: {
    id: 'medal_of_honor',
    name: 'Medal of Honor',
    icon: '🗽',
    description: 'Win 5 battles as United States',
    rarity: 'epic',
    category: 'faction',
    historicalNote: 'Highest US military decoration',
    check: (stats) => stats.americanWins >= 5,
  },

  // Combat Medals
  sharpshooter: {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    icon: '🎯',
    description: 'Achieve 50 total kills',
    rarity: 'uncommon',
    category: 'combat',
    check: (stats) => stats.totalKills >= 50,
  },

  ace: {
    id: 'ace',
    name: 'Ace',
    icon: '♠️',
    description: 'Achieve 100 total kills',
    rarity: 'rare',
    category: 'combat',
    check: (stats) => stats.totalKills >= 100,
  },

  tank_destroyer: {
    id: 'tank_destroyer',
    name: 'Tank Destroyer',
    icon: '💥',
    description: 'Destroy 10 enemy tanks',
    rarity: 'rare',
    category: 'combat',
    check: (stats) => stats.tanksDestroyed >= 10,
  },

  cavalry_charge: {
    id: 'cavalry_charge',
    name: 'Last Cavalier',
    icon: '🐴',
    description: 'Win a mission using only cavalry',
    rarity: 'epic',
    category: 'combat',
    check: (stats) => stats.cavalryOnlyWins >= 1,
  },

  trench_clearer: {
    id: 'trench_clearer',
    name: 'Trench Clearer',
    icon: '🪖',
    description: 'Eliminate 5 enemies in a single turn',
    rarity: 'rare',
    category: 'combat',
    check: (stats) => stats.maxKillsInTurn >= 5,
  },

  // Survival Medals
  no_casualties: {
    id: 'no_casualties',
    name: 'Perfect Victory',
    icon: '🛡️',
    description: 'Complete a mission with no casualties',
    rarity: 'rare',
    category: 'survival',
    check: (stats) => stats.perfectVictories >= 1,
  },

  iron_will: {
    id: 'iron_will',
    name: 'Iron Will',
    icon: '💪',
    description: 'Complete 5 missions with no casualties',
    rarity: 'epic',
    category: 'survival',
    check: (stats) => stats.perfectVictories >= 5,
  },

  survivor: {
    id: 'survivor',
    name: 'Survivor',
    icon: '🩹',
    description: 'Win a battle with only 1 unit remaining',
    rarity: 'uncommon',
    category: 'survival',
    check: (stats) => stats.clutchVictories >= 1,
  },

  // Veteran Medals
  band_of_brothers: {
    id: 'band_of_brothers',
    name: 'Band of Brothers',
    icon: '👥',
    description: 'Have 5 veterans in your roster',
    rarity: 'uncommon',
    category: 'veteran',
    check: (stats) => stats.totalVeterans >= 5,
  },

  old_guard: {
    id: 'old_guard',
    name: 'Old Guard',
    icon: '🏛️',
    description: 'Have 10 veterans in your roster',
    rarity: 'rare',
    category: 'veteran',
    check: (stats) => stats.totalVeterans >= 10,
  },

  sergeant_major: {
    id: 'sergeant_major',
    name: 'Sergeant Major',
    icon: '⚌',
    description: 'Promote a veteran to Sergeant rank',
    rarity: 'uncommon',
    category: 'veteran',
    check: (stats) => stats.maxVeteranRank >= 3,
  },

  // Special Medals
  pip_squeak_wilfred: {
    id: 'pip_squeak_wilfred',
    name: 'Pip, Squeak & Wilfred',
    icon: '🎗️',
    description: 'Unlock all war diary entries',
    rarity: 'legendary',
    category: 'special',
    historicalNote: 'Nickname for the trio of British WW1 campaign medals',
    check: (stats) => stats.diaryEntriesUnlocked >= 20,
  },

  over_the_top: {
    id: 'over_the_top',
    name: 'Over The Top',
    icon: '⚔️',
    description: 'Win 10 missions on Hard or Elite difficulty',
    rarity: 'epic',
    category: 'special',
    check: (stats) => stats.hardModeWins >= 10,
  },

  blitzkrieg: {
    id: 'blitzkrieg',
    name: 'Lightning War',
    icon: '⚡',
    description: 'Complete a mission in 5 turns or less',
    rarity: 'rare',
    category: 'special',
    check: (stats) => stats.fastestVictory <= 5 && stats.fastestVictory > 0,
  },

  historian: {
    id: 'historian',
    name: 'Historian',
    icon: '📜',
    description: 'Read all historical facts',
    rarity: 'rare',
    category: 'special',
    check: (stats) => stats.factsRead >= 20,
  },
};

// ============================================================================
// RARITY COLORS
// ============================================================================

export const MEDAL_RARITIES = {
  common: {
    name: 'Common',
    color: '#9CA3AF',
    bgColor: 'rgba(156, 163, 175, 0.2)',
  },
  uncommon: {
    name: 'Uncommon',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.2)',
  },
  rare: {
    name: 'Rare',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.2)',
  },
  epic: {
    name: 'Epic',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.2)',
  },
  legendary: {
    name: 'Legendary',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.2)',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get default stats object for tracking medal progress
 */
export function getDefaultMedalStats() {
  return {
    missionsCompleted: 0,
    totalKills: 0,
    tanksDestroyed: 0,
    perfectVictories: 0,
    clutchVictories: 0,
    cavalryOnlyWins: 0,
    maxKillsInTurn: 0,
    totalVeterans: 0,
    maxVeteranRank: 0,
    britishWins: 0,
    frenchWins: 0,
    germanWins: 0,
    americanWins: 0,
    hardModeWins: 0,
    fastestVictory: 0,
    diaryEntriesUnlocked: 0,
    factsRead: 0,
    skirmishWins: 0,
  };
}

/**
 * Check all medals and return list of unlocked medal IDs
 */
export function getUnlockedMedals(stats) {
  const unlocked = [];

  Object.values(MEDALS).forEach(medal => {
    if (medal.check(stats)) {
      unlocked.push(medal.id);
    }
  });

  return unlocked;
}

/**
 * Check for newly unlocked medals
 */
export function checkNewMedals(oldStats, newStats) {
  const oldUnlocked = getUnlockedMedals(oldStats);
  const newUnlocked = getUnlockedMedals(newStats);

  // Find medals that are in newUnlocked but not in oldUnlocked
  const newMedals = newUnlocked.filter(id => !oldUnlocked.includes(id));

  return newMedals.map(id => MEDALS[id]);
}

/**
 * Get medals by category
 */
export function getMedalsByCategory(category) {
  return Object.values(MEDALS).filter(medal => medal.category === category);
}

/**
 * Get progress towards a medal (0-100%)
 */
export function getMedalProgress(medalId, stats) {
  const medal = MEDALS[medalId];
  if (!medal) return 0;

  // Define thresholds for progress calculation
  const progressThresholds = {
    first_blood: { stat: 'missionsCompleted', target: 1 },
    veteran_commander: { stat: 'missionsCompleted', target: 5 },
    war_hero: { stat: 'missionsCompleted', target: 10 },
    armistice: { stat: 'missionsCompleted', target: 20 },
    victoria_cross: { stat: 'britishWins', target: 5 },
    croix_de_guerre: { stat: 'frenchWins', target: 5 },
    iron_cross: { stat: 'germanWins', target: 5 },
    medal_of_honor: { stat: 'americanWins', target: 5 },
    sharpshooter: { stat: 'totalKills', target: 50 },
    ace: { stat: 'totalKills', target: 100 },
    tank_destroyer: { stat: 'tanksDestroyed', target: 10 },
    cavalry_charge: { stat: 'cavalryOnlyWins', target: 1 },
    trench_clearer: { stat: 'maxKillsInTurn', target: 5 },
    no_casualties: { stat: 'perfectVictories', target: 1 },
    iron_will: { stat: 'perfectVictories', target: 5 },
    survivor: { stat: 'clutchVictories', target: 1 },
    band_of_brothers: { stat: 'totalVeterans', target: 5 },
    old_guard: { stat: 'totalVeterans', target: 10 },
    sergeant_major: { stat: 'maxVeteranRank', target: 3 },
    pip_squeak_wilfred: { stat: 'diaryEntriesUnlocked', target: 20 },
    over_the_top: { stat: 'hardModeWins', target: 10 },
    blitzkrieg: { stat: 'fastestVictory', target: 5, inverse: true },
    historian: { stat: 'factsRead', target: 20 },
  };

  const threshold = progressThresholds[medalId];
  if (!threshold) return medal.check(stats) ? 100 : 0;

  const current = stats[threshold.stat] || 0;

  // For inverse stats (lower is better), calculate differently
  if (threshold.inverse) {
    if (current === 0) return 0;
    if (current <= threshold.target) return 100;
    return Math.max(0, 100 - ((current - threshold.target) / threshold.target * 100));
  }

  return Math.min(100, (current / threshold.target) * 100);
}

/**
 * Get total medal count
 */
export function getTotalMedalCount() {
  return Object.keys(MEDALS).length;
}

export default {
  MEDALS,
  MEDAL_RARITIES,
  getDefaultMedalStats,
  getUnlockedMedals,
  checkNewMedals,
  getMedalsByCategory,
  getMedalProgress,
  getTotalMedalCount,
};
