/**
 * WWI Tactical Game - Battle Log Component
 * Displays combat log messages with auto-scroll
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../styles/colors';

const BattleLog = ({ messages = [], maxMessages = 10 }) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollViewRef.current && messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  // Limit displayed messages
  const displayedMessages = messages.slice(-maxMessages);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Battle Log</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedMessages.length === 0 ? (
          <Text style={styles.emptyText}>Waiting for battle to begin...</Text>
        ) : (
          displayedMessages.map((message, index) => (
            <View key={index} style={styles.messageRow}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
    maxHeight: 150,
  },
  header: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    maxHeight: 120,
  },
  scrollContent: {
    padding: SPACING.small,
  },
  emptyText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: SPACING.medium,
  },
  messageRow: {
    marginBottom: SPACING.tiny,
  },
  messageText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.small * 1.4,
  },
});

export default BattleLog;
