/**
 * WWI Tactical Game - Skirmish Screen
 * Quick battle setup with customization (simplified version for Phase 2)
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
import { SKIRMISH_PRESETS } from '../game/constants';

// Curated selection of missions for skirmish - varied gameplay styles
const SKIRMISH_MISSION_IDS = [
  1,   // Hold the Line - Basic trench defense
  3,   // Iron Beasts - Tank warfare
  6,   // Gallipoli Landing - Beach assault
  16,  // Tannenberg - Encirclement tactics
  17,  // Cambrai - Mass tank assault
  18,  // Belleau Wood - Forest fighting
  20,  // The Eleventh Hour - Survival mode
];

const SkirmishScreen = ({ navigation }) => {
  const [selectedMap, setSelectedMap] = useState(1);

  const handleStartSkirmish = () => {
    navigation.navigate('Battle', {
      missionId: selectedMap,
      mode: 'skirmish',
    });
  };

  // Get curated skirmish missions
  const skirmishMaps = SKIRMISH_MISSION_IDS
    .filter(id => MISSIONS[id])
    .map(id => [id.toString(), MISSIONS[id]]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Skirmish Mode</Text>
          <Text style={styles.subtitle}>
            Quick battle with no campaign consequences
          </Text>
        </View>

        {/* Map Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Battlefield</Text>

          {skirmishMaps.map(([id, mission]) => {
            const missionId = parseInt(id);
            const isSelected = selectedMap === missionId;

            return (
              <TouchableOpacity
                key={missionId}
                style={[
                  styles.mapCard,
                  isSelected && styles.mapCardSelected,
                ]}
                onPress={() => setSelectedMap(missionId)}
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
                      Weather: {mission.weather}
                    </Text>
                    <Text style={styles.mapStat}>
                      • {mission.units.filter(u => u.team === 'player').length}v
                      {mission.units.filter(u => u.team === 'enemy').length}
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

        {/* Options (placeholder for future features) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>
          <View style={styles.optionCard}>
            <Text style={styles.optionText}>
              💡 Customization options coming soon
            </Text>
            <Text style={styles.optionSubtext}>
              • Difficulty settings
            </Text>
            <Text style={styles.optionSubtext}>
              • Weather control
            </Text>
            <Text style={styles.optionSubtext}>
              • Unit selection
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSkirmish}
        >
          <Text style={styles.startButtonText}>⚔️ Start Skirmish</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ About Skirmish Mode</Text>
          <Text style={styles.infoText}>
            • No campaign progress is affected
          </Text>
          <Text style={styles.infoText}>
            • Veterans don't gain XP
          </Text>
          <Text style={styles.infoText}>
            • Perfect for practice and experimentation
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
    marginLeft: SPACING.small,
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
  optionCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  optionSubtext: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.medium,
    marginTop: SPACING.tiny,
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
