/**
 * WWI Tactical Game - Fog of War System
 * Hide enemy units until they're in range of your troops
 */

// Visibility states
export const VISIBILITY = {
  HIDDEN: 'hidden',       // Never seen, completely dark
  REVEALED: 'revealed',   // Was seen but not currently visible
  VISIBLE: 'visible',     // Currently in sight
};

// Default vision ranges by unit type
export const VISION_RANGES = {
  infantry: 3,
  machinegunner: 3,
  sniper: 5,      // Snipers see farther
  medic: 2,
  officer: 4,     // Officers have good awareness
  tank: 2,        // Limited visibility from inside
  mortar: 2,
  cavalry: 5,     // Scouts, see far
};

// Terrain vision modifiers
export const TERRAIN_VISION_MODIFIERS = {
  open: 0,
  forest: -1,     // Harder to see through
  hill: 1,        // Elevated, see farther
  trench: -1,     // Lower position
  building: 0,
  mud: 0,
  wire: 0,
  crater: 0,
};

// Weather vision modifiers
export const WEATHER_VISION_MODIFIERS = {
  clear: 0,
  rain: -1,
  fog: -2,
  snow: -1,
  night: -2,
};

/**
 * Create initial fog of war state
 */
export function createFogOfWarState(mapWidth, mapHeight, enabled = true) {
  // Create visibility grid initialized to hidden
  const visibility = [];
  for (let y = 0; y < mapHeight; y++) {
    const row = [];
    for (let x = 0; x < mapWidth; x++) {
      row.push(VISIBILITY.HIDDEN);
    }
    visibility.push(row);
  }

  return {
    enabled,
    mapWidth,
    mapHeight,
    visibility,
    revealedEnemies: new Set(), // Track which enemies have been spotted
  };
}

/**
 * Get vision range for a unit
 */
export function getUnitVisionRange(unit, terrain = null, weather = 'clear') {
  // Base vision range
  let range = VISION_RANGES[unit.type] || 3;

  // Veteran bonus
  if (unit.isVeteran) {
    range += 1;
  }

  // Officer nearby bonus (implemented elsewhere via auras)

  // Terrain modifier
  if (terrain) {
    range += TERRAIN_VISION_MODIFIERS[terrain.type] || 0;
  }

  // Weather modifier
  range += WEATHER_VISION_MODIFIERS[weather] || 0;

  // Minimum vision range of 1
  return Math.max(1, range);
}

/**
 * Check if a position is within line of sight from another position
 * Uses Bresenham's line algorithm to check for blocking terrain
 */
export function hasLineOfSight(fromX, fromY, toX, toY, terrainGrid, blockingTypes = ['building']) {
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);
  const sx = fromX < toX ? 1 : -1;
  const sy = fromY < toY ? 1 : -1;
  let err = dx - dy;

  let x = fromX;
  let y = fromY;

  while (x !== toX || y !== toY) {
    // Skip the starting position
    if (x !== fromX || y !== fromY) {
      // Check if this tile blocks vision
      const terrain = terrainGrid?.[y]?.[x];
      if (terrain && blockingTypes.includes(terrain.type)) {
        return false;
      }
    }

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return true;
}

/**
 * Calculate Manhattan distance between two points
 */
export function getDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

/**
 * Update fog of war based on unit positions
 */
export function updateFogOfWar(fogState, playerUnits, terrainGrid, weather = 'clear') {
  if (!fogState.enabled) return fogState;

  const { mapWidth, mapHeight, visibility } = fogState;

  // First, convert all VISIBLE tiles to REVEALED (fog returns)
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      if (visibility[y][x] === VISIBILITY.VISIBLE) {
        visibility[y][x] = VISIBILITY.REVEALED;
      }
    }
  }

  // Then reveal tiles visible to each player unit
  playerUnits.forEach(unit => {
    if (unit.hp <= 0) return; // Dead units don't see

    const terrain = terrainGrid?.[unit.y]?.[unit.x];
    const visionRange = getUnitVisionRange(unit, terrain, weather);

    // Check all tiles within vision range
    for (let dy = -visionRange; dy <= visionRange; dy++) {
      for (let dx = -visionRange; dx <= visionRange; dx++) {
        const x = unit.x + dx;
        const y = unit.y + dy;

        // Check bounds
        if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) continue;

        // Check distance (circular vision, not square)
        const distance = Math.abs(dx) + Math.abs(dy);
        if (distance > visionRange) continue;

        // Check line of sight
        if (hasLineOfSight(unit.x, unit.y, x, y, terrainGrid)) {
          visibility[y][x] = VISIBILITY.VISIBLE;
        }
      }
    }
  });

  return {
    ...fogState,
    visibility,
  };
}

/**
 * Check if a specific tile is visible
 */
export function isTileVisible(fogState, x, y) {
  if (!fogState.enabled) return true;
  if (x < 0 || x >= fogState.mapWidth || y < 0 || y >= fogState.mapHeight) {
    return false;
  }
  return fogState.visibility[y][x] === VISIBILITY.VISIBLE;
}

/**
 * Check if a specific tile has been revealed (seen at some point)
 */
export function isTileRevealed(fogState, x, y) {
  if (!fogState.enabled) return true;
  if (x < 0 || x >= fogState.mapWidth || y < 0 || y >= fogState.mapHeight) {
    return false;
  }
  return fogState.visibility[y][x] !== VISIBILITY.HIDDEN;
}

/**
 * Check if an enemy unit is visible
 */
export function isEnemyVisible(fogState, enemy) {
  return isTileVisible(fogState, enemy.x, enemy.y);
}

/**
 * Get all visible enemy units
 */
export function getVisibleEnemies(fogState, enemies) {
  if (!fogState.enabled) return enemies;
  return enemies.filter(enemy => isEnemyVisible(fogState, enemy));
}

/**
 * Check if player can attack a target (must be visible)
 */
export function canAttackTarget(fogState, attacker, target) {
  // If fog is disabled, always can attack
  if (!fogState.enabled) return true;

  // Check if target position is visible
  return isTileVisible(fogState, target.x, target.y);
}

/**
 * Mark an enemy as having been spotted (for tracking)
 */
export function markEnemySpotted(fogState, enemyId) {
  fogState.revealedEnemies.add(enemyId);
  return fogState;
}

/**
 * Check if an enemy has ever been spotted
 */
export function hasEnemyBeenSpotted(fogState, enemyId) {
  return fogState.revealedEnemies.has(enemyId);
}

/**
 * Reveal all tiles (cheat/debug function)
 */
export function revealAll(fogState) {
  const { mapWidth, mapHeight, visibility } = fogState;

  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      visibility[y][x] = VISIBILITY.VISIBLE;
    }
  }

  return { ...fogState, visibility };
}

/**
 * Reveal a specific area (for abilities like Scout)
 */
export function revealArea(fogState, centerX, centerY, radius) {
  const { mapWidth, mapHeight, visibility } = fogState;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;

      // Check bounds
      if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) continue;

      // Check circular radius
      if (Math.abs(dx) + Math.abs(dy) <= radius) {
        visibility[y][x] = VISIBILITY.VISIBLE;
      }
    }
  }

  return { ...fogState, visibility };
}

/**
 * Get visibility opacity for rendering
 */
export function getVisibilityOpacity(visibility) {
  switch (visibility) {
    case VISIBILITY.VISIBLE:
      return 1.0;
    case VISIBILITY.REVEALED:
      return 0.5;  // Dimmed but visible terrain
    case VISIBILITY.HIDDEN:
      return 0.0;  // Completely dark
    default:
      return 0.0;
  }
}

/**
 * Get fog overlay color based on visibility
 */
export function getFogOverlayColor(visibility) {
  switch (visibility) {
    case VISIBILITY.VISIBLE:
      return 'transparent';
    case VISIBILITY.REVEALED:
      return 'rgba(0, 0, 0, 0.4)';
    case VISIBILITY.HIDDEN:
      return 'rgba(0, 0, 0, 0.8)';
    default:
      return 'rgba(0, 0, 0, 0.8)';
  }
}

/**
 * Create fog of war settings object
 */
export function createFogSettings(difficulty = 'normal') {
  return {
    enabled: true,
    showEnemyCount: difficulty === 'easy',      // Show how many hidden enemies
    revealOnDamage: true,                        // Reveal enemy when they attack
    persistentReveal: difficulty === 'easy',    // Once seen, always show on map
    showLastKnownPosition: true,                // Show where enemy was last seen
  };
}

/**
 * Handle enemy attacking from fog (reveals them)
 */
export function onEnemyAttack(fogState, enemy, settings) {
  if (settings.revealOnDamage) {
    // Reveal the attacker's position
    const { visibility } = fogState;
    visibility[enemy.y][enemy.x] = VISIBILITY.VISIBLE;
    markEnemySpotted(fogState, enemy.id);
  }
  return fogState;
}

export default {
  VISIBILITY,
  VISION_RANGES,
  TERRAIN_VISION_MODIFIERS,
  WEATHER_VISION_MODIFIERS,
  createFogOfWarState,
  getUnitVisionRange,
  hasLineOfSight,
  getDistance,
  updateFogOfWar,
  isTileVisible,
  isTileRevealed,
  isEnemyVisible,
  getVisibleEnemies,
  canAttackTarget,
  markEnemySpotted,
  hasEnemyBeenSpotted,
  revealAll,
  revealArea,
  getVisibilityOpacity,
  getFogOverlayColor,
  createFogSettings,
  onEnemyAttack,
};
