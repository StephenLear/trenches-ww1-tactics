
# Phase 3: Audio Integration Examples

This guide shows exactly how to integrate audio into your screens using the AudioManager.

---

## 🎯 Quick Start

### 1. Initialize Audio in App.js

```javascript
// App.js
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeAudio } from './src/audio/AudioManager';

const App = () => {
  useEffect(() => {
    // Initialize audio system on app start
    initializeAudio();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <AppNavigator />
    </>
  );
};

export default App;
```

---

## 🎮 Battle Screen Audio

### Complete BattleScreen Integration

Add these imports and calls to `src/screens/BattleScreen.js`:

```javascript
// At top of file, add audio imports
import { playSFX, playMusic, stopMusic } from '../audio/AudioManager';

// In BattleScreen component:
const BattleScreen = ({ route, navigation }) => {
  // ... existing state ...

  useEffect(() => {
    initializeBattle();

    // Start battle music
    playMusic('battle', true);

    // Cleanup: stop music when leaving battle
    return () => {
      stopMusic();
    };
  }, []);

  // When unit is selected
  const handleUnitSelect = (unit) => {
    playSFX('unit_select'); // ← Add this

    if (unit.hasMoved && unit.hasAttacked) {
      playSFX('ui_error'); // ← Add this
      addLog(`${unit.name || unit.type} has already acted this turn`);
      return;
    }

    setSelected(unit);
    // ... rest of code ...
  };

  // When unit moves
  const handleMove = (unit, newX, newY) => {
    playSFX('unit_move'); // ← Add this

    setUnits(prevUnits =>
      prevUnits.map(u =>
        u.id === unit.id
          ? { ...u, x: newX, y: newY, hasMoved: true, hasMovedThisTurn: true }
          : u
      )
    );
    // ... rest of code ...
  };

  // When attacking
  const handleAttack = (attacker, defender) => {
    // Play attack sound based on unit type
    if (attacker.type === 'artillery') {
      playSFX('attack_artillery');
    } else if (attacker.type === 'cavalry') {
      playSFX('attack_melee');
    } else {
      playSFX('attack_rifle');
    }

    const result = executeAttack(/* ... */);

    if (result.success) {
      playSFX('hit_impact'); // ← Add this

      if (result.defenderEliminated) {
        playSFX('unit_death'); // ← Add this
      }

      if (result.attackerXPGain > 0) {
        playSFX('xp_gain', 0.5); // ← Add this (quieter)
      }

      setUnits(result.updatedUnits);
      // ... rest of code ...
    }
  };

  // When ending turn
  const handleEndTurn = () => {
    playSFX('turn_end'); // ← Add this

    if (phase === 'player') {
      // ... reset units ...
      setPhase('enemy');
      addLog('Enemy phase...');

      setTimeout(() => {
        executeEnemyTurn();
      }, 1000);
    }
  };

  // When victory
  const handleVictory = async () => {
    playSFX('mission_complete'); // ← Add this
    stopMusic(); // ← Add this

    // ... create veterans ...
    setTimeout(() => {
      navigation.replace('Victory', {/* ... */});
    }, 1000);
  };

  // ... rest of component ...
};
```

---

## 🏠 Menu Screen Audio

Add to `src/screens/MenuScreen.js`:

```javascript
import { playMusic, playSFX } from '../audio/AudioManager';

const MenuScreen = ({ navigation }) => {
  useEffect(() => {
    loadGameState();

    // Play menu music when arriving
    playMusic('menu', true);
  }, []);

  const handleMissionSelect = (missionId) => {
    playSFX('ui_select'); // ← Add this
    navigation.navigate('Briefing', {
      missionId,
      mode: 'campaign',
    });
  };

  const handleCommandHQ = () => {
    playSFX('ui_click'); // ← Add this
    navigation.navigate('CommandHQ', {
      gameState,
    });
  };

  const handleSkirmish = () => {
    playSFX('ui_click'); // ← Add this
    navigation.navigate('Skirmish');
  };

  // ... rest of component ...
};
```

---

## 📋 Briefing Screen Audio

Add to `src/screens/BriefingScreen.js`:

```javascript
import { playSFX } from '../audio/AudioManager';

const BriefingScreen = ({ route, navigation }) => {
  const handleBeginBattle = () => {
    playSFX('mission_start'); // ← Add this

    // Small delay so sound plays before transition
    setTimeout(() => {
      navigation.navigate('Battle', {
        missionId,
        mode,
      });
    }, 300);
  };

  // ... rest of component ...
};
```

---

## 🎖️ Victory Screen Audio

Add to `src/screens/VictoryScreen.js`:

```javascript
import { playMusic, playSFX } from '../audio/AudioManager';

const VictoryScreen = ({ route, navigation }) => {
  useEffect(() => {
    // Play victory music
    playMusic('victory', false); // Don't loop
  }, []);

  const handleNextMission = () => {
    playSFX('ui_click'); // ← Add this

    const nextMissionId = missionId + 1;
    if (MISSIONS[nextMissionId]) {
      navigation.replace('Briefing', {
        missionId: nextMissionId,
        mode: 'campaign',
      });
    }
  };

  // ... rest of component ...
};
```

---

## 💀 Defeat Screen Audio

Add to `src/screens/DefeatScreen.js`:

```javascript
import { playMusic, playSFX } from '../audio/AudioManager';

const DefeatScreen = ({ route, navigation }) => {
  useEffect(() => {
    // Play defeat music
    playMusic('defeat', false); // Don't loop
  }, []);

  const handleRetry = () => {
    playSFX('ui_click'); // ← Add this
    navigation.replace('Battle', {
      missionId,
      mode: 'campaign',
    });
  };

  // ... rest of component ...
};
```

---

## 🎖️ Command HQ Audio

Add to `src/screens/CommandHQScreen.js`:

```javascript
import { playMusic, playSFX } from '../audio/AudioManager';

const CommandHQScreen = ({ route, navigation }) => {
  useEffect(() => {
    loadGameState();

    // Play strategic planning music
    playMusic('command_hq', true);
  }, []);

  // When switching tabs
  const handleTabChange = (newTab) => {
    playSFX('ui_select', 0.3); // ← Add this (quieter)
    setSelectedTab(newTab);
  };

  // ... rest of component ...
};
```

---

## 🎵 Audio Lifecycle Best Practices

### Rule 1: Start Music on Screen Enter

```javascript
useEffect(() => {
  playMusic('menu', true); // Start looping

  // Cleanup: stop when leaving
  return () => {
    stopMusic();
  };
}, []);
```

### Rule 2: Stop Music on Screen Exit

Always clean up in useEffect return function:

```javascript
useEffect(() => {
  playMusic('battle', true);

  return () => {
    stopMusic(); // ← IMPORTANT!
  };
}, []);
```

### Rule 3: Play SFX on User Actions

```javascript
// On button press
<TouchableOpacity onPress={() => {
  playSFX('ui_click');
  handleAction();
}}>

// On unit selection
const handleSelect = (unit) => {
  playSFX('unit_select');
  // ... rest of logic ...
};
```

### Rule 4: Volume Multipliers for Layered Sounds

```javascript
// Main action sound - full volume
playSFX('attack_rifle', 1.0);

// Secondary effect - quieter
playSFX('xp_gain', 0.5);

// Subtle feedback - very quiet
playSFX('ui_select', 0.3);
```

---

## 🎯 Sound Effect Mapping

Use these sound names based on action type:

### UI Interactions
```javascript
playSFX('ui_click');    // Button press
playSFX('ui_select');   // Highlight/hover equivalent
playSFX('ui_back');     // Back/cancel
playSFX('ui_error');    // Invalid action
```

### Unit Actions
```javascript
playSFX('unit_select'); // Select unit
playSFX('unit_move');   // Move unit
```

### Combat
```javascript
// Based on attacker type
if (attacker.type === 'artillery') {
  playSFX('attack_artillery');
} else if (attacker.type === 'cavalry') {
  playSFX('attack_melee');
} else {
  playSFX('attack_rifle');
}

playSFX('hit_impact');  // When hit lands
playSFX('unit_death');  // When unit eliminated
```

### Abilities
```javascript
playSFX('ability_heal');    // Medic heal
playSFX('ability_charge');  // Cavalry charge
playSFX('ability_barrage'); // Artillery barrage
```

### Mission Events
```javascript
playSFX('mission_start');    // Battle begins
playSFX('mission_complete'); // Victory
playSFX('mission_failed');   // Defeat
playSFX('turn_start');       // Turn begins
playSFX('turn_end');         // Turn ends
```

### Progression
```javascript
playSFX('xp_gain', 0.5);      // XP earned (quieter)
playSFX('rank_up');           // Rank promotion
playSFX('veteran_recruit');   // Recruit veteran
```

---

## 🎼 Music Track Usage

```javascript
// Menu/HQ
playMusic('menu', true);       // Main menu
playMusic('command_hq', true); // Command HQ

// Gameplay
playMusic('battle', true);     // During battle

// Results
playMusic('victory', false);   // Victory (play once)
playMusic('defeat', false);    // Defeat (play once)
```

---

## 🔇 Testing Without Audio Files

If you don't have audio files yet, the AudioManager will:
- Log warnings to console
- Continue running (won't crash)
- Return immediately (no playback)

This means you can integrate audio calls NOW and add files LATER!

```javascript
// This is safe even if files don't exist
playSFX('ui_click'); // Just logs warning, doesn't crash
```

---

## 🎛️ Settings Integration

Users can control audio in the Settings screen:

```javascript
// Settings are automatically saved
// No code needed in other screens!

// AudioManager checks settings before playing:
if (settings.sfxEnabled) {
  playSFX('ui_click');
}

// Volume is applied automatically:
playSFX('attack_rifle'); // Uses sfxVolume from settings
playMusic('battle');     // Uses musicVolume from settings
```

---

## 🐛 Troubleshooting

### Sound doesn't play

**Check:**
1. Audio files exist at correct paths
2. Filenames match AudioManager.js exactly
3. Settings screen has SFX enabled
4. Device is not in silent mode

**Test:**
```javascript
// Add to any screen for testing
import { playSFX } from '../audio/AudioManager';

useEffect(() => {
  playSFX('ui_click');
  console.log('Audio test - check console for errors');
}, []);
```

### Music overlaps

**Solution:** Always stop music before starting new track

```javascript
// Wrong:
playMusic('menu');
playMusic('battle'); // Both playing!

// Correct:
stopMusic(); // Stop current
playMusic('battle'); // Start new
```

Or use the built-in behavior:
```javascript
// AudioManager automatically stops previous track
playMusic('battle'); // Stops any playing music first
```

### Volume too loud/quiet

**Option 1:** Adjust in Settings screen (user control)

**Option 2:** Use volume multiplier in code
```javascript
playSFX('ui_click', 0.5); // 50% volume
playSFX('explosion', 1.5); // 150% volume (careful!)
```

**Option 3:** Normalize files in Audacity (best solution)

---

## ✅ Integration Checklist

- [ ] Add `initializeAudio()` to App.js
- [ ] Add music to MenuScreen
- [ ] Add music to BattleScreen
- [ ] Add SFX to unit selection
- [ ] Add SFX to unit movement
- [ ] Add SFX to attacks
- [ ] Add SFX to victory/defeat
- [ ] Add music to VictoryScreen
- [ ] Add music to DefeatScreen
- [ ] Add cleanup (`stopMusic`) to all screens
- [ ] Test Settings screen volume controls
- [ ] Test audio toggles
- [ ] Add audio files (or test without)

---

## 📊 Expected Results

After integration:
- ✅ Music plays on each screen
- ✅ Music changes between screens
- ✅ Sound effects play on actions
- ✅ Settings control volume
- ✅ Toggles mute audio
- ✅ No crashes if files missing

**Time to integrate:** 30-60 minutes

---

**Ready to add sound to your game!** 🎵
