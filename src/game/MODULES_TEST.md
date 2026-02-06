# Module Testing & Usage Guide

## Quick Validation

### progression.js Example Usage
```javascript
import * as progression from './progression';

// 1. Generate a new soldier
const soldier = progression.generateSoldier();
console.log(soldier);
// Output: { fullName: "James Smith", hometown: "London", backstory: "A factory worker before the war." }

// 2. Initialize units for a mission
const missionTemplate = [
  { id: 'slot-1', type: 'infantry', team: 'player' },
  { id: 'slot-2', type: 'officer', team: 'player' },
  { id: 'enemy-1', type: 'infantry', team: 'enemy' }
];

const veterans = [
  { id: 'vet-1', type: 'infantry', xp: 150, kills: 5, rank: 'corporal', ... }
];

const units = progression.initUnits(
  missionTemplate,
  veterans,
  UNIT_TYPES,           // from constants.js
  ['veteran_corps'],    // commander perks
  factionConfig,        // faction bonuses
  'normal',             // difficulty
  DIFFICULTY_SETTINGS   // from constants.js
);

// 3. Check soldier rank
console.log(progression.getRank(75));    // 'private'
console.log(progression.getRank(120));   // 'corporal'
console.log(progression.getRank(300));   // 'sergeant'

// 4. Calculate XP from battle
const xpGain = progression.calculateXPGain(
  10,                   // base XP
  true,                 // flanking bonus
  false                 // no critical hit
);
console.log(xpGain);    // 25 (10 + 15 flanking)

// 5. Check for promotion
const promotion = progression.checkPromotion(95, 115);
console.log(promotion); // { oldRank: 'private', newRank: 'corporal' }

// 6. Convert survivor to veteran
const veteran = progression.createVeteran(unitAfterBattle);
// Veteran now eligible for next mission
```

### storage.js Example Usage
```javascript
import * as storage from './storage';

// 1. Auto-save during gameplay
const gameState = {
  units: currentUnits,
  veterans: veteranRoster,
  completed: [1, 3, 5],
  requisitions: 120,
  fallen: [],
  // ... all game state
};

const saveResult = await storage.saveGame(gameState);
if (saveResult.success) {
  console.log('Game saved at:', saveResult.timestamp);
}

// 2. Load on app start
const loadResult = await storage.loadGame();
if (loadResult.success) {
  restoreGameState(loadResult.gameState);
} else {
  startNewGame();
}

// 3. Get save information for menu
const saveInfo = await storage.getSaveInfo();
console.log(`Last saved: ${saveInfo.lastSaved}`);
console.log(`Missions completed: ${saveInfo.missionCount}`);
console.log(`Veterans in roster: ${saveInfo.veteranCount}`);

// 4. Export save for backup
const jsonBackup = await storage.exportSave();
// Save jsonBackup to email, cloud, or file

// 5. Import from backup
const importResult = await storage.importSave(jsonBackup);
if (importResult.success) {
  console.log('Save restored from backup');
}

// 6. Save settings separately
await storage.saveSettings({
  difficulty: 'hard',
  soundEnabled: true,
  particleEffects: true,
  language: 'en'
});

// 7. Check storage usage
const storageInfo = await storage.getStorageInfo();
console.log(`Used: ${storageInfo.approximateSizeKB} KB`);

// 8. Clear data on reset
await storage.clearAllData();
```

## Testing Checklist

### progression.js Tests
- [ ] `generateSoldier()` returns unique names on each call
- [ ] `getRank()` correctly maps XP thresholds
- [ ] `initUnits()` matches veterans before creating new soldiers
- [ ] `initUnits()` applies faction bonuses correctly
- [ ] `initUnits()` applies difficulty modifiers to enemies
- [ ] `checkPromotion()` detects rank ups accurately
- [ ] `createVeteran()` preserves all unit stats
- [ ] `getXPProgress()` calculates remaining XP correctly

### storage.js Tests
- [ ] `saveGame()` returns success on valid state
- [ ] `loadGame()` retrieves identical state after save
- [ ] `getSaveInfo()` shows correct metadata
- [ ] `hasSave()` detects existing saves
- [ ] `exportSave()` produces valid JSON
- [ ] `importSave()` restores from exported JSON
- [ ] `saveSettings()` and `loadSettings()` work independently
- [ ] `getStorageInfo()` returns accurate usage stats
- [ ] Error handling works for corrupted data
- [ ] AsyncStorage mock works in tests

## Integration Points with Existing Modules

### With constants.js
- Uses `UNIT_TYPES` from constants
- Uses `DIFFICULTY_SETTINGS` from constants
- Exports compatible rank/soldier definitions

### With combat.js
- Provides `calculateXPGain()` for battle rewards
- Provides `checkPromotion()` for rank-up notifications

### With missions.js
- Integrates `initUnits()` for mission setup
- Integrates `createVeteran()` for survivor tracking

### With movement.js
- Units from `initUnits()` have all required properties
- Rank affects unit behavior (if implemented)

## Performance Notes

### progression.js
- `generateSoldier()`: O(1) - random array access
- `getRank()`: O(1) - simple XP comparison
- `initUnits()`: O(n²) worst case - veteran matching
  - Can optimize with Map if needed
- `createVeteran()`: O(1) - object spread

### storage.js
- `saveGame()`: Depends on AsyncStorage implementation
  - Typically 10-100ms for kilobyte-sized saves
- `loadGame()`: Similar to saveGame
- All functions are async - never block UI thread
- Consider debouncing saves in frequent update scenarios

## Debugging Tips

### progression.js
```javascript
// Verify soldier generation
for (let i = 0; i < 5; i++) {
  console.log(progression.generateSoldier());
}

// Test unit initialization with minimal config
const testUnits = progression.initUnits(
  [{ id: 'test', type: 'infantry', team: 'player' }],
  [],
  { infantry: { hp: 3, abilities: [] } },
  []
);
```

### storage.js
```javascript
// Check if save exists
const exists = await storage.hasSave();
console.log('Save exists:', exists);

// Get raw storage info
const info = await storage.getStorageInfo();
console.log('Stored keys:', info.keys);

// Validate save integrity
const result = await storage.loadGame();
console.log('Load success:', result.success);
if (!result.success) console.log('Error:', result.error);
```

## Common Issues & Solutions

### Issue: Veterans not appearing in next mission
- Check that `veteran.type` matches mission slot `type`
- Verify `initUnits()` is called with correct veterans array
- Ensure `veteran.id` is unique

### Issue: Save file corrupted
- Call `clearSave()` to reset
- Check AsyncStorage permissions
- Verify `gameState` doesn't contain circular references

### Issue: Rank calculations wrong
- Verify XP values (100 for Corporal, 250 for Sergeant)
- Check `getRank()` is called with numeric XP
- Confirm rank progression in `getAllRanks()`

### Issue: Storage full error
- Call `getStorageInfo()` to check usage
- Implement save rotation (keep last 3 saves)
- Archive old saves to cloud
