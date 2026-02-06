/**
 * WWI Tactical Game - Tooltip Component
 * Tutorial hints and contextual help
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Tooltip position relative to anchor
 */
export const TooltipPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

const Tooltip = ({
  visible = false,
  message,
  title,
  position = TooltipPosition.BOTTOM,
  onDismiss,
  showArrow = true,
  autoHide = 0, // ms, 0 = don't auto hide
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (autoHide > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoHide);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 10,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  if (!visible && fadeAnim._value === 0) return null;

  const getSlideTransform = () => {
    switch (position) {
      case TooltipPosition.TOP:
        return { translateY: Animated.multiply(slideAnim, -1) };
      case TooltipPosition.BOTTOM:
        return { translateY: slideAnim };
      case TooltipPosition.LEFT:
        return { translateX: Animated.multiply(slideAnim, -1) };
      case TooltipPosition.RIGHT:
        return { translateX: slideAnim };
      default:
        return { translateY: slideAnim };
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        styles[position],
        {
          opacity: fadeAnim,
          transform: [getSlideTransform()],
        },
        style,
      ]}
    >
      {showArrow && (
        <View style={[styles.arrow, styles[`arrow${position.charAt(0).toUpperCase() + position.slice(1)}`]]} />
      )}
      <TouchableOpacity
        style={styles.content}
        onPress={handleDismiss}
        activeOpacity={0.9}
      >
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.dismiss}>Tap to dismiss</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Tutorial step indicator with tooltips
 */
export const TutorialOverlay = ({
  visible = false,
  steps = [],
  currentStep = 0,
  onNext,
  onSkip,
  onComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      onNext?.();
    }
  };

  return (
    <Animated.View style={[styles.overlayContainer, { opacity: fadeAnim }]}>
      <View style={styles.overlayContent}>
        <View style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep && styles.stepDotActive,
                index < currentStep && styles.stepDotComplete,
              ]}
            />
          ))}
        </View>

        {step.icon && <Text style={styles.stepIcon}>{step.icon}</Text>}
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepMessage}>{step.message}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip Tutorial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {isLastStep ? 'Got it!' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

/**
 * Hint badge - small contextual help indicator
 */
export const HintBadge = ({ hint, onPress }) => (
  <TouchableOpacity style={styles.hintBadge} onPress={onPress}>
    <Text style={styles.hintIcon}>?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxWidth: SCREEN_WIDTH - 40,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.accent,
    ...SHADOWS.large,
    zIndex: 1000,
  },
  content: {
    padding: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: SPACING.small,
  },
  message: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  dismiss: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    marginTop: SPACING.small,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Positions
  top: {
    bottom: '100%',
    marginBottom: SPACING.small,
  },
  bottom: {
    top: '100%',
    marginTop: SPACING.small,
  },
  left: {
    right: '100%',
    marginRight: SPACING.small,
  },
  right: {
    left: '100%',
    marginLeft: SPACING.small,
  },

  // Arrow
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },
  arrowTop: {
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    borderWidth: 8,
    borderTopColor: COLORS.accent,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowBottom: {
    top: -8,
    left: '50%',
    marginLeft: -8,
    borderWidth: 8,
    borderBottomColor: COLORS.accent,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Tutorial overlay
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    margin: SPACING.large,
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  stepIndicator: {
    flexDirection: 'row',
    marginBottom: SPACING.large,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.backgroundDark,
    marginHorizontal: 4,
  },
  stepDotActive: {
    backgroundColor: COLORS.accent,
    transform: [{ scale: 1.2 }],
  },
  stepDotComplete: {
    backgroundColor: COLORS.success,
  },
  stepIcon: {
    fontSize: 48,
    marginBottom: SPACING.medium,
  },
  stepTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  stepMessage: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.large,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  skipButton: {
    padding: SPACING.medium,
  },
  skipText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  nextButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.medium,
  },
  nextText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.backgroundDark,
  },

  // Hint badge
  hintBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintIcon: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.backgroundDark,
  },
});

export default Tooltip;
