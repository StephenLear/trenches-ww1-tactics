/**
 * WWI Tactical Game - Deployment Screen
 * Choose which veterans to deploy before each mission
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
  Alert,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { MISSIONS } from '../game/missions';
import { UNIT_TYPES } from '../game/constants';
import { loadGame } from '../game/storage';

const DeploymentScreen = ({ route, navigation }) => {
  const { missionId } = route.params;
  const mission = MISSIONS[missionId];

  const [gameState, setGameState] = useState(null);
  const [selectedVeterans, setSelectedVeterans] = useState({});
  const [loading, setLoading] = useState(true);

  // Get mission slots (player units only)
  const missionSlots = mission?.units?.filter(u => u.team === 'player') || [];

  useEffect(() => {
    loadGameState();
  }, []);

  const loadGameState = async () => {
    const result = await loadGame();
    const savedGame = result.success ? result.gameState : null;
    setGameState({
      veterans: [],
      researchedTech: [],
      resources: 100,
      completedMissions: [],
      ...savedGame,
    });
    setLoading(false);
  };

  // Get veterans that match a slot type
  const getMatchingVeterans = (slotType) => {
    const veterans = gameState?.veterans || [];
    // Filter veterans of the same type that aren't already assigned to another slot
    const assignedIds = Object.values(selectedVeterans).filter(v => v).map(v => v.id);
    return veterans.filter(v => v.type === slotType && !assignedIds.includes(v.id));
  };

  // Check if a veteran is selected for any slot
  const isVeteranSelected = (veteranId) => {
    return Object.values(selectedVeterans).some(v => v && v.id === veteranId);
  };

  // Toggle veteran selection for a slot
  const handleSelectVeteran = (slotIndex, veteran) => {
    setSelectedVeterans(prev => {
      const current = prev[slotIndex];
      if (current && current.id === veteran.id) {
        // Deselect
        return { ...prev, [slotIndex]: null };
      }
      // Select this veteran
      return { ...prev, [slotIndex]: veteran };
    });
  };

  // Clear selection for a slot
  const handleClearSlot = (slotIndex) => {
    setSelectedVeterans(prev => ({ ...prev, [slotIndex]: null }));
  };

  // Start the mission
  const handleStartMission = () => {
    // Pass selected veterans to battle screen
    const deployedVeterans = Object.entries(selectedVeterans)
      .filter(([_, v]) => v)
      .map(([slotIndex, veteran]) => ({
        slotIndex: parseInt(slotIndex),
        veteran,
      }));

    navigation.replace('Battle', {
      missionId,
      mode: 'campaign',
      deployedVeterans,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.containerCentered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const veterans = gameState?.veterans || [];

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deploy Forces</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mission Info */}
        <View style={styles.missionCard}>
          <Text style={styles.missionName}>{mission?.name}</Text>
          <Text style={styles.missionLocation}>{mission?.location} • {mission?.date}</Text>
          <Text style={styles.missionObjective}>Objective: {mission?.objective}</Text>
        </View>

        {/* Mission Slots */}
        <Text style={styles.sectionTitle}>Mission Slots ({missionSlots.length})</Text>
        <Text style={styles.sectionSubtitle}>
          Assign veterans to replace default recruits
        </Text>

        {missionSlots.map((slot, index) => {
          const unitType = UNIT_TYPES[slot.type];
          const selectedVet = selectedVeterans[index];
          const matchingVets = getMatchingVeterans(slot.type);

          return (
            <View key={index} style={styles.slotCard}>
              <View style={styles.slotHeader}>
                <Text style={styles.slotIcon}>{unitType?.icon || '🪖'}</Text>
                <View style={styles.slotInfo}>
                  <Text style={styles.slotType}>{unitType?.name || slot.type}</Text>
                  <Text style={styles.slotPosition}>Position: ({slot.x}, {slot.y})</Text>
                </View>
              </View>

              {selectedVet ? (
                <View style={styles.selectedVeteran}>
                  <View style={styles.veteranInfo}>
                    <Text style={styles.veteranName}>⭐ {selectedVet.fullName}</Text>
                    <Text style={styles.veteranStats}>
                      XP: {selectedVet.xp} • Kills: {selectedVet.kills}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => handleClearSlot(index)}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.defaultRecruit}>
                  <Text style={styles.defaultText}>🆕 New Recruit</Text>
                  <Text style={styles.defaultSubtext}>Tap a veteran below to assign</Text>
                </View>
              )}

              {/* Available veterans for this slot type */}
              {matchingVets.length > 0 && (
                <View style={styles.veteranOptions}>
                  {matchingVets.map((vet) => (
                    <TouchableOpacity
                      key={vet.id}
                      style={[
                        styles.veteranOption,
                        selectedVet?.id === vet.id && styles.veteranOptionSelected,
                      ]}
                      onPress={() => handleSelectVeteran(index, vet)}
                    >
                      <Text style={styles.veteranOptionName}>{vet.fullName}</Text>
                      <Text style={styles.veteranOptionStats}>
                        XP:{vet.xp} K:{vet.kills}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* Available Veterans Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Veteran Roster</Text>
          {veterans.length === 0 ? (
            <Text style={styles.summaryEmpty}>
              No veterans yet. Complete missions or visit the Shop to recruit soldiers.
            </Text>
          ) : (
            <View style={styles.summaryList}>
              {Object.entries(
                veterans.reduce((acc, v) => {
                  acc[v.type] = (acc[v.type] || 0) + 1;
                  return acc;
                }, {})
              ).map(([type, count]) => (
                <Text key={type} style={styles.summaryItem}>
                  {UNIT_TYPES[type]?.icon} {UNIT_TYPES[type]?.name}: {count}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartMission}
        >
          <Text style={styles.startButtonText}>⚔️ Begin Mission</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xxlarge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.small,
  },
  backButtonText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 60,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  loadingText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.large,
  },
  missionCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
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
    marginBottom: SPACING.small,
  },
  missionObjective: {
    fontSize: FONT_SIZES.small,
    color: COLORS.accent,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.medium,
  },
  slotCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  slotIcon: {
    fontSize: 28,
    marginRight: SPACING.medium,
  },
  slotInfo: {
    flex: 1,
  },
  slotType: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  slotPosition: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  selectedVeteran: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '20',
    borderRadius: RADIUS.small,
    padding: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  veteranInfo: {
    flex: 1,
  },
  veteranName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.success,
  },
  veteranStats: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  clearButton: {
    padding: SPACING.small,
    backgroundColor: COLORS.danger + '30',
    borderRadius: RADIUS.small,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  defaultRecruit: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    padding: SPACING.small,
    alignItems: 'center',
  },
  defaultText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  defaultSubtext: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  veteranOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.small,
    marginTop: SPACING.small,
    paddingTop: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  veteranOption: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: RADIUS.small,
    padding: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  veteranOptionSelected: {
    backgroundColor: COLORS.success + '30',
    borderColor: COLORS.success,
  },
  veteranOptionName: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  veteranOptionStats: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
  },
  summaryCard: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  summaryEmpty: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  summaryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.medium,
  },
  summaryItem: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  startButton: {
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  startButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default DeploymentScreen;
