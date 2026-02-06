/**
 * WWI Tactical Game - Unit Customisation System
 * Name your units, choose loadouts, and personalize your soldiers
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOMISATION_KEY = '@ww1_unit_customisation';

// Equipment slots
export const EquipmentSlot = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GEAR: 'gear',
  ACCESSORY: 'accessory',
};

// Available equipment by unit type
export const EQUIPMENT_OPTIONS = {
  rifleman: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'rifle_standard', name: 'Standard Rifle', icon: '🔫', stats: {} },
      { id: 'rifle_marksman', name: 'Marksman Rifle', icon: '🎯', stats: { accuracy: 10, range: 1 }, cost: 30 },
      { id: 'rifle_trench', name: 'Trench Carbine', icon: '💥', stats: { attack: 5, range: -1 }, cost: 25 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'bayonet', name: 'Bayonet', icon: '🗡️', stats: { meleeAttack: 10 } },
      { id: 'pistol', name: 'Service Pistol', icon: '🔫', stats: { attack: 5 }, cost: 15 },
      { id: 'grenades', name: 'Grenades', icon: '💣', stats: { areaAttack: true }, cost: 20 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'standard_kit', name: 'Standard Kit', icon: '🎒', stats: {} },
      { id: 'light_kit', name: 'Light Kit', icon: '🏃', stats: { movement: 1, defense: -5 }, cost: 20 },
      { id: 'heavy_kit', name: 'Heavy Kit', icon: '🛡️', stats: { defense: 10, movement: -1 }, cost: 25 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'binoculars', name: 'Binoculars', icon: '🔭', stats: { vision: 1 }, cost: 10 },
      { id: 'gas_mask', name: 'Gas Mask', icon: '😷', stats: { gasResist: true }, cost: 15 },
      { id: 'lucky_charm', name: 'Lucky Charm', icon: '🍀', stats: { critChance: 5 }, cost: 10 },
    ],
  },

  machinegun: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'mg_standard', name: 'Standard MG', icon: '🔫', stats: {} },
      { id: 'mg_heavy', name: 'Heavy MG', icon: '💥', stats: { attack: 15, movement: -1 }, cost: 40 },
      { id: 'mg_light', name: 'Light MG', icon: '🏃', stats: { movement: 1, attack: -5 }, cost: 30 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'pistol', name: 'Service Pistol', icon: '🔫', stats: {} },
      { id: 'ammo_belt', name: 'Extra Ammo', icon: '🎯', stats: { suppression: 10 }, cost: 20 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'tripod', name: 'Tripod Mount', icon: '📐', stats: { accuracy: 15 }, cost: 25 },
      { id: 'shield', name: 'Gun Shield', icon: '🛡️', stats: { defense: 15 }, cost: 30 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'gas_mask', name: 'Gas Mask', icon: '😷', stats: { gasResist: true }, cost: 15 },
    ],
  },

  sniper: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'sniper_standard', name: 'Sniper Rifle', icon: '🎯', stats: {} },
      { id: 'sniper_heavy', name: 'Anti-Material Rifle', icon: '💥', stats: { attack: 20, accuracy: -10 }, cost: 50 },
      { id: 'sniper_silenced', name: 'Silenced Rifle', icon: '🤫', stats: { stealth: true }, cost: 45 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'pistol', name: 'Service Pistol', icon: '🔫', stats: {} },
      { id: 'knife', name: 'Trench Knife', icon: '🗡️', stats: { meleeAttack: 15 }, cost: 10 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'ghillie', name: 'Camouflage', icon: '🌿', stats: { stealth: 20 }, cost: 30 },
      { id: 'spotter_scope', name: 'Spotter Scope', icon: '🔭', stats: { vision: 2, accuracy: 10 }, cost: 35 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'lucky_charm', name: 'Lucky Charm', icon: '🍀', stats: { critChance: 10 }, cost: 10 },
    ],
  },

  officer: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'officer_pistol', name: 'Officer\'s Pistol', icon: '🔫', stats: {} },
      { id: 'officer_sword', name: 'Ceremonial Sword', icon: '⚔️', stats: { morale: 10 }, cost: 20 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'whistle', name: 'Whistle', icon: '📢', stats: { commandRange: 1 } },
      { id: 'flare_gun', name: 'Flare Gun', icon: '🎆', stats: { vision: 2 }, cost: 15 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'map_case', name: 'Map Case', icon: '🗺️', stats: { commandRange: 1 }, cost: 25 },
      { id: 'radio', name: 'Field Radio', icon: '📻', stats: { artillery: true }, cost: 50 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'medal', name: 'Medal of Valor', icon: '🎖️', stats: { morale: 15, aura: true }, cost: 30 },
      { id: 'watch', name: 'Pocket Watch', icon: '⌚', stats: { initiative: 1 }, cost: 15 },
    ],
  },

  medic: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'medic_kit', name: 'Medical Kit', icon: '⚕️', stats: {} },
      { id: 'surgeon_kit', name: 'Surgeon\'s Kit', icon: '💉', stats: { healAmount: 10 }, cost: 40 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'pistol', name: 'Service Pistol', icon: '🔫', stats: {} },
      { id: 'stretcher', name: 'Stretcher', icon: '🛏️', stats: { rescue: true }, cost: 20 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'bandages', name: 'Extra Bandages', icon: '🩹', stats: { healCharges: 2 }, cost: 15 },
      { id: 'morphine', name: 'Morphine Supply', icon: '💊', stats: { painKiller: true }, cost: 25 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'red_cross', name: 'Red Cross Armband', icon: '➕', stats: { protection: true }, cost: 10 },
    ],
  },

  tank: {
    [EquipmentSlot.PRIMARY]: [
      { id: 'cannon_standard', name: 'Standard Cannon', icon: '💥', stats: {} },
      { id: 'cannon_heavy', name: 'Heavy Cannon', icon: '💣', stats: { attack: 20, reload: -1 }, cost: 60 },
      { id: 'howitzer', name: 'Howitzer', icon: '🎯', stats: { range: 2, accuracy: -10 }, cost: 50 },
    ],
    [EquipmentSlot.SECONDARY]: [
      { id: 'mg_coax', name: 'Coaxial MG', icon: '🔫', stats: {} },
      { id: 'flame_thrower', name: 'Flame Projector', icon: '🔥', stats: { terror: true, range: -1 }, cost: 45 },
    ],
    [EquipmentSlot.GEAR]: [
      { id: 'armor_standard', name: 'Standard Armor', icon: '🛡️', stats: {} },
      { id: 'armor_heavy', name: 'Extra Plating', icon: '🔩', stats: { defense: 20, movement: -1 }, cost: 40 },
      { id: 'track_upgrade', name: 'Improved Tracks', icon: '⚙️', stats: { movement: 1, terrainBonus: true }, cost: 35 },
    ],
    [EquipmentSlot.ACCESSORY]: [
      { id: 'none', name: 'None', icon: '—', stats: {} },
      { id: 'smoke_launcher', name: 'Smoke Launchers', icon: '💨', stats: { smoke: true }, cost: 25 },
    ],
  },
};

// Unit nicknames and titles
export const NICKNAME_PREFIXES = [
  'Lucky', 'Iron', 'Mad', 'Silent', 'Quick', 'Dead-Eye', 'Old',
  'Red', 'Black', 'Wild', 'Steady', 'Stone', 'Swift', 'Grim',
];

export const NICKNAME_SUFFIXES = [
  'Jack', 'Tommy', 'Fritz', 'Pierre', 'Sam', 'Bill', 'Charlie',
  'Mac', 'Duke', 'Sarge', 'Kid', 'Bull', 'Doc', 'Ace',
];

export const UNIT_TITLES = [
  'The Survivor', 'The Legend', 'The Veteran', 'The Hero',
  'The Unstoppable', 'The Fearless', 'The Silent Death',
  'The Iron Wall', 'The Last Stand', 'The First Over',
];

/**
 * Unit Customisation Manager
 */
export class CustomisationManager {
  constructor() {
    this.customisations = {};
  }

  /**
   * Load customisations from storage
   */
  async load() {
    try {
      const data = await AsyncStorage.getItem(CUSTOMISATION_KEY);
      if (data) {
        this.customisations = JSON.parse(data);
      }
    } catch (error) {
      console.log('Error loading customisations:', error);
    }
  }

  /**
   * Save customisations to storage
   */
  async save() {
    try {
      await AsyncStorage.setItem(CUSTOMISATION_KEY, JSON.stringify(this.customisations));
    } catch (error) {
      console.log('Error saving customisations:', error);
    }
  }

  /**
   * Get customisation for a unit
   */
  getCustomisation(unitId) {
    return this.customisations[unitId] || null;
  }

  /**
   * Set unit nickname
   */
  setNickname(unitId, nickname) {
    if (!this.customisations[unitId]) {
      this.customisations[unitId] = {};
    }
    this.customisations[unitId].nickname = nickname;
    this.save();
  }

  /**
   * Set unit title
   */
  setTitle(unitId, title) {
    if (!this.customisations[unitId]) {
      this.customisations[unitId] = {};
    }
    this.customisations[unitId].title = title;
    this.save();
  }

  /**
   * Set equipment for a slot
   */
  setEquipment(unitId, slot, equipmentId) {
    if (!this.customisations[unitId]) {
      this.customisations[unitId] = { equipment: {} };
    }
    if (!this.customisations[unitId].equipment) {
      this.customisations[unitId].equipment = {};
    }
    this.customisations[unitId].equipment[slot] = equipmentId;
    this.save();
  }

  /**
   * Get full equipment loadout
   */
  getLoadout(unitId, unitType) {
    const custom = this.customisations[unitId]?.equipment || {};
    const defaults = EQUIPMENT_OPTIONS[unitType] || {};
    const loadout = {};

    for (const slot of Object.values(EquipmentSlot)) {
      if (custom[slot]) {
        // Find the selected equipment
        const options = defaults[slot] || [];
        loadout[slot] = options.find(e => e.id === custom[slot]) || options[0];
      } else {
        // Use first option as default
        loadout[slot] = defaults[slot]?.[0] || null;
      }
    }

    return loadout;
  }

  /**
   * Calculate total stat bonuses from equipment
   */
  getEquipmentBonuses(unitId, unitType) {
    const loadout = this.getLoadout(unitId, unitType);
    const bonuses = {
      attack: 0,
      defense: 0,
      accuracy: 0,
      movement: 0,
      range: 0,
      vision: 0,
      morale: 0,
      critChance: 0,
    };

    for (const equipment of Object.values(loadout)) {
      if (equipment?.stats) {
        for (const [stat, value] of Object.entries(equipment.stats)) {
          if (typeof value === 'number' && bonuses.hasOwnProperty(stat)) {
            bonuses[stat] += value;
          }
        }
      }
    }

    return bonuses;
  }

  /**
   * Get display name for unit
   */
  getDisplayName(unitId, originalName) {
    const custom = this.customisations[unitId];
    if (custom?.nickname) {
      return custom.nickname;
    }
    return originalName;
  }

  /**
   * Get full display with title
   */
  getFullDisplayName(unitId, originalName) {
    const custom = this.customisations[unitId];
    let name = custom?.nickname || originalName;

    if (custom?.title) {
      name = `${name} "${custom.title}"`;
    }

    return name;
  }

  /**
   * Generate random nickname
   */
  static generateNickname() {
    const prefix = NICKNAME_PREFIXES[Math.floor(Math.random() * NICKNAME_PREFIXES.length)];
    const suffix = NICKNAME_SUFFIXES[Math.floor(Math.random() * NICKNAME_SUFFIXES.length)];
    return `${prefix} ${suffix}`;
  }

  /**
   * Generate random title based on achievements
   */
  static generateTitle(kills = 0, missions = 0) {
    if (kills >= 50) return 'The Legend';
    if (missions >= 20) return 'The Survivor';
    if (kills >= 25) return 'The Unstoppable';
    if (missions >= 10) return 'The Veteran';
    if (kills >= 10) return 'The Fearless';
    return UNIT_TITLES[Math.floor(Math.random() * UNIT_TITLES.length)];
  }

  /**
   * Get equipment cost total
   */
  getLoadoutCost(unitId, unitType) {
    const loadout = this.getLoadout(unitId, unitType);
    let total = 0;

    for (const equipment of Object.values(loadout)) {
      if (equipment?.cost) {
        total += equipment.cost;
      }
    }

    return total;
  }
}

// Singleton instance
export const customisationManager = new CustomisationManager();

export default {
  EquipmentSlot,
  EQUIPMENT_OPTIONS,
  NICKNAME_PREFIXES,
  NICKNAME_SUFFIXES,
  UNIT_TITLES,
  CustomisationManager,
  customisationManager,
};
