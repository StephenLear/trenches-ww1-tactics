/**
 * WWI Tactical Game - Supply Lines System
 * Units need supply to maintain combat effectiveness
 * Cut off enemies from their supply sources to weaken them
 */

// Supply status levels
export const SupplyStatus = {
  FULL: 'full',           // 100% effectiveness
  ADEQUATE: 'adequate',   // 90% effectiveness
  LOW: 'low',             // 70% effectiveness
  CRITICAL: 'critical',   // 50% effectiveness
  CUT_OFF: 'cut_off',     // 30% effectiveness
};

// Supply source types
export const SupplySourceType = {
  HQ: 'hq',               // Main headquarters - strongest supply
  DEPOT: 'depot',         // Supply depot - good supply
  TRUCK: 'truck',         // Supply truck unit - mobile supply
  TRENCH: 'trench',       // Trenches can store limited supply
  AIRDROP: 'airdrop',     // Emergency resupply (limited)
};

// Supply configuration - balanced for engaging gameplay
const SUPPLY_CONFIG = {
  maxSupplyRange: 8,      // Max tiles from supply source (increased)
  supplyPerTurn: 15,      // Supply consumed per turn per unit (reduced from 20)
  baseSupply: 100,        // Starting supply for units
  resupplyAmount: 40,     // Amount restored when in supply range (balanced)

  // Supply source ranges (increased for less punishing gameplay)
  sourceRanges: {
    [SupplySourceType.HQ]: 10,      // Was 8 - HQ has greater reach
    [SupplySourceType.DEPOT]: 6,    // Was 5 - depots more useful
    [SupplySourceType.TRUCK]: 4,    // Was 3 - trucks more mobile
    [SupplySourceType.TRENCH]: 2,   // Was 1 - trenches store more
    [SupplySourceType.AIRDROP]: 3,  // Was 2 - airdrops cover more area
  },

  // Supply capacity by source
  sourceCapacity: {
    [SupplySourceType.HQ]: Infinity,
    [SupplySourceType.DEPOT]: 600,  // Was 500
    [SupplySourceType.TRUCK]: 250,  // Was 200
    [SupplySourceType.TRENCH]: 150, // Was 100
    [SupplySourceType.AIRDROP]: 200, // Was 150
  },
};

/**
 * Calculate distance between two positions
 */
const calculateDistance = (pos1, pos2) => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

/**
 * Check if a path between two points is blocked by enemies
 */
const isPathBlocked = (from, to, enemyPositions, mapWidth, mapHeight) => {
  // Simple line-of-supply check
  const dx = Math.sign(to.x - from.x);
  const dy = Math.sign(to.y - from.y);

  let x = from.x;
  let y = from.y;

  while (x !== to.x || y !== to.y) {
    // Check if enemy is blocking this tile
    const isBlocked = enemyPositions.some(
      (enemy) => enemy.x === x && enemy.y === y
    );

    if (isBlocked) {
      return true;
    }

    // Move towards target
    if (x !== to.x) x += dx;
    if (y !== to.y) y += dy;
  }

  return false;
};

/**
 * Find nearest supply source for a unit
 */
export const findNearestSupplySource = (unitPosition, supplySources, enemyPositions, mapWidth, mapHeight) => {
  let nearestSource = null;
  let nearestDistance = Infinity;

  for (const source of supplySources) {
    const distance = calculateDistance(unitPosition, source.position);
    const range = SUPPLY_CONFIG.sourceRanges[source.type] || 3;

    // Check if within range
    if (distance <= range) {
      // Check if supply line is blocked
      const blocked = isPathBlocked(
        unitPosition,
        source.position,
        enemyPositions,
        mapWidth,
        mapHeight
      );

      if (!blocked && distance < nearestDistance) {
        nearestDistance = distance;
        nearestSource = source;
      }
    }
  }

  return nearestSource;
};

/**
 * Calculate supply status for a unit
 */
export const calculateSupplyStatus = (unit, supplySources, enemyPositions, mapWidth, mapHeight) => {
  const currentSupply = unit.supply ?? SUPPLY_CONFIG.baseSupply;

  // Find if unit is in supply
  const supplySource = findNearestSupplySource(
    unit.position,
    supplySources,
    enemyPositions,
    mapWidth,
    mapHeight
  );

  const inSupply = supplySource !== null;

  // Determine status based on supply level
  let status;
  if (currentSupply >= 80) {
    status = SupplyStatus.FULL;
  } else if (currentSupply >= 60) {
    status = SupplyStatus.ADEQUATE;
  } else if (currentSupply >= 40) {
    status = SupplyStatus.LOW;
  } else if (currentSupply >= 20) {
    status = SupplyStatus.CRITICAL;
  } else {
    status = SupplyStatus.CUT_OFF;
  }

  // Override if completely cut off
  if (!inSupply && currentSupply < 50) {
    status = SupplyStatus.CUT_OFF;
  }

  return {
    status,
    currentSupply,
    inSupply,
    supplySource,
  };
};

/**
 * Get combat modifiers based on supply status
 */
export const getSupplyModifiers = (status) => {
  switch (status) {
    case SupplyStatus.FULL:
      return {
        attackModifier: 1.0,
        defenseModifier: 1.0,
        moraleModifier: 1.0,
        movementModifier: 1.0,
        canHeal: true,
        description: 'Fully supplied - Full combat effectiveness',
      };

    case SupplyStatus.ADEQUATE:
      return {
        attackModifier: 0.95,
        defenseModifier: 0.95,
        moraleModifier: 0.95,
        movementModifier: 1.0,
        canHeal: true,
        description: 'Adequate supply - Minor penalties',
      };

    case SupplyStatus.LOW:
      return {
        attackModifier: 0.85,     // Was 0.8 - less punishing
        defenseModifier: 0.9,     // Was 0.85
        moraleModifier: 0.85,     // Was 0.8
        movementModifier: 0.95,   // Was 0.9 - movement less affected
        canHeal: true,            // Was false - can still heal slowly
        healModifier: 0.5,        // Heal at half rate
        description: 'Low supply - Reduced effectiveness',
      };

    case SupplyStatus.CRITICAL:
      return {
        attackModifier: 0.7,      // Was 0.6 - less severe
        defenseModifier: 0.75,    // Was 0.7
        moraleModifier: 0.7,      // Was 0.6
        movementModifier: 0.85,   // Was 0.8
        canHeal: false,
        description: 'Critical supply - Severely weakened',
      };

    case SupplyStatus.CUT_OFF:
      return {
        attackModifier: 0.5,      // Was 0.4 - still dangerous but playable
        defenseModifier: 0.6,     // Was 0.5
        moraleModifier: 0.4,      // Was 0.3
        movementModifier: 0.7,    // Was 0.6
        canHeal: false,
        attritionDamage: 3,       // Was 5 - less punishing attrition
        description: 'Cut off! - Desperate situation',
      };

    default:
      return {
        attackModifier: 1.0,
        defenseModifier: 1.0,
        moraleModifier: 1.0,
        movementModifier: 1.0,
        canHeal: true,
        description: 'Unknown supply status',
      };
  }
};

/**
 * Process supply for all units at end of turn
 */
export const processSupplyPhase = (units, supplySources, enemyPositions, mapWidth, mapHeight) => {
  const results = [];

  for (const unit of units) {
    const supplyInfo = calculateSupplyStatus(
      unit,
      supplySources,
      enemyPositions,
      mapWidth,
      mapHeight
    );

    let newSupply = unit.supply ?? SUPPLY_CONFIG.baseSupply;
    let event = null;

    if (supplyInfo.inSupply) {
      // Resupply
      newSupply = Math.min(
        SUPPLY_CONFIG.baseSupply,
        newSupply + SUPPLY_CONFIG.resupplyAmount
      );
      event = 'resupplied';
    } else {
      // Consume supply
      newSupply = Math.max(0, newSupply - SUPPLY_CONFIG.supplyPerTurn);
      event = 'consumed';

      // Apply attrition if cut off
      const modifiers = getSupplyModifiers(supplyInfo.status);
      if (modifiers.attritionDamage) {
        event = 'attrition';
      }
    }

    results.push({
      unitId: unit.id,
      previousSupply: unit.supply ?? SUPPLY_CONFIG.baseSupply,
      newSupply,
      status: supplyInfo.status,
      inSupply: supplyInfo.inSupply,
      event,
    });
  }

  return results;
};

/**
 * Create supply source object
 */
export const createSupplySource = (type, position, team) => ({
  id: `supply_${type}_${Date.now()}_${Math.random()}`,
  type,
  position,
  team,
  capacity: SUPPLY_CONFIG.sourceCapacity[type],
  range: SUPPLY_CONFIG.sourceRanges[type],
});

/**
 * Get supply status icon
 */
export const getSupplyIcon = (status) => {
  switch (status) {
    case SupplyStatus.FULL:
      return '📦';
    case SupplyStatus.ADEQUATE:
      return '📦';
    case SupplyStatus.LOW:
      return '⚠️';
    case SupplyStatus.CRITICAL:
      return '🔴';
    case SupplyStatus.CUT_OFF:
      return '💀';
    default:
      return '📦';
  }
};

/**
 * Get supply status color
 */
export const getSupplyColor = (status) => {
  switch (status) {
    case SupplyStatus.FULL:
      return '#4a7c59';
    case SupplyStatus.ADEQUATE:
      return '#7a9c59';
    case SupplyStatus.LOW:
      return '#d4af37';
    case SupplyStatus.CRITICAL:
      return '#ff8c00';
    case SupplyStatus.CUT_OFF:
      return '#8b0000';
    default:
      return '#666666';
  }
};

export default {
  SupplyStatus,
  SupplySourceType,
  findNearestSupplySource,
  calculateSupplyStatus,
  getSupplyModifiers,
  processSupplyPhase,
  createSupplySource,
  getSupplyIcon,
  getSupplyColor,
};
