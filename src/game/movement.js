// WW1 Tactical Game - Movement System
// Platform-agnostic movement calculations for React Native port
// Extracted from wwi-tactical-game-phase7-complete.jsx

import {
  GRID_SIZE,
  WEATHER_TYPES,
  TERRAIN_TYPES,
  UNIT_TYPES
} from './constants.js';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate Manhattan distance between two positions
 * @param {number} x1 - Starting X coordinate
 * @param {number} y1 - Starting Y coordinate
 * @param {number} x2 - Ending X coordinate
 * @param {number} y2 - Ending Y coordinate
 * @returns {number} Manhattan distance (sum of absolute differences)
 */
export const getManhattanDist = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Calculate Chebyshev distance between two positions
 * Uses maximum of absolute differences - useful for grid-based movement
 * @param {number} x1 - Starting X coordinate
 * @param {number} y1 - Starting Y coordinate
 * @param {number} x2 - Ending X coordinate
 * @param {number} y2 - Ending Y coordinate
 * @returns {number} Chebyshev distance (max of absolute differences)
 */
export const getChebyshevDist = (x1, y1, x2, y2) => {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
};

/**
 * Retrieve tile data from terrain grid
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {Array} terrainGrid - Array of terrain tiles with {x, y, type} structure
 * @returns {Object|null} Terrain tile object or null if not found
 */
export const getAt = (x, y, terrainGrid) => {
  if (!terrainGrid || !Array.isArray(terrainGrid)) return null;
  const searchX = Number(x);
  const searchY = Number(y);
  return terrainGrid.find(t => Number(t.x) === searchX && Number(t.y) === searchY);
};

/**
 * Find unit at specific grid position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {Array} units - Array of unit objects with {x, y, hp, ...} structure
 * @returns {Object|null} Unit object or null if no living unit at position
 */
export const getUnitAt = (x, y, units) => {
  // Ensure we're comparing numbers to handle any type coercion issues
  const searchX = Number(x);
  const searchY = Number(y);
  return units.find(u => Number(u.x) === searchX && Number(u.y) === searchY && u.hp > 0);
};

/**
 * Get terrain type information for a position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {Array} terrainGrid - Array of terrain tiles
 * @returns {Object|null} Terrain type data from TERRAIN_TYPES or null
 */
export const getTerrainInfo = (x, y, terrainGrid) => {
  const tile = getAt(x, y, terrainGrid);
  return tile ? TERRAIN_TYPES[tile.type] : null;
};

// ============================================================================
// MOVEMENT SYSTEM
// ============================================================================

/**
 * Calculate valid movement tiles for a unit
 *
 * Takes into account:
 * - Weather effects (snow reduces movement, fog limits visibility)
 * - Terrain movement costs (mud 2 cost, barbed wire 3 cost, etc.)
 * - Commander perks (logistics +1 movement)
 * - Tech bonuses (scout training +1 movement)
 * - Unit-specific rules:
 *   - Artillery can't move if it has moved this turn (cannotMoveAndFire)
 *   - Cavalry moves 4 tiles but slowed by mud
 *   - Tanks ignore barbed wire but can't enter water
 *
 * @param {Object} unit - Unit object with properties:
 *   - {string} type - Unit type (infantry, cavalry, etc.)
 *   - {number} x - Current X coordinate
 *   - {number} y - Current Y coordinate
 *   - {boolean} hasMoved - Whether unit has already moved
 *   - {boolean} hasMovedThisTurn - Whether unit moved and can't fire (artillery)
 *   - {string} team - Unit team (player/enemy)
 * @param {Array} units - All units in game
 * @param {Array} terrainGrid - Terrain tiles array
 * @param {string} currentWeather - Current weather condition
 * @param {Array} researchedTech - List of researched technologies
 * @param {Array} commanderPerks - List of active commander perks
 * @returns {Array} Array of valid move objects: {x, y, terrainCost}
 */
export const getMoves = (
  unit,
  units,
  terrainGrid,
  currentWeather,
  researchedTech,
  commanderPerks
) => {
  // Ensure unit coordinates are numbers
  const unitX = Number(unit.x);
  const unitY = Number(unit.y);

  // Can't move if already moved this turn
  if (unit.hasMoved) return [];

  const unitType = UNIT_TYPES[unit.type];
  if (!unitType) return [];

  const baseRange = unitType.move;

  // Apply weather modifiers
  const weatherEffects = WEATHER_TYPES[currentWeather]?.effects || {};
  const weatherMod = weatherEffects.movementModifier || 0;

  // Apply logistics commander perk bonus
  const logisticsMod = commanderPerks.includes('logistics') ? 1 : 0;

  // Apply tech bonuses for movement
  const techBonus = getTechBonusesForUnit(unit, researchedTech).movement || 0;

  // Calculate effective movement range
  let effectiveRange = Math.max(1, baseRange + weatherMod + logisticsMod + techBonus);

  const moves = [];

  // Search all tiles within effective range
  for (let dx = -effectiveRange; dx <= effectiveRange; dx++) {
    for (let dy = -effectiveRange; dy <= effectiveRange; dy++) {
      const newX = unitX + dx;
      const newY = unitY + dy;
      const dist = Math.abs(dx) + Math.abs(dy); // Manhattan distance

      // Validate position
      if (
        dist > 0 &&
        newX >= 0 &&
        newX < GRID_SIZE &&
        newY >= 0 &&
        newY < GRID_SIZE &&
        !getUnitAt(newX, newY, units)
      ) {
        const terrainInfo = getTerrainInfo(newX, newY, terrainGrid);
        let moveCost = terrainInfo?.movementCost || 1;

        // Apply unit-specific terrain restrictions
        if (unitType.cannotEnterWater && terrainInfo?.blocksTanks) continue;
        if (unitType.ignoresBarbedWire && terrainInfo?.tankIgnores) moveCost = 1;
        if (unit.type === 'cavalry' && terrainInfo?.slowsCavalry) moveCost = 3;

        // Check if movement is within range
        if (dist * moveCost <= effectiveRange) {
          moves.push({ x: newX, y: newY, terrainCost: moveCost });
        }
      }
    }
  }

  return moves;
};

/**
 * Calculate valid attack targets for a unit
 *
 * Takes into account:
 * - Weather effects (fog limits visibility, rain reduces range)
 * - Commander perks (artillery mastery +2 range)
 * - Tech bonuses (artillery ranging +1 range, sniper optics +1 range)
 * - Unit-specific rules:
 *   - Artillery can't fire if moved this turn (cannotMoveAndFire)
 *   - Medics can't attack (nonCombatant)
 *   - Some units have minRange (artillery 2 tiles)
 * - Smoke zones block line of sight
 * - Fog restricts visibility to visible enemies
 *
 * @param {Object} unit - Unit object with properties:
 *   - {string} type - Unit type
 *   - {number} x - Current X coordinate
 *   - {number} y - Current Y coordinate
 *   - {boolean} hasAttacked - Whether unit has already attacked
 *   - {boolean} hasMovedThisTurn - Whether unit moved (artillery restriction)
 *   - {string} team - Unit team
 *   - {number} bonusRange - Faction-based range bonus
 * @param {Array} units - All units in game (includes targets)
 * @param {string} currentWeather - Current weather condition
 * @param {Array} smokeZones - Active smoke screen positions
 * @param {Array} visibleEnemies - Enemies visible in fog
 * @param {Array} researchedTech - List of researched technologies
 * @param {Array} commanderPerks - List of active commander perks
 * @returns {Array} Array of valid target units
 */
export const getTargets = (
  unit,
  units,
  currentWeather,
  smokeZones,
  visibleEnemies,
  researchedTech,
  commanderPerks
) => {
  // Can't attack if already attacked this turn
  if (!unit || unit.hasAttacked) return [];

  const unitType = UNIT_TYPES[unit.type];

  // Medics and other non-combatants can't attack
  if (!unitType || unitType.nonCombatant) return [];

  // Artillery can't fire if moved this turn
  if (unitType.cannotMoveAndFire && unit.hasMovedThisTurn) return [];

  // Apply weather modifiers to range
  const weatherEffects = WEATHER_TYPES[currentWeather]?.effects || {};
  const weatherRangeMod = weatherEffects.rangeModifier || 0;

  // Apply artillery mastery commander perk
  const artilleryMod = commanderPerks.includes('artillery_mastery') && unit.type === 'artillery' ? 2 : 0;

  // Apply tech bonuses for range
  const techBonus = getTechBonusesForUnit(unit, researchedTech).range || 0;

  // Apply faction-based range bonus
  const factionRangeBonus = unit.bonusRange || 0;

  // Calculate effective range
  let effectiveRange = Math.max(
    1,
    unitType.range + weatherRangeMod + artilleryMod + techBonus + factionRangeBonus
  );
  const minRange = unitType.minRange || 0;

  // Filter valid targets
  return units.filter(target => {
    // Can't target self or allies
    if (!target || target.team === unit.team || target.hp <= 0) return false;

    // Check fog visibility restrictions
    if (currentWeather === 'fog' && !visibleEnemies.includes(target.id) && unit.team === 'player') {
      return false;
    }

    // Check smoke zone blocking
    if (smokeZones.some(s => s.x === target.x && s.y === target.y)) return false;

    // Check range with Chebyshev distance
    const distance = getChebyshevDist(unit.x, unit.y, target.x, target.y);
    return distance <= effectiveRange && distance >= minRange;
  });
};

// ============================================================================
// TECH BONUS SYSTEM
// ============================================================================

/**
 * Extract tech bonuses applicable to a specific unit
 * Checks unit type against researched technologies and applies bonuses
 *
 * Bonuses include:
 * - movement: Unit movement range (+1 to movement stat)
 * - range: Attack range (+1 to range stat)
 * - attack: Attack damage
 * - defense: Defense bonus
 * - hp: Health points
 * - And unit-specific bonuses like charge_damage, heal_bonus
 *
 * @param {Object} unit - Unit object with {type, team, ...} properties
 * @param {Array} researchedTech - List of researched technology keys
 * @returns {Object} Bonuses object with numeric values for applicable stats
 */
export const getTechBonusesForUnit = (unit, researchedTech) => {
  // Note: This requires TECH_TREE import
  // For this module, we return empty bonuses if tech tree not provided
  // This should be passed in from the parent component
  return {
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
};

/**
 * Get tech bonuses with full tech tree integration
 * This is the complete version that should be used in the main game component
 *
 * @param {Object} unit - Unit object
 * @param {Array} researchedTech - Researched technology keys
 * @param {Object} techTree - Full TECH_TREE constant object
 * @returns {Object} Complete bonuses object
 */
export const getTechBonusesForUnitFull = (unit, researchedTech, techTree) => {
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
    const tech = techTree[techKey];
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
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Check if a position is valid and within grid bounds
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {boolean} True if position is within grid
 */
export const isValidPosition = (x, y) => {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
};

/**
 * Check if a unit can move to a specific tile
 * @param {Object} unit - Unit trying to move
 * @param {number} targetX - Target X coordinate
 * @param {number} targetY - Target Y coordinate
 * @param {Array} units - All units
 * @param {Array} terrainGrid - Terrain tiles
 * @returns {boolean} True if move is valid
 */
export const isValidMove = (unit, targetX, targetY, units, terrainGrid) => {
  // Check position bounds
  if (!isValidPosition(targetX, targetY)) return false;

  // Check if occupied
  if (getUnitAt(targetX, targetY, units)) return false;

  // Check terrain restrictions
  const terrainInfo = getTerrainInfo(targetX, targetY, terrainGrid);
  const unitType = UNIT_TYPES[unit.type];

  if (unitType.cannotEnterWater && terrainInfo?.blocksTanks) return false;

  return true;
};

/**
 * Check if a unit can target another unit
 * @param {Object} attacker - Attacking unit
 * @param {Object} target - Target unit
 * @param {string} currentWeather - Current weather
 * @param {Array} smokeZones - Smoke zone positions
 * @returns {boolean} True if target is valid
 */
export const isValidTarget = (attacker, target, currentWeather, smokeZones) => {
  // Can't target self or allies
  if (!target || target.team === attacker.team || target.hp <= 0) return false;

  // Check smoke blocking
  if (smokeZones.some(s => s.x === target.x && s.y === target.y)) return false;

  return true;
};
