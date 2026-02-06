/**
 * WWI Tactical Game - War Diary Screen
 * Collection of all diary entries from the campaign journey
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
  Modal,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { getUnlockedDiaryEntries } from '../game/diary';
import { loadGame } from '../game/storage';
import { FACTIONS } from '../game/constants';
import { getFactionPhotos } from '../game/historicalPhotos';

const WarDiaryScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [faction, setFaction] = useState('british');
  const [language, setLanguage] = useState('en');
  const [factionData, setFactionData] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameStats, setGameStats] = useState({ missions: 0, veterans: 0, fallen: 0 });
  const [factionPhotos, setFactionPhotos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadDiaryData();
    }, [])
  );

  const loadDiaryData = async () => {
    try {
      const result = await loadGame();
      if (result.success && result.gameState) {
        const savedFaction = result.gameState.faction || 'british';
        const savedLanguage = result.gameState.language || 'en';
        const completedMissions = result.gameState.completedMissions || [];
        const fallenVeterans = result.gameState.fallenVeterans || [];
        const veterans = result.gameState.veterans || [];

        setFaction(savedFaction);
        setLanguage(savedLanguage);
        setFactionData(FACTIONS[savedFaction]);
        setFactionPhotos(getFactionPhotos(savedFaction));
        setGameStats({
          missions: completedMissions.length,
          veterans: veterans.length,
          fallen: fallenVeterans.length,
        });

        // Get diary entries in the user's selected language
        const diaryEntries = getUnlockedDiaryEntries(
          savedFaction,
          completedMissions,
          fallenVeterans,
          savedLanguage
        );
        setEntries(diaryEntries);
      } else {
        // Default state
        const diaryEntries = getUnlockedDiaryEntries('british', [], [], 'en');
        setEntries(diaryEntries);
        setFactionData(FACTIONS.british);
      }
    } catch (error) {
      console.log('Error loading diary data:', error);
      const diaryEntries = getUnlockedDiaryEntries('british', [], [], 'en');
      setEntries(diaryEntries);
    } finally {
      setLoading(false);
    }
  };

  // Get localized UI text
  const getLocalizedText = (key) => {
    const texts = {
      en: {
        warDiary: 'War Diary',
        journalOf: 'The Journal of a',
        soldier: 'Soldier',
        battlesFought: 'Battles Fought',
        veterans: 'Veterans',
        fallen: 'Fallen',
        journalEntries: 'Journal Entries',
        read: 'Read',
        closeDiary: 'Close Diary',
        noFallen: 'No veterans have fallen yet.',
        noFallenSubtext: 'May it remain so, though war spares few.',
        continueUnlock: 'Continue the campaign to unlock this entry...',
      },
      de: {
        warDiary: 'Kriegstagebuch',
        journalOf: 'Das Tagebuch eines',
        soldier: 'Soldaten',
        battlesFought: 'Kämpfe',
        veterans: 'Veteranen',
        fallen: 'Gefallen',
        journalEntries: 'Tagebucheinträge',
        read: 'Lesen',
        closeDiary: 'Tagebuch schließen',
        noFallen: 'Noch sind keine Veteranen gefallen.',
        noFallenSubtext: 'Möge es so bleiben, obwohl der Krieg nur wenige verschont.',
        continueUnlock: 'Setze die Kampagne fort, um diesen Eintrag freizuschalten...',
      },
      fr: {
        warDiary: 'Journal de Guerre',
        journalOf: 'Le Journal d\'un',
        soldier: 'Soldat',
        battlesFought: 'Batailles',
        veterans: 'Vétérans',
        fallen: 'Tombés',
        journalEntries: 'Entrées du Journal',
        read: 'Lire',
        closeDiary: 'Fermer le Journal',
        noFallen: 'Aucun vétéran n\'est encore tombé.',
        noFallenSubtext: 'Puisse-t-il en être ainsi, bien que la guerre n\'épargne personne.',
        continueUnlock: 'Continuez la campagne pour débloquer cette entrée...',
      },
    };
    return texts[language]?.[key] || texts.en[key];
  };

  const handleEntryPress = (entry) => {
    if (entry.unlocked) {
      setSelectedEntry(entry);
    }
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  const getEntryIcon = (entry) => {
    if (!entry.unlocked) return '🔒';

    switch (entry.type) {
      case 'intro':
        return '🏠';
      case 'firstBattle':
        return '⚔️';
      case 'midCampaign':
        return '🎖️';
      case 'lateCampaign':
        return '💪';
      case 'victory':
        return '🕊️';
      case 'memorial':
        return '✝️';
      default:
        return '📜';
    }
  };

  const getEntryPreview = (entry) => {
    if (!entry.unlocked) {
      return getLocalizedText('continueUnlock');
    }
    if (!entry.entry) return '';
    // Return first 100 characters of the entry
    return entry.entry.substring(0, 100) + '...';
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.containerCentered}>
        <Text style={styles.loadingText}>Loading diary...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{getLocalizedText('warDiary')}</Text>
          {factionData && (
            <Text style={styles.subtitle}>
              {language === 'de' ? '🇩🇪' : language === 'fr' ? '🇫🇷' : '🇬🇧'} {getLocalizedText('journalOf')} {getLocalizedText('soldier')}
            </Text>
          )}
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{gameStats.missions}</Text>
            <Text style={styles.statLabel}>{getLocalizedText('battlesFought')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{gameStats.veterans}</Text>
            <Text style={styles.statLabel}>{getLocalizedText('veterans')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{gameStats.fallen}</Text>
            <Text style={styles.statLabel}>{getLocalizedText('fallen')}</Text>
          </View>
        </View>

        {/* Historical Photos Gallery */}
        {factionPhotos.length > 0 && (
          <View style={styles.photosSection}>
            <Text style={styles.photosSectionTitle}>📷 Photographs from the Front</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.photosScroll}
            >
              {factionPhotos.map((photo, index) => (
                <View key={photo.id || index} style={styles.photoCard}>
                  {photo.image ? (
                    <Image
                      source={photo.image}
                      style={styles.photoImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.photoFrame}>
                      <Text style={styles.photoEmoji}>{photo.placeholder}</Text>
                    </View>
                  )}
                  <Text style={styles.photoTitle}>{photo.title}</Text>
                  <Text style={styles.photoYear}>{photo.year}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Diary Entries List */}
        <View style={styles.entriesContainer}>
          <Text style={styles.sectionTitle}>{getLocalizedText('journalEntries')}</Text>

          {entries.map((entry, index) => (
            <TouchableOpacity
              key={`${entry.type}-${index}`}
              style={[
                styles.entryCard,
                !entry.unlocked && styles.entryCardLocked,
                entry.type === 'memorial' && styles.entryCardMemorial,
              ]}
              onPress={() => handleEntryPress(entry)}
              disabled={!entry.unlocked}
            >
              <View style={styles.entryIcon}>
                <Text style={styles.entryIconText}>{getEntryIcon(entry)}</Text>
              </View>

              <View style={styles.entryContent}>
                <Text
                  style={[
                    styles.entryTitle,
                    !entry.unlocked && styles.entryTitleLocked,
                  ]}
                >
                  {entry.title}
                </Text>

                {entry.unlocked && entry.date && (
                  <Text style={styles.entryDate}>
                    {entry.date} {entry.location ? `• ${entry.location}` : ''}
                  </Text>
                )}

                <Text
                  style={[
                    styles.entryPreview,
                    !entry.unlocked && styles.entryPreviewLocked,
                  ]}
                  numberOfLines={2}
                >
                  {getEntryPreview(entry)}
                </Text>
              </View>

              {entry.unlocked && (
                <View style={styles.readMore}>
                  <Text style={styles.readMoreText}>{getLocalizedText('read')}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State for No Fallen */}
        {gameStats.fallen === 0 && (
          <View style={styles.noFallenCard}>
            <Text style={styles.noFallenIcon}>🙏</Text>
            <Text style={styles.noFallenText}>
              {getLocalizedText('noFallen')}
            </Text>
            <Text style={styles.noFallenSubtext}>
              {getLocalizedText('noFallenSubtext')}
            </Text>
          </View>
        )}

        <View style={{ height: SPACING.huge }} />
      </ScrollView>

      {/* Entry Detail Modal */}
      <Modal
        visible={selectedEntry !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScroll}>
              {selectedEntry && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalDate}>{selectedEntry.date}</Text>
                    <Text style={styles.modalLocation}>{selectedEntry.location}</Text>
                  </View>

                  <View style={styles.modalDiaryPage}>
                    <Text style={styles.modalTitle}>{selectedEntry.title}</Text>
                    <Text style={styles.modalText}>{selectedEntry.entry}</Text>
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>{getLocalizedText('closeDiary')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  loadingText: {
    color: '#d4c4a8',
    fontSize: FONT_SIZES.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xlarge,
    paddingTop: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.huge,
    fontWeight: '700',
    color: '#d4c4a8',
    letterSpacing: 2,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: '#8b7355',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 228, 200, 0.1)',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.xlarge,
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.3)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '700',
    color: '#d4c4a8',
    marginBottom: SPACING.tiny,
  },
  statLabel: {
    fontSize: FONT_SIZES.small,
    color: '#8b7355',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(139, 69, 19, 0.3)',
    marginHorizontal: SPACING.medium,
  },
  entriesContainer: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '600',
    color: '#d4c4a8',
    marginBottom: SPACING.medium,
  },
  entryCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 228, 200, 0.08)',
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.2)',
    alignItems: 'center',
  },
  entryCardLocked: {
    opacity: 0.5,
  },
  entryCardMemorial: {
    borderColor: 'rgba(180, 90, 90, 0.3)',
    backgroundColor: 'rgba(180, 90, 90, 0.08)',
  },
  entryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.medium,
  },
  entryIconText: {
    fontSize: 24,
  },
  entryContent: {
    flex: 1,
  },
  entryTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#d4c4a8',
    marginBottom: SPACING.tiny,
  },
  entryTitleLocked: {
    color: '#6b5b4a',
  },
  entryDate: {
    fontSize: FONT_SIZES.small,
    color: '#a89878',
    marginBottom: SPACING.small,
    fontStyle: 'italic',
  },
  entryPreview: {
    fontSize: FONT_SIZES.small,
    color: '#8b7355',
    lineHeight: FONT_SIZES.small * 1.4,
  },
  entryPreviewLocked: {
    fontStyle: 'italic',
  },
  readMore: {
    backgroundColor: 'rgba(139, 69, 19, 0.3)',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.small,
    marginLeft: SPACING.small,
  },
  readMoreText: {
    fontSize: FONT_SIZES.small,
    color: '#d4c4a8',
    fontWeight: '600',
  },
  noFallenCard: {
    alignItems: 'center',
    padding: SPACING.xlarge,
    backgroundColor: 'rgba(100, 180, 100, 0.1)',
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: 'rgba(100, 180, 100, 0.2)',
  },
  noFallenIcon: {
    fontSize: 36,
    marginBottom: SPACING.medium,
  },
  noFallenText: {
    fontSize: FONT_SIZES.medium,
    color: '#98b898',
    fontWeight: '600',
    marginBottom: SPACING.small,
  },
  noFallenSubtext: {
    fontSize: FONT_SIZES.small,
    color: '#6b8b6b',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  modalContent: {
    backgroundColor: '#1a1510',
    borderRadius: RADIUS.large,
    maxHeight: '85%',
    width: '100%',
    borderWidth: 2,
    borderColor: '#8b4513',
  },
  modalScroll: {
    padding: SPACING.large,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: SPACING.large,
    paddingBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 69, 19, 0.3)',
  },
  modalDate: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '600',
    color: '#d4c4a8',
    fontStyle: 'italic',
  },
  modalLocation: {
    fontSize: FONT_SIZES.medium,
    color: '#a89878',
    marginTop: SPACING.small,
  },
  modalDiaryPage: {
    backgroundColor: '#f4e4c8',
    borderRadius: RADIUS.medium,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
  },
  modalTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: '#2c1810',
    marginBottom: SPACING.medium,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalText: {
    fontSize: FONT_SIZES.medium,
    color: '#3c2415',
    lineHeight: FONT_SIZES.medium * 1.8,
    letterSpacing: 0.3,
  },
  closeButton: {
    backgroundColor: '#8b4513',
    padding: SPACING.large,
    alignItems: 'center',
    borderBottomLeftRadius: RADIUS.large,
    borderBottomRightRadius: RADIUS.large,
  },
  closeButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#f4e4c8',
  },
  // Photos Section
  photosSection: {
    marginBottom: SPACING.xlarge,
  },
  photosSectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: '#d4c4a8',
    marginBottom: SPACING.medium,
  },
  photosScroll: {
    marginHorizontal: -SPACING.small,
  },
  photoCard: {
    width: 140,
    marginHorizontal: SPACING.small,
    alignItems: 'center',
  },
  photoImage: {
    width: 120,
    height: 90,
    borderRadius: 4,
    marginBottom: SPACING.small,
    borderWidth: 3,
    borderColor: '#5c3d1a',
    backgroundColor: '#2a2015',
  },
  photoFrame: {
    width: 120,
    height: 90,
    backgroundColor: '#2a2015',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.small,
    borderWidth: 3,
    borderColor: '#5c3d1a',
    // Sepia photo frame effect
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  photoEmoji: {
    fontSize: 36,
  },
  photoTitle: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: '600',
    color: '#d4c4a8',
    textAlign: 'center',
    marginBottom: 2,
  },
  photoYear: {
    fontSize: FONT_SIZES.tiny,
    color: '#8b7355',
    fontStyle: 'italic',
  },
});

export default WarDiaryScreen;
