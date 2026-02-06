/**
 * WWI Tactical Game - Leaderboard Screen
 * Display best scores, times, and achievements per mission
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import {
  getGlobalStats,
  getAllMissionLeaderboards,
  getMissionLeaderboard,
  formatScore,
  getStarRating,
  getScoreRank,
  MISSION_PAR_TURNS,
} from '../game/leaderboards';
import { FACTIONS } from '../game/constants';

const LeaderboardScreen = ({ navigation }) => {
  const [globalStats, setGlobalStats] = useState(null);
  const [missionBoards, setMissionBoards] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [missionDetail, setMissionDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadLeaderboardData();
    }, [])
  );

  const loadLeaderboardData = async () => {
    try {
      const [stats, missions] = await Promise.all([
        getGlobalStats(),
        getAllMissionLeaderboards(),
      ]);
      setGlobalStats(stats);
      setMissionBoards(missions);
    } catch (error) {
      console.log('Error loading leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMissionDetail = async (missionId) => {
    const detail = await getMissionLeaderboard(missionId);
    setMissionDetail(detail);
    setSelectedMission(missionId);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i < rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🏆</Text>
      <Text style={styles.emptyTitle}>No Records Yet</Text>
      <Text style={styles.emptySubtitle}>
        Complete missions to set your first records!{'\n'}
        Aim for high scores, fast victories, and perfect runs.
      </Text>
    </View>
  );

  const renderGlobalStats = () => {
    if (!globalStats || globalStats.totalVictories === 0) return null;

    const rank = getScoreRank(globalStats.totalScore);

    return (
      <View style={styles.globalCard}>
        <Text style={styles.sectionTitle}>🎖️ Your Career</Text>

        {/* Rank Display */}
        <View style={styles.rankDisplay}>
          <Text style={styles.rankIcon}>{rank.icon}</Text>
          <View style={styles.rankInfo}>
            <Text style={styles.rankTitle}>{rank.title}</Text>
            <Text style={styles.rankScore}>
              Total Score: {formatScore(globalStats.totalScore)}
            </Text>
          </View>
        </View>

        {/* Progress to Next Rank */}
        {rank.nextRank && (
          <View style={styles.rankProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${rank.progress * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {formatScore(rank.nextRank.min - globalStats.totalScore)} to {rank.nextRank.title}
            </Text>
          </View>
        )}

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{globalStats.totalVictories}</Text>
            <Text style={styles.statLabel}>Victories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{globalStats.totalPerfectVictories}</Text>
            <Text style={styles.statLabel}>Perfect</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{globalStats.totalKills}</Text>
            <Text style={styles.statLabel}>Total Kills</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatScore(globalStats.highestScore)}</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMissionCard = (board) => {
    const stars = getStarRating(board.bestScore, board.missionId);
    const factionData = FACTIONS[board.bestScoreFaction];

    return (
      <TouchableOpacity
        key={board.missionId}
        style={styles.missionCard}
        onPress={() => loadMissionDetail(board.missionId)}
        activeOpacity={0.8}
      >
        <View style={styles.missionHeader}>
          <View style={styles.missionNumber}>
            <Text style={styles.missionNumberText}>{board.missionId}</Text>
          </View>
          <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>Mission {board.missionId}</Text>
            {renderStars(stars)}
          </View>
          <View style={styles.missionScore}>
            <Text style={styles.scoreValue}>{formatScore(board.bestScore)}</Text>
            <Text style={styles.scoreLabel}>Best Score</Text>
          </View>
        </View>

        <View style={styles.missionStats}>
          <View style={styles.missionStat}>
            <Text style={styles.missionStatIcon}>⚡</Text>
            <Text style={styles.missionStatText}>
              {board.fastestVictory || '-'} turns
            </Text>
          </View>
          <View style={styles.missionStat}>
            <Text style={styles.missionStatIcon}>💀</Text>
            <Text style={styles.missionStatText}>
              {board.mostKills} kills
            </Text>
          </View>
          <View style={styles.missionStat}>
            <Text style={styles.missionStatIcon}>✨</Text>
            <Text style={styles.missionStatText}>
              {board.perfectVictories} perfect
            </Text>
          </View>
          {factionData && (
            <View style={styles.missionStat}>
              <Text style={styles.missionStatIcon}>{factionData.flag}</Text>
              <Text style={styles.missionStatText}>Best</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMissionDetail = () => {
    if (!missionDetail || !selectedMission) return null;

    const stars = getStarRating(missionDetail.bestScore, selectedMission);
    const parTurns = MISSION_PAR_TURNS[selectedMission] || 12;
    const factionData = FACTIONS[missionDetail.bestScoreFaction];

    return (
      <View style={styles.detailOverlay}>
        <TouchableOpacity
          style={styles.detailBackdrop}
          onPress={() => {
            setSelectedMission(null);
            setMissionDetail(null);
          }}
          activeOpacity={1}
        />
        <View style={styles.detailCard}>
          {/* Header */}
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Mission {selectedMission}</Text>
            {renderStars(stars)}
          </View>

          {/* Best Score */}
          <View style={styles.bestScoreSection}>
            <Text style={styles.bestScoreLabel}>Best Score</Text>
            <Text style={styles.bestScoreValue}>
              {formatScore(missionDetail.bestScore)}
            </Text>
            {missionDetail.bestScoreDate && (
              <Text style={styles.bestScoreDate}>
                {formatDate(missionDetail.bestScoreDate)}
                {factionData && ` • ${factionData.flag} ${factionData.name}`}
              </Text>
            )}
          </View>

          {/* Records */}
          <View style={styles.recordsSection}>
            <Text style={styles.recordsTitle}>Records</Text>
            <View style={styles.recordsGrid}>
              <View style={styles.recordItem}>
                <Text style={styles.recordIcon}>⚡</Text>
                <Text style={styles.recordValue}>
                  {missionDetail.fastestVictory || '-'}
                </Text>
                <Text style={styles.recordLabel}>Fastest (turns)</Text>
                <Text style={styles.recordPar}>Par: {parTurns}</Text>
              </View>
              <View style={styles.recordItem}>
                <Text style={styles.recordIcon}>💀</Text>
                <Text style={styles.recordValue}>{missionDetail.mostKills}</Text>
                <Text style={styles.recordLabel}>Most Kills</Text>
              </View>
              <View style={styles.recordItem}>
                <Text style={styles.recordIcon}>✨</Text>
                <Text style={styles.recordValue}>{missionDetail.perfectVictories}</Text>
                <Text style={styles.recordLabel}>Perfect Runs</Text>
              </View>
            </View>
          </View>

          {/* Attempts */}
          <View style={styles.attemptsSection}>
            <Text style={styles.attemptsTitle}>
              Attempts: {missionDetail.totalAttempts} • Victories: {missionDetail.totalVictories}
            </Text>
            <Text style={styles.winRate}>
              Win Rate: {missionDetail.totalAttempts > 0
                ? Math.round((missionDetail.totalVictories / missionDetail.totalAttempts) * 100)
                : 0}%
            </Text>
          </View>

          {/* Recent History */}
          {missionDetail.history && missionDetail.history.length > 0 && (
            <View style={styles.historySection}>
              <Text style={styles.historyTitle}>Recent Attempts</Text>
              {missionDetail.history.slice(0, 5).map((attempt, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyScore}>
                    {formatScore(attempt.score)}
                  </Text>
                  <Text style={styles.historyDetails}>
                    {attempt.turns} turns • {attempt.kills} kills
                    {attempt.isPerfect && ' ✨'}
                  </Text>
                  <Text style={styles.historyDate}>
                    {formatDate(attempt.date)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedMission(null);
              setMissionDetail(null);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading records...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🏆 Leaderboards</Text>
          <Text style={styles.subtitle}>Your Best Performances</Text>
        </View>

        {missionBoards.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {/* Global Stats */}
            {renderGlobalStats()}

            {/* Mission Leaderboards */}
            <Text style={styles.sectionHeader}>📊 Mission Records</Text>
            {missionBoards.map(board => renderMissionCard(board))}
          </>
        )}

        <View style={{ height: SPACING.huge }} />
      </ScrollView>

      {/* Mission Detail Modal */}
      {selectedMission && missionDetail && renderMissionDetail()}
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxlarge,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.large,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  globalCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  rankDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  rankIcon: {
    fontSize: 48,
    marginRight: SPACING.medium,
  },
  rankInfo: {
    flex: 1,
  },
  rankTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  rankScore: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  rankProgress: {
    marginBottom: SPACING.medium,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.tiny,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: SPACING.small,
  },
  statValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
  },
  sectionHeader: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  missionCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  missionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  missionNumberText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
  },
  missionScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.accent,
  },
  scoreLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
  },
  missionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.small,
    marginTop: SPACING.small,
  },
  missionStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionStatIcon: {
    fontSize: 14,
    marginRight: SPACING.tiny,
  },
  missionStatText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  // Detail Modal Styles
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  detailBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  detailCard: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    ...SHADOWS.large,
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  detailTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  bestScoreSection: {
    alignItems: 'center',
    marginBottom: SPACING.large,
    paddingBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bestScoreLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  bestScoreValue: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.accent,
  },
  bestScoreDate: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    marginTop: SPACING.tiny,
  },
  recordsSection: {
    marginBottom: SPACING.medium,
  },
  recordsTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  recordsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recordItem: {
    alignItems: 'center',
    flex: 1,
  },
  recordIcon: {
    fontSize: 24,
    marginBottom: SPACING.tiny,
  },
  recordValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  recordLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
  },
  recordPar: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
  },
  attemptsSection: {
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: SPACING.medium,
  },
  attemptsTitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  winRate: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.tiny,
  },
  historySection: {
    marginBottom: SPACING.medium,
  },
  historyTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  historyScore: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    width: 80,
  },
  historyDetails: {
    flex: 1,
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  historyDate: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.medium,
    alignSelf: 'center',
    marginTop: SPACING.small,
  },
  closeButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
});

export default LeaderboardScreen;
