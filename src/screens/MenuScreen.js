/**
 * WWI Tactical Game - Menu Screen
 * Main menu with campaign, skirmish, and command HQ access
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { MISSIONS } from '../game/missions';
import { loadGame } from '../game/storage';
import { playSFX, initializeAudio, getAudioSettings, toggleSFX, toggleMusic } from '../audio/AudioManager';

const MenuScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize audio and reload game state whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      initializeAudio();
      loadGameState();
      // Load sound settings
      const settings = getAudioSettings();
      setSoundEnabled(settings.sfxEnabled || settings.musicEnabled);
    }, [])
  );

  const loadGameState = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        setGameState(result.gameState);
      }
    } catch (error) {
      console.log('No saved game found or error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMissionSelect = (missionId) => {
    playSFX('click');
    navigation.navigate('Briefing', {
      missionId,
      mode: 'campaign',
    });
  };

  const handleCommandHQ = () => {
    playSFX('click');
    navigation.navigate('CommandHQ', {
      gameState,
    });
  };

  const handleSkirmish = () => {
    playSFX('click');
    navigation.navigate('Skirmish');
  };

  const getNextAvailableMission = () => {
    if (!gameState || !gameState.completedMissions) return 1;
    // Find the highest completed mission and return the next one
    const completed = gameState.completedMissions.map(m => Number(m));
    if (completed.length === 0) return 1;
    return Math.max(...completed) + 1;
  };

  const isMissionUnlocked = (missionId) => {
    if (missionId === 1) return true;
    if (!gameState || !gameState.completedMissions) return false;
    // Convert all to numbers for comparison to avoid type issues
    const completed = gameState.completedMissions.map(m => Number(m));
    // Mission is unlocked if the previous mission is completed
    return completed.includes(missionId - 1);
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.containerCentered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const nextMission = getNextAvailableMission();
  const totalMissions = Object.keys(MISSIONS).length;
  const completedCount = gameState?.completedMissions?.length || 0;

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with Logo */}
      <View style={styles.header}>
        {/* Sound Toggle - Top Right */}
        <TouchableOpacity
          style={styles.soundToggle}
          onPress={async () => {
            await toggleSFX();
            await toggleMusic();
            const settings = getAudioSettings();
            setSoundEnabled(settings.sfxEnabled || settings.musicEnabled);
          }}
        >
          <Text style={styles.soundToggleIcon}>
            {soundEnabled ? '🔊' : '🔇'}
          </Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>WWI Tactical</Text>
        <Text style={styles.subtitle}>1914-1918</Text>
      </View>

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Campaign Progress</Text>
          <Text style={styles.progressText}>
            {completedCount} / {totalMissions} Missions Complete
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(completedCount / totalMissions) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          {/* Continue Campaign */}
          {nextMission <= totalMissions && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleMissionSelect(nextMission)}
            >
              <Text style={styles.primaryButtonText}>
                {completedCount === 0 ? '▶ Start Campaign' : '▶ Continue Campaign'}
              </Text>
              <Text style={styles.buttonSubtext}>
                {MISSIONS[nextMission]?.name || 'Mission ' + nextMission}
              </Text>
            </TouchableOpacity>
          )}

          {/* Campaign Complete Message */}
          {nextMission > totalMissions && (
            <View style={styles.completeCard}>
              <Text style={styles.completeText}>🎖️</Text>
              <Text style={styles.completeTitle}>Campaign Complete!</Text>
              <Text style={styles.completeSubtext}>
                You've fought through the entire Great War
              </Text>
            </View>
          )}

          {/* Command HQ */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCommandHQ}
          >
            <Text style={styles.secondaryButtonText}>🎖️ Command HQ</Text>
            <Text style={styles.buttonSubtext}>
              Tech Tree • Veteran Roster • Shop
            </Text>
          </TouchableOpacity>

          {/* Skirmish Mode */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSkirmish}
          >
            <Text style={styles.secondaryButtonText}>⚔️ Skirmish Mode</Text>
            <Text style={styles.buttonSubtext}>
              Quick Battle • Custom Settings
            </Text>
          </TouchableOpacity>

          {/* War Diary */}
          <TouchableOpacity
            style={styles.diaryButton}
            onPress={() => navigation.navigate('WarDiary')}
          >
            <Text style={styles.diaryButtonText}>📜 War Diary</Text>
            <Text style={styles.buttonSubtext}>
              Your Soldier's Journey
            </Text>
          </TouchableOpacity>

          {/* Row of smaller buttons - Row 1 */}
          <View style={styles.buttonRow}>
            {/* Medals */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Medals')}
            >
              <Text style={styles.smallButtonIcon}>🎖️</Text>
              <Text style={styles.smallButtonText}>Medals</Text>
            </TouchableOpacity>

            {/* Armory/Upgrades */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Upgrades')}
            >
              <Text style={styles.smallButtonIcon}>⚙️</Text>
              <Text style={styles.smallButtonText}>Armory</Text>
            </TouchableOpacity>

            {/* Statistics */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Statistics')}
            >
              <Text style={styles.smallButtonIcon}>📊</Text>
              <Text style={styles.smallButtonText}>Stats</Text>
            </TouchableOpacity>
          </View>

          {/* Row of smaller buttons - Row 2 */}
          <View style={styles.buttonRow}>
            {/* Tutorial */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Tutorial')}
            >
              <Text style={styles.smallButtonIcon}>📖</Text>
              <Text style={styles.smallButtonText}>How to Play</Text>
            </TouchableOpacity>

            {/* Leaderboards */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Leaderboard')}
            >
              <Text style={styles.smallButtonIcon}>🏆</Text>
              <Text style={styles.smallButtonText}>Records</Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.smallButtonIcon}>🔧</Text>
              <Text style={styles.smallButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Row of smaller buttons - Row 3 */}
          <View style={styles.buttonRow}>
            {/* Memorial */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Memorial')}
            >
              <Text style={styles.smallButtonIcon}>🌺</Text>
              <Text style={styles.smallButtonText}>Memorial</Text>
            </TouchableOpacity>

            {/* Achievements */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('Achievements')}
            >
              <Text style={styles.smallButtonIcon}>🏅</Text>
              <Text style={styles.smallButtonText}>Trophies</Text>
            </TouchableOpacity>

            {/* Campaign Map */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => navigation.navigate('CampaignMap')}
            >
              <Text style={styles.smallButtonIcon}>🗺️</Text>
              <Text style={styles.smallButtonText}>War Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mission List */}
        <View style={styles.missionListContainer}>
          <Text style={styles.sectionTitle}>All Missions</Text>

          {Object.entries(MISSIONS).map(([id, mission]) => {
            const missionId = parseInt(id);
            const unlocked = isMissionUnlocked(missionId);
            // Convert to numbers for comparison to handle type issues
            const completedMissions = (gameState?.completedMissions || []).map(m => Number(m));
            const completed = completedMissions.includes(missionId);

            return (
              <TouchableOpacity
                key={missionId}
                style={[
                  styles.missionItem,
                  !unlocked && styles.missionItemLocked,
                  completed && styles.missionItemCompleted,
                ]}
                onPress={() => unlocked && navigation.navigate('Briefing', {
                  missionId,
                  mode: 'campaign',
                  isReplay: completed,
                })}
                disabled={!unlocked}
              >
                <View style={[
                  styles.missionNumber,
                  completed && styles.missionNumberCompleted,
                ]}>
                  <Text style={styles.missionNumberText}>{missionId}</Text>
                </View>

                <View style={styles.missionInfo}>
                  <Text
                    style={[
                      styles.missionName,
                      !unlocked && styles.missionNameLocked,
                    ]}
                  >
                    {unlocked ? mission.name : '🔒 Locked'}
                  </Text>
                  {unlocked && (
                    <Text style={styles.missionLocation}>
                      {mission.location} • {mission.date}
                      {completed && ' • 🔄 Replay'}
                    </Text>
                  )}
                </View>

                {completed && (
                  <View style={styles.completeBadge}>
                    <Text style={styles.completeBadgeText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: SPACING.large,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
    position: 'relative',
  },
  soundToggle: {
    position: 'absolute',
    top: SPACING.medium,
    right: SPACING.medium,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  soundToggleIcon: {
    fontSize: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SPACING.medium,
    borderRadius: 20,
  },
  title: {
    fontSize: FONT_SIZES.huge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
    letterSpacing: 4,
  },
  loadingText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.large,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  progressCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.medium,
  },
  progressTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  progressText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.medium,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.small,
  },
  actionsContainer: {
    marginBottom: SPACING.large,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    alignItems: 'center',
    marginBottom: SPACING.medium,
    ...SHADOWS.medium,
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: SPACING.tiny,
  },
  secondaryButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    alignItems: 'center',
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  diaryButton: {
    backgroundColor: '#2a2015',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    alignItems: 'center',
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: '#5c3d1a',
  },
  diaryButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#d4c4a8',
    marginBottom: SPACING.tiny,
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  buttonSubtext: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  completeCard: {
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    marginBottom: SPACING.medium,
    ...SHADOWS.medium,
  },
  completeText: {
    fontSize: 48,
    marginBottom: SPACING.medium,
  },
  completeTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: SPACING.small,
  },
  completeSubtext: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  missionListContainer: {
    marginBottom: SPACING.large,
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  missionItemLocked: {
    opacity: 0.5,
  },
  missionItemCompleted: {
    borderColor: COLORS.success,
    borderWidth: 1,
  },
  missionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  missionNumberCompleted: {
    backgroundColor: COLORS.success,
  },
  missionNumberText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  missionInfo: {
    flex: 1,
  },
  missionName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  missionNameLocked: {
    color: COLORS.textMuted,
  },
  missionLocation: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  completeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBadgeText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
    gap: SPACING.small,
  },
  smallButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallButtonIcon: {
    fontSize: 24,
    marginBottom: SPACING.tiny,
  },
  smallButtonText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default MenuScreen;
