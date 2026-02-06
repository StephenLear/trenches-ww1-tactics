/**
 * WWI Tactical Game - Briefing Screen
 * Mission briefing with objectives and "Begin Battle" button
 */

import React, { useState, useEffect } from 'react';
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
import { commonStyles } from '../styles/commonStyles';
import { MISSIONS, getMissionForFaction } from '../game/missions';
import { WEATHER_TYPES, FACTIONS, DIFFICULTY_SETTINGS } from '../game/constants';
import { loadGame, saveGame } from '../game/storage';
import { getMissionPhotos, getPhotoAttribution } from '../game/historicalPhotos';

const BriefingScreen = ({ route, navigation }) => {
  const { missionId, mode = 'campaign', isReplay = false } = route.params;
  const [faction, setFaction] = useState(null);
  const [factionId, setFactionId] = useState('british');
  const [adaptedMission, setAdaptedMission] = useState(MISSIONS[missionId]);
  const [difficulty, setDifficulty] = useState('normal');
  const [missionPhotos, setMissionPhotos] = useState([]);

  useEffect(() => {
    loadFactionData();
    // Load historical photos for this mission
    const photos = getMissionPhotos(missionId);
    setMissionPhotos(photos);
  }, [missionId]);

  const loadFactionData = async () => {
    const result = await loadGame();
    const savedFactionId = result.success && result.gameState?.faction ? result.gameState.faction : 'british';
    const savedDifficulty = result.success && result.gameState?.difficulty ? result.gameState.difficulty : 'normal';
    setFactionId(savedFactionId);
    setFaction(FACTIONS[savedFactionId]);
    setDifficulty(savedDifficulty);
    // Get faction-adapted mission with potentially different briefing
    const adapted = getMissionForFaction(missionId, savedFactionId);
    setAdaptedMission(adapted);
  };

  const handleDifficultyChange = async (newDifficulty) => {
    setDifficulty(newDifficulty);
    try {
      const result = await loadGame();
      const gameState = result.success ? result.gameState : {};
      await saveGame({
        ...gameState,
        difficulty: newDifficulty,
      });
    } catch (error) {
      console.log('Error saving difficulty:', error);
    }
  };

  if (!adaptedMission) {
    return (
      <SafeAreaView style={commonStyles.containerCentered}>
        <Text style={styles.errorText}>Mission not found</Text>
      </SafeAreaView>
    );
  }

  const handleBeginBattle = () => {
    // Go to deployment screen to choose veterans
    navigation.navigate('Deployment', {
      missionId,
      mode,
    });
  };

  const weatherInfo = WEATHER_TYPES[adaptedMission.weather] || WEATHER_TYPES.clear;
  const playerUnits = adaptedMission.units.filter(u => u.team === 'player').length;
  const enemyUnits = adaptedMission.units.filter(u => u.team === 'enemy').length;

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mission Header */}
        <View style={styles.header}>
          <View style={styles.missionNumber}>
            <Text style={styles.missionNumberText}>Mission {missionId}</Text>
          </View>
          <Text style={styles.missionTitle}>{adaptedMission.name}</Text>
          <Text style={styles.missionSubtitle}>{adaptedMission.location}</Text>
          <Text style={styles.missionDate}>{adaptedMission.date}</Text>
        </View>

        {/* Mission Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weather:</Text>
            <Text style={styles.detailValue}>
              {weatherInfo.icon} {weatherInfo.name}
            </Text>
          </View>

          {weatherInfo.effects?.description && (
            <Text style={styles.weatherEffect}>
              {weatherInfo.effects.description}
            </Text>
          )}

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Your Forces:</Text>
            <Text style={styles.detailValue}>{playerUnits} units</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Enemy Forces:</Text>
            <Text style={styles.detailValue}>{enemyUnits} units</Text>
          </View>

          {faction && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Your Nation:</Text>
                <Text style={styles.detailValue}>
                  {faction.flag} {faction.name}
                </Text>
              </View>
              <Text style={styles.factionBonus}>
                {faction.bonuses.description}
              </Text>
            </>
          )}
        </View>

        {/* Briefing */}
        <View style={styles.briefingCard}>
          <Text style={styles.briefingTitle}>Mission Briefing</Text>
          <Text style={styles.briefingText}>{adaptedMission.briefing}</Text>
          {adaptedMission.isFlipped && (
            <Text style={styles.flippedNote}>
              ⚔️ Historical perspective: You are defending as the Central Powers
            </Text>
          )}
        </View>

        {/* Historical Photos */}
        {missionPhotos.length > 0 && (
          <View style={styles.photosCard}>
            <Text style={styles.photosTitle}>📷 Historical Context</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.photosScroll}
            >
              {missionPhotos.map((photo, index) => (
                <View key={photo.id || index} style={styles.photoItem}>
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoEmoji}>{photo.placeholder}</Text>
                  </View>
                  <Text style={styles.photoTitle}>{photo.title}</Text>
                  <Text style={styles.photoDescription}>{photo.description}</Text>
                  <Text style={styles.photoMeta}>
                    {photo.location} • {photo.year}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Objective */}
        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveTitle}>Primary Objective</Text>
          <Text style={styles.objectiveText}>🎯 {adaptedMission.objective}</Text>
        </View>

        {/* Difficulty Selector */}
        <View style={styles.difficultyCard}>
          <Text style={styles.difficultyTitle}>Difficulty</Text>
          <View style={styles.difficultyOptions}>
            {Object.entries(DIFFICULTY_SETTINGS).map(([key, diff]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.difficultyOption,
                  difficulty === key && styles.difficultyOptionSelected,
                ]}
                onPress={() => handleDifficultyChange(key)}
              >
                <Text style={styles.difficultyIcon}>{diff.icon}</Text>
                <Text style={[
                  styles.difficultyName,
                  difficulty === key && styles.difficultyNameSelected,
                ]}>
                  {diff.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.difficultyDescription}>
            {DIFFICULTY_SETTINGS[difficulty]?.description}
          </Text>
        </View>

        {/* Replay Notice */}
        {isReplay && (
          <View style={styles.replayNotice}>
            <Text style={styles.replayNoticeText}>
              🔄 Replaying mission for better rating
            </Text>
          </View>
        )}

        {/* Begin Button */}
        <TouchableOpacity
          style={styles.beginButton}
          onPress={handleBeginBattle}
        >
          <Text style={styles.beginButtonText}>⚔️ Begin Battle</Text>
        </TouchableOpacity>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.large,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  header: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    marginBottom: SPACING.large,
    borderWidth: 2,
    borderColor: COLORS.accent,
    ...SHADOWS.large,
  },
  missionNumber: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.small,
    marginBottom: SPACING.medium,
  },
  missionNumberText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '700',
    color: COLORS.backgroundDark,
    letterSpacing: 1,
  },
  missionTitle: {
    fontSize: FONT_SIZES.header,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  missionSubtitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.tiny,
  },
  missionDate: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  detailLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  weatherEffect: {
    fontSize: FONT_SIZES.small,
    color: COLORS.warning,
    fontStyle: 'italic',
    marginTop: SPACING.small,
  },
  factionBonus: {
    fontSize: FONT_SIZES.small,
    color: COLORS.success,
    fontStyle: 'italic',
    marginTop: SPACING.small,
  },
  flippedNote: {
    fontSize: FONT_SIZES.small,
    color: COLORS.warning,
    fontStyle: 'italic',
    marginTop: SPACING.medium,
    paddingTop: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.medium,
  },
  briefingCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    ...SHADOWS.small,
  },
  briefingTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  briefingText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.medium * 1.5,
  },
  objectiveCard: {
    backgroundColor: COLORS.militaryGreen,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.medium,
  },
  objectiveTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginBottom: SPACING.small,
  },
  objectiveText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textWhite,
    fontWeight: '500',
  },
  beginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    ...SHADOWS.large,
  },
  beginButtonText: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 1,
  },
  difficultyCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  difficultyTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  difficultyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
  },
  difficultyOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    marginHorizontal: 4,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  difficultyOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
  },
  difficultyIcon: {
    fontSize: 20,
    marginBottom: SPACING.tiny,
  },
  difficultyName: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  difficultyNameSelected: {
    color: COLORS.textPrimary,
  },
  difficultyDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  replayNotice: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    alignItems: 'center',
  },
  replayNoticeText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.backgroundDark,
  },
  // Historical Photos
  photosCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  photosTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  photosScroll: {
    marginHorizontal: -SPACING.small,
  },
  photoItem: {
    width: 180,
    marginHorizontal: SPACING.small,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
  },
  photoPlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#2a2520',
    borderRadius: RADIUS.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  photoEmoji: {
    fontSize: 48,
  },
  photoTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  photoDescription: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
    lineHeight: 14,
  },
  photoMeta: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
});

export default BriefingScreen;
