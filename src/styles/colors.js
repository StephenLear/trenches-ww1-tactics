/**
 * WWI Tactical Game - Color Scheme & Theme
 * Military-themed color palette for React Native
 */

// Primary Colors - Military themed
export const COLORS = {
  // Background colors
  background: '#1a1a1a',
  backgroundDark: '#0d0d0d',
  backgroundLight: '#2a2a2a',

  // Military theme colors
  militaryGreen: '#3d5a3d',
  militaryBrown: '#4a3a2a',
  khaki: '#8b7355',
  olive: '#556b2f',

  // UI colors
  primary: '#4a7c59',
  secondary: '#7a5c42',
  accent: '#d4af37', // Gold
  danger: '#8b0000',
  warning: '#ff8c00',
  success: '#2d5016',

  // Text colors
  textPrimary: '#e8e8e8',
  textSecondary: '#a8a8a8',
  textMuted: '#666666',
  textWhite: '#ffffff',

  // Team colors
  playerBlue: '#4a90e2',
  enemyRed: '#e24a4a',

  // Terrain colors
  terrainGrass: '#3a5a3a',
  terrainMud: '#4a3a2a',
  terrainTrench: '#2a2a1a',
  terrainForest: '#1a3a1a',
  terrainMountain: '#5a5a5a',
  terrainRiver: '#2a4a6a',

  // Weather/Status colors
  weatherClear: '#87ceeb',
  weatherRain: '#4682b4',
  weatherFog: '#708090',
  weatherSnow: '#f0f8ff',
  weatherMud: '#654321',

  // UI states
  buttonEnabled: '#4a7c59',
  buttonDisabled: '#3a3a3a',
  buttonPressed: '#5a8c69',

  // Borders and dividers
  border: '#3a3a3a',
  borderLight: '#4a4a4a',
  borderDark: '#2a2a2a',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Status effects
  statusBuff: '#4a7c59',
  statusDebuff: '#8b0000',
  statusNeutral: '#5a5a5a',

  // XP and progression
  xpBar: '#d4af37',
  xpBarBg: '#3a3a3a',

  // Health bar
  healthFull: '#4a7c59',
  healthMedium: '#ff8c00',
  healthLow: '#8b0000',
  healthBg: '#2a2a2a',
};

// Terrain type to color mapping
export const TERRAIN_COLORS = {
  grass: COLORS.terrainGrass,
  mud: COLORS.terrainMud,
  trench: COLORS.terrainTrench,
  forest: COLORS.terrainForest,
  mountain: COLORS.terrainMountain,
  river: COLORS.terrainRiver,
  water: '#2a4a6a',
  beach: '#c2b280',
  sand: '#d2b48c',
  barbed_wire: '#4a4a4a',
  objective: '#6b4423',
  crater: '#3a3a2a',
};

// Weather type to color mapping
export const WEATHER_COLORS = {
  clear: COLORS.weatherClear,
  rain: COLORS.weatherRain,
  fog: COLORS.weatherFog,
  snow: COLORS.weatherSnow,
  mud: COLORS.weatherMud,
};

// Team colors
export const TEAM_COLORS = {
  player: COLORS.playerBlue,
  enemy: COLORS.enemyRed,
};

// Font sizes
export const FONT_SIZES = {
  tiny: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  title: 24,
  header: 28,
  huge: 32,
};

// Spacing
export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  xxlarge: 24,
  huge: 32,
};

// Border radius
export const RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  round: 999,
};

// Shadow presets for iOS/Android
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Z-index layers
export const Z_INDEX = {
  background: 0,
  terrain: 1,
  highlights: 2,
  units: 3,
  effects: 4,
  ui: 5,
  modal: 10,
  tooltip: 15,
  dropdown: 20,
};

export default {
  COLORS,
  TERRAIN_COLORS,
  WEATHER_COLORS,
  TEAM_COLORS,
  FONT_SIZES,
  SPACING,
  RADIUS,
  SHADOWS,
  Z_INDEX,
};
