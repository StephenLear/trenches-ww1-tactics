/**
 * WWI Tactical Game - Battle Screen
 * Main gameplay screen with 8x8 grid, unit control, and battle logic
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../styles/colors';
import { MISSIONS, getMissionForFaction } from '../game/missions';
import { UNIT_TYPES, DIFFICULTY_SETTINGS, GRID_SIZE, FACTIONS } from '../game/constants';
import { getMoves, getTargets } from '../game/movement';
import { performAttack } from '../game/combat';
import { initUnits, createVeteran } from '../game/progression';
import { saveGame, loadGame } from '../game/storage';
import { playSFX, initializeAudio } from '../audio/AudioManager';
import GridTile from '../components/GridTile';
import UnitSprite from '../components/UnitSprite';
import BattleLog from '../components/BattleLog';
import UnitInfoPanel from '../components/UnitInfoPanel';
import WeatherEffects from '../components/WeatherEffects';
import { hapticSelect, hapticAttack, hapticHit, hapticVictory, hapticDefeat, hapticDeath, hapticExplosion } from '../game/haptics';
import { radioChatterManager, ChatterType, getChatter } from '../game/radioChatter';
import { achievementManager } from '../game/achievements';

const { width } = Dimensions.get('window');
const TILE_SIZE = Math.floor((width - 40) / GRID_SIZE); // Responsive tile size

const BattleScreen = ({ route, navigation }) => {
  // Ensure missionId is a number to fix mission progression bugs
  const missionId = Number(route.params.missionId);
  const mode = route.params.mode || 'campaign';
  const deployedVeterans = route.params.deployedVeterans || [];

  // Game state
  const [mission, setMission] = useState(MISSIONS[missionId]); // Will be updated with faction-adapted version
  const [units, setUnits] = useState([]);
  const [terrain, setTerrain] = useState([]);
  const [turn, setTurn] = useState(1);
  const [phase, setPhase] = useState('player'); // 'player' or 'enemy'
  const [selected, setSelected] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [log, setLog] = useState([]);
  const [gameState, setGameState] = useState(null);
  const battleEndedRef = useRef(false);

  // Animation states for units (key is unit.id)
  const [unitAnimations, setUnitAnimations] = useState({});

  // Undo state - stores previous turn state for undo functionality
  const [undoState, setUndoState] = useState(null);
  const [canUndo, setCanUndo] = useState(false);

  // Radio chatter display
  const [currentChatter, setCurrentChatter] = useState(null);

  // Helper to trigger animation on a unit
  const triggerAnimation = (unitId, animationType) => {
    setUnitAnimations(prev => ({ ...prev, [unitId]: animationType }));
    // Clear animation after a delay
    setTimeout(() => {
      setUnitAnimations(prev => ({ ...prev, [unitId]: null }));
    }, 600);
  };

  useEffect(() => {
    // Ensure audio is initialized
    initializeAudio();
    initializeBattle();

    // Set up radio chatter callback
    radioChatterManager.setMessageCallback((message) => {
      setCurrentChatter(message);
    });

    // Load achievements
    achievementManager.load();

    return () => {
      radioChatterManager.clear();
    };
  }, []);

  useEffect(() => {
    // Check victory/defeat conditions after each state change
    checkBattleEnd();
  }, [units, phase]);

  const initializeBattle = async () => {
    try {
      // Initialize audio system
      await initializeAudio();

      // Load game state for veterans and progression
      const result = await loadGame();
      const savedGame = result.success ? result.gameState : null;
      const defaultGameState = {
        completedMissions: [],
        veterans: [],
        researchedTech: [],
        resources: 100,
        difficulty: 'normal',
        faction: 'british',
      };
      setGameState(savedGame || defaultGameState);

      // Build veterans list from deployment selection
      // deployedVeterans is array of { slotIndex, veteran } from DeploymentScreen
      const veteransToUse = deployedVeterans.length > 0
        ? deployedVeterans.map(dv => ({ ...dv.veteran, templateId: mission.units[dv.slotIndex]?.id }))
        : savedGame?.veterans || [];

      // Get the selected faction for unit bonuses
      const selectedFaction = savedGame?.faction || 'british';
      const factionConfig = FACTIONS[selectedFaction] || FACTIONS.british;

      // Get faction-adapted mission (may flip positions for German player)
      const adaptedMission = getMissionForFaction(missionId, selectedFaction);
      setMission(adaptedMission);

      // Initialize units with veterans and faction bonuses
      const initializedUnits = initUnits(
        adaptedMission.units,
        veteransToUse,
        UNIT_TYPES,
        [],
        factionConfig,
        savedGame?.difficulty || 'normal',
        DIFFICULTY_SETTINGS,
        selectedFaction
      ).filter(u => u !== null);

      // Log faction bonuses
      addLog(`Fighting as ${factionConfig.name} ${factionConfig.flag}`);
      if (adaptedMission.isFlipped) {
        addLog(`Historical perspective: Defending as Central Powers`);
      }

      setUnits(initializedUnits);
      setTerrain(adaptedMission.terrain || []);
      addLog(`Mission Start: ${adaptedMission.name}`);
      addLog(`Turn 1 - Your phase`);
    } catch (error) {
      console.error('Failed to initialize battle:', error);
      Alert.alert('Error', 'Failed to start battle');
    }
  };

  const addLog = (message) => {
    setLog(prev => [...prev, message]);
  };

  const getTileHighlight = (x, y) => {
    const searchX = Number(x);
    const searchY = Number(y);
    const highlight = highlights.find(h => Number(h.x) === searchX && Number(h.y) === searchY);
    return highlight ? { isHighlighted: true, type: highlight.type } : { isHighlighted: false };
  };

  const getUnitAt = (x, y) => {
    const searchX = Number(x);
    const searchY = Number(y);
    return units.find(u => Number(u.x) === searchX && Number(u.y) === searchY && u.hp > 0);
  };

  const getTerrainAt = (x, y) => {
    const searchX = Number(x);
    const searchY = Number(y);
    return terrain.find(t => Number(t.x) === searchX && Number(t.y) === searchY);
  };

  const handleTilePress = (x, y) => {
    const unit = getUnitAt(x, y);

    // If clicked on enemy unit and we have a selected friendly, try to attack
    if (selected && unit && unit.team !== selected.team) {
      handleAttack(selected, unit);
      return;
    }

    // If clicked on friendly unit, select it
    if (unit && unit.team === 'player' && phase === 'player') {
      handleUnitSelect(unit);
      return;
    }

    // If we have a selected unit and clicked on empty highlighted tile, move there
    if (selected && !unit) {
      const searchX = Number(x);
      const searchY = Number(y);
      const moveHighlight = highlights.find(h => Number(h.x) === searchX && Number(h.y) === searchY && h.type === 'move');
      if (moveHighlight) {
        handleMove(selected, x, y);
      }
    }
  };

  // Save state for undo before any action
  const saveUndoState = () => {
    setUndoState({
      units: JSON.parse(JSON.stringify(units)),
      log: [...log],
    });
    setCanUndo(true);
  };

  // Undo last action (move or attack)
  const handleUndo = () => {
    if (!undoState || !canUndo) return;

    setUnits(undoState.units);
    setLog(undoState.log);
    setSelected(null);
    setHighlights([]);
    setCanUndo(false);
    addLog('Action undone');
    playSFX('click');
  };

  const handleUnitSelect = (unit) => {
    if (unit.hasMoved && unit.hasAttacked) {
      addLog(`${unit.name || unit.type} has already acted this turn`);
      return;
    }

    setSelected(unit);
    hapticSelect(); // Haptic feedback on unit selection
    radioChatterManager.addChatter(ChatterType.UNIT_SELECT, gameState?.faction || 'british');

    // Calculate valid moves and targets
    // Filter out dead units before calculating moves
    const aliveUnits = units.filter(u => u.hp > 0);
    const moves = getMoves(unit, aliveUnits, terrain, mission.weather, [], []);
    const targets = getTargets(unit, aliveUnits, mission.weather, [], [], [], []);

    const newHighlights = [
      ...moves.map(m => ({ x: m.x, y: m.y, type: 'move' })),
      ...targets.map(t => ({ x: t.x, y: t.y, type: 'attack' })),
      { x: unit.x, y: unit.y, type: 'selected' },
    ];

    setHighlights(newHighlights);
    addLog(`Selected: ${unit.fullName || unit.type}`);
  };

  const handleMove = (unit, newX, newY) => {
    // Save state for undo before moving
    saveUndoState();

    // Play movement sound
    playSFX('move', 0.5);

    setUnits(prevUnits =>
      prevUnits.map(u =>
        u.id === unit.id
          ? { ...u, x: newX, y: newY, hasMoved: true, hasMovedThisTurn: true }
          : u
      )
    );

    addLog(`${unit.fullName || unit.type} moved to (${newX}, ${newY})`);

    // Update highlights after move
    const movedUnit = { ...unit, x: newX, y: newY, hasMoved: true };
    const aliveUnits = units.filter(u => u.hp > 0);
    const targets = getTargets(movedUnit, aliveUnits, mission.weather, [], [], [], []);

    setHighlights([
      ...targets.map(t => ({ x: t.x, y: t.y, type: 'attack' })),
      { x: newX, y: newY, type: 'selected' },
    ]);

    setSelected(movedUnit);
  };

  const handleAttack = (attacker, defender) => {
    // Save state for undo before attacking
    saveUndoState();

    // Trigger attack animation on attacker
    triggerAnimation(attacker.id, 'attack');
    hapticAttack(); // Haptic feedback on attack
    radioChatterManager.addChatter(ChatterType.ATTACK_ORDER, gameState?.faction || 'british');

    // Play attack sound based on unit type
    const attackerType = attacker.type?.toLowerCase() || '';
    if (attackerType.includes('machine') || attackerType === 'machinegun') {
      playSFX('machinegun');
    } else if (attackerType.includes('artillery') || attackerType.includes('mortar')) {
      playSFX('artillery');
    } else {
      playSFX('rifle');
    }

    const result = performAttack(
      attacker,
      defender,
      units,
      terrain,
      mission.weather,
      {},
      [],
      addLog
    );

    if (result.success) {
      // Trigger damage/death animation on defender
      if (result.killed) {
        triggerAnimation(defender.id, 'death');
        hapticDeath();
        setTimeout(() => playSFX('explosion', 0.6), 200);
        radioChatterManager.addChatter(ChatterType.ENEMY_DOWN, gameState?.faction || 'british');
        // Track kill for achievements
        achievementManager.checkEvent('unit_killed', { unitType: defender.type });
      } else if (result.isCritical) {
        triggerAnimation(defender.id, 'critical');
        hapticHit(true); // Critical hit haptic
        radioChatterManager.addChatter(ChatterType.CRITICAL_HIT, gameState?.faction || 'british');
        achievementManager.checkEvent('critical_hit');
      } else {
        triggerAnimation(defender.id, 'damage');
        hapticHit(false);
      }

      // Delay unit removal slightly to let animation play
      setTimeout(() => {
        // Remove dead units from state to prevent movement blocking issues
        const aliveUnits = result.updatedUnits.filter(u => u.hp > 0);
        setUnits(aliveUnits);
      }, result.killed ? 400 : 0);

      // Clear selection after attack
      setSelected(null);
      setHighlights([]);
    }
  };

  const handleEndTurn = () => {
    if (phase === 'player') {
      // Reset player unit actions
      setUnits(prevUnits =>
        prevUnits.map(u =>
          u.team === 'player'
            ? { ...u, hasMoved: false, hasAttacked: false, hasMovedThisTurn: false }
            : u
        )
      );

      setPhase('enemy');
      setSelected(null);
      setHighlights([]);
      addLog('Enemy phase...');

      // Simple enemy AI (you can enhance this)
      setTimeout(() => {
        executeEnemyTurn();
      }, 1000);
    }
  };

  const executeEnemyTurn = () => {
    // Improved AI: move towards player units, then attack if in range
    let currentUnits = [...units];

    const enemyUnits = currentUnits.filter(u => u.team === 'enemy' && u.hp > 0);

    enemyUnits.forEach(enemy => {
      const aliveUnits = currentUnits.filter(u => u.hp > 0);
      const playerUnits = aliveUnits.filter(u => u.team === 'player');

      // First, check if we can attack
      const targets = getTargets(enemy, aliveUnits, mission.weather, [], [], [], []);

      if (targets.length > 0) {
        // Attack the nearest/weakest target
        const target = targets[0];
        const result = performAttack(enemy, target, currentUnits, terrain, mission.weather, {}, [], addLog);
        if (result.success) {
          currentUnits = result.updatedUnits.filter(u => u.hp > 0);
        }
      } else if (playerUnits.length > 0) {
        // No targets in range - move towards nearest player unit
        const moves = getMoves(enemy, aliveUnits, terrain, mission.weather, [], []);

        if (moves.length > 0) {
          // Find the nearest player unit
          let nearestPlayer = null;
          let nearestDist = Infinity;

          playerUnits.forEach(player => {
            const dist = Math.abs(Number(enemy.x) - Number(player.x)) + Math.abs(Number(enemy.y) - Number(player.y));
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestPlayer = player;
            }
          });

          if (nearestPlayer) {
            // Find the move that gets us closest to the target
            let bestMove = null;
            let bestDist = nearestDist;

            moves.forEach(move => {
              const dist = Math.abs(move.x - Number(nearestPlayer.x)) + Math.abs(move.y - Number(nearestPlayer.y));
              if (dist < bestDist) {
                bestDist = dist;
                bestMove = move;
              }
            });

            if (bestMove) {
              // Move the enemy
              currentUnits = currentUnits.map(u => {
                if (u.id === enemy.id) {
                  return { ...u, x: bestMove.x, y: bestMove.y, hasMoved: true };
                }
                return u;
              });
              addLog(`${enemy.name || enemy.type} advances`);

              // Check if we can attack after moving
              const updatedEnemy = { ...enemy, x: bestMove.x, y: bestMove.y, hasMoved: true };
              const newTargets = getTargets(updatedEnemy, currentUnits.filter(u => u.hp > 0), mission.weather, [], [], [], []);

              if (newTargets.length > 0) {
                const target = newTargets[0];
                const result = performAttack(updatedEnemy, target, currentUnits, terrain, mission.weather, {}, [], addLog);
                if (result.success) {
                  currentUnits = result.updatedUnits.filter(u => u.hp > 0);
                }
              }
            }
          }
        }
      }
    });

    // Update state with all enemy actions (only alive units)
    setUnits(currentUnits);

    // End enemy turn
    setTimeout(() => {
      const newTurn = turn + 1;
      setTurn(newTurn);
      setPhase('player');
      addLog(`Turn ${newTurn} - Your phase`);

      // Check survival victory condition at start of new turn
      if (mission.specialVictory === 'survive_turns' && newTurn > mission.turnsToSurvive) {
        const playerAlive = currentUnits.filter(u => u.team === 'player' && u.hp > 0).length;
        if (playerAlive > 0 && !battleEndedRef.current) {
          battleEndedRef.current = true;
          addLog(`🏆 Survived ${mission.turnsToSurvive} turns! Victory!`);
          setTimeout(() => {
            playSFX('victory');
          }, 500);
          setTimeout(() => {
            handleVictory();
          }, 1000);
          return;
        }
      }

      // Reset all unit actions for new turn and apply medic healing aura
      setUnits(prevUnits => {
        // Find all player medics
        const medics = prevUnits.filter(u => u.type === 'medic' && u.team === 'player' && u.hp > 0);

        // Apply healing to units adjacent to medics
        const healedUnits = prevUnits.map(u => {
          // Skip dead units, enemy units, and medics themselves
          if (u.hp <= 0 || u.team !== 'player') return u;

          // Check if unit is wounded and adjacent to any medic
          const unitType = UNIT_TYPES[u.type];
          const maxHp = unitType?.hp || 3;
          const isWounded = u.hp < (u.maxHp || maxHp);

          if (isWounded) {
            const adjacentMedic = medics.find(medic => {
              const dx = Math.abs(Number(medic.x) - Number(u.x));
              const dy = Math.abs(Number(medic.y) - Number(u.y));
              return (dx <= 1 && dy <= 1 && (dx + dy) > 0); // Adjacent (including diagonal)
            });

            if (adjacentMedic) {
              const newHp = Math.min(u.hp + 1, u.maxHp || maxHp);
              addLog(`⚕️ ${u.fullName || u.type} healed by medic (+1 HP)`);
              // Trigger heal animation
              triggerAnimation(u.id, 'heal');
              return { ...u, hp: newHp };
            }
          }

          return u;
        });

        // Reset actions for new turn
        return healedUnits.map(u => ({
          ...u,
          hasMoved: false,
          hasAttacked: false,
          hasMovedThisTurn: false
        }));
      });
    }, 1500);
  };

  const checkBattleEnd = () => {
    // Don't check if units haven't been initialized yet or battle already ended
    if (units.length === 0 || battleEndedRef.current) return;

    const playerAlive = units.filter(u => u.team === 'player' && u.hp > 0).length;
    const enemyAlive = units.filter(u => u.team === 'enemy' && u.hp > 0).length;

    // Check survival victory condition (e.g., Mission 8 - Mons)
    if (mission.specialVictory === 'survive_turns' && turn >= mission.turnsToSurvive && playerAlive > 0) {
      battleEndedRef.current = true;
      addLog(`🏆 Survived ${mission.turnsToSurvive} turns! Victory!`);
      setTimeout(() => {
        playSFX('victory');
      }, 500);
      setTimeout(() => {
        handleVictory();
      }, 500);
      return;
    }

    if (playerAlive === 0 && phase === 'player') {
      // Defeat - set ref immediately to prevent duplicate calls
      battleEndedRef.current = true;
      hapticDefeat();
      radioChatterManager.addChatter(ChatterType.DEFEAT, gameState?.faction || 'british');
      // Delay to let attack sound finish, then play defeat sound
      setTimeout(() => {
        playSFX('defeat');
      }, 500);
      setTimeout(() => {
        navigation.replace('Defeat', { missionId });
      }, 2500);
    } else if (enemyAlive === 0) {
      // Victory - set ref immediately to prevent duplicate calls
      battleEndedRef.current = true;
      hapticVictory();
      radioChatterManager.addChatter(ChatterType.VICTORY, gameState?.faction || 'british');
      // Track mission completion for achievements
      const unitsLost = mission.units.filter(u => u.team === 'player').length - playerAlive;
      achievementManager.checkEvent('mission_complete', {
        turns: turn,
        unitsLost,
        totalElimination: true,
      });
      // Delay to let attack sound finish, then play victory sound
      setTimeout(() => {
        playSFX('victory');
      }, 500);
      setTimeout(() => {
        handleVictory();
      }, 500);
    }
  };

  const handleVictory = async () => {
    // Create veterans from survivors
    const survivors = units.filter(u => u.team === 'player' && u.hp > 0);
    const fallen = units.filter(u => u.team === 'player' && u.hp <= 0);
    const newVeterans = survivors.map(s => createVeteran(s, `slot_${s.id}`));

    // Track fallen veterans for the War Diary
    const existingFallen = gameState?.fallenVeterans || [];
    const newFallenVeterans = fallen
      .filter(f => f.isVeteran || f.fullName) // Only track named/veteran units
      .map(f => ({
        name: f.fullName || f.name || 'Unknown Soldier',
        type: f.type,
        fallDate: mission.date || 'Unknown',
        fallLocation: mission.location || 'The Western Front',
        fallMission: mission.name,
        missionId: missionId,
        kills: f.kills || 0,
        rank: f.rank || 'Private',
      }));
    const updatedFallen = [...existingFallen, ...newFallenVeterans];

    // Get existing completed missions (avoid duplicates)
    const existingCompleted = gameState?.completedMissions || [];
    const updatedCompleted = existingCompleted.includes(missionId)
      ? existingCompleted
      : [...existingCompleted, missionId];

    // Merge new veterans with existing (replace by slot if same slot exists)
    const existingVeterans = gameState?.veterans || [];
    const mergedVeterans = [...existingVeterans];
    newVeterans.forEach(newVet => {
      const existingIndex = mergedVeterans.findIndex(v => v.slot === newVet.slot);
      if (existingIndex >= 0) {
        mergedVeterans[existingIndex] = newVet;
      } else {
        mergedVeterans.push(newVet);
      }
    });

    // Update game state - preserve all existing fields
    const updatedGameState = {
      completedMissions: [],
      veterans: [],
      researchedTech: [],
      resources: 100,
      difficulty: 'normal',
      fallenVeterans: [],
      ...gameState,
      completedMissions: updatedCompleted,
      veterans: mergedVeterans,
      fallenVeterans: updatedFallen,
    };

    console.log('Saving victory state:', JSON.stringify(updatedGameState, null, 2));
    await saveGame(updatedGameState);

    setTimeout(() => {
      navigation.replace('Victory', {
        missionId,
        survivors: survivors.length,
        totalUnits: mission.units.filter(u => u.team === 'player').length,
      });
    }, 1000);
  };

  const handleRetreat = () => {
    Alert.alert(
      'Retreat?',
      'Are you sure you want to retreat from this battle? Progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Retreat',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!mission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Mission not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top UI */}
      <View style={styles.topBar}>
        <View style={styles.turnInfo}>
          <Text style={styles.turnText}>Turn {turn}</Text>
          <Text style={styles.phaseText}>
            {phase === 'player' ? '🟦 Your Turn' : '🟥 Enemy Turn'}
          </Text>
        </View>

        <TouchableOpacity style={styles.retreatButton} onPress={handleRetreat}>
          <Text style={styles.retreatText}>Retreat</Text>
        </TouchableOpacity>
      </View>

      {/* Radio Chatter Display */}
      {currentChatter && (
        <View style={styles.chatterContainer}>
          <Text style={styles.chatterText}>📻 {currentChatter.text}</Text>
        </View>
      )}

      {/* Battle Grid */}
      <View style={styles.gridContainer}>
        {/* Weather Effects Overlay */}
        <WeatherEffects weather={mission?.weather || 'clear'} intensity={0.8} />

        <View style={styles.grid}>
          {Array.from({ length: GRID_SIZE }).map((_, y) => (
            <View key={y} style={styles.row}>
              {Array.from({ length: GRID_SIZE }).map((_, x) => {
                const terrainData = getTerrainAt(x, y);
                const unit = getUnitAt(x, y);
                const { isHighlighted, type } = getTileHighlight(x, y);

                return (
                  <GridTile
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    terrain={terrainData}
                    isHighlighted={isHighlighted}
                    highlightType={type}
                    onPress={handleTilePress}
                    tileSize={TILE_SIZE}
                  >
                    {unit && (
                      <UnitSprite
                        unit={unit}
                        isSelected={selected && selected.id === unit.id}
                        size={TILE_SIZE * 0.8}
                        animationState={unitAnimations[unit.id]}
                      />
                    )}
                  </GridTile>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Bottom UI */}
      <View style={styles.bottomUI}>
        {/* Unit Info */}
        <UnitInfoPanel unit={selected} />

        {/* Battle Log */}
        <View style={{ marginTop: SPACING.small }}>
          <BattleLog messages={log} maxMessages={5} />
        </View>

        {/* Action Buttons */}
        {phase === 'player' && (
          <View style={styles.actionButtons}>
            {/* Undo Button */}
            {canUndo && (
              <TouchableOpacity
                style={styles.undoButton}
                onPress={handleUndo}
              >
                <Text style={styles.undoText}>↩ Undo</Text>
              </TouchableOpacity>
            )}

            {/* End Turn Button */}
            <TouchableOpacity
              style={[styles.endTurnButton, canUndo && styles.endTurnButtonWithUndo]}
              onPress={handleEndTurn}
            >
              <Text style={styles.endTurnText}>End Turn →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.large,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  turnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.medium,
  },
  turnText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  phaseText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  retreatButton: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.small,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  retreatText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.danger,
    fontWeight: '600',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  grid: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
  },
  bottomUI: {
    padding: SPACING.medium,
    backgroundColor: COLORS.backgroundDark,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.small,
    marginTop: SPACING.small,
  },
  undoButton: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  undoText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  endTurnButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
  },
  endTurnButtonWithUndo: {
    flex: 1,
  },
  endTurnText: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  chatterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    marginHorizontal: SPACING.medium,
    borderRadius: RADIUS.small,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  chatterText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.small,
    fontStyle: 'italic',
  },
});

export default BattleScreen;
