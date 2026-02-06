/**
 * WWI Tactical Game - Tutorial Data
 * Step-by-step tutorials for new players
 */

/**
 * Battle screen tutorial steps
 */
export const BATTLE_TUTORIAL_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome, Commander!',
    message: 'This is your first battle. Let me show you how to command your troops to victory.',
    icon: '🎖️',
  },
  {
    id: 'select_unit',
    title: 'Select a Unit',
    message: 'Tap on one of your soldiers (green outline) to select them. Each unit can move and attack once per turn.',
    icon: '👆',
    highlightType: 'player_units',
  },
  {
    id: 'movement',
    title: 'Movement',
    message: 'Blue tiles show where your unit can move. Tap a blue tile to move there. Different terrain affects movement speed.',
    icon: '🏃',
    highlightType: 'move_tiles',
  },
  {
    id: 'attack',
    title: 'Attack the Enemy',
    message: 'Red tiles show enemies in range. Tap a red tile to attack! Consider attacking from cover for better defense.',
    icon: '⚔️',
    highlightType: 'attack_tiles',
  },
  {
    id: 'terrain',
    title: 'Use Terrain',
    message: 'Trenches and buildings provide cover, reducing damage taken. Open ground is dangerous - stay behind cover!',
    icon: '🏰',
  },
  {
    id: 'end_turn',
    title: 'End Your Turn',
    message: 'When all units have acted, tap "End Turn". The enemy will then take their turn. Plan carefully!',
    icon: '⏭️',
    highlightType: 'end_turn_button',
  },
  {
    id: 'victory',
    title: 'Achieve Victory',
    message: 'Eliminate all enemies to win. Keep your soldiers alive - survivors become veterans with bonus stats!',
    icon: '🏆',
  },
];

/**
 * Menu screen tutorial steps
 */
export const MENU_TUTORIAL_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to the Great War',
    message: 'Command your forces through historical WWI battles. Build a veteran squad and lead them to glory!',
    icon: '🎖️',
  },
  {
    id: 'campaign',
    title: 'Campaign Mode',
    message: 'Play through historical missions in order. Each mission has unique objectives and terrain.',
    icon: '📜',
  },
  {
    id: 'command_hq',
    title: 'Command HQ',
    message: 'Before battle, visit Command HQ to select your nation, view your veterans, and plan your strategy.',
    icon: '🏛️',
  },
  {
    id: 'veterans',
    title: 'Your Veterans',
    message: 'Soldiers who survive battles become veterans with improved stats. Protect them - losing a veteran hurts!',
    icon: '⭐',
  },
];

/**
 * Deployment screen tutorial steps
 */
export const DEPLOYMENT_TUTORIAL_STEPS = [
  {
    id: 'choose_units',
    title: 'Choose Your Squad',
    message: 'Select which veterans to deploy in this mission. Each mission has a limited squad size.',
    icon: '👥',
  },
  {
    id: 'unit_types',
    title: 'Unit Types Matter',
    message: 'Riflemen are versatile, Machine Gunners deal high damage, Medics heal allies. Balance your team!',
    icon: '🔫',
  },
  {
    id: 'veteran_bonuses',
    title: 'Veteran Bonuses',
    message: 'Veterans have bonus HP, attack, or defense. Deploy your strongest for tough missions!',
    icon: '💪',
  },
];

/**
 * Contextual tips that appear during gameplay
 */
export const GAMEPLAY_TIPS = {
  // Unit selection tips
  unit_selected: [
    'Tip: Units can move AND attack in the same turn',
    'Tip: Attack first, then move to safety',
    'Tip: Check the unit panel for stats and abilities',
  ],

  // Movement tips
  entering_cover: [
    'Good choice! Cover reduces incoming damage',
    'Trenches provide excellent protection',
    'Staying in cover keeps your troops alive',
  ],

  leaving_cover: [
    'Warning: Open ground is dangerous!',
    'Moving into the open makes you vulnerable',
    'Consider if this move is worth the risk',
  ],

  // Combat tips
  attacking: [
    'Aim for isolated enemies first',
    'Flanking provides attack bonuses',
    'Machine guns are deadly against groups',
  ],

  critical_hit: [
    'Critical hit! Excellent shot!',
    'Right between the eyes!',
    'Perfect aim, Commander!',
  ],

  unit_killed_enemy: [
    'Enemy eliminated!',
    'One less to worry about',
    'Good shooting, soldier!',
  ],

  unit_damaged: [
    'Your unit took damage. Find cover!',
    'Pull back wounded units if possible',
    'Medics can heal nearby allies',
  ],

  // Turn tips
  turn_start: [
    'New turn! Plan your moves carefully',
    'Check enemy positions before moving',
    'Remember: move and attack each unit',
  ],

  all_units_acted: [
    'All units have acted. End your turn?',
    'Ready to see what the enemy does?',
    'Time to end your turn, Commander',
  ],

  // Victory/Defeat
  near_victory: [
    'Just one enemy left! Finish them!',
    'Victory is within reach!',
    'Press the attack!',
  ],

  in_danger: [
    'Your forces are in trouble!',
    'Consider a tactical retreat',
    'Protect your remaining units!',
  ],
};

/**
 * Get a random tip for a context
 */
export const getRandomTip = (context) => {
  const tips = GAMEPLAY_TIPS[context];
  if (!tips || tips.length === 0) return null;
  return tips[Math.floor(Math.random() * tips.length)];
};

/**
 * Check if tutorial should be shown
 */
export const shouldShowTutorial = async (tutorialId, loadGame) => {
  try {
    const result = await loadGame();
    if (!result.success) return true; // Show tutorial for new users

    const completedTutorials = result.gameState?.completedTutorials || [];
    return !completedTutorials.includes(tutorialId);
  } catch {
    return true;
  }
};

/**
 * Mark tutorial as completed
 */
export const completeTutorial = async (tutorialId, loadGame, saveGame) => {
  try {
    const result = await loadGame();
    const gameState = result.success ? result.gameState : {};

    const completedTutorials = gameState.completedTutorials || [];
    if (!completedTutorials.includes(tutorialId)) {
      completedTutorials.push(tutorialId);
    }

    await saveGame({
      ...gameState,
      completedTutorials,
    });
  } catch (error) {
    console.log('Error saving tutorial completion:', error);
  }
};

export default {
  BATTLE_TUTORIAL_STEPS,
  MENU_TUTORIAL_STEPS,
  DEPLOYMENT_TUTORIAL_STEPS,
  GAMEPLAY_TIPS,
  getRandomTip,
  shouldShowTutorial,
  completeTutorial,
};
