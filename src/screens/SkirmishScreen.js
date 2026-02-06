/**
 * WWI Tactical Game - Skirmish Screen
 * Quick battle setup with customization options
 */

import React, { useState } from 'react';
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
import { MISSIONS } from '../game/missions';
import { DIFFICULTY_SETTINGS, WEATHER_TYPES } from '../game/constants';

// Curated selection of missions for skirmish - varied gameplay styles
const SKIRMISH_CATEGORIES = {
  trench: {
    name: '🏚️ Trench Warfare',
    description: 'Classic defensive battles',
    missions: [1, 8, 14, 21],
  },
  assault: {
    name: '⚔️ Assault Operations',
    description: 'Attack enemy positions',
    missions: [6, 12, 15, 22],
  },
  tanks: {
    name: '🚜 Tank Battles',
    description: 'Armored warfare',
    missions: [3, 11, 17, 25],
  },
  survival: {
    name: '🛡️ Survival Mode',
    description: 'Hold out against waves',
    missions: [8, 20, 21, 24],
  },
  special: {
    name: '⭐ Special Operations',
    description: 'Unique tactical challenges',
    missions: [4, 9, 16, 23],
  },
  forest: {
    name: '🌲 Forest Fighting',
    description: 'Combat in difficult terrain',
    missions: [7, 16, 18, 19],
  },
};

const SKIRMISH_DIFFICULTIES = {
  easy: {
    name: 'Recruit',
    icon: '🌟',
    description: 'Enemies deal less damage',
    multiplier: 0.75,
  },
  normal: {
    name: 'Soldier',
    icon: '⭐',
    description: 'Standard difficulty',
    multiplier: 1.0,
  },
  hard: {
    name: 'Veteran',
    icon: '🎖️',
    description: 'Enemies are tougher',
    multiplier: 1.25,
  },
  brutal: {
    name: 'No Man\'s Land',
    icon: '💀',
    description: 'Extreme challenge',
    multiplier: 1.5,
  },
};

const SkirmishScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('trench');
  const [selectedMap, setSelectedMap] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');

  const handleStartSkirmish = () => {
    navigation.navigate('Briefing', {
      missionId: selectedMap,
      mode: 'skirmish',
      skirmishDifficulty: selectedDifficulty,
    });
  };

  // Get missions for selected category
  const categoryMissions = SKIRMISH_CATEGORIES[selectedCategory].missions
    .filter(id => MISSIONS[id])
    .map(id => ({ id, ...MISSIONS[id] }));

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>⚔️ Skirmish Mode</Text>
          <Text style={styles.subtitle}>
            Quick battles with no campaign impact
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Battle Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {Object.entries(SKIRMISH_CATEGORIES).map(([key, category]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryCard,
                  selectedCategory === key && styles.categoryCardSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(key);
                  setSelectedMap(category.missions[0]);
                }}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDesc}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Map Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Battlefield</Text>

          {categoryMissions.map((mission) => {
            const isSelected = selectedMap === mission.id;
            const weatherInfo = WEATHER_TYPES[mission.weather] || WEATHER_TYPES.clear;
            const playerUnits = mission.units.filter(u => u.team === 'player').length;
            const enemyUnits = mission.units.filter(u => u.team === 'enemy').length;

            return (
              <TouchableOpacity
                key={mission.id}
                style={[
                  styles.mapCard,
                  isSelected && styles.mapCardSelected,
                ]}
                onPress={() => setSelectedMap(mission.id)}
              >
                <View style={styles.mapInfo}>
                  <Text
                    style={[
                      styles.mapName,
                      isSelected && styles.mapNameSelected,
                    ]}
                  >
                    {mission.name}
                  </Text>
                  <Text style={styles.mapLocation}>{mission.location}</Text>
                  <View style={styles.mapStats}>
                    <Text style={styles.mapStat}>
                      {weatherInfo.icon} {weatherInfo.name}
                    </Text>
                    <Text style={styles.mapStat}>
                      • {playerUnits}v{enemyUnits}
                    </Text>
                    {mission.specialVictory === 'survive_turns' && (
                      <Text style={styles.mapTag}>🛡️ Survive</Text>
                    )}
                    {mission.units.some(u => u.type === 'tank' && u.team === 'player') && (
                      <Text style={styles.mapTag}>🚜 Tanks</Text>
                    )}
                    {mission.terrain?.some(t => t.type === 'forest') && (
                      <Text style={styles.mapTag}>🌲 Forest</Text>
                    )}
                    {mission.terrain?.some(t => t.type === 'mountain') && (
                      <Text style={styles.mapTag}>⛰️ Mountains</Text>
                    )}
                  </View>
                </View>

                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Difficulty Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.difficultyGrid}>
            {Object.entries(SKIRMISH_DIFFICULTIES).map(([key, diff]) => {
              const isSelected = selectedDifficulty === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.difficultyCard,
                    isSelected && styles.difficultyCardSelected,
                  ]}
                  onPress={() => setSelectedDifficulty(key)}
                >
                  <Text style={styles.difficultyIcon}>{diff.icon}</Text>
                  <Text style={[
                    styles.difficultyName,
                    isSelected && styles.difficultyNameSelected,
                  ]}>
                    {diff.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.difficultyDesc}>
            {SKIRMISH_DIFFICULTIES[selectedDifficulty].description}
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSkirmish}
        >
          <Text style={styles.startButtonText}>⚔️ Start Battle</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ About Skirmish Mode</Text>
          <Text style={styles.infoText}>
            • No campaign progress affected
          </Text>
          <Text style={styles.infoText}>
            • Veterans don't gain experience
          </Text>
          <Text style={styles.infoText}>
            • Perfect for practice and trying new tactics
          </Text>
          <Text style={styles.infoText}>
            • Achievements can still be earned!
          </Text>
        </View>

        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
  },
  title: {
    fontSize: FONT_SIZES.header,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: SPACING.xlarge,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  categoryScroll: {
    marginHorizontal: -SPACING.large,
    paddingHorizontal: SPACING.large,
  },
  categoryCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginRight: SPACING.medium,
    minWidth: 140,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '20',
  },
  categoryName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  categoryDesc: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mapCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '15',
  },
  mapInfo: {
    flex: 1,
  },
  mapName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  mapNameSelected: {
    color: COLORS.accent,
  },
  mapLocation: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  mapStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.small,
  },
  mapStat: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
  },
  mapTag: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.accent,
    fontWeight: '600',
  },
  selectedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.backgroundDark,
  },
  difficultyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
  },
  difficultyCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  difficultyCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '20',
  },
  difficultyIcon: {
    fontSize: 24,
    marginBottom: SPACING.tiny,
  },
  difficultyName: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  difficultyNameSelected: {
    color: COLORS.textPrimary,
  },
  difficultyDesc: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    marginBottom: SPACING.large,
    ...SHADOWS.large,
  },
  startButtonText: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  infoCard: {
    backgroundColor: COLORS.militaryGreen + '40',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  infoText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
});

export default SkirmishScreen;
