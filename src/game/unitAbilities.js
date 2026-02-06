/**
 * WWI Tactical Game - Unit Abilities System
 * Special abilities for each unit type
 */

// Ability types
export const ABILITY_TYPES = {
  ACTIVE: 'active',       // Player must activate
  PASSIVE: 'passive',     // Always active
  TRIGGERED: 'triggered', // Activates on certain conditions
};

// Ability target types
export const TARGET_TYPES = {
  SELF: 'self',
  ALLY: 'ally',
  ENEMY: 'enemy',
  TILE: 'tile',
  AREA: 'area',
  ALL_ALLIES: 'all_allies',
  ADJACENT: 'adjacent',
};

// Ability definitions for each unit type
export const UNIT_ABILITIES = {
  infantry: {
    // Passive: Entrench
    entrench: {
      id: 'entrench',
      name: 'Entrench',
      icon: '🛡️',
      type: ABILITY_TYPES.PASSIVE,
      description: '+2 Defense when in trench or behind cover.',
      targetType: TARGET_TYPES.SELF,
      cooldown: 0,
      effect: {
        type: 'defense_bonus',
        value: 2,
        condition: 'in_cover',
      },
    },
    // Active: Bayonet Charge
    bayonetCharge: {
      id: 'bayonetCharge',
      name: 'Bayonet Charge',
      icon: '⚔️',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Rush an adjacent enemy. +3 attack but take 1 damage.',
      targetType: TARGET_TYPES.ENEMY,
      range: 1,
      cooldown: 3,
      effect: {
        type: 'melee_attack',
        attackBonus: 3,
        selfDamage: 1,
      },
    },
  },

  machinegunner: {
    // Passive: Suppressing Fire
    suppressingFire: {
      id: 'suppressingFire',
      name: 'Suppressing Fire',
      icon: '💨',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Enemies damaged by this unit have -1 movement next turn.',
      targetType: TARGET_TYPES.ENEMY,
      effect: {
        type: 'debuff',
        stat: 'movement',
        value: -1,
        duration: 1,
      },
    },
    // Active: Overwatch
    overwatch: {
      id: 'overwatch',
      name: 'Overwatch',
      icon: '👁️',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Attack the first enemy that moves into range (until next turn).',
      targetType: TARGET_TYPES.SELF,
      cooldown: 2,
      effect: {
        type: 'overwatch',
        duration: 1,
      },
    },
  },

  sniper: {
    // Passive: Camouflage
    camouflage: {
      id: 'camouflage',
      name: 'Camouflage',
      icon: '🌿',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Enemies beyond range 3 cannot target this unit.',
      targetType: TARGET_TYPES.SELF,
      effect: {
        type: 'stealth',
        minRange: 3,
      },
    },
    // Active: Aimed Shot
    aimedShot: {
      id: 'aimedShot',
      name: 'Aimed Shot',
      icon: '🎯',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Skip movement for +3 attack and guaranteed hit on next attack.',
      targetType: TARGET_TYPES.SELF,
      cooldown: 2,
      requiresStationary: true,
      effect: {
        type: 'buff',
        attackBonus: 3,
        guaranteedHit: true,
        duration: 1,
      },
    },
    // Active: Headshot
    headshot: {
      id: 'headshot',
      name: 'Headshot',
      icon: '💀',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Target officers specifically. If it kills, gain +5 morale.',
      targetType: TARGET_TYPES.ENEMY,
      range: 5,
      cooldown: 4,
      effect: {
        type: 'targeted_attack',
        targetType: 'officer',
        moraleBonus: 5,
      },
    },
  },

  medic: {
    // Active: Heal
    heal: {
      id: 'heal',
      name: 'First Aid',
      icon: '💚',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Restore 3 HP to an adjacent ally.',
      targetType: TARGET_TYPES.ALLY,
      range: 1,
      cooldown: 1,
      effect: {
        type: 'heal',
        value: 3,
      },
    },
    // Active: Triage
    triage: {
      id: 'triage',
      name: 'Triage',
      icon: '🏥',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Heal all adjacent allies for 1 HP each.',
      targetType: TARGET_TYPES.ADJACENT,
      cooldown: 3,
      effect: {
        type: 'area_heal',
        value: 1,
        range: 1,
      },
    },
    // Passive: Medical Training
    medicalTraining: {
      id: 'medicalTraining',
      name: 'Medical Training',
      icon: '📋',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Adjacent allies have +1 max HP while near the medic.',
      targetType: TARGET_TYPES.ADJACENT,
      effect: {
        type: 'aura',
        stat: 'maxHP',
        value: 1,
        range: 1,
      },
    },
  },

  officer: {
    // Active: Rally
    rally: {
      id: 'rally',
      name: 'Rally',
      icon: '📣',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Boost army morale by 10. All allies get +1 attack this turn.',
      targetType: TARGET_TYPES.ALL_ALLIES,
      cooldown: 4,
      effect: {
        type: 'rally',
        moraleBonus: 10,
        attackBonus: 1,
        duration: 1,
      },
    },
    // Active: Inspire
    inspire: {
      id: 'inspire',
      name: 'Inspire',
      icon: '⭐',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Target ally gains an extra action this turn.',
      targetType: TARGET_TYPES.ALLY,
      range: 3,
      cooldown: 5,
      effect: {
        type: 'extra_action',
        count: 1,
      },
    },
    // Passive: Leadership Aura
    leadershipAura: {
      id: 'leadershipAura',
      name: 'Leadership',
      icon: '👑',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Allies within range 2 have +1 attack.',
      targetType: TARGET_TYPES.AREA,
      effect: {
        type: 'aura',
        stat: 'attack',
        value: 1,
        range: 2,
      },
    },
  },

  tank: {
    // Passive: Armored
    armored: {
      id: 'armored',
      name: 'Armored',
      icon: '🛡️',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Reduces all incoming damage by 2 (minimum 1).',
      targetType: TARGET_TYPES.SELF,
      effect: {
        type: 'damage_reduction',
        value: 2,
        minimum: 1,
      },
    },
    // Active: Crush
    crush: {
      id: 'crush',
      name: 'Crush',
      icon: '🛞',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Move through an enemy, dealing 4 damage and pushing them.',
      targetType: TARGET_TYPES.ENEMY,
      range: 1,
      cooldown: 3,
      effect: {
        type: 'push_attack',
        damage: 4,
        pushDistance: 1,
      },
    },
    // Passive: Terror
    terror: {
      id: 'terror',
      name: 'Terror',
      icon: '😱',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Enemy infantry adjacent to the tank have -1 attack.',
      targetType: TARGET_TYPES.AREA,
      effect: {
        type: 'debuff_aura',
        stat: 'attack',
        value: -1,
        range: 1,
        targetUnitType: 'infantry',
      },
    },
  },

  mortar: {
    // Active: Barrage
    barrage: {
      id: 'barrage',
      name: 'Barrage',
      icon: '💣',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Attack a 3x3 area, dealing 2 damage to all units.',
      targetType: TARGET_TYPES.AREA,
      range: 5,
      minRange: 2,
      cooldown: 4,
      effect: {
        type: 'area_damage',
        damage: 2,
        radius: 1,
      },
    },
    // Active: Smoke Screen
    smokeScreen: {
      id: 'smokeScreen',
      name: 'Smoke Screen',
      icon: '💨',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Create smoke that blocks line of sight for 2 turns.',
      targetType: TARGET_TYPES.TILE,
      range: 4,
      minRange: 2,
      cooldown: 3,
      effect: {
        type: 'terrain_effect',
        effect: 'smoke',
        duration: 2,
        radius: 1,
      },
    },
    // Passive: Indirect Fire
    indirectFire: {
      id: 'indirectFire',
      name: 'Indirect Fire',
      icon: '📐',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Can attack over obstacles and elevation.',
      targetType: TARGET_TYPES.SELF,
      effect: {
        type: 'ignore_cover',
      },
    },
  },

  cavalry: {
    // Active: Charge
    charge: {
      id: 'charge',
      name: 'Cavalry Charge',
      icon: '🐎',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Move up to 4 tiles in a straight line. +2 attack to target at end.',
      targetType: TARGET_TYPES.ENEMY,
      range: 4,
      cooldown: 3,
      effect: {
        type: 'charge',
        maxDistance: 4,
        attackBonus: 2,
        requiresStraightLine: true,
      },
    },
    // Passive: Mobility
    mobility: {
      id: 'mobility',
      name: 'Mobility',
      icon: '💨',
      type: ABILITY_TYPES.PASSIVE,
      description: 'Can move after attacking (with 2 movement).',
      targetType: TARGET_TYPES.SELF,
      effect: {
        type: 'hit_and_run',
        postAttackMovement: 2,
      },
    },
    // Active: Scout
    scout: {
      id: 'scout',
      name: 'Scout',
      icon: '👁️',
      type: ABILITY_TYPES.ACTIVE,
      description: 'Reveal hidden enemies in a large area.',
      targetType: TARGET_TYPES.AREA,
      range: 0,
      cooldown: 2,
      effect: {
        type: 'reveal',
        radius: 4,
      },
    },
  },
};

/**
 * Get abilities for a unit type
 */
export function getUnitAbilities(unitType) {
  return UNIT_ABILITIES[unitType] || {};
}

/**
 * Get all active abilities for a unit
 */
export function getActiveAbilities(unitType) {
  const abilities = UNIT_ABILITIES[unitType] || {};
  return Object.values(abilities).filter(
    ability => ability.type === ABILITY_TYPES.ACTIVE
  );
}

/**
 * Get all passive abilities for a unit
 */
export function getPassiveAbilities(unitType) {
  const abilities = UNIT_ABILITIES[unitType] || {};
  return Object.values(abilities).filter(
    ability => ability.type === ABILITY_TYPES.PASSIVE
  );
}

/**
 * Check if ability is off cooldown
 */
export function isAbilityReady(unit, abilityId) {
  const cooldowns = unit.abilityCooldowns || {};
  return !cooldowns[abilityId] || cooldowns[abilityId] <= 0;
}

/**
 * Use an ability (put it on cooldown)
 */
export function useAbility(unit, abilityId) {
  const abilities = UNIT_ABILITIES[unit.type] || {};
  const ability = abilities[abilityId];

  if (!ability) return unit;

  const cooldowns = { ...(unit.abilityCooldowns || {}) };
  cooldowns[abilityId] = ability.cooldown;

  return {
    ...unit,
    abilityCooldowns: cooldowns,
  };
}

/**
 * Reduce all cooldowns by 1 (call at turn start)
 */
export function tickCooldowns(unit) {
  const cooldowns = { ...(unit.abilityCooldowns || {}) };

  Object.keys(cooldowns).forEach(key => {
    if (cooldowns[key] > 0) {
      cooldowns[key] -= 1;
    }
  });

  return {
    ...unit,
    abilityCooldowns: cooldowns,
  };
}

/**
 * Check if unit can use ability on target
 */
export function canUseAbility(unit, abilityId, target, gameState) {
  const abilities = UNIT_ABILITIES[unit.type] || {};
  const ability = abilities[abilityId];

  if (!ability) return { canUse: false, reason: 'Ability not found' };
  if (!isAbilityReady(unit, abilityId)) return { canUse: false, reason: 'On cooldown' };
  if (ability.type !== ABILITY_TYPES.ACTIVE) return { canUse: false, reason: 'Not an active ability' };

  // Check range if applicable
  if (ability.range !== undefined && target) {
    const distance = Math.abs(unit.x - target.x) + Math.abs(unit.y - target.y);
    if (distance > ability.range) return { canUse: false, reason: 'Out of range' };
    if (ability.minRange && distance < ability.minRange) return { canUse: false, reason: 'Too close' };
  }

  // Check if requires stationary
  if (ability.requiresStationary && unit.hasMoved) {
    return { canUse: false, reason: 'Cannot move before using' };
  }

  // Check target type
  if (ability.targetType === TARGET_TYPES.ALLY && target?.team !== unit.team) {
    return { canUse: false, reason: 'Must target an ally' };
  }
  if (ability.targetType === TARGET_TYPES.ENEMY && target?.team === unit.team) {
    return { canUse: false, reason: 'Must target an enemy' };
  }

  return { canUse: true };
}

/**
 * Get ability tooltip text
 */
export function getAbilityTooltip(unitType, abilityId) {
  const abilities = UNIT_ABILITIES[unitType] || {};
  const ability = abilities[abilityId];

  if (!ability) return '';

  let tooltip = `${ability.icon} ${ability.name}\n`;
  tooltip += `${ability.description}\n`;

  if (ability.cooldown > 0) {
    tooltip += `Cooldown: ${ability.cooldown} turns`;
  }

  if (ability.range !== undefined) {
    if (ability.minRange) {
      tooltip += `\nRange: ${ability.minRange}-${ability.range}`;
    } else {
      tooltip += `\nRange: ${ability.range}`;
    }
  }

  return tooltip;
}

/**
 * Apply passive ability effects to unit stats
 */
export function applyPassiveEffects(unit, allies, enemies, terrain) {
  const abilities = getPassiveAbilities(unit.type);
  let modifiers = {
    attack: 0,
    defense: 0,
    movement: 0,
    range: 0,
    maxHP: 0,
  };

  abilities.forEach(ability => {
    const effect = ability.effect;

    switch (effect.type) {
      case 'defense_bonus':
        if (effect.condition === 'in_cover' && terrain?.providesCover) {
          modifiers.defense += effect.value;
        }
        break;

      case 'damage_reduction':
        modifiers.damageReduction = effect.value;
        modifiers.minimumDamage = effect.minimum;
        break;

      case 'stealth':
        modifiers.stealthMinRange = effect.minRange;
        break;

      case 'ignore_cover':
        modifiers.ignoresCover = true;
        break;

      case 'hit_and_run':
        modifiers.postAttackMovement = effect.postAttackMovement;
        break;
    }
  });

  return modifiers;
}

/**
 * Apply aura effects from nearby allies
 */
export function applyAuraEffects(unit, allies) {
  let modifiers = {
    attack: 0,
    defense: 0,
    movement: 0,
    maxHP: 0,
  };

  allies.forEach(ally => {
    if (ally.id === unit.id) return;

    const passives = getPassiveAbilities(ally.type);
    passives.forEach(ability => {
      if (ability.effect.type === 'aura') {
        const distance = Math.abs(unit.x - ally.x) + Math.abs(unit.y - ally.y);
        if (distance <= ability.effect.range) {
          const stat = ability.effect.stat;
          if (modifiers[stat] !== undefined) {
            modifiers[stat] += ability.effect.value;
          }
        }
      }
    });
  });

  return modifiers;
}

export default {
  ABILITY_TYPES,
  TARGET_TYPES,
  UNIT_ABILITIES,
  getUnitAbilities,
  getActiveAbilities,
  getPassiveAbilities,
  isAbilityReady,
  useAbility,
  tickCooldowns,
  canUseAbility,
  getAbilityTooltip,
  applyPassiveEffects,
  applyAuraEffects,
};
