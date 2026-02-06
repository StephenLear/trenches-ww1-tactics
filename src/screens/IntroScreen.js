/**
 * WWI Tactical Game - Intro Screen
 * First launch narrative intro showing a soldier's diary entry
 * Displays in the user's selected language
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../styles/colors';
import { getIntroEntry } from '../game/diary';
import { loadGame, saveGame } from '../game/storage';
import { FACTIONS } from '../game/constants';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {
  const [faction, setFaction] = useState('british');
  const [language, setLanguage] = useState('en');
  const [entry, setEntry] = useState(null);
  const [showContinue, setShowContinue] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadFactionAndEntry();
  }, []);

  useEffect(() => {
    if (entry) {
      // Animate in sequence
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Show continue button after text animation
        setTimeout(() => {
          setShowContinue(true);
          Animated.timing(buttonFadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);
      });
    }
  }, [entry]);

  const loadFactionAndEntry = async () => {
    try {
      const result = await loadGame();
      const savedFaction = result.success && result.gameState?.faction
        ? result.gameState.faction
        : 'british';
      const savedLanguage = result.success && result.gameState?.language
        ? result.gameState.language
        : 'en';

      setFaction(savedFaction);
      setLanguage(savedLanguage);

      // Get diary entry in the user's selected language
      const diaryEntry = getIntroEntry(savedFaction, savedLanguage);
      setEntry(diaryEntry);
    } catch (error) {
      // Default to British/English if error
      const diaryEntry = getIntroEntry('british', 'en');
      setEntry(diaryEntry);
    }
  };

  const handleContinue = async () => {
    // Mark intro as seen
    try {
      const result = await loadGame();
      const gameState = result.success && result.gameState
        ? result.gameState
        : {};

      await saveGame({
        ...gameState,
        hasSeenIntro: true,
      });
    } catch (error) {
      console.log('Error saving intro state:', error);
    }

    // Navigate to main menu
    navigation.replace('Menu');
  };

  // Get continue button text based on language
  const getContinueText = () => {
    switch (language) {
      case 'de':
        return 'Beginne deine Reise';
      case 'fr':
        return 'Commencer votre voyage';
      default:
        return 'Begin Your Journey';
    }
  };

  const getTapText = () => {
    switch (language) {
      case 'de':
        return 'Tippen um zum Hauptmenü fortzufahren';
      case 'fr':
        return 'Appuyez pour continuer vers le menu principal';
      default:
        return 'Tap to continue to the main menu';
    }
  };

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const factionData = FACTIONS[faction];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date and Location Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.dateText}>{entry.date}</Text>
          <Text style={styles.locationText}>{entry.location}</Text>
          {factionData && (
            <Text style={styles.factionText}>
              {factionData.flag} {factionData.name}
            </Text>
          )}
        </Animated.View>

        {/* Diary Page */}
        <Animated.View style={[styles.diaryPage, { opacity: textFadeAnim }]}>
          <View style={styles.diaryHeader}>
            <View style={styles.diaryBinding} />
            <Text style={styles.diaryTitle}>{entry.title}</Text>
          </View>

          <View style={styles.diaryContent}>
            <Text style={styles.diaryText}>{entry.entry}</Text>
          </View>

          {/* Decorative elements */}
          <View style={styles.diaryFooter}>
            <View style={styles.inkBlot} />
          </View>
        </Animated.View>

        {/* Continue Button */}
        {showContinue && (
          <Animated.View style={[styles.buttonContainer, { opacity: buttonFadeAnim }]}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>{getContinueText()}</Text>
            </TouchableOpacity>

            <Text style={styles.skipText}>
              {getTapText()}
            </Text>
          </Animated.View>
        )}

        <View style={{ height: SPACING.huge * 2 }} />
      </ScrollView>

      {/* Tap anywhere to continue (after button appears) */}
      {showContinue && (
        <TouchableOpacity
          style={styles.tapOverlay}
          onPress={handleContinue}
          activeOpacity={1}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1510', // Dark sepia
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#d4c4a8',
    fontSize: FONT_SIZES.large,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.large,
    paddingTop: SPACING.xlarge,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
  },
  dateText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '600',
    color: '#d4c4a8', // Aged paper color
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  locationText: {
    fontSize: FONT_SIZES.medium,
    color: '#a89878',
    marginTop: SPACING.small,
    letterSpacing: 2,
  },
  factionText: {
    fontSize: FONT_SIZES.small,
    color: '#8b7355',
    marginTop: SPACING.medium,
    letterSpacing: 1,
  },
  diaryPage: {
    backgroundColor: '#f4e4c8', // Aged paper
    borderRadius: RADIUS.medium,
    padding: 0,
    marginBottom: SPACING.xlarge,
    // Paper shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    // Slight rotation for authenticity
    transform: [{ rotate: '-0.5deg' }],
  },
  diaryHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#c4a478',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diaryBinding: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#8b4513', // Leather binding
    borderTopLeftRadius: RADIUS.medium,
  },
  diaryTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: '#2c1810', // Dark brown ink
    fontStyle: 'italic',
    marginLeft: SPACING.medium,
    flex: 1,
    textAlign: 'center',
  },
  diaryContent: {
    padding: SPACING.large,
    paddingLeft: SPACING.xlarge,
  },
  diaryText: {
    fontSize: FONT_SIZES.medium,
    color: '#3c2415', // Faded ink
    lineHeight: FONT_SIZES.medium * 1.8,
    fontFamily: undefined, // Will use system serif if available
    letterSpacing: 0.3,
  },
  diaryFooter: {
    padding: SPACING.medium,
    alignItems: 'flex-end',
  },
  inkBlot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(44, 24, 16, 0.1)',
    marginRight: SPACING.large,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  continueButton: {
    backgroundColor: '#8b4513', // Brown leather
    paddingHorizontal: SPACING.xlarge * 2,
    paddingVertical: SPACING.large,
    borderRadius: RADIUS.medium,
    borderWidth: 2,
    borderColor: '#5c2d0a',
    // Subtle glow
    shadowColor: '#d4a574',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  continueButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: '#f4e4c8',
    letterSpacing: 1,
  },
  skipText: {
    fontSize: FONT_SIZES.small,
    color: '#6b5b4a',
    marginTop: SPACING.medium,
    fontStyle: 'italic',
  },
  tapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

export default IntroScreen;
