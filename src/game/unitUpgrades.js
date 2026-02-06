/**
 * WWI Tactical Game - Unit Upgrade System
 * Permanent upgrades purchasable between missions
 */

// ============================================================================
// UPGRADE DEFINITIONS
// ============================================================================

export const UNIT_UPGRADES = {
  // Infantry Upgrades
  infantry_bayonet: {
    id: 'infantry_bayonet',
    name: 'Bayonet Training',
    unitType: 'infantry',
    icon: '🔪',
    description: '+1 attack damage',
    cost: 30,
    effect: { attack: 1 },
    tier: 1,
    prerequisite: null,
  },

  infantry_helmet: {
    id: 'infantry_helmet',
    name: 'Steel Helmets',
    unitType: 'infantry',
    icon: '🪖',
    description: '+1 HP',
    cost: 35,
    effect: { hp: 1 },
    tier: 1,
    prerequisite: null,
  },

  infantry_grenades: {
    id: 'infantry_grenades',
    name: 'Grenade Training',
    unitType: 'infantry',
    icon: '💣',
    description: '+1 attack range',
    cost: 50,
    effect: { range: 1 },
    tier: 2,
    prerequisite: 'infantry_bayonet',
  },

  infantry_stormtrooper: {
    id: 'infantry_stormtrooper',
    name: 'Stormtrooper Tactics',
    unitType: 'infantry',
    icon: '⚡',
    description: '+1 movement speed',
    cost: 60,
    effect: { move: 1 },
    tier: 3,
    prerequisite: 'infantry_grenades',
  },

  // Machine Gun Upgrades
  mg_cooling: {
    id: 'mg_cooling',
    name: 'Water Cooling',
    unitType: 'machinegun',
    icon: '💧',
    description: '+1 attack (sustained fire)',
    cost: 40,
    effect: { attack: 1 },
    tier: 1,
    prerequisite: null,
  },

  mg_tripod: {
    id: 'mg_tripod',
    name: 'Reinforced Tripod',
    unitType: 'machinegun',
    icon: '🔩',
    description: '+1 defense',
    cost: 35,
    effect: { defense: 1 },
    tier: 1,
    prerequisite: null,
  },

  mg_belts: {
    id: 'mg_belts',
    name: 'Extended Ammo Belts',
    unitType: 'machinegun',
    icon: '🔗',
    description: '+1 range',
    cost: 55,
    effect: { range: 1 },
    tier: 2,
    prerequisite: 'mg_cooling',
  },

  // Cavalry Upgrades
  cavalry_sabers: {
    id: 'cavalry_sabers',
    name: 'Sharpened Sabers',
    unitType: 'cavalry',
    icon: '⚔️',
    description: '+1 attack damage',
    cost: 30,
    effect: { attack: 1 },
    tier: 1,
    prerequisite: null,
  },

  cavalry_armor: {
    id: 'cavalry_armor',
    name: 'Plate Armor',
    unitType: 'cavalry',
    icon: '🛡️',
    description: '+1 defense',
    cost: 40,
    effect: { defense: 1 },
    tier: 1,
    prerequisite: null,
  },

  cavalry_speed: {
    id: 'cavalry_speed',
    name: 'Bred for Speed',
    unitType: 'cavalry',
    icon: '🐎',
    description: '+1 movement',
    cost: 50,
    effect: { move: 1 },
    tier: 2,
    prerequisite: 'cavalry_sabers',
  },

  // Tank Upgrades
  tank_armor: {
    id: 'tank_armor',
    name: 'Reinforced Plating',
    unitType: 'tank',
    icon: '🛡️',
    description: '+1 defense, +1 HP',
    cost: 60,
    effect: { defense: 1, hp: 1 },
    tier: 1,
    prerequisite: null,
  },

  tank_gun: {
    id: 'tank_gun',
    name: 'Improved Gun',
    unitType: 'tank',
    icon: '💥',
    description: '+1 attack damage',
    cost: 50,
    effect: { attack: 1 },
    tier: 1,
    prerequisite: null,
  },

  tank_engine: {
    id: 'tank_engine',
    name: 'Improved Engine',
    unitType: 'tank',
    icon: '⚙️',
    description: '+1 movement speed',
    cost: 70,
    effect: { move: 1 },
    tier: 2,
    prerequisite: 'tank_armor',
  },

  tank_range: {
    id: 'tank_range',
    name: 'Extended Barrel',
    unitType: 'tank',
    icon: '🔭',
    description: '+1 attack range',
    cost: 65,
    effect: { range: 1 },
    tier: 2,
    prerequisite: 'tank_gun',
  },

  // Artillery Upgrades
  artillery_range: {
    id: 'artillery_range',
    name: 'Extended Range Shells',
    unitType: 'artillery',
    icon: '📏',
    description: '+1 attack range',
    cost: 45,
    effect: { range: 1 },
    tier: 1,
    prerequisite: null,
  },

  artillery_power: {
    id: 'artillery_power',
    name: 'High Explosive Shells',
    unitType: 'artillery',
    icon: '💥',
    description: '+1 attack damage',
    cost: 50,
    effect: { attack: 1 },
    tier: 1,
    prerequisite: null,
  },

  artillery_bunker: {
    id: 'artillery_bunker',
    name: 'Fortified Position',
    unitType: 'artillery',
    icon: '🏰',
    description: '+2 defense',
    cost: 55,
    effect: { defense: 2 },
    tier: 2,
    prerequisite: 'artillery_range',
  },

  // Medic Upgrades
  medic_supplies: {
    id: 'medic_supplies',
    name: 'Medical Supplies',
    unitType: 'medic',
    icon: '💊',
    description: '+1 healing power',
    cost: 35,
    effect: { healBonus: 1 },
    tier: 1,
    prerequisite: null,
  },

  medic_armor: {
    id: 'medic_armor',
    name: 'Field Armor',
    unitType: 'medic',
    icon: '🛡️',
    description: '+1 HP, +1 defense',
    cost: 40,
    effect: { hp: 1, defense: 1 },
    tier: 1,
    prerequisite: null,
  },

  medic_speed: {
    id: 'medic_speed',
    name: 'Combat Medic Training',
    unitType: 'medic',
    icon: '🏃',
    description: '+1 movement speed',
    cost: 45,
    effect: { move: 1 },
    tier: 2,
    prerequisite: 'medic_supplies',
  },

  // Sniper Upgrades
  sniper_scope: {
    id: 'sniper_scope',
    name: 'Telescopic Scope',
    unitType: 'sniper',
    icon: '🔭',
    description: '+1 attack range',
    cost: 40,
    effect: { range: 1 },
    tier: 1,
    prerequisite: null,
  },

  sniper_camo: {
    id: 'sniper_camo',
    name: 'Camouflage',
    unitType: 'sniper',
    icon: '🌿',
    description: '+1 defense',
    cost: 35,
    effect: { defense: 1 },
    tier: 1,
    prerequisite: null,
  },

  sniper_rifle: {
    id: 'sniper_rifle',
    name: 'Precision Rifle',
    unitType: 'sniper',
    icon: '🎯',
    description: '+1 attack, +10% crit chance',
    cost: 55,
    effect: { attack: 1, critBonus: 0.1 },
    tier: 2,
    prerequisite: 'sniper_scope',
  },

  // Officer Upgrades
  officer_tactics: {
    id: 'officer_tactics',
    name: 'Advanced Tactics',
    unitType: 'officer',
    icon: '📋',
    description: 'Rally affects +1 tile range',
    cost: 45,
    effect: { abilityRange: 1 },
    tier: 1,
    prerequisite: null,
  },

  officer_pistol: {
    id: 'officer_pistol',
    name: 'Service Pistol',
    unitType: 'officer',
    icon: '🔫',
    description: '+1 attack, +1 range',
    cost: 40,
    effect: { attack: 1, range: 1 },
    tier: 1,
    prerequisite: null,
  },

  officer_inspire: {
    id: 'officer_inspire',
    name: 'Inspiring Leadership',
    unitType: 'officer',
    icon: '⭐',
    description: '+1 HP, Rally gives +2 attack',
    cost: 60,
    effect: { hp: 1, rallyBonus: 1 },
    tier: 2,
    prerequisite: 'officer_tactics',
  },

  // Scout Upgrades
  scout_speed: {
    id: 'scout_speed',
    name: 'Light Equipment',
    unitType: 'scout',
    icon: '🏃',
    description: '+1 movement speed',
    cost: 30,
    effect: { move: 1 },
    tier: 1,
    prerequisite: null,
  },

  scout_range: {
    id: 'scout_range',
    name: 'Improved Binoculars',
    unitType: 'scout',
    icon: '🔭',
    description: '+1 attack range',
    cost: 35,
    effect: { range: 1 },
    tier: 1,
    prerequisite: null,
  },

  scout_survival: {
    id: 'scout_survival',
    name: 'Survival Training',
    unitType: 'scout',
    icon: '🛡️',
    description: '+1 HP, +1 defense',
    cost: 45,
    effect: { hp: 1, defense: 1 },
    tier: 2,
    prerequisite: 'scout_speed',
  },
};

// ============================================================================
// GLOBAL UPGRADES (Affect all units)
// ============================================================================

export const GLOBAL_UPGRADES = {
  field_hospital: {
    id: 'field_hospital',
    name: 'Field Hospital',
    icon: '🏥',
    description: 'All units regenerate 1 HP per turn',
    cost: 100,
    tier: 1,
    effect: { globalRegen: 1 },
  },

  supply_lines: {
    id: 'supply_lines',
    name: 'Improved Supply Lines',
    icon: '📦',
    description: 'All units start with +1 movement',
    cost: 80,
    tier: 1,
    effect: { globalMove: 1 },
  },

  veteran_training: {
    id: 'veteran_training',
    name: 'Veteran Training Program',
    icon: '🎖️',
    description: 'All units start with +1 HP',
    cost: 90,
    tier: 1,
    effect: { globalHP: 1 },
  },

  fortifications: {
    id: 'fortifications',
    name: 'Trench Fortifications',
    icon: '🏰',
    description: '+2 defense in trenches (was +1)',
    cost: 70,
    tier: 1,
    effect: { trenchDefenseBonus: 1 },
  },

  combined_arms: {
    id: 'combined_arms',
    name: 'Combined Arms Doctrine',
    icon: '⚔️',
    description: '+1 attack when adjacent to different unit type',
    cost: 120,
    tier: 2,
    effect: { combinedArmsBonus: 1 },
    prerequisite: 'veteran_training',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all upgrades for a specific unit type
 */
export function getUpgradesForUnitType(unitType) {
  return Object.values(UNIT_UPGRADES).filter(u => u.unitType === unitType);
}

/**
 * Get all global upgrades
 */
export function getGlobalUpgrades() {
  return Object.values(GLOBAL_UPGRADES);
}

/**
 * Check if an upgrade can be purchased
 */
export function canPurchaseUpgrade(upgradeId, purchasedUpgrades = [], requisitionPoints) {
  const upgrade = UNIT_UPGRADES[upgradeId] || GLOBAL_UPGRADES[upgradeId];
  if (!upgrade) return { canPurchase: false, reason: 'Upgrade not found' };

  // Already purchased
  if (purchasedUpgrades.includes(upgradeId)) {
    return { canPurchase: false, reason: 'Already purchased' };
  }

  // Check cost
  if (requisitionPoints < upgrade.cost) {
    return { canPurchase: false, reason: 'Not enough requisition points' };
  }

  // Check prerequisite
  if (upgrade.prerequisite && !purchasedUpgrades.includes(upgrade.prerequisite)) {
    const prereqUpgrade = UNIT_UPGRADES[upgrade.prerequisite] || GLOBAL_UPGRADES[upgrade.prerequisite];
    return {
      canPurchase: false,
      reason: `Requires: ${prereqUpgrade?.name || upgrade.prerequisite}`,
    };
  }

  return { canPurchase: true };
}

/**
 * Apply upgrades to unit stats
 */
export function applyUpgradesToUnit(baseStats, unitType, purchasedUpgrades = []) {
  const stats = { ...baseStats };

  // Apply unit-specific upgrades
  const unitUpgrades = getUpgradesForUnitType(unitType)
    .filter(u => purchasedUpgrades.includes(u.id));

  unitUpgrades.forEach(upgrade => {
    const effect = upgrade.effect;
    if (effect.hp) stats.hp += effect.hp;
    if (effect.attack) stats.attack += effect.attack;
    if (effect.defense) stats.defense += effect.defense;
    if (effect.range) stats.range += effect.range;
    if (effect.move) stats.move += effect.move;
    if (effect.critBonus) {
      stats.criticalChance = (stats.criticalChance || 0) + effect.critBonus;
    }
    if (effect.healBonus) {
      stats.healBonus = (stats.healBonus || 0) + effect.healBonus;
    }
    if (effect.abilityRange) {
      stats.abilityRange = (stats.abilityRange || 1) + effect.abilityRange;
    }
    if (effect.rallyBonus) {
      stats.rallyBonus = (stats.rallyBonus || 0) + effect.rallyBonus;
    }
  });

  // Apply global upgrades
  const globalUpgrades = Object.values(GLOBAL_UPGRADES)
    .filter(u => purchasedUpgrades.includes(u.id));

  globalUpgrades.forEach(upgrade => {
    const effect = upgrade.effect;
    if (effect.globalHP) stats.hp += effect.globalHP;
    if (effect.globalMove) stats.move += effect.globalMove;
    if (effect.globalRegen) stats.regeneration = (stats.regeneration || 0) + effect.globalRegen;
    if (effect.trenchDefenseBonus) {
      stats.trenchDefenseBonus = (stats.trenchDefenseBonus || 0) + effect.trenchDefenseBonus;
    }
    if (effect.combinedArmsBonus) {
      stats.combinedArmsBonus = (stats.combinedArmsBonus || 0) + effect.combinedArmsBonus;
    }
  });

  return stats;
}

/**
 * Get upgrade tree for display (organized by unit type and tier)
 */
export function getUpgradeTree() {
  const tree = {};

  // Organize unit upgrades
  Object.values(UNIT_UPGRADES).forEach(upgrade => {
    if (!tree[upgrade.unitType]) {
      tree[upgrade.unitType] = { tiers: { 1: [], 2: [], 3: [] } };
    }
    tree[upgrade.unitType].tiers[upgrade.tier].push(upgrade);
  });

  // Add global upgrades
  tree.global = { tiers: { 1: [], 2: [] } };
  Object.values(GLOBAL_UPGRADES).forEach(upgrade => {
    tree.global.tiers[upgrade.tier].push(upgrade);
  });

  return tree;
}

/**
 * Get total cost of all purchased upgrades
 */
export function getTotalUpgradeCost(purchasedUpgrades = []) {
  let total = 0;

  purchasedUpgrades.forEach(upgradeId => {
    const upgrade = UNIT_UPGRADES[upgradeId] || GLOBAL_UPGRADES[upgradeId];
    if (upgrade) {
      total += upgrade.cost;
    }
  });

  return total;
}

/**
 * Get count of purchased upgrades by unit type
 */
export function getUpgradeCountByType(purchasedUpgrades = []) {
  const counts = { global: 0 };

  purchasedUpgrades.forEach(upgradeId => {
    const unitUpgrade = UNIT_UPGRADES[upgradeId];
    const globalUpgrade = GLOBAL_UPGRADES[upgradeId];

    if (unitUpgrade) {
      counts[unitUpgrade.unitType] = (counts[unitUpgrade.unitType] || 0) + 1;
    } else if (globalUpgrade) {
      counts.global++;
    }
  });

  return counts;
}

export default {
  UNIT_UPGRADES,
  GLOBAL_UPGRADES,
  getUpgradesForUnitType,
  getGlobalUpgrades,
  canPurchaseUpgrade,
  applyUpgradesToUnit,
  getUpgradeTree,
  getTotalUpgradeCost,
  getUpgradeCountByType,
};
