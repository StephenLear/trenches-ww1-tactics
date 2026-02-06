/**
 * WWI Tactical Game - Historical Photos
 * Period-appropriate images for briefings and war diary
 *
 * Images sourced from Wikimedia Commons (Public Domain)
 * All images are 100+ years old and free for commercial use
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

// Static image imports - Metro bundler requires these to be static
const IMAGES = {
  trench_life_1: require('../../assets/photos/trench_life_1.jpg'),
  trench_system: require('../../assets/photos/trench_system.jpg'),
  night_trench: require('../../assets/photos/night_trench.jpg'),
  artillery_barrage: require('../../assets/photos/artillery_barrage.jpg'),
  howitzer_crew: require('../../assets/photos/howitzer_crew.jpg'),
  going_over_top: require('../../assets/photos/going_over_top.jpg'),
  infantry_advance: require('../../assets/photos/infantry_advance.jpg'),
  rest_billets: require('../../assets/photos/rest_billets.jpg'),
  first_tanks: require('../../assets/photos/first_tanks.jpg'),
  tank_crew: require('../../assets/photos/tank_crew.jpg'),
  field_hospital: require('../../assets/photos/field_hospital.jpg'),
  stretcher_bearers: require('../../assets/photos/stretcher_bearers.jpg'),
  staff_meeting: require('../../assets/photos/staff_meeting.jpg'),
  somme_bombardment: require('../../assets/photos/somme_bombardment.jpg'),
  somme_aftermath: require('../../assets/photos/somme_aftermath.jpg'),
  verdun_fortress: require('../../assets/photos/verdun_fortress.jpg'),
  ypres_ruins: require('../../assets/photos/ypres_ruins.jpg'),
  passchendaele_mud: require('../../assets/photos/passchendaele_mud.jpg'),
  marne_taxi: require('../../assets/photos/marne_taxi.jpg'),
  armistice_day: require('../../assets/photos/armistice_day.jpg'),
  victory_parade: require('../../assets/photos/victory_parade.jpg'),
};

// Historical photo data with descriptions
export const HISTORICAL_PHOTOS = {
  // Trench warfare photos
  trench_life_1: {
    id: 'trench_life_1',
    category: PHOTO_CATEGORIES.TRENCHES,
    image: IMAGES.trench_life_1,
    placeholder: '🏚️',
    title: 'Life in the Trenches',
    description: 'British soldiers in a front-line trench, 1916',
    year: 1916,
    location: 'Western Front',
    source: 'Wikimedia Commons',
  },
  trench_system: {
    id: 'trench_system',
    category: PHOTO_CATEGORIES.TRENCHES,
    image: IMAGES.trench_system,
    placeholder: '⛏️',
    title: 'Trench System',
    description: 'Aerial view of complex trench networks',
    year: 1917,
    location: 'Flanders',
    source: 'Wikimedia Commons',
  },
  night_trench: {
    id: 'night_trench',
    category: PHOTO_CATEGORIES.TRENCHES,
    image: IMAGES.night_trench,
    placeholder: '🌙',
    title: 'Night Watch',
    description: 'Soldiers on night sentry duty',
    year: 1916,
    location: 'Somme Sector',
    source: 'Wikimedia Commons',
  },

  // Artillery photos
  artillery_barrage: {
    id: 'artillery_barrage',
    category: PHOTO_CATEGORIES.ARTILLERY,
    image: IMAGES.artillery_barrage,
    placeholder: '💥',
    title: 'Artillery Barrage',
    description: 'Heavy guns firing during an offensive',
    year: 1916,
    location: 'Battle of the Somme',
    source: 'Wikimedia Commons',
  },
  howitzer_crew: {
    id: 'howitzer_crew',
    category: PHOTO_CATEGORIES.ARTILLERY,
    image: IMAGES.howitzer_crew,
    placeholder: '🎯',
    title: 'Howitzer Crew',
    description: 'Crew operating a 9.2-inch howitzer',
    year: 1917,
    location: 'Arras',
    source: 'Wikimedia Commons',
  },

  // Infantry photos
  going_over_top: {
    id: 'going_over_top',
    category: PHOTO_CATEGORIES.INFANTRY,
    image: IMAGES.going_over_top,
    placeholder: '⚔️',
    title: 'Going Over the Top',
    description: 'Infantry leaving trenches during an assault',
    year: 1916,
    location: 'Somme',
    source: 'Wikimedia Commons',
  },
  infantry_advance: {
    id: 'infantry_advance',
    category: PHOTO_CATEGORIES.INFANTRY,
    image: IMAGES.infantry_advance,
    placeholder: '🚶',
    title: 'Infantry Advance',
    description: 'Soldiers advancing across No Mans Land',
    year: 1917,
    location: 'Passchendaele',
    source: 'Wikimedia Commons',
  },
  rest_billets: {
    id: 'rest_billets',
    category: PHOTO_CATEGORIES.INFANTRY,
    image: IMAGES.rest_billets,
    placeholder: '😴',
    title: 'Rest Behind Lines',
    description: 'Soldiers resting in reserve billets',
    year: 1916,
    location: 'France',
    source: 'Wikimedia Commons',
  },

  // Tank photos
  first_tanks: {
    id: 'first_tanks',
    category: PHOTO_CATEGORIES.TANKS,
    image: IMAGES.first_tanks,
    placeholder: '🛡️',
    title: 'First Tanks in Action',
    description: 'Mark I tanks at the Battle of the Somme',
    year: 1916,
    location: 'Flers-Courcelette',
    source: 'Wikimedia Commons',
  },
  tank_crew: {
    id: 'tank_crew',
    category: PHOTO_CATEGORIES.TANKS,
    image: IMAGES.tank_crew,
    placeholder: '👨‍✈️',
    title: 'Tank Crew',
    description: 'Crew members of a Mark IV tank',
    year: 1917,
    location: 'Cambrai',
    source: 'Wikimedia Commons',
  },

  // Medical photos
  field_hospital: {
    id: 'field_hospital',
    category: PHOTO_CATEGORIES.MEDICAL,
    image: IMAGES.field_hospital,
    placeholder: '🏥',
    title: 'Field Hospital',
    description: 'Casualty clearing station treating wounded',
    year: 1916,
    location: 'Behind the Lines',
    source: 'Wikimedia Commons',
  },
  stretcher_bearers: {
    id: 'stretcher_bearers',
    category: PHOTO_CATEGORIES.MEDICAL,
    image: IMAGES.stretcher_bearers,
    placeholder: '🩹',
    title: 'Stretcher Bearers',
    description: 'Medical orderlies carrying wounded from the front',
    year: 1917,
    location: 'Ypres Salient',
    source: 'Wikimedia Commons',
  },

  // Officers photos
  staff_meeting: {
    id: 'staff_meeting',
    category: PHOTO_CATEGORIES.OFFICERS,
    image: IMAGES.staff_meeting,
    placeholder: '📋',
    title: 'Staff Meeting',
    description: 'Officers planning an offensive operation',
    year: 1916,
    location: 'British HQ',
    source: 'Wikimedia Commons',
  },

  // Battle-specific photos
  somme_bombardment: {
    id: 'somme_bombardment',
    category: PHOTO_CATEGORIES.SOMME,
    image: IMAGES.somme_bombardment,
    placeholder: '💣',
    title: 'Somme Bombardment',
    description: 'The week-long artillery barrage before July 1st',
    year: 1916,
    location: 'Somme Valley',
    source: 'Wikimedia Commons',
  },
  somme_aftermath: {
    id: 'somme_aftermath',
    category: PHOTO_CATEGORIES.SOMME,
    image: IMAGES.somme_aftermath,
    placeholder: '🏚️',
    title: 'Aftermath',
    description: 'The devastated landscape after the battle',
    year: 1916,
    location: 'Somme',
    source: 'Wikimedia Commons',
  },
  verdun_fortress: {
    id: 'verdun_fortress',
    category: PHOTO_CATEGORIES.VERDUN,
    image: IMAGES.verdun_fortress,
    placeholder: '🏰',
    title: 'Fort Douaumont',
    description: 'The fortress that became a symbol of French resistance',
    year: 1916,
    location: 'Verdun',
    source: 'Wikimedia Commons',
  },
  ypres_ruins: {
    id: 'ypres_ruins',
    category: PHOTO_CATEGORIES.YPRES,
    image: IMAGES.ypres_ruins,
    placeholder: '🏛️',
    title: 'Ypres in Ruins',
    description: 'The destroyed Cloth Hall of Ypres',
    year: 1917,
    location: 'Ypres, Belgium',
    source: 'Wikimedia Commons',
  },
  passchendaele_mud: {
    id: 'passchendaele_mud',
    category: PHOTO_CATEGORIES.YPRES,
    image: IMAGES.passchendaele_mud,
    placeholder: '🌧️',
    title: 'The Mud of Passchendaele',
    description: 'Soldiers struggling through the notorious mud',
    year: 1917,
    location: 'Passchendaele',
    source: 'Wikimedia Commons',
  },
  marne_taxi: {
    id: 'marne_taxi',
    category: PHOTO_CATEGORIES.MARNE,
    image: IMAGES.marne_taxi,
    placeholder: '🚕',
    title: 'Taxis of the Marne',
    description: 'Paris taxis rushing troops to the front',
    year: 1914,
    location: 'Paris to the Marne',
    source: 'Wikimedia Commons',
  },

  // Victory/Armistice
  armistice_day: {
    id: 'armistice_day',
    category: PHOTO_CATEGORIES.VICTORIES,
    image: IMAGES.armistice_day,
    placeholder: '🎉',
    title: 'Armistice Day',
    description: 'Celebrations at the end of the war',
    year: 1918,
    location: 'London',
    source: 'Wikimedia Commons',
  },
  victory_parade: {
    id: 'victory_parade',
    category: PHOTO_CATEGORIES.VICTORIES,
    image: IMAGES.victory_parade,
    placeholder: '🎖️',
    title: 'Victory Parade',
    description: 'Allied forces marching in victory',
    year: 1919,
    location: 'Paris',
    source: 'Wikimedia Commons',
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

/**
 * Check if a photo has an actual image loaded
 */
export function hasImage(photo) {
  return photo && photo.image !== null;
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
  hasImage,
};
