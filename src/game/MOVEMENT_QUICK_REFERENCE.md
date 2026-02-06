# Movement System - Quick Reference

## Main Exports from movement.js

### Movement Calculations
- **`getMoves(unit, units, terrain, weather, techList, perks)`** → Array of {x, y, cost}
- **`getTargets(unit, units, weather, smoke, visible, techList, perks)`** → Array of target units

### Distance Functions
- **`getManhattanDist(x1, y1, x2, y2)`** → number (used for movement)
- **`getChebyshevDist(x1, y1, x2, y2)`** → number (used for attacking)

### Helpers
- **`getAt(x, y, terrain)`** → tile or null
- **`getUnitAt(x, y, units)`** → unit or null
- **`getTerrainInfo(x, y, terrain)`** → terrain data or null

### Tech Bonuses
- **`getTechBonusesForUnit(unit, techList)`** → empty bonuses (stub)
- **`getTechBonusesForUnitFull(unit, techList, TECH_TREE)`** → full bonuses object

### Validation
- **`isValidPosition(x, y)`** → boolean
- **`isValidMove(unit, x, y, units, terrain)`** → boolean
- **`isValidTarget(attacker, target, weather, smoke)`** → boolean

---

## Unit Movement Ranges

```
Scout:       3 tiles base
Cavalry:     4 tiles base
Infantry:    2 tiles base
Officer:     2 tiles base
Medic:       2 tiles base
Sniper:      2 tiles base
Machinegun:  1 tile base
Tank:        1 tile base
Artillery:   1 tile base (cannot move and fire)
```

---

## Unit Attack Ranges

```
Infantry:    1 tile
Scout:       2 tiles
Officer:     1 tile
Machinegun:  3 tiles
Cavalry:     1 tile
Tank:        1 tile
Sniper:      4 tiles
Artillery:   5 tiles (min 2, cannot fire if moved)
Medic:       N/A (cannot attack)
```

---

## Example Usage

### Get movement options for selected unit:
```javascript
const moves = getMoves(
  selectedUnit,      // The unit to move
  allUnits,          // All units on map
  terrainTiles,      // Terrain grid
  weather,           // 'clear', 'rain', 'snow', 'fog', 'sandstorm'
  researchedTechs,   // Array of tech keys
  activePerks        // Array of commander perks
);

// Returns: [{x: 2, y: 3, terrainCost: 1}, ...]
```

### Get attack options for selected unit:
```javascript
const targets = getTargets(
  selectedUnit,      // The unit attacking
  allUnits,          // All units (for finding targets)
  weather,           // Weather affecting range
  smokeZones,        // Array of smoke positions
  visibleEnemies,    // Array of enemy IDs visible in fog
  researchedTechs,   // Tech bonuses
  activePerks        // Commander perks
);

// Returns: [targetUnit1, targetUnit2, ...]
```

### Validate a single move:
```javascript
if (isValidMove(unit, newX, newY, units, terrain)) {
  // Perform move
}
```

### Validate a target:
```javascript
if (isValidTarget(attacker, target, weather, smoke)) {
  // Perform attack
}
```

---

## Weather Impact Matrix

```
┌──────────┬──────────┬──────────┬──────────┐
│ Weather  │ Movement │ Range    │ Special  │
├──────────┼──────────┼──────────┼──────────┤
│ Clear    │   0      │    0     │ None     │
│ Rain     │   0      │   -1     │ None     │
│ Snow     │  -1      │    0     │ None     │
│ Fog      │   0      │    0     │ Limited  │
│          │          │          │ vision   │
│ Sandstorm│  -1      │   -1     │ None     │
└──────────┴──────────┴──────────┴──────────┘
```

---

## Terrain Cost Multipliers

```
Normal (trench, beach, objective, crater): 1x
Mountain, water, sand, mud:                2x
Barbed wire:                                3x

Modifiers:
- Tanks ignore barbed wire (1x)
- Cavalry slowed by mud (3x)
```

---

## Commander Perks Impact

### Logistics Expert
- **Effect**: +1 movement range for all units
- **Example**: Scout 3→4, Cavalry 4→5

### Artillery Mastery
- **Effect**: +2 range for artillery only
- **Example**: Artillery 5→7

---

## Tech Bonuses (Movement-Related)

### Scout Training
- **Unit**: Scout
- **Effect**: +1 movement range
- **Cost**: 40 requisitions
- **Prerequisite**: None

### Officer Tactics
- **Unit**: Officer
- **Effect**: +1 ability range (Rally affects 2 tiles away)
- **Cost**: 75 requisitions
- **Prerequisite**: Scout Training

### Sniper Optics
- **Unit**: Sniper
- **Effect**: +1 range, +10% crit chance
- **Cost**: 100 requisitions
- **Prerequisite**: Improved Rifles

### Artillery Ranging
- **Unit**: Artillery
- **Effect**: +1 range
- **Cost**: 90 requisitions
- **Prerequisite**: None

### Advanced Artillery
- **Unit**: Artillery
- **Effect**: +1 barrage radius (4x4 area)
- **Cost**: 130 requisitions
- **Prerequisite**: Artillery Ranging

---

## Special Unit Rules

### Artillery (cannotMoveAndFire)
```
If unit.hasMovedThisTurn === true:
  ❌ Cannot use getTargets()
  ✓ Can move next turn or stay and fire
```

### Medic (nonCombatant)
```
Cannot attack
getTargets() returns empty array
```

### Tank
```
ignoresBarbedWire: true → 1x cost instead of 3x
cannotEnterWater: true → Cannot move to water tiles
```

### Cavalry
```
vulnerableToMG: true → Takes extra damage from machinegun
slowsCavalry in mud: true → 3x movement cost in mud
```

---

## Integration Checklist

- [ ] Import movement.js into main game component
- [ ] Import getTechBonusesForUnitFull with TECH_TREE
- [ ] Call getMoves on unit selection
- [ ] Call getTargets when in attack mode
- [ ] Handle moves array for UI highlighting
- [ ] Handle targets array for UI highlighting
- [ ] Pass all required parameters correctly
- [ ] Test with different weather conditions
- [ ] Test with different tech researches
- [ ] Verify commander perks apply

---

## Performance Notes

- `getMoves()` iterates through 64-169 positions depending on range
- `getTargets()` filters all units (typically 8-16)
- Both O(n) operations, safe for 8x8 grid
- Cache results while unit is selected
- Recalculate on turn changes or state updates

---

## Debug Tips

### Check if unit can move:
```javascript
if (getMoves(unit, units, terrain, weather, tech, perks).length > 0) {
  console.log('Unit can move');
}
```

### Check if unit can attack:
```javascript
if (getTargets(unit, units, weather, smoke, visible, tech, perks).length > 0) {
  console.log('Unit can attack');
}
```

### Why can't unit attack?
```javascript
// Check for:
1. unit.hasAttacked === true
2. unitType.nonCombatant === true
3. unitType.cannotMoveAndFire && unit.hasMovedThisTurn
4. No units in range (distance > effectiveRange)
5. All targets are allies or dead
6. Targets in smoke or fog
```

### Why can't unit move?
```javascript
// Check for:
1. unit.hasMoved === true
2. All valid positions occupied
3. Terrain restrictions (water for tanks)
4. Out of range (all positions too far)
```
