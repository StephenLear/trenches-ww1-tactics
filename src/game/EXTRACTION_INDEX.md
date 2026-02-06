# WW1 Game Engine - Extraction Index

## Overview
Complete modular extraction of the WW1 Tactical Game from React/JSX into platform-agnostic ES6 modules.

**Source:** `/sessions/peaceful-intelligent-edison/mnt/WW1 game/wwi-tactical-game-phase7-complete.jsx`
**Target:** `/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/`

---

## Modules Created

### 1. **constants.js** (22 KB, ~600+ lines)
Core game data and configuration.

**Exports:**
- `GRID_SIZE`
- `WEATHER_TYPES` - Weather system with visibility/modifier effects
- `TERRAIN_TYPES` - All terrain types with bonuses/costs
- `UNIT_TYPES` - Unit stats and properties for all unit types
- `COMMANDER_PERKS` - Commander ability tree
- `ABILITIES` - Unit special abilities (rally, dig in, charge, etc.)
- `TECH_TREE` - Technology research tree with unit-specific bonuses
- `DIFFICULTY_LEVELS` - Game difficulty settings
- `MEDALS` - Achievement/medal system
- `FACTIONS` - Faction-specific bonuses and units

**Status:** ✅ Complete

---

### 2. **combat.js** (15 KB, 438 lines) - **NEW**
Combat system and damage resolution.

**Exports:**
1. `getDist(x1, y1, x2, y2)` - Manhattan distance
2. `getChebyshevDist(x1, y1, x2, y2)` - Chebyshev distance
3. `getTechBonuses(unit, researchedTech)` - Technology bonuses calculation
4. `executeAttack(attacker, defender, options)` - Main combat function
5. `calculateAttackModifier(...)` - Attack bonus helper
6. `calculateDefense(...)` - Defense calculation helper
7. `canAttackTarget(...)` - Range validation helper

**Features:**
- ✅ Manhattan & Chebyshev distance calculations
- ✅ Full technology bonus system
- ✅ Comprehensive combat resolution with all bonuses
- ✅ Critical hit mechanics
- ✅ Armor system
- ✅ Experience gains
- ✅ Faction-specific bonuses
- ✅ Status effect interactions
- ✅ Detailed damage breakdown
- ✅ JSDoc documentation for all functions

**Status:** ✅ Complete

---

### 3. **missions.js** (30 KB, ~800+ lines)
Campaign missions and level data.

**Exports:**
- `MISSIONS` - Campaign mission definitions
- Mission objectives, enemy waves, terrain generation
- Victory/defeat conditions
- Rewards and progression

**Status:** ✅ Complete

---

## Extraction Details

### Combat Functions Extracted
| Function | Location | Type | Status |
|----------|----------|------|--------|
| `getDist` | Line 1579 | Utility | ✅ Extracted |
| `getChebyshevDist` | Line 1580 | Utility | ✅ Extracted |
| `executeAttack` | Lines 1695-1816 | Core | ✅ Extracted |
| `getTechBonuses` | Lines 2292-2335 | Core | ✅ Extracted |
| Helper functions | N/A | New | ✅ Created |

### Architecture Changes
- ✅ Removed React/JSX dependencies
- ✅ Converted to pure ES6 modules
- ✅ Added proper TypeScript-style JSDoc
- ✅ Extracted dependencies to parameters (callbacks for UI logic)
- ✅ Modularized bonus calculations
- ✅ Added helper functions for cleaner code

---

## Module Dependencies

```
combat.js
  ├─ imports: { UNIT_TYPES, TERRAIN_TYPES, WEATHER_TYPES, TECH_TREE }
  └─ from: constants.js

constants.js
  └─ no external dependencies (platform-agnostic data)

missions.js
  ├─ imports: { UNIT_TYPES, TERRAIN_TYPES, WEATHER_TYPES }
  └─ from: constants.js
```

---

## Usage Example

```javascript
// Import combat functions
import {
  executeAttack,
  getTechBonuses,
  canAttackTarget,
  getChebyshevDist
} from './combat.js';

// Get unit bonuses
const bonuses = getTechBonuses(unit, researchedTechs);

// Check if attack possible
if (canAttackTarget(attacker, target, range, minRange, {
  currentWeather,
  visibleEnemies,
  smokeZones
})) {
  // Execute attack
  const result = executeAttack(attacker, defender, {
    units,
    terrain,
    selectedFaction,
    researchedTech,
    checkFlanking: (att, def) => { /* ... */ },
    getTerrainInfo: (x, y) => { /* ... */ },
    currentWeather
  });

  console.log(result.logMessage);
  // Output: "Infantry dealt 15 dmg (flank)"
}
```

---

## Documentation Files

### combat.js Documentation
1. **COMBAT_EXTRACTION_SUMMARY.md** (355 lines)
   - Complete function documentation
   - Parameter descriptions
   - Return value specifications
   - Bonus calculation tables
   - Integration notes
   - Testing recommendations

2. **COMBAT_QUICK_REFERENCE.md** (354 lines)
   - Function quick guide
   - Import statements
   - Common patterns
   - Bonus source tables
   - Experience system
   - Debugging tips

### constants.js Documentation
- CONSTANTS_EXTRACTION_SUMMARY.txt

### missions.js Documentation
- MISSIONS_SUMMARY.txt

---

## Next Steps

### For React Native Implementation
1. Import `combat.js` functions into game engine
2. Implement callback functions for `checkFlanking` and `getTerrainInfo`
3. Use `getTechBonuses` for unit stat calculation
4. Use `executeAttack` for combat resolution
5. Validate with test suite

### For Unit Testing
```javascript
import { getDist, getChebyshevDist, getTechBonuses } from './combat.js';

// Test distance calculations
test('getDist calculates Manhattan distance', () => {
  expect(getDist(0, 0, 3, 4)).toBe(7);
});

// Test tech bonuses
test('getTechBonuses accumulates bonuses', () => {
  const bonuses = getTechBonuses(unit, ['tech1', 'tech2']);
  expect(bonuses.attack).toBeGreaterThan(0);
});
```

### For Game Integration
- [ ] Integrate combat.js into game engine
- [ ] Implement flanking detection logic
- [ ] Connect to terrain system
- [ ] Add visual feedback for combat
- [ ] Test with different factions
- [ ] Validate experience progression

---

## File Structure

```
WW1-RN-Engine/
└── src/
    └── game/
        ├── combat.js                          (NEW - 438 lines)
        ├── COMBAT_EXTRACTION_SUMMARY.md       (NEW - 355 lines)
        ├── COMBAT_QUICK_REFERENCE.md          (NEW - 354 lines)
        ├── constants.js                       (EXTRACTED - 22 KB)
        ├── CONSTANTS_EXTRACTION_SUMMARY.txt   (GUIDE)
        ├── missions.js                        (EXTRACTED - 30 KB)
        ├── MISSIONS_SUMMARY.txt               (GUIDE)
        └── EXTRACTION_INDEX.md                (THIS FILE)
```

---

## Validation Checklist

- ✅ All combat functions extracted
- ✅ No React/JSX dependencies in combat.js
- ✅ Proper ES6 module format
- ✅ JSDoc comments for all exported functions
- ✅ Helper functions for code reuse
- ✅ Constants imported from constants.js
- ✅ Documentation complete
- ✅ Example usage provided
- ✅ Integration notes included
- ✅ Testing recommendations added

---

## Troubleshooting

### Import Issues
```javascript
// Make sure to use relative path to constants.js
import { UNIT_TYPES } from './constants.js';  // ✅ Correct
import { UNIT_TYPES } from 'constants';       // ❌ Will fail
```

### Missing Context
Some functions require callbacks:
```javascript
// These MUST be provided by caller
checkFlanking: (attacker, defender) => boolean
getTerrainInfo: (x, y) => terrainObject | null
```

### Tech Tree Bonuses
Ensure researched techs are valid keys in TECH_TREE:
```javascript
// Make sure these are real tech keys
getTechBonuses(unit, ['light_armor', 'rapid_fire']);
```

---

## Support

For questions about specific functions, see:
1. **COMBAT_EXTRACTION_SUMMARY.md** - Detailed documentation
2. **COMBAT_QUICK_REFERENCE.md** - Quick examples
3. **constants.js** - Available data structures

---

**Extraction Date:** 2026-02-01
**Source Version:** wwi-tactical-game-phase7-complete.jsx
**Target Format:** ES6 Modules
**Status:** ✅ Complete and Ready for Integration

