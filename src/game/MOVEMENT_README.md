# Movement System Module

Complete movement calculation system extracted from `wwi-tactical-game-phase7-complete.jsx` and refactored as a clean ES6 module.

## Files Included

### Main Module
- **`movement.js`** (406 lines)
  - Core movement and targeting functions
  - Helper utilities and validation
  - Tech bonus integration

### Documentation
- **`MOVEMENT_README.md`** (this file)
  - Overview and quick navigation

- **`MOVEMENT_EXTRACTION_SUMMARY.md`** (247 lines)
  - Detailed extraction notes
  - Function descriptions
  - Weather/terrain/bonus tables

- **`MOVEMENT_QUICK_REFERENCE.md`** (273 lines)
  - Function signatures
  - Unit stats tables
  - Code examples
  - Debug tips

- **`MOVEMENT_INTEGRATION_GUIDE.md`** (566 lines)
  - Step-by-step integration
  - State management patterns
  - Example implementations
  - Testing scenarios

## Quick Start

### 1. Import
```javascript
import {
  getMoves,
  getTargets,
  getTechBonusesForUnitFull,
} from './movement.js';
```

### 2. Calculate Moves
```javascript
const availableMoves = getMoves(
  selectedUnit,
  allUnits,
  terrainGrid,
  weather,
  researchedTechs,
  commanderPerks
);
```

### 3. Calculate Targets
```javascript
const validTargets = getTargets(
  selectedUnit,
  allUnits,
  weather,
  smokeZones,
  visibleEnemies,
  researchedTechs,
  commanderPerks
);
```

## Function Reference

### Movement Functions
| Function | Purpose | Returns |
|----------|---------|---------|
| `getMoves()` | Calculate valid move positions | Array of {x, y, cost} |
| `getTargets()` | Calculate valid attack targets | Array of unit objects |

### Distance Functions
| Function | Purpose | Use Case |
|----------|---------|----------|
| `getManhattanDist()` | Manhattan distance | Movement calculations |
| `getChebyshevDist()` | Chebyshev distance | Attack range |

### Helper Functions
| Function | Purpose |
|----------|---------|
| `getAt()` | Get terrain tile at position |
| `getUnitAt()` | Get unit at position |
| `getTerrainInfo()` | Get terrain type info |
| `getTechBonusesForUnitFull()` | Extract tech bonuses |

### Validation Functions
| Function | Purpose |
|----------|---------|
| `isValidPosition()` | Check grid bounds |
| `isValidMove()` | Check move validity |
| `isValidTarget()` | Check target validity |

## Key Features

### Weather Effects
- **Snow**: -1 movement for all units
- **Rain**: -1 range for attacks
- **Fog**: Limited visibility (3 tile range)
- **Sandstorm**: -1 movement AND -1 range
- **Clear**: No modifiers

### Unit-Specific Rules
- **Artillery**: Cannot move and fire (cannotMoveAndFire)
- **Cavalry**: 4 movement, slowed by mud
- **Tanks**: Ignore barbed wire, cannot enter water
- **Medics**: Cannot attack (nonCombatant)
- **Scout**: 3 movement (can be boosted by tech)
- **Sniper**: Long range with critical hits

### Modifiers
- **Commander Perks**: Logistics (+1 move), Artillery Mastery (+2 range)
- **Tech Bonuses**: Scout training (+1 move), Artillery ranging (+1 range), etc.
- **Faction Bonuses**: Stored in unit.bonusRange
- **Terrain Costs**: 1x normal, 2x rough, 3x barbed wire

### Special Mechanics
- **Smoke Zones**: Block line of sight
- **Fog of War**: Only see enemies within 3 tiles
- **Minimum Range**: Artillery has 2 tile minimum
- **Terrain Restrictions**: Water blocks tanks, mud slows cavalry

## Integration Steps

### Step 1: Basic Setup
1. Copy `movement.js` to `/src/game/`
2. Import required functions in main game component
3. Ensure `constants.js` is available

### Step 2: Game Initialization
```javascript
import { getMoves, getTargets } from './movement.js';
import { TECH_TREE } from './constants.js';

// Initialize game state
const [selectedUnit, setSelected] = useState(null);
const [validMoves, setValidMoves] = useState([]);
const [validTargets, setValidTargets] = useState([]);
```

### Step 3: Unit Selection Handler
```javascript
const selectUnit = (unit) => {
  setSelected(unit);
  const moves = getMoves(unit, units, terrain, weather, tech, perks);
  setValidMoves(moves);
};
```

### Step 4: Move Validation
```javascript
const moveUnit = (x, y) => {
  if (!validMoves.find(m => m.x === x && m.y === y)) return;
  // Apply move...
};
```

### Step 5: Attack Calculation
```javascript
const selectAttackTarget = (unit) => {
  const targets = getTargets(unit, units, weather, smoke, visible, tech, perks);
  setValidTargets(targets);
};
```

## Performance Characteristics

| Operation | Complexity | Time (ms) |
|-----------|-----------|-----------|
| getMoves() | O(range²) | <1 |
| getTargets() | O(units) | <1 |
| getTechBonusesForUnitFull() | O(techs) | <1 |
| Distance calculations | O(1) | <1 |

Safe for real-time UI updates on 8x8 grid with 8-16 units.

## Dependencies

### From constants.js
- `GRID_SIZE` - 8
- `WEATHER_TYPES` - Weather configuration
- `TERRAIN_TYPES` - Terrain properties
- `UNIT_TYPES` - Unit definitions

### From combat.js (optional)
- Used only if implementing full damage calculations
- Movement system is independent of combat

### From missions.js (optional)
- Used for loading mission terrain/units
- Movement system is independent

## Testing Recommendations

### Unit Tests
- Test each unit type with different movement ranges
- Verify weather modifiers apply correctly
- Test tech bonus stacking
- Verify terrain cost calculations

### Integration Tests
- Test full turn cycle (select → move → attack)
- Test all weather conditions
- Test all unit type combinations
- Test commander perks
- Test fog of war mechanics

### Edge Cases
- Unit at grid edge trying to move off
- Multiple units blocking all moves
- All targets in smoke
- Fog completely blocking visibility
- Artillery cannotMoveAndFire interaction

## Debugging

### Common Issues

**Issue**: Unit shows more moves than expected
- Check `hasMoved` flag is set correctly
- Verify weather is applying modifiers
- Check terrain costs are being applied

**Issue**: Targets not calculating correctly
- Check `hasAttacked` flag
- Verify weather range modifiers
- Check for smoke zone blocking
- In fog, verify visibleEnemies array

**Issue**: Tech bonuses not applying
- Ensure `getTechBonusesForUnitFull` is used (not stub)
- Pass full TECH_TREE constant
- Verify researched tech array is populated

**Issue**: Artillery can move and fire
- Check `hasMovedThisTurn` is being set
- Verify `cannotMoveAndFire` property exists on unit type
- Check phase transitions are correct

### Debug Output

```javascript
// Log movement calculations
console.log('Unit:', selected.name);
console.log('Base range:', UNIT_TYPES[selected.type].move);
console.log('Weather mod:', WEATHER_TYPES[weather].effects.movementModifier || 0);
console.log('Tech bonus:', getTechBonusesForUnitFull(selected, tech, TECH_TREE).movement);
console.log('Available moves:', getMoves(...).length);

// Log targeting calculations
console.log('Attack range:', UNIT_TYPES[selected.type].range);
console.log('Min range:', UNIT_TYPES[selected.type].minRange || 0);
console.log('Valid targets:', getTargets(...).length);
```

## Files Structure

```
WW1-RN-Engine/src/game/
├── movement.js                          (406 lines)
├── constants.js                         (22K)
├── combat.js                            (15K)
├── missions.js                          (varies)
├── MOVEMENT_README.md                   (this file)
├── MOVEMENT_EXTRACTION_SUMMARY.md       (detailed reference)
├── MOVEMENT_QUICK_REFERENCE.md          (quick lookup)
└── MOVEMENT_INTEGRATION_GUIDE.md        (integration examples)
```

## Related Systems

### Combat System (combat.js)
- Uses target positions from `getTargets()`
- Applies damage calculations
- Independent of movement calculations

### Terrain System (constants.js)
- Defines terrain properties
- Used by movement for cost calculations
- Weather effects defined here

### Unit System (constants.js)
- Defines unit types and stats
- Movement/attack ranges per unit
- Special flags (cannotMoveAndFire, nonCombatant, etc.)

## Version History

- **1.0** (2025-02-01): Initial extraction from Phase 7
  - Core movement and targeting
  - Tech bonus integration
  - Weather/terrain support
  - Helper utilities

## Notes for Future Enhancement

### Possible Improvements
1. Pathfinding algorithm for optimal movement routes
2. Movement animation support (waypoints)
3. Fog of war with shadowing (LOS blocking)
4. Diagonal movement options
5. Flying units (ignore terrain)
6. Stealth/visibility mechanics
7. Movement history/undo support
8. Cooperative movement (multi-unit)

### Performance Optimizations
1. Cache movement calculations per unit
2. Invalidate cache on relevant state changes
3. Lazy evaluate distant positions
4. Quadtree for spatial queries
5. Worker thread for heavy calculations

## Support

For integration help, see **MOVEMENT_INTEGRATION_GUIDE.md**

For detailed function reference, see **MOVEMENT_EXTRACTION_SUMMARY.md**

For quick lookup, see **MOVEMENT_QUICK_REFERENCE.md**
