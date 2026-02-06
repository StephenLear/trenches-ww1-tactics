/**
 * WWI Tactical Game - Achievements & Trophies System
 * Track player accomplishments and award medals
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const ACHIEVEMENTS_KEY = '@ww1_achievements';

// Achievement categories
export const AchievementCategory = {
  COMBAT: 'combat',
  TACTICS: 'tactics',
  CAMPAIGN: 'campaign',
  VETERANS: 'veterans',
  MASTERY: 'mastery',
  HISTORIC: 'historic',
};

// Achievement rarity
export const AchievementRarity = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
};

// All achievements
export const ACHIEVEMENTS = {
  // COMBAT ACHIEVEMENTS
  first_blood: {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Defeat your first enemy unit',
    icon: '🩸',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'kills', count: 1 },
    points: 10,
  },

  sharpshooter: {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    description: 'Eliminate 50 enemy units',
    icon: '🎯',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'kills', count: 50 },
    points: 50,
  },

  ace_of_aces: {
    id: 'ace_of_aces',
    name: 'Ace of Aces',
    description: 'Eliminate 200 enemy units',
    icon: '✈️',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.RARE,
    condition: { type: 'kills', count: 200 },
    points: 100,
  },

  tank_buster: {
    id: 'tank_buster',
    name: 'Tank Buster',
    description: 'Destroy 10 enemy tanks',
    icon: '💥',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.RARE,
    condition: { type: 'tank_kills', count: 10 },
    points: 75,
  },

  no_mercy: {
    id: 'no_mercy',
    name: 'No Mercy',
    description: 'Eliminate all enemies in a single mission',
    icon: '☠️',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'total_elimination', count: 1 },
    points: 50,
  },

  critical_master: {
    id: 'critical_master',
    name: 'Critical Master',
    description: 'Land 25 critical hits',
    icon: '⚡',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'critical_hits', count: 25 },
    points: 40,
  },

  // TACTICS ACHIEVEMENTS
  flawless_victory: {
    id: 'flawless_victory',
    name: 'Flawless Victory',
    description: 'Complete a mission without losing any units',
    icon: '⭐',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'no_losses', count: 1 },
    points: 100,
  },

  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a mission in under 5 turns',
    icon: '⚡',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'quick_victory', turns: 5 },
    points: 75,
  },

  patient_tactician: {
    id: 'patient_tactician',
    name: 'Patient Tactician',
    description: 'Win a mission taking over 20 turns',
    icon: '🧠',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'long_victory', turns: 20 },
    points: 30,
  },

  defensive_master: {
    id: 'defensive_master',
    name: 'Defensive Master',
    description: 'Block 100 damage using cover',
    icon: '🛡️',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'damage_blocked', count: 100 },
    points: 40,
  },

  trench_warfare: {
    id: 'trench_warfare',
    name: 'Trench Warfare',
    description: 'Win 5 missions while holding trenches',
    icon: '🏚️',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'trench_victories', count: 5 },
    points: 50,
  },

  artillery_commander: {
    id: 'artillery_commander',
    name: 'Artillery Commander',
    description: 'Call in 20 artillery barrages',
    icon: '💣',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'artillery_calls', count: 20 },
    points: 40,
  },

  // CAMPAIGN ACHIEVEMENTS
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first mission',
    icon: '👣',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'missions_completed', count: 1 },
    points: 10,
  },

  veteran_commander: {
    id: 'veteran_commander',
    name: 'Veteran Commander',
    description: 'Complete 10 missions',
    icon: '🎖️',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'missions_completed', count: 10 },
    points: 50,
  },

  war_hero: {
    id: 'war_hero',
    name: 'War Hero',
    description: 'Complete all 20 campaign missions',
    icon: '🏆',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'missions_completed', count: 20 },
    points: 200,
  },

  all_nations: {
    id: 'all_nations',
    name: 'International Commander',
    description: 'Win missions as all four nations',
    icon: '🌍',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.RARE,
    condition: { type: 'all_factions', factions: ['british', 'french', 'german', 'american'] },
    points: 100,
  },

  // VETERANS ACHIEVEMENTS
  first_veteran: {
    id: 'first_veteran',
    name: 'First Veteran',
    description: 'Have a soldier survive 3 missions',
    icon: '🪖',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'veteran_missions', count: 3 },
    points: 20,
  },

  band_of_brothers: {
    id: 'band_of_brothers',
    name: 'Band of Brothers',
    description: 'Have 5 veterans with 10+ missions each',
    icon: '👥',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'experienced_veterans', count: 5, missions: 10 },
    points: 150,
  },

  sergeant_major: {
    id: 'sergeant_major',
    name: 'Sergeant Major',
    description: 'Promote a soldier to Sergeant',
    icon: '⚌',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'promotion', rank: 'sergeant' },
    points: 30,
  },

  old_guard: {
    id: 'old_guard',
    name: 'The Old Guard',
    description: 'Have a veteran survive 20 missions',
    icon: '👴',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.LEGENDARY,
    condition: { type: 'veteran_missions', count: 20 },
    points: 200,
  },

  memorial: {
    id: 'memorial',
    name: 'Lest We Forget',
    description: 'Visit the Memorial to honour the fallen',
    icon: '🌺',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'screen_visited', screen: 'Memorial' },
    points: 10,
  },

  // MASTERY ACHIEVEMENTS
  iron_man: {
    id: 'iron_man',
    name: 'Iron Man',
    description: 'Complete 5 missions on Hard difficulty',
    icon: '💪',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.RARE,
    condition: { type: 'difficulty_wins', difficulty: 'hard', count: 5 },
    points: 100,
  },

  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all missions with 3-star rating',
    icon: '⭐⭐⭐',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.LEGENDARY,
    condition: { type: 'all_three_star' },
    points: 300,
  },

  tech_master: {
    id: 'tech_master',
    name: 'Tech Master',
    description: 'Research all technologies',
    icon: '🔬',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.RARE,
    condition: { type: 'all_tech' },
    points: 75,
  },

  // HISTORIC ACHIEVEMENTS
  somme_survivor: {
    id: 'somme_survivor',
    name: 'Somme Survivor',
    description: 'Complete the Battle of the Somme mission',
    icon: '🇫🇷',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'mission_completed', missionId: 'somme' },
    points: 50,
  },

  verdun_victor: {
    id: 'verdun_victor',
    name: 'Verdun Victor',
    description: 'Complete the Verdun mission',
    icon: '🏰',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'mission_completed', missionId: 'verdun' },
    points: 50,
  },

  over_the_top: {
    id: 'over_the_top',
    name: 'Over The Top',
    description: 'Successfully assault an enemy trench line',
    icon: '⬆️',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'trench_assault', count: 1 },
    points: 25,
  },

  christmas_truce: {
    id: 'christmas_truce',
    name: 'Christmas Truce',
    description: 'Complete a mission without attacking for 3 turns',
    icon: '🎄',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'peaceful_turns', count: 3 },
    points: 100,
    hidden: true,
  },

  // ADDITIONAL COMBAT ACHIEVEMENTS
  cavalry_charge: {
    id: 'cavalry_charge',
    name: 'Cavalry Charge',
    description: 'Eliminate 3 enemies with cavalry in one mission',
    icon: '🐎',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'cavalry_kills_mission', count: 3 },
    points: 40,
  },

  sniper_elite: {
    id: 'sniper_elite',
    name: 'Sniper Elite',
    description: 'Get 5 kills with a single sniper in one mission',
    icon: '🔭',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.RARE,
    condition: { type: 'sniper_kills_mission', count: 5 },
    points: 75,
  },

  machine_gun_nest: {
    id: 'machine_gun_nest',
    name: 'Machine Gun Nest',
    description: 'Kill 10 enemies with machine guns',
    icon: '🔫',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'mg_kills', count: 10 },
    points: 35,
  },

  grenadier: {
    id: 'grenadier',
    name: 'Grenadier',
    description: 'Kill 15 enemies with grenades or mortars',
    icon: '💣',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'explosive_kills', count: 15 },
    points: 45,
  },

  gas_attack_survivor: {
    id: 'gas_attack_survivor',
    name: 'Gas Attack Survivor',
    description: 'Have a unit survive a gas attack',
    icon: '☣️',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.COMMON,
    condition: { type: 'survive_gas', count: 1 },
    points: 20,
  },

  // ADDITIONAL TACTICS ACHIEVEMENTS
  flanking_maneuver: {
    id: 'flanking_maneuver',
    name: 'Flanking Maneuver',
    description: 'Attack an enemy from behind 10 times',
    icon: '↩️',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'flank_attacks', count: 10 },
    points: 40,
  },

  combined_arms: {
    id: 'combined_arms',
    name: 'Combined Arms',
    description: 'Use infantry, artillery, and armor in one attack',
    icon: '⚔️',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'combined_arms', count: 1 },
    points: 60,
  },

  supply_master: {
    id: 'supply_master',
    name: 'Supply Master',
    description: 'Complete a mission with no units in low supply',
    icon: '📦',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'full_supply_victory', count: 1 },
    points: 35,
  },

  reinforcement_expert: {
    id: 'reinforcement_expert',
    name: 'Reinforcement Expert',
    description: 'Call in 30 reinforcement packages',
    icon: '📯',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'reinforcements_called', count: 30 },
    points: 65,
  },

  weather_warrior: {
    id: 'weather_warrior',
    name: 'Weather Warrior',
    description: 'Win missions in rain, fog, and snow',
    icon: '🌦️',
    category: AchievementCategory.TACTICS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'weather_victories', weather: ['rain', 'fog', 'snow'] },
    points: 70,
  },

  // ADDITIONAL CAMPAIGN ACHIEVEMENTS
  night_fighter: {
    id: 'night_fighter',
    name: 'Night Fighter',
    description: 'Complete 3 night missions',
    icon: '🌙',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'night_victories', count: 3 },
    points: 45,
  },

  eastern_front: {
    id: 'eastern_front',
    name: 'Eastern Front',
    description: 'Complete all Eastern Front missions',
    icon: '🦅',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.RARE,
    condition: { type: 'front_completed', front: 'eastern' },
    points: 80,
  },

  western_front: {
    id: 'western_front',
    name: 'Western Front',
    description: 'Complete all Western Front missions',
    icon: '🏳️',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.RARE,
    condition: { type: 'front_completed', front: 'western' },
    points: 80,
  },

  skirmish_veteran: {
    id: 'skirmish_veteran',
    name: 'Skirmish Veteran',
    description: 'Win 10 skirmish battles',
    icon: '⚔️',
    category: AchievementCategory.CAMPAIGN,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'skirmish_wins', count: 10 },
    points: 40,
  },

  // ADDITIONAL VETERANS ACHIEVEMENTS
  medic_savior: {
    id: 'medic_savior',
    name: 'Medic Savior',
    description: 'Heal 100 HP total with medics',
    icon: '❤️‍🩹',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'hp_healed', count: 100 },
    points: 35,
  },

  officer_corps: {
    id: 'officer_corps',
    name: 'Officer Corps',
    description: 'Promote 5 soldiers to Officer rank',
    icon: '🎖️',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'officers_promoted', count: 5 },
    points: 75,
  },

  ironman_veteran: {
    id: 'ironman_veteran',
    name: 'Ironman Veteran',
    description: 'Have a veteran with 50+ kills',
    icon: '💀',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'veteran_kills', count: 50 },
    points: 120,
  },

  lucky_survivor: {
    id: 'lucky_survivor',
    name: 'Lucky Survivor',
    description: 'Have a veteran survive with 1 HP',
    icon: '🍀',
    category: AchievementCategory.VETERANS,
    rarity: AchievementRarity.RARE,
    condition: { type: 'survive_1hp', count: 1 },
    points: 50,
    hidden: true,
  },

  // ADDITIONAL MASTERY ACHIEVEMENTS
  nightmare_mode: {
    id: 'nightmare_mode',
    name: 'Nightmare Mode',
    description: 'Complete a mission on Hard with no losses',
    icon: '😈',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.LEGENDARY,
    condition: { type: 'hard_no_losses', count: 1 },
    points: 250,
  },

  speedrunner: {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Complete any mission in 3 turns or less',
    icon: '⏱️',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'quick_victory', turns: 3 },
    points: 150,
  },

  collector: {
    id: 'collector',
    name: 'Collector',
    description: 'Earn 30 other achievements',
    icon: '🏅',
    category: AchievementCategory.MASTERY,
    rarity: AchievementRarity.EPIC,
    condition: { type: 'achievements_unlocked', count: 30 },
    points: 100,
  },

  // ADDITIONAL HISTORIC ACHIEVEMENTS
  gallipoli: {
    id: 'gallipoli',
    name: 'Gallipoli Campaign',
    description: 'Complete the Gallipoli Landing mission',
    icon: '🏖️',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'mission_completed', missionId: 'gallipoli' },
    points: 50,
  },

  vimy_ridge: {
    id: 'vimy_ridge',
    name: 'Vimy Ridge',
    description: 'Complete the Vimy Ridge mission',
    icon: '🇨🇦',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.UNCOMMON,
    condition: { type: 'mission_completed', missionId: 'vimy' },
    points: 50,
  },

  hundred_days: {
    id: 'hundred_days',
    name: 'Hundred Days Offensive',
    description: 'Complete the final campaign mission',
    icon: '🎺',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.RARE,
    condition: { type: 'mission_completed', missionId: 'armistice' },
    points: 75,
  },

  war_is_over: {
    id: 'war_is_over',
    name: 'The War Is Over',
    description: 'Complete the entire campaign',
    icon: '🕊️',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.LEGENDARY,
    condition: { type: 'campaign_complete' },
    points: 300,
  },

  red_baron: {
    id: 'red_baron',
    name: 'Red Baron',
    description: 'Shoot down an enemy aircraft',
    icon: '✈️',
    category: AchievementCategory.HISTORIC,
    rarity: AchievementRarity.RARE,
    condition: { type: 'aircraft_killed', count: 1 },
    points: 60,
    hidden: true,
  },
};

/**
 * Achievement Manager
 */
export class AchievementManager {
  constructor() {
    this.unlockedAchievements = [];
    this.progress = {};
    this.recentUnlocks = [];
  }

  /**
   * Load achievements from storage
   */
  async load() {
    try {
      const data = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.unlockedAchievements = parsed.unlocked || [];
        this.progress = parsed.progress || {};
      }
    } catch (error) {
      console.log('Error loading achievements:', error);
    }
  }

  /**
   * Save achievements to storage
   */
  async save() {
    try {
      await AsyncStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify({
        unlocked: this.unlockedAchievements,
        progress: this.progress,
      }));
    } catch (error) {
      console.log('Error saving achievements:', error);
    }
  }

  /**
   * Check if achievement is unlocked
   */
  isUnlocked(achievementId) {
    return this.unlockedAchievements.includes(achievementId);
  }

  /**
   * Unlock an achievement
   */
  unlock(achievementId) {
    if (this.isUnlocked(achievementId)) return null;

    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return null;

    this.unlockedAchievements.push(achievementId);
    this.recentUnlocks.push({
      ...achievement,
      unlockedAt: Date.now(),
    });
    this.save();

    return achievement;
  }

  /**
   * Update progress for an achievement
   */
  updateProgress(achievementId, value) {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement || this.isUnlocked(achievementId)) return null;

    this.progress[achievementId] = (this.progress[achievementId] || 0) + value;

    const condition = achievement.condition;
    if (condition.count && this.progress[achievementId] >= condition.count) {
      return this.unlock(achievementId);
    }

    return null;
  }

  /**
   * Check achievements based on game event
   */
  checkEvent(eventType, data = {}) {
    const unlocked = [];

    for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
      if (this.isUnlocked(id)) continue;

      const condition = achievement.condition;

      switch (condition.type) {
        case 'kills':
          if (eventType === 'unit_killed') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'tank_kills':
          if (eventType === 'unit_killed' && data.unitType === 'tank') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'critical_hits':
          if (eventType === 'critical_hit') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'missions_completed':
          if (eventType === 'mission_complete') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'no_losses':
          if (eventType === 'mission_complete' && data.unitsLost === 0) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'quick_victory':
          if (eventType === 'mission_complete' && data.turns <= condition.turns) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'long_victory':
          if (eventType === 'mission_complete' && data.turns >= condition.turns) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'total_elimination':
          if (eventType === 'mission_complete' && data.totalElimination) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'screen_visited':
          if (eventType === 'screen_visit' && data.screen === condition.screen) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'artillery_calls':
          if (eventType === 'artillery_called') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'damage_blocked':
          if (eventType === 'damage_blocked') {
            const result = this.updateProgress(id, data.amount);
            if (result) unlocked.push(result);
          }
          break;

        case 'cavalry_kills_mission':
          if (eventType === 'unit_killed' && data.unitType === 'cavalry' && data.attackerType === 'cavalry') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'mg_kills':
          if (eventType === 'unit_killed' && data.attackerType === 'machinegun') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'explosive_kills':
          if (eventType === 'unit_killed' && ['mortar', 'grenade', 'artillery'].includes(data.weaponType)) {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'flank_attacks':
          if (eventType === 'flank_attack') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'reinforcements_called':
          if (eventType === 'reinforcement_called') {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'hp_healed':
          if (eventType === 'unit_healed') {
            const result = this.updateProgress(id, data.amount);
            if (result) unlocked.push(result);
          }
          break;

        case 'skirmish_wins':
          if (eventType === 'skirmish_complete' && data.victory) {
            const result = this.updateProgress(id, 1);
            if (result) unlocked.push(result);
          }
          break;

        case 'survive_gas':
          if (eventType === 'gas_survived') {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'survive_1hp':
          if (eventType === 'unit_survived' && data.hp === 1) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'hard_no_losses':
          if (eventType === 'mission_complete' && data.difficulty === 'hard' && data.unitsLost === 0) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'campaign_complete':
          if (eventType === 'campaign_complete') {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;

        case 'achievements_unlocked':
          if (this.unlockedAchievements.length >= condition.count) {
            const result = this.unlock(id);
            if (result) unlocked.push(result);
          }
          break;
      }
    }

    return unlocked;
  }

  /**
   * Get all achievements with status
   */
  getAllAchievements() {
    return Object.values(ACHIEVEMENTS).map(achievement => ({
      ...achievement,
      unlocked: this.isUnlocked(achievement.id),
      progress: this.progress[achievement.id] || 0,
    }));
  }

  /**
   * Get achievements by category
   */
  getByCategory(category) {
    return this.getAllAchievements().filter(a => a.category === category);
  }

  /**
   * Get total points
   */
  getTotalPoints() {
    return this.unlockedAchievements.reduce((total, id) => {
      return total + (ACHIEVEMENTS[id]?.points || 0);
    }, 0);
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage() {
    const total = Object.keys(ACHIEVEMENTS).length;
    const unlocked = this.unlockedAchievements.length;
    return Math.floor((unlocked / total) * 100);
  }

  /**
   * Clear recent unlocks (after showing to user)
   */
  clearRecentUnlocks() {
    const recent = [...this.recentUnlocks];
    this.recentUnlocks = [];
    return recent;
  }
}

/**
 * Get rarity color
 */
export const getRarityColor = (rarity) => {
  switch (rarity) {
    case AchievementRarity.COMMON:
      return '#a8a8a8';
    case AchievementRarity.UNCOMMON:
      return '#4a7c59';
    case AchievementRarity.RARE:
      return '#4a90e2';
    case AchievementRarity.EPIC:
      return '#9932CC';
    case AchievementRarity.LEGENDARY:
      return '#d4af37';
    default:
      return '#666666';
  }
};

/**
 * Get category name
 */
export const getCategoryName = (category) => {
  switch (category) {
    case AchievementCategory.COMBAT:
      return 'Combat';
    case AchievementCategory.TACTICS:
      return 'Tactics';
    case AchievementCategory.CAMPAIGN:
      return 'Campaign';
    case AchievementCategory.VETERANS:
      return 'Veterans';
    case AchievementCategory.MASTERY:
      return 'Mastery';
    case AchievementCategory.HISTORIC:
      return 'Historic';
    default:
      return 'Other';
  }
};

// Singleton instance
export const achievementManager = new AchievementManager();

export default {
  AchievementCategory,
  AchievementRarity,
  ACHIEVEMENTS,
  AchievementManager,
  achievementManager,
  getRarityColor,
  getCategoryName,
};
