/**
 * WWI Tactical Game - PressableButton Component
 * Reusable button with visual press feedback and optional haptics
 */

import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { hapticButton } from '../game/haptics';

/**
 * Button variants
 */
export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  SUCCESS: 'success',
  GHOST: 'ghost',
  MILITARY: 'military',
};

/**
 * Button sizes
 */
export const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const PressableButton = ({
  title,
  onPress,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  haptic = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (disabled || loading) return;
    if (haptic) hapticButton();
    onPress?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          pressed: styles.primaryPressed,
        };
      case ButtonVariant.SECONDARY:
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
          pressed: styles.secondaryPressed,
        };
      case ButtonVariant.DANGER:
        return {
          container: styles.dangerContainer,
          text: styles.dangerText,
          pressed: styles.dangerPressed,
        };
      case ButtonVariant.SUCCESS:
        return {
          container: styles.successContainer,
          text: styles.successText,
          pressed: styles.successPressed,
        };
      case ButtonVariant.GHOST:
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
          pressed: styles.ghostPressed,
        };
      case ButtonVariant.MILITARY:
        return {
          container: styles.militaryContainer,
          text: styles.militaryText,
          pressed: styles.militaryPressed,
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
          pressed: styles.primaryPressed,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case ButtonSize.SMALL:
        return {
          container: styles.smallContainer,
          text: styles.smallText,
        };
      case ButtonSize.LARGE:
        return {
          container: styles.largeContainer,
          text: styles.largeText,
        };
      default:
        return {
          container: styles.mediumContainer,
          text: styles.mediumText,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        fullWidth && styles.fullWidth,
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.container,
          variantStyles.container,
          sizeStyles.container,
          pressed && variantStyles.pressed,
          disabled && styles.disabled,
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Text style={[styles.icon, variantStyles.text]}>{icon}</Text>
          )}

          {loading ? (
            <Text style={[variantStyles.text, sizeStyles.text, textStyle]}>
              Loading...
            </Text>
          ) : (
            <Text style={[variantStyles.text, sizeStyles.text, textStyle]}>
              {title}
            </Text>
          )}

          {icon && iconPosition === 'right' && (
            <Text style={[styles.icon, styles.iconRight, variantStyles.text]}>{icon}</Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: SPACING.small,
    fontSize: 18,
  },
  iconRight: {
    marginRight: 0,
    marginLeft: SPACING.small,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // Size styles
  smallContainer: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  smallText: {
    fontSize: FONT_SIZES.small,
  },
  mediumContainer: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
  },
  mediumText: {
    fontSize: FONT_SIZES.medium,
  },
  largeContainer: {
    paddingVertical: SPACING.large,
    paddingHorizontal: SPACING.xlarge,
  },
  largeText: {
    fontSize: FONT_SIZES.large,
  },

  // Primary variant
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  primaryPressed: {
    backgroundColor: COLORS.primaryDark,
  },

  // Secondary variant
  secondaryContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  secondaryPressed: {
    backgroundColor: COLORS.primary + '20',
  },

  // Danger variant
  dangerContainer: {
    backgroundColor: COLORS.danger,
  },
  dangerText: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  dangerPressed: {
    backgroundColor: '#8b0000',
  },

  // Success variant
  successContainer: {
    backgroundColor: COLORS.success,
  },
  successText: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  successPressed: {
    backgroundColor: '#1e3d0f',
  },

  // Ghost variant
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  ghostPressed: {
    backgroundColor: COLORS.backgroundLight,
  },

  // Military variant - khaki/olive theme
  militaryContainer: {
    backgroundColor: COLORS.militaryGreen,
    borderWidth: 2,
    borderColor: COLORS.militaryGreenDark,
  },
  militaryText: {
    color: COLORS.textWhite,
    fontWeight: '700',
    letterSpacing: 1,
  },
  militaryPressed: {
    backgroundColor: COLORS.militaryGreenDark,
  },
});

export default PressableButton;
