# Movement System - Integration Guide

## Import Statement

```javascript
import {
  getMoves,
  getTargets,
  getTechBonusesForUnitFull,
  getManhattanDist,
  getChebyshevDist,
  getUnitAt,
  getTerrainInfo,
  isValidMove,
  isValidTarget
} from './movement.js';

import { TECH_TREE } from './constants.js';
```

---

## Integration Points in Game Loop

### 1. On Unit Selection

```javascript
const handleSelectUnit = (unit) => {
  setSelected(unit);

  // Calculate available moves
  const availableMoves = getMoves(
    unit,
    units,
    terrain,
    currentWeather,
    researchedTech,
    commanderPerks
  );

  // Highlight available positions on UI
  setHighlights(availableMoves);

  // Store for click validation
  setValidMoves(availableMoves);
};
```

### 2. On Movement Click

```javascript
const handleMoveClick = (x, y) => {
  if (!isValidMove(selected, x, y, units, terrain)) {
    console.log('Invalid move');
    return;
  }

  // Update unit position
  const updatedUnits = units.map(u =>
    u.id === selected.id
      ? { ...u, x, y, hasMoved: true, hasMovedThisTurn: true }
      : u
  );

  setUnits(updatedUnits);

  // Clear highlights and switch to attack phase
  setHighlights([]);
  setPhase('action');
};
```

### 3. On Attack Initiation

```javascript
const handleAttackMode = (unit) => {
  // Calculate valid targets
  const validTargets = getTargets(
    unit,
    units,
    currentWeather,
    smokeZones,
    visibleEnemies,
    researchedTech,
    commanderPerks
  );

  if (validTargets.length === 0) {
    addLog(`${unit.name} has no valid targets!`);
    return;
  }

  // Highlight target units on UI
  const targetPositions = validTargets.map(t => ({ x: t.x, y: t.y }));
  setHighlights(targetPositions);

  // Store for attack validation
  setValidTargets(validTargets);
  setPhase('targeting');
};
```

### 4. On Attack Click

```javascript
const handleAttackClick = (targetUnit) => {
  if (!isValidTarget(selected, targetUnit, currentWeather, smokeZones)) {
    console.log('Cannot target unit');
    return;
  }

  // Check if target is in valid targets list
  if (!validTargets.find(t => t.id === targetUnit.id)) {
    console.log('Out of range');
    return;
  }

  // Perform attack (delegates to combat.js)
  performAttack(selected, targetUnit);

  // Mark as attacked
  setUnits(units.map(u =>
    u.id === selected.id
      ? { ...u, hasAttacked: true }
      : u
  ));

  // Clear highlights
  setHighlights([]);
};
```

---

## Tech Bonus Integration

### Replace Old Implementation

**Before:**
```javascript
const getTechBonuses = (unit) => {
  // ... complex logic ...
};
```

**After:**
```javascript
import { getTechBonusesForUnitFull } from './movement.js';
import { TECH_TREE } from './constants.js';

const getTechBonuses = (unit) => {
  return getTechBonusesForUnitFull(unit, researchedTech, TECH_TREE);
};
```

### Apply in Movement Calculation

```javascript
const getMoves = (unit) => {
  // ... existing code ...

  // Get tech bonuses from movement module
  const techBonus = getTechBonusesForUnitFull(unit, researchedTech, TECH_TREE);
  let effectiveRange = Math.max(1, baseRange + weatherMod + logisticsMod + techBonus.movement);

  // ... rest of calculation ...
};
```

---

## State Management Pattern

### Initialize State

```javascript
const [selected, setSelected] = useState(null);
const [validMoves, setValidMoves] = useState([]);
const [validTargets, setValidTargets] = useState([]);
const [highlights, setHighlights] = useState([]);
const [phase, setPhase] = useState('select'); // select, move, action, targeting

// Weather and game state
const [currentWeather, setCurrentWeather] = useState('clear');
const [units, setUnits] = useState([]);
const [terrain, setTerrain] = useState([]);
const [smokeZones, setSmokeZones] = useState([]);
const [visibleEnemies, setVisibleEnemies] = useState([]);

// Upgrades
const [researchedTech, setResearchedTech] = useState([]);
const [commanderPerks, setCommanderPerks] = useState([]);
```

### Game Turn Loop

```javascript
const executeTurn = (unit) => {
  // Reset action flags
  const activeUnit = { ...unit, hasMoved: false, hasAttacked: false };

  // Phase 1: Movement
  const moves = getMoves(
    activeUnit,
    units,
    terrain,
    currentWeather,
    researchedTech,
    commanderPerks
  );

  if (moves.length > 0) {
    // Show movement options
    setHighlights(moves);
    setPhase('move');
  } else {
    // Skip to action phase
    setPhase('action');
  }
};
```

---

## UI Highlighting Implementation

### Render Movement Highlights

```javascript
const renderGrid = () => {
  return (
    <div className="grid">
      {Array.from({ length: GRID_SIZE }).map((_, y) =>
        Array.from({ length: GRID_SIZE }).map((_, x) => {
          const isMove = highlights.some(h => h.x === x && h.y === y);
          const isTarget = highlights.some(h => h.x === x && h.y === y);
          const unit = getUnitAt(x, y, units);

          return (
            <div
              key={`${x}-${y}`}
              className={`
                tile
                ${isMove ? 'highlight-move' : ''}
                ${isTarget ? 'highlight-target' : ''}
              `}
              onClick={() => handleTileClick(x, y)}
            >
              {unit && <UnitSprite unit={unit} />}
            </div>
          );
        })
      )}
    </div>
  );
};
```

### Highlight Styles (CSS)

```css
.tile {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  background: #f5f5f5;
}

.tile.highlight-move {
  background: rgba(100, 200, 255, 0.3);
  border: 2px solid #0066ff;
}

.tile.highlight-target {
  background: rgba(255, 100, 100, 0.3);
  border: 2px solid #ff0000;
}

.tile:hover {
  background: rgba(200, 200, 200, 0.5);
}
```

---

## Weather Change Handling

```javascript
const changeWeather = (newWeather) => {
  setCurrentWeather(newWeather);

  // Recalculate all available moves (weather affects range)
  if (selected) {
    const newMoves = getMoves(
      selected,
      units,
      terrain,
      newWeather,
      researchedTech,
      commanderPerks
    );
    setHighlights(newMoves);
  }

  addLog(`Weather changed to ${WEATHER_TYPES[newWeather].name}`);
};
```

---

## Tech Research Effect

```javascript
const researchTech = (techKey) => {
  const tech = TECH_TREE[techKey];

  if (requisitions < tech.cost) {
    addLog('Not enough requisitions!');
    return;
  }

  setRequisitions(prev => prev - tech.cost);
  setResearchedTech(prev => [...prev, techKey]);

  // Recalculate affected units
  const affectedUnits = units.filter(u => {
    const bonus = getTechBonusesForUnitFull(u, [...researchedTech, techKey], TECH_TREE);
    return bonus.movement > 0 || bonus.range > 0;
  });

  affectedUnits.forEach(u => {
    addLog(`${u.name}'s capabilities improved!`);
  });
};
```

---

## End Turn Cleanup

```javascript
const endTurn = () => {
  // Reset unit movement/attack flags
  setUnits(prevUnits => prevUnits.map(u => ({
    ...u,
    hasMoved: false,
    hasAttacked: false,
    hasMovedThisTurn: false
  })));

  // Clear highlights
  setHighlights([]);
  setSelected(null);

  // Process smoke decay
  setSmokeZones(prev =>
    prev
      .map(s => ({ ...s, turns: s.turns - 1 }))
      .filter(s => s.turns > 0)
  );

  // Switch to enemy phase
  setPhase('enemy');
};
```

---

## Fog of War Integration

```javascript
// Reveal enemies based on visibility range
const updateVisibility = () => {
  const fogRange = WEATHER_TYPES[currentWeather]?.effects?.visibilityRange || Infinity;

  const visible = units
    .filter(u => u.team === 'player') // Check from player units
    .flatMap(playerUnit =>
      units.filter(enemyUnit => {
        if (enemyUnit.team !== 'enemy') return false;

        const distance = getChebyshevDist(
          playerUnit.x,
          playerUnit.y,
          enemyUnit.x,
          enemyUnit.y
        );

        return distance <= fogRange;
      })
    )
    .map(u => u.id);

  setVisibleEnemies(visible);
};

// Call this on weather change or unit movement
useEffect(() => {
  updateVisibility();
}, [units, currentWeather]);
```

---

## Artillery Special Handling

```javascript
const handleArtilleryAttack = (artillery) => {
  // Artillery has special cannotMoveAndFire rule
  if (artillery.hasMovedThisTurn) {
    addLog(`${artillery.name} cannot fire after moving!`);
    return;
  }

  const targets = getTargets(
    artillery,
    units,
    currentWeather,
    smokeZones,
    visibleEnemies,
    researchedTech,
    commanderPerks
  );

  // Artillery has minRange of 2
  const validTargets = targets.filter(t => {
    const dist = getChebyshevDist(artillery.x, artillery.y, t.x, t.y);
    return dist >= 2; // minRange
  });

  setValidTargets(validTargets);
  setPhase('targeting');
};
```

---

## Performance Optimization

### Cache Calculations

```javascript
const [movesCache, setMovesCache] = useState({});

const getMovesCached = (unit) => {
  const cacheKey = `${unit.id}-${currentWeather}`;

  if (movesCache[cacheKey]) {
    return movesCache[cacheKey];
  }

  const moves = getMoves(
    unit,
    units,
    terrain,
    currentWeather,
    researchedTech,
    commanderPerks
  );

  setMovesCache(prev => ({
    ...prev,
    [cacheKey]: moves
  }));

  return moves;
};
```

### Clear Cache on State Change

```javascript
useEffect(() => {
  // Clear cache when game state changes
  setMovesCache({});
}, [units, terrain, currentWeather, researchedTech, commanderPerks]);
```

---

## Testing Scenarios

### Test Case 1: Movement with Snow
```javascript
test('Scout with snow has reduced movement', () => {
  const scout = { type: 'scout', x: 4, y: 4 };
  const moves = getMoves(scout, [], [], 'snow', [], []);
  // Scout: 3 base - 1 snow = 2 range
  expect(moves.length).toBeLessThan(
    getMoves(scout, [], [], 'clear', [], []).length
  );
});
```

### Test Case 2: Artillery Cannot Move and Fire
```javascript
test('Artillery cannot fire after moving', () => {
  const artillery = {
    type: 'artillery',
    x: 4,
    y: 4,
    hasMovedThisTurn: true
  };
  const targets = getTargets(artillery, enemies, 'clear', [], [], [], []);
  expect(targets.length).toBe(0);
});
```

### Test Case 3: Fog Visibility
```javascript
test('Fog limits visible enemies', () => {
  const unit = { type: 'infantry', x: 4, y: 4, team: 'player' };
  const enemy = { id: 1, x: 10, y: 10, team: 'enemy' };

  // Without fog can see
  let targets = getTargets(unit, [enemy], 'clear', [], [1], [], []);
  expect(targets.length).toBe(1);

  // With fog cannot see
  targets = getTargets(unit, [enemy], 'fog', [], [], [], []);
  expect(targets.length).toBe(0);
});
```

---

## Common Issues & Solutions

### Issue: Unit moves to smoke zone
**Solution:** Check smoke zones before confirming move
```javascript
if (smokeZones.some(s => s.x === x && s.y === y)) {
  return false; // Can move through but attacks blocked
}
```

### Issue: Artillery moves and can fire
**Solution:** Set `hasMovedThisTurn` on movement
```javascript
setUnits(units.map(u =>
  u.id === selected.id && selected.type === 'artillery'
    ? { ...u, hasMovedThisTurn: true }
    : u
));
```

### Issue: Tech bonus not applying
**Solution:** Ensure tech tree is passed to getTechBonusesForUnitFull
```javascript
// WRONG
const bonus = getTechBonusesForUnit(unit, tech);

// CORRECT
const bonus = getTechBonusesForUnitFull(unit, tech, TECH_TREE);
```

### Issue: Fog visibility not updating
**Solution:** Call updateVisibility on fog weather change
```javascript
useEffect(() => {
  if (currentWeather === 'fog') {
    updateVisibility();
  }
}, [currentWeather]);
```
