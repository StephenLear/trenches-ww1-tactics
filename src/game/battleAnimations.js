/**
 * WWI Tactical Game - Battle Animations
 * Enhanced visual feedback for attacks, deaths, and movement
 */

import { Animated, Easing } from 'react-native';

// Animation timing constants
export const ANIMATION_DURATIONS = {
  QUICK: 150,
  FAST: 250,
  NORMAL: 400,
  SLOW: 600,
  VERY_SLOW: 1000,
};

// Animation types
export const ANIMATION_TYPES = {
  MOVE: 'move',
  ATTACK: 'attack',
  DAMAGE: 'damage',
  DEATH: 'death',
  HEAL: 'heal',
  CRITICAL: 'critical',
  MISS: 'miss',
  ABILITY: 'ability',
  SPAWN: 'spawn',
  RETREAT: 'retreat',
};

// Visual effect emojis for different actions
export const BATTLE_EFFECTS = {
  // Attack effects
  rifle_shot: ['💥', '🔥'],
  machine_gun: ['💥', '💥', '💥'],
  sniper_shot: ['🎯', '💥'],
  artillery: ['💣', '💥', '🔥'],
  bayonet: ['⚔️', '💢'],
  tank_shot: ['💣', '💥'],
  mortar: ['💣', '💥'],
  cavalry_charge: ['⚔️', '🐎'],

  // Damage effects
  light_damage: ['💢'],
  heavy_damage: ['💢', '💔'],
  critical_hit: ['💥', '⭐', '💀'],

  // Death effects
  infantry_death: ['💀', '🪦'],
  tank_destroyed: ['💥', '🔥', '💨'],
  officer_death: ['💀', '⭐', '🪦'],

  // Other effects
  heal: ['💚', '✨'],
  rally: ['📣', '💪'],
  miss: ['💨'],
  dodge: ['💨', '✨'],
  shield: ['🛡️', '✨'],
  suppressed: ['😰', '💢'],
  retreat: ['🏃', '💨'],
  spawn: ['✨', '⭐'],
};

/**
 * Create animated value for a unit
 */
export function createUnitAnimatedValues() {
  return {
    position: new Animated.ValueXY({ x: 0, y: 0 }),
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    rotation: new Animated.Value(0),
    shake: new Animated.Value(0),
    flash: new Animated.Value(0),
  };
}

/**
 * Movement animation - smooth slide to new position
 */
export function animateMovement(animatedValue, toX, toY, duration = ANIMATION_DURATIONS.NORMAL) {
  return new Promise((resolve) => {
    Animated.timing(animatedValue.position, {
      toValue: { x: toX, y: toY },
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(resolve);
  });
}

/**
 * Attack animation - lunge forward and back
 */
export function animateAttack(animatedValue, targetDirection, duration = ANIMATION_DURATIONS.FAST) {
  const lungeDistance = 10;
  const lungeX = targetDirection.x * lungeDistance;
  const lungeY = targetDirection.y * lungeDistance;

  return new Promise((resolve) => {
    Animated.sequence([
      // Lunge forward
      Animated.timing(animatedValue.position, {
        toValue: { x: lungeX, y: lungeY },
        duration: duration / 3,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Return to position
      Animated.timing(animatedValue.position, {
        toValue: { x: 0, y: 0 },
        duration: duration / 3,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Damage animation - shake and flash red
 */
export function animateDamage(animatedValue, isCritical = false, duration = ANIMATION_DURATIONS.FAST) {
  const shakeIntensity = isCritical ? 8 : 4;
  const shakeCount = isCritical ? 4 : 2;

  return new Promise((resolve) => {
    Animated.parallel([
      // Shake effect
      Animated.sequence(
        Array(shakeCount).fill(null).flatMap(() => [
          Animated.timing(animatedValue.shake, {
            toValue: shakeIntensity,
            duration: duration / (shakeCount * 4),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue.shake, {
            toValue: -shakeIntensity,
            duration: duration / (shakeCount * 4),
            useNativeDriver: true,
          }),
        ]).concat([
          Animated.timing(animatedValue.shake, {
            toValue: 0,
            duration: duration / (shakeCount * 4),
            useNativeDriver: true,
          }),
        ])
      ),
      // Flash effect
      Animated.sequence([
        Animated.timing(animatedValue.flash, {
          toValue: 1,
          duration: duration / 4,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.flash, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]),
    ]).start(resolve);
  });
}

/**
 * Death animation - fade out and shrink
 */
export function animateDeath(animatedValue, duration = ANIMATION_DURATIONS.SLOW) {
  return new Promise((resolve) => {
    Animated.parallel([
      // Fade out
      Animated.timing(animatedValue.opacity, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Shrink
      Animated.timing(animatedValue.scale, {
        toValue: 0.5,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Slight rotation
      Animated.timing(animatedValue.rotation, {
        toValue: 0.1,
        duration,
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Heal animation - pulse and glow
 */
export function animateHeal(animatedValue, duration = ANIMATION_DURATIONS.NORMAL) {
  return new Promise((resolve) => {
    Animated.sequence([
      // Pulse up
      Animated.timing(animatedValue.scale, {
        toValue: 1.2,
        duration: duration / 3,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Return to normal
      Animated.timing(animatedValue.scale, {
        toValue: 1,
        duration: duration / 3,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Spawn animation - fade in and grow
 */
export function animateSpawn(animatedValue, duration = ANIMATION_DURATIONS.NORMAL) {
  // Start invisible and small
  animatedValue.opacity.setValue(0);
  animatedValue.scale.setValue(0.5);

  return new Promise((resolve) => {
    Animated.parallel([
      Animated.timing(animatedValue.opacity, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue.scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Miss animation - target dodges
 */
export function animateMiss(animatedValue, duration = ANIMATION_DURATIONS.FAST) {
  return new Promise((resolve) => {
    Animated.sequence([
      Animated.timing(animatedValue.position, {
        toValue: { x: 8, y: 0 },
        duration: duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue.position, {
        toValue: { x: 0, y: 0 },
        duration: duration / 4,
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Ability use animation - glow and pulse
 */
export function animateAbility(animatedValue, duration = ANIMATION_DURATIONS.NORMAL) {
  return new Promise((resolve) => {
    Animated.sequence([
      // Glow/pulse
      Animated.parallel([
        Animated.timing(animatedValue.scale, {
          toValue: 1.3,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.flash, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]),
      // Return to normal
      Animated.parallel([
        Animated.timing(animatedValue.scale, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.flash, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]),
    ]).start(resolve);
  });
}

/**
 * Retreat animation - quick backward movement
 */
export function animateRetreat(animatedValue, retreatDirection, duration = ANIMATION_DURATIONS.FAST) {
  const retreatDistance = 15;
  const retreatX = -retreatDirection.x * retreatDistance;
  const retreatY = -retreatDirection.y * retreatDistance;

  return new Promise((resolve) => {
    Animated.sequence([
      Animated.timing(animatedValue.position, {
        toValue: { x: retreatX, y: retreatY },
        duration: duration / 2,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue.position, {
        toValue: { x: 0, y: 0 },
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]).start(resolve);
  });
}

/**
 * Get transform style from animated values
 */
export function getAnimatedTransform(animatedValue) {
  return {
    transform: [
      { translateX: Animated.add(animatedValue.position.x, animatedValue.shake) },
      { translateY: animatedValue.position.y },
      { scale: animatedValue.scale },
      {
        rotate: animatedValue.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
    opacity: animatedValue.opacity,
  };
}

/**
 * Get flash overlay style
 */
export function getFlashStyle(animatedValue, color = 'rgba(255, 0, 0, 0.5)') {
  return {
    backgroundColor: animatedValue.flash.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', color],
    }),
  };
}

/**
 * Create a floating text animation (for damage numbers, etc.)
 */
export function createFloatingTextAnimation(startY = 0) {
  const animatedValue = {
    y: new Animated.Value(startY),
    opacity: new Animated.Value(1),
    scale: new Animated.Value(0.5),
  };

  const animate = () => {
    return new Promise((resolve) => {
      Animated.parallel([
        // Float up
        Animated.timing(animatedValue.y, {
          toValue: startY - 40,
          duration: ANIMATION_DURATIONS.SLOW,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        // Fade out
        Animated.timing(animatedValue.opacity, {
          toValue: 0,
          duration: ANIMATION_DURATIONS.SLOW,
          delay: ANIMATION_DURATIONS.FAST,
          useNativeDriver: true,
        }),
        // Pop in
        Animated.spring(animatedValue.scale, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start(resolve);
    });
  };

  return { animatedValue, animate };
}

/**
 * Batch animate multiple units
 */
export async function animateSequence(animations) {
  for (const animation of animations) {
    await animation();
  }
}

/**
 * Animate multiple units in parallel
 */
export function animateParallel(animations) {
  return Promise.all(animations.map(anim => anim()));
}

/**
 * Get effect emojis for an action
 */
export function getEffectEmojis(effectType) {
  return BATTLE_EFFECTS[effectType] || ['💥'];
}

/**
 * Create an explosion effect sequence
 */
export function createExplosionSequence() {
  return ['💥', '🔥', '💨'];
}

/**
 * Animation state manager for a battle
 */
export class BattleAnimationManager {
  constructor() {
    this.unitAnimations = new Map();
    this.floatingTexts = [];
    this.isAnimating = false;
  }

  registerUnit(unitId) {
    if (!this.unitAnimations.has(unitId)) {
      this.unitAnimations.set(unitId, createUnitAnimatedValues());
    }
    return this.unitAnimations.get(unitId);
  }

  unregisterUnit(unitId) {
    this.unitAnimations.delete(unitId);
  }

  getUnitAnimation(unitId) {
    return this.unitAnimations.get(unitId);
  }

  async playAttackAnimation(attackerId, defenderId, result) {
    this.isAnimating = true;

    const attackerAnim = this.getUnitAnimation(attackerId);
    const defenderAnim = this.getUnitAnimation(defenderId);

    if (attackerAnim && defenderAnim) {
      // Attacker lunges
      await animateAttack(attackerAnim, { x: 1, y: 0 });

      // Defender reacts
      if (result.hit) {
        await animateDamage(defenderAnim, result.isCritical);

        if (result.killed) {
          await animateDeath(defenderAnim);
        }
      } else {
        await animateMiss(defenderAnim);
      }
    }

    this.isAnimating = false;
  }

  async playMoveAnimation(unitId, fromX, fromY, toX, toY) {
    this.isAnimating = true;

    const unitAnim = this.getUnitAnimation(unitId);
    if (unitAnim) {
      // Calculate pixel offset (this would depend on your tile size)
      const tileSize = 50; // Adjust based on your game
      const deltaX = (toX - fromX) * tileSize;
      const deltaY = (toY - fromY) * tileSize;

      await animateMovement(unitAnim, deltaX, deltaY);

      // Reset position (the actual unit position is handled by game state)
      unitAnim.position.setValue({ x: 0, y: 0 });
    }

    this.isAnimating = false;
  }

  async playHealAnimation(unitId) {
    const unitAnim = this.getUnitAnimation(unitId);
    if (unitAnim) {
      await animateHeal(unitAnim);
    }
  }

  async playAbilityAnimation(unitId) {
    const unitAnim = this.getUnitAnimation(unitId);
    if (unitAnim) {
      await animateAbility(unitAnim);
    }
  }

  reset() {
    this.unitAnimations.forEach((anim) => {
      anim.position.setValue({ x: 0, y: 0 });
      anim.scale.setValue(1);
      anim.opacity.setValue(1);
      anim.rotation.setValue(0);
      anim.shake.setValue(0);
      anim.flash.setValue(0);
    });
    this.isAnimating = false;
  }
}

export default {
  ANIMATION_DURATIONS,
  ANIMATION_TYPES,
  BATTLE_EFFECTS,
  createUnitAnimatedValues,
  animateMovement,
  animateAttack,
  animateDamage,
  animateDeath,
  animateHeal,
  animateSpawn,
  animateMiss,
  animateAbility,
  animateRetreat,
  getAnimatedTransform,
  getFlashStyle,
  createFloatingTextAnimation,
  animateSequence,
  animateParallel,
  getEffectEmojis,
  createExplosionSequence,
  BattleAnimationManager,
};
