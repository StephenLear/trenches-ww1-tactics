/**
 * WWI Tactical Game - Artillery Barrage System
 * Off-map artillery support you can call in during battle
 */

// Artillery types
export const ArtilleryType = {
  LIGHT_BARRAGE: 'light_barrage',
  HEAVY_BARRAGE: 'heavy_barrage',
  CREEPING_BARRAGE: 'creeping_barrage',
  SMOKE_BARRAGE: 'smoke_barrage',
  GAS_BARRAGE: 'gas_barrage',
  NAVAL_BOMBARDMENT: 'naval_bombardment',
  TRENCH_MORTAR: 'trench_mortar',
};

// Artillery configurations
export const ARTILLERY_TYPES = {
  [ArtilleryType.LIGHT_BARRAGE]: {
    name: 'Light Barrage',
    description: 'Quick 75mm field gun barrage',
    icon: '💥',
    damage: { min: 15, max: 30 },
    radius: 1,
    delay: 0, // Turns until impact
    duration: 1, // How long effect lasts
    cost: 30,
    cooldown: 2,
    accuracy: 85,
    effects: [],
  },

  [ArtilleryType.HEAVY_BARRAGE]: {
    name: 'Heavy Barrage',
    description: 'Devastating 155mm howitzer bombardment',
    icon: '💣',
    damage: { min: 40, max: 70 },
    radius: 2,
    delay: 1,
    duration: 1,
    cost: 60,
    cooldown: 4,
    accuracy: 75,
    effects: ['crater', 'suppression'],
  },

  [ArtilleryType.CREEPING_BARRAGE]: {
    name: 'Creeping Barrage',
    description: 'Rolling barrage that advances each turn',
    icon: '🔥',
    damage: { min: 25, max: 45 },
    radius: 3,
    delay: 1,
    duration: 3,
    cost: 80,
    cooldown: 5,
    accuracy: 70,
    effects: ['suppression'],
    special: 'creeping', // Moves forward each turn
  },

  [ArtilleryType.SMOKE_BARRAGE]: {
    name: 'Smoke Barrage',
    description: 'Obscuring smoke to cover advances',
    icon: '💨',
    damage: { min: 0, max: 5 },
    radius: 2,
    delay: 0,
    duration: 3,
    cost: 25,
    cooldown: 2,
    accuracy: 95,
    effects: ['smoke'],
  },

  [ArtilleryType.GAS_BARRAGE]: {
    name: 'Gas Barrage',
    description: 'Deadly chemical attack',
    icon: '☠️',
    damage: { min: 10, max: 20 },
    radius: 2,
    delay: 0,
    duration: 4,
    cost: 50,
    cooldown: 5,
    accuracy: 90,
    effects: ['gas', 'suppression'],
    damagePerTurn: 10, // Ongoing damage
  },

  [ArtilleryType.NAVAL_BOMBARDMENT]: {
    name: 'Naval Bombardment',
    description: 'Massive shells from offshore battleships',
    icon: '⚓',
    damage: { min: 60, max: 100 },
    radius: 3,
    delay: 2,
    duration: 1,
    cost: 100,
    cooldown: 6,
    accuracy: 60,
    effects: ['crater', 'suppression', 'destroyed_cover'],
    requirements: {
      mapType: ['coastal', 'beach'],
    },
  },

  [ArtilleryType.TRENCH_MORTAR]: {
    name: 'Trench Mortar',
    description: 'Close support mortar fire',
    icon: '🎯',
    damage: { min: 20, max: 35 },
    radius: 1,
    delay: 0,
    duration: 1,
    cost: 20,
    cooldown: 1,
    accuracy: 80,
    effects: [],
    requirements: {
      hasUnit: 'mortar',
    },
  },
};

/**
 * Artillery effect definitions
 */
export const ArtilleryEffects = {
  crater: {
    name: 'Crater',
    description: 'Creates crater terrain (provides cover)',
    duration: 'permanent',
  },
  suppression: {
    name: 'Suppression',
    description: 'Units cannot move next turn',
    duration: 1,
    modifier: { movement: 0, accuracy: -30 },
  },
  smoke: {
    name: 'Smoke Screen',
    description: 'Blocks line of sight',
    duration: 3,
    modifier: { visibility: -3, accuracy: -50 },
  },
  gas: {
    name: 'Poison Gas',
    description: 'Damages units each turn',
    duration: 4,
    damagePerTurn: 10,
    modifier: { accuracy: -20, movement: -1 },
  },
  destroyed_cover: {
    name: 'Destroyed Cover',
    description: 'Removes fortifications in area',
    duration: 'permanent',
  },
};

/**
 * Artillery Manager - handles barrage calls and effects
 */
export class ArtilleryManager {
  constructor() {
    this.artilleryPoints = 50; // Starting AP
    this.cooldowns = {};
    this.activeBarrages = []; // Ongoing effects on the map
    this.pendingStrikes = []; // Strikes that will land in future turns
    this.currentTurn = 1;
  }

  /**
   * Add artillery points
   */
  addPoints(amount) {
    this.artilleryPoints += amount;
  }

  /**
   * Check if artillery is available
   */
  isAvailable(type, gameState = {}) {
    const artillery = ARTILLERY_TYPES[type];
    if (!artillery) return { available: false, reason: 'Unknown artillery type' };

    // Check cost
    if (this.artilleryPoints < artillery.cost) {
      return { available: false, reason: `Need ${artillery.cost} AP` };
    }

    // Check cooldown
    if (this.cooldowns[type] && this.cooldowns[type] > 0) {
      return { available: false, reason: `Cooldown: ${this.cooldowns[type]} turns` };
    }

    // Check requirements
    if (artillery.requirements) {
      if (artillery.requirements.mapType &&
          !artillery.requirements.mapType.includes(gameState.mapType)) {
        return { available: false, reason: 'Not available on this map' };
      }
      if (artillery.requirements.hasUnit &&
          !gameState.playerUnits?.some(u => u.type === artillery.requirements.hasUnit)) {
        return { available: false, reason: `Requires ${artillery.requirements.hasUnit} unit` };
      }
    }

    return { available: true };
  }

  /**
   * Get all available artillery options
   */
  getAvailableArtillery(gameState = {}) {
    const available = [];

    for (const type in ARTILLERY_TYPES) {
      const status = this.isAvailable(type, gameState);
      available.push({
        type,
        ...ARTILLERY_TYPES[type],
        ...status,
        cooldownRemaining: this.cooldowns[type] || 0,
      });
    }

    return available;
  }

  /**
   * Call in an artillery strike
   */
  callStrike(type, targetPosition) {
    const status = this.isAvailable(type);
    if (!status.available) {
      return { success: false, reason: status.reason };
    }

    const artillery = ARTILLERY_TYPES[type];

    // Deduct cost and set cooldown
    this.artilleryPoints -= artillery.cost;
    this.cooldowns[type] = artillery.cooldown;

    // Create strike object
    const strike = {
      id: `strike_${Date.now()}_${Math.random()}`,
      type,
      targetPosition,
      impactTurn: this.currentTurn + artillery.delay,
      duration: artillery.duration,
      turnsRemaining: artillery.duration,
      config: artillery,
      called: this.currentTurn,
    };

    if (artillery.delay === 0) {
      // Immediate impact
      this.activeBarrages.push(strike);
      return {
        success: true,
        immediate: true,
        strike,
        message: `${artillery.name} incoming at target!`,
      };
    } else {
      // Delayed impact
      this.pendingStrikes.push(strike);
      return {
        success: true,
        immediate: false,
        strike,
        message: `${artillery.name} called - impact in ${artillery.delay} turn(s)!`,
      };
    }
  }

  /**
   * Process turn - handle delayed strikes and ongoing effects
   */
  processTurn() {
    this.currentTurn++;
    const events = [];

    // Reduce cooldowns
    for (const type in this.cooldowns) {
      if (this.cooldowns[type] > 0) {
        this.cooldowns[type]--;
      }
    }

    // Check pending strikes
    const landing = this.pendingStrikes.filter(s => s.impactTurn === this.currentTurn);
    const stillPending = this.pendingStrikes.filter(s => s.impactTurn > this.currentTurn);

    for (const strike of landing) {
      this.activeBarrages.push(strike);
      events.push({
        type: 'strike_landed',
        strike,
        message: `${strike.config.name} has landed!`,
      });
    }

    this.pendingStrikes = stillPending;

    // Process active barrages
    const stillActive = [];
    for (const barrage of this.activeBarrages) {
      barrage.turnsRemaining--;

      // Handle creeping barrage movement
      if (barrage.config.special === 'creeping' && barrage.turnsRemaining > 0) {
        barrage.targetPosition.y--; // Move forward
        events.push({
          type: 'barrage_moved',
          barrage,
          message: 'Creeping barrage advances!',
        });
      }

      if (barrage.turnsRemaining > 0) {
        stillActive.push(barrage);
      } else {
        events.push({
          type: 'barrage_ended',
          barrage,
          message: `${barrage.config.name} has ended`,
        });
      }
    }

    this.activeBarrages = stillActive;

    return events;
  }

  /**
   * Calculate damage for units in barrage area
   */
  calculateBarrageDamage(unitPosition, barrage) {
    const distance = Math.abs(unitPosition.x - barrage.targetPosition.x) +
                     Math.abs(unitPosition.y - barrage.targetPosition.y);

    if (distance > barrage.config.radius) {
      return null; // Out of range
    }

    // Check accuracy
    const accuracyRoll = Math.random() * 100;
    if (accuracyRoll > barrage.config.accuracy) {
      return { hit: false, damage: 0, message: 'Near miss!' };
    }

    // Calculate damage (reduced by distance)
    const { min, max } = barrage.config.damage;
    const baseDamage = min + Math.random() * (max - min);
    const distanceModifier = 1 - (distance / (barrage.config.radius + 1)) * 0.5;
    const finalDamage = Math.floor(baseDamage * distanceModifier);

    return {
      hit: true,
      damage: finalDamage,
      effects: barrage.config.effects,
      message: distance === 0 ? 'Direct hit!' : 'Hit by shrapnel!',
    };
  }

  /**
   * Get tiles affected by active barrages
   */
  getAffectedTiles() {
    const tiles = [];

    for (const barrage of this.activeBarrages) {
      const { targetPosition, config } = barrage;

      for (let dx = -config.radius; dx <= config.radius; dx++) {
        for (let dy = -config.radius; dy <= config.radius; dy++) {
          if (Math.abs(dx) + Math.abs(dy) <= config.radius) {
            tiles.push({
              x: targetPosition.x + dx,
              y: targetPosition.y + dy,
              barrageId: barrage.id,
              effects: config.effects,
              type: barrage.type,
            });
          }
        }
      }
    }

    // Also show pending strike locations
    for (const strike of this.pendingStrikes) {
      tiles.push({
        x: strike.targetPosition.x,
        y: strike.targetPosition.y,
        pending: true,
        turnsUntilImpact: strike.impactTurn - this.currentTurn,
        type: strike.type,
      });
    }

    return tiles;
  }

  /**
   * Get current state for saving
   */
  getState() {
    return {
      artilleryPoints: this.artilleryPoints,
      cooldowns: { ...this.cooldowns },
      activeBarrages: [...this.activeBarrages],
      pendingStrikes: [...this.pendingStrikes],
      currentTurn: this.currentTurn,
    };
  }

  /**
   * Load state
   */
  loadState(state) {
    this.artilleryPoints = state.artilleryPoints || 50;
    this.cooldowns = state.cooldowns || {};
    this.activeBarrages = state.activeBarrages || [];
    this.pendingStrikes = state.pendingStrikes || [];
    this.currentTurn = state.currentTurn || 1;
  }
}

/**
 * Get artillery icon for display
 */
export const getArtilleryIcon = (type) => {
  return ARTILLERY_TYPES[type]?.icon || '💥';
};

/**
 * Get effect color for tile highlighting
 */
export const getEffectColor = (effects) => {
  if (effects.includes('gas')) return 'rgba(0, 255, 0, 0.4)';
  if (effects.includes('smoke')) return 'rgba(200, 200, 200, 0.6)';
  if (effects.includes('suppression')) return 'rgba(255, 165, 0, 0.4)';
  return 'rgba(255, 100, 0, 0.4)';
};

export default {
  ArtilleryType,
  ARTILLERY_TYPES,
  ArtilleryEffects,
  ArtilleryManager,
  getArtilleryIcon,
  getEffectColor,
};
