/**
 * WWI Tactical Game - Campaign Progress Map
 * Visual Western Front map showing player's advance
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { loadGame } from '../game/storage';
import { MISSIONS } from '../game/missions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAP_WIDTH = SCREEN_WIDTH - SPACING.large * 2;
const MAP_HEIGHT = 500;

// Campaign map locations (positioned on stylized Western Front)
const MAP_LOCATIONS = {
  // Belgium & Northern France
  ypres: { x: 0.35, y: 0.15, name: 'Ypres', region: 'Belgium' },
  passchendaele: { x: 0.40, y: 0.12, name: 'Passchendaele', region: 'Belgium' },

  // Somme Region
  somme: { x: 0.45, y: 0.35, name: 'Somme', region: 'France' },
  albert: { x: 0.42, y: 0.38, name: 'Albert', region: 'France' },

  // Verdun Region
  verdun: { x: 0.65, y: 0.55, name: 'Verdun', region: 'France' },
  douaumont: { x: 0.68, y: 0.52, name: 'Douaumont', region: 'France' },

  // Champagne
  champagne: { x: 0.55, y: 0.45, name: 'Champagne', region: 'France' },
  reims: { x: 0.52, y: 0.48, name: 'Reims', region: 'France' },

  // Argonne
  argonne: { x: 0.60, y: 0.60, name: 'Argonne', region: 'France' },
  meuse: { x: 0.62, y: 0.65, name: 'Meuse', region: 'France' },

  // Marne
  marne: { x: 0.48, y: 0.55, name: 'Marne', region: 'France' },

  // Vimy & Arras
  vimy: { x: 0.38, y: 0.28, name: 'Vimy Ridge', region: 'France' },
  arras: { x: 0.40, y: 0.32, name: 'Arras', region: 'France' },

  // Cambrai
  cambrai: { x: 0.43, y: 0.42, name: 'Cambrai', region: 'France' },

  // Belleau Wood
  belleau: { x: 0.50, y: 0.52, name: 'Belleau Wood', region: 'France' },

  // Spring Offensive locations
  amiens: { x: 0.38, y: 0.40, name: 'Amiens', region: 'France' },

  // Final push
  hindenburg: { x: 0.55, y: 0.38, name: 'Hindenburg Line', region: 'France' },
  sedan: { x: 0.70, y: 0.58, name: 'Sedan', region: 'France' },
};

// Mission to location mapping
const MISSION_LOCATIONS = {
  'mission_1': 'ypres',
  'mission_2': 'somme',
  'mission_3': 'verdun',
  'mission_4': 'vimy',
  'mission_5': 'passchendaele',
  'mission_6': 'cambrai',
  'mission_7': 'champagne',
  'mission_8': 'belleau',
  'mission_9': 'marne',
  'mission_10': 'argonne',
  'mission_11': 'meuse',
  'mission_12': 'amiens',
  'mission_13': 'hindenburg',
  'mission_14': 'reims',
  'mission_15': 'albert',
  'mission_16': 'arras',
  'mission_17': 'douaumont',
  'mission_18': 'sedan',
  'mission_19': 'marne',
  'mission_20': 'ypres',
};

/**
 * Animated map marker component
 */
const MapMarker = ({ location, status, onPress, isActive }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isActive]);

  const getMarkerColor = () => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'available':
        return COLORS.accent;
      case 'locked':
        return COLORS.textMuted;
      default:
        return COLORS.textMuted;
    }
  };

  const getMarkerIcon = () => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'available':
        return '⚔️';
      case 'locked':
        return '🔒';
      default:
        return '•';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.marker,
        {
          left: location.x * MAP_WIDTH - 15,
          top: location.y * MAP_HEIGHT - 15,
        },
      ]}
      onPress={onPress}
      disabled={status === 'locked'}
    >
      <Animated.View
        style={[
          styles.markerDot,
          {
            backgroundColor: getMarkerColor(),
            transform: [{ scale: isActive ? pulseAnim : 1 }],
          },
        ]}
      >
        <Text style={styles.markerIcon}>{getMarkerIcon()}</Text>
      </Animated.View>
      <Text style={[styles.markerLabel, { color: getMarkerColor() }]}>
        {location.name}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Connection line between locations
 */
const ConnectionLine = ({ from, to, isCompleted }) => {
  const fromX = from.x * MAP_WIDTH;
  const fromY = from.y * MAP_HEIGHT;
  const toX = to.x * MAP_WIDTH;
  const toY = to.y * MAP_HEIGHT;

  // Calculate line properties
  const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

  return (
    <View
      style={[
        styles.connectionLine,
        {
          left: fromX,
          top: fromY,
          width: length,
          transform: [{ rotate: `${angle}deg` }],
          backgroundColor: isCompleted ? COLORS.success + '60' : COLORS.textMuted + '30',
        },
      ]}
    />
  );
};

const CampaignMapScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [missionStates, setMissionStates] = useState({});

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    const result = await loadGame();
    if (result.success) {
      setGameState(result.gameState);

      // Determine mission states
      const completed = result.gameState.completedMissions || [];
      const states = {};

      Object.keys(MISSION_LOCATIONS).forEach((missionId, index) => {
        if (completed.includes(missionId)) {
          states[missionId] = 'completed';
        } else if (index === 0 || completed.includes(`mission_${index}`)) {
          states[missionId] = 'available';
        } else {
          states[missionId] = 'locked';
        }
      });

      setMissionStates(states);
    }
  };

  const getLocationStatus = (locationId) => {
    // Find mission at this location
    for (const [missionId, locId] of Object.entries(MISSION_LOCATIONS)) {
      if (locId === locationId) {
        return missionStates[missionId] || 'locked';
      }
    }
    return 'locked';
  };

  const getMissionAtLocation = (locationId) => {
    for (const [missionId, locId] of Object.entries(MISSION_LOCATIONS)) {
      if (locId === locationId) {
        return { missionId, ...MISSIONS[missionId] };
      }
    }
    return null;
  };

  const completedCount = Object.values(missionStates).filter(s => s === 'completed').length;
  const totalMissions = Object.keys(MISSION_LOCATIONS).length;

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
        <Text style={styles.headerTitle}>Western Front</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Campaign Progress</Text>
          <Text style={styles.progressCount}>{completedCount}/{totalMissions}</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completedCount / totalMissions) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Map */}
      <ScrollView
        style={styles.mapScroll}
        contentContainerStyle={styles.mapContent}
        horizontal={false}
      >
        <View style={styles.mapContainer}>
          {/* Map Background */}
          <View style={styles.mapBackground}>
            {/* Stylized terrain zones */}
            <View style={[styles.terrainZone, styles.terrainBelgium]} />
            <View style={[styles.terrainZone, styles.terrainFrance]} />
            <View style={[styles.terrainZone, styles.terrainGermany]} />

            {/* Front line */}
            <View style={styles.frontLine} />

            {/* Region labels */}
            <Text style={[styles.regionLabel, { top: 10, left: 20 }]}>BELGIUM</Text>
            <Text style={[styles.regionLabel, { top: MAP_HEIGHT / 2, left: 10 }]}>FRANCE</Text>
            <Text style={[styles.regionLabel, { top: 30, right: 20 }]}>GERMANY</Text>
          </View>

          {/* Connection Lines - would need to define connections */}

          {/* Location Markers */}
          {Object.entries(MAP_LOCATIONS).map(([id, location]) => (
            <MapMarker
              key={id}
              location={location}
              status={getLocationStatus(id)}
              isActive={getLocationStatus(id) === 'available'}
              onPress={() => setSelectedLocation(id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Selected Location Info */}
      {selectedLocation && (
        <View style={styles.locationInfo}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationName}>
              {MAP_LOCATIONS[selectedLocation]?.name}
            </Text>
            <TouchableOpacity onPress={() => setSelectedLocation(null)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {getMissionAtLocation(selectedLocation) && (
            <>
              <Text style={styles.missionTitle}>
                {getMissionAtLocation(selectedLocation)?.name}
              </Text>
              <Text style={styles.missionDescription}>
                {getMissionAtLocation(selectedLocation)?.description}
              </Text>

              <View style={styles.locationActions}>
                <Text style={styles.statusBadge}>
                  {getLocationStatus(selectedLocation) === 'completed' ? '✓ Completed' :
                   getLocationStatus(selectedLocation) === 'available' ? '⚔️ Available' :
                   '🔒 Locked'}
                </Text>

                {getLocationStatus(selectedLocation) === 'available' && (
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                      const mission = getMissionAtLocation(selectedLocation);
                      if (mission) {
                        navigation.navigate('Briefing', { missionId: mission.missionId });
                      }
                    }}
                  >
                    <Text style={styles.playButtonText}>Deploy →</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      )}

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.textMuted }]} />
          <Text style={styles.legendText}>Locked</Text>
        </View>
      </View>
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
  progressContainer: {
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
  },
  progressText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  progressCount: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.accent,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  mapScroll: {
    flex: 1,
  },
  mapContent: {
    padding: SPACING.large,
  },
  mapContainer: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.medium,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  terrainZone: {
    position: 'absolute',
    opacity: 0.3,
  },
  terrainBelgium: {
    top: 0,
    left: 0,
    width: '50%',
    height: '30%',
    backgroundColor: '#3d5a3d',
  },
  terrainFrance: {
    top: '30%',
    left: 0,
    width: '60%',
    height: '70%',
    backgroundColor: '#4a7c59',
  },
  terrainGermany: {
    top: 0,
    right: 0,
    width: '45%',
    height: '100%',
    backgroundColor: '#5a5a5a',
  },
  frontLine: {
    position: 'absolute',
    left: '45%',
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.danger + '60',
    transform: [{ rotate: '10deg' }],
  },
  regionLabel: {
    position: 'absolute',
    fontSize: FONT_SIZES.small,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  markerDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.backgroundDark,
  },
  markerIcon: {
    fontSize: 14,
    color: COLORS.textWhite,
  },
  markerLabel: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
    textShadowColor: COLORS.backgroundDark,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  locationInfo: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.large,
    margin: SPACING.large,
    marginTop: 0,
    borderRadius: RADIUS.medium,
    ...SHADOWS.medium,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  locationName: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  closeButton: {
    fontSize: FONT_SIZES.large,
    color: COLORS.textMuted,
    padding: SPACING.small,
  },
  missionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  missionDescription: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.medium,
  },
  locationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  playButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.medium,
  },
  playButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.backgroundDark,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACING.medium,
    gap: SPACING.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
});

export default CampaignMapScreen;
