/**
 * WWI Tactical Game - Command HQ Screen
 * Tech tree, veteran roster, and shop (simplified version for Phase 2)
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
import { TECH_TREE, FACTIONS, REQUISITION_SHOP, UNIT_TYPES } from '../game/constants';
import { generateSoldier } from '../game/progression';
import { loadGame, saveGame } from '../game/storage';

const CommandHQScreen = ({ route, navigation }) => {
  const [gameState, setGameState] = useState(null);
  const [selectedTab, setSelectedTab] = useState('faction'); // 'faction', 'veterans', 'tech', 'shop'

  useEffect(() => {
    loadGameState();
  }, []);

  const loadGameState = async () => {
    const result = await loadGame();
    const savedGame = result.success ? result.gameState : null;
    // Merge with defaults to ensure all fields exist
    setGameState({
      veterans: [],
      researchedTech: [],
      resources: 100,
      completedMissions: [],
      faction: 'british', // Default faction
      ...savedGame,
    });
  };

  const handleSelectFaction = async (factionId) => {
    const updatedGameState = {
      ...gameState,
      faction: factionId,
    };
    await saveGame(updatedGameState);
    setGameState(updatedGameState);
  };

  const renderFactionTab = () => {
    const currentFaction = gameState?.faction || 'british';

    return (
      <View>
        <Text style={styles.sectionTitle}>Select Your Nation</Text>
        <Text style={styles.sectionSubtitle}>
          Choose which nation you'll lead through the Great War. Each has unique bonuses.
        </Text>

        {Object.entries(FACTIONS).map(([factionId, faction]) => {
          const isSelected = currentFaction === factionId;

          return (
            <TouchableOpacity
              key={factionId}
              style={[
                styles.factionCard,
                isSelected && styles.factionCardSelected,
              ]}
              onPress={() => handleSelectFaction(factionId)}
            >
              <View style={styles.factionHeader}>
                <Text style={styles.factionFlag}>{faction.flag}</Text>
                <View style={styles.factionInfo}>
                  <Text style={styles.factionName}>{faction.name}</Text>
                  <Text style={styles.factionDescription}>{faction.description}</Text>
                </View>
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓</Text>
                  </View>
                )}
              </View>

              <View style={styles.factionBonuses}>
                <Text style={styles.bonusTitle}>Bonuses:</Text>
                <Text style={styles.bonusText}>{faction.bonuses.description}</Text>
              </View>

              <View style={styles.factionModifiers}>
                <Text style={styles.modifierTitle}>Unit Modifiers:</Text>
                {Object.entries(faction.unitModifiers).map(([unitType, modifiers]) => (
                  <View key={unitType} style={styles.modifierRow}>
                    <Text style={styles.modifierUnit}>{unitType}:</Text>
                    <Text style={styles.modifierStats}>
                      {Object.entries(modifiers).map(([stat, value]) =>
                        `+${value} ${stat.toUpperCase()}`
                      ).join(', ')}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleToggleFavorite = async (veteranIndex) => {
    const veterans = [...(gameState?.veterans || [])];
    if (veterans[veteranIndex]) {
      veterans[veteranIndex] = {
        ...veterans[veteranIndex],
        isFavorite: !veterans[veteranIndex].isFavorite,
      };

      const updatedGameState = {
        ...gameState,
        veterans,
      };

      await saveGame(updatedGameState);
      setGameState(updatedGameState);
    }
  };

  const renderVeteransTab = () => {
    const veterans = gameState?.veterans || [];

    if (veterans.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🪖</Text>
          <Text style={styles.emptyText}>No Veterans Yet</Text>
          <Text style={styles.emptySubtext}>
            Complete missions to recruit veteran soldiers
          </Text>
        </View>
      );
    }

    // Sort veterans: favorites first, then by XP
    const sortedVeterans = [...veterans].map((v, i) => ({ ...v, originalIndex: i }));
    sortedVeterans.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return (b.xp || 0) - (a.xp || 0);
    });

    const favoriteCount = veterans.filter(v => v.isFavorite).length;

    return (
      <View>
        <Text style={styles.sectionTitle}>Veteran Roster ({veterans.length})</Text>
        {favoriteCount > 0 && (
          <Text style={styles.favoriteCount}>⭐ {favoriteCount} Favorite{favoriteCount > 1 ? 's' : ''}</Text>
        )}
        {sortedVeterans.map((veteran) => (
          <View key={veteran.originalIndex} style={[
            styles.veteranCard,
            veteran.isFavorite && styles.veteranCardFavorite,
          ]}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleToggleFavorite(veteran.originalIndex)}
            >
              <Text style={styles.favoriteIcon}>
                {veteran.isFavorite ? '⭐' : '☆'}
              </Text>
            </TouchableOpacity>

            <View style={styles.veteranContent}>
              <View style={styles.veteranHeader}>
                <Text style={styles.veteranName}>
                  {veteran.isFavorite && '⭐ '}{veteran.fullName}
                </Text>
                <Text style={styles.veteranRank}>
                  {veteran.rank === 'sergeant'
                    ? '⚌ Sergeant'
                    : veteran.rank === 'corporal'
                    ? '⚊ Corporal'
                    : 'Private'}
                </Text>
              </View>
              <View style={styles.veteranStats}>
                <Text style={styles.veteranStat}>
                  {UNIT_TYPES[veteran.type]?.icon || '🪖'} {veteran.type}
                </Text>
                <Text style={styles.veteranStat}>XP: {veteran.xp}</Text>
                <Text style={styles.veteranStat}>Kills: {veteran.kills}</Text>
              </View>
              {veteran.hometown && (
                <Text style={styles.veteranHometown}>📍 {veteran.hometown}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const handleResearchTech = async (techId) => {
    const tech = TECH_TREE[techId];
    const resources = gameState?.resources || 0;
    const cost = tech.cost || 50;

    if (resources < cost) {
      // Not enough resources
      return;
    }

    const updatedGameState = {
      ...gameState,
      researchedTech: [...(gameState?.researchedTech || []), techId],
      resources: resources - cost,
    };

    await saveGame(updatedGameState);
    setGameState(updatedGameState);
  };

  const renderTechTab = () => {
    const researchedTech = gameState?.researchedTech || [];
    const resources = gameState?.resources ?? 100; // Default to 100 if undefined

    return (
      <View>
        <Text style={styles.sectionTitle}>Technology Tree</Text>
        <Text style={styles.sectionSubtitle}>
          Research technologies to improve your forces
        </Text>
        <Text style={styles.resourcesText}>Resources: {resources} RP</Text>

        {Object.entries(TECH_TREE).map(([techId, tech]) => {
          const isResearched = researchedTech.includes(techId);
          const cost = tech.cost || 50;
          const canAfford = resources >= cost;

          return (
            <TouchableOpacity
              key={techId}
              style={[
                styles.techCard,
                isResearched && styles.techCardResearched,
                !isResearched && !canAfford && styles.techCardDisabled,
              ]}
              onPress={() => !isResearched && canAfford && handleResearchTech(techId)}
              disabled={isResearched || !canAfford}
            >
              <View style={styles.techHeader}>
                <Text style={styles.techName}>{tech.name}</Text>
                {isResearched ? (
                  <Text style={styles.researchedBadge}>✓ Researched</Text>
                ) : (
                  <Text style={[styles.costBadge, !canAfford && styles.costBadgeDisabled]}>
                    {cost} RP
                  </Text>
                )}
              </View>
              <Text style={styles.techDescription}>{tech.description}</Text>
              {tech.effects && (
                <Text style={styles.techEffects}>Effects: {tech.effects}</Text>
              )}
              {!isResearched && (
                <Text style={styles.tapToResearch}>
                  {canAfford ? 'Tap to research' : 'Not enough resources'}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleRecruitUnit = async (shopId) => {
    const shopItem = REQUISITION_SHOP[shopId];
    const resources = gameState?.resources || 0;
    const cost = shopItem.cost || 25;

    if (resources < cost) {
      return;
    }

    // Generate a new soldier based on current faction
    const currentFaction = gameState?.faction || 'british';
    const soldier = generateSoldier(currentFaction);
    const unitType = UNIT_TYPES[shopItem.type];

    const newVeteran = {
      id: `recruit_${Date.now()}_${Math.random()}`,
      type: shopItem.type,
      name: soldier.fullName,
      fullName: soldier.fullName,
      hometown: soldier.hometown,
      backstory: soldier.backstory,
      xp: 0,
      kills: 0,
      rank: 'private',
      bonusHP: 0,
      bonusAttack: 0,
      bonusDefense: 0,
      bonusRange: 0,
      missions: 0,
    };

    const updatedGameState = {
      ...gameState,
      veterans: [...(gameState?.veterans || []), newVeteran],
      resources: resources - cost,
    };

    await saveGame(updatedGameState);
    setGameState(updatedGameState);
  };

  const renderShopTab = () => {
    const resources = gameState?.resources ?? 100;

    return (
      <View>
        <Text style={styles.sectionTitle}>Requisition Shop</Text>
        <Text style={styles.sectionSubtitle}>
          Recruit new soldiers to join your roster
        </Text>
        <Text style={styles.resourcesText}>Resources: {resources} RP</Text>

        {Object.entries(REQUISITION_SHOP).map(([shopId, item]) => {
          const unitType = UNIT_TYPES[item.type];
          const canAfford = resources >= item.cost;

          return (
            <TouchableOpacity
              key={shopId}
              style={[
                styles.shopCard,
                !canAfford && styles.shopCardDisabled,
              ]}
              onPress={() => canAfford && handleRecruitUnit(shopId)}
              disabled={!canAfford}
            >
              <View style={styles.shopHeader}>
                <Text style={styles.shopIcon}>{unitType?.icon || '🪖'}</Text>
                <View style={styles.shopInfo}>
                  <Text style={styles.shopName}>{item.name}</Text>
                  <Text style={styles.shopDescription}>{item.description}</Text>
                </View>
                <Text style={[styles.shopCost, !canAfford && styles.shopCostDisabled]}>
                  {item.cost} RP
                </Text>
              </View>
              <View style={styles.shopStats}>
                <Text style={styles.shopStat}>HP: {unitType?.hp}</Text>
                <Text style={styles.shopStat}>ATK: {unitType?.attack}</Text>
                <Text style={styles.shopStat}>DEF: {unitType?.defense}</Text>
                <Text style={styles.shopStat}>RNG: {unitType?.range}</Text>
                <Text style={styles.shopStat}>MOV: {unitType?.move}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Show loading state while game state is loading
  if (!gameState) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary, fontSize: FONT_SIZES.large }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'faction' && styles.tabActive]}
          onPress={() => setSelectedTab('faction')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'faction' && styles.tabTextActive,
            ]}
          >
            Nation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'veterans' && styles.tabActive]}
          onPress={() => setSelectedTab('veterans')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'veterans' && styles.tabTextActive,
            ]}
          >
            Veterans
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'tech' && styles.tabActive]}
          onPress={() => setSelectedTab('tech')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'tech' && styles.tabTextActive,
            ]}
          >
            Tech
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'shop' && styles.tabActive]}
          onPress={() => setSelectedTab('shop')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'shop' && styles.tabTextActive,
            ]}
          >
            Shop
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'faction' && renderFactionTab()}
        {selectedTab === 'veterans' && renderVeteransTab()}
        {selectedTab === 'tech' && renderTechTab()}
        {selectedTab === 'shop' && renderShopTab()}

        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.accent,
  },
  tabText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.accent,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.large,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxlarge * 2,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: SPACING.large,
  },
  emptyText: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xlarge,
  },
  veteranCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...SHADOWS.small,
  },
  veteranCardFavorite: {
    borderLeftColor: COLORS.accent,
    backgroundColor: COLORS.accent + '10',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.small,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  favoriteCount: {
    fontSize: FONT_SIZES.small,
    color: COLORS.accent,
    marginBottom: SPACING.medium,
    fontWeight: '600',
  },
  veteranContent: {
    flex: 1,
  },
  veteranHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  veteranName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  veteranRank: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.accent,
  },
  veteranStats: {
    flexDirection: 'row',
    gap: SPACING.medium,
    marginBottom: SPACING.small,
  },
  veteranStat: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  veteranHometown: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  techCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  techCardResearched: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '15',
  },
  techHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  techName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  researchedBadge: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.success,
  },
  techDescription: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  techEffects: {
    fontSize: FONT_SIZES.small,
    color: COLORS.accent,
    fontStyle: 'italic',
  },
  techCardDisabled: {
    opacity: 0.5,
  },
  resourcesText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: SPACING.large,
  },
  costBadge: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.tiny,
    borderRadius: RADIUS.small,
  },
  costBadgeDisabled: {
    color: COLORS.textMuted,
    backgroundColor: COLORS.textMuted + '20',
  },
  tapToResearch: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginTop: SPACING.small,
  },
  shopCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shopCardDisabled: {
    opacity: 0.5,
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  shopIcon: {
    fontSize: 32,
    marginRight: SPACING.medium,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  shopDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  shopCost: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.accent,
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.small,
  },
  shopCostDisabled: {
    color: COLORS.textMuted,
    backgroundColor: COLORS.textMuted + '20',
  },
  shopStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.medium,
    marginTop: SPACING.small,
    paddingTop: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  shopStat: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.tiny,
    borderRadius: RADIUS.small,
  },
  // Faction styles
  factionCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  factionCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '10',
  },
  factionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  factionFlag: {
    fontSize: 48,
    marginRight: SPACING.medium,
  },
  factionInfo: {
    flex: 1,
  },
  factionName: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  factionDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
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
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  factionBonuses: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    padding: SPACING.medium,
    marginBottom: SPACING.small,
  },
  bonusTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: SPACING.tiny,
  },
  bonusText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
  factionModifiers: {
    paddingTop: SPACING.small,
  },
  modifierTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  modifierRow: {
    flexDirection: 'row',
    marginBottom: SPACING.tiny,
  },
  modifierUnit: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
    width: 100,
  },
  modifierStats: {
    fontSize: FONT_SIZES.small,
    color: COLORS.accent,
    fontWeight: '600',
  },
});

export default CommandHQScreen;
