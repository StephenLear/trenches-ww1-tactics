/**
 * WWI Tactical Game - Unit Bios
 * Detailed backstories and historical context for each unit type
 */

export const UNIT_BIOS = {
  infantry: {
    name: 'Infantry',
    subtitle: 'The Backbone of the Army',
    icon: '🪖',

    overview: `The infantry soldier was the foundation of all WWI armies. Armed with bolt-action rifles and bayonets, these men endured the horrors of trench warfare firsthand. They faced machine gun fire, artillery barrages, poison gas, and the psychological strain of life in the trenches.`,

    historicalContext: `By 1914, infantry tactics still relied heavily on mass formations, but the devastating firepower of modern weapons quickly forced a revolution in warfare. The average infantryman carried roughly 60 pounds of equipment and could expect to spend weeks at a time in the front-line trenches.`,

    equipment: [
      { name: 'Lee-Enfield Rifle', description: 'British .303 caliber bolt-action rifle, capable of 15 aimed rounds per minute' },
      { name: 'Bayonet', description: '17-inch blade for close combat and trench raids' },
      { name: 'Steel Helmet', description: 'Brodie helmet introduced in 1915 to reduce head wounds' },
      { name: 'Webbing', description: 'Canvas equipment carrying ammunition, water bottle, and rations' },
      { name: 'Gas Mask', description: 'Essential protection after poison gas was introduced in 1915' },
    ],

    tactics: [
      'Hold defensive positions in trenches',
      'Advance in waves during offensives',
      'Conduct night raids on enemy trenches',
      'Provide covering fire for advancing units',
    ],

    casualtyRate: 'Infantry suffered the highest casualties of any branch, with some units losing 60% of their strength in a single day.',

    notableFacts: [
      'The average life expectancy for a junior officer at the Somme was just 6 weeks',
      'Soldiers developed "trench foot" from standing in waterlogged trenches',
      'Many units adopted unofficial truces to recover wounded from No Man\'s Land',
    ],

    factionVariants: {
      british: {
        name: 'Tommy',
        description: 'British soldiers were nicknamed "Tommies" after the example name on army forms.',
        specialNote: 'The British Expeditionary Force was initially small but grew to millions through volunteers and conscription.',
      },
      french: {
        name: 'Poilu',
        description: 'French soldiers were called "Poilus" meaning "hairy ones" for their beards grown in the trenches.',
        specialNote: 'French infantry wore distinctive horizon-blue uniforms after 1915.',
      },
      german: {
        name: 'Landser',
        description: 'German soldiers serving in the infantry.',
        specialNote: 'German stormtroopers pioneered infiltration tactics late in the war.',
      },
      american: {
        name: 'Doughboy',
        description: 'American soldiers were called "Doughboys" for reasons still debated by historians.',
        specialNote: 'American troops arrived fresh and eager, boosting Allied morale in 1918.',
      },
    },
  },

  machinegunner: {
    name: 'Machine Gunner',
    subtitle: 'The Deadly Equalizer',
    icon: '🔫',

    overview: `The machine gun transformed warfare, allowing a small team to hold off entire battalions. A single gun could fire 400-600 rounds per minute, creating deadly beaten zones that made frontal assaults nearly suicidal.`,

    historicalContext: `Though machine guns existed before WWI, their true potential was revealed in the trenches. The German MG08 and British Vickers became symbols of the war's industrialized killing. Machine gun crews were priority targets and suffered high casualties.`,

    equipment: [
      { name: 'Vickers Machine Gun', description: 'Water-cooled gun capable of sustained fire for hours' },
      { name: 'Ammunition Belts', description: '250-round canvas belts fed into the gun' },
      { name: 'Tripod Mount', description: 'Heavy tripod for stable sustained fire' },
      { name: 'Range Finder', description: 'For calculating elevation and deflection' },
      { name: 'Spare Barrel', description: 'Barrels overheated and needed regular replacement' },
    ],

    tactics: [
      'Establish interlocking fields of fire',
      'Target massed infantry advances',
      'Provide suppressing fire for friendly advances',
      'Create fixed fire zones covering No Man\'s Land',
    ],

    casualtyRate: 'Machine gun crews were specifically targeted by artillery and snipers, resulting in high turnover.',

    notableFacts: [
      'A single Vickers gun used 1 million rounds during the Battle of the Somme',
      'Water-cooled guns could fire for hours without overheating',
      'Machine gun positions were often the first targets of artillery barrages',
    ],

    factionVariants: {
      british: {
        name: 'Machine Gun Corps',
        description: 'Formed in 1915 as a dedicated machine gun branch.',
        specialNote: 'Their motto: "Kill more efficiently"',
      },
      french: {
        name: 'Mitrailleur',
        description: 'French machine gunners using the Hotchkiss and Chauchat guns.',
        specialNote: 'The Chauchat was one of the first light machine guns.',
      },
      german: {
        name: 'MG-Schütze',
        description: 'German machine gunners operating the feared MG08.',
        specialNote: 'Germany had more machine guns per battalion than any other army.',
      },
      american: {
        name: 'Machine Gun Battalion',
        description: 'American units often used French-supplied weapons initially.',
        specialNote: 'The Browning M1917 arrived late but proved excellent.',
      },
    },
  },

  sniper: {
    name: 'Sniper',
    subtitle: 'Silent Death',
    icon: '🎯',

    overview: `Snipers brought a personal, terrifying element to trench warfare. Using telescopic sights and camouflage, these marksmen could kill without warning from hundreds of yards away, targeting officers and machine gunners to disrupt enemy operations.`,

    historicalContext: `Sniping evolved from amateur marksmen to a professional military specialty during WWI. Both sides developed specialized training, equipment, and tactics. The psychological impact often exceeded the actual casualties inflicted.`,

    equipment: [
      { name: 'Scoped Rifle', description: 'Precision rifle with telescopic sight for long-range accuracy' },
      { name: 'Ghillie Suit', description: 'Camouflage made from burlap and natural materials' },
      { name: 'Periscope', description: 'For observation without exposing the head' },
      { name: 'Range Cards', description: 'Pre-calculated firing data for known positions' },
      { name: 'Spotting Scope', description: 'For observing targets and correcting aim' },
    ],

    tactics: [
      'Target officers to disrupt command',
      'Eliminate machine gun crews',
      'Create fear and restrict enemy movement',
      'Provide intelligence through observation',
    ],

    casualtyRate: 'Snipers faced execution if captured by some units, making them especially cautious.',

    notableFacts: [
      'Some snipers achieved over 100 confirmed kills',
      'Counter-sniper duels could last for days',
      'Fake heads were used to draw sniper fire and locate their positions',
      'Many snipers were recruited from hunters and gamekeepers',
    ],

    factionVariants: {
      british: {
        name: 'Scout Sniper',
        description: 'Often recruited from colonial troops experienced in stalking.',
        specialNote: 'The Lovat Scouts from Scotland were legendary marksmen.',
      },
      french: {
        name: 'Tireur d\'élite',
        description: 'French sharpshooters, often using the Lebel rifle.',
        specialNote: 'French snipers excelled at camouflage techniques.',
      },
      german: {
        name: 'Scharfschütze',
        description: 'German snipers using precision Mauser rifles with scopes.',
        specialNote: 'Germany developed sniping doctrine before most nations.',
      },
      american: {
        name: 'Sharpshooter',
        description: 'American marksmen, many from hunting backgrounds.',
        specialNote: 'The Springfield M1903 was an excellent sniper platform.',
      },
    },
  },

  medic: {
    name: 'Medic',
    subtitle: 'Angels of the Battlefield',
    icon: '⚕️',

    overview: `Medical personnel faced the impossible task of treating wounds never before seen on such a scale. They worked under fire, often crawling through No Man's Land to reach the wounded, knowing that survival depended on reaching a casualty quickly.`,

    historicalContext: `WWI drove massive advances in trauma medicine, from blood transfusions to reconstructive surgery. Stretcher bearers were not protected by the Geneva Convention in practice, and many were killed retrieving wounded.`,

    equipment: [
      { name: 'Medical Bag', description: 'Containing bandages, morphine, and basic surgical tools' },
      { name: 'Stretcher', description: 'Canvas and wood frame for carrying wounded' },
      { name: 'Red Cross Armband', description: 'Supposed to provide protection under Geneva Convention' },
      { name: 'Morphine Syrettes', description: 'Pre-filled syringes for pain management' },
      { name: 'Splints', description: 'For stabilizing broken limbs' },
    ],

    tactics: [
      'Triage wounded to prioritize treatment',
      'Provide immediate first aid under fire',
      'Evacuate wounded to aid stations',
      'Prevent shock and infection',
    ],

    casualtyRate: 'Medics and stretcher bearers suffered high casualties as they exposed themselves to rescue others.',

    notableFacts: [
      'It could take 18 hours to evacuate a wounded soldier from the front line',
      'Shell shock (PTSD) was first recognized and studied during WWI',
      'The Thomas splint reduced mortality from leg wounds from 80% to 20%',
      'Many medics were conscientious objectors serving without weapons',
    ],

    factionVariants: {
      british: {
        name: 'Royal Army Medical Corps',
        description: 'RAMC personnel, often called "Rob All My Comrades" by soldiers.',
        specialNote: 'Stretcher bearers were often older men or those unfit for combat.',
      },
      french: {
        name: 'Brancardier',
        description: 'French stretcher bearers and medical orderlies.',
        specialNote: 'The French medical system processed millions of casualties.',
      },
      german: {
        name: 'Sanitäter',
        description: 'German medical personnel with excellent training.',
        specialNote: 'German medicine was considered the most advanced in the world.',
      },
      american: {
        name: 'Army Medical Corps',
        description: 'American medics who learned from Allied experience.',
        specialNote: 'The US introduced mobile surgical hospitals closer to the front.',
      },
    },
  },

  officer: {
    name: 'Officer',
    subtitle: 'Lead From the Front',
    icon: '⭐',

    overview: `Officers in WWI led from the front, whistle in hand, first over the top. This courage came at a terrible cost - junior officers suffered casualty rates far exceeding their men. Their leadership and tactical decisions could mean life or death for entire companies.`,

    historicalContext: `The officer class was traditionally drawn from the upper classes, but the massive casualties of WWI opened commissions to men from all backgrounds. Field promotions became common as experienced leaders fell.`,

    equipment: [
      { name: 'Webley Revolver', description: '.455 caliber service pistol' },
      { name: 'Swagger Stick', description: 'Symbol of authority, sometimes used as a weapon' },
      { name: 'Whistle', description: 'For signaling attacks over the noise of battle' },
      { name: 'Map Case', description: 'Containing trench maps and orders' },
      { name: 'Compass', description: 'For navigation in the chaotic battlefield' },
    ],

    tactics: [
      'Coordinate attacks and defenses',
      'Boost morale through personal example',
      'Maintain discipline under fire',
      'Communicate orders to subordinates',
    ],

    casualtyRate: 'Officer casualties were roughly 17% compared to 12% for other ranks, due to leading from the front.',

    notableFacts: [
      'Officers were told not to carry rifles to distinguish them from the men',
      'This made them easy targets for enemy snipers',
      'Many officers modified their dress to look like regular soldiers',
      'The average age of a subaltern was just 20 years old',
    ],

    factionVariants: {
      british: {
        name: 'Subaltern',
        description: 'Junior officers, often straight from school or university.',
        specialNote: 'Public school education was considered essential for officers.',
      },
      french: {
        name: 'Sous-Lieutenant',
        description: 'French junior officers, many promoted from the ranks.',
        specialNote: 'French officers wore distinctive kepis until practical helmets were adopted.',
      },
      german: {
        name: 'Leutnant',
        description: 'German officers with rigorous military academy training.',
        specialNote: 'The German officer corps was highly professional.',
      },
      american: {
        name: 'Second Lieutenant',
        description: 'American officers, many from Officer Training Camps.',
        specialNote: 'The US rapidly expanded its officer corps for the war.',
      },
    },
  },

  tank: {
    name: 'Tank',
    subtitle: 'The Landship',
    icon: '🛡️',

    overview: `The tank was WWI's most revolutionary weapon. First used in 1916, these "landships" were designed to cross trenches and crush barbed wire while providing protection for infantry. Though unreliable, they broke the stalemate of trench warfare.`,

    historicalContext: `Developed in secrecy, tanks were called "tanks" as a cover story - workers were told they were building water tanks for Mesopotamia. Early tanks were slow, hot, and mechanically unreliable, but they terrified the enemy.`,

    equipment: [
      { name: 'Main Armament', description: '6-pounder guns (Male) or machine guns (Female)' },
      { name: 'Armor Plate', description: '6-12mm steel, proof against rifle fire' },
      { name: 'Caterpillar Tracks', description: 'For crossing trenches and rough ground' },
      { name: 'Unditching Beam', description: 'For freeing tanks stuck in shell holes' },
      { name: 'Internal Telephone', description: 'For crew communication over engine noise' },
    ],

    tactics: [
      'Lead infantry attacks across No Man\'s Land',
      'Crush wire obstacles for following troops',
      'Suppress machine gun positions',
      'Create gaps in enemy defenses',
    ],

    casualtyRate: 'Tank crews faced risks from fire, carbon monoxide, and enemy fire. Many early tanks broke down before reaching the enemy.',

    notableFacts: [
      'Early tanks could only travel at 4 mph',
      'Interior temperatures could reach 120°F (50°C)',
      'Crew often wore chainmail masks to protect against spalling',
      'The Battle of Cambrai in 1917 was the first mass tank attack',
      'Tanks were so secret that crews trained in secluded areas',
    ],

    factionVariants: {
      british: {
        name: 'Tank Corps',
        description: 'Pioneers of armored warfare using the Mark I-V tanks.',
        specialNote: 'Britain invented the tank and used them first in combat.',
      },
      french: {
        name: 'Artillerie Spéciale',
        description: 'French tank crews operating Renault FT and Schneider tanks.',
        specialNote: 'The Renault FT established the modern tank layout.',
      },
      german: {
        name: 'Sturmpanzerwagen',
        description: 'German tank crews, though Germany produced few tanks.',
        specialNote: 'The A7V was Germany\'s only production tank, with only 20 built.',
      },
      american: {
        name: 'Tank Corps',
        description: 'American tankers, including young officer George Patton.',
        specialNote: 'The US used French Renault FT tanks in combat.',
      },
    },
  },

  mortar: {
    name: 'Mortar Team',
    subtitle: 'Trench Warfare Specialists',
    icon: '💣',

    overview: `Trench mortars provided infantry with their own artillery support. These short-range weapons could lob shells into enemy trenches at steep angles, hitting positions that conventional artillery couldn't reach.`,

    historicalContext: `When WWI became a war of trenches, both sides rapidly developed trench mortars. These ranged from improvised pipe bombs to sophisticated weapons like the Stokes mortar, which could fire 25 rounds per minute.`,

    equipment: [
      { name: 'Stokes Mortar', description: '3-inch mortar that revolutionized infantry support' },
      { name: 'Mortar Bombs', description: 'Finned projectiles, various types including smoke and gas' },
      { name: 'Baseplate', description: 'Steel plate to absorb recoil' },
      { name: 'Aiming Stakes', description: 'For consistent targeting' },
      { name: 'Range Tables', description: 'For calculating elevation and charge' },
    ],

    tactics: [
      'Destroy enemy trench positions',
      'Provide smoke screens for attacks',
      'Suppress enemy before assaults',
      'Target reinforcement routes',
    ],

    casualtyRate: 'Mortar teams were targeted for counter-battery fire and raids, as their positions were revealed by firing.',

    notableFacts: [
      'Early mortars were often made from drainpipes',
      'The Stokes mortar could be carried by its 3-man crew',
      'Mortar bombs made a distinctive sound, earning names like "Minnies"',
      'Some mortars fired projectiles as heavy as 200 pounds',
    ],

    factionVariants: {
      british: {
        name: 'Trench Mortar Battery',
        description: 'Specialized units supporting front-line infantry.',
        specialNote: 'The Stokes mortar was a British invention that all sides copied.',
      },
      french: {
        name: 'Crapouillot',
        description: 'French mortar teams, named after their toad-like mortars.',
        specialNote: 'French mortars ranged from small to massive 340mm weapons.',
      },
      german: {
        name: 'Minenwerfer',
        description: 'German mortar crews operating the feared "Minnie".',
        specialNote: 'German minenwerfers were particularly large and destructive.',
      },
      american: {
        name: 'Trench Mortar Platoon',
        description: 'American mortar teams using Allied equipment.',
        specialNote: 'The US adopted the Stokes mortar for its forces.',
      },
    },
  },

  cavalry: {
    name: 'Cavalry',
    subtitle: 'The Last of Their Kind',
    icon: '🐎',

    overview: `Cavalry entered WWI expecting glorious charges but found themselves largely obsolete against machine guns and barbed wire. Yet they adapted, serving as mounted infantry, scouts, and in rare cases, executing successful charges through gaps in enemy lines.`,

    historicalContext: `Despite predictions of their demise, cavalry played important roles throughout the war, particularly in the Middle East and Eastern Front where conditions favored mobility. Even on the Western Front, they exploited breakthroughs when possible.`,

    equipment: [
      { name: 'Cavalry Sabre', description: 'Traditional curved sword for mounted combat' },
      { name: 'Lance', description: 'Long spear still used by some units' },
      { name: 'Carbine', description: 'Shortened rifle for mounted troops' },
      { name: 'Horse', description: 'Specially trained war horse' },
      { name: 'Cavalry Boots', description: 'High boots with spurs' },
    ],

    tactics: [
      'Reconnaissance and screening',
      'Pursue retreating enemies',
      'Exploit breakthroughs in enemy lines',
      'Dismounted combat as infantry',
    ],

    casualtyRate: 'Horses suffered terribly - over 8 million died in the war. Cavalry charges against prepared positions were suicidal.',

    notableFacts: [
      'The British cavalry made successful charges at Cambrai in 1917',
      'More horses than men were evacuated at Dunkirk in WWII due to cavalry tradition',
      'Cavalry officers often resisted the transition to tanks',
      'The Australian Light Horse achieved fame in Palestine',
    ],

    factionVariants: {
      british: {
        name: 'Household Cavalry',
        description: 'Elite cavalry regiments with centuries of tradition.',
        specialNote: 'British cavalry adapted better than most to dismounted roles.',
      },
      french: {
        name: 'Cuirassier',
        description: 'French heavy cavalry, still wearing ceremonial armor in 1914.',
        specialNote: 'French cavalry abandoned their brass helmets for steel by 1915.',
      },
      german: {
        name: 'Ulanen',
        description: 'German lancers with distinctive square-topped headgear.',
        specialNote: 'German cavalry were more quickly converted to other roles.',
      },
      american: {
        name: 'Cavalry',
        description: 'American mounted troops with frontier traditions.',
        specialNote: 'US cavalry served mostly in a support role in France.',
      },
    },
  },
};

/**
 * Get bio for a specific unit type
 */
export function getUnitBio(unitType) {
  return UNIT_BIOS[unitType] || null;
}

/**
 * Get faction-specific variant info
 */
export function getFactionVariant(unitType, faction) {
  const bio = UNIT_BIOS[unitType];
  if (!bio || !bio.factionVariants) return null;
  return bio.factionVariants[faction] || bio.factionVariants.british;
}

/**
 * Get all unit bios
 */
export function getAllUnitBios() {
  return Object.entries(UNIT_BIOS).map(([type, bio]) => ({
    type,
    ...bio,
  }));
}

/**
 * Get equipment list for a unit
 */
export function getUnitEquipment(unitType) {
  const bio = UNIT_BIOS[unitType];
  return bio ? bio.equipment : [];
}

/**
 * Get tactics list for a unit
 */
export function getUnitTactics(unitType) {
  const bio = UNIT_BIOS[unitType];
  return bio ? bio.tactics : [];
}

export default {
  UNIT_BIOS,
  getUnitBio,
  getFactionVariant,
  getAllUnitBios,
  getUnitEquipment,
  getUnitTactics,
};
