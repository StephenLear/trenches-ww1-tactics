/**
 * WWI Tactical Game - App Navigator
 * React Navigation Stack Navigator setup
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import IntroScreen from '../screens/IntroScreen';
import MenuScreen from '../screens/MenuScreen';
import BriefingScreen from '../screens/BriefingScreen';
import BattleScreen from '../screens/BattleScreen';
import VictoryScreen from '../screens/VictoryScreen';
import DefeatScreen from '../screens/DefeatScreen';
import CommandHQScreen from '../screens/CommandHQScreen';
import DeploymentScreen from '../screens/DeploymentScreen';
import SkirmishScreen from '../screens/SkirmishScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WarDiaryScreen from '../screens/WarDiaryScreen';
import MedalsScreen from '../screens/MedalsScreen';
import UpgradesScreen from '../screens/UpgradesScreen';
import TutorialScreen from '../screens/TutorialScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import MemorialScreen from '../screens/MemorialScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import CampaignMapScreen from '../screens/CampaignMapScreen';

import { COLORS } from '../styles/colors';
import { loadGame, saveGame } from '../game/storage';

const Stack = createNativeStackNavigator();

/**
 * Main App Navigator
 * Defines all screen routes and navigation options
 */
const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const result = await loadGame();

      if (result.success && result.gameState) {
        const hasProgress = result.gameState.completedMissions?.length > 0 ||
                           result.gameState.veterans?.length > 0;

        // If user has existing progress but no language set,
        // skip language selection (they're a returning player from before the language feature)
        // They can set language in Settings later
        if (hasProgress && !result.gameState.hasSelectedLanguage) {
          // Set default language for existing users
          await saveGame({
            ...result.gameState,
            language: 'en',
            hasSelectedLanguage: true,
            hasSeenIntro: true, // Skip intro for existing players
          });
          setInitialRoute('Menu');
        }
        // New user who hasn't selected language yet
        else if (!result.gameState.hasSelectedLanguage) {
          setInitialRoute('LanguageSelect');
        }
        // User selected language but hasn't seen intro
        else if (!result.gameState.hasSeenIntro) {
          setInitialRoute('Intro');
        }
        // Otherwise go to menu
        else {
          setInitialRoute('Menu');
        }
      } else {
        // New user - show language selection first
        setInitialRoute('LanguageSelect');
      }
    } catch (error) {
      // Default to language selection on error
      setInitialRoute('LanguageSelect');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.backgroundDark,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: COLORS.background,
          },
          // Default animation for all screens
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      >
        {/* Language Selection - First launch */}
        <Stack.Screen
          name="LanguageSelect"
          component={LanguageSelectScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />

        {/* Intro Screen - First launch narrative */}
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />

        {/* Main Menu - Campaign/Skirmish selection */}
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        {/* War Diary - Journal entries */}
        <Stack.Screen
          name="WarDiary"
          component={WarDiaryScreen}
          options={{
            title: 'War Diary',
            headerBackTitle: 'Menu',
            headerStyle: {
              backgroundColor: '#1a1510',
            },
            headerTintColor: '#d4c4a8',
          }}
        />

        {/* Command HQ - Tech tree, shop, roster */}
        <Stack.Screen
          name="CommandHQ"
          component={CommandHQScreen}
          options={{
            title: 'Command HQ',
            headerBackTitle: 'Back',
          }}
        />

        {/* Mission Briefing */}
        <Stack.Screen
          name="Briefing"
          component={BriefingScreen}
          options={{
            title: 'Mission Briefing',
            headerBackTitle: 'Menu',
            animation: 'slide_from_bottom',
          }}
        />

        {/* Deployment Screen - Choose veterans */}
        <Stack.Screen
          name="Deployment"
          component={DeploymentScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        {/* Battle Screen - Main gameplay */}
        <Stack.Screen
          name="Battle"
          component={BattleScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
            animationDuration: 500,
          }}
        />

        {/* Victory Screen */}
        <Stack.Screen
          name="Victory"
          component={VictoryScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade_from_bottom',
            animationDuration: 400,
          }}
        />

        {/* Defeat Screen */}
        <Stack.Screen
          name="Defeat"
          component={DefeatScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
            animationDuration: 400,
          }}
        />

        {/* Skirmish Setup */}
        <Stack.Screen
          name="Skirmish"
          component={SkirmishScreen}
          options={{
            title: 'Skirmish Mode',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Settings */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerBackTitle: 'Menu',
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        {/* Medals & Achievements */}
        <Stack.Screen
          name="Medals"
          component={MedalsScreen}
          options={{
            title: 'Medals & Honours',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Upgrades/Armory */}
        <Stack.Screen
          name="Upgrades"
          component={UpgradesScreen}
          options={{
            title: 'Armory',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Tutorial/How to Play */}
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
          options={{
            title: 'How to Play',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Statistics */}
        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            title: 'Statistics',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Memorial - Fallen Veterans */}
        <Stack.Screen
          name="Memorial"
          component={MemorialScreen}
          options={{
            title: 'Memorial Wall',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Leaderboards */}
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            title: 'Leaderboards',
            headerBackTitle: 'Menu',
          }}
        />

        {/* Achievements */}
        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />

        {/* Campaign Map */}
        <Stack.Screen
          name="CampaignMap"
          component={CampaignMapScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1510',
  },
  loadingText: {
    color: '#d4c4a8',
    marginTop: 16,
    fontSize: 16,
  },
});

export default AppNavigator;
