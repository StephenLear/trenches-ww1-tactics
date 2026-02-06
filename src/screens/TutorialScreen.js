/**
 * WWI Tactical Game - Tutorial Screen
 * How to play guide for new players
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { UNIT_TYPES, TERRAIN_TYPES } from '../game/constants';

const TUTORIAL_SECTIONS = [
  {
    id: 'basics',
    title: '🎮 Basic Controls',
    icon: '👆',
    content: [
      {
        subtitle: 'Selecting Units',
        text: 'Tap on one of your units (blue outline) to select it. Selected units show their movement range in blue and attack range in red.',
      },
      {
        subtitle: 'Moving',
        text: 'After selecting a unit, tap on a blue highlighted tile to move there. Units can only move once per turn.',
      },
      {
        subtitle: 'Attacking',
        text: 'If an enemy is within your attack range (red tiles), tap on them to attack. Damage is calculated based on attack vs defense stats.',
      },
      {
        subtitle: 'Ending Turn',
        text: 'Tap the "End Turn" button when you\'ve moved all your units. The enemy will then take their turn.',
      },
    ],
  },
  {
    id: 'units',
    title: '🪖 Unit Types',
    icon: '⚔️',
    content: [
      {
        subtitle: '🪖 Infantry',
        text: 'Versatile soldiers. Balanced stats, can Dig In for extra defense. The backbone of your army.',
      },
      {
        subtitle: '🔫 Machine Gunner',
        text: 'Defensive powerhouse. High attack and range but slow movement. Devastating against cavalry.',
      },
      {
        subtitle: '🐴 Cavalry',
        text: 'Fast and powerful but fragile. Can charge across the battlefield quickly. Vulnerable to machine guns.',
      },
      {
        subtitle: '🛡️ Tank',
        text: 'Heavy armor, ignores barbed wire. Slow but powerful. Can crush obstacles and absorb damage.',
      },
      {
        subtitle: '💥 Artillery',
        text: 'Long range bombardment. Cannot move and fire in the same turn. Has minimum range - can\'t hit close enemies.',
      },
      {
        subtitle: '⚕️ Medic',
        text: 'Heals adjacent allies each turn. Cannot attack but essential for keeping veterans alive.',
      },
      {
        subtitle: '🎯 Sniper',
        text: 'Long range, high damage, chance for critical hits. Very fragile - keep them protected.',
      },
      {
        subtitle: '⭐ Officer',
        text: 'Boosts nearby allies with Rally ability. Low combat stats but invaluable leadership.',
      },
      {
        subtitle: '🔭 Scout',
        text: 'Fast movement, can flank enemies to ignore their defense. Great for reconnaissance.',
      },
    ],
  },
  {
    id: 'terrain',
    title: '🗺️ Terrain',
    icon: '⛰️',
    content: [
      {
        subtitle: '🪖 Trenches',
        text: '+1 Defense. The safest place on the battlefield. Always try to fight from trenches.',
      },
      {
        subtitle: '💧 Mud',
        text: 'Costs 2 movement to cross. Slows cavalry significantly. Avoid if possible.',
      },
      {
        subtitle: '🔗 Barbed Wire',
        text: 'Costs 3 movement and deals 1 damage. Tanks ignore barbed wire completely.',
      },
      {
        subtitle: '💥 Craters',
        text: '+1 Defense. Shell holes provide cover for infantry.',
      },
      {
        subtitle: '🌊 Water',
        text: '-1 Defense, blocks tanks. Dangerous crossing but sometimes necessary.',
      },
      {
        subtitle: '🚩 Objectives',
        text: 'Capture these by moving a unit onto them. Some missions require holding objectives.',
      },
    ],
  },
  {
    id: 'combat',
    title: '⚔️ Combat Tips',
    icon: '💡',
    content: [
      {
        subtitle: 'Focus Fire',
        text: 'Concentrate multiple units on one enemy to eliminate them quickly. A wounded enemy still attacks at full power.',
      },
      {
        subtitle: 'Use Cover',
        text: 'Always position units in trenches or craters when possible. Defense bonuses save lives.',
      },
      {
        subtitle: 'Protect Veterans',
        text: 'Veteran units have better stats and are irreplaceable. Keep them alive!',
      },
      {
        subtitle: 'Watch the Flanks',
        text: 'Don\'t let enemies get behind your lines. Protect your medics and artillery.',
      },
      {
        subtitle: 'Use Abilities',
        text: 'Each unit has special abilities. Officers can Rally, Medics can Heal, Tanks can Crush. Use them!',
      },
    ],
  },
  {
    id: 'veterans',
    title: '🎖️ Veterans & Progression',
    icon: '📈',
    content: [
      {
        subtitle: 'Creating Veterans',
        text: 'Units that survive battles become veterans with names and improved stats.',
      },
      {
        subtitle: 'Deployment',
        text: 'Before each mission, you can deploy veterans into unit slots for bonus stats.',
      },
      {
        subtitle: 'Requisition Points',
        text: 'Earned from victories. Spend them in the Armory for permanent upgrades.',
      },
      {
        subtitle: 'Medals',
        text: 'Complete achievements to earn medals. Check the Medals screen to see your progress.',
      },
    ],
  },
  {
    id: 'weather',
    title: '🌧️ Weather Effects',
    icon: '☁️',
    content: [
      {
        subtitle: '☀️ Clear',
        text: 'No effects. Standard combat conditions.',
      },
      {
        subtitle: '🌧️ Rain',
        text: '-1 range for all ranged attacks. Get closer before shooting.',
      },
      {
        subtitle: '❄️ Snow',
        text: '-1 movement for all units. Plan your advances carefully.',
      },
      {
        subtitle: '🌫️ Fog',
        text: 'Cannot see enemies beyond 3 tiles. Expect ambushes.',
      },
      {
        subtitle: '🏜️ Sandstorm',
        text: '-1 range AND -1 movement. The harshest conditions.',
      },
    ],
  },
];

const TutorialScreen = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState('basics');

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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
          <Text style={styles.title}>📖 How to Play</Text>
          <Text style={styles.subtitle}>
            Master the trenches of the Great War
          </Text>
        </View>

        {/* Quick Start */}
        <View style={styles.quickStart}>
          <Text style={styles.quickStartTitle}>⚡ Quick Start</Text>
          <Text style={styles.quickStartText}>
            1. Select a unit by tapping it{'\n'}
            2. Tap a blue tile to move{'\n'}
            3. Tap an enemy to attack{'\n'}
            4. End your turn when done{'\n'}
            5. Eliminate all enemies to win!
          </Text>
        </View>

        {/* Tutorial Sections */}
        {TUTORIAL_SECTIONS.map((section) => (
          <View key={section.id} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
            >
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.expandIcon}>
                {expandedSection === section.id ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedSection === section.id && (
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.contentItem}>
                    <Text style={styles.contentSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.contentText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Tip: Start on Easy difficulty to learn the basics!
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.startButtonText}>Ready for Battle!</Text>
          </TouchableOpacity>
        </View>

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
    marginBottom: SPACING.large,
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
  quickStart: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  quickStartTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: SPACING.medium,
  },
  quickStartText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textWhite,
    lineHeight: 28,
  },
  section: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.medium,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundLight,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: SPACING.medium,
  },
  sectionTitle: {
    flex: 1,
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  expandIcon: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  sectionContent: {
    padding: SPACING.medium,
    paddingTop: 0,
    backgroundColor: COLORS.backgroundDark,
  },
  contentItem: {
    marginBottom: SPACING.medium,
    paddingBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contentSubtitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  contentText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  footerText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.accent,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.large,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
  },
  startButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});

export default TutorialScreen;
