/**
 * WWI Tactical Game - LoadingOverlay Component
 * Full-screen loading indicator for async operations
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../styles/colors';

/**
 * Loading messages to display randomly
 */
const LOADING_MESSAGES = [
  'Preparing the trenches...',
  'Rallying the troops...',
  'Loading supplies...',
  'Consulting the maps...',
  'Reviewing orders...',
  'Awaiting reinforcements...',
  'Checking artillery positions...',
  'Briefing the officers...',
];

const LoadingOverlay = ({
  visible = false,
  message = null,
  transparent = false,
  showSpinner = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Random loading message if none provided
  const displayMessage = message ||
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Pulse animation for text
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim },
          transparent && styles.transparent,
        ]}
      >
        <View style={styles.content}>
          {showSpinner && (
            <ActivityIndicator
              size="large"
              color={COLORS.accent}
              style={styles.spinner}
            />
          )}
          <Animated.Text
            style={[styles.message, { opacity: pulseAnim }]}
          >
            {displayMessage}
          </Animated.Text>
        </View>
      </Animated.View>
    </Modal>
  );
};

/**
 * Inline loading indicator (not full screen)
 */
export const LoadingIndicator = ({ message, size = 'small' }) => (
  <View style={styles.inlineContainer}>
    <ActivityIndicator
      size={size}
      color={COLORS.accent}
    />
    {message && (
      <Text style={styles.inlineMessage}>{message}</Text>
    )}
  </View>
);

/**
 * Skeleton loader for content placeholders
 */
export const SkeletonLoader = ({ width = '100%', height = 20, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={[styles.skeleton, { width, height }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 21, 16, 0.95)',
  },
  transparent: {
    backgroundColor: 'rgba(26, 21, 16, 0.7)',
  },
  content: {
    alignItems: 'center',
    padding: SPACING.xlarge,
  },
  spinner: {
    marginBottom: SPACING.medium,
  },
  message: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.accent,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Inline styles
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.medium,
  },
  inlineMessage: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  // Skeleton styles
  skeleton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  shimmer: {
    width: 200,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
  },
});

export default LoadingOverlay;
