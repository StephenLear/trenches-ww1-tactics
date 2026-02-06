/**
 * WWI Tactical Game - Achievements Screen
 * Display all achievements and player progress
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import {
  achievementManager,
  AchievementCategory,
  getRarityColor,
  getCategoryName,
} from '../game/achievements';

const AchievementsScreen = ({ navigation }) => {
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState({ total: 0, unlocked: 0, points: 0 });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    await achievementManager.load();
    const allAchievements = achievementManager.getAllAchievements();
    setAchievements(allAchievements);

    const unlocked = allAchievements.filter(a => a.unlocked).length;
    setStats({
      total: allAchievements.length,
      unlocked,
      points: achievementManager.getTotalPoints(),
      percentage: achievementManager.getCompletionPercentage(),
    });
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: AchievementCategory.COMBAT, name: 'Combat' },
    { id: AchievementCategory.TACTICS, name: 'Tactics' },
    { id: AchievementCategory.CAMPAIGN, name: 'Campaign' },
    { id: AchievementCategory.VETERANS, name: 'Veterans' },
    { id: AchievementCategory.MASTERY, name: 'Mastery' },
    { id: AchievementCategory.HISTORIC, name: 'Historic' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  // Sort: unlocked first, then by rarity
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return 0;
  });

  const renderAchievement = (achievement) => {
    const rarityColor = getRarityColor(achievement.rarity);
    const isHidden = achievement.hidden && !achievement.unlocked;

    return (
      <View
        key={achievement.id}
        style={[
          styles.achievementCard,
          achievement.unlocked && styles.achievementUnlocked,
          { borderLeftColor: rarityColor },
        ]}
      >
        <View style={styles.achievementIcon}>
          <Text style={styles.icon}>
            {isHidden ? '❓' : achievement.icon}
          </Text>
          {achievement.unlocked && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>

        <View style={styles.achievementInfo}>
          <Text style={[
            styles.achievementName,
            !achievement.unlocked && styles.achievementLocked,
          ]}>
            {isHidden ? '???' : achievement.name}
          </Text>

          <Text style={[
            styles.achievementDescription,
            !achievement.unlocked && styles.achievementLocked,
          ]}>
            {isHidden ? 'Hidden achievement' : achievement.description}
          </Text>

          <View style={styles.achievementMeta}>
            <Text style={[styles.rarityText, { color: rarityColor }]}>
              {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
            </Text>
            <Text style={styles.pointsText}>
              {achievement.points} pts
            </Text>
          </View>

          {/* Progress bar for incomplete achievements */}
          {!achievement.unlocked && achievement.condition?.count && achievement.progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(100, (achievement.progress / achievement.condition.count) * 100)}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress}/{achievement.condition.count}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.unlocked}/{stats.total}</Text>
          <Text style={styles.statLabel}>Unlocked</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.percentage}%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.points}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievements List */}
      <ScrollView
        style={styles.achievementsList}
        contentContainerStyle={styles.achievementsContent}
      >
        {sortedAchievements.map(renderAchievement)}
        <View style={{ height: SPACING.huge }} />
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
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 60,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
  },
  categoryContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryContent: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    gap: SPACING.small,
  },
  categoryButton: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.backgroundLight,
    marginRight: SPACING.small,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.accent,
  },
  categoryButtonText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: COLORS.backgroundDark,
  },
  achievementsList: {
    flex: 1,
  },
  achievementsContent: {
    padding: SPACING.medium,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  achievementUnlocked: {
    backgroundColor: COLORS.accent + '15',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  icon: {
    fontSize: 32,
  },
  checkmark: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: COLORS.textWhite,
    fontSize: 10,
    fontWeight: '700',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  achievementDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementMeta: {
    flexDirection: 'row',
    gap: SPACING.medium,
  },
  rarityText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
  },
  pointsText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.small,
    gap: SPACING.small,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    minWidth: 40,
    textAlign: 'right',
  },
});

export default AchievementsScreen;
