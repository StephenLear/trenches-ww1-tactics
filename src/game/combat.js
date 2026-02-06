// WW1 Tactical Game - Combat System
// Platform-agnostic combat functions for React Native port
// Extracted from wwi-tactical-game-phase7-complete.jsx

import { UNIT_TYPES, TERRAIN_TYPES, WEATHER_TYPES, TECH_TREE } from './constants.js';

/**
 * Calculate Manhattan distance between two points
 * Used for movement range calculations
 *
 * @param {number} x1 - First point x coordinate
 * @param {number} y1 - First point y coordinate
 * @param {number} x2 - Second point x coordinate
 * @param {number} y2 - Second point y coordinate
 * @returns {number} Manhattan distance between points
 *
 * @example
 * getDist(0, 0, 3, 4) // returns 7 (|0-3| + |0-4|)
 */
export function getDist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/**
 * Calculate Chebyshev distance (chessboard distance) between two points
 * Used for range checks in combat and adjacency detection
 *
 * @param {number} x1 - First point x coordinate
 * @param {number} y1 - First point y coordinate
 * @param {number} x2 - Second point x coordinate
 * @param {number} y2 - Second point y coordinate
 * @returns {number} Chebyshev distance between points
 *
 * @example
 * getChebyshevDist(0, 0, 3, 4) // returns 4 (max(|0-3|, |0-4|))
 */
export function getChebyshevDist(x1, y1, x2, y2) {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
}

/**
 * Calculate technology tree bonuses for a unit
 * Applies bonuses based on researched technologies and unit type
 *
 * @param {Object} unit - The unit to calculate bonuses for
 * @param {string} unit.type - Unit type (infantry, cavalry, artillery, etc.)
 * @param {Array<string>} researchedTech - Array of researched technology keys
 * @returns {Object} Bonuses object with following properties:
 *   - hp: {number} Max HP bonus
 *   - attack: {number} Attack damage bonus
 *   - defense: {number} Defense bonus
 *   - range: {number} Weapon range bonus
 *   - movement: {number} Movement range bonus
 *   - healBonus: {number} Healing effectiveness bonus
 *   - critBonus: {number} Critical hit chance bonus
 *   - armorPiercing: {number} Armor piercing bonus
 *   - chargeDamage: {number} Charge damage bonus
 *   - trenchDefense: {number} Defense bonus in trenches
 *   - combinedArms: {number} Bonus when near different unit types
 *
 * @example
 * const bonuses = getTechBonuses(unit, ['light_armor', 'rapid_fire']);
 * // { attack: 2, defense: 1, ... }
 */
export function getTechBonuses(unit, researchedTech) {
  let bonuses = {
    hp: 0,
    attack: 0,
    defense: 0,
    range: 0,
    movement: 0,
    healBonus: 0,
    critBonus: 0,
    armorPiercing: 0,
    chargeDamage: 0,
    trenchDefense: 0,
    combinedArms: 0
  };

  researchedTech.forEach(techKey => {
    const tech = TECH_TREE[techKey];
    if (!tech) return;

    const effect = tech.effect;

    // Unit-specific bonuses
    if (effect.unitType && unit.type === effect.unitType) {
      if (effect.stat === 'hp') bonuses.hp += effect.bonus;
      if (effect.stat === 'attack') bonuses.attack += effect.bonus;
      if (effect.stat === 'defense') bonuses.defense += effect.bonus;
      if (effect.stat === 'range') bonuses.range += effect.bonus;
      if (effect.stat === 'movement') bonuses.movement += effect.bonus;
      if (effect.stat === 'heal_bonus') bonuses.healBonus += effect.bonus;
      if (effect.critBonus) bonuses.critBonus += effect.critBonus;
      if (effect.armorPiercing) bonuses.armorPiercing += effect.armorPiercing;
      if (effect.stat === 'charge_damage') bonuses.chargeDamage += effect.bonus;
    }

    // Global bonuses
    if (effect.global) {
      if (effect.stat === 'trench_defense') bonuses.trenchDefense += effect.bonus;
      if (effect.stat === 'combined_arms') bonuses.combinedArms += effect.bonus;
    }
  });

  return bonuses;
}

/**
 * Execute attack between two units with all combat bonuses and modifiers
 * Calculates final damage considering:
 * - Base attack/defense stats
 * - Flanking bonus
 * - Terrain bonuses (high ground, trench defense)
 * - Status effects
 * - Technology bonuses
 * - Faction-specific bonuses
 * - Critical hits
 * - Armor reduction
 *
 * @param {Object} attacker - Attacking unit
 * @param {string} attacker.id - Unique unit identifier
 * @param {string} attacker.type - Unit type
 * @param {string} attacker.team - Team ('player' or 'enemy')
 * @param {number} attacker.x - Grid x coordinate
 * @param {number} attacker.y - Grid y coordinate
 * @param {number} attacker.xp - Experience points (for rank calculation)
 * @param {number} attacker.hp - Current health
 * @param {Array<string>} attacker.statusEffects - Active status effects
 * @param {Object} attacker.bonusAttack - Bonus attack value
 * @param {Object} defender - Defending unit
 * @param {string} defender.id - Unique unit identifier
 * @param {string} defender.type - Unit type
 * @param {string} defender.team - Team ('player' or 'enemy')
 * @param {number} defender.x - Grid x coordinate
 * @param {number} defender.y - Grid y coordinate
 * @param {number} defender.hp - Current health
 * @param {Array<string>} defender.statusEffects - Active status effects
 * @param {Object} defender.bonusDefense - Bonus defense value
 * @param {Array<Object>} units - All units on the battlefield
 * @param {Array<Object>} terrain - Terrain tiles with position and type
 * @param {string} selectedFaction - Player faction ('british', 'french', etc.)
 * @param {Array<string>} researchedTech - Array of researched technology keys
 *
 * @returns {Object} Combat result with properties:
 *   - damage: {number} Final damage dealt
 *   - criticalHit: {boolean} Whether attack was a critical hit
 *   - killed: {boolean} Whether defender was eliminated
 *   - isFlanking: {boolean} Whether flanking bonus was applied
 *   - xpGain: {number} XP gained by attacker
 *   - bonusXP: {number} Bonus XP from special conditions
 *
 * @example
 * const result = executeAttack(attacker, defender, {
 *   units, terrain, selectedFaction, researchedTech,
 *   checkFlanking, getTerrainInfo, getChebyshevDist,
 *   getTechBonuses
 * });
 * // { damage: 15, criticalHit: true, killed: false, xpGain: 40, ... }
 */
export function executeAttack(
  attacker,
  defender,
  {
    units,
    terrain,
    selectedFaction,
    researchedTech,
    checkFlanking,
    getTerrainInfo,
    currentWeather
  }
) {
  const attackerStats = UNIT_TYPES[attacker.type];
  const defenderStats = UNIT_TYPES[defender.type];

  if (!attackerStats || !defenderStats) {
    return {
      damage: 0,
      criticalHit: false,
      killed: false,
      isFlanking: false,
      xpGain: 0,
      bonusXP: 0,
      logMessage: 'Invalid unit stats'
    };
  }

  // ===== FLANKING BONUS =====
  const isFlanking = checkFlanking(attacker, defender);
  const flankBonus = isFlanking ? 1 : 0;

  // ===== TERRAIN BONUSES =====
  const attackerTerrain = getTerrainInfo(attacker.x, attacker.y);
  const defenderTerrain = getTerrainInfo(defender.x, defender.y);
  const highGroundBonus = (attackerTerrain?.attackBonus && !defenderTerrain?.attackBonus)
    ? attackerTerrain.attackBonus
    : 0;

  // ===== UNIT-SPECIFIC BONUSES =====
  // Machine gun vs cavalry bonus
  const mgVsCavalryBonus = (attackerStats.bonusVsCavalry && defenderStats.vulnerableToMG)
    ? attackerStats.bonusVsCavalry
    : 0;

  // ===== TECHNOLOGY BONUSES =====
  const attackerTechBonus = getTechBonuses(attacker, researchedTech);
  const defenderTechBonus = getTechBonuses(defender, researchedTech);

  // ===== CRITICAL HIT CALCULATION =====
  let criticalHit = false;
  const totalCritChance = (attackerStats.criticalChance || 0) + attackerTechBonus.critBonus;
  if (totalCritChance > 0 && Math.random() < totalCritChance) {
    criticalHit = true;
  }

  // Aimed shot status effect (50% critical)
  if (attacker.statusEffects?.includes('aimed_shot')) {
    criticalHit = Math.random() < 0.5;
  }

  // ===== DEFENSE CALCULATION =====
  let defBonus = defenderTerrain?.defenseBonus || 0;

  // Status effect bonuses
  if (defender.statusEffects?.includes('dug_in')) defBonus += 2;
  if (defender.statusEffects?.includes('armor_up')) defBonus += 2;

  // Exposed terrain overrides
  if (defenderTerrain?.exposed) defBonus = Math.min(defBonus, 0);

  // Tech tree trench defense
  if (defenderTerrain?.name === 'Trench') {
    defBonus += defenderTechBonus.trenchDefense;
  }

  // Faction bonuses - British trench defense
  if (defender.team === 'player' && selectedFaction === 'british' && defenderTerrain?.name === 'Trench') {
    defBonus += 1;
  }

  // ===== ARMOR CALCULATION =====
  const armorReduction = (defenderStats.armor || 0) - attackerTechBonus.armorPiercing;

  // ===== FACTION BONUSES =====
  // French offensive bonus (+1 when attacking)
  const frenchOffensiveBonus = (attacker.team === 'player' && selectedFaction === 'french') ? 1 : 0;

  // ===== COMBINED ARMS BONUS =====
  let combinedArmsBonus = 0;
  if (attacker.team === 'player' && attackerTechBonus.combinedArms > 0) {
    const adjacentAllies = units.filter(u =>
      u.team === 'player' && u.hp > 0 && u.id !== attacker.id &&
      u.type !== attacker.type &&
      getChebyshevDist(attacker.x, attacker.y, u.x, u.y) === 1
    );
    if (adjacentAllies.length > 0) combinedArmsBonus = attackerTechBonus.combinedArms;
  }

  // ===== FINAL DAMAGE CALCULATION =====
  const atkBonus = (attacker.bonusAttack || 0) + flankBonus + highGroundBonus + mgVsCavalryBonus
    + attackerTechBonus.attack + frenchOffensiveBonus + combinedArmsBonus;

  const hasFlankAbility = attacker.statusEffects?.includes('flank');
  const defenderBonusDefense = (defender.bonusDefense || 0) + defenderTechBonus.defense;
  const finalDefense = hasFlankAbility
    ? 0
    : Math.max(0, defenderStats.defense + defBonus + defenderBonusDefense);

  let damage = Math.max(1, (attackerStats.attack + atkBonus) - finalDefense - Math.max(0, armorReduction));

  // Critical hit doubles damage
  if (criticalHit) damage *= 2;

  // ===== UNIT ELIMINATION CHECK =====
  const killed = defender.hp - damage <= 0;

  // ===== EXPERIENCE CALCULATION =====
  const xpGain = killed ? 75 : 25;
  const bonusXP = (isFlanking ? 15 : 0) + (criticalHit ? 10 : 0);

  // ===== COMBAT LOG MESSAGE =====
  let logMessage = `${attacker.name} dealt ${damage} dmg`;
  if (criticalHit) logMessage += ' CRITICAL!';
  if (isFlanking) logMessage += ' (flank)';
  if (mgVsCavalryBonus) logMessage += ' (vs cavalry)';
  if (killed) logMessage += ' - Enemy eliminated!';

  return {
    damage,
    criticalHit,
    killed,
    isFlanking,
    mgVsCavalryBonus: mgVsCavalryBonus > 0,
    xpGain,
    bonusXP,
    logMessage,
    // Detailed breakdown for debugging
    breakdown: {
      baseAttack: attackerStats.attack,
      atkBonus,
      finalDefense,
      armorReduction,
      damage
    }
  };
}

/**
 * Calculate combined attack modifier from all sources
 * Helper function for attack bonus calculation
 *
 * @param {Object} attacker - Attacking unit
 * @param {Object} defender - Defending unit
 * @param {Object} terrain - Terrain data
 * @param {Object} options - Options object
 * @param {boolean} options.isFlanking - Whether flanking applies
 * @param {Object} options.attackerTerrain - Terrain at attacker position
 * @param {Object} options.defenderTerrain - Terrain at defender position
 * @param {number} options.mgVsCavalryBonus - Bonus from MG vs cavalry matchup
 * @param {Object} options.techBonus - Tech tree bonuses
 * @param {string} options.selectedFaction - Player faction
 * @param {Array} options.adjacentAllies - Nearby friendly units
 *
 * @returns {number} Total attack modifier
 *
 * @internal Used by executeAttack
 */
export function calculateAttackModifier(attacker, defender, {
  isFlanking,
  attackerTerrain,
  defenderTerrain,
  mgVsCavalryBonus,
  techBonus,
  selectedFaction,
  adjacentAllies
}) {
  let modifier = 0;

  if (isFlanking) modifier += 1;

  if (attackerTerrain?.attackBonus && !defenderTerrain?.attackBonus) {
    modifier += attackerTerrain.attackBonus;
  }

  if (mgVsCavalryBonus) modifier += mgVsCavalryBonus;

  modifier += techBonus.attack || 0;

  if (attacker.team === 'player' && selectedFaction === 'french') {
    modifier += 1;
  }

  if (attacker.team === 'player' && techBonus.combinedArms > 0 && adjacentAllies.length > 0) {
    modifier += techBonus.combinedArms;
  }

  return modifier;
}

/**
 * Calculate combined defense modifier from all sources
 * Helper function for defense bonus calculation
 *
 * @param {Object} defender - Defending unit
 * @param {Object} defenderTerrain - Terrain at defender position
 * @param {Object} options - Options object
 * @param {Object} options.techBonus - Tech tree bonuses
 * @param {string} options.selectedFaction - Player faction
 * @param {boolean} options.hasFlankAbility - Whether flank ability negates defense
 *
 * @returns {number} Total defense value
 *
 * @internal Used by executeAttack
 */
export function calculateDefense(defender, defenderTerrain, {
  techBonus,
  selectedFaction,
  hasFlankAbility
}) {
  if (hasFlankAbility) return 0;

  const baseDefense = UNIT_TYPES[defender.type]?.defense || 0;
  let modifier = defenderTerrain?.defenseBonus || 0;

  if (defender.statusEffects?.includes('dug_in')) modifier += 2;
  if (defender.statusEffects?.includes('armor_up')) modifier += 2;
  if (defenderTerrain?.exposed) modifier = Math.min(modifier, 0);

  if (defenderTerrain?.name === 'Trench') {
    modifier += techBonus.trenchDefense || 0;
  }

  if (defender.team === 'player' && selectedFaction === 'british' && defenderTerrain?.name === 'Trench') {
    modifier += 1;
  }

  const bonusDefense = (defender.bonusDefense || 0) + (techBonus.defense || 0);

  return Math.max(0, baseDefense + modifier + bonusDefense);
}

/**
 * Determine if an attack can hit a target based on range and weather
 * Considers Chebyshev distance for range checks
 *
 * @param {Object} attacker - Attacking unit
 * @param {Object} target - Target unit
 * @param {number} unitRange - Unit's attack range
 * @param {number} minRange - Unit's minimum attack range (default: 0)
 * @param {Object} options - Options object
 * @param {string} options.currentWeather - Current weather type
 * @param {Array} options.visibleEnemies - List of visible enemy IDs
 * @param {Array} options.smokeZones - Smoke effect locations
 *
 * @returns {boolean} True if attack can hit target
 *
 * @example
 * canAttackTarget(attacker, target, 5, 0, { currentWeather: 'clear', ... });
 */
export function canAttackTarget(attacker, target, unitRange, minRange = 0, {
  currentWeather,
  visibleEnemies,
  smokeZones
}) {
  // Check visibility in fog
  if (currentWeather === 'fog' && !visibleEnemies.includes(target.id) && attacker.team === 'player') {
    return false;
  }

  // Check smoke zones
  if (smokeZones.some(s => s.x === target.x && s.y === target.y)) {
    return false;
  }

  const distance = getChebyshevDist(attacker.x, attacker.y, target.x, target.y);
  return distance <= unitRange && distance >= minRange;
}

/**
 * Check if an attacker is flanking a defender
 * Flanking occurs when the attacker is behind the defender relative to other enemies
 */
export function checkFlanking(attacker, defender, units) {
  const alliedUnits = units.filter(u =>
    u.team === attacker.team &&
    u.id !== attacker.id &&
    u.hp > 0 &&
    getChebyshevDist(u.x, u.y, defender.x, defender.y) <= 2
  );

  if (alliedUnits.length === 0) return false;

  for (const ally of alliedUnits) {
    const allyDx = ally.x - defender.x;
    const allyDy = ally.y - defender.y;
    const attackerDx = attacker.x - defender.x;
    const attackerDy = attacker.y - defender.y;

    if ((allyDx * attackerDx < 0) || (allyDy * attackerDy < 0)) {
      return true;
    }
  }
  return false;
}

/**
 * Get terrain info at a position
 */
export function getTerrainAt(x, y, terrain) {
  const tile = terrain.find(t => t.x === x && t.y === y);
  if (!tile) return null;
  return TERRAIN_TYPES[tile.type] || null;
}

/**
 * Simplified attack execution for BattleScreen
 */
export function performAttack(attacker, defender, units, terrain, weather, factionConfig = {}, researchedTech = [], addLog = () => {}) {
  const attackerStats = UNIT_TYPES[attacker.type];
  const defenderStats = UNIT_TYPES[defender.type];

  if (!attackerStats || !defenderStats) {
    addLog('Invalid attack - missing unit stats');
    return { success: false, updatedUnits: units, attackerXPGain: 0 };
  }

  // Check flanking
  const isFlanking = checkFlanking(attacker, defender, units);
  const flankBonus = isFlanking ? 1 : 0;

  // Get terrain bonuses
  const defenderTerrain = getTerrainAt(defender.x, defender.y, terrain);

  // Defense calculation
  let defBonus = defenderTerrain?.defenseBonus || 0;
  if (defender.statusEffects?.includes('dug_in')) defBonus += 2;

  // Machine gun vs cavalry
  const mgVsCavalryBonus = (attackerStats.bonusVsCavalry && defenderStats.vulnerableToMG)
    ? attackerStats.bonusVsCavalry : 0;

  // Critical hit
  const critChance = attackerStats.criticalChance || 0;
  const criticalHit = Math.random() < critChance;

  // Calculate damage
  const totalAttack = attackerStats.attack + (attacker.bonusAttack || 0) + flankBonus + mgVsCavalryBonus;
  const totalDefense = Math.max(0, defenderStats.defense + defBonus + (defender.bonusDefense || 0));

  // Tank armor reduces damage further
  const armorReduction = defenderStats.armor || 0;

  let damage = Math.max(1, totalAttack - totalDefense - armorReduction);
  if (criticalHit) damage *= 2;

  // Apply damage
  const newDefenderHP = Math.max(0, defender.hp - damage);
  const killed = newDefenderHP <= 0;

  // XP calculation
  const xpGain = killed ? 75 : 25;
  const bonusXP = (isFlanking ? 15 : 0) + (criticalHit ? 10 : 0);
  const totalXP = xpGain + bonusXP;

  // Log message
  let logMsg = `${attacker.fullName || attacker.type} dealt ${damage} damage`;
  if (criticalHit) logMsg += ' CRITICAL!';
  if (isFlanking) logMsg += ' (flanking)';
  if (killed) logMsg += ' - ELIMINATED!';
  addLog(logMsg);

  // Update units array
  const updatedUnits = units.map(u => {
    if (u.id === attacker.id) {
      return {
        ...u,
        hasAttacked: true,
        xp: (u.xp || 0) + totalXP,
        kills: killed ? (u.kills || 0) + 1 : (u.kills || 0)
      };
    }
    if (u.id === defender.id) {
      return { ...u, hp: newDefenderHP };
    }
    return u;
  });

  return {
    success: true,
    updatedUnits,
    attackerXPGain: totalXP,
    damage,
    killed,
    criticalHit,
    isFlanking
  };
}
