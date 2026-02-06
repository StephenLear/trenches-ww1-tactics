/**
 * WWI Tactical Game - Unit Info Panel Component
 * Displays detailed info about selected unit
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, TEAM_COLORS } from '../styles/colors';
import { UNIT_TYPES } from '../game/constants';

const UnitInfoPanel = ({ unit }) => {
  if (!unit) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Tap a unit to select</Text>
      </View>
    );
  }

  const unitType = UNIT_TYPES[unit.type] || {};
  const teamColor = TEAM_COLORS[unit.team] || COLORS.textWhite;
  const healthPercent = ((unit.hp / unit.maxHp) * 100).toFixed(0);

  return (
    <View style={styles.container}>
      {/* Compact single row layout */}
      <View style={[styles.header, { borderLeftColor: teamColor, borderLeftWidth: 4 }]}>
        <Text style={styles.unitIcon}>{unitType.icon}</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.unitName}>{unit.fullName || unitType.name}</Text>
          <View style={styles.healthBar}>
            <View style={[styles.healthFill, { width: `${healthPercent}%` }]} />
          </View>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>❤️{unit.hp}/{unit.maxHp}</Text>
          <Text style={styles.statText}>⚔️{unit.attack}</Text>
          <Text style={styles.statText}>🛡️{unit.defense}</Text>
          <Text style={styles.statText}>📏{unit.range}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.small,
    overflow: 'hidden',
  },
  emptyText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: SPACING.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
  },
  unitIcon: {
    fontSize: 24,
    marginRight: SPACING.small,
  },
  headerInfo: {
    flex: 1,
    marginRight: SPACING.small,
  },
  unitName: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  healthBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 2,
    marginTop: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    backgroundColor: COLORS.healthFull,
    borderRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.small,
  },
  statText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default UnitInfoPanel;
