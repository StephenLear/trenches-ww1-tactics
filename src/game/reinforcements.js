/**
 * WWI Tactical Game - Reinforcement System
 * Call in reserves mid-battle to turn the tide
 */

import { UNIT_TYPES } from './constants';

// Reinforcement types
export const ReinforcementType = {
  INFANTRY_SQUAD: 'infantry_squad',
  MACHINE_GUN_TEAM: 'mg_team',
  MORTAR_TEAM: 'mortar_team',
  SNIPER: 'sniper',
  CAVALRY: 'cavalry',
  TANK: 'tank',
  MEDIC_TEAM: 'medic_team',
  ENGINEER_SQUAD: 'engineer_squad',
  STORMTROOPERS: 'stormtroopers',
  ARTILLERY_OBSERVER: 'artillery_observer',
};

// Reinforcement packages
export const REINFORCEMENT_PACKAGES = {
  [ReinforcementType.INFANTRY_SQUAD]: {
    name: 'Infantry Squad',
    description: 'Fresh riflemen ready for the line',
    icon: '🪖',
    cost: 40,          // Was 50 - more accessible basic unit
    cooldown: 2,
    units: [
      { type: 'rifleman', count: 3 },
    ],
    requirements: {
      minTurn: 1,       // Was 2 - available immediately
      controlledObjectives: 0,
    },
  },

  [ReinforcementType.MACHINE_GUN_TEAM]: {
    name: 'Machine Gun Team',
    description: 'Heavy firepower for defensive positions',
    icon: '🔫',
    cost: 65,          // Was 80 - more affordable
    cooldown: 3,
    units: [
      { type: 'machinegun', count: 1 },
      { type: 'rifleman', count: 1 },
    ],
    requirements: {
      minTurn: 2,       // Was 3 - available earlier
      controlledObjectives: 0, // Was 1 - no objective needed
    },
  },

  [ReinforcementType.MORTAR_TEAM]: {
    name: 'Mortar Team',
    description: 'Indirect fire support',
    icon: '💥',
    cost: 55,          // Was 70 - more accessible
    cooldown: 3,
    units: [
      { type: 'mortar', count: 1 },
    ],
    requirements: {
      minTurn: 2,       // Was 3
      controlledObjectives: 0,
    },
  },

  [ReinforcementType.SNIPER]: {
    name: 'Sniper',
    description: 'Precision elimination of high-value targets',
    icon: '🎯',
    cost: 50,          // Was 60
    cooldown: 3,       // Was 4 - shorter cooldown
    units: [
      { type: 'sniper', count: 1 },
    ],
    requirements: {
      minTurn: 2,
      controlledObjectives: 0,
    },
  },

  [ReinforcementType.CAVALRY]: {
    name: 'Cavalry Squadron',
    description: 'Fast-moving shock troops',
    icon: '🐎',
    cost: 75,          // Was 90
    cooldown: 3,       // Was 4
    units: [
      { type: 'cavalry', count: 2 },
    ],
    requirements: {
      minTurn: 3,       // Was 4 - earlier availability
      controlledObjectives: 0, // Was 1
    },
  },

  [ReinforcementType.TANK]: {
    name: 'Tank',
    description: 'Armored breakthrough capability',
    icon: '🛡️',
    cost: 120,         // Was 150 - premium but achievable
    cooldown: 4,       // Was 5
    units: [
      { type: 'tank', count: 1 },
    ],
    requirements: {
      minTurn: 4,       // Was 5
      controlledObjectives: 1, // Was 2 - easier to unlock
      faction: ['british', 'french', 'american'], // Added American
    },
  },

  [ReinforcementType.MEDIC_TEAM]: {
    name: 'Medical Team',
    description: 'Field medics to heal wounded soldiers',
    icon: '⚕️',
    cost: 30,          // Was 40 - cheapest reinforcement
    cooldown: 2,
    units: [
      { type: 'medic', count: 2 },
    ],
    requirements: {
      minTurn: 1,
      controlledObjectives: 0,
    },
  },

  [ReinforcementType.ENGINEER_SQUAD]: {
    name: 'Engineer Squad',
    description: 'Fortification and demolition specialists',
    icon: '🔧',
    cost: 45,          // Was 60
    cooldown: 2,       // Was 3
    units: [
      { type: 'engineer', count: 2 },
    ],
    requirements: {
      minTurn: 1,       // Was 2
      controlledObjectives: 0,
    },
  },

  [ReinforcementType.STORMTROOPERS]: {
    name: 'Stormtroopers',
    description: 'Elite assault infantry',
    icon: '⚔️',
    cost: 100,         // Was 120
    cooldown: 4,
    units: [
      { type: 'rifleman', count: 2, elite: true },
      { type: 'grenadier', count: 1 },
    ],
    requirements: {
      minTurn: 3,       // Was 4
      controlledObjectives: 1,
      faction: ['german', 'austro_hungarian'], // Added Austro-Hungarian
    },
  },

  [ReinforcementType.ARTILLERY_OBSERVER]: {
    name: 'Artillery Observer',
    description: 'Calls in off-map artillery strikes',
    icon: '📡',
    cost: 80,          // Was 100
    cooldown: 4,       // Was 5
    units: [
      { type: 'officer', count: 1, ability: 'artillery_call' },
    ],
    requirements: {
      minTurn: 3,
      controlledObjectives: 1,
    },
  },
};

/**
 * Reinforcement manager state
 */
export class ReinforcementManager {
  constructor() {
    this.reinforcementPoints = 75; // Starting RP (was 100 - balanced with lower costs)
    this.cooldowns = {}; // Track cooldowns per reinforcement type
    this.callHistory = []; // Track what was called and when
    this.currentTurn = 1;
    this.controlledObjectives = 0;
    this.faction = 'british';
    this.maxReinforcementPoints = 300; // Cap to prevent hoarding
  }

  /**
   * Set current game state
   */
  updateGameState(turn, objectives, faction) {
    this.currentTurn = turn;
    this.controlledObjectives = objectives;
    this.faction = faction;
  }

  /**
   * Add reinforcement points (earned through gameplay)
   */
  addPoints(amount) {
    this.reinforcementPoints = Math.min(
      this.reinforcementPoints + amount,
      this.maxReinforcementPoints
    );
  }

  /**
   * Process turn - reduce cooldowns
   */
  processTurn() {
    for (const type in this.cooldowns) {
      if (this.cooldowns[type] > 0) {
        this.cooldowns[type]--;
      }
    }
  }

  /**
   * Check if reinforcement is available
   */
  isAvailable(type) {
    const package_ = REINFORCEMENT_PACKAGES[type];
    if (!package_) return { available: false, reason: 'Unknown reinforcement type' };

    // Check cost
    if (this.reinforcementPoints < package_.cost) {
      return { available: false, reason: `Need ${package_.cost} RP (have ${this.reinforcementPoints})` };
    }

    // Check cooldown
    if (this.cooldowns[type] && this.cooldowns[type] > 0) {
      return { available: false, reason: `On cooldown (${this.cooldowns[type]} turns)` };
    }

    // Check turn requirement
    if (this.currentTurn < package_.requirements.minTurn) {
      return { available: false, reason: `Available from turn ${package_.requirements.minTurn}` };
    }

    // Check objectives requirement
    if (this.controlledObjectives < package_.requirements.controlledObjectives) {
      return {
        available: false,
        reason: `Need ${package_.requirements.controlledObjectives} objectives`
      };
    }

    // Check faction requirement
    if (package_.requirements.faction &&
        !package_.requirements.faction.includes(this.faction)) {
      return { available: false, reason: 'Not available to your faction' };
    }

    return { available: true, reason: null };
  }

  /**
   * Get all available reinforcements
   */
  getAvailableReinforcements() {
    const available = [];

    for (const type in REINFORCEMENT_PACKAGES) {
      const status = this.isAvailable(type);
      available.push({
        type,
        ...REINFORCEMENT_PACKAGES[type],
        ...status,
        cooldownRemaining: this.cooldowns[type] || 0,
      });
    }

    return available;
  }

  /**
   * Call in reinforcements
   */
  callReinforcements(type, deployPosition) {
    const status = this.isAvailable(type);
    if (!status.available) {
      return { success: false, reason: status.reason };
    }

    const package_ = REINFORCEMENT_PACKAGES[type];

    // Deduct cost
    this.reinforcementPoints -= package_.cost;

    // Set cooldown
    this.cooldowns[type] = package_.cooldown;

    // Record in history
    this.callHistory.push({
      type,
      turn: this.currentTurn,
      position: deployPosition,
      timestamp: Date.now(),
    });

    // Generate units to deploy
    const unitsToSpawn = [];
    for (const unitDef of package_.units) {
      for (let i = 0; i < unitDef.count; i++) {
        unitsToSpawn.push({
          type: unitDef.type,
          elite: unitDef.elite || false,
          ability: unitDef.ability || null,
          position: {
            x: deployPosition.x + (i % 2),
            y: deployPosition.y + Math.floor(i / 2),
          },
        });
      }
    }

    return {
      success: true,
      units: unitsToSpawn,
      cost: package_.cost,
      message: `${package_.name} arriving at the front!`,
    };
  }

  /**
   * Get points earned for actions - balanced for new costs
   */
  static getPointsForAction(action) {
    switch (action) {
      case 'kill_infantry':
        return 8;           // Was 5 - more rewarding
      case 'kill_elite':
        return 15;          // Was 10
      case 'kill_tank':
        return 25;          // Was 20
      case 'kill_cavalry':
        return 12;          // New action
      case 'kill_artillery':
        return 18;          // New action
      case 'capture_objective':
        return 35;          // Was 30
      case 'hold_objective':
        return 10;          // New - per turn for holding
      case 'complete_mission':
        return 60;          // Was 50
      case 'turn_survived':
        return 3;           // Was 2
      case 'flawless_turn':
        return 8;           // New - no units lost
      case 'first_blood':
        return 10;          // New - first kill of battle
      default:
        return 0;
    }
  }

  /**
   * Get current state for saving
   */
  getState() {
    return {
      reinforcementPoints: this.reinforcementPoints,
      cooldowns: { ...this.cooldowns },
      callHistory: [...this.callHistory],
    };
  }

  /**
   * Load state
   */
  loadState(state) {
    this.reinforcementPoints = state.reinforcementPoints || 100;
    this.cooldowns = state.cooldowns || {};
    this.callHistory = state.callHistory || [];
  }
}

/**
 * Get deploy zones for reinforcements (typically map edges on player side)
 */
export const getDeployZones = (mapWidth, mapHeight, playerSide = 'bottom') => {
  const zones = [];

  switch (playerSide) {
    case 'bottom':
      for (let x = 0; x < mapWidth; x++) {
        zones.push({ x, y: mapHeight - 1 });
        zones.push({ x, y: mapHeight - 2 });
      }
      break;
    case 'top':
      for (let x = 0; x < mapWidth; x++) {
        zones.push({ x, y: 0 });
        zones.push({ x, y: 1 });
      }
      break;
    case 'left':
      for (let y = 0; y < mapHeight; y++) {
        zones.push({ x: 0, y });
        zones.push({ x: 1, y });
      }
      break;
    case 'right':
      for (let y = 0; y < mapHeight; y++) {
        zones.push({ x: mapWidth - 1, y });
        zones.push({ x: mapWidth - 2, y });
      }
      break;
  }

  return zones;
};

export default {
  ReinforcementType,
  REINFORCEMENT_PACKAGES,
  ReinforcementManager,
  getDeployZones,
};
