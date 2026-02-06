/**
 * WWI Tactical Game - Upgrades Screen
 * Purchase permanent unit upgrades between missions
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
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { loadGame, saveGame } from '../game/storage';
import { UNIT_TYPES } from '../game/constants';
import {
  UNIT_UPGRADES,
  GLOBAL_UPGRADES,
  getUpgradesForUnitType,
  canPurchaseUpgrade,
  getUpgradeCountByType,
} from '../game/unitUpgrades';

const UNIT_CATEGORIES = [
  { id: 'global', name: 'Global', icon: '🌍' },
  { id: 'infantry', name: 'Infantry', icon: '🪖' },
  { id: 'machinegun', name: 'Machine Gun', icon: '🔫' },
  { id: 'cavalry', name: 'Cavalry', icon: '🐴' },
  { id: 'tank', name: 'Tank', icon: '🛡️' },
  { id: 'artillery', name: 'Artillery', icon: '💥' },
  { id: 'medic', name: 'Medic', icon: '⚕️' },
  { id: 'sniper', name: 'Sniper', icon: '🎯' },
  { id: 'officer', name: 'Officer', icon: '⭐' },
  { id: 'scout', name: 'Scout', icon: '🔭' },
];

const UpgradesScreen = ({ navigation }) => {
  const [requisitionPoints, setRequisitionPoints] = useState(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('global');
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadUpgradeData();
    }, [])
  );

  const loadUpgradeData = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        setRequisitionPoints(result.gameState.requisitionPoints || result.gameState.resources || 0);
        setPurchasedUpgrades(result.gameState.purchasedUpgrades || []);
      }
    } catch (error) {
      console.log('Error loading upgrade data:', error);
    }
  };

  const handlePurchaseUpgrade = async (upgrade) => {
    const { canPurchase, reason } = canPurchaseUpgrade(
      upgrade.id,
      purchasedUpgrades,
      requisitionPoints
    );

    if (!canPurchase) {
      Alert.alert('Cannot Purchase', reason);
      return;
    }

    Alert.alert(
      'Purchase Upgrade?',
      `Buy "${upgrade.name}" for ${upgrade.cost} requisition points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Purchase',
          onPress: async () => {
            try {
              const result = await loadGame();
              const gameState = result.success ? result.gameState : {};

              const newPurchasedUpgrades = [...purchasedUpgrades, upgrade.id];
              const newRequisitionPoints = requisitionPoints - upgrade.cost;

              await saveGame({
                ...gameState,
                purchasedUpgrades: newPurchasedUpgrades,
                requisitionPoints: newRequisitionPoints,
                resources: newRequisitionPoints, // Keep both for compatibility
              });

              setPurchasedUpgrades(newPurchasedUpgrades);
              setRequisitionPoints(newRequisitionPoints);
              setSelectedUpgrade(null);

              Alert.alert('Success!', `${upgrade.name} has been unlocked!`);
            } catch (error) {
              console.log('Error purchasing upgrade:', error);
              Alert.alert('Error', 'Failed to purchase upgrade');
            }
          },
        },
      ]
    );
  };

  const getUpgradesToDisplay = () => {
    if (selectedCategory === 'global') {
      return Object.values(GLOBAL_UPGRADES);
    }
    return getUpgradesForUnitType(selectedCategory);
  };

  const isUpgradePurchased = (upgradeId) => {
    return purchasedUpgrades.includes(upgradeId);
  };

  const renderUpgradeCard = (upgrade) => {
    const purchased = isUpgradePurchased(upgrade.id);
    const { canPurchase, reason } = canPurchaseUpgrade(
      upgrade.id,
      purchasedUpgrades,
      requisitionPoints
    );

    // Get prerequisite info
    let prereqName = null;
    if (upgrade.prerequisite) {
      const prereq = UNIT_UPGRADES[upgrade.prerequisite] || GLOBAL_UPGRADES[upgrade.prerequisite];
      prereqName = prereq?.name;
    }

    return (
      <TouchableOpacity
        key={upgrade.id}
        style={[
          styles.upgradeCard,
          purchased && styles.upgradeCardPurchased,
          !canPurchase && !purchased && styles.upgradeCardLocked,
        ]}
        onPress={() => !purchased && setSelectedUpgrade(upgrade)}
        activeOpacity={purchased ? 1 : 0.7}
        disabled={purchased}
      >
        <View style={styles.upgradeHeader}>
          <View style={[
            styles.upgradeIconContainer,
            purchased && styles.upgradeIconPurchased,
          ]}>
            <Text style={styles.upgradeIcon}>{upgrade.icon}</Text>
          </View>

          <View style={styles.upgradeTitleContainer}>
            <Text style={[
              styles.upgradeName,
              purchased && styles.upgradeNamePurchased,
            ]}>
              {upgrade.name}
            </Text>
            <Text style={styles.upgradeTier}>
              Tier {upgrade.tier}
            </Text>
          </View>

          {purchased ? (
            <View style={styles.purchasedBadge}>
              <Text style={styles.purchasedText}>✓</Text>
            </View>
          ) : (
            <View style={[
              styles.costBadge,
              !canPurchase && styles.costBadgeLocked,
            ]}>
              <Text style={[
                styles.costText,
                !canPurchase && styles.costTextLocked,
              ]}>
                {upgrade.cost}
              </Text>
            </View>
          )}
        </View>

        <Text style={[
          styles.upgradeDescription,
          purchased && styles.upgradeDescriptionPurchased,
        ]}>
          {upgrade.description}
        </Text>

        {prereqName && !purchased && !isUpgradePurchased(upgrade.prerequisite) && (
          <Text style={styles.prerequisiteText}>
            Requires: {prereqName}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderUpgradeDetail = () => {
    if (!selectedUpgrade) return null;

    const { canPurchase, reason } = canPurchaseUpgrade(
      selectedUpgrade.id,
      purchasedUpgrades,
      requisitionPoints
    );

    // Format effect description
    const effectDesc = Object.entries(selectedUpgrade.effect || {})
      .map(([key, value]) => {
        const labels = {
          hp: 'HP',
          attack: 'Attack',
          defense: 'Defense',
          range: 'Range',
          move: 'Movement',
          critBonus: 'Critical Chance',
          healBonus: 'Healing',
          abilityRange: 'Ability Range',
          rallyBonus: 'Rally Power',
          globalHP: 'All Units HP',
          globalMove: 'All Units Movement',
          globalRegen: 'HP Regeneration',
          trenchDefenseBonus: 'Trench Defense',
          combinedArmsBonus: 'Combined Arms',
        };
        const label = labels[key] || key;
        const sign = value > 0 ? '+' : '';
        return `${sign}${value} ${label}`;
      })
      .join(', ');

    return (
      <View style={styles.detailOverlay}>
        <TouchableOpacity
          style={styles.detailBackdrop}
          onPress={() => setSelectedUpgrade(null)}
          activeOpacity={1}
        />
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <Text style={styles.detailIcon}>{selectedUpgrade.icon}</Text>
          </View>

          <Text style={styles.detailName}>{selectedUpgrade.name}</Text>
          <Text style={styles.detailTier}>Tier {selectedUpgrade.tier}</Text>

          <View style={styles.detailEffects}>
            <Text style={styles.detailEffectsTitle}>Effects</Text>
            <Text style={styles.detailEffectsText}>{effectDesc}</Text>
          </View>

          <View style={styles.detailCost}>
            <Text style={styles.detailCostLabel}>Cost</Text>
            <Text style={styles.detailCostValue}>{selectedUpgrade.cost} RP</Text>
          </View>

          {!canPurchase && (
            <Text style={styles.detailReason}>{reason}</Text>
          )}

          <View style={styles.detailButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedUpgrade(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purchaseButton,
                !canPurchase && styles.purchaseButtonDisabled,
              ]}
              onPress={() => handlePurchaseUpgrade(selectedUpgrade)}
              disabled={!canPurchase}
            >
              <Text style={[
                styles.purchaseButtonText,
                !canPurchase && styles.purchaseButtonTextDisabled,
              ]}>
                Purchase
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const upgrades = getUpgradesToDisplay();
  const upgradeCounts = getUpgradeCountByType(purchasedUpgrades);

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Armory</Text>
          <Text style={styles.subtitle}>Purchase Unit Upgrades</Text>

          {/* Requisition Points Display */}
          <View style={styles.requisitionDisplay}>
            <Text style={styles.requisitionLabel}>Requisition Points</Text>
            <Text style={styles.requisitionValue}>{requisitionPoints}</Text>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {UNIT_CATEGORIES.map(category => {
            const count = upgradeCounts[category.id] || 0;
            const total = category.id === 'global'
              ? Object.keys(GLOBAL_UPGRADES).length
              : getUpgradesForUnitType(category.id).length;

            return (
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
                <Text style={styles.categoryCount}>
                  {count}/{total}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Unit Info (for non-global categories) */}
        {selectedCategory !== 'global' && UNIT_TYPES[selectedCategory] && (
          <View style={styles.unitInfo}>
            <Text style={styles.unitInfoIcon}>
              {UNIT_TYPES[selectedCategory].icon}
            </Text>
            <View style={styles.unitInfoText}>
              <Text style={styles.unitInfoName}>
                {UNIT_TYPES[selectedCategory].name}
              </Text>
              <Text style={styles.unitInfoDescription}>
                {UNIT_TYPES[selectedCategory].description}
              </Text>
            </View>
          </View>
        )}

        {/* Upgrades List */}
        <View style={styles.upgradesList}>
          {upgrades.map(upgrade => renderUpgradeCard(upgrade))}
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>

      {/* Upgrade Detail Modal */}
      {selectedUpgrade && renderUpgradeDetail()}
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
  requisitionDisplay: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  requisitionLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  requisitionValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  categoryScroll: {
    marginBottom: SPACING.large,
  },
  categoryContainer: {
    paddingHorizontal: SPACING.small,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: RADIUS.medium,
    marginRight: SPACING.small,
    minWidth: 80,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: FONT_SIZES.large,
    marginBottom: 2,
  },
  categoryName: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryNameActive: {
    color: COLORS.textWhite,
  },
  categoryCount: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  unitInfo: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  unitInfoIcon: {
    fontSize: 40,
    marginRight: SPACING.medium,
  },
  unitInfoText: {
    flex: 1,
  },
  unitInfoName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  unitInfoDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  upgradesList: {
    gap: SPACING.medium,
  },
  upgradeCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    ...SHADOWS.small,
  },
  upgradeCardPurchased: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
    borderWidth: 1,
  },
  upgradeCardLocked: {
    opacity: 0.6,
  },
  upgradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  upgradeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  upgradeIconPurchased: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  upgradeIcon: {
    fontSize: 24,
  },
  upgradeTitleContainer: {
    flex: 1,
  },
  upgradeName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  upgradeNamePurchased: {
    color: '#10B981',
  },
  upgradeTier: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  costBadge: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.small,
    borderRadius: RADIUS.small,
  },
  costBadgeLocked: {
    backgroundColor: COLORS.textMuted,
  },
  costText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  costTextLocked: {
    color: COLORS.backgroundDark,
  },
  purchasedBadge: {
    backgroundColor: '#10B981',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchasedText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
  upgradeDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: 60,
  },
  upgradeDescriptionPurchased: {
    color: '#10B981',
  },
  prerequisiteText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.danger || '#EF4444',
    marginLeft: 60,
    marginTop: SPACING.tiny,
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
    ...SHADOWS.large,
  },
  detailIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.medium,
  },
  detailIcon: {
    fontSize: 40,
  },
  detailName: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.tiny,
  },
  detailTier: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: SPACING.medium,
  },
  detailEffects: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    width: '100%',
    marginBottom: SPACING.medium,
  },
  detailEffectsTitle: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.tiny,
  },
  detailEffectsText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.success || '#10B981',
    fontWeight: '600',
  },
  detailCost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  detailCostLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginRight: SPACING.small,
  },
  detailCostValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.accent,
  },
  detailReason: {
    fontSize: FONT_SIZES.small,
    color: COLORS.danger || '#EF4444',
    marginBottom: SPACING.medium,
  },
  detailButtons: {
    flexDirection: 'row',
    gap: SPACING.medium,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
  purchaseButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  purchaseButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
  purchaseButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});

export default UpgradesScreen;
