/**
 * WWI Tactical Game - Command Radio Chatter System
 * Audio/text of orders and communications during battle
 */

// Chatter types
export const ChatterType = {
  // Orders
  MOVE_ORDER: 'move_order',
  ATTACK_ORDER: 'attack_order',
  DEFEND_ORDER: 'defend_order',
  RETREAT_ORDER: 'retreat_order',

  // Combat events
  CONTACT: 'contact',
  UNDER_FIRE: 'under_fire',
  CASUALTIES: 'casualties',
  ENEMY_DOWN: 'enemy_down',
  CRITICAL_HIT: 'critical_hit',

  // Support
  ARTILLERY_REQUEST: 'artillery_request',
  ARTILLERY_INCOMING: 'artillery_incoming',
  REINFORCEMENTS: 'reinforcements',
  MEDIC_NEEDED: 'medic_needed',

  // Status
  POSITION_SECURED: 'position_secured',
  OBJECTIVE_TAKEN: 'objective_taken',
  LOW_AMMO: 'low_ammo',
  MORALE_LOW: 'morale_low',
  MORALE_HIGH: 'morale_high',

  // Weather/Environment
  GAS_ALERT: 'gas_alert',
  VISIBILITY_LOW: 'visibility_low',

  // Victory/Defeat
  VICTORY: 'victory',
  DEFEAT: 'defeat',
  TURN_START: 'turn_start',
};

// Radio chatter messages by type and faction
const CHATTER_MESSAGES = {
  // Movement orders
  [ChatterType.MOVE_ORDER]: {
    british: [
      'Right lads, move up! Keep your heads down!',
      'Advance to that position, double time!',
      'Forward men! No stopping now!',
      'Move it! Jerry won\'t wait for us!',
    ],
    french: [
      'En avant! Avancez!',
      'Move forward, mes amis!',
      'To the position, vite!',
    ],
    german: [
      'Vorwärts! Schnell!',
      'Move to position! Los!',
      'Advance! Keep formation!',
    ],
    american: [
      'Let\'s go, boys! Move out!',
      'Get moving, soldier!',
      'Advance to that position, on the double!',
    ],
  },

  // Attack orders
  [ChatterType.ATTACK_ORDER]: {
    british: [
      'Fix bayonets! Over the top, lads!',
      'Fire at will! Give \'em hell!',
      'Open fire! Target that position!',
      'Engage the enemy! For King and Country!',
    ],
    french: [
      'Feu! Pour la France!',
      'Attack! Tirez!',
      'Engage! Vive la France!',
    ],
    german: [
      'Feuer! Für das Vaterland!',
      'Attack! Angriff!',
      'Engage the enemy! Feuer frei!',
    ],
    american: [
      'Open fire! Let \'em have it!',
      'Attack! Show no mercy!',
      'Fire! For liberty!',
    ],
  },

  // Enemy contact
  [ChatterType.CONTACT]: {
    british: [
      'Contact! Enemy spotted ahead!',
      'Fritz at twelve o\'clock!',
      'Eyes front! Enemy position identified!',
      'Tally-ho! Enemy in sight!',
    ],
    french: [
      'Contact! Ennemi repéré!',
      'Enemy ahead! Attention!',
      'Boche spotted!',
    ],
    german: [
      'Feindkontakt! Enemy spotted!',
      'Contact! Tommy ahead!',
      'Enemy position identified!',
    ],
    american: [
      'Contact! Got eyes on the enemy!',
      'Enemy spotted! Twelve o\'clock!',
      'Heads up! Hostiles ahead!',
    ],
  },

  // Under fire
  [ChatterType.UNDER_FIRE]: {
    british: [
      'Taking fire! Get down!',
      'We\'re being shot at! Find cover!',
      'Incoming! Heads down!',
      'They\'ve got us pinned!',
    ],
    french: [
      'On nous tire dessus! À couvert!',
      'Incoming fire! Cover!',
      'We are pinned down!',
    ],
    german: [
      'Wir werden beschossen! Deckung!',
      'Taking fire! Get to cover!',
      'Feindliches Feuer! Down!',
    ],
    american: [
      'We\'re taking fire! Hit the dirt!',
      'Incoming! Get down!',
      'They\'ve got us pinned! Find cover!',
    ],
  },

  // Casualties
  [ChatterType.CASUALTIES]: {
    british: [
      'Man down! Stretcher bearer!',
      'We\'ve got wounded! Need a medic!',
      'Casualties reported. Send help.',
      'Soldier hit! Corpsman!',
    ],
    french: [
      'Homme à terre! Médecin!',
      'Casualties! We need help!',
      'Blessé! Send medic!',
    ],
    german: [
      'Mann gefallen! Sanitäter!',
      'Casualties! Medic needed!',
      'Wounded! Hilfe!',
    ],
    american: [
      'Man down! Medic!',
      'We got wounded! Need a corpsman!',
      'Casualty! Get a medic over here!',
    ],
  },

  // Enemy down
  [ChatterType.ENEMY_DOWN]: {
    british: [
      'Got him! One less Fritz!',
      'Enemy down!',
      'Target neutralized!',
      'Good shot! He\'s done for!',
    ],
    french: [
      'Touché! Enemy down!',
      'Boche eliminated!',
      'Target down!',
    ],
    german: [
      'Getroffen! Enemy down!',
      'Target eliminated!',
      'Tommy down!',
    ],
    american: [
      'Got \'im! He\'s down!',
      'Enemy neutralized!',
      'Target eliminated! Good shooting!',
    ],
  },

  // Critical hit
  [ChatterType.CRITICAL_HIT]: {
    british: [
      'Direct hit! Bloody good shot!',
      'Right between the eyes!',
      'Perfect shot! He won\'t get up from that!',
    ],
    french: [
      'Coup critique! Parfait!',
      'Direct hit! Excellent!',
    ],
    german: [
      'Volltreffer! Perfekt!',
      'Critical hit! Ausgezeichnet!',
    ],
    american: [
      'Bullseye! That\'s how it\'s done!',
      'Critical hit! Hell yeah!',
    ],
  },

  // Artillery request
  [ChatterType.ARTILLERY_REQUEST]: {
    british: [
      'Requesting artillery support! Grid reference follows!',
      'Need the big guns! Coordinates coming!',
      'Fire mission! Target identified!',
    ],
    french: [
      'Demande appui artillerie! Coordonnées suivent!',
      'Artillery support needed!',
    ],
    german: [
      'Artillerieunterstützung anfordern!',
      'Request fire mission!',
    ],
    american: [
      'Calling in the big guns! Fire mission requested!',
      'Need artillery support, ASAP!',
    ],
  },

  // Artillery incoming
  [ChatterType.ARTILLERY_INCOMING]: {
    british: [
      'Incoming! Take cover!',
      'Artillery! Get to the dugouts!',
      'Shells incoming! Heads down!',
    ],
    french: [
      'Artillerie! À couvert!',
      'Incoming shells! Cover!',
    ],
    german: [
      'Artillerie! In Deckung!',
      'Shells incoming! Take cover!',
    ],
    american: [
      'Incoming! Hit the deck!',
      'Artillery barrage! Take cover!',
    ],
  },

  // Reinforcements
  [ChatterType.REINFORCEMENTS]: {
    british: [
      'Reinforcements arriving! The cavalry\'s here!',
      'Fresh troops coming up the line!',
      'Support has arrived! Thank God!',
    ],
    french: [
      'Renforts arrivés! Courage!',
      'Reinforcements here!',
    ],
    german: [
      'Verstärkung eingetroffen!',
      'Reinforcements have arrived!',
    ],
    american: [
      'Cavalry\'s here, boys! We got backup!',
      'Reinforcements rolling in!',
    ],
  },

  // Medic needed
  [ChatterType.MEDIC_NEEDED]: {
    british: [
      'Medic! We need a stretcher bearer here!',
      'Corpsman! Man down!',
      'Medical assistance required!',
    ],
    french: [
      'Médecin! Vite!',
      'Medical help needed!',
    ],
    german: [
      'Sanitäter! Schnell!',
      'Medical assistance!',
    ],
    american: [
      'Medic! We got wounded!',
      'Corpsman up! Need help!',
    ],
  },

  // Position secured
  [ChatterType.POSITION_SECURED]: {
    british: [
      'Position secured! Dig in, lads!',
      'We\'ve got this ground! Hold the line!',
      'Area clear! Consolidating position!',
    ],
    french: [
      'Position sécurisée! Tenez bon!',
      'Area secured! Hold!',
    ],
    german: [
      'Position gesichert! Halten!',
      'Area secured! Dig in!',
    ],
    american: [
      'Position secured! Dig in, boys!',
      'We got this ground! Hold it!',
    ],
  },

  // Objective taken
  [ChatterType.OBJECTIVE_TAKEN]: {
    british: [
      'Objective captured! Well done, men!',
      'Mission accomplished! The position is ours!',
      'We\'ve taken the objective! Hurrah!',
    ],
    french: [
      'Objectif pris! Victoire!',
      'Mission accomplished! Bravo!',
    ],
    german: [
      'Ziel genommen! Gut gemacht!',
      'Objective secured! Ausgezeichnet!',
    ],
    american: [
      'Objective captured! Outstanding!',
      'Mission accomplished! We did it!',
    ],
  },

  // Gas alert
  [ChatterType.GAS_ALERT]: {
    british: [
      'GAS! GAS! Masks on! Now!',
      'Chemical attack! Get your respirators!',
      'Gas cloud approaching! Masks!',
    ],
    french: [
      'GAZ! Masques! Vite!',
      'Chemical attack! Masks on!',
    ],
    german: [
      'GAS! Gasmasken auf!',
      'Chemical attack! Masks!',
    ],
    american: [
      'GAS! GAS! Masks on NOW!',
      'Gas attack! Get your masks!',
    ],
  },

  // Morale high
  [ChatterType.MORALE_HIGH]: {
    british: [
      'The men are in good spirits, sir!',
      'Morale is high! We can win this!',
      'The lads are eager for a fight!',
    ],
    french: [
      'Le moral est haut!',
      'The men are ready!',
    ],
    german: [
      'Die Moral ist hoch!',
      'Men are in good spirits!',
    ],
    american: [
      'Morale\'s high, sir! The boys are ready!',
      'Spirits are up! Let\'s finish this!',
    ],
  },

  // Turn start
  [ChatterType.TURN_START]: {
    british: [
      'New orders coming in. Stand ready.',
      'Right, what\'s the situation?',
      'Awaiting your orders, sir.',
    ],
    french: [
      'En attente des ordres.',
      'Ready for orders, mon commandant.',
    ],
    german: [
      'Warten auf Befehle.',
      'Ready for orders, Herr Kommandant.',
    ],
    american: [
      'Standing by for orders.',
      'What\'s the play, sir?',
    ],
  },

  // Victory
  [ChatterType.VICTORY]: {
    british: [
      'Victory! Three cheers for the King!',
      'We\'ve done it! The day is ours!',
      'Fritz is on the run! Victory!',
    ],
    french: [
      'Victoire! Vive la France!',
      'We have won! Magnifique!',
    ],
    german: [
      'Sieg! Für das Vaterland!',
      'Victory is ours! Hoch!',
    ],
    american: [
      'We won! America, hell yeah!',
      'Victory! The boys did good!',
    ],
  },

  // Defeat
  [ChatterType.DEFEAT]: {
    british: [
      'Fall back! We\'ve lost this one.',
      'Retreat! Live to fight another day!',
      'Pull back! Regroup!',
    ],
    french: [
      'Retraite! Nous reviendrons!',
      'Fall back! We will return!',
    ],
    german: [
      'Rückzug! Wir kommen wieder!',
      'Retreat! Regroup!',
    ],
    american: [
      'Fall back! We\'ll get \'em next time!',
      'Retreat! Regroup and try again!',
    ],
  },
};

/**
 * Get random chatter message for event type
 */
export const getChatter = (type, faction = 'british') => {
  const messages = CHATTER_MESSAGES[type];
  if (!messages) return null;

  const factionMessages = messages[faction] || messages.british;
  return factionMessages[Math.floor(Math.random() * factionMessages.length)];
};

/**
 * Get chatter with audio cue info
 */
export const getChatterWithAudio = (type, faction = 'british') => {
  const message = getChatter(type, faction);
  if (!message) return null;

  return {
    text: message,
    type,
    faction,
    audioFile: `chatter_${type}`, // For future audio integration
    priority: getChatterPriority(type),
    duration: 3000, // Display duration in ms
  };
};

/**
 * Get priority for chatter type (higher = more important)
 */
const getChatterPriority = (type) => {
  switch (type) {
    case ChatterType.GAS_ALERT:
    case ChatterType.CASUALTIES:
    case ChatterType.VICTORY:
    case ChatterType.DEFEAT:
      return 3; // Critical

    case ChatterType.ARTILLERY_INCOMING:
    case ChatterType.CONTACT:
    case ChatterType.OBJECTIVE_TAKEN:
      return 2; // Important

    case ChatterType.UNDER_FIRE:
    case ChatterType.ENEMY_DOWN:
    case ChatterType.ATTACK_ORDER:
      return 1; // Normal

    default:
      return 0; // Low
  }
};

/**
 * Radio Chatter Manager - handles queuing and display
 */
export class RadioChatterManager {
  constructor() {
    this.queue = [];
    this.currentMessage = null;
    this.onMessageCallback = null;
  }

  /**
   * Set callback for when new message should display
   */
  setMessageCallback(callback) {
    this.onMessageCallback = callback;
  }

  /**
   * Add chatter to queue
   */
  addChatter(type, faction = 'british') {
    const chatter = getChatterWithAudio(type, faction);
    if (!chatter) return;

    // Sort by priority (higher priority messages jump queue)
    this.queue.push(chatter);
    this.queue.sort((a, b) => b.priority - a.priority);

    // If nothing currently playing, start
    if (!this.currentMessage) {
      this.playNext();
    }
  }

  /**
   * Play next message in queue
   */
  playNext() {
    if (this.queue.length === 0) {
      this.currentMessage = null;
      if (this.onMessageCallback) {
        this.onMessageCallback(null);
      }
      return;
    }

    this.currentMessage = this.queue.shift();

    if (this.onMessageCallback) {
      this.onMessageCallback(this.currentMessage);
    }

    // Auto-advance after duration
    setTimeout(() => {
      this.playNext();
    }, this.currentMessage.duration);
  }

  /**
   * Clear all queued messages
   */
  clear() {
    this.queue = [];
    this.currentMessage = null;
    if (this.onMessageCallback) {
      this.onMessageCallback(null);
    }
  }
}

// Singleton instance
export const radioChatterManager = new RadioChatterManager();

export default {
  ChatterType,
  getChatter,
  getChatterWithAudio,
  RadioChatterManager,
  radioChatterManager,
};
