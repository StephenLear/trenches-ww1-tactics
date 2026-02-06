/**
 * WWI Tactical Game - Unit Sprite Component
 * Unit display with icon, health bar, status indicators, and battle animations
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, TEAM_COLORS, Z_INDEX } from '../styles/colors';
import { UNIT_TYPES } from '../game/constants';

const UnitSprite = ({
  unit,
  isSelected = false,
  size = 40,
  showHealthBar = true,
  showRank = true,
  animationState = null, // 'attack', 'damage', 'heal', 'death', 'move'
  onAnimationComplete = null,
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Handle animation states
  useEffect(() => {
    if (!animationState) return;

    switch (animationState) {
      case 'attack':
        playAttackAnimation();
        break;
      case 'damage':
        playDamageAnimation();
        break;
      case 'critical':
        playCriticalAnimation();
        break;
      case 'heal':
        playHealAnimation();
        break;
      case 'death':
        playDeathAnimation();
        break;
      case 'spawn':
        playSpawnAnimation();
        break;
      case 'select':
        playSelectAnimation();
        break;
    }
  }, [animationState]);

  // Pulse animation for selected units
  useEffect(() => {
    if (isSelected) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.08,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isSelected]);

  const playAttackAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: -5,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete?.());
  };

  const playDamageAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -4, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(flashAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(flashAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]),
    ]).start(() => onAnimationComplete?.());
  };

  const playCriticalAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -4, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(flashAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated.timing(flashAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
        Animated.timing(flashAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated.timing(flashAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]),
    ]).start(() => onAnimationComplete?.());
  };

  const playHealAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete?.());
  };

  const playDeathAnimation = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete?.());
  };

  const playSpawnAnimation = () => {
    scaleAnim.setValue(0.5);
    opacityAnim.setValue(0);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete?.());
  };

  const playSelectAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete?.());
  };
  if (!unit || unit.hp <= 0) return null;

  const unitType = UNIT_TYPES[unit.type] || {};
  const icon = unitType.icon || '?';
  const teamColor = TEAM_COLORS[unit.team] || COLORS.textWhite;
  const healthPercent = (unit.hp / unit.maxHp) * 100;

  // Health bar color based on percentage
  const getHealthBarColor = () => {
    if (healthPercent > 66) return COLORS.healthFull;
    if (healthPercent > 33) return COLORS.healthMedium;
    return COLORS.healthLow;
  };

  // Rank icon
  const getRankIcon = () => {
    if (!unit.rank) return null;
    switch (unit.rank) {
      case 'sergeant':
        return '⚌';
      case 'corporal':
        return '⚊';
      default:
        return null;
    }
  };

  // Flash overlay color interpolation
  const flashOverlayColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(255, 100, 100, 0.6)'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          opacity: opacityAnim,
          transform: [
            { scale: scaleAnim },
            { translateX: shakeAnim },
            { translateY: bounceAnim },
          ],
        },
      ]}
    >
      {/* Selection Indicator */}
      {isSelected && <View style={styles.selectedRing} />}

      {/* Team Color Border */}
      <View
        style={[
          styles.unitCircle,
          { borderColor: teamColor, width: size, height: size },
        ]}
      >
        {/* Unit Icon */}
        <Text style={[styles.unitIcon, { fontSize: size * 0.5 }]}>{icon}</Text>

        {/* Rank Badge */}
        {showRank && getRankIcon() && (
          <View style={styles.rankBadge}>
            <Text style={styles.rankIcon}>{getRankIcon()}</Text>
          </View>
        )}

        {/* Status Effects Indicator */}
        {unit.statusEffects && unit.statusEffects.length > 0 && (
          <View style={styles.statusIndicator}>
            <Text style={styles.statusDot}>●</Text>
          </View>
        )}

        {/* Flash Overlay for damage */}
        <Animated.View
          style={[
            styles.flashOverlay,
            { backgroundColor: flashOverlayColor },
          ]}
        />
      </View>

      {/* Health Bar */}
      {showHealthBar && unit.maxHp > 1 && (
        <View style={styles.healthBarContainer}>
          <View style={styles.healthBarBg}>
            <View
              style={[
                styles.healthBarFill,
                {
                  width: `${healthPercent}%`,
                  backgroundColor: getHealthBarColor(),
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Action Indicators */}
      {(unit.hasMoved || unit.hasAttacked) && (
        <View style={styles.actionIndicators}>
          {unit.hasMoved && <View style={styles.actionDot} />}
          {unit.hasAttacked && <View style={styles.actionDot} />}
        </View>
      )}

      {/* Veteran Star */}
      {unit.isVeteran && (
        <View style={styles.veteranBadge}>
          <Text style={styles.veteranStar}>⭐</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.units,
  },
  selectedRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.accent,
    zIndex: 1,
  },
  unitCircle: {
    borderRadius: 999,
    borderWidth: 2,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  unitIcon: {
    textAlign: 'center',
  },
  rankBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  rankIcon: {
    fontSize: 8,
    color: COLORS.backgroundDark,
    fontWeight: '700',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    fontSize: 8,
    color: COLORS.statusBuff,
  },
  healthBarContainer: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  healthBarBg: {
    width: '90%',
    height: 4,
    backgroundColor: COLORS.healthBg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionIndicators: {
    position: 'absolute',
    top: -6,
    left: -6,
    flexDirection: 'row',
    gap: 2,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
  },
  veteranBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  veteranStar: {
    fontSize: 10,
  },
});

export default UnitSprite;
