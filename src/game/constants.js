// WW1 Tactical Game - Game Constants
// Platform-agnostic game data for React Native port
// Extracted from wwi-tactical-game-phase7-complete.jsx

// ============================================================================
// GRID AND BASIC SETTINGS
// ============================================================================

export const GRID_SIZE = 8;

// ============================================================================
// WEATHER SYSTEM
// ============================================================================

export const WEATHER_TYPES = {
  clear: {
    name: 'Clear',
    icon: '☀️',
    effects: {}
  },
  rain: {
    name: 'Rain',
    icon: '🌧️',
    effects: {
      rangeModifier: -1,
      description: 'Rain: -1 range for ranged attacks'
    }
  },
  snow: {
    name: 'Snow',
    icon: '❄️',
    effects: {
      movementModifier: -1,
      description: 'Snow: -1 movement for all units'
    }
  },
  fog: {
    name: 'Fog',
    icon: '🌫️',
    effects: {
      visibilityRange: 3,
      description: 'Fog: Cannot see enemies beyond 3 tiles'
    }
  },
  sandstorm: {
    name: 'Sandstorm',
    icon: '🏜️',
    effects: {
      rangeModifier: -1,
      movementModifier: -1,
      description: 'Sandstorm: -1 range and -1 movement'
    }
  }
};

// ============================================================================
// TERRAIN SYSTEM
// ============================================================================

export const TERRAIN_TYPES = {
  grass: {
    name: 'Grass',
    icon: '🌿',
    defenseBonus: 0,
    movementCost: 1,
    description: 'Open ground'
  },
  trench: {
    name: 'Trench',
    icon: '🪖',
    defenseBonus: 1,
    movementCost: 1,
    description: '+1 Defense'
  },
  mountain: {
    name: 'Mountain',
    icon: '⛰️',
    defenseBonus: 1,
    attackBonus: 1,
    movementCost: 2,
    causesAltitudeSickness: true,
    description: '+1 Atk/Def, 2 move cost'
  },
  water: {
    name: 'Water',
    icon: '🌊',
    defenseBonus: -1,
    movementCost: 2,
    cannotDigIn: true,
    blocksTanks: true,
    description: '-1 Def, blocks tanks'
  },
  beach: {
    name: 'Beach',
    icon: '🏖️',
    defenseBonus: -1,
    movementCost: 1,
    exposed: true,
    description: '-1 Defense (exposed)'
  },
  sand: {
    name: 'Sand',
    icon: '🏜️',
    defenseBonus: 0,
    movementCost: 2,
    description: '2 movement cost'
  },
  mud: {
    name: 'Mud',
    icon: '💧',
    defenseBonus: 0,
    movementCost: 2,
    stuckChance: 0.2,
    slowsCavalry: true,
    description: '2 move cost, slows cavalry'
  },
  barbed_wire: {
    name: 'Barbed Wire',
    icon: '🔗',
    defenseBonus: 0,
    movementCost: 3,
    damageOnEntry: 1,
    tankIgnores: true,
    description: 'Tanks ignore, 1 dmg to others'
  },
  objective: {
    name: 'Objective',
    icon: '🚩',
    defenseBonus: 0,
    movementCost: 1,
    description: 'Capture point'
  },
  crater: {
    name: 'Shell Crater',
    icon: '💥',
    defenseBonus: 1,
    movementCost: 1,
    description: '+1 Defense (cover)'
  }
};

// ============================================================================
// ABILITIES
// ============================================================================

export const ABILITIES = {
  // Original abilities
  rally: {
    name: 'Rally',
    description: 'Boost +1 attack to adjacent allies',
    cooldown: 3,
    type: 'officer'
  },
  flank: {
    name: 'Flank Attack',
    description: 'Next attack ignores enemy defense',
    cooldown: 2,
    type: 'scout'
  },
  dig_in: {
    name: 'Dig In',
    description: '+2 defense until you move',
    cooldown: 3,
    type: 'infantry'
  },
  suppressing_fire: {
    name: 'Suppressing Fire',
    description: 'Attack all enemies in range for half damage',
    cooldown: 4,
    type: 'machinegun'
  },
  // New abilities
  charge: {
    name: 'Charge',
    description: 'Move up to 6 tiles and attack with +2 damage',
    cooldown: 3,
    type: 'cavalry'
  },
  trample: {
    name: 'Trample',
    description: 'Move through enemy, dealing 1 damage',
    cooldown: 2,
    type: 'cavalry'
  },
  armor_up: {
    name: 'Brace Armor',
    description: 'Reduce all damage by 2 this turn',
    cooldown: 3,
    type: 'tank'
  },
  crush: {
    name: 'Crush',
    description: 'Destroy barbed wire and deal 2 damage to adjacent enemy',
    cooldown: 2,
    type: 'tank'
  },
  barrage: {
    name: 'Barrage',
    description: 'Hit 3x3 area for 2 damage each',
    cooldown: 4,
    type: 'artillery'
  },
  smoke: {
    name: 'Smoke Screen',
    description: 'Create smoke blocking line of sight for 2 turns',
    cooldown: 3,
    type: 'artillery'
  },
  heal: {
    name: 'First Aid',
    description: 'Heal adjacent ally for 2 HP',
    cooldown: 2,
    type: 'medic'
  },
  triage: {
    name: 'Triage',
    description: 'Heal all adjacent allies for 1 HP',
    cooldown: 4,
    type: 'medic'
  },
  aimed_shot: {
    name: 'Aimed Shot',
    description: 'Next attack has 50% chance for double damage',
    cooldown: 2,
    type: 'sniper'
  },
  relocate: {
    name: 'Relocate',
    description: 'Move without being seen (no enemy reaction)',
    cooldown: 3,
    type: 'sniper'
  }
};

// ============================================================================
// UNIT TYPES
// ============================================================================

export const UNIT_TYPES = {
  infantry: {
    name: 'Infantry',
    hp: 3,
    attack: 2,
    defense: 1,
    range: 1,
    move: 2,
    icon: '🪖',
    abilities: ['dig_in']
  },
  machinegun: {
    name: 'Machine Gunner',
    hp: 2,
    attack: 4,
    defense: 2,
    range: 3,
    move: 1,
    icon: '🔫',
    abilities: ['suppressing_fire'],
    bonusVsCavalry: 2
  },
  officer: {
    name: 'Officer',
    hp: 2,
    attack: 1,
    defense: 1,
    range: 1,
    move: 2,
    icon: '⭐',
    abilities: ['rally']
  },
  scout: {
    name: 'Scout',
    hp: 2,
    attack: 1,
    defense: 0,
    range: 2,
    move: 3,
    icon: '🔭',
    abilities: ['flank']
  },
  cavalry: {
    name: 'Cavalry',
    hp: 3,
    attack: 3,
    defense: 0,
    range: 1,
    move: 4,
    icon: '🐴',
    abilities: ['charge', 'trample'],
    vulnerableToMG: true,
    description: 'Fast but vulnerable to machine guns'
  },
  tank: {
    name: 'Tank',
    hp: 6,
    attack: 3,
    defense: 3,
    range: 2,
    move: 2,
    icon: '🛡️',
    abilities: ['armor_up', 'crush'],
    armor: 2,
    ignoresBarbedWire: true,
    cannotEnterWater: true,
    description: 'Heavy armor, ignores barbed wire'
  },
  artillery: {
    name: 'Artillery',
    hp: 2,
    attack: 4,
    defense: 0,
    range: 4,
    move: 1,
    icon: '💥',
    abilities: ['barrage', 'smoke'],
    cannotMoveAndFire: true,
    minRange: 2,
    description: 'Long range, cannot move and fire'
  },
  medic: {
    name: 'Medic',
    hp: 2,
    attack: 0,
    defense: 1,
    range: 1,
    move: 2,
    icon: '⚕️',
    abilities: ['heal', 'triage'],
    nonCombatant: true,
    healingAura: 1,
    description: 'Heals adjacent allies +1 HP/turn'
  },
  sniper: {
    name: 'Sniper',
    hp: 1,
    attack: 3,
    defense: 0,
    range: 4,
    move: 2,
    icon: '🎯',
    abilities: ['aimed_shot', 'relocate'],
    criticalChance: 0.25,
    description: 'Long range, chance for critical hits'
  }
};

// ============================================================================
// REQUISITION SHOP
// ============================================================================

export const REQUISITION_SHOP = {
  infantry: {
    name: 'Recruit Infantry',
    cost: 15,
    type: 'infantry',
    description: 'Add Infantry veteran to your roster'
  },
  scout: {
    name: 'Recruit Scout',
    cost: 20,
    type: 'scout',
    description: 'Add Scout veteran to your roster'
  },
  machinegun: {
    name: 'Recruit Machine Gunner',
    cost: 25,
    type: 'machinegun',
    description: 'Add Machine Gunner to your roster'
  },
  officer: {
    name: 'Recruit Officer',
    cost: 30,
    type: 'officer',
    description: 'Add Officer to your roster'
  },
  medic: {
    name: 'Recruit Medic',
    cost: 30,
    type: 'medic',
    description: 'Add Medic to your roster'
  },
  sniper: {
    name: 'Recruit Sniper',
    cost: 35,
    type: 'sniper',
    description: 'Add Sniper to your roster'
  },
  cavalry: {
    name: 'Recruit Cavalry',
    cost: 35,
    type: 'cavalry',
    description: 'Add Cavalry to your roster'
  },
  tank: {
    name: 'Recruit Tank',
    cost: 50,
    type: 'tank',
    description: 'Add Tank crew to your roster'
  },
  artillery: {
    name: 'Recruit Artillery',
    cost: 45,
    type: 'artillery',
    description: 'Add Artillery crew to your roster'
  }
};

// ============================================================================
// COMMANDER ABILITIES
// ============================================================================

export const COMMANDER_ABILITIES = {
  artillery_strike: {
    name: 'Artillery Strike',
    cost: 20,
    icon: '🎯',
    description: 'Call in artillery on 3x3 area for 2 damage each',
    effect: 'area_damage',
    cooldown: 0,
    maxCooldown: 4
  },
  recon_plane: {
    name: 'Recon Plane',
    cost: 15,
    icon: '🔭',
    description: 'Reveal all enemies for 3 turns',
    effect: 'reveal_all',
    cooldown: 0,
    maxCooldown: 5
  },
  smoke_barrage: {
    name: 'Smoke Barrage',
    cost: 10,
    icon: '💨',
    description: 'Create a smoke screen wall (3 tiles)',
    effect: 'smoke_wall',
    cooldown: 0,
    maxCooldown: 3
  },
  emergency_reinforcements: {
    name: 'Emergency Reinforcements',
    cost: 25,
    icon: '🚁',
    description: 'Spawn 2 infantry units at your position',
    effect: 'spawn_units',
    cooldown: 0,
    maxCooldown: 6
  },
  medical_evac: {
    name: 'Medical Evac',
    cost: 20,
    icon: '⚕️',
    description: 'Heal all friendly units for 2 HP',
    effect: 'heal_all',
    cooldown: 0,
    maxCooldown: 4
  }
};

// ============================================================================
// COMMANDER PERKS
// ============================================================================

export const COMMANDER_PERKS = {
  logistics: {
    name: 'Logistics Expert',
    cost: 100,
    icon: '📦',
    description: 'All units get +1 movement permanently',
    bonus: 'movement'
  },
  veteran_corps: {
    name: 'Veteran Corps',
    cost: 150,
    icon: '🛡️',
    description: 'All units start with +1 HP',
    bonus: 'hp'
  },
  advanced_tactics: {
    name: 'Advanced Tactics',
    cost: 120,
    icon: '⚔️',
    description: 'All abilities have -1 cooldown',
    bonus: 'cooldown'
  },
  field_hospital: {
    name: 'Field Hospital',
    cost: 130,
    icon: '🏥',
    description: 'All units regenerate 1 HP per turn',
    bonus: 'regeneration'
  },
  artillery_mastery: {
    name: 'Artillery Mastery',
    cost: 100,
    icon: '💥',
    description: 'Artillery units get +2 range',
    bonus: 'artillery_range'
  }
};

// ============================================================================
// DIFFICULTY SETTINGS
// ============================================================================

export const DIFFICULTY_SETTINGS = {
  easy: {
    name: 'Recruit',
    icon: '🟢',
    description: 'Reduced enemy stats, basic AI',
    enemyHPMod: -0.25,
    enemyAttackMod: -1,
    enemyDefenseMod: 0,
    aiAggressiveness: 0.5,
    aiUsesAbilities: false,
    requisitionBonus: 1.5
  },
  normal: {
    name: 'Soldier',
    icon: '🟡',
    description: 'Standard difficulty, balanced AI',
    enemyHPMod: 0,
    enemyAttackMod: 0,
    enemyDefenseMod: 0,
    aiAggressiveness: 0.7,
    aiUsesAbilities: true,
    requisitionBonus: 1.0
  },
  hard: {
    name: 'Veteran',
    icon: '🟠',
    description: 'Enhanced enemies, tactical AI',
    enemyHPMod: 0.25,
    enemyAttackMod: 1,
    enemyDefenseMod: 1,
    aiAggressiveness: 0.85,
    aiUsesAbilities: true,
    requisitionBonus: 1.2
  },
  elite: {
    name: 'Elite',
    icon: '🔴',
    description: 'Maximum challenge, strategic AI',
    enemyHPMod: 0.5,
    enemyAttackMod: 2,
    enemyDefenseMod: 1,
    aiAggressiveness: 1.0,
    aiUsesAbilities: true,
    requisitionBonus: 1.5
  }
};

// ============================================================================
// TECH TREE & RESEARCH SYSTEM
// ============================================================================

export const TECH_TREE = {
  // Early War (1914-1915)
  improved_rifles: {
    name: 'Improved Rifles',
    era: 'early',
    cost: 50,
    icon: '🔫',
    description: 'Infantry gain +1 range',
    effect: { unitType: 'infantry', stat: 'range', bonus: 1 },
    prerequisite: null
  },
  trench_warfare: {
    name: 'Trench Warfare Doctrine',
    era: 'early',
    cost: 60,
    icon: '🪖',
    description: 'All units get +1 defense in trenches',
    effect: { global: true, stat: 'trench_defense', bonus: 1 },
    prerequisite: null
  },
  scout_training: {
    name: 'Scout Training',
    era: 'early',
    cost: 40,
    icon: '👁️',
    description: 'Scouts gain +1 movement',
    effect: { unitType: 'scout', stat: 'movement', bonus: 1 },
    prerequisite: null
  },

  // Mid War (1916)
  machine_gun_doctrine: {
    name: 'Machine Gun Doctrine',
    era: 'mid',
    cost: 80,
    icon: '⚡',
    description: 'Machine guns gain +1 attack',
    effect: { unitType: 'machinegun', stat: 'attack', bonus: 1 },
    prerequisite: 'trench_warfare'
  },
  medical_advances: {
    name: 'Medical Advances',
    era: 'mid',
    cost: 70,
    icon: '💊',
    description: 'Medics heal +1 extra HP',
    effect: { unitType: 'medic', stat: 'heal_bonus', bonus: 1 },
    prerequisite: null
  },
  artillery_ranging: {
    name: 'Artillery Ranging',
    era: 'mid',
    cost: 90,
    icon: '📐',
    description: 'Artillery gains +1 range',
    effect: { unitType: 'artillery', stat: 'range', bonus: 1 },
    prerequisite: null
  },
  officer_tactics: {
    name: 'Officer Tactics',
    era: 'mid',
    cost: 75,
    icon: '🎖️',
    description: 'Officer rally affects units 2 tiles away',
    effect: { unitType: 'officer', stat: 'ability_range', bonus: 1 },
    prerequisite: 'scout_training'
  },

  // Late War (1917-1918)
  tank_armor: {
    name: 'Tank Armor Upgrade',
    era: 'late',
    cost: 120,
    icon: '🛡️',
    description: 'Tanks gain +2 HP',
    effect: { unitType: 'tank', stat: 'hp', bonus: 2 },
    prerequisite: 'machine_gun_doctrine'
  },
  sniper_optics: {
    name: 'Sniper Optics',
    era: 'late',
    cost: 100,
    icon: '🔭',
    description: 'Snipers gain +1 range and +10% crit chance',
    effect: { unitType: 'sniper', stat: 'range', bonus: 1, critBonus: 0.1 },
    prerequisite: 'improved_rifles'
  },
  cavalry_charge: {
    name: 'Cavalry Charge Tactics',
    era: 'late',
    cost: 90,
    icon: '🐎',
    description: 'Cavalry charge deals +1 damage',
    effect: { unitType: 'cavalry', stat: 'charge_damage', bonus: 1 },
    prerequisite: 'scout_training'
  },
  combined_arms: {
    name: 'Combined Arms Doctrine',
    era: 'late',
    cost: 150,
    icon: '⚔️',
    description: 'All units gain +1 attack when adjacent to different unit type',
    effect: { global: true, stat: 'combined_arms', bonus: 1 },
    prerequisite: 'officer_tactics'
  },
  advanced_artillery: {
    name: 'Advanced Artillery',
    era: 'late',
    cost: 130,
    icon: '💥',
    description: 'Artillery barrage radius +1 (4x4 area)',
    effect: { unitType: 'artillery', stat: 'barrage_radius', bonus: 1 },
    prerequisite: 'artillery_ranging'
  },
  stormtrooper_tactics: {
    name: 'Stormtrooper Tactics',
    era: 'late',
    cost: 140,
    icon: '⚡',
    description: 'Infantry gain +1 attack and ignore 1 point of defense',
    effect: { unitType: 'infantry', stat: 'attack', bonus: 1, armorPiercing: 1 },
    prerequisite: 'trench_warfare'
  }
};

// ============================================================================
// FACTIONS
// ============================================================================

export const FACTIONS = {
  british: {
    name: 'British Empire',
    flag: '🇬🇧',
    description: 'Defensive specialists with superior trench warfare',
    color: 'red',
    bonuses: {
      trenchDefense: 1,
      infantryHP: 1,
      description: '+1 defense in trenches, Infantry +1 HP'
    },
    unitModifiers: {
      infantry: { hp: 1 },
      officer: { defense: 1 }
    }
  },
  french: {
    name: 'French Republic',
    flag: '🇫🇷',
    description: 'Offensive doctrine with superior attacks',
    color: 'blue',
    bonuses: {
      offensiveBonus: 1,
      artilleryRange: 1,
      description: '+1 attack when attacking, Artillery +1 range'
    },
    unitModifiers: {
      artillery: { range: 1 },
      infantry: { attack: 1 }
    }
  },
  german: {
    name: 'German Empire',
    flag: '🇩🇪',
    description: 'Combined arms with powerful machine guns',
    color: 'gray',
    bonuses: {
      machineGunRange: 1,
      tankArmor: 1,
      description: 'Machine Guns +1 range, Tanks +1 defense'
    },
    unitModifiers: {
      machinegun: { range: 1 },
      tank: { defense: 1, hp: 1 }
    }
  },
  american: {
    name: 'United States',
    flag: '🇺🇸',
    description: 'Fresh troops with high morale and requisitions',
    color: 'blue',
    bonuses: {
      startingHP: 1,
      requisitionBonus: 1.25,
      description: 'All units +1 HP, +25% requisition rewards'
    },
    unitModifiers: {
      infantry: { hp: 1 },
      scout: { hp: 1 },
      officer: { hp: 1 },
      medic: { hp: 1 },
      machinegun: { hp: 1 }
    }
  }
};

// ============================================================================
// SKIRMISH MODE PRESETS
// ============================================================================

export const SKIRMISH_PRESETS = {
  quick_battle: {
    name: 'Quick Battle',
    icon: '⚔️',
    description: 'Standard skirmish with balanced forces',
    mapSize: 8,
    terrainType: 'mixed',
    enemyCount: 6,
    objectiveType: 'elimination',
    weather: 'clear'
  },
  last_stand: {
    name: 'Last Stand',
    icon: '🛡️',
    description: 'Defend against overwhelming odds',
    mapSize: 8,
    terrainType: 'trenches',
    enemyCount: 10,
    objectiveType: 'survive',
    turnsToSurvive: 8,
    weather: 'rain'
  },
  assassination: {
    name: 'Assassination',
    icon: '🎯',
    description: 'Eliminate the enemy officer',
    mapSize: 8,
    terrainType: 'mixed',
    enemyCount: 7,
    objectiveType: 'kill_officer',
    weather: 'fog'
  },
  breakthrough: {
    name: 'Breakthrough',
    icon: '🏁',
    description: 'Capture objectives before time runs out',
    mapSize: 10,
    terrainType: 'trenches',
    enemyCount: 8,
    objectiveType: 'capture_objectives',
    objectiveCount: 3,
    turnLimit: 12,
    weather: 'clear'
  },
  artillery_duel: {
    name: 'Artillery Duel',
    icon: '💥',
    description: 'Counter-battery warfare',
    mapSize: 10,
    terrainType: 'open',
    enemyCount: 5,
    objectiveType: 'destroy_artillery',
    weather: 'clear'
  },
  beach_assault: {
    name: 'Beach Assault',
    icon: '🏖️',
    description: 'Storm the beaches under fire',
    mapSize: 8,
    terrainType: 'beach',
    enemyCount: 8,
    objectiveType: 'capture_objectives',
    objectiveCount: 2,
    weather: 'clear'
  },
  tank_assault: {
    name: 'Tank Assault',
    icon: '🚜',
    description: 'Lead a mass tank attack through barbed wire',
    mapSize: 8,
    terrainType: 'hindenburg',
    enemyCount: 6,
    objectiveType: 'capture_objectives',
    objectiveCount: 3,
    weather: 'fog',
    playerUnits: ['tank', 'tank', 'tank', 'infantry', 'infantry', 'officer']
  },
  encirclement: {
    name: 'Encirclement',
    icon: '🔄',
    description: 'Flank and surround the enemy forces',
    mapSize: 8,
    terrainType: 'forest',
    enemyCount: 6,
    objectiveType: 'elimination',
    weather: 'clear',
    playerUnits: ['cavalry', 'cavalry', 'infantry', 'infantry', 'artillery', 'officer'],
    specialSetup: 'pincer'
  },
  forest_assault: {
    name: 'Forest Assault',
    icon: '🌲',
    description: 'Clear enemy machine guns from the woods',
    mapSize: 8,
    terrainType: 'forest',
    enemyCount: 7,
    objectiveType: 'elimination',
    weather: 'clear',
    playerUnits: ['infantry', 'infantry', 'infantry', 'infantry', 'officer', 'medic']
  },
  armistice: {
    name: 'Armistice',
    icon: '🕊️',
    description: 'Survive until 11:00 AM - the war ends!',
    mapSize: 8,
    terrainType: 'trenches',
    enemyCount: 5,
    objectiveType: 'survive',
    turnsToSurvive: 8,
    weather: 'fog',
    playerUnits: ['infantry', 'infantry', 'machinegun', 'officer', 'medic', 'sniper']
  }
};

// ============================================================================
// TERRAIN PRESETS
// ============================================================================

export const TERRAIN_PRESETS = {
  trenches: {
    name: 'Trench Warfare',
    primaryTerrain: 'trench',
    secondaryTerrain: 'crater',
    hazards: 'barbed_wire'
  },
  beach: {
    name: 'Beach Landing',
    primaryTerrain: 'beach',
    secondaryTerrain: 'water',
    hazards: 'barbed_wire'
  },
  mountain: {
    name: 'Mountain Pass',
    primaryTerrain: 'mountain',
    secondaryTerrain: 'crater',
    hazards: null
  },
  open: {
    name: 'Open Field',
    primaryTerrain: null,
    secondaryTerrain: 'crater',
    hazards: null
  },
  desert: {
    name: 'Desert',
    primaryTerrain: 'sand',
    secondaryTerrain: 'crater',
    hazards: null
  },
  mixed: {
    name: 'Mixed Terrain',
    primaryTerrain: 'trench',
    secondaryTerrain: 'mountain',
    hazards: 'barbed_wire'
  },
  forest: {
    name: 'Forest',
    primaryTerrain: 'forest',
    secondaryTerrain: 'crater',
    hazards: null
  },
  hindenburg: {
    name: 'Hindenburg Line',
    primaryTerrain: 'trench',
    secondaryTerrain: 'trench',
    hazards: 'barbed_wire',
    multipleWireRows: true
  }
};

// ============================================================================
// RANKS
// ============================================================================

export const RANKS = {
  private: {
    name: 'Private',
    xpNeeded: 0,
    icon: ''
  },
  corporal: {
    name: 'Corporal',
    xpNeeded: 100,
    icon: '⚊'
  },
  sergeant: {
    name: 'Sergeant',
    xpNeeded: 250,
    icon: '⚌'
  }
};

// ============================================================================
// SOLDIER GENERATION DATA
// ============================================================================

export const FIRST_NAMES = [
  'William', 'James', 'Robert', 'Thomas', 'Edward', 'Henry', 'Arthur', 'George',
  'Albert', 'Frederick', 'Charles', 'John', 'Walter', 'Ernest', 'Harold', 'Alfred'
];

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson',
  'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'
];

export const HOMETOWNS = [
  'London', 'Manchester', 'Liverpool', 'Birmingham', 'Leeds', 'Boston',
  'New York', 'Chicago', 'Toronto', 'Sydney', 'Melbourne', 'Dublin'
];

export const BACKSTORIES = [
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
