/**
 * WWI Tactical Game - Victory Screen
 * Mission complete with stats, historical facts, medals, and rewards
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
  Animated,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { MISSIONS } from '../game/missions';
import { getMissionFact } from '../game/historicalFacts';
import { loadGame, saveGame } from '../game/storage';
import { MEDALS, checkNewMedals, getDefaultMedalStats } from '../game/medals';
import { playSFX } from '../audio/AudioManager';
import { generateHeadline } from '../game/newspaperHeadlines';
import { generateLetter } from '../game/lettersHome';

const VictoryScreen = ({ route, navigation }) => {
  const {
    missionId,
    survivors = 0,
    totalUnits = 0,
    battleStats = null, // Will be passed from BattleScreen
  } = route.params;

  const mission = MISSIONS[missionId];
  const historicalFact = getMissionFact(missionId);

  const [newMedals, setNewMedals] = useState([]);
  const [showFact, setShowFact] = useState(false);
  const [requisitionReward, setRequisitionReward] = useState(0);
  const [newspaperHeadline, setNewspaperHeadline] = useState(null);
  const [letterHome, setLetterHome] = useState(null);
  const [showNewspaper, setShowNewspaper] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Animate in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Check for new medals and update stats
    checkMedalsAndRewards();

    // Generate newspaper headline and letter
    generateVictoryContent();

    // Delay showing content for dramatic effect
    const factTimer = setTimeout(() => setShowFact(true), 1000);
    const newspaperTimer = setTimeout(() => setShowNewspaper(true), 1500);
    const letterTimer = setTimeout(() => setShowLetter(true), 2000);

    return () => {
      clearTimeout(factTimer);
      clearTimeout(newspaperTimer);
      clearTimeout(letterTimer);
    };
  }, []);

  const generateVictoryContent = async () => {
    try {
      const result = await loadGame();
      const gameState = result.success ? result.gameState : {};
      const faction = gameState?.faction || 'british';
      const casualties = totalUnits - survivors;

      // Generate newspaper headline
      const headline = generateHeadline({
        victory: true,
        location: mission?.location || 'The Western Front',
        playerKills: battleStats?.totalKills || 0,
        playerLosses: casualties,
        turns: battleStats?.playerTurns || 10,
        faction: faction,
        veteranName: null,
        usedTanks: false,
        usedArtillery: false,
      });
      setNewspaperHeadline(headline);

      // Generate letter home from a random survivor
      const veterans = gameState?.veterans || [];
      const survivor = veterans.length > 0
        ? veterans[Math.floor(Math.random() * veterans.length)]
        : { name: 'Tommy', hometown: 'Home' };

      const letter = generateLetter({
        soldierName: survivor.name || survivor.fullName || 'Tommy',
        occasion: 'victory',
        location: mission?.location || 'The Front',
        faction: faction,
        rank: survivor.rank || 'Private',
        victory: true,
        losses: casualties,
      });
      setLetterHome(letter);

    } catch (error) {
      console.log('Error generating victory content:', error);
    }
  };

  const checkMedalsAndRewards = async () => {
    try {
      const result = await loadGame();
      if (!result.success) return;

      const gameState = result.gameState || {};
      const oldStats = gameState.medalStats || getDefaultMedalStats();

      // Calculate new stats
      const newStats = { ...oldStats };
      newStats.missionsCompleted = (gameState.completedMissions?.length || 0);
      newStats.totalVeterans = (gameState.veterans?.length || 0);

      // Add battle stats if available
      if (battleStats) {
        newStats.totalKills = (oldStats.totalKills || 0) + (battleStats.totalKills || 0);
        newStats.tanksDestroyed = (oldStats.tanksDestroyed || 0) + (battleStats.tanksDestroyed || 0);

        if (battleStats.maxKillsInOneTurn > (oldStats.maxKillsInTurn || 0)) {
          newStats.maxKillsInTurn = battleStats.maxKillsInOneTurn;
        }

        // Track perfect victories
        if (survivors === totalUnits && totalUnits > 0) {
          newStats.perfectVictories = (oldStats.perfectVictories || 0) + 1;
        }

        // Track clutch victories (1 survivor)
        if (survivors === 1 && totalUnits > 1) {
          newStats.clutchVictories = (oldStats.clutchVictories || 0) + 1;
        }

        // Track fastest victory
        if (battleStats.playerTurns > 0) {
          if (!oldStats.fastestVictory || battleStats.playerTurns < oldStats.fastestVictory) {
            newStats.fastestVictory = battleStats.playerTurns;
          }
        }
      }

      // Track faction wins
      const faction = gameState.faction || 'british';
      const factionWinKey = `${faction}Wins`;
      newStats[factionWinKey] = (oldStats[factionWinKey] || 0) + 1;

      // Track difficulty wins
      const difficulty = gameState.difficulty || 'normal';
      if (difficulty === 'hard' || difficulty === 'elite') {
        newStats.hardModeWins = (oldStats.hardModeWins || 0) + 1;
      }

      // Track diary entries
      newStats.diaryEntriesUnlocked = gameState.completedMissions?.length || 0;

      // Check for newly unlocked medals
      const unlocked = checkNewMedals(oldStats, newStats);
      if (unlocked.length > 0) {
        setNewMedals(unlocked);
        playSFX('achievement');
      }

      // Calculate requisition reward
      const baseReward = 25;
      const survivalBonus = Math.floor((survivors / totalUnits) * 20);
      const perfectBonus = survivors === totalUnits ? 15 : 0;
      const total = baseReward + survivalBonus + perfectBonus;
      setRequisitionReward(total);

      // Save updated stats and reward
      await saveGame({
        ...gameState,
        medalStats: newStats,
        requisitionPoints: (gameState.requisitionPoints || gameState.resources || 0) + total,
        resources: (gameState.requisitionPoints || gameState.resources || 0) + total,
        factsRead: [...(gameState.factsRead || []), missionId],
      });

    } catch (error) {
      console.log('Error checking medals:', error);
    }
  };

  const handleContinue = () => {
    navigation.navigate('Menu');
  };

  const handleNextMission = () => {
    const nextMissionId = missionId + 1;
    if (MISSIONS[nextMissionId]) {
      navigation.replace('Briefing', {
        missionId: nextMissionId,
        mode: 'campaign',
      });
    } else {
      navigation.navigate('Menu');
    }
  };

  const survivalRate = totalUnits > 0 ? ((survivors / totalUnits) * 100).toFixed(0) : 0;
  const hasNextMission = MISSIONS[missionId + 1] !== undefined;

  // Calculate stars
  let stars = 1;
  if (survivalRate >= 90) stars = 3;
  else if (survivalRate >= 70) stars = 2;

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3].map(i => (
          <Text
            key={i}
            style={[
              styles.star,
              i <= stars ? styles.starActive : styles.starInactive,
            ]}
          >
            ⭐
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim }}
      >
        {/* Victory Banner */}
        <View style={styles.banner}>
          <Text style={styles.victoryEmoji}>🎖️</Text>
          <Text style={styles.victoryTitle}>VICTORY!</Text>
          <Text style={styles.victorySubtitle}>Mission Complete</Text>
          {renderStars()}
        </View>

        {/* Mission Info */}
        <View style={styles.missionCard}>
          <Text style={styles.missionName}>{mission?.name || 'Mission'}</Text>
          <Text style={styles.missionLocation}>
            {mission?.location || ''} • {mission?.date || ''}
          </Text>
        </View>

        {/* Battle Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Battle Report</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue}>{survivors}/{totalUnits}</Text>
              <Text style={styles.statLabel}>Survivors</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={[
                styles.statValue,
                survivalRate >= 75 ? styles.statGood :
                survivalRate >= 50 ? styles.statOk : styles.statBad,
              ]}>
                {survivalRate}%
              </Text>
              <Text style={styles.statLabel}>Survival</Text>
            </View>

            {battleStats && (
              <>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>💀</Text>
                  <Text style={styles.statValue}>{battleStats.totalKills || 0}</Text>
                  <Text style={styles.statLabel}>Enemies</Text>
                </View>

                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>⏱️</Text>
                  <Text style={styles.statValue}>{battleStats.playerTurns || 0}</Text>
                  <Text style={styles.statLabel}>Turns</Text>
                </View>
              </>
            )}
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {stars === 3 ? 'Decisive Victory!' :
               stars === 2 ? 'Hard-Fought Victory' : 'Pyrrhic Victory'}
            </Text>
          </View>
        </View>

        {/* New Medals */}
        {newMedals.length > 0 && (
          <View style={styles.medalsCard}>
            <Text style={styles.medalsTitle}>🎖️ New Medals Earned!</Text>
            {newMedals.map(medal => (
              <View key={medal.id} style={styles.medalRow}>
                <Text style={styles.medalIcon}>{medal.icon}</Text>
                <View style={styles.medalInfo}>
                  <Text style={styles.medalName}>{medal.name}</Text>
                  <Text style={styles.medalDescription}>{medal.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Historical Fact */}
        {showFact && historicalFact && (
          <Animated.View style={styles.factCard}>
            <Text style={styles.factTitle}>📜 {historicalFact.title}</Text>
            <Text style={styles.factDate}>{historicalFact.date}</Text>
            <Text style={styles.factText}>{historicalFact.fact}</Text>
            {historicalFact.didYouKnow && (
              <View style={styles.didYouKnow}>
                <Text style={styles.didYouKnowTitle}>💡 Did You Know?</Text>
                <Text style={styles.didYouKnowText}>{historicalFact.didYouKnow}</Text>
              </View>
            )}
          </Animated.View>
        )}

        {/* Rewards */}
        <View style={styles.rewardsCard}>
          <Text style={styles.rewardsTitle}>🏆 Rewards</Text>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardIcon}>💰</Text>
            <Text style={styles.rewardText}>+{requisitionReward} Requisition Points</Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardIcon}>⭐</Text>
            <Text style={styles.rewardText}>Veterans Promoted</Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardIcon}>💾</Text>
            <Text style={styles.rewardText}>Progress Saved</Text>
          </View>
        </View>

        {/* Newspaper Headline */}
        {showNewspaper && newspaperHeadline && (
          <Animated.View style={styles.newspaperCard}>
            <View style={styles.newspaperHeader}>
              <Text style={styles.newspaperName}>{newspaperHeadline.newspaper?.name || 'The Times'}</Text>
              <Text style={styles.newspaperDate}>{newspaperHeadline.date}</Text>
            </View>
            <Text style={styles.newspaperEdition}>{newspaperHeadline.edition}</Text>
            <Text style={styles.newspaperHeadline}>{newspaperHeadline.headline}</Text>
            {newspaperHeadline.subheadlines?.length > 0 && (
              <Text style={styles.newspaperSubheadline}>
                {newspaperHeadline.subheadlines[0]}
              </Text>
            )}
            <View style={styles.newspaperDivider} />
            {newspaperHeadline.articleSnippets?.length > 0 && (
              <Text style={styles.newspaperExcerpt}>
                {newspaperHeadline.articleSnippets[0]}
              </Text>
            )}
            <Text style={styles.newspaperPrice}>{newspaperHeadline.price}</Text>
          </Animated.View>
        )}

        {/* Letter Home */}
        {showLetter && letterHome && (
          <Animated.View style={styles.letterCard}>
            <View style={styles.letterHeader}>
              <Text style={styles.letterIcon}>✉️</Text>
              <Text style={styles.letterTitle}>Letter Home</Text>
              {letterHome.censored && <Text style={styles.censorMark}>CENSORED</Text>}
            </View>
            <Text style={styles.letterLocation}>{letterHome.location}</Text>
            <Text style={styles.letterDate}>{letterHome.date}</Text>
            <Text style={styles.letterContent}>{letterHome.content}</Text>
          </Animated.View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {hasNextMission ? (
            <>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleNextMission}
              >
                <Text style={styles.primaryButtonText}>
                  Next Mission →
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleContinue}
              >
                <Text style={styles.secondaryButtonText}>
                  Return to Menu
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>
                🎉 Campaign Complete!
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </Animated.ScrollView>
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
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    marginBottom: SPACING.large,
    ...SHADOWS.large,
  },
  victoryEmoji: {
    fontSize: 64,
    marginBottom: SPACING.medium,
  },
  victoryTitle: {
    fontSize: FONT_SIZES.huge,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 2,
    marginBottom: SPACING.small,
  },
  victorySubtitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.textWhite,
    fontWeight: '500',
    marginBottom: SPACING.medium,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: SPACING.small,
  },
  star: {
    fontSize: 32,
  },
  starActive: {
    opacity: 1,
  },
  starInactive: {
    opacity: 0.3,
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
  statsCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  statsTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: SPACING.medium,
  },
  statItem: {
    alignItems: 'center',
    width: '25%',
    paddingVertical: SPACING.small,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.tiny,
  },
  statValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  statGood: {
    color: COLORS.success,
  },
  statOk: {
    color: COLORS.warning,
  },
  statBad: {
    color: COLORS.danger,
  },
  ratingContainer: {
    alignItems: 'center',
    paddingTop: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  ratingText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.accent,
  },
  medalsCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  medalsTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  medalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  medalIcon: {
    fontSize: 32,
    marginRight: SPACING.medium,
  },
  medalInfo: {
    flex: 1,
  },
  medalName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  medalDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  factCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  factTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  factDate: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    marginBottom: SPACING.medium,
  },
  factText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.medium,
  },
  didYouKnow: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    padding: SPACING.medium,
  },
  didYouKnowTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: SPACING.tiny,
  },
  didYouKnowText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  rewardsCard: {
    backgroundColor: COLORS.militaryGreen,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  rewardsTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginBottom: SPACING.medium,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  rewardIcon: {
    fontSize: 20,
    marginRight: SPACING.small,
  },
  rewardText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textWhite,
  },
  buttonContainer: {
    gap: SPACING.medium,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  // Newspaper styles
  newspaperCard: {
    backgroundColor: '#f5f0e1',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderWidth: 1,
    borderColor: '#c9b99a',
    ...SHADOWS.medium,
  },
  newspaperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.tiny,
    borderBottomWidth: 2,
    borderBottomColor: '#2d2d2d',
    paddingBottom: SPACING.small,
  },
  newspaperName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: '#2d2d2d',
    letterSpacing: 1,
  },
  newspaperDate: {
    fontSize: FONT_SIZES.tiny,
    color: '#666',
  },
  newspaperEdition: {
    fontSize: FONT_SIZES.tiny,
    color: '#8b0000',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: SPACING.small,
    letterSpacing: 2,
  },
  newspaperHeadline: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: SPACING.small,
    lineHeight: 28,
  },
  newspaperSubheadline: {
    fontSize: FONT_SIZES.medium,
    color: '#444',
    textAlign: 'center',
    marginBottom: SPACING.medium,
    fontStyle: 'italic',
  },
  newspaperDivider: {
    height: 1,
    backgroundColor: '#999',
    marginVertical: SPACING.medium,
  },
  newspaperExcerpt: {
    fontSize: FONT_SIZES.small,
    color: '#333',
    lineHeight: 20,
    textAlign: 'justify',
  },
  newspaperPrice: {
    fontSize: FONT_SIZES.tiny,
    color: '#666',
    textAlign: 'right',
    marginTop: SPACING.small,
    fontStyle: 'italic',
  },
  // Letter styles
  letterCard: {
    backgroundColor: '#faf6ed',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderWidth: 1,
    borderColor: '#d4c9b0',
    ...SHADOWS.medium,
  },
  letterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  letterIcon: {
    fontSize: 24,
    marginRight: SPACING.small,
  },
  letterTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#5c4a32',
    flex: 1,
  },
  censorMark: {
    fontSize: FONT_SIZES.tiny,
    color: '#8b0000',
    fontWeight: '700',
    backgroundColor: 'rgba(139, 0, 0, 0.1)',
    paddingHorizontal: SPACING.small,
    paddingVertical: 2,
    borderRadius: RADIUS.small,
  },
  letterLocation: {
    fontSize: FONT_SIZES.tiny,
    color: '#8b7355',
    fontStyle: 'italic',
  },
  letterDate: {
    fontSize: FONT_SIZES.tiny,
    color: '#8b7355',
    marginBottom: SPACING.medium,
    fontStyle: 'italic',
  },
  letterContent: {
    fontSize: FONT_SIZES.medium,
    color: '#3d3225',
    lineHeight: 24,
  },
});

export default VictoryScreen;
