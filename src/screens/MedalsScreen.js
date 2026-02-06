/**
 * WWI Tactical Game - Medals Screen
 * Display earned achievements and progress
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
import { loadGame } from '../game/storage';
import {
  MEDALS,
  MEDAL_RARITIES,
  getUnlockedMedals,
  getMedalProgress,
  getMedalsByCategory,
  getTotalMedalCount,
} from '../game/medals';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🏅' },
  { id: 'campaign', name: 'Campaign', icon: '⚔️' },
  { id: 'faction', name: 'Faction', icon: '🚩' },
  { id: 'combat', name: 'Combat', icon: '💀' },
  { id: 'survival', name: 'Survival', icon: '🛡️' },
  { id: 'veteran', name: 'Veteran', icon: '👥' },
  { id: 'special', name: 'Special', icon: '⭐' },
];

const MedalsScreen = ({ navigation }) => {
  const [unlockedMedals, setUnlockedMedals] = useState([]);
  const [medalStats, setMedalStats] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedal, setSelectedMedal] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadMedalData();
    }, [])
  );

  const loadMedalData = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        const stats = result.gameState.medalStats || {};
        setMedalStats(stats);
        setUnlockedMedals(getUnlockedMedals(stats));
      }
    } catch (error) {
      console.log('Error loading medal data:', error);
    }
  };

  const getMedalsToDisplay = () => {
    if (selectedCategory === 'all') {
      return Object.values(MEDALS);
    }
    return getMedalsByCategory(selectedCategory);
  };

  const isMedalUnlocked = (medalId) => {
    return unlockedMedals.includes(medalId);
  };

  const renderMedalCard = (medal) => {
    const unlocked = isMedalUnlocked(medal.id);
    const rarity = MEDAL_RARITIES[medal.rarity];
    const progress = getMedalProgress(medal.id, medalStats);

    return (
      <TouchableOpacity
        key={medal.id}
        style={[
          styles.medalCard,
          unlocked && { borderColor: rarity.color, borderWidth: 2 },
          !unlocked && styles.medalCardLocked,
        ]}
        onPress={() => setSelectedMedal(medal)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.medalIconContainer,
          unlocked && { backgroundColor: rarity.bgColor },
        ]}>
          <Text style={styles.medalIcon}>
            {unlocked ? medal.icon : '🔒'}
          </Text>
        </View>

        <Text style={[
          styles.medalName,
          !unlocked && styles.medalNameLocked,
        ]} numberOfLines={1}>
          {unlocked ? medal.name : '???'}
        </Text>

        <Text style={[
          styles.medalRarity,
          { color: unlocked ? rarity.color : COLORS.textMuted },
        ]}>
          {rarity.name}
        </Text>

        {/* Progress bar for locked medals */}
        {!unlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        )}

        {/* Checkmark for unlocked */}
        {unlocked && (
          <View style={styles.unlockedBadge}>
            <Text style={styles.unlockedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMedalDetail = () => {
    if (!selectedMedal) return null;

    const unlocked = isMedalUnlocked(selectedMedal.id);
    const rarity = MEDAL_RARITIES[selectedMedal.rarity];
    const progress = getMedalProgress(selectedMedal.id, medalStats);

    return (
      <View style={styles.detailOverlay}>
        <TouchableOpacity
          style={styles.detailBackdrop}
          onPress={() => setSelectedMedal(null)}
          activeOpacity={1}
        />
        <View style={[
          styles.detailCard,
          { borderColor: unlocked ? rarity.color : COLORS.border },
        ]}>
          <View style={[
            styles.detailIconContainer,
            unlocked && { backgroundColor: rarity.bgColor },
          ]}>
            <Text style={styles.detailIcon}>
              {unlocked ? selectedMedal.icon : '🔒'}
            </Text>
          </View>

          <Text style={styles.detailName}>
            {unlocked ? selectedMedal.name : '???'}
          </Text>

          <Text style={[styles.detailRarity, { color: rarity.color }]}>
            {rarity.name}
          </Text>

          <Text style={styles.detailDescription}>
            {selectedMedal.description}
          </Text>

          {selectedMedal.historicalNote && unlocked && (
            <View style={styles.historicalNote}>
              <Text style={styles.historicalNoteTitle}>📜 Historical Note</Text>
              <Text style={styles.historicalNoteText}>
                {selectedMedal.historicalNote}
              </Text>
            </View>
          )}

          {!unlocked && (
            <View style={styles.detailProgress}>
              <Text style={styles.detailProgressLabel}>Progress</Text>
              <View style={styles.detailProgressBar}>
                <View style={[
                  styles.detailProgressFill,
                  { width: `${progress}%` },
                ]} />
              </View>
              <Text style={styles.detailProgressText}>{Math.round(progress)}%</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedMedal(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const medals = getMedalsToDisplay();
  const totalMedals = getTotalMedalCount();
  const unlockedCount = unlockedMedals.length;

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎖️ Medals & Honours</Text>
          <Text style={styles.subtitle}>
            {unlockedCount} / {totalMedals} Unlocked
          </Text>

          {/* Overall progress bar */}
          <View style={styles.overallProgress}>
            <View style={styles.overallProgressBar}>
              <View style={[
                styles.overallProgressFill,
                { width: `${(unlockedCount / totalMedals) * 100}%` },
              ]} />
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryName,
                selectedCategory === category.id && styles.categoryNameActive,
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Medals Grid */}
        <View style={styles.medalsGrid}>
          {medals.map(medal => renderMedalCard(medal))}
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>

      {/* Medal Detail Modal */}
      {selectedMedal && renderMedalDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.large,
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
    marginBottom: SPACING.medium,
  },
  overallProgress: {
    width: '100%',
    paddingHorizontal: SPACING.large,
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 4,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  categoryScroll: {
    marginBottom: SPACING.large,
  },
  categoryContainer: {
    paddingHorizontal: SPACING.small,
    gap: SPACING.small,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: RADIUS.large,
    marginRight: SPACING.small,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: FONT_SIZES.medium,
    marginRight: SPACING.tiny,
  },
  categoryName: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryNameActive: {
    color: COLORS.textWhite,
  },
  medalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  medalCard: {
    width: '48%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  medalCardLocked: {
    opacity: 0.7,
  },
  medalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.small,
  },
  medalIcon: {
    fontSize: 32,
  },
  medalName: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.tiny,
  },
  medalNameLocked: {
    color: COLORS.textMuted,
  },
  medalRarity: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressContainer: {
    width: '100%',
    marginTop: SPACING.small,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.textMuted,
    borderRadius: 2,
  },
  progressText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
  },
  unlockedBadge: {
    position: 'absolute',
    top: SPACING.small,
    right: SPACING.small,
    backgroundColor: COLORS.success || '#10B981',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: '700',
  },
  // Detail Modal
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
    width: '85%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    alignItems: 'center',
    borderWidth: 2,
    ...SHADOWS.large,
  },
  detailIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.medium,
  },
  detailIcon: {
    fontSize: 48,
  },
  detailName: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.tiny,
  },
  detailRarity: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.medium,
  },
  detailDescription: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  historicalNote: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    width: '100%',
    marginBottom: SPACING.medium,
  },
  historicalNoteTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: SPACING.tiny,
  },
  historicalNoteText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  detailProgress: {
    width: '100%',
    marginBottom: SPACING.medium,
  },
  detailProgressLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  detailProgressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.tiny,
  },
  detailProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  detailProgressText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.medium,
    marginTop: SPACING.small,
  },
  closeButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
});

export default MedalsScreen;
