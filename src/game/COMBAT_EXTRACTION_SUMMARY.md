# Combat Module Extraction Summary

## Overview
Successfully extracted all combat-related functions from `wwi-tactical-game-phase7-complete.jsx` into a clean, modular ES6 module at:
```
/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/combat.js
```

**File Size:** 438 lines
**Format:** ES6 Module with proper imports and exports
**Status:** Ready for React Native integration

---

## Exported Functions

### 1. `getDist(x1, y1, x2, y2)` - Manhattan Distance
**Lines:** 20-22

Calculates Manhattan (taxicab) distance between two grid points.
- **Used for:** Movement range calculations
- **Returns:** `number` - Sum of absolute differences in coordinates
- **Example:** `getDist(0, 0, 3, 4)` → `7`

```javascript
export function getDist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
```

---

### 2. `getChebyshevDist(x1, y1, x2, y2)` - Chebyshev Distance
**Lines:** 37-39

Calculates Chebyshev (chessboard) distance for range checks and adjacency detection.
- **Used for:** Combat range validation, adjacency detection
- **Returns:** `number` - Maximum of absolute differences in coordinates
- **Example:** `getChebyshevDist(0, 0, 3, 4)` → `4`

```javascript
export function getChebyshevDist(x1, y1, x2, y2) {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
}
```

---

### 3. `getTechBonuses(unit, researchedTech)` - Technology Bonuses
**Lines:** 65-111

Calculates all bonuses from researched technologies for a specific unit.

**Parameters:**
- `unit` {Object} - Unit with `type` property
- `researchedTech` {Array<string>} - Keys of researched technologies

**Returns:** {Object} with properties:
```javascript
{
  hp: 0,                  // Max HP bonus
  attack: 0,              // Attack damage bonus
  defense: 0,             // Defense bonus
  range: 0,               // Weapon range bonus
  movement: 0,            // Movement range bonus
  healBonus: 0,           // Healing effectiveness bonus
  critBonus: 0,           // Critical hit chance bonus
  armorPiercing: 0,       // Armor piercing bonus
  chargeDamage: 0,        // Charge damage bonus
  trenchDefense: 0,       // Defense bonus in trenches
  combinedArms: 0         // Bonus when adjacent to different units
}
```

**Logic:**
- Applies unit-specific bonuses (matched by `effect.unitType`)
- Applies global bonuses (effects with `effect.global` flag)
- Accumulates bonuses from all researched technologies

---

### 4. `executeAttack(attacker, defender, options)` - Main Combat Function
**Lines:** 143-311

Primary combat function handling all attack resolution including:
- Base damage calculation
- Flanking bonuses
- Terrain bonuses (high ground, trenches)
- Technology bonuses
- Critical hits (base + status effects)
- Defense modifiers
- Armor reduction
- Faction-specific bonuses (French offensive, British trench defense)
- Combined arms bonuses
- Experience calculation

**Parameters:**
- `attacker` {Object} - Attacking unit with full state
- `defender` {Object} - Defending unit with full state
- `options` {Object} - Context data:
  - `units` {Array} - All battlefield units
  - `terrain` {Array} - Terrain tiles
  - `selectedFaction` {string} - Player faction
  - `researchedTech` {Array<string>} - Researched technologies
  - `checkFlanking` {function} - Callback to check flanking condition
  - `getTerrainInfo` {function} - Callback to get terrain properties
  - `currentWeather` {string} - Current weather type

**Returns:** {Object} with properties:
```javascript
{
  damage: number,           // Final damage dealt
  criticalHit: boolean,     // Was critical hit
  killed: boolean,          // Was defender eliminated
  isFlanking: boolean,      // Was flanking applied
  mgVsCavalryBonus: boolean,// Was MG vs cavalry bonus applied
  xpGain: number,           // Base XP gained
  bonusXP: number,          // Bonus XP from special conditions
  logMessage: string,       // Combat log message
  breakdown: {              // Detailed damage breakdown
    baseAttack: number,
    atkBonus: number,
    finalDefense: number,
    armorReduction: number,
    damage: number
  }
}
```

**Bonus Calculations:**
| Source | Condition | Bonus |
|--------|-----------|-------|
| Flanking | Adjacent unit attacks from multiple sides | +1 |
| High Ground | Attacker on terrain with bonus, defender not | +terrain.attackBonus |
| MG vs Cavalry | Machine gun attacking cavalry unit | +attackerStats.bonusVsCavalry |
| Tech Bonuses | Researched technologies | +attackerTechBonus.attack |
| French Faction | French player attacking | +1 |
| Combined Arms | Adjacent to different unit type | +techBonus.combinedArms |

**Defense Calculations:**
- Base: Unit type defense
- Terrain: +defense bonus from terrain
- Status Effects: +2 for 'dug_in' or 'armor_up'
- Tech Trench: +trenchDefense for trenches
- British Faction: +1 in trenches for British
- Exposed Terrain: Override to ≤0

**Critical Hit:**
- Base chance: `attackerStats.criticalChance`
- Tech bonus: `+critBonus`
- Aimed shot status: 50% critical chance
- Damage multiplier: ×2

**Experience:**
- Kill: 75 XP base + 15 XP (flanking) + 10 XP (critical)
- Hit: 25 XP base + 15 XP (flanking) + 10 XP (critical)

---

### 5. `calculateAttackModifier(attacker, defender, options)` - Attack Modifier Helper
**Lines:** 313-357

Helper function to calculate total attack bonus from all sources.

**Parameters:**
- `attacker` {Object} - Attacking unit
- `defender` {Object} - Defending unit (not used in current implementation)
- `options` {Object}:
  - `isFlanking` {boolean}
  - `attackerTerrain` {Object}
  - `defenderTerrain` {Object}
  - `mgVsCavalryBonus` {number}
  - `techBonus` {Object}
  - `selectedFaction` {string}
  - `adjacentAllies` {Array}

**Returns:** `number` - Total attack modifier

**Combines:**
- Flanking bonus
- Terrain attack bonus
- MG vs cavalry bonus
- Tech attack bonus
- French faction offensive bonus
- Combined arms bonus (if adjacent to different units)

---

### 6. `calculateDefense(defender, defenderTerrain, options)` - Defense Calculator Helper
**Lines:** 359-399

Helper function to calculate final defense value from all sources.

**Parameters:**
- `defender` {Object} - Defending unit
- `defenderTerrain` {Object} - Terrain at defender position
- `options` {Object}:
  - `techBonus` {Object}
  - `selectedFaction` {string}
  - `hasFlankAbility` {boolean}

**Returns:** `number` - Final defense value (0 if flank ability active)

**Combines:**
- Base unit defense
- Terrain defense bonus
- Status effect bonuses
- Tech tree trench defense
- Faction bonuses (British trenches)
- Handles exposed terrain override

---

### 7. `canAttackTarget(attacker, target, unitRange, minRange, options)` - Range Validation
**Lines:** 401-438

Determines if an attack can hit a target based on range and environmental factors.

**Parameters:**
- `attacker` {Object} - Attacking unit
- `target` {Object} - Target unit
- `unitRange` {number} - Attack range
- `minRange` {number} - Minimum attack range (default: 0)
- `options` {Object}:
  - `currentWeather` {string}
  - `visibleEnemies` {Array}
  - `smokeZones` {Array}

**Returns:** `boolean` - Can attack returns true

**Checks:**
1. Visibility (fog weather)
2. Smoke coverage
3. Chebyshev distance within range
4. Chebyshev distance above minimum range

---

## Imports from Constants

The module imports the following from `constants.js`:

```javascript
import { UNIT_TYPES, TERRAIN_TYPES, WEATHER_TYPES, TECH_TREE } from './constants.js';
```

**Used for:**
- `UNIT_TYPES` - Unit stats (attack, defense, range, special properties)
- `TERRAIN_TYPES` - Terrain properties (bonuses, costs, special effects)
- `WEATHER_TYPES` - Weather modifiers (not directly used in combat.js but available)
- `TECH_TREE` - Technology definitions and effects

---

## Integration Notes

### Usage Pattern
```javascript
import {
  getDist,
  getChebyshevDist,
  executeAttack,
  getTechBonuses,
  canAttackTarget
} from './combat.js';

// Get tech bonuses for a unit
const bonuses = getTechBonuses(unit, researchedTechs);

// Check if attack is possible
const canAttack = canAttackTarget(attacker, target, range, minRange, {
  currentWeather,
  visibleEnemies,
  smokeZones
});

// Execute attack
if (canAttack) {
  const result = executeAttack(attacker, defender, {
    units,
    terrain,
    selectedFaction,
    researchedTech,
    checkFlanking,
    getTerrainInfo,
    currentWeather
  });

  console.log(`${result.logMessage} (${result.damage} damage)`);
}
```

### Context Functions Required by executeAttack
These functions must be provided as callbacks since they depend on React state:

1. **`checkFlanking(attacker, defender)`**
   - Returns boolean indicating if flanking condition is met

2. **`getTerrainInfo(x, y)`**
   - Returns terrain object at given coordinates or null

These cannot be in the module because they require game state access.

---

## Extracted From
**Source File:** `/sessions/peaceful-intelligent-edison/mnt/WW1 game/wwi-tactical-game-phase7-complete.jsx`

**Original Lines:**
- `getDist`: Line 1579
- `getChebyshevDist`: Line 1580
- `executeAttack`: Lines 1695-1816
- `getTechBonuses`: Lines 2292-2335
- Helper functions: Newly created based on combat logic

---

## Testing Recommendations

1. **Unit Tests for Distance Functions**
   - `getDist`: Verify Manhattan distance calculations
   - `getChebyshevDist`: Verify Chebyshev/chessboard distance

2. **Tech Bonus Tests**
   - Test unit-specific bonuses
   - Test global bonuses
   - Test accumulation of multiple techs

3. **Combat Resolution Tests**
   - Base damage calculation
   - Critical hit mechanics
   - Damage capping (minimum 1)
   - Experience gains
   - Unit elimination

4. **Integration Tests**
   - All bonus types together
   - Faction-specific bonuses
   - Weather effects (via context)
   - Status effect interactions

---

## Module Status
✅ Extraction complete
✅ ES6 module format
✅ JSDoc comments
✅ Helper functions included
✅ Import statements added
✅ Ready for React Native integration

---

*Extracted on 2026-02-01*
*From phase 7 complete version of WW1 Tactical Game*
