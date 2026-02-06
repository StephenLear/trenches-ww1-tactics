/**
 * WWI Tactical Game - Defeat Screen
 * Mission failed with retry option
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { MISSIONS } from '../game/missions';

const DefeatScreen = ({ route, navigation }) => {
  const { missionId } = route.params;
  const mission = MISSIONS[missionId];

  const handleRetry = () => {
    navigation.replace('Battle', {
      missionId,
      mode: 'campaign',
    });
  };

  const handleReturnToMenu = () => {
    navigation.navigate('Menu');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Defeat Banner */}
        <View style={styles.banner}>
          <Text style={styles.defeatEmoji}>💀</Text>
          <Text style={styles.defeatTitle}>DEFEAT</Text>
          <Text style={styles.defeatSubtitle}>Mission Failed</Text>
        </View>

        {/* Mission Info */}
        <View style={styles.missionCard}>
          <Text style={styles.missionName}>{mission?.name || 'Mission'}</Text>
          <Text style={styles.missionLocation}>
            {mission?.location || ''} • {mission?.date || ''}
          </Text>
        </View>

        {/* Message */}
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>All Units Lost</Text>
          <Text style={styles.messageText}>
            Your forces have been overwhelmed by the enemy. The mission must be
            attempted again.
          </Text>
          <Text style={styles.messageText}>
            Veterans and progress are not lost - you can retry with the same
            forces.
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Strategy Tips</Text>
          <Text style={styles.tipText}>• Use terrain to your advantage</Text>
          <Text style={styles.tipText}>• Protect weaker units</Text>
          <Text style={styles.tipText}>• Focus fire on dangerous enemies</Text>
          <Text style={styles.tipText}>• Don't overextend your forces</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>🔄 Retry Mission</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleReturnToMenu}
          >
            <Text style={styles.menuButtonText}>Return to Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  banner: {
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    marginBottom: SPACING.large,
    ...SHADOWS.large,
  },
  defeatEmoji: {
    fontSize: 64,
    marginBottom: SPACING.medium,
  },
  defeatTitle: {
    fontSize: FONT_SIZES.huge,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 2,
    marginBottom: SPACING.small,
  },
  defeatSubtitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.textWhite,
    fontWeight: '500',
  },
  missionCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  missionName: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  missionLocation: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  messageCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
  },
  messageTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  messageText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.medium * 1.5,
    marginBottom: SPACING.small,
  },
  tipsCard: {
    backgroundColor: COLORS.militaryBrown,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  tipsTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginBottom: SPACING.medium,
  },
  tipText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textWhite,
    marginBottom: SPACING.small,
  },
  buttonContainer: {
    gap: SPACING.medium,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  retryButtonText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default DefeatScreen;
