/**
 * WWI Tactical Game - Newspaper Headlines System
 * Generate period-appropriate newspaper headlines for battle results
 */

// Newspaper names by faction
export const NEWSPAPERS = {
  british: [
    { name: 'The Times', tagline: 'London' },
    { name: 'The Daily Telegraph', tagline: 'Fleet Street' },
    { name: 'The Daily Mail', tagline: 'London Edition' },
    { name: 'The Manchester Guardian', tagline: 'Manchester' },
    { name: 'The Evening Standard', tagline: 'London' },
  ],
  french: [
    { name: 'Le Figaro', tagline: 'Paris' },
    { name: 'Le Petit Parisien', tagline: 'Paris' },
    { name: 'Le Matin', tagline: 'Edition du Matin' },
    { name: 'L\'Humanité', tagline: 'Paris' },
    { name: 'Le Journal', tagline: 'Edition Spéciale' },
  ],
  german: [
    { name: 'Berliner Tageblatt', tagline: 'Berlin' },
    { name: 'Frankfurter Zeitung', tagline: 'Frankfurt' },
    { name: 'Vossische Zeitung', tagline: 'Berlin' },
    { name: 'Kölnische Zeitung', tagline: 'Köln' },
    { name: 'Deutsche Allgemeine Zeitung', tagline: 'Berlin' },
  ],
  american: [
    { name: 'The New York Times', tagline: 'New York' },
    { name: 'The Washington Post', tagline: 'Washington D.C.' },
    { name: 'Chicago Tribune', tagline: 'Chicago' },
    { name: 'The Boston Globe', tagline: 'Boston' },
    { name: 'Stars and Stripes', tagline: 'AEF Edition' },
  ],
};

// Victory headline templates - expanded
const VICTORY_HEADLINES = {
  decisive: [
    'GLORIOUS VICTORY AT {location}!',
    'CRUSHING DEFEAT FOR THE ENEMY AT {location}',
    'ALLIED FORCES TRIUMPH AT {location}',
    'DECISIVE BATTLE WON AT {location}',
    'ENEMY ROUTED AT {location}',
    'BRILLIANT VICTORY SECURES {location}',
    'HEROIC STAND WINS THE DAY AT {location}',
    'ENEMY FORCES SHATTERED AT {location}',
    'MAGNIFICENT TRIUMPH AT {location}',
    'COMPLETE VICTORY REPORTED FROM {location}',
  ],
  close: [
    'HARD-FOUGHT VICTORY AT {location}',
    'ALLIES PREVAIL IN BLOODY BATTLE FOR {location}',
    'COSTLY VICTORY AT {location}',
    'BRAVE TROOPS SECURE {location} AFTER FIERCE FIGHTING',
    'VALIANT SOLDIERS TAKE {location}',
    'PYRRHIC VICTORY AT {location} - BUT OBJECTIVE SECURED',
    'DESPERATE BATTLE FOR {location} WON',
    'TROOPS PAY HEAVY PRICE FOR {location}',
    'BITTER STRUGGLE FOR {location} ENDS IN VICTORY',
  ],
  flawless: [
    'PERFECT VICTORY AT {location}!',
    'ENEMY SWEPT ASIDE AT {location}',
    'MASTERFUL TACTICS WIN {location} WITHOUT LOSS',
    'STUNNING SUCCESS AT {location}',
    'TEXTBOOK VICTORY AT {location}',
    'BRILLIANT COMMAND SECURES {location} - NO CASUALTIES',
    'UNBLEMISHED TRIUMPH AT {location}',
    'MIRACULOUS VICTORY - ALL TROOPS SAFE',
  ],
  quick: [
    'LIGHTNING STRIKE CAPTURES {location}!',
    'RAPID ADVANCE SECURES {location}',
    'SWIFT VICTORY AT {location}',
    'BLITZKRIEG SUCCESS AT {location}',
    'SURPRISE ATTACK OVERWHELMS ENEMY AT {location}',
    '{location} FALLS IN RECORD TIME',
    'WHIRLWIND OFFENSIVE TAKES {location}',
  ],
};

// Defeat headline templates
const DEFEAT_HEADLINES = {
  normal: [
    'SETBACK AT {location}',
    'FORCES WITHDRAW FROM {location}',
    'TACTICAL RETREAT FROM {location}',
    'HEAVY LOSSES AT {location}',
    'BATTLE FOR {location} CONTINUES',
  ],
  heavy: [
    'DISASTER AT {location}',
    'DEVASTATING LOSSES AT {location}',
    'DARK DAY AT {location}',
    'TERRIBLE TOLL AT {location}',
  ],
};

// Subheadlines based on battle details - expanded
const SUBHEADLINES = {
  manyKills: [
    'Enemy suffers tremendous casualties',
    'Hundreds of enemy soldiers fall',
    'Enemy losses reported as severe',
    'Enemy regiment practically annihilated',
    'Survivors few among enemy ranks',
    'Enemy pays terrible price',
  ],
  noLosses: [
    'Our boys return home safely',
    'Not a single casualty reported',
    'Remarkably, all troops accounted for',
    'Every soldier returns to cheering comrades',
    'Perfect execution saves lives',
  ],
  heavyLosses: [
    'Casualties reported as significant',
    'Many brave soldiers made the ultimate sacrifice',
    'Families await news from the front',
    'Price of victory measured in blood',
    'Heroes fallen in glorious action',
  ],
  veteranHero: [
    '{veteranName} distinguished in action',
    '{veteranName} leads charge to victory',
    'Sergeant {veteranName} earns commendation',
    '{veteranName} nominated for decoration',
    'Heroic {veteranName} inspires comrades',
  ],
  tankBattle: [
    'Iron monsters clash on the battlefield',
    'Tanks prove decisive in engagement',
    'Armored warfare shapes modern combat',
    'Land ships crush enemy resistance',
    'Steel beasts break the stalemate',
  ],
  artillerySupport: [
    'Artillery barrage devastates enemy positions',
    'Big guns pave the way for infantry',
    'Shell fire softens enemy defenses',
    'Creeping barrage precedes advance',
    'Heavy guns thunder throughout night',
  ],
  cavalry: [
    'Cavalry charges break enemy lines',
    'Mounted troops exploit breakthrough',
    'Last great cavalry charge of the war',
  ],
  weather: [
    'Troops advance despite terrible conditions',
    'Victory won through mud and rain',
    'Weather proves no obstacle to our brave soldiers',
  ],
  surprise: [
    'Enemy caught completely off guard',
    'Surprise assault overwhelms defenders',
    'Dawn attack achieves total surprise',
  ],
  night: [
    'Night assault catches enemy sleeping',
    'Darkness hides advancing troops',
    'Moonlight operation succeeds brilliantly',
  ],
};

// Date formatting for newspaper
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Generate a newspaper date string (1914-1918 period)
 */
const generateNewspaperDate = () => {
  const year = 1914 + Math.floor(Math.random() * 5);
  const month = Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  const dayOfWeek = Math.floor(Math.random() * 7);

  return `${DAYS[dayOfWeek]}, ${MONTHS[month]} ${day}, ${year}`;
};

/**
 * Generate newspaper headline for battle result
 */
export const generateHeadline = (battleResult) => {
  const {
    victory = false,
    location = 'The Western Front',
    playerKills = 0,
    playerLosses = 0,
    turns = 10,
    faction = 'british',
    veteranName = null,
    usedTanks = false,
    usedArtillery = false,
  } = battleResult;

  // Select newspaper
  const papers = NEWSPAPERS[faction] || NEWSPAPERS.british;
  const newspaper = papers[Math.floor(Math.random() * papers.length)];

  // Determine headline type
  let headlineTemplates;
  if (victory) {
    if (playerLosses === 0) {
      headlineTemplates = VICTORY_HEADLINES.flawless;
    } else if (turns <= 5) {
      headlineTemplates = VICTORY_HEADLINES.quick;
    } else if (playerLosses > playerKills * 0.5) {
      headlineTemplates = VICTORY_HEADLINES.close;
    } else {
      headlineTemplates = VICTORY_HEADLINES.decisive;
    }
  } else {
    if (playerLosses > 5) {
      headlineTemplates = DEFEAT_HEADLINES.heavy;
    } else {
      headlineTemplates = DEFEAT_HEADLINES.normal;
    }
  }

  // Generate main headline
  const headlineTemplate = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  const headline = headlineTemplate.replace('{location}', location.toUpperCase());

  // Generate subheadlines
  const subheadlines = [];

  if (playerKills >= 10) {
    const sub = SUBHEADLINES.manyKills[Math.floor(Math.random() * SUBHEADLINES.manyKills.length)];
    subheadlines.push(sub);
  }

  if (playerLosses === 0 && victory) {
    const sub = SUBHEADLINES.noLosses[Math.floor(Math.random() * SUBHEADLINES.noLosses.length)];
    subheadlines.push(sub);
  } else if (playerLosses >= 5) {
    const sub = SUBHEADLINES.heavyLosses[Math.floor(Math.random() * SUBHEADLINES.heavyLosses.length)];
    subheadlines.push(sub);
  }

  if (veteranName && victory) {
    const sub = SUBHEADLINES.veteranHero[Math.floor(Math.random() * SUBHEADLINES.veteranHero.length)]
      .replace('{veteranName}', veteranName);
    subheadlines.push(sub);
  }

  if (usedTanks) {
    const sub = SUBHEADLINES.tankBattle[Math.floor(Math.random() * SUBHEADLINES.tankBattle.length)];
    subheadlines.push(sub);
  }

  if (usedArtillery) {
    const sub = SUBHEADLINES.artillerySupport[Math.floor(Math.random() * SUBHEADLINES.artillerySupport.length)];
    subheadlines.push(sub);
  }

  // Generate article snippets
  const articleSnippets = generateArticleSnippets(battleResult, faction);

  return {
    newspaper,
    date: generateNewspaperDate(),
    headline,
    subheadlines: subheadlines.slice(0, 3), // Max 3 subheadlines
    articleSnippets,
    edition: victory ? 'SPECIAL EDITION' : 'Evening Edition',
    price: faction === 'american' ? '2 CENTS' : faction === 'german' ? '10 PFENNIG' : '1 PENNY',
  };
};

/**
 * Generate article body snippets
 */
const generateArticleSnippets = (battleResult, faction) => {
  const { victory, location, playerKills, playerLosses, turns } = battleResult;

  const snippets = [];

  if (victory) {
    snippets.push(
      `Our correspondent at the front reports that ${location} has been secured after ${turns} hours of intense combat.`
    );

    if (playerKills > 0) {
      snippets.push(
        `Enemy casualties are estimated at approximately ${playerKills * 10} men, with significant material losses.`
      );
    }

    if (playerLosses > 0) {
      snippets.push(
        `We mourn the loss of ${playerLosses} brave soldiers who gave their lives for King and Country.`
      );
    } else {
      snippets.push(
        `Remarkably, our forces suffered no casualties in this engagement, a testament to superior tactics and training.`
      );
    }

    snippets.push(
      `Military officials express satisfaction with the outcome and indicate that further advances are planned.`
    );
  } else {
    snippets.push(
      `Despite fierce resistance, our forces have conducted a tactical withdrawal from ${location}.`
    );

    snippets.push(
      `The War Office assures the public that this is merely a temporary setback and that plans for counter-offensive operations are underway.`
    );

    if (playerLosses > 0) {
      snippets.push(
        `Families of the ${playerLosses} missing soldiers are being notified. The nation mourns their sacrifice.`
      );
    }
  }

  return snippets;
};

/**
 * Generate breaking news ticker items - expanded
 */
export const generateNewsTicker = (faction = 'british') => {
  const tickers = {
    british: [
      'King George V visits troops at the front',
      'New recruitment drive exceeds expectations',
      'War bonds sales reach record levels',
      'Rationing to be extended, says Ministry',
      'Munitions output doubles from last year',
      'ANZAC forces distinguish themselves at Gallipoli',
      'Canadian Corps earn reputation as shock troops',
      'Royal Flying Corps reports aerial victories',
      'New tanks to be deployed to Western Front',
      'Field Marshal Haig praises troops\' spirit',
      'Women workers essential to munitions effort',
      'Nursing sisters receive commendations',
    ],
    french: [
      'President Poincaré addresses the nation',
      'Paris factories work around the clock',
      'Refugees flee advancing front lines',
      'Colonial troops arrive from Africa',
      'Wine rations approved for front-line soldiers',
      'Verdun defenders hold firm against assault',
      'French generals plan major offensive',
      'Artillery production reaches new heights',
      'Foreign Legion proves valor in combat',
      'Marshal Joffre reviews defensive lines',
      'Sacred Way keeps Verdun supplied',
    ],
    german: [
      'Kaiser Wilhelm inspects Eastern Front',
      'U-boat campaign shows results',
      'Home front maintains strong morale',
      'Austrian allies report progress in Alps',
      'New weapons research accelerates',
      'Hindenburg Line proves impenetrable',
      'Stormtrooper tactics revolutionize warfare',
      'Eastern victories free troops for West',
      'Zeppelin raids target enemy industry',
      'Iron Cross awarded to heroes of Verdun',
      'Chemical weapons prove effective',
    ],
    american: [
      'General Pershing establishes HQ in France',
      'Liberty Bond sales exceed $1 billion',
      'Doughboys eager to "get the Kaiser"',
      'American industries converted for war',
      'Red Cross ships supplies to Europe',
      'First American troops arrive in France',
      'Harlem Hellfighters earn French respect',
      'American aviators join Lafayette Escadrille',
      'Convoy system defeats U-boat threat',
      'President Wilson: "Make world safe for democracy"',
      'AEF strength grows daily',
    ],
  };

  const items = tickers[faction] || tickers.british;
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Generate quote from military official
 */
export const generateOfficialQuote = (victory, faction = 'british') => {
  const victoryQuotes = [
    '"A splendid achievement by our gallant soldiers." — War Office',
    '"The enemy has been taught a sharp lesson." — General Staff',
    '"This victory brings us one step closer to final triumph." — Ministry of War',
    '"Our men have shown the world what courage means." — Field Marshal',
  ];

  const defeatQuotes = [
    '"We shall return stronger than before." — War Office',
    '"A temporary setback in a long campaign." — General Staff',
    '"The spirit of our soldiers remains unbroken." — Ministry of War',
    '"Every sacrifice brings us closer to victory." — Field Marshal',
  ];

  const quotes = victory ? victoryQuotes : defeatQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export default {
  NEWSPAPERS,
  generateHeadline,
  generateNewsTicker,
  generateOfficialQuote,
};
