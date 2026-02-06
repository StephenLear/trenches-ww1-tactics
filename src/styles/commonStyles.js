/**
 * WWI Tactical Game - Common Styles
 * Reusable StyleSheet components for React Native
 */

import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from './colors';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Cards
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginVertical: SPACING.small,
    ...SHADOWS.small,
  },
  cardLarge: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginVertical: SPACING.medium,
    ...SHADOWS.medium,
  },

  // Buttons
  button: {
    backgroundColor: COLORS.buttonEnabled,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    backgroundColor: COLORS.buttonEnabled,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLarge: {
    backgroundColor: COLORS.buttonEnabled,
    paddingVertical: SPACING.large,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Button text
  buttonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
  buttonTextLarge: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
  },
  buttonTextSmall: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
  },

  // Text styles
  textPrimary: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
  },
  textSecondary: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium,
  },
  textMuted: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.small,
  },
  textWhite: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.medium,
  },

  // Headers
  header: {
    fontSize: FONT_SIZES.header,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.medium,
    borderRadius: RADIUS.small,
    marginVertical: SPACING.tiny,
  },
  listItemText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
  },

  // Rows and columns
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },

  // Padding/Margin presets
  padding: {
    padding: SPACING.medium,
  },
  paddingLarge: {
    padding: SPACING.large,
  },
  paddingSmall: {
    padding: SPACING.small,
  },
  margin: {
    margin: SPACING.medium,
  },
  marginLarge: {
    margin: SPACING.large,
  },
  marginSmall: {
    margin: SPACING.small,
  },

  // Borders
  border: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  // Badges
  badge: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.tiny,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.tiny,
    fontWeight: '700',
  },

  // Status indicators
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.small,
  },
  statusDotGreen: {
    backgroundColor: COLORS.success,
  },
  statusDotRed: {
    backgroundColor: COLORS.danger,
  },
  statusDotYellow: {
    backgroundColor: COLORS.warning,
  },

  // Progress bars
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.small,
  },

  // Icons
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSmall: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLarge: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modals/Overlays
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    width: '80%',
    maxWidth: 400,
    ...SHADOWS.large,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.medium,
  },
  dividerThick: {
    height: 2,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.medium,
  },

  // Centered content
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Flex helpers
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },

  // Absolute positioning
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default commonStyles;
