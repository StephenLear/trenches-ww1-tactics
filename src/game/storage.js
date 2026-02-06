/**
 * WWI Tactical Game - Storage System
 * AsyncStorage wrapper for React Native game state persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const SAVE_KEY = 'ww1-tactical-save';
const SAVE_INFO_KEY = 'ww1-tactical-save-info';
const SETTINGS_KEY = 'ww1-tactical-settings';

/**
 * Save the complete game state to AsyncStorage
 * @param {Object} gameState - Complete game state object
 * @returns {Promise<Object>} Result object with success status and optional error
 */
export async function saveGame(gameState) {
  try {
    if (!gameState) {
      return { success: false, error: 'Game state is required' };
    }

    const timestamp = new Date().toISOString();
    const saveData = {
      version: 1,
      timestamp,
      gameState
    };

    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

    // Update save metadata
    const saveInfo = {
      lastSaved: timestamp,
      saveCount: (await getSaveMetadata())?.saveCount + 1 || 1,
      missionCount: gameState.completed?.length || 0,
      veteranCount: gameState.veterans?.length || 0,
      requisitionPoints: gameState.requisitions || 0
    };

    await AsyncStorage.setItem(SAVE_INFO_KEY, JSON.stringify(saveInfo));

    return { success: true, timestamp };
  } catch (error) {
    console.error('Error saving game:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Load the game state from AsyncStorage
 * @returns {Promise<Object>} Result object with success status, gameState, and optional error
 */
export async function loadGame() {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);

    if (!data) {
      return { success: false, error: 'No save file found', gameState: null };
    }

    const saveData = JSON.parse(data);

    // Validate save data structure
    if (!saveData.gameState) {
      return { success: false, error: 'Invalid save file format', gameState: null };
    }

    return {
      success: true,
      gameState: saveData.gameState,
      timestamp: saveData.timestamp,
      version: saveData.version || 1
    };
  } catch (error) {
    console.error('Error loading game:', error);
    return { success: false, error: error.message, gameState: null };
  }
}

/**
 * Delete all save data from AsyncStorage
 * @returns {Promise<Object>} Result object with success status and optional error
 */
export async function clearSave() {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
    await AsyncStorage.removeItem(SAVE_INFO_KEY);

    return { success: true, message: 'Save data cleared' };
  } catch (error) {
    console.error('Error clearing save:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get metadata about the current save file
 * @returns {Promise<Object|null>} Save metadata object or null if no save exists
 */
export async function getSaveInfo() {
  try {
    const data = await AsyncStorage.getItem(SAVE_INFO_KEY);

    if (!data) {
      return null;
    }

    const saveInfo = JSON.parse(data);
    return saveInfo;
  } catch (error) {
    console.error('Error getting save info:', error);
    return null;
  }
}

/**
 * Get metadata about saves without loading the full game state
 * @returns {Promise<Object|null>} Save metadata or null
 */
export async function getSaveMetadata() {
  try {
    const info = await getSaveInfo();
    return info;
  } catch (error) {
    console.error('Error getting save metadata:', error);
    return null;
  }
}

/**
 * Check if a save file exists
 * @returns {Promise<boolean>} True if save file exists
 */
export async function hasSave() {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    return data !== null;
  } catch (error) {
    console.error('Error checking for save:', error);
    return false;
  }
}

/**
 * Export game state as JSON string (for backup/transfer)
 * @returns {Promise<string|null>} JSON string of game state or null if no save
 */
export async function exportSave() {
  try {
    const result = await loadGame();
    if (!result.success) {
      return null;
    }

    const exportData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      gameState: result.gameState
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting save:', error);
    return null;
  }
}

/**
 * Import game state from JSON string (for restore/transfer)
 * @param {string} jsonData - JSON string containing game state
 * @returns {Promise<Object>} Result object with success status
 */
export async function importSave(jsonData) {
  try {
    if (typeof jsonData !== 'string') {
      return { success: false, error: 'Invalid JSON data' };
    }

    const importData = JSON.parse(jsonData);

    if (!importData.gameState) {
      return { success: false, error: 'Invalid save file format' };
    }

    // Save the imported game state
    return await saveGame(importData.gameState);
  } catch (error) {
    console.error('Error importing save:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Save game settings separately from main game state
 * @param {Object} settings - Settings object (difficulty, sound, etc.)
 * @returns {Promise<Object>} Result object with success status
 */
export async function saveSettings(settings) {
  try {
    if (!settings) {
      return { success: false, error: 'Settings object is required' };
    }

    const settingsData = {
      version: 1,
      timestamp: new Date().toISOString(),
      settings
    };

    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsData));

    return { success: true };
  } catch (error) {
    console.error('Error saving settings:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Load game settings
 * @returns {Promise<Object>} Result object with success status and settings
 */
export async function loadSettings() {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);

    if (!data) {
      return { success: false, error: 'No settings found', settings: null };
    }

    const settingsData = JSON.parse(data);

    return {
      success: true,
      settings: settingsData.settings || {},
      timestamp: settingsData.timestamp
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return { success: false, error: error.message, settings: null };
  }
}

/**
 * Clear all stored data (saves and settings)
 * @returns {Promise<Object>} Result object with success status
 */
export async function clearAllData() {
  try {
    await AsyncStorage.multiRemove([SAVE_KEY, SAVE_INFO_KEY, SETTINGS_KEY]);

    return { success: true, message: 'All data cleared' };
  } catch (error) {
    console.error('Error clearing all data:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get storage usage information
 * @returns {Promise<Object>} Object with usage stats
 */
export async function getStorageInfo() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const wwiKeys = keys.filter(k => k.startsWith('ww1-tactical'));

    const items = await AsyncStorage.multiGet(wwiKeys);
    let totalSize = 0;

    items.forEach(([, value]) => {
      if (value) {
        totalSize += value.length;
      }
    });

    return {
      success: true,
      keysCount: wwiKeys.length,
      approximateSizeBytes: totalSize,
      approximateSizeKB: (totalSize / 1024).toFixed(2),
      keys: wwiKeys
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { success: false, error: error.message };
  }
}

export default {
  saveGame,
  loadGame,
  clearSave,
  getSaveInfo,
  getSaveMetadata,
  hasSave,
  exportSave,
  importSave,
  saveSettings,
  loadSettings,
  clearAllData,
  getStorageInfo,
  SAVE_KEY,
  SAVE_INFO_KEY,
  SETTINGS_KEY
};
