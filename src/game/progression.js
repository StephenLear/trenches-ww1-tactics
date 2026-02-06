/**
 * WWI Tactical Game - Progression System
 * Handles soldier generation, ranking, unit initialization, and XP management
 */

// Rank definitions with XP thresholds and icons
const RANKS = {
  private: { name: 'Private', xpNeeded: 0, icon: '' },
  corporal: { name: 'Corporal', xpNeeded: 100, icon: '⚊' },
  sergeant: { name: 'Sergeant', xpNeeded: 250, icon: '⚌' }
};

// Soldier name data for random generation - by faction
const FACTION_NAMES = {
  british: {
    firstNames: [
      'William', 'James', 'Thomas', 'Edward', 'Henry', 'Arthur', 'George',
      'Albert', 'Frederick', 'Charles', 'John', 'Walter', 'Ernest', 'Harold'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Taylor', 'Wilson',
      'Davies', 'Evans', 'Thomas', 'Roberts', 'Walker', 'Wright', 'Thompson'
    ],
    hometowns: [
      'London', 'Manchester', 'Liverpool', 'Birmingham', 'Leeds', 'Sheffield',
      'Bristol', 'Newcastle', 'Nottingham', 'Glasgow', 'Edinburgh', 'Cardiff'
    ]
  },
  french: {
    firstNames: [
      'Pierre', 'Jean', 'Louis', 'Henri', 'François', 'Marcel', 'André',
      'René', 'Paul', 'Jacques', 'Georges', 'Charles', 'Émile', 'Auguste'
    ],
    lastNames: [
      'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit',
      'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel'
    ],
    hometowns: [
      'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille',
      'Nantes', 'Strasbourg', 'Nice', 'Rennes', 'Reims', 'Verdun'
    ]
  },
  german: {
    firstNames: [
      'Wilhelm', 'Friedrich', 'Heinrich', 'Karl', 'Hans', 'Otto', 'Franz',
      'Paul', 'Hermann', 'Ernst', 'Walter', 'Fritz', 'Ludwig', 'Rudolf'
    ],
    lastNames: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner',
      'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter'
    ],
    hometowns: [
      'Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart',
      'Dresden', 'Leipzig', 'Hanover', 'Nuremberg', 'Bremen', 'Essen'
    ]
  },
  american: {
    firstNames: [
      'John', 'William', 'James', 'Robert', 'Charles', 'George', 'Frank',
      'Joseph', 'Edward', 'Thomas', 'Henry', 'Walter', 'Harry', 'Albert'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis',
      'Wilson', 'Moore', 'Taylor', 'Anderson', 'Jackson', 'White', 'Harris'
    ],
    hometowns: [
      'New York', 'Chicago', 'Philadelphia', 'Boston', 'Detroit', 'Cleveland',
      'St. Louis', 'Baltimore', 'Pittsburgh', 'Los Angeles', 'San Francisco', 'Buffalo'
    ]
  }
};

// Default names (used as fallback)
const FIRST_NAMES = FACTION_NAMES.british.firstNames;
const LAST_NAMES = FACTION_NAMES.british.lastNames;
const HOMETOWNS = FACTION_NAMES.british.hometowns;

const BACKSTORIES = [
  'A factory worker before the war.',
  'Former schoolteacher who volunteered.',
  'Miner from the coalfields.',
  'Farm boy seeking adventure.',
  'City clerk who felt duty calling.',
  'Dockworker who signed up with brothers.',
  'University student who left studies.',
  'Mechanic fascinated by war machines.',
  'Cavalry officer from a military family.',
  'Medical student who joined to save lives.',
  'Sharpshooter from the countryside.',
  'Tank crew volunteer, eager for action.'
];

/**
 * Generate a random soldier with name, hometown, and backstory
 * @param {string} factionId - Faction identifier ('british', 'french', 'german', 'american')
 * @returns {Object} Soldier object with fullName, hometown, and backstory
 */
export function generateSoldier(factionId = 'british') {
  const factionData = FACTION_NAMES[factionId] || FACTION_NAMES.british;
  const firstNames = factionData.firstNames;
  const lastNames = factionData.lastNames;
  const hometowns = factionData.hometowns;

  return {
    fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    hometown: hometowns[Math.floor(Math.random() * hometowns.length)],
    backstory: BACKSTORIES[Math.floor(Math.random() * BACKSTORIES.length)]
  };
}

/**
 * Calculate rank based on experience points
 * @param {number} xp - Experience points earned by the soldier
 * @returns {string} Rank identifier ('private', 'corporal', 'sergeant')
 */
export function getRank(xp) {
  if (xp >= 250) return 'sergeant';
  if (xp >= 100) return 'corporal';
  return 'private';
}

/**
 * Get rank information including name and icon
 * @param {string} rankId - Rank identifier
 * @returns {Object|null} Rank object with name, xpNeeded, and icon, or null if invalid
 */
export function getRankInfo(rankId) {
  return RANKS[rankId] || null;
}

/**
 * Check if a soldier should be promoted based on XP
 * @param {number} currentXP - Current experience points
 * @param {number} newXP - New experience points after action
 * @returns {Object|null} Promotion object with oldRank and newRank, or null if no promotion
 */
export function checkPromotion(currentXP, newXP) {
  const oldRank = getRank(currentXP);
  const newRank = getRank(newXP);

  if (oldRank !== newRank) {
    return { oldRank, newRank };
  }
  return null;
}

/**
 * Initialize units for a mission, matching veterans to slots
 * @param {Array} missionUnits - Mission template units with type and team
 * @param {Array} veterans - Previously recruited/survived veterans
 * @param {Object} unitTypes - Unit type definitions (for base stats)
 * @param {Array} commanderPerks - Active commander perks
 * @param {Object} factionConfig - Faction configuration with unit modifiers
 * @param {string} difficulty - Mission difficulty level
 * @param {Object} difficultySettings - Difficulty configuration
 * @param {string} factionId - Faction identifier for name generation
 * @returns {Array} Initialized units with stats and optional veteran assignment
 */
export function initUnits(
  missionUnits,
  veterans = [],
  unitTypes = {},
  commanderPerks = [],
  factionConfig = { unitModifiers: {} },
  difficulty = 'normal',
  difficultySettings = {},
  factionId = 'british'
) {
  const assignedVeterans = new Set();

  return missionUnits.map(t => {
    const baseStats = unitTypes[t.type];
    if (!baseStats) return null;

    // Calculate perk bonuses
    let hpBonus = 0;
    if (commanderPerks.includes('veteran_corps')) {
      hpBonus = 1;
    }

    // Calculate faction bonuses for player units
    let factionHPBonus = 0;
    let factionAttackBonus = 0;
    let factionDefenseBonus = 0;
    let factionRangeBonus = 0;

    if (t.team === 'player') {
      const unitMods = factionConfig.unitModifiers[t.type] || {};
      factionHPBonus = unitMods.hp || 0;
      factionAttackBonus = unitMods.attack || 0;
      factionDefenseBonus = unitMods.defense || 0;
      factionRangeBonus = unitMods.range || 0;
    }

    const base = {
      ...t,
      // Base stats from unit type
      attack: baseStats.attack,
      defense: baseStats.defense,
      range: baseStats.range,
      move: baseStats.move,
      icon: baseStats.icon,
      name: baseStats.name,
      // Calculated HP with bonuses
      hp: baseStats.hp + hpBonus + factionHPBonus,
      maxHp: baseStats.hp + hpBonus + factionHPBonus,
      // State flags
      hasMoved: false,
      hasAttacked: false,
      hasMovedThisTurn: false,
      // Progression
      xp: 0,
      kills: 0,
      rank: 'private',
      // Bonuses
      bonusHP: 0,
      bonusAttack: factionAttackBonus,
      bonusDefense: factionDefenseBonus,
      bonusRange: factionRangeBonus,
      // Abilities and effects
      unlockedAbilities: baseStats.abilities || [],
      abilityCooldowns: {},
      statusEffects: [],
      turnsOnMountain: 0
    };

    // Handle enemy units with difficulty modifiers
    if (t.team === 'enemy') {
      const diffConfig = difficultySettings[difficulty];
      if (!diffConfig) return base;

      const enemyHPBonus = Math.floor(baseStats.hp * diffConfig.enemyHPMod);
      return {
        ...base,
        name: `Enemy ${baseStats.name} #${t.id}`,
        hp: base.hp + enemyHPBonus,
        maxHp: base.maxHp + enemyHPBonus,
        bonusAttack: diffConfig.enemyAttackMod,
        bonusDefense: diffConfig.enemyDefenseMod
      };
    }

    // Match veterans to player unit slots
    // First try exact templateId match (surviving veterans from previous missions)
    let vet = veterans.find(v => v.templateId === t.id && !assignedVeterans.has(v.id));

    // If no exact match, find any available veteran of this type (recruited veterans)
    if (!vet) {
      vet = veterans.find(v => v.type === t.type && !assignedVeterans.has(v.id));
    }

    if (vet) {
      assignedVeterans.add(vet.id);
      return {
        ...base,
        hp: baseStats.hp + (vet.bonusHP || 0) + hpBonus + factionHPBonus,
        maxHp: baseStats.hp + (vet.bonusHP || 0) + hpBonus + factionHPBonus,
        xp: vet.xp,
        kills: vet.kills,
        rank: vet.rank,
        bonusHP: (vet.bonusHP || 0),
        bonusAttack: (vet.bonusAttack || 0) + factionAttackBonus,
        bonusDefense: factionDefenseBonus,
        bonusRange: factionRangeBonus,
        veteranId: vet.id,
        templateId: t.id,
        name: vet.name,
        fullName: vet.fullName,
        hometown: vet.hometown,
        backstory: vet.backstory
      };
    }

    // Create new recruit with generated identity based on faction
    const soldier = generateSoldier(factionId);
    const startingRank = t.type === 'officer' ? 'corporal' : 'private';
    const startingXP = t.type === 'officer' ? 100 : 0;

    return {
      ...base,
      xp: startingXP,
      rank: startingRank,
      templateId: t.id,
      name: soldier.fullName,
      fullName: soldier.fullName,
      hometown: soldier.hometown,
      backstory: soldier.backstory
    };
  }).filter(u => u !== null);
}

/**
 * Calculate XP gained from an action
 * @param {number} baseXP - Base XP for the action
 * @param {boolean} isFlanking - Whether the attack was flanking
 * @param {boolean} isCriticalHit - Whether the attack was a critical hit
 * @returns {number} Total XP to award
 */
export function calculateXPGain(baseXP, isFlanking = false, isCriticalHit = false) {
  let totalXP = baseXP;

  if (isFlanking) totalXP += 15;
  if (isCriticalHit) totalXP += 10;

  return totalXP;
}

/**
 * Create a veteran from a surviving unit after a mission
 * @param {Object} unit - Unit object with stats and identity
 * @returns {Object} Veteran object with preserved stats and history
 */
export function createVeteran(unit) {
  return {
    id: unit.veteranId || `vet_${Date.now()}_${Math.random()}`,
    type: unit.type,
    name: unit.name || unit.fullName,
    fullName: unit.fullName,
    hometown: unit.hometown,
    backstory: unit.backstory,
    xp: unit.xp || 0,
    kills: unit.kills || 0,
    rank: getRank(unit.xp || 0),
    bonusHP: unit.bonusHP || 0,
    bonusAttack: unit.bonusAttack || 0,
    bonusDefense: unit.bonusDefense || 0,
    bonusRange: unit.bonusRange || 0,
    templateId: unit.templateId,
    missions: (unit.missions || 0) + 1,
    lastMissionId: unit.lastMissionId || null
  };
}

/**
 * Get all ranks in XP order
 * @returns {Array} Array of rank objects sorted by XP requirement
 */
export function getAllRanks() {
  return Object.entries(RANKS)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => a.xpNeeded - b.xpNeeded);
}

/**
 * Get XP needed to reach next rank
 * @param {number} currentXP - Current experience points
 * @returns {Object} Object with currentRank, nextRank, xpToNextRank
 */
export function getXPProgress(currentXP) {
  const currentRank = getRank(currentXP);
  const ranks = getAllRanks();
  const currentRankIndex = ranks.findIndex(r => r.id === currentRank);

  if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
    return {
      currentRank,
      nextRank: null,
      xpToNextRank: null,
      isMaxRank: true
    };
  }

  const nextRank = ranks[currentRankIndex + 1];
  const xpToNextRank = nextRank.xpNeeded - currentXP;

  return {
    currentRank,
    nextRank: nextRank.id,
    xpToNextRank,
    isMaxRank: false
  };
}

export default {
  generateSoldier,
  getRank,
  getRankInfo,
  checkPromotion,
  initUnits,
  calculateXPGain,
  createVeteran,
  getAllRanks,
  getXPProgress,
  RANKS,
  FIRST_NAMES,
  LAST_NAMES,
  HOMETOWNS,
  BACKSTORIES
};
