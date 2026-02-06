/**
 * WWI Tactical Game - Haptic Feedback System
 * Provides tactile feedback for game events
 */

// Try to import expo-haptics, fallback to no-op if not installed
let Haptics = null;
let hapticsAvailable = false;

try {
  Haptics = require('expo-haptics');
  hapticsAvailable = true;
} catch (e) {
  console.log('expo-haptics not installed, haptic feedback disabled');
  // Create mock Haptics object
  Haptics = {
    ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
    NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
    impactAsync: async () => {},
    notificationAsync: async () => {},
  };
}

// Haptic feedback types for different game events
export const HapticType = {
  // UI Interactions
  BUTTON_PRESS: 'button_press',
  TAB_SWITCH: 'tab_switch',
  SELECTION: 'selection',

  // Unit Actions
  UNIT_SELECT: 'unit_select',
  UNIT_MOVE: 'unit_move',
  UNIT_ATTACK: 'unit_attack',
  UNIT_DEATH: 'unit_death',

  // Combat
  HIT_LIGHT: 'hit_light',
  HIT_HEAVY: 'hit_heavy',
  CRITICAL_HIT: 'critical_hit',
  MISS: 'miss',

  // Special Events
  EXPLOSION: 'explosion',
  ARTILLERY: 'artillery',
  VICTORY: 'victory',
  DEFEAT: 'defeat',

  // Notifications
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  NOTIFICATION: 'notification',
};

// Haptic settings (can be toggled by user)
let hapticsEnabled = true;

/**
 * Enable or disable haptic feedback
 */
export const setHapticsEnabled = (enabled) => {
  hapticsEnabled = enabled;
};

/**
 * Check if haptics are enabled
 */
export const isHapticsEnabled = () => hapticsEnabled;

/**
 * Trigger haptic feedback based on event type
 */
export const triggerHaptic = async (type) => {
  if (!hapticsEnabled || !hapticsAvailable) return;

  try {
    switch (type) {
      // Light feedback for UI
      case HapticType.BUTTON_PRESS:
      case HapticType.TAB_SWITCH:
      case HapticType.SELECTION:
      case HapticType.NOTIFICATION:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;

      // Medium feedback for unit actions
      case HapticType.UNIT_SELECT:
      case HapticType.UNIT_MOVE:
      case HapticType.MISS:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;

      // Heavy feedback for combat
      case HapticType.UNIT_ATTACK:
      case HapticType.HIT_LIGHT:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;

      // Double heavy for strong hits
      case HapticType.HIT_HEAVY:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 100);
        break;

      // Pattern for critical hits
      case HapticType.CRITICAL_HIT:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 80);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 160);
        break;

      // Explosion pattern
      case HapticType.EXPLOSION:
      case HapticType.ARTILLERY:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 50);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 150);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 250);
        break;

      // Unit death - rumble pattern
      case HapticType.UNIT_DEATH:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;

      // Victory fanfare pattern
      case HapticType.VICTORY:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 200);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 400);
        setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 600);
        break;

      // Defeat pattern
      case HapticType.DEFEAT:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 300);
        setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error), 600);
        break;

      // Notification types
      case HapticType.WARNING:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;

      case HapticType.ERROR:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;

      case HapticType.SUCCESS:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;

      default:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch (error) {
    // Haptics may not be available on all devices
    console.log('Haptic feedback not available:', error.message);
  }
};

/**
 * Quick haptic functions for common actions
 */
export const hapticButton = () => triggerHaptic(HapticType.BUTTON_PRESS);
export const hapticSelect = () => triggerHaptic(HapticType.UNIT_SELECT);
export const hapticAttack = () => triggerHaptic(HapticType.UNIT_ATTACK);
export const hapticHit = (isCritical = false) =>
  triggerHaptic(isCritical ? HapticType.CRITICAL_HIT : HapticType.HIT_HEAVY);
export const hapticExplosion = () => triggerHaptic(HapticType.EXPLOSION);
export const hapticVictory = () => triggerHaptic(HapticType.VICTORY);
export const hapticDefeat = () => triggerHaptic(HapticType.DEFEAT);
export const hapticDeath = () => triggerHaptic(HapticType.UNIT_DEATH);
export const hapticWarning = () => triggerHaptic(HapticType.WARNING);
export const hapticSuccess = () => triggerHaptic(HapticType.SUCCESS);

export default {
  HapticType,
  triggerHaptic,
  setHapticsEnabled,
  isHapticsEnabled,
  hapticButton,
  hapticSelect,
  hapticAttack,
  hapticHit,
  hapticExplosion,
  hapticVictory,
  hapticDefeat,
  hapticDeath,
  hapticWarning,
  hapticSuccess,
};
