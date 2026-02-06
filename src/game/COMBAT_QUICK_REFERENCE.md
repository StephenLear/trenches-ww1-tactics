# Combat Module - Quick Reference

## File Location
```
/sessions/peaceful-intelligent-edison/mnt/WW1 game/WW1-RN-Engine/src/game/combat.js
```

## Import Statement
```javascript
import {
  getDist,
  getChebyshevDist,
  getTechBonuses,
  executeAttack,
  calculateAttackModifier,
  calculateDefense,
  canAttackTarget
} from './combat.js';
```

---

## Function Quick Guide

### Distance Calculations

#### `getDist(x1, y1, x2, y2)` → number
Manhattan distance for movement.
```javascript
getDist(0, 0, 3, 4); // 7
```

#### `getChebyshevDist(x1, y1, x2, y2)` → number
Chebyshev distance for range checks.
```javascript
getChebyshevDist(0, 0, 3, 4); // 4
```

---

### Technology & Bonuses

#### `getTechBonuses(unit, researchedTech)` → object
```javascript
const bonuses = getTechBonuses(unit, ['light_armor', 'rapid_fire']);
// Returns:
// {
//   hp: 0, attack: 1, defense: 1, range: 1, movement: 0,
//   healBonus: 0, critBonus: 0.1, armorPiercing: 0,
//   chargeDamage: 0, trenchDefense: 0, combinedArms: 0
// }
```

---

### Combat Resolution

#### `executeAttack(attacker, defender, options)` → result
Main combat function.

```javascript
const result = executeAttack(attacker, defender, {
  units,
  terrain,
  selectedFaction,        // 'british', 'french', etc.
  researchedTech,         // Array of tech keys
  checkFlanking,          // (attacker, defender) => boolean
  getTerrainInfo,         // (x, y) => terrainObject
  currentWeather          // 'clear', 'fog', 'rain', etc.
});

// Returns:
// {
//   damage: 15,
//   criticalHit: true,
//   killed: false,
//   isFlanking: true,
//   mgVsCavalryBonus: false,
//   xpGain: 75,
//   bonusXP: 25,
//   logMessage: "Unit dealt 15 dmg CRITICAL! (flank)",
//   breakdown: { baseAttack: 5, atkBonus: 2, ... }
// }
```

---

### Helper Functions

#### `calculateAttackModifier(attacker, defender, options)` → number
Combines all attack bonuses.

```javascript
const modifier = calculateAttackModifier(attacker, defender, {
  isFlanking: true,
  attackerTerrain: terrain,
  defenderTerrain: defTerrain,
  mgVsCavalryBonus: 0,
  techBonus: { attack: 1, combinedArms: 0 },
  selectedFaction: 'french',
  adjacentAllies: []
});
// Returns: 3 (or whatever the total modifier is)
```

#### `calculateDefense(defender, defenderTerrain, options)` → number
Calculates total defense value.

```javascript
const defense = calculateDefense(defender, defenderTerrain, {
  techBonus: { defense: 1, trenchDefense: 0 },
  selectedFaction: 'british',
  hasFlankAbility: false
});
// Returns: 5 (or whatever the final defense is)
```

#### `canAttackTarget(attacker, target, unitRange, minRange, options)` → boolean
Validates if attack can reach target.

```javascript
const canAttack = canAttackTarget(attacker, target, 5, 0, {
  currentWeather: 'fog',
  visibleEnemies: [target.id],
  smokeZones: []
});
// Returns: true if attack is possible
```

---

## Bonus Sources

### Attack Bonuses
| Source | Amount | Condition |
|--------|--------|-----------|
| Flanking | +1 | Unit attacked from multiple sides |
| High Ground | +terrain bonus | Attacker on bonus terrain, defender not |
| MG vs Cavalry | +stat bonus | Machine gun attacking cavalry |
| Tech Attack | +variable | Researched attack techs |
| French Faction | +1 | French player attacking |
| Combined Arms | +tech bonus | Adjacent to different unit type |

### Defense Bonuses
| Source | Amount | Condition |
|--------|--------|-----------|
| Base Defense | +stat | Unit type base defense |
| Terrain | +bonus | Terrain type defense bonus |
| Dug In | +2 | Status effect active |
| Armor Up | +2 | Status effect active |
| Tech Trench | +tech bonus | In trench with tech |
| British Trench | +1 | British faction in trench |
| Exposed | override | Terrain exposes unit |

### Damage Modifiers
| Effect | Multiplier | Condition |
|--------|-----------|-----------|
| Critical Hit | ×2 | Successful critical roll |
| Armor | -reduction | Tank armor reduced by piercing |
| Minimum | +1 | Damage never below 1 |

---

## Experience System

### XP Gains
- **Kill:** 75 XP base
- **Hit:** 25 XP base
- **Flanking Bonus:** +15 XP
- **Critical Hit Bonus:** +10 XP

**Example:**
- Kill with flanking + critical = 75 + 15 + 10 = 100 XP
- Hit with flanking = 25 + 15 = 40 XP

---

## Critical Hits

### Base Calculation
```
critical = random() < (unitStats.criticalChance + techBonus.critBonus)
```

### Status Effects Override
- **Aimed Shot:** 50% critical chance (overrides base)

### Damage Effect
- Critical hits **double** total damage

---

## Armor System

### Armor Reduction
```
effectiveArmor = max(0, unitStats.armor - attackerBonus.armorPiercing)
```

### Applied To Damage
```
finalDamage = max(1, baseDamage - defense - effectiveArmor)
```

---

## Faction Bonuses

### French
- **Offensive Bonus:** +1 attack when player attacks
- **Movement Bonus:** Can be added via tech tree

### British
- **Trench Bonus:** +1 defense in trenches
- **Defensive Bonus:** Can be added via tech tree

---

## Status Effects in Combat

### Attacker Effects
- **flank:** Negates defender defense (sets to 0)
- **aimed_shot:** 50% critical chance
- **armor_up:** (on defender, not attacker)

### Defender Effects
- **dug_in:** +2 defense
- **armor_up:** +2 defense
- **charging:** (affects other mechanics)

---

## Weather Effects (via context)

### Current Weather Affects
- **Fog:** Visibility range reduced (handled in visibility check)
- **Rain:** -1 range modifier
- **Snow:** -1 movement modifier
- **Sandstorm:** -1 range and -1 movement

**Note:** Weather modifiers are applied before calling combat functions. Combat.js receives final values.

---

## Common Patterns

### Check if Attack is Valid
```javascript
if (!canAttackTarget(attacker, target, effectiveRange, minRange, {
  currentWeather,
  visibleEnemies,
  smokeZones
})) {
  return false;
}
```

### Get Full Unit Stats with Bonuses
```javascript
const techBonus = getTechBonuses(unit, researchedTech);
const effectiveAttack = UNIT_TYPES[unit.type].attack + techBonus.attack;
const effectiveDefense = UNIT_TYPES[unit.type].defense + techBonus.defense;
```

### Execute Full Combat Resolution
```javascript
const result = executeAttack(attacker, defender, {
  units, terrain, selectedFaction, researchedTech,
  checkFlanking: (att, def) => {
    // Custom flanking logic
    return attackingSidesGreaterThanDefenseSides;
  },
  getTerrainInfo: (x, y) => {
    return terrain.find(t => t.x === x && t.y === y);
  },
  currentWeather
});

if (result.killed) {
  // Remove unit
} else {
  // Damage unit
}

// Award XP
attacker.xp += result.xpGain + result.bonusXP;
```

---

## Constants Required from constants.js

```javascript
UNIT_TYPES = {
  infantry: { attack: 5, defense: 2, range: 1, ... },
  cavalry: { attack: 6, defense: 1, range: 2, vulnerableToMG: true, ... },
  artillery: { attack: 8, defense: 0, range: 5, ... },
  // ...
}

TERRAIN_TYPES = {
  trench: { defenseBonus: 1, attackBonus: 0, ... },
  mountain: { defenseBonus: 1, attackBonus: 1, ... },
  // ...
}

TECH_TREE = {
  light_armor: {
    name: 'Light Armor',
    cost: 50,
    effect: { unitType: 'infantry', stat: 'defense', bonus: 1 },
    // ...
  },
  // ...
}
```

---

## Debugging

### Log Damage Calculation
```javascript
const result = executeAttack(attacker, defender, options);
console.log(result.breakdown);
// {
//   baseAttack: 5,
//   atkBonus: 3,
//   finalDefense: 2,
//   armorReduction: 1,
//   damage: 5
// }
```

### Check Tech Bonuses Applied
```javascript
const bonuses = getTechBonuses(unit, researchedTech);
console.log('Tech bonuses:', bonuses);
```

### Verify Range Calculation
```javascript
const range = getChebyshevDist(attacker.x, attacker.y, target.x, target.y);
console.log(`Distance: ${range}, Range: ${effectiveRange}, Can hit: ${range <= effectiveRange}`);
```

---

## Version Info
- **Extracted from:** wwi-tactical-game-phase7-complete.jsx
- **Module format:** ES6 (export/import)
- **Documentation:** JSDoc with examples
- **Date:** 2026-02-01

