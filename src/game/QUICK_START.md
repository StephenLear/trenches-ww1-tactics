# Quick Start Guide - progression.js & storage.js

## Import Both Modules

```javascript
import * as progression from './progression';
import * as storage from './storage';
```

## Most Common Operations

### 1. Generate a New Soldier
```javascript
const soldier = progression.generateSoldier();
// { fullName: "James Smith", hometown: "London", backstory: "A factory worker..." }
```

### 2. Initialize Units for a Mission
```javascript
const units = progression.initUnits(
  missionTemplate,    // Array of unit slot templates
  veterans,           // Array of veteran soldiers
  UNIT_TYPES,         // From constants.js
  commanderPerks,     // Array of active perks
  factionConfig,      // Faction configuration
  'normal',           // Difficulty level
  DIFFICULTY_SETTINGS // From constants.js
);
```

### 3. Get Soldier Rank from XP
```javascript
const rank = progression.getRank(unit.xp);
// Returns: 'private' (0-99 XP), 'corporal' (100-249 XP), 'sergeant' (250+ XP)
```

### 4. Calculate XP from a Battle Action
```javascript
const xpGain = progression.calculateXPGain(
  10,    // base XP for action
  true,  // was flanking? (+15)
  false  // was critical hit? (+10)
);
// Returns: 25 total XP
```

### 5. Save Game State
```javascript
const result = await storage.saveGame({
  units: currentUnits,
  veterans: veteranList,
  completed: missionsCompleted,
  requisitions: pointsAvailable,
  fallen: defeatedSoldiers
});

if (result.success) {
  console.log('Saved at:', result.timestamp);
}
```

### 6. Load Game State
```javascript
const result = await storage.loadGame();

if (result.success) {
  restoreGameState(result.gameState);
  console.log('Loaded from:', result.timestamp);
} else {
  console.log('No save found:', result.error);
}
```

### 7. Convert Survivor to Veteran
```javascript
const veteran = progression.createVeteran(survivingUnit);
veteranRoster.push(veteran);
// Veteran is now available for future missions
```

### 8. Check for Rank Promotion
```javascript
const promotion = progression.checkPromotion(oldXP, newXP);

if (promotion) {
  showPromotionAnimation(
    unit.name,
    promotion.oldRank,
    promotion.newRank
  );
}
```

### 9. Get Save Information for Menu
```javascript
const saveInfo = await storage.getSaveInfo();

if (saveInfo) {
  console.log('Last saved:', saveInfo.lastSaved);
  console.log('Missions:', saveInfo.missionCount);
  console.log('Veterans:', saveInfo.veteranCount);
}
```

### 10. Save Game Settings
```javascript
await storage.saveSettings({
  difficulty: 'hard',
  soundEnabled: true,
  language: 'en'
});
```

## API Quick Reference

### progression.js
| Function | Input | Output |
|----------|-------|--------|
| `generateSoldier()` | none | `{ fullName, hometown, backstory }` |
| `getRank(xp)` | `number` | `'private' \| 'corporal' \| 'sergeant'` |
| `getRankInfo(rankId)` | `string` | `{ name, xpNeeded, icon }` |
| `checkPromotion(old, new)` | `number, number` | `null \| { oldRank, newRank }` |
| `initUnits(...)` | 7 params | `array of initialized units` |
| `calculateXPGain(base, flank, crit)` | `number, bool, bool` | `number` |
| `createVeteran(unit)` | `unit object` | `veteran object` |
| `getAllRanks()` | none | `array of rank objects` |
| `getXPProgress(xp)` | `number` | `{ currentRank, nextRank, xpToNextRank, isMaxRank }` |

### storage.js
| Function | Input | Output (Promise) |
|----------|-------|------------------|
| `saveGame(state)` | `object` | `{ success, timestamp?, error? }` |
| `loadGame()` | none | `{ success, gameState?, error? }` |
| `clearSave()` | none | `{ success, error? }` |
| `getSaveInfo()` | none | `{ lastSaved, saveCount, missionCount, veteranCount, requisitionPoints }` |
| `hasSave()` | none | `boolean` |
| `exportSave()` | none | `JSON string or null` |
| `importSave(json)` | `string` | `{ success, error? }` |
| `saveSettings(settings)` | `object` | `{ success, error? }` |
| `loadSettings()` | none | `{ success, settings?, error? }` |
| `getStorageInfo()` | none | `{ success, keysCount, approximateSizeKB, keys }` |

## Rank System

```
Private  (0-99 XP)     → '' icon
  ↓
Corporal (100-249 XP)  → '⚊' icon
  ↓
Sergeant (250+ XP)     → '⚌' icon
```

## Error Handling Pattern

```javascript
const result = await storage.loadGame();

// Always check success first
if (result.success) {
  // Use the result
  const { gameState, timestamp } = result;
} else {
  // Handle error
  console.error('Load failed:', result.error);
}
```

## Common Integration Points

### Mission Start
```javascript
function startMission(missionId) {
  const missionData = MISSIONS[missionId];
  
  // Initialize player units
  const playerUnits = progression.initUnits(
    missionData.playerUnits,
    gameState.veterans,
    UNIT_TYPES,
    gameState.commanderPerks,
    factionConfig,
    gameState.difficulty,
    DIFFICULTY_SETTINGS
  );
  
  // Initialize enemy units
  const enemyUnits = progression.initUnits(
    missionData.enemyUnits,
    [],
    UNIT_TYPES,
    [],
    factionConfig,
    gameState.difficulty,
    DIFFICULTY_SETTINGS
  );
  
  setUnits([...playerUnits, ...enemyUnits]);
}
```

### Combat Resolution
```javascript
function onUnitKill(attacker, defender) {
  // Award XP
  const xpGain = progression.calculateXPGain(
    baseDamage,
    isFlanking,
    wasCritical
  );
  attacker.xp += xpGain;
  
  // Check promotion
  const promotion = progression.checkPromotion(
    attacker.xp - xpGain,
    attacker.xp
  );
  if (promotion) {
    showPromotionScreen(attacker, promotion);
  }
}
```

### Mission Complete
```javascript
async function completeMission(survivors) {
  // Convert survivors to veterans
  const newVeterans = survivors
    .filter(u => u.team === 'player')
    .map(u => progression.createVeteran(u));
  
  // Update game state
  gameState.veterans = [...gameState.veterans, ...newVeterans];
  gameState.completed = [...gameState.completed, missionId];
  
  // Save game
  const saveResult = await storage.saveGame(gameState);
  if (saveResult.success) {
    console.log('Progress saved');
  }
}
```

### Game Initialization
```javascript
async function initializeGame() {
  // Check for existing save
  const hasSave = await storage.hasSave();
  
  if (hasSave) {
    // Load existing game
    const result = await storage.loadGame();
    if (result.success) {
      restoreGameState(result.gameState);
    }
  } else {
    // Start new game
    const soldiers = [
      progression.generateSoldier(),
      progression.generateSoldier(),
      progression.generateSoldier()
    ];
    startNewGame(soldiers);
  }
}
```

## Data Flow Diagram

```
New Mission
    ↓
initUnits() → Load veterans from storage
    ↓
Display units with ranks (getRank)
    ↓
Battle → calculateXPGain() for kills
    ↓
Update unit.xp
    ↓
checkPromotion() → Show promotion screen
    ↓
Mission Complete
    ↓
createVeteran() for survivors
    ↓
saveGame() → AsyncStorage
```

## Pro Tips

1. **Always await storage functions** - They're async!
2. **Check success property** - Never assume operations succeeded
3. **Cache veteran roster** - Don't reload from storage every time
4. **Use hasSave()** - Before calling loadGame() in menus
5. **Export saves** - Use exportSave() for player backups
6. **Monitor storage** - Call getStorageInfo() to watch size growth
7. **Clear old saves** - Implement save rotation if needed
8. **Test with bad data** - Verify error handling works

## File Locations

- **Module Code**: `/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/progression.js`
- **Module Code**: `/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/storage.js`
- **Full API Docs**: `MODULE_SUMMARY.md`
- **Examples & Tests**: `MODULES_TEST.md`
- **Integration Guide**: `FILES_CREATED.txt`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Veterans not showing up | Check `veteran.type` matches mission slot `type` |
| Save fails silently | Check `result.success` and `result.error` |
| Rank not calculating | Verify XP is numeric (not string) |
| AsyncStorage error | Ensure module is properly linked in package.json |
| Storage full | Call `getStorageInfo()` and implement save rotation |

---

**Ready to integrate?** Start with importing both modules and call `progression.generateSoldier()` and `storage.hasSave()` to verify they work!
