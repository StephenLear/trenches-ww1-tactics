/**
 * WWI Tactical Game - Settings Screen
 * Audio volume controls and game settings
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { loadGame, saveGame, clearAllData } from '../game/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioManager, {
  getAudioSettings,
  setSFXVolume,
  setMusicVolume,
  toggleSFX,
  toggleMusic,
  playSFX,
  playMusic,
} from '../audio/AudioManager';

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
];

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState(getAudioSettings());
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [gameStats, setGameStats] = useState({ missions: 0, veterans: 0 });

  useFocusEffect(
    useCallback(() => {
      loadAllSettings();
    }, [])
  );

  const loadAllSettings = async () => {
    // Load audio settings
    setSettings(getAudioSettings());

    // Load game state for language and stats
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        setCurrentLanguage(result.gameState.language || 'en');
        setGameStats({
          missions: result.gameState.completedMissions?.length || 0,
          veterans: result.gameState.veterans?.length || 0,
        });
      }
    } catch (error) {
      console.log('Error loading game settings:', error);
    }
  };

  const handleChangeLanguage = async (langId) => {
    try {
      const result = await loadGame();
      const gameState = result.success && result.gameState ? result.gameState : {};

      await saveGame({
        ...gameState,
        language: langId,
        hasSelectedLanguage: true,
      });

      setCurrentLanguage(langId);
      playSFX('click');
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  const handleNewCampaign = () => {
    Alert.alert(
      'Start New Campaign?',
      'This will reset all progress, veterans, and completed missions. Your current campaign will be lost.\n\nYou can choose a new language for the narrative.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Fresh',
          style: 'destructive',
          onPress: () => showLanguageSelection(),
        },
      ]
    );
  };

  const showLanguageSelection = () => {
    Alert.alert(
      'Choose Language',
      'Select the language for your new campaign diary entries:',
      [
        {
          text: '🇬🇧 English',
          onPress: () => resetWithLanguage('en'),
        },
        {
          text: '🇩🇪 Deutsch',
          onPress: () => resetWithLanguage('de'),
        },
        {
          text: '🇫🇷 Français',
          onPress: () => resetWithLanguage('fr'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const resetWithLanguage = async (langId) => {
    try {
      // NUCLEAR OPTION: Clear ALL AsyncStorage keys for this app
      const allKeys = await AsyncStorage.getAllKeys();
      console.log('All AsyncStorage keys before clear:', allKeys);

      // Remove all WW1 related keys
      const ww1Keys = allKeys.filter(k => k.includes('ww1') || k.includes('WW1'));
      if (ww1Keys.length > 0) {
        await AsyncStorage.multiRemove(ww1Keys);
        console.log('Removed keys:', ww1Keys);
      }

      // Also use clearAllData for good measure
      await clearAllData();

      // Longer delay to ensure storage is cleared
      await new Promise(resolve => setTimeout(resolve, 300));

      // Verify it's cleared
      const checkClear = await loadGame();
      console.log('After clear - gameState exists?', checkClear.success, checkClear.gameState);

      // Create fresh game state with selected language
      const freshState = {
        language: langId,
        hasSelectedLanguage: true,
        hasSeenIntro: false,
        completedMissions: [],
        veterans: [],
        fallenVeterans: [],
        faction: 'british',
        resources: 100,
        difficulty: 'normal',
      };

      const saveResult = await saveGame(freshState);
      console.log('Save new state result:', saveResult);

      // Verify the save
      const verifyResult = await loadGame();
      console.log('Verify after save - completedMissions:', verifyResult.gameState?.completedMissions);
      console.log('Verify after save - full state:', JSON.stringify(verifyResult.gameState));

      // Full navigation reset using CommonActions for a complete restart
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Intro' }],
        })
      );
    } catch (error) {
      console.log('Error resetting campaign:', error);
      Alert.alert('Error', 'Failed to start new campaign. Please try again.');
    }
  };

  const loadSettings = () => {
    setSettings(getAudioSettings());
  };

  const handleSFXVolumeChange = async (value) => {
    await setSFXVolume(value);
    setSettings(getAudioSettings());
  };

  const handleMusicVolumeChange = async (value) => {
    await setMusicVolume(value);
    setSettings(getAudioSettings());
  };

  const handleToggleSFX = async () => {
    const newState = await toggleSFX();
    setSettings(getAudioSettings());

    // Play test sound if enabled
    if (newState) {
      playSFX('ui_click');
    }
  };

  const handleToggleMusic = async () => {
    const newState = await toggleMusic();
    setSettings(getAudioSettings());

    // Start/stop music based on new state
    if (newState) {
      playMusic('menu', true);
    }
  };

  const handleTestSFX = () => {
    playSFX('ui_click');
  };

  const handleTestMusic = () => {
    playMusic('menu', false); // Play once for testing
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={commonStyles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Audio & Game Options</Text>
        </View>

        {/* Audio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔊 Audio Settings</Text>

          {/* Sound Effects Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sound Effects</Text>
              <Text style={styles.settingDescription}>
                UI sounds and combat effects
              </Text>
            </View>
            <Switch
              value={settings.sfxEnabled}
              onValueChange={handleToggleSFX}
              trackColor={{
                false: COLORS.buttonDisabled,
                true: COLORS.primary,
              }}
              thumbColor={COLORS.textWhite}
            />
          </View>

          {/* SFX Volume Slider */}
          {settings.sfxEnabled && (
            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>SFX Volume</Text>
                <Text style={styles.sliderValue}>
                  {Math.round(settings.sfxVolume * 100)}%
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={settings.sfxVolume}
                onValueChange={handleSFXVolumeChange}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.backgroundDark}
                thumbTintColor={COLORS.primary}
              />
              <TouchableOpacity
                style={styles.testButton}
                onPress={handleTestSFX}
              >
                <Text style={styles.testButtonText}>Test Sound</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divider} />

          {/* Music Toggle */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Background Music</Text>
              <Text style={styles.settingDescription}>
                Menu and battle themes
              </Text>
            </View>
            <Switch
              value={settings.musicEnabled}
              onValueChange={handleToggleMusic}
              trackColor={{
                false: COLORS.buttonDisabled,
                true: COLORS.primary,
              }}
              thumbColor={COLORS.textWhite}
            />
          </View>

          {/* Music Volume Slider */}
          {settings.musicEnabled && (
            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>Music Volume</Text>
                <Text style={styles.sliderValue}>
                  {Math.round(settings.musicVolume * 100)}%
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={settings.musicVolume}
                onValueChange={handleMusicVolumeChange}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.backgroundDark}
                thumbTintColor={COLORS.primary}
              />
              <TouchableOpacity
                style={styles.testButton}
                onPress={handleTestMusic}
              >
                <Text style={styles.testButtonText}>Test Music</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Campaign Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Campaign Settings</Text>

          {/* Current Language Display */}
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Diary Language</Text>
              <Text style={styles.settingDescription}>
                Language for narrative diary entries
              </Text>
            </View>
          </View>

          {/* Language Selector Buttons */}
          <View style={styles.languageSelector}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={[
                  styles.languageOption,
                  currentLanguage === lang.id && styles.languageOptionActive,
                ]}
                onPress={() => handleChangeLanguage(lang.id)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={[
                  styles.languageName,
                  currentLanguage === lang.id && styles.languageNameActive,
                ]}>
                  {lang.name}
                </Text>
                {currentLanguage === lang.id && (
                  <Text style={styles.languageCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Campaign Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{gameStats.missions}</Text>
              <Text style={styles.statLabel}>Missions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{gameStats.veterans}</Text>
              <Text style={styles.statLabel}>Veterans</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* New Campaign Button */}
          <TouchableOpacity
            style={styles.newCampaignButton}
            onPress={handleNewCampaign}
          >
            <Text style={styles.newCampaignButtonText}>🔄 Start New Campaign</Text>
            <Text style={styles.newCampaignDescription}>
              Reset progress and choose a new language
            </Text>
          </TouchableOpacity>
        </View>

        {/* Game Settings Section (Future) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Game Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Coming Soon</Text>
              <Text style={styles.settingDescription}>
                Difficulty, graphics, and gameplay options
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>WWI Tactical Game</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutText}>
              A turn-based tactical strategy game set during World War I.
            </Text>
            <Text style={styles.aboutCopyright}>
              © 2026 - Built with React Native
            </Text>
          </View>
        </View>

        {/* Footer spacing */}
        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
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
  },
  section: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.large,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.medium,
  },
  settingLabel: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  settingDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.medium,
  },
  sliderContainer: {
    marginTop: SPACING.small,
    marginBottom: SPACING.large,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  sliderLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sliderValue: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  testButton: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.small,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    alignItems: 'center',
    marginTop: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  testButtonText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  aboutCard: {
    alignItems: 'center',
    paddingVertical: SPACING.medium,
  },
  aboutTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  aboutVersion: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.medium,
  },
  aboutText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.medium,
    paddingHorizontal: SPACING.large,
  },
  aboutCopyright: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.small,
    marginBottom: SPACING.medium,
  },
  languageOption: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageOptionActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '20',
  },
  languageFlag: {
    fontSize: 28,
    marginBottom: SPACING.tiny,
  },
  languageName: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  languageNameActive: {
    color: COLORS.accent,
  },
  languageCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.medium,
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
  },
  newCampaignButton: {
    backgroundColor: COLORS.danger || '#8B0000',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    alignItems: 'center',
    marginTop: SPACING.medium,
  },
  newCampaignButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: SPACING.tiny,
  },
  newCampaignDescription: {
    fontSize: FONT_SIZES.small,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default SettingsScreen;
