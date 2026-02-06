/**
 * WWI Tactical Game - Historical Photos
 * Period-appropriate images for briefings and war diary
 *
 * NOTE: These are placeholder URLs. For production, you should:
 * 1. Use royalty-free/public domain WWI images from sources like:
 *    - Library of Congress (loc.gov)
 *    - Imperial War Museums (iwm.org.uk)
 *    - National Archives
 *    - Wikimedia Commons
 * 2. Store images locally in assets/ folder for offline access
 * 3. Ensure proper attribution where required
 */

// Photo categories for different contexts
export const PHOTO_CATEGORIES = {
  TRENCHES: 'trenches',
  ARTILLERY: 'artillery',
  INFANTRY: 'infantry',
  TANKS: 'tanks',
  MEDICAL: 'medical',
  OFFICERS: 'officers',
  LANDSCAPES: 'landscapes',
  VICTORIES: 'victories',
  SOMME: 'somme',
  VERDUN: 'verdun',
  YPRES: 'ypres',
  MARNE: 'marne',
};

// Historical photo data with descriptions
// Using emoji placeholders - replace with actual image requires for production
export const HISTORICAL_PHOTOS = {
  // Trench warfare photos
  trench_life_1: {
    id: 'trench_life_1',
    category: PHOTO_CATEGORIES.TRENCHES,
    // In production: require('../assets/photos/trench_life_1.jpg')
    placeholder: '🏚️',
    title: 'Life in the Trenches',
    description: 'British soldiers in a front-line trench, 1916',
    year: 1916,
    location: 'Western Front',
    source: 'Imperial War Museum',
  },
  trench_system: {
    id: 'trench_system',
    category: PHOTO_CATEGORIES.TRENCHES,
    placeholder: '⛏️',
    title: 'Trench System',
    description: 'Aerial view of complex trench networks',
    year: 1917,
    location: 'Flanders',
    source: 'Royal Flying Corps',
  },
  night_trench: {
    id: 'night_trench',
    category: PHOTO_CATEGORIES.TRENCHES,
    placeholder: '🌙',
    title: 'Night Watch',
    description: 'Soldiers on night sentry duty',
    year: 1916,
    location: 'Somme Sector',
    source: 'British Army Records',
  },

  // Artillery photos
  artillery_barrage: {
    id: 'artillery_barrage',
    category: PHOTO_CATEGORIES.ARTILLERY,
    placeholder: '💥',
    title: 'Artillery Barrage',
    description: 'Heavy guns firing during an offensive',
    year: 1916,
    location: 'Battle of the Somme',
    source: 'Imperial War Museum',
  },
  howitzer_crew: {
    id: 'howitzer_crew',
    category: PHOTO_CATEGORIES.ARTILLERY,
    placeholder: '🎯',
    title: 'Howitzer Crew',
    description: 'Crew operating a 9.2-inch howitzer',
    year: 1917,
    location: 'Arras',
    source: 'National Archives',
  },

  // Infantry photos
  going_over_top: {
    id: 'going_over_top',
    category: PHOTO_CATEGORIES.INFANTRY,
    placeholder: '⚔️',
    title: 'Going Over the Top',
    description: 'Infantry leaving trenches during an assault',
    year: 1916,
    location: 'Somme',
    source: 'Imperial War Museum',
  },
  infantry_advance: {
    id: 'infantry_advance',
    category: PHOTO_CATEGORIES.INFANTRY,
    placeholder: '🚶',
    title: 'Infantry Advance',
    description: 'Soldiers advancing across No Mans Land',
    year: 1917,
    location: 'Passchendaele',
    source: 'Canadian War Museum',
  },
  rest_billets: {
    id: 'rest_billets',
    category: PHOTO_CATEGORIES.INFANTRY,
    placeholder: '😴',
    title: 'Rest Behind Lines',
    description: 'Soldiers resting in reserve billets',
    year: 1916,
    location: 'France',
    source: 'Library of Congress',
  },

  // Tank photos
  first_tanks: {
    id: 'first_tanks',
    category: PHOTO_CATEGORIES.TANKS,
    placeholder: '🛡️',
    title: 'First Tanks in Action',
    description: 'Mark I tanks at the Battle of the Somme',
    year: 1916,
    location: 'Flers-Courcelette',
    source: 'Imperial War Museum',
  },
  tank_crew: {
    id: 'tank_crew',
    category: PHOTO_CATEGORIES.TANKS,
    placeholder: '👨‍✈️',
    title: 'Tank Crew',
    description: 'Crew members of a Mark IV tank',
    year: 1917,
    location: 'Cambrai',
    source: 'Tank Museum, Bovington',
  },

  // Medical photos
  field_hospital: {
    id: 'field_hospital',
    category: PHOTO_CATEGORIES.MEDICAL,
    placeholder: '🏥',
    title: 'Field Hospital',
    description: 'Casualty clearing station treating wounded',
    year: 1916,
    location: 'Behind the Lines',
    source: 'Red Cross Archives',
  },
  stretcher_bearers: {
    id: 'stretcher_bearers',
    category: PHOTO_CATEGORIES.MEDICAL,
    placeholder: '🩹',
    title: 'Stretcher Bearers',
    description: 'Medical orderlies carrying wounded from the front',
    year: 1917,
    location: 'Ypres Salient',
    source: 'Imperial War Museum',
  },

  // Officers photos
  staff_meeting: {
    id: 'staff_meeting',
    category: PHOTO_CATEGORIES.OFFICERS,
    placeholder: '📋',
    title: 'Staff Meeting',
    description: 'Officers planning an offensive operation',
    year: 1916,
    location: 'British HQ',
    source: 'National Archives',
  },

  // Battle-specific photos
  somme_bombardment: {
    id: 'somme_bombardment',
    category: PHOTO_CATEGORIES.SOMME,
    placeholder: '💣',
    title: 'Somme Bombardment',
    description: 'The week-long artillery barrage before July 1st',
    year: 1916,
    location: 'Somme Valley',
    source: 'Imperial War Museum',
  },
  somme_aftermath: {
    id: 'somme_aftermath',
    category: PHOTO_CATEGORIES.SOMME,
    placeholder: '🏚️',
    title: 'Aftermath',
    description: 'The devastated landscape after the battle',
    year: 1916,
    location: 'Somme',
    source: 'Library of Congress',
  },
  verdun_fortress: {
    id: 'verdun_fortress',
    category: PHOTO_CATEGORIES.VERDUN,
    placeholder: '🏰',
    title: 'Fort Douaumont',
    description: 'The fortress that became a symbol of French resistance',
    year: 1916,
    location: 'Verdun',
    source: 'French Military Archives',
  },
  ypres_ruins: {
    id: 'ypres_ruins',
    category: PHOTO_CATEGORIES.YPRES,
    placeholder: '🏛️',
    title: 'Ypres in Ruins',
    description: 'The destroyed Cloth Hall of Ypres',
    year: 1917,
    location: 'Ypres, Belgium',
    source: 'Imperial War Museum',
  },
  passchendaele_mud: {
    id: 'passchendaele_mud',
    category: PHOTO_CATEGORIES.YPRES,
    placeholder: '🌧️',
    title: 'The Mud of Passchendaele',
    description: 'Soldiers struggling through the notorious mud',
    year: 1917,
    location: 'Passchendaele',
    source: 'Canadian War Museum',
  },
  marne_taxi: {
    id: 'marne_taxi',
    category: PHOTO_CATEGORIES.MARNE,
    placeholder: '🚕',
    title: 'Taxis of the Marne',
    description: 'Paris taxis rushing troops to the front',
    year: 1914,
    location: 'Paris to the Marne',
    source: 'French National Archives',
  },

  // Victory/Armistice
  armistice_day: {
    id: 'armistice_day',
    category: PHOTO_CATEGORIES.VICTORIES,
    placeholder: '🎉',
    title: 'Armistice Day',
    description: 'Celebrations at the end of the war',
    year: 1918,
    location: 'London',
    source: 'Imperial War Museum',
  },
  victory_parade: {
    id: 'victory_parade',
    category: PHOTO_CATEGORIES.VICTORIES,
    placeholder: '🎖️',
    title: 'Victory Parade',
    description: 'Allied forces marching in victory',
    year: 1919,
    location: 'Paris',
    source: 'French Military Archives',
  },
};

// Mission-specific photo assignments
export const MISSION_PHOTOS = {
  1: ['trench_life_1', 'going_over_top'],
  2: ['artillery_barrage', 'trench_system'],
  3: ['night_trench', 'infantry_advance'],
  4: ['first_tanks', 'somme_bombardment'],
  5: ['howitzer_crew', 'trench_life_1'],
  6: ['going_over_top', 'infantry_advance'],
  7: ['field_hospital', 'stretcher_bearers'],
  8: ['staff_meeting', 'artillery_barrage'],
  9: ['verdun_fortress', 'trench_system'],
  10: ['tank_crew', 'first_tanks'],
  11: ['ypres_ruins', 'passchendaele_mud'],
  12: ['night_trench', 'going_over_top'],
  13: ['somme_bombardment', 'somme_aftermath'],
  14: ['marne_taxi', 'infantry_advance'],
  15: ['howitzer_crew', 'artillery_barrage'],
  16: ['rest_billets', 'trench_life_1'],
  17: ['field_hospital', 'staff_meeting'],
  18: ['passchendaele_mud', 'ypres_ruins'],
  19: ['tank_crew', 'infantry_advance'],
  20: ['armistice_day', 'victory_parade'],
};

// Faction-specific photos for diary
export const FACTION_PHOTOS = {
  british: ['trench_life_1', 'going_over_top', 'first_tanks', 'somme_bombardment'],
  french: ['verdun_fortress', 'marne_taxi', 'artillery_barrage', 'victory_parade'],
  german: ['trench_system', 'howitzer_crew', 'night_trench', 'infantry_advance'],
  american: ['infantry_advance', 'rest_billets', 'tank_crew', 'armistice_day'],
};

/**
 * Get photos for a specific mission
 */
export function getMissionPhotos(missionId) {
  const photoIds = MISSION_PHOTOS[missionId] || ['trench_life_1'];
  return photoIds.map(id => HISTORICAL_PHOTOS[id]).filter(Boolean);
}

/**
 * Get photos by category
 */
export function getPhotosByCategory(category) {
  return Object.values(HISTORICAL_PHOTOS).filter(
    photo => photo.category === category
  );
}

/**
 * Get a random photo from a category
 */
export function getRandomPhoto(category = null) {
  const photos = category
    ? getPhotosByCategory(category)
    : Object.values(HISTORICAL_PHOTOS);

  return photos[Math.floor(Math.random() * photos.length)];
}

/**
 * Get faction-appropriate photos for war diary
 */
export function getFactionPhotos(faction) {
  const photoIds = FACTION_PHOTOS[faction] || FACTION_PHOTOS.british;
  return photoIds.map(id => HISTORICAL_PHOTOS[id]).filter(Boolean);
}

/**
 * Get photo attribution text
 */
export function getPhotoAttribution(photo) {
  return `${photo.title} (${photo.year}) - ${photo.source}`;
}

export default {
  PHOTO_CATEGORIES,
  HISTORICAL_PHOTOS,
  MISSION_PHOTOS,
  FACTION_PHOTOS,
  getMissionPhotos,
  getPhotosByCategory,
  getRandomPhoto,
  getFactionPhotos,
  getPhotoAttribution,
};
