/**
 * WWI Tactical Game - Memorial Screen
 * Honoring fallen veterans with their service records
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
import { UNIT_TYPES, FACTIONS } from '../game/constants';

// Memorial quotes for fallen soldiers
const MEMORIAL_QUOTES = [
  "They shall grow not old, as we that are left grow old.",
  "At the going down of the sun and in the morning, we will remember them.",
  "Greater love hath no man than this, that a man lay down his life for his friends.",
  "Their name liveth for evermore.",
  "Lest we forget.",
  "They gave their today for our tomorrow.",
  "In Flanders fields the poppies blow, between the crosses, row on row.",
  "For your tomorrow, we gave our today.",
  "Gone but not forgotten.",
  "Rest in peace, brave soldier.",
];

// Causes of death for flavor text
const CAUSES_OF_DEATH = [
  'Fell in combat',
  'Lost during an assault',
  'Killed by enemy fire',
  'Made the ultimate sacrifice',
  'Gave their life for their comrades',
  'Lost in the trenches',
  'Fell defending their position',
  'Killed in action',
];

const MemorialScreen = ({ navigation }) => {
  const [fallenVeterans, setFallenVeterans] = useState([]);
  const [selectedVeteran, setSelectedVeteran] = useState(null);
  const [faction, setFaction] = useState('british');
  const [totalStats, setTotalStats] = useState({
    totalFallen: 0,
    totalKills: 0,
    totalMissions: 0,
  });

  useFocusEffect(
    useCallback(() => {
      loadMemorialData();
    }, [])
  );

  const loadMemorialData = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        const gameState = result.gameState;
        const fallen = gameState.fallenVeterans || [];

        setFallenVeterans(fallen);
        setFaction(gameState.faction || 'british');

        // Calculate total stats
        const stats = fallen.reduce((acc, vet) => ({
          totalFallen: acc.totalFallen + 1,
          totalKills: acc.totalKills + (vet.kills || 0),
          totalMissions: acc.totalMissions + (vet.missions || 0),
        }), { totalFallen: 0, totalKills: 0, totalMissions: 0 });

        setTotalStats(stats);
      }
    } catch (error) {
      console.log('Error loading memorial data:', error);
    }
  };

  const getRandomQuote = () => {
    return MEMORIAL_QUOTES[Math.floor(Math.random() * MEMORIAL_QUOTES.length)];
  };

  const getCauseOfDeath = (veteran) => {
    if (veteran.causeOfDeath) return veteran.causeOfDeath;
    return CAUSES_OF_DEATH[Math.floor(Math.random() * CAUSES_OF_DEATH.length)];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getRankDisplay = (rank) => {
    switch (rank) {
      case 'sergeant': return '⚌ Sergeant';
      case 'corporal': return '⚊ Corporal';
      default: return 'Private';
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🕊️</Text>
      <Text style={styles.emptyTitle}>No Fallen Comrades</Text>
      <Text style={styles.emptySubtitle}>
        May your soldiers never have to be remembered here.
        {'\n\n'}
        This memorial will honor any veterans who fall in battle.
      </Text>
      <View style={styles.poppyDecoration}>
        <Text style={styles.poppyText}>🌺 🌺 🌺</Text>
      </View>
    </View>
  );

  const renderVeteranCard = (veteran, index) => {
    const unitType = UNIT_TYPES[veteran.type];

    return (
      <TouchableOpacity
        key={veteran.id || index}
        style={styles.veteranCard}
        onPress={() => setSelectedVeteran(veteran)}
        activeOpacity={0.8}
      >
        <View style={styles.crossContainer}>
          <Text style={styles.crossIcon}>✝️</Text>
        </View>

        <View style={styles.veteranInfo}>
          <Text style={styles.veteranName}>{veteran.fullName || veteran.name}</Text>
          <Text style={styles.veteranDetails}>
            {unitType?.icon || '🪖'} {veteran.type} • {getRankDisplay(veteran.rank)}
          </Text>
          <Text style={styles.veteranService}>
            Kills: {veteran.kills || 0} • Missions: {veteran.missions || 0}
          </Text>
        </View>

        <View style={styles.chevronContainer}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderVeteranDetail = () => {
    if (!selectedVeteran) return null;

    const unitType = UNIT_TYPES[selectedVeteran.type];
    const factionData = FACTIONS[faction];

    return (
      <View style={styles.detailOverlay}>
        <TouchableOpacity
          style={styles.detailBackdrop}
          onPress={() => setSelectedVeteran(null)}
          activeOpacity={1}
        />
        <View style={styles.detailCard}>
          {/* Memorial Header */}
          <View style={styles.memorialHeader}>
            <Text style={styles.memorialCross}>✝️</Text>
            <Text style={styles.memorialPoppy}>🌺</Text>
          </View>

          {/* Name and Rank */}
          <Text style={styles.detailName}>
            {selectedVeteran.fullName || selectedVeteran.name}
          </Text>
          <Text style={styles.detailRank}>
            {getRankDisplay(selectedVeteran.rank)} • {unitType?.icon} {selectedVeteran.type}
          </Text>

          {/* Faction */}
          <Text style={styles.detailFaction}>
            {factionData?.flag} {factionData?.name} Forces
          </Text>

          {/* Hometown */}
          {selectedVeteran.hometown && (
            <Text style={styles.detailHometown}>
              📍 From {selectedVeteran.hometown}
            </Text>
          )}

          {/* Service Record */}
          <View style={styles.serviceRecord}>
            <Text style={styles.serviceTitle}>Service Record</Text>
            <View style={styles.serviceStats}>
              <View style={styles.serviceStat}>
                <Text style={styles.serviceValue}>{selectedVeteran.kills || 0}</Text>
                <Text style={styles.serviceLabel}>Enemies Defeated</Text>
              </View>
              <View style={styles.serviceDivider} />
              <View style={styles.serviceStat}>
                <Text style={styles.serviceValue}>{selectedVeteran.missions || 0}</Text>
                <Text style={styles.serviceLabel}>Missions Served</Text>
              </View>
              <View style={styles.serviceDivider} />
              <View style={styles.serviceStat}>
                <Text style={styles.serviceValue}>{selectedVeteran.xp || 0}</Text>
                <Text style={styles.serviceLabel}>Experience</Text>
              </View>
            </View>
          </View>

          {/* Cause of Death */}
          <View style={styles.deathInfo}>
            <Text style={styles.deathCause}>{getCauseOfDeath(selectedVeteran)}</Text>
            {selectedVeteran.deathMission && (
              <Text style={styles.deathMission}>
                Mission {selectedVeteran.deathMission}
              </Text>
            )}
            <Text style={styles.deathDate}>
              {formatDate(selectedVeteran.deathTimestamp)}
            </Text>
          </View>

          {/* Backstory */}
          {selectedVeteran.backstory && (
            <View style={styles.backstoryContainer}>
              <Text style={styles.backstoryText}>
                "{selectedVeteran.backstory}"
              </Text>
            </View>
          )}

          {/* Memorial Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{getRandomQuote()}"</Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedVeteran(null)}
          >
            <Text style={styles.closeButtonText}>Return to Memorial</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const factionData = FACTIONS[faction];

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.memorialIcon}>🌺</Text>
          <Text style={styles.title}>Memorial Wall</Text>
          <Text style={styles.subtitle}>In Honour of the Fallen</Text>
        </View>

        {/* Quote */}
        <View style={styles.headerQuote}>
          <Text style={styles.headerQuoteText}>
            "They shall grow not old, as we that are left grow old.{'\n'}
            Age shall not weary them, nor the years condemn."
          </Text>
          <Text style={styles.headerQuoteAuthor}>— Laurence Binyon, 1914</Text>
        </View>

        {fallenVeterans.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {/* Statistics */}
            <View style={styles.statsCard}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{totalStats.totalFallen}</Text>
                <Text style={styles.statLabel}>Fallen Comrades</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>{totalStats.totalKills}</Text>
                <Text style={styles.statLabel}>Combined Kills</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>{totalStats.totalMissions}</Text>
                <Text style={styles.statLabel}>Missions Served</Text>
              </View>
            </View>

            {/* Faction Info */}
            <View style={styles.factionBanner}>
              <Text style={styles.factionFlag}>{factionData?.flag}</Text>
              <Text style={styles.factionText}>{factionData?.name} Fallen</Text>
            </View>

            {/* Veteran List */}
            <View style={styles.veteranList}>
              {fallenVeterans.map((veteran, index) =>
                renderVeteranCard(veteran, index)
              )}
            </View>

            {/* Footer Memorial */}
            <View style={styles.footerMemorial}>
              <Text style={styles.footerPoppies}>🌺 🌺 🌺</Text>
              <Text style={styles.footerText}>Lest We Forget</Text>
              <Text style={styles.footerYear}>1914 - 1918</Text>
            </View>
          </>
        )}

        <View style={{ height: SPACING.huge }} />
      </ScrollView>

      {/* Detail Modal */}
      {selectedVeteran && renderVeteranDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  memorialIcon: {
    fontSize: 48,
    marginBottom: SPACING.small,
  },
  title: {
    fontSize: FONT_SIZES.header,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  headerQuote: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.danger || '#EF4444',
  },
  headerQuoteText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  headerQuoteAuthor: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.small,
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
    paddingHorizontal: SPACING.large,
    lineHeight: 24,
  },
  poppyDecoration: {
    marginTop: SPACING.xlarge,
  },
  poppyText: {
    fontSize: 32,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.danger || '#EF4444',
  },
  statLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  factionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.medium,
  },
  factionFlag: {
    fontSize: 24,
    marginRight: SPACING.small,
  },
  factionText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  veteranList: {
    marginBottom: SPACING.large,
  },
  veteranCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger || '#EF4444',
    ...SHADOWS.small,
  },
  crossContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  crossIcon: {
    fontSize: 24,
  },
  veteranInfo: {
    flex: 1,
  },
  veteranName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  veteranDetails: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  veteranService: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
  },
  chevronContainer: {
    padding: SPACING.small,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textMuted,
  },
  footerMemorial: {
    alignItems: 'center',
    paddingVertical: SPACING.xlarge,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerPoppies: {
    fontSize: 24,
    marginBottom: SPACING.small,
  },
  footerText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  footerYear: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  detailCard: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.xlarge,
    borderWidth: 2,
    borderColor: COLORS.danger || '#EF4444',
    ...SHADOWS.large,
  },
  memorialHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  memorialCross: {
    fontSize: 48,
    marginRight: SPACING.medium,
  },
  memorialPoppy: {
    fontSize: 48,
  },
  detailName: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.tiny,
  },
  detailRank: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  detailFaction: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  detailHometown: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: SPACING.medium,
  },
  serviceRecord: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  serviceTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceStat: {
    alignItems: 'center',
    flex: 1,
  },
  serviceValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  serviceLabel: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  serviceDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  deathInfo: {
    alignItems: 'center',
    marginBottom: SPACING.medium,
    paddingVertical: SPACING.medium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  deathCause: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.danger || '#EF4444',
    marginBottom: SPACING.tiny,
  },
  deathMission: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  deathDate: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  backstoryContainer: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  backstoryText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  quoteContainer: {
    marginBottom: SPACING.medium,
  },
  quoteText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.medium,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
});

export default MemorialScreen;
