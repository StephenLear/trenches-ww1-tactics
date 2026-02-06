/**
 * WWI Tactical Game - Language Selection Screen
 * First launch screen for choosing narrative language
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../styles/colors';
import { loadGame, saveGame } from '../game/storage';

const LANGUAGES = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    description: 'Experience the war through British and American voices',
    sample: '"The posters are everywhere now..."',
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    description: 'Erleben Sie den Krieg durch deutsche Augen',
    sample: '"Der Krieg ist erklärt! Die Massen jubeln..."',
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    description: 'Vivez la guerre à travers les yeux français',
    sample: '"Mobilisation générale! Les cloches sonnent..."',
  },
];

const LanguageSelectScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
  };

  const handleContinue = async () => {
    if (!selectedLanguage) return;

    try {
      // Load existing game state and add language preference
      const result = await loadGame();
      const gameState = result.success && result.gameState ? result.gameState : {};

      await saveGame({
        ...gameState,
        language: selectedLanguage,
        hasSelectedLanguage: true,
      });
    } catch (error) {
      console.log('Error saving language preference:', error);
    }

    // Navigate to intro screen
    navigation.replace('Intro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.year}>1914</Text>
          <Text style={styles.title}>The Great War</Text>
          <Text style={styles.subtitle}>Choose Your Language</Text>
          <Text style={styles.description}>
            Select the language for diary entries and narrative text
          </Text>
        </Animated.View>

        {/* Language Options */}
        <Animated.View style={[styles.languageContainer, { opacity: buttonFadeAnim }]}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageCard,
                selectedLanguage === lang.id && styles.languageCardSelected,
              ]}
              onPress={() => handleLanguageSelect(lang.id)}
              activeOpacity={0.8}
            >
              <View style={styles.languageHeader}>
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <View style={styles.languageNames}>
                  <Text style={styles.languageName}>{lang.nativeName}</Text>
                  {lang.nativeName !== lang.name && (
                    <Text style={styles.languageNameAlt}>{lang.name}</Text>
                  )}
                </View>
                {selectedLanguage === lang.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>

              <Text style={styles.languageDescription}>{lang.description}</Text>
              <Text style={styles.languageSample}>{lang.sample}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Continue Button */}
        <Animated.View style={[styles.buttonContainer, { opacity: buttonFadeAnim }]}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedLanguage && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedLanguage}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedLanguage && styles.continueButtonTextDisabled,
            ]}>
              {selectedLanguage ? 'Begin' : 'Select a Language'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.noteText}>
            You can change this later in Settings
          </Text>
        </Animated.View>

        <View style={{ height: SPACING.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1510',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.large,
    paddingTop: SPACING.xlarge * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
  },
  year: {
    fontSize: 48,
    fontWeight: '300',
    color: '#8b7355',
    letterSpacing: 8,
    marginBottom: SPACING.small,
  },
  title: {
    fontSize: FONT_SIZES.huge,
    fontWeight: '700',
    color: '#d4c4a8',
    letterSpacing: 2,
    marginBottom: SPACING.medium,
  },
  subtitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '600',
    color: '#a89878',
    marginBottom: SPACING.small,
  },
  description: {
    fontSize: FONT_SIZES.medium,
    color: '#6b5b4a',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  languageContainer: {
    marginBottom: SPACING.xlarge,
  },
  languageCard: {
    backgroundColor: 'rgba(244, 228, 200, 0.08)',
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 19, 0.2)',
  },
  languageCardSelected: {
    borderColor: '#8b4513',
    backgroundColor: 'rgba(139, 69, 19, 0.15)',
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  languageFlag: {
    fontSize: 36,
    marginRight: SPACING.medium,
  },
  languageNames: {
    flex: 1,
  },
  languageName: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: '#d4c4a8',
  },
  languageNameAlt: {
    fontSize: FONT_SIZES.small,
    color: '#8b7355',
    marginTop: 2,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f4e4c8',
  },
  languageDescription: {
    fontSize: FONT_SIZES.medium,
    color: '#a89878',
    marginBottom: SPACING.small,
  },
  languageSample: {
    fontSize: FONT_SIZES.medium,
    color: '#6b5b4a',
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#8b4513',
    paddingHorizontal: SPACING.xlarge * 2,
    paddingVertical: SPACING.large,
    borderRadius: RADIUS.medium,
    borderWidth: 2,
    borderColor: '#5c2d0a',
    width: '100%',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#3a2a1a',
    borderColor: '#2a1a0a',
  },
  continueButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: '#f4e4c8',
    letterSpacing: 1,
  },
  continueButtonTextDisabled: {
    color: '#6b5b4a',
  },
  noteText: {
    fontSize: FONT_SIZES.small,
    color: '#5b4b3a',
    marginTop: SPACING.medium,
    fontStyle: 'italic',
  },
});

export default LanguageSelectScreen;
