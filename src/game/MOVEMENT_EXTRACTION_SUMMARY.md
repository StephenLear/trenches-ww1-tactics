# Movement System Extraction Summary

## Source
- **Original File**: `wwi-tactical-game-phase7-complete.jsx`
- **Extraction Date**: 2025-02-01
- **Lines Extracted**: 1580-1654, plus helper functions

## Created File
- **New Module**: `movement.js`
- **Location**: `/WW1-RN-Engine/src/game/movement.js`
- **Format**: ES6 Module with JSDoc comments

## Extracted Functions

### Core Movement Functions

#### `getMoves(unit, units, terrainGrid, currentWeather, researchedTech, commanderPerks)`
Calculates all valid movement tiles for a unit.

**Features:**
- Weather effect modifiers (snow -1 movement, fog visibility, sandstorm -1 movement)
- Terrain movement costs (mud 2, barbed wire 3, mountain 2, etc.)
- Commander logistics perk (+1 movement)
- Tech tree bonuses (scout training +1 movement)
- Unit-specific restrictions:
  - Artillery: cannot move and fire (cannotMoveAndFire)
  - Tanks: ignore barbed wire, cannot enter water
  - Cavalry: 4 base movement, slowed by mud (3 cost)
  - Scout: 3 base movement
  - Infantry: 2 base movement
  - Officer: 2 base movement
  - Medic: 2 base movement
  - Machinegun: 1 base movement
  - Sniper: 2 base movement

**Returns**: Array of `{x, y, terrainCost}` objects

---

#### `getTargets(unit, units, currentWeather, smokeZones, visibleEnemies, researchedTech, commanderPerks)`
Calculates valid attack targets for a unit.

**Features:**
- Weather modifiers (rain -1 range, fog visibility)
- Commander artillery mastery perk (+2 range for artillery)
- Tech bonuses (artillery ranging +1, sniper optics +1 range)
- Faction bonuses (unit.bonusRange)
- Unit-specific rules:
  - Medics cannot attack (nonCombatant)
  - Artillery: cannot fire if moved this turn (cannotMoveAndFire)
  - Some units have minRange (artillery 2 tiles minimum)
- Fog restrictions (only targets in visibleEnemies array)
- Smoke zone blocking (targets in smoke cannot be hit)

**Returns**: Array of valid target unit objects

---

### Helper Functions

#### `getManhattanDist(x1, y1, x2, y2)`
Calculates Manhattan distance (sum of absolute differences).
Used for movement range calculations.

#### `getChebyshevDist(x1, y1, x2, y2)`
Calculates Chebyshev distance (max of absolute differences).
Used for attack range calculations.

#### `getAt(x, y, terrainGrid)`
Retrieves terrain tile at given coordinates from terrain grid array.

#### `getUnitAt(x, y, units)`
Finds living unit at given coordinates.

#### `getTerrainInfo(x, y, terrainGrid)`
Gets terrain type information for a position using TERRAIN_TYPES constant.

---

### Tech Bonus Functions

#### `getTechBonusesForUnit(unit, researchedTech)`
Simplified version returning empty bonuses (stub for integration).

#### `getTechBonusesForUnitFull(unit, researchedTech, techTree)`
Complete implementation extracting bonuses from tech tree.

**Applied Bonuses:**
- Unit-specific: movement, range, attack, defense, hp, heal_bonus, charge_damage
- Critical bonus (critBonus)
- Armor piercing (armorPiercing)
- Global bonuses: trench_defense, combined_arms

---

### Validation Functions

#### `isValidPosition(x, y)`
Checks if coordinates are within GRID_SIZE bounds.

#### `isValidMove(unit, targetX, targetY, units, terrainGrid)`
Validates a move considering:
- Grid bounds
- Unit occupancy
- Terrain restrictions (water for tanks, etc.)

#### `isValidTarget(attacker, target, currentWeather, smokeZones)`
Validates a target considering:
- Team affiliation
- Unit health
- Smoke blocking

---

## Dependencies

### Imports from constants.js
- `GRID_SIZE` - Grid dimensions (8)
- `WEATHER_TYPES` - Weather effects data
- `TERRAIN_TYPES` - Terrain properties
- `UNIT_TYPES` - Unit stat definitions

### Game State Parameters
The functions receive these as parameters (not stored internally):
- `unit` - Current unit object
- `units` - All units array
- `terrainGrid` - Terrain tiles array
- `currentWeather` - Current weather type
- `researchedTech` - Array of tech keys
- `commanderPerks` - Array of active perks
- `smokeZones` - Array of smoke positions
- `visibleEnemies` - Array of visible enemy IDs

---

## Weather Effects

| Weather | Movement Mod | Range Mod | Visibility |
|---------|-------------|-----------|------------|
| Clear   | 0           | 0         | Full       |
| Rain    | 0           | -1        | Full       |
| Snow    | -1          | 0         | Full       |
| Fog     | 0           | 0         | Limited    |
| Sandstorm | -1        | -1        | Full       |

---

## Terrain Movement Costs

| Terrain | Cost | Special |
|---------|------|---------|
| Trench | 1 | +1 defense |
| Mountain | 2 | +1 atk/def |
| Water | 2 | Blocks tanks |
| Beach | 1 | -1 defense |
| Sand | 2 | No modifier |
| Mud | 2 | Slows cavalry |
| Barbed Wire | 3 | Tanks ignore |
| Objective | 1 | Capture point |
| Crater | 1 | +1 defense |

---

## Commander Perks Applied

- **Logistics Expert**: +1 movement to all units
- **Artillery Mastery**: +2 range to artillery units

---

## Tech Tree Bonuses (Movement-Related)

| Tech | Effect | Unit Type |
|------|--------|-----------|
| Scout Training | +1 movement | Scout |
| Sniper Optics | +1 range | Sniper |
| Artillery Ranging | +1 range | Artillery |
| Advanced Artillery | +1 barrage radius | Artillery |

---

## Integration Notes

### In the main game component:
1. Import getMoves and getTargets from movement.js
2. Import getTechBonusesForUnitFull instead of getTechBonusesForUnit
3. Pass TECH_TREE constant when calling getTechBonusesForUnitFull
4. Call getMoves and getTargets with current game state
5. Use returned arrays for UI highlighting and game logic

### Example Usage:
```javascript
import { getMoves, getTargets } from './movement.js';
import { TECH_TREE } from './constants.js';

const validMoves = getMoves(
  selectedUnit,
  units,
  terrain,
  currentWeather,
  researchedTech,
  commanderPerks
);

const validTargets = getTargets(
  selectedUnit,
  units,
  currentWeather,
  smokeZones,
  visibleEnemies,
  researchedTech,
  commanderPerks
);
```

---

## Code Quality

- **Format**: Clean ES6 module syntax
- **Documentation**: Comprehensive JSDoc comments
- **Parameters**: Well-documented with types and descriptions
- **Return Values**: Clearly documented with examples
- **Edge Cases**: Handles null/undefined gracefully
- **Magic Numbers**: Using constants from constants.js

---

## Testing Recommendations

1. Test movement with each weather type
2. Verify terrain cost calculations
3. Test tech bonus stacking
4. Verify commander perk application
5. Test unit-specific restrictions (artillery, tanks, cavalry)
6. Verify fog and smoke blocking
7. Test all distance calculations
8. Verify grid bounds checking

---

## Related Files

- `constants.js` - Game constant definitions (UNIT_TYPES, TERRAIN_TYPES, etc.)
- `combat.js` - Combat system (may reference movement)
- `missions.js` - Mission configurations with units and terrain
- `wwi-tactical-game-phase7-complete.jsx` - Original source file
