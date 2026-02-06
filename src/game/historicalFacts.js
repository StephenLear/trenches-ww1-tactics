/**
 * WWI Tactical Game - Historical Facts System
 * Educational facts displayed after mission completion
 */

// ============================================================================
// HISTORICAL FACTS BY MISSION
// ============================================================================

export const HISTORICAL_FACTS = {
  // Mission 1: Hold the Line (February 1916)
  1: {
    date: 'February 1916',
    title: 'The Battle of Verdun Begins',
    fact: 'On February 21, 1916, Germany launched a massive offensive at Verdun, France. The battle would last 303 days and become one of the longest and bloodiest of the war, with over 700,000 casualties on both sides.',
    didYouKnow: 'The French rallying cry "Ils ne passeront pas!" (They shall not pass!) became a symbol of French determination.',
  },

  // Mission 2: Cavalry's Last Charge (August 1914)
  2: {
    date: 'August 1914',
    title: 'The Last Great Cavalry Charges',
    fact: 'In August 1914, cavalry still played a significant role in warfare. However, the machine gun quickly rendered mounted charges obsolete. The Battle of Halen on August 12, 1914, saw one of the last successful cavalry actions of the war.',
    didYouKnow: 'By 1918, most cavalry units had been converted to dismounted infantry or used only for reconnaissance.',
  },

  // Mission 3: Iron Beasts (September 1916)
  3: {
    date: 'September 15, 1916',
    title: 'Tanks Enter the Battlefield',
    fact: 'The Battle of Flers-Courcelette marked the first use of tanks in warfare. The British Mark I tanks terrified German soldiers, though mechanical failures limited their effectiveness.',
    didYouKnow: 'Tanks were originally called "landships" but were renamed "tanks" as a security measure to disguise their true purpose.',
  },

  // Mission 4: Gallipoli Landing
  4: {
    date: 'April 25, 1915',
    title: 'The Gallipoli Campaign',
    fact: 'Allied forces landed at Gallipoli to capture Constantinople and open a supply route to Russia. The campaign became a costly stalemate, with over 500,000 casualties before Allied evacuation in January 1916.',
    didYouKnow: 'ANZAC Day (April 25) is now a national day of remembrance in Australia and New Zealand.',
  },

  // Mission 5: Gas Attack
  5: {
    date: 'April 22, 1915',
    title: 'Chemical Warfare',
    fact: 'The Second Battle of Ypres saw the first large-scale use of poison gas on the Western Front. German forces released 168 tons of chlorine gas, creating a 4-mile gap in Allied lines.',
    didYouKnow: 'By war\'s end, chemical weapons had caused over 1 million casualties, though less than 10% were fatal.',
  },

  // Mission 6: Trench Raid
  6: {
    date: '1915-1918',
    title: 'Trench Warfare',
    fact: 'Trench warfare defined the Western Front. By late 1914, a continuous line of trenches stretched over 400 miles from the English Channel to Switzerland.',
    didYouKnow: 'Soldiers developed "trench foot" from standing in waterlogged trenches, causing over 20,000 British casualties in winter 1914-15 alone.',
  },

  // Mission 7: Over the Top
  7: {
    date: 'July 1, 1916',
    title: 'The Somme Offensive',
    fact: 'The first day of the Battle of the Somme remains the bloodiest day in British military history, with 57,470 casualties including 19,240 dead.',
    didYouKnow: 'Before the attack, British artillery fired over 1.5 million shells in a week-long bombardment.',
  },

  // Mission 8: Night Raid
  8: {
    date: '1916-1918',
    title: 'Night Operations',
    fact: 'Night raids became a crucial tactic for gathering intelligence and disrupting enemy lines. Soldiers blackened their faces and used clubs and knives for silent attacks.',
    didYouKnow: 'The "trench club" - often a homemade weapon - became a preferred tool for night raids.',
  },

  // Mission 9: Artillery Duel
  9: {
    date: '1914-1918',
    title: 'The Artillery War',
    fact: 'Artillery caused approximately 60% of all casualties in World War I. The constant bombardment created a psychological condition known as "shell shock."',
    didYouKnow: 'During the Battle of Verdun, both sides fired approximately 40 million shells over 10 months.',
  },

  // Mission 10: Sniper Alley
  10: {
    date: '1915-1918',
    title: 'The Rise of Sniping',
    fact: 'Snipers became feared figures on the Western Front. The Germans initially dominated with their telescopic-sighted rifles before the Allies developed counter-sniper tactics.',
    didYouKnow: 'The most successful sniper of WW1, Francis Pegahmagabow, was a Canadian Indigenous soldier with 378 confirmed kills.',
  },

  // Mission 11: Desert Storm (Ottoman Front)
  11: {
    date: '1916-1918',
    title: 'The Arab Revolt',
    fact: 'T.E. Lawrence ("Lawrence of Arabia") helped lead Arab forces in a guerrilla campaign against the Ottoman Empire, disrupting vital rail lines and tying down Turkish troops.',
    didYouKnow: 'Lawrence and the Arab forces captured Aqaba in a surprise attack from the desert - a direction the Ottomans thought impossible.',
  },

  // Mission 12: Mountain War (Italian Front)
  12: {
    date: '1915-1918',
    title: 'War in the Alps',
    fact: 'The Italian Front saw fighting at extreme altitudes in the Alps. Soldiers battled not just enemies but avalanches, frostbite, and altitude sickness.',
    didYouKnow: 'More soldiers died from avalanches than enemy fire on some Alpine battlefields.',
  },

  // Mission 13: Breakthrough
  13: {
    date: 'March 21, 1918',
    title: 'The Spring Offensive',
    fact: 'Germany\'s Spring Offensive (Operation Michael) achieved the largest territorial gains on the Western Front since 1914, advancing 40 miles in some areas using new "stormtrooper" tactics.',
    didYouKnow: 'The offensive came so close to Paris that "Big Bertha" guns could shell the city from 75 miles away.',
  },

  // Mission 14: American Doughboys
  14: {
    date: 'April 1917',
    title: 'America Enters the War',
    fact: 'The United States declared war on Germany on April 6, 1917. By war\'s end, over 2 million American soldiers had served in France, tipping the balance decisively.',
    didYouKnow: 'American soldiers were called "doughboys" - the origin of this nickname remains debated.',
  },

  // Mission 15: Belleau Wood
  15: {
    date: 'June 1918',
    title: 'The Battle of Belleau Wood',
    fact: 'U.S. Marines fought fiercely for three weeks to capture Belleau Wood from German forces. The Germans reportedly called the Marines "Devil Dogs" for their ferocity.',
    didYouKnow: 'The battle cemented the Marine Corps\' reputation as elite fighters.',
  },

  // Mission 16: Tank Assault
  16: {
    date: 'August 8, 1918',
    title: 'The Black Day of the German Army',
    fact: 'The Battle of Amiens saw 500 tanks lead a surprise attack that advanced 8 miles in one day. German General Ludendorff called it "the black day of the German Army."',
    didYouKnow: 'This battle marked the beginning of the Hundred Days Offensive that would end the war.',
  },

  // Mission 17: Air Superiority
  17: {
    date: '1914-1918',
    title: 'The Birth of Air Combat',
    fact: 'World War I saw the birth of aerial warfare. Pilots initially waved at each other before combat evolved to include machine guns, bombs, and reconnaissance.',
    didYouKnow: 'The "Red Baron" Manfred von Richthofen scored 80 aerial victories, making him the war\'s top ace.',
  },

  // Mission 18: Final Push
  18: {
    date: 'September-October 1918',
    title: 'Breaking the Hindenburg Line',
    fact: 'Allied forces broke through the heavily fortified Hindenburg Line in autumn 1918, using combined arms tactics with tanks, artillery, infantry, and air support.',
    didYouKnow: 'The Hindenburg Line included concrete bunkers, deep trenches, and massive belts of barbed wire.',
  },

  // Mission 19: The Last Day
  19: {
    date: 'November 11, 1918',
    title: 'The Armistice',
    fact: 'The Armistice was signed at 5:00 AM on November 11, 1918, to take effect at 11:00 AM. Fighting continued until the last moment, causing approximately 11,000 casualties on the final day.',
    didYouKnow: 'The last soldier killed was American Private Henry Gunther, shot at 10:59 AM - one minute before the ceasefire.',
  },

  // Mission 20: Remembrance
  20: {
    date: '1914-1918',
    title: 'The War to End All Wars',
    fact: 'World War I resulted in approximately 17 million deaths and 20 million wounded. Four great empires - German, Austro-Hungarian, Ottoman, and Russian - collapsed.',
    didYouKnow: 'November 11 is commemorated as Remembrance Day, Armistice Day, or Veterans Day around the world.',
  },
};

// ============================================================================
// GENERAL FACTS (Random selection for skirmish mode)
// ============================================================================

export const GENERAL_FACTS = [
  {
    title: 'Trench Life',
    fact: 'Soldiers in the trenches faced constant threats from rats, lice, and disease, in addition to enemy fire.',
  },
  {
    title: 'Christmas Truce',
    fact: 'On Christmas Day 1914, German and British soldiers declared an unofficial truce, exchanging gifts and playing football in No Man\'s Land.',
  },
  {
    title: 'The Lost Generation',
    fact: 'World War I killed approximately 37% of British men aged 20-24, leading to the term "Lost Generation."',
  },
  {
    title: 'Shell Shock',
    fact: 'Over 80,000 British soldiers were treated for "shell shock" - now recognized as PTSD.',
  },
  {
    title: 'Women at War',
    fact: 'With men at the front, over 700,000 British women entered the workforce, driving social change.',
  },
  {
    title: 'The Tunnellers',
    fact: 'Tunnelling companies dug under enemy lines to plant massive explosives. The mines at Messines in 1917 were heard in London.',
  },
  {
    title: 'Pigeons Save Lives',
    fact: 'Over 100,000 carrier pigeons were used for military communication. A pigeon named Cher Ami saved 194 American soldiers.',
  },
  {
    title: 'Plastic Surgery Pioneer',
    fact: 'Modern plastic surgery developed largely to help soldiers disfigured by shrapnel and burns.',
  },
  {
    title: 'Blood Banks',
    fact: 'The first blood banks were established during World War I to treat wounded soldiers.',
  },
  {
    title: 'War Dogs',
    fact: 'Dogs served as messengers, sentries, and medics, trained to find wounded soldiers on the battlefield.',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get historical fact for a specific mission
 */
export function getMissionFact(missionId) {
  return HISTORICAL_FACTS[missionId] || null;
}

/**
 * Get a random general fact (for skirmish mode)
 */
export function getRandomFact() {
  const index = Math.floor(Math.random() * GENERAL_FACTS.length);
  return GENERAL_FACTS[index];
}

/**
 * Get all facts for a given date range (year)
 */
export function getFactsByYear(year) {
  return Object.values(HISTORICAL_FACTS).filter(fact => {
    return fact.date.includes(year.toString());
  });
}

/**
 * Mark a fact as read and return updated count
 */
export function getFactReadProgress(readFactIds = []) {
  const totalFacts = Object.keys(HISTORICAL_FACTS).length + GENERAL_FACTS.length;
  const readCount = readFactIds.length;
  return {
    read: readCount,
    total: totalFacts,
    percentage: Math.round((readCount / totalFacts) * 100),
  };
}

export default {
  HISTORICAL_FACTS,
  GENERAL_FACTS,
  getMissionFact,
  getRandomFact,
  getFactsByYear,
  getFactReadProgress,
};
