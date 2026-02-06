# WWI Tactical Game Engine - Final Modules

## Module 1: progression.js
**Location:** `/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/progression.js`
**Size:** 9.6 KB

### Exported Functions
- **generateSoldier()** - Creates random soldier with name, hometown, and backstory
- **getRank(xp)** - Returns rank ('private', 'corporal', 'sergeant') based on XP
- **getRankInfo(rankId)** - Gets rank details (name, icon, XP threshold)
- **checkPromotion(currentXP, newXP)** - Detects rank promotions
- **initUnits(missionUnits, ...)** - Initializes units, matching veterans to slots
- **calculateXPGain(baseXP, isFlanking, isCriticalHit)** - Calculates XP awards
- **createVeteran(unit)** - Converts surviving unit to veteran for future missions
- **getAllRanks()** - Returns all ranks sorted by XP requirement
- **getXPProgress(currentXP)** - Returns XP progress toward next rank

### Exported Constants
- **RANKS** - Rank definitions (private, corporal, sergeant)
- **FIRST_NAMES** - Array of 16 historical soldier first names
- **LAST_NAMES** - Array of 16 historical soldier last names
- **HOMETOWNS** - Array of 12 war-era cities
- **BACKSTORIES** - Array of 12 soldier origin stories

### Key Features
- Extracted directly from phase7-complete.jsx
- Full JSDoc documentation
- Veteran matching system (exact templateId + type fallback)
- Difficulty-aware enemy initialization
- Faction bonus integration
- Promotion tracking with callback support

---

## Module 2: storage.js
**Location:** `/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/storage.js`
**Size:** 7.8 KB

### Exported Functions
- **saveGame(gameState)** - Save complete game state to AsyncStorage
- **loadGame()** - Load game state from AsyncStorage
- **clearSave()** - Delete save data
- **getSaveInfo()** - Get save metadata (timestamps, counts)
- **getSaveMetadata()** - Alias for getSaveInfo()
- **hasSave()** - Check if save file exists
- **exportSave()** - Export game state as JSON string
- **importSave(jsonData)** - Import game state from JSON string
- **saveSettings(settings)** - Save game settings separately
- **loadSettings()** - Load game settings
- **clearAllData()** - Delete all game data (saves + settings)
- **getStorageInfo()** - Get storage usage statistics

### Storage Keys
- `ww1-tactical-save` - Main game state
- `ww1-tactical-save-info` - Save metadata
- `ww1-tactical-settings` - Game settings

### Key Features
- Async/await pattern for React Native compatibility
- Error handling and validation
- Metadata tracking (save count, veteran count, etc.)
- Backup/restore via JSON import/export
- Settings management separate from game state
- Storage usage monitoring
- Timestamps for all saves

---

## Integration Guide

### In Your Game Component
```javascript
import * as progression from './progression';
import * as storage from './storage';

// Generate a new soldier
const newSoldier = progression.generateSoldier();

// Initialize mission units with veterans
const units = progression.initUnits(
  missionUnits,
  veterans,
  UNIT_TYPES,
  commanderPerks,
  factionConfig,
  difficulty,
  DIFFICULTY_SETTINGS
);

// Calculate rank from XP
const rank = progression.getRank(unit.xp);

// Save game
const result = await storage.saveGame({
  units: currentUnits,
  veterans: veteranList,
  completed: completedMissions,
  requisitions: points
});

// Load game
const { success, gameState } = await storage.loadGame();
```

### Progression Flow
1. **New Unit**: `generateSoldier()` creates random identity
2. **Battle**: Unit earns XP via `calculateXPGain()`
3. **Rank Check**: `checkPromotion()` detects level-ups
4. **Mission End**: `createVeteran()` saves survivors
5. **Next Mission**: `initUnits()` re-assigns veterans to slots

### Save Flow
1. **During Play**: Auto-save with `saveGame()`
2. **Metadata**: `getSaveInfo()` for menu display
3. **Export**: `exportSave()` for backup
4. **Import**: `importSave(jsonData)` to restore
5. **Storage**: `getStorageInfo()` for debug/analytics

---

## Data Structures

### Soldier Object (from generateSoldier)
```javascript
{
  fullName: string,
  hometown: string,
  backstory: string
}
```

### Unit Object (from initUnits)
```javascript
{
  id: string,
  type: string,
  team: 'player' | 'enemy',
  hp: number,
  maxHp: number,
  xp: number,
  kills: number,
  rank: 'private' | 'corporal' | 'sergeant',
  fullName: string,
  hometown: string,
  backstory: string,
  veteranId: string (optional),
  templateId: string,
  // ... other unit properties
}
```

### Veteran Object (from createVeteran)
```javascript
{
  id: string,
  type: string,
  name: string,
  fullName: string,
  hometown: string,
  backstory: string,
  xp: number,
  kills: number,
  rank: string,
  bonusHP: number,
  bonusAttack: number,
  bonusDefense: number,
  bonusRange: number,
  templateId: string,
  missions: number,
  lastMissionId: string
}
```

### Save Data (in AsyncStorage)
```javascript
{
  version: 1,
  timestamp: string,
  gameState: {
    units: [],
    veterans: [],
    completed: [],
    requisitions: number,
    // ... all game state
  }
}
```

### Save Info Metadata
```javascript
{
  lastSaved: string,
  saveCount: number,
  missionCount: number,
  veteranCount: number,
  requisitionPoints: number
}
```

---

## Error Handling

Both modules return consistent result objects:
```javascript
{
  success: boolean,
  error?: string,
  data?: any,
  timestamp?: string
}
```

Always check `success` before using returned data.

---

## Future Enhancements
- Cloud save synchronization
- Save encryption
- Multiple save slots
- Veteran retirement/transfer
- Leaderboard integration
- Achievement tracking
