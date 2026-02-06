/**
 * WWI Tactical Game - Audio Manager
 * Centralized audio management using expo-av
 * Handles sound effects, music, and volume control
 */

import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Audio settings keys
const AUDIO_SETTINGS_KEY = 'ww1-audio-settings';

// Default settings
const DEFAULT_SETTINGS = {
  sfxEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.7,
  musicVolume: 0.5,
};

/**
 * AudioManager Class
 * Singleton pattern for managing all game audio
 */
class AudioManager {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.soundObjects = {}; // Cached sound objects
    this.musicObject = null; // Current music track
    this.initialized = false;
  }

  /**
   * Initialize audio system
   * Must be called before playing any sounds
   */
  async initialize() {
    if (this.initialized) return;

    try {
      // Configure audio mode for games
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Load saved settings
      await this.loadSettings();

      this.initialized = true;
      console.log('AudioManager initialized');
    } catch (error) {
      console.error('Failed to initialize AudioManager:', error);
    }
  }

  /**
   * Load audio settings from AsyncStorage
   */
  async loadSettings() {
    try {
      const savedSettings = await AsyncStorage.getItem(AUDIO_SETTINGS_KEY);
      if (savedSettings) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
      }
    } catch (error) {
      console.error('Failed to load audio settings:', error);
    }
  }

  /**
   * Save audio settings to AsyncStorage
   */
  async saveSettings() {
    try {
      await AsyncStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Failed to save audio settings:', error);
    }
  }

  /**
   * Play a sound effect
   * @param {string} soundName - Name of the sound effect
   * @param {number} volumeMultiplier - Optional volume multiplier (0-1)
   * @param {number} maxDuration - Optional max duration in ms (default varies by sound type)
   */
  async playSFX(soundName, volumeMultiplier = 1.0, maxDuration = null) {
    if (!this.settings.sfxEnabled || !this.initialized) return;

    try {
      // Get sound file path
      const soundFile = this.getSoundFile(soundName);
      if (!soundFile) {
        console.warn(`Sound file not found: ${soundName}`);
        return;
      }

      // Set default max durations for different sound types
      const defaultDurations = {
        'rifle': 1500,
        'rifle_shot': 1500,
        'attack': 1500,
        'machinegun': 1200,
        'machine_gun': 1200,
        'explosion': 1500,
        'artillery': 1500,
        'death': 1500,
        'move': 800,
        'footsteps': 800,
        'victory': 3000,
        'win': 3000,
        'defeat': 700,
        'lose': 700,
        'click': 200,
        'ui_click': 200,
      };

      const duration = maxDuration || defaultDurations[soundName] || 2000;

      // Create or reuse sound object
      const { sound } = await Audio.Sound.createAsync(
        soundFile,
        {
          volume: this.settings.sfxVolume * volumeMultiplier,
          shouldPlay: true,
        },
        this.onPlaybackStatusUpdate
      );

      // Stop and clean up after max duration
      setTimeout(async () => {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          // Sound may have already finished
        }
      }, duration);

      // Also clean up if it finishes naturally before timeout
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error(`Failed to play sound ${soundName}:`, error);
    }
  }

  /**
   * Play background music
   * @param {string} musicName - Name of the music track
   * @param {boolean} loop - Whether to loop the music
   */
  async playMusic(musicName, loop = true) {
    if (!this.settings.musicEnabled || !this.initialized) return;

    try {
      // Stop current music if playing
      await this.stopMusic();

      // Get music file path
      const musicFile = this.getMusicFile(musicName);
      if (!musicFile) {
        console.warn(`Music file not found: ${musicName}`);
        return;
      }

      // Create and play music
      const { sound } = await Audio.Sound.createAsync(
        musicFile,
        {
          volume: this.settings.musicVolume,
          isLooping: loop,
          shouldPlay: true,
        }
      );

      this.musicObject = sound;
    } catch (error) {
      console.error(`Failed to play music ${musicName}:`, error);
    }
  }

  /**
   * Stop current background music
   */
  async stopMusic() {
    if (this.musicObject) {
      try {
        await this.musicObject.stopAsync();
        await this.musicObject.unloadAsync();
        this.musicObject = null;
      } catch (error) {
        console.error('Failed to stop music:', error);
      }
    }
  }

  /**
   * Pause current background music
   */
  async pauseMusic() {
    if (this.musicObject) {
      try {
        await this.musicObject.pauseAsync();
      } catch (error) {
        console.error('Failed to pause music:', error);
      }
    }
  }

  /**
   * Resume paused background music
   */
  async resumeMusic() {
    if (this.musicObject) {
      try {
        await this.musicObject.playAsync();
      } catch (error) {
        console.error('Failed to resume music:', error);
      }
    }
  }

  /**
   * Set SFX volume
   * @param {number} volume - Volume level (0-1)
   */
  async setSFXVolume(volume) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    await this.saveSettings();
  }

  /**
   * Set music volume
   * @param {number} volume - Volume level (0-1)
   */
  async setMusicVolume(volume) {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));

    // Update current music volume
    if (this.musicObject) {
      try {
        await this.musicObject.setVolumeAsync(this.settings.musicVolume);
      } catch (error) {
        console.error('Failed to set music volume:', error);
      }
    }

    await this.saveSettings();
  }

  /**
   * Toggle SFX on/off
   */
  async toggleSFX() {
    this.settings.sfxEnabled = !this.settings.sfxEnabled;
    await this.saveSettings();
    return this.settings.sfxEnabled;
  }

  /**
   * Toggle music on/off
   */
  async toggleMusic() {
    this.settings.musicEnabled = !this.settings.musicEnabled;

    if (!this.settings.musicEnabled) {
      await this.stopMusic();
    }

    await this.saveSettings();
    return this.settings.musicEnabled;
  }

  /**
   * Get current settings
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Get sound file path
   * Maps sound names to require() paths
   */
  getSoundFile(soundName) {
    const soundMap = {
      // UI sounds
      'ui_click': require('../../assets/Audio/SFX/click-345983.mp3'),
      'click': require('../../assets/Audio/SFX/click-345983.mp3'),

      // Combat sounds
      'rifle': require('../../assets/Audio/SFX/rifle-shot-amp-echo-423596.mp3'),
      'rifle_shot': require('../../assets/Audio/SFX/rifle-shot-amp-echo-423596.mp3'),
      'attack': require('../../assets/Audio/SFX/rifle-shot-amp-echo-423596.mp3'),

      'machinegun': require('../../assets/Audio/SFX/freesound_community-clean-machine-gun-burst-98224.mp3'),
      'machine_gun': require('../../assets/Audio/SFX/freesound_community-clean-machine-gun-burst-98224.mp3'),

      'explosion': require('../../assets/Audio/SFX/explosion-6055.mp3'),
      'artillery': require('../../assets/Audio/SFX/explosion-6055.mp3'),
      'death': require('../../assets/Audio/SFX/explosion-6055.mp3'),

      // Movement sounds
      'move': require('../../assets/Audio/SFX/freesound_community-footsteps-in-thin-snow-46199.mp3'),
      'footsteps': require('../../assets/Audio/SFX/freesound_community-footsteps-in-thin-snow-46199.mp3'),

      // Victory/Defeat
      'victory': require('../../assets/Audio/SFX/goodresult-82807.mp3'),
      'win': require('../../assets/Audio/SFX/goodresult-82807.mp3'),

      'defeat': require('../../assets/Audio/SFX/defeated-sigh-85637.mp3'),
      'lose': require('../../assets/Audio/SFX/defeated-sigh-85637.mp3'),

      // Achievement sound (reuse victory sound)
      'achievement': require('../../assets/Audio/SFX/goodresult-82807.mp3'),
    };

    return soundMap[soundName] || null;
  }

  /**
   * Get music file path
   * Maps music names to require() paths
   * Returns null if music files are not yet added
   */
  getMusicFile(musicName) {
    // Music track mapping
    // NOTE: Music files are not yet added - returning null for now
    // When you add music files to src/audio/music/, uncomment the mappings below:
    /*
    const musicMap = {
      'menu': require('./music/menu_theme.mp3'),
      'battle': require('./music/battle_theme.mp3'),
      // ... etc
    };
    return musicMap[musicName] || null;
    */

    // Placeholder - return null until music files are added
    return null;
  }

  /**
   * Playback status update callback
   */
  onPlaybackStatusUpdate = (status) => {
    // Handle playback errors
    if (status.error) {
      console.error('Playback error:', status.error);
    }
  };

  /**
   * Cleanup - call when app closes
   */
  async cleanup() {
    await this.stopMusic();

    // Unload all cached sounds
    for (const soundObject of Object.values(this.soundObjects)) {
      try {
        await soundObject.unloadAsync();
      } catch (error) {
        // Ignore cleanup errors
      }
    }

    this.soundObjects = {};
    this.initialized = false;
  }
}

// Create singleton instance
const audioManager = new AudioManager();

// Export singleton
export default audioManager;

// Export convenience functions
export const playSFX = (soundName, volumeMultiplier) =>
  audioManager.playSFX(soundName, volumeMultiplier);

export const playMusic = (musicName, loop) =>
  audioManager.playMusic(musicName, loop);

export const stopMusic = () =>
  audioManager.stopMusic();

export const pauseMusic = () =>
  audioManager.pauseMusic();

export const resumeMusic = () =>
  audioManager.resumeMusic();

export const initializeAudio = () =>
  audioManager.initialize();

export const getAudioSettings = () =>
  audioManager.getSettings();

export const setSFXVolume = (volume) =>
  audioManager.setSFXVolume(volume);

export const setMusicVolume = (volume) =>
  audioManager.setMusicVolume(volume);

export const toggleSFX = () =>
  audioManager.toggleSFX();

export const toggleMusic = () =>
  audioManager.toggleMusic();
