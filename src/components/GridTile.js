/**
 * WWI Tactical Game - Grid Tile Component
 * Individual tile with terrain, highlights, and touch handling
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, TERRAIN_COLORS, SPACING } from '../styles/colors';
import { TERRAIN_TYPES } from '../game/constants';

const GridTile = ({
  x,
  y,
  terrain,
  isHighlighted,
  highlightType,
  onPress,
  children,
  tileSize = 48,
}) => {
  const terrainData = terrain || { type: 'grass' };
  const terrainInfo = TERRAIN_TYPES[terrainData.type] || TERRAIN_TYPES.grass;
  const terrainColor = TERRAIN_COLORS[terrainData.type] || TERRAIN_COLORS.grass;

  // Determine highlight color based on type
  const getHighlightColor = () => {
    if (!isHighlighted) return 'transparent';

    switch (highlightType) {
      case 'move':
        return 'rgba(74, 144, 226, 0.4)'; // Blue for movement
      case 'attack':
        return 'rgba(226, 74, 74, 0.4)'; // Red for attack
      case 'selected':
        return 'rgba(212, 175, 55, 0.5)'; // Gold for selected
      case 'ability':
        return 'rgba(138, 43, 226, 0.4)'; // Purple for abilities
      default:
        return 'rgba(74, 124, 89, 0.3)'; // Green default
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          backgroundColor: terrainColor,
        },
      ]}
      onPress={() => onPress && onPress(x, y)}
      activeOpacity={0.7}
    >
      {/* Terrain Icon (bottom layer) */}
      <View style={styles.terrainIcon}>
        <Text style={styles.terrainText}>{terrainInfo.icon}</Text>
      </View>

      {/* Highlight Overlay */}
      {isHighlighted && (
        <View
          style={[
            styles.highlight,
            { backgroundColor: getHighlightColor() },
          ]}
        />
      )}

      {/* Children (units, effects, etc.) */}
      {children}

      {/* Coordinate Label (debug mode) */}
      {/* <View style={styles.coordLabel}>
        <Text style={styles.coordText}>{x},{y}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  terrainIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
    opacity: 0.5,
  },
  terrainText: {
    fontSize: 12,
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  coordLabel: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 2,
  },
  coordText: {
    fontSize: 8,
    color: COLORS.textWhite,
    fontFamily: 'monospace',
  },
});

export default GridTile;
