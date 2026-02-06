/**
 * WWI Tactical Game - Statistics Screen
 * Career stats and overall progress tracking
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { loadGame } from '../game/storage';
import { FACTIONS } from '../game/constants';
import { getUnlockedMedals, getTotalMedalCount } from '../game/medals';

const StatisticsScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        const gameState = result.gameState;
        const medalStats = gameState.medalStats || {};

        setStats({
          // Campaign Progress
          missionsCompleted: gameState.completedMissions?.length || 0,
          totalMissions: 20,
          faction: gameState.faction || 'british',
          difficulty: gameState.difficulty || 'normal',

          // Combat Stats
          totalKills: medalStats.totalKills || 0,
          tanksDestroyed: medalStats.tanksDestroyed || 0,
          perfectVictories: medalStats.perfectVictories || 0,
          fastestVictory: medalStats.fastestVictory || 0,
          maxKillsInTurn: medalStats.maxKillsInTurn || 0,

          // Veteran Stats
          totalVeterans: gameState.veterans?.length || 0,
          fallenVeterans: gameState.fallenVeterans?.length || 0,
          maxVeteranRank: medalStats.maxVeteranRank || 0,

          // Faction Wins
          britishWins: medalStats.britishWins || 0,
          frenchWins: medalStats.frenchWins || 0,
          germanWins: medalStats.germanWins || 0,
          americanWins: medalStats.americanWins || 0,

          // Resources
          requisitionPoints: gameState.requisitionPoints || gameState.resources || 0,
          upgradesPurchased: gameState.purchasedUpgrades?.length || 0,

          // Medals
          medalsEarned: getUnlockedMedals(medalStats).length,
          totalMedals: getTotalMedalCount(),

          // Other
          skirmishWins: medalStats.skirmishWins || 0,
          hardModeWins: medalStats.hardModeWins || 0,
        });
      }
    } catch (error) {
      console.log('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading statistics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const factionData = FACTIONS[stats.faction];
  const completionPercent = Math.round((stats.missionsCompleted / stats.totalMissions) * 100);

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📊 War Statistics</Text>
          <Text style={styles.subtitle}>Your Campaign Record</Text>
        </View>

        {/* Current Campaign */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎖️ Current Campaign</Text>

          <View style={styles.campaignInfo}>
            <Text style={styles.factionFlag}>{factionData?.flag || '🏴'}</Text>
            <View style={styles.campaignDetails}>
              <Text style={styles.factionName}>{factionData?.name || 'Unknown'}</Text>
              <Text style={styles.difficultyText}>
                {stats.difficulty.charAt(0).toUpperCase() + stats.difficulty.slice(1)} Difficulty
              </Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>{completionPercent}%</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionPercent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {stats.missionsCompleted} / {stats.totalMissions} Missions Complete
          </Text>
        </View>

        {/* Combat Statistics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚔️ Combat Record</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalKills}</Text>
              <Text style={styles.statLabel}>Enemies Defeated</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.tanksDestroyed}</Text>
              <Text style={styles.statLabel}>Tanks Destroyed</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.perfectVictories}</Text>
              <Text style={styles.statLabel}>Perfect Victories</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.maxKillsInTurn || '-'}</Text>
              <Text style={styles.statLabel}>Max Kills (1 Turn)</Text>
            </View>
          </View>

          {stats.fastestVictory > 0 && (
            <View style={styles.highlight}>
              <Text style={styles.highlightIcon}>⚡</Text>
              <Text style={styles.highlightText}>
                Fastest Victory: {stats.fastestVictory} turns
              </Text>
            </View>
          )}
        </View>

        {/* Veteran Statistics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Veterans</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statItemValue}>{stats.totalVeterans}</Text>
              <Text style={styles.statItemLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statItemValue, styles.fallenText]}>
                {stats.fallenVeterans}
              </Text>
              <Text style={styles.statItemLabel}>Fallen</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statItemValue}>
                {stats.totalVeterans + stats.fallenVeterans}
              </Text>
              <Text style={styles.statItemLabel}>Total Served</Text>
            </View>
          </View>
        </View>

        {/* Faction Victories */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚩 Victories by Faction</Text>

          <View style={styles.factionGrid}>
            <View style={styles.factionStat}>
              <Text style={styles.factionStatFlag}>🇬🇧</Text>
              <Text style={styles.factionStatValue}>{stats.britishWins}</Text>
            </View>
            <View style={styles.factionStat}>
              <Text style={styles.factionStatFlag}>🇫🇷</Text>
              <Text style={styles.factionStatValue}>{stats.frenchWins}</Text>
            </View>
            <View style={styles.factionStat}>
              <Text style={styles.factionStatFlag}>🇩🇪</Text>
              <Text style={styles.factionStatValue}>{stats.germanWins}</Text>
            </View>
            <View style={styles.factionStat}>
              <Text style={styles.factionStatFlag}>🇺🇸</Text>
              <Text style={styles.factionStatValue}>{stats.americanWins}</Text>
            </View>
          </View>
        </View>

        {/* Achievements & Resources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Achievements & Resources</Text>

          <View style={styles.achievementRow}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🎖️</Text>
              <Text style={styles.achievementValue}>
                {stats.medalsEarned}/{stats.totalMedals}
              </Text>
              <Text style={styles.achievementLabel}>Medals</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>💰</Text>
              <Text style={styles.achievementValue}>{stats.requisitionPoints}</Text>
              <Text style={styles.achievementLabel}>Requisition</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>⚙️</Text>
              <Text style={styles.achievementValue}>{stats.upgradesPurchased}</Text>
              <Text style={styles.achievementLabel}>Upgrades</Text>
            </View>
          </View>

          {stats.hardModeWins > 0 && (
            <View style={styles.highlight}>
              <Text style={styles.highlightIcon}>🔥</Text>
              <Text style={styles.highlightText}>
                {stats.hardModeWins} Hard/Elite Mode Victories
              </Text>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.large,
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
  },
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  campaignInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  factionFlag: {
    fontSize: 40,
    marginRight: SPACING.medium,
  },
  campaignDetails: {
    flex: 1,
  },
  factionName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  difficultyText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.small,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  statValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
    textAlign: 'center',
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginTop: SPACING.small,
  },
  highlightIcon: {
    fontSize: 20,
    marginRight: SPACING.small,
  },
  highlightText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.accent,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statItemValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statItemLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  fallenText: {
    color: COLORS.danger || '#EF4444',
  },
  factionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  factionStat: {
    alignItems: 'center',
  },
  factionStatFlag: {
    fontSize: 32,
    marginBottom: SPACING.tiny,
  },
  factionStatValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: SPACING.tiny,
  },
  achievementValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  achievementLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default StatisticsScreen;
