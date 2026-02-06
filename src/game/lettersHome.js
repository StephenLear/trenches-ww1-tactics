/**
 * WWI Tactical Game - Letters Home System
 * Soldiers write letters based on battle events
 */

// Letter templates by occasion
const LETTER_TEMPLATES = {
  // After victory
  victory: {
    opening: [
      'Dearest Mother and Father,',
      'My Darling {spouse},',
      'Dear Family,',
      'To my beloved ones at home,',
    ],
    body: [
      'I am writing to let you know that I am safe and well. We have had a great success today at {location}. The fighting was fierce, but our spirits remain high. {personalDetail}',
      'Another day, another battle won. {location} is now ours. I thought of you all throughout the engagement, and it gave me strength. {personalDetail}',
      'We gave Fritz a proper hiding today at {location}. The lads fought bravely, and I am proud to serve alongside them. {personalDetail}',
      'Victory is ours at {location}! It was not easy, but we persevered. I cannot tell you much, but know that we are pushing forward. {personalDetail}',
    ],
    closing: [
      'I must close now as the post is leaving. Give my love to everyone. I dream of home every night.\n\nYour loving {relation},\n{name}',
      'Keep me in your prayers, as I keep you in mine. I hope to see you all again soon.\n\nWith all my heart,\n{name}',
      'Do not worry about me. I am well looked after here. Send my regards to {familyMember}.\n\nEver yours,\n{name}',
    ],
  },

  // After defeat
  defeat: {
    opening: [
      'Dear Mother,',
      'My Dear Family,',
      'To those I love,',
    ],
    body: [
      'Today was difficult, but please do not worry. We had to fall back from {location}, but we are all accounted for. Morale remains strong. {personalDetail}',
      'I write with a heavy heart. {location} was not to be ours today. But we shall try again. The enemy paid dearly for their gains. {personalDetail}',
      'We have had a setback at {location}. Do not believe everything in the papers - we are alright, just tired. {personalDetail}',
    ],
    closing: [
      'Please do not worry about me. I am safe and will write again soon.\n\nYour devoted {relation},\n{name}',
      'Keep the home fires burning. We need something to come back to.\n\nWith love,\n{name}',
    ],
  },

  // After losing a comrade
  loss: {
    opening: [
      'Dear Mother,',
      'My Beloved Family,',
    ],
    body: [
      'Today we lost some good men at {location}. I cannot write their names, but they were brave until the end. {personalDetail} I think about what this war costs us all.',
      'This letter comes with sadness in my heart. We have suffered losses. Each man here becomes like a brother, and to lose one is to lose family. {personalDetail}',
      'I have seen things today that I shall never forget. Good men fell at {location}. They did not suffer. {personalDetail} Please hold close those you love.',
    ],
    closing: [
      'I need you to know how much I love you all. Life here makes one appreciate what matters.\n\nYour {relation},\n{name}',
      'Hug the children for me. Tell them their father/uncle thinks of them always.\n\nForever yours,\n{name}',
    ],
  },

  // After promotion
  promotion: {
    opening: [
      'Dear Father and Mother,',
      'My Dear Family,',
    ],
    body: [
      'I have news that I hope will make you proud. I have been promoted! I am now a {rank}. The responsibility weighs heavily, but I shall do my best to deserve this honour. {personalDetail}',
      'Your son is now a {rank}! The Colonel himself pinned on my stripes. I wish you could have been there to see it. {personalDetail}',
    ],
    closing: [
      'I hope this news brings some joy to you all. I shall try to live up to your expectations.\n\nYour proud {relation},\n{name}',
    ],
  },

  // Describing daily life
  routine: {
    opening: [
      'Dear Mother,',
      'My Darling,',
      'Dear All,',
    ],
    body: [
      'Not much to report today. The food is terrible as usual - bully beef and hard biscuits. We dream of {homeFood}. {personalDetail}',
      'Life in the trenches continues. The rats are as big as cats, and the mud is everywhere. But we keep our spirits up with songs and jokes. {personalDetail}',
      'Another quiet day, thank God. We spent it cleaning kit and writing letters. I received yours from {date} - it made my day. {personalDetail}',
      'The weather has been {weather}, but we manage. {personalDetail} The lads here are good sorts - we look after one another.',
    ],
    closing: [
      'Please send more socks if you can - mine are quite worn through. And perhaps some chocolate?\n\nMissing you all,\n{name}',
      'Is {pet} behaving? Give {petHimHer} a pat from me.\n\nWith love,\n{name}',
    ],
  },

  // Before a big battle
  beforeBattle: {
    opening: [
      'My Dearest,',
      'Dear Mother and Father,',
    ],
    body: [
      'I am not sure when I shall be able to write again, so I wanted to send a few lines now. We are preparing for a big show. {personalDetail} Whatever happens, know that I am at peace.',
      'Something big is coming. I cannot say more, but I wanted you to know that I carry your photograph close to my heart. {personalDetail}',
    ],
    closing: [
      'If anything should happen to me, know that I love you all more than words can say. But do not worry - I intend to come home.\n\nYour loving {relation},\n{name}',
    ],
  },
};

// Personal details to add authenticity - expanded
const PERSONAL_DETAILS = {
  british: [
    'Tommy Jenkins from Lancashire made us laugh with his jokes today.',
    'I found a flower growing in no-man\'s land - can you imagine?',
    'The chaplain held a service yesterday. It brought comfort to many.',
    'I dream of walking through the fields at home.',
    'Remember the apple tree in the garden? I think of it often.',
    'A robin visited our trench today. The lads took it as good luck.',
    'We had a sing-song last night - "It\'s a Long Way to Tipperary" echoed across the trenches.',
    'I have made a friend from Scotland. His accent is quite something!',
    'The post came today - three letters at once! Pure joy.',
    'A stray dog has adopted our unit. We\'ve named him Kaiser and he makes us smile.',
    'I received your photograph. I keep it safe in my breast pocket.',
    'The stars are beautiful here at night. I think of you looking at the same sky.',
    'We celebrated a birthday today with a cake made from biscuits and jam.',
  ],
  french: [
    'Pierre from Provence shared wine from his family\'s vineyard.',
    'The sunset tonight reminded me of our evenings in Paris.',
    'I think often of mother\'s cooking - especially her cassoulet.',
    'Spring is coming. Soon the poppies will bloom again.',
    'The church bells in the nearby village still ring. It reminds me of home.',
    'I have been learning English from the Tommies. They are good lads.',
    'A farmer\'s wife brought us fresh eggs yesterday. We felt like kings.',
    'I carry a photograph of the Eiffel Tower. It reminds me what we fight for.',
    'The wine here is not bad, but nothing like home.',
    'We found a cellar full of champagne in an abandoned house. The captain let us have one bottle.',
  ],
  german: [
    'Hans played his harmonica tonight. It reminded me of home.',
    'I received the package with the sausages - they were wonderful.',
    'Fritz keeps a photograph of his family in his helmet.',
    'The stars here look the same as they do over Munich.',
    'Christmas was hard, but we decorated a small tree in the dugout.',
    'I dream of the beer gardens back home.',
    'One of the men has a cat that catches rats. Very useful!',
    'The Iron Cross was awarded to our sergeant today. He deserved it.',
    'We could hear enemy singing last night. War is strange.',
    'I found a book of poetry in a ruined house. It keeps me company.',
    'Today marks six months since I left home. It feels like forever.',
  ],
  american: [
    'The French civilians treat us well - they seem glad we\'re here.',
    'You wouldn\'t believe how different everything is over here.',
    'I miss baseball. Some of the boys tried to explain it to the Tommies.',
    'The coffee here is terrible - nothing like back home.',
    'Paris! I saw the Eiffel Tower! Wait until I tell you about it.',
    'The British soldiers call us "Yanks." We don\'t mind.',
    'I am learning French. "Merci" means thank you.',
    'The food is... different. I dream of mom\'s apple pie.',
    'The mud here is something else. Kansas mud has nothing on this.',
    'Got to see an aeroplane up close today. The future is amazing.',
    'Some of the boys from my hometown are here too. Feels less lonely.',
    'I carry the flag you gave me. It reminds me why I\'m here.',
  ],
};

// Home food mentions
const HOME_FOODS = {
  british: ['mother\'s roast beef', 'fish and chips', 'a proper cup of tea', 'shepherd\'s pie'],
  french: ['croissants', 'proper wine', 'mother\'s coq au vin', 'fresh bread'],
  german: ['bratwurst', 'mother\'s strudel', 'proper beer', 'schwarzbrot'],
  american: ['apple pie', 'a real steak', 'mother\'s fried chicken', 'proper coffee'],
};

// Family member references
const FAMILY_MEMBERS = [
  'little Tommy', 'sister Mary', 'Grandmother', 'Uncle George', 'the children',
  'old Mr. Jenkins next door', 'the vicar', 'everyone at the factory',
];

// Weather descriptions
const WEATHER = [
  'dreadfully cold', 'rather mild', 'wet as usual', 'surprisingly pleasant',
  'bitterly cold', 'foggy and damp', 'actually quite sunny',
];

// Pet names
const PETS = [
  { name: 'Rex', pronoun: 'him' },
  { name: 'Whiskers', pronoun: 'her' },
  { name: 'Spot', pronoun: 'him' },
  { name: 'Mittens', pronoun: 'her' },
];

/**
 * Generate a letter home based on battle events
 */
export const generateLetter = (params) => {
  const {
    soldierName = 'Tommy',
    occasion = 'routine',
    location = 'The Front',
    faction = 'british',
    rank = 'Private',
    victory = null,
    losses = 0,
  } = params;

  // Determine occasion type
  let letterType = occasion;
  if (occasion === 'battle') {
    if (losses > 0) {
      letterType = 'loss';
    } else if (victory === true) {
      letterType = 'victory';
    } else if (victory === false) {
      letterType = 'defeat';
    }
  }

  const templates = LETTER_TEMPLATES[letterType] || LETTER_TEMPLATES.routine;

  // Random selections
  const opening = templates.opening[Math.floor(Math.random() * templates.opening.length)];
  const bodyTemplate = templates.body[Math.floor(Math.random() * templates.body.length)];
  const closing = templates.closing[Math.floor(Math.random() * templates.closing.length)];

  const personalDetails = PERSONAL_DETAILS[faction] || PERSONAL_DETAILS.british;
  const personalDetail = personalDetails[Math.floor(Math.random() * personalDetails.length)];

  const homeFoods = HOME_FOODS[faction] || HOME_FOODS.british;
  const homeFood = homeFoods[Math.floor(Math.random() * homeFoods.length)];

  const familyMember = FAMILY_MEMBERS[Math.floor(Math.random() * FAMILY_MEMBERS.length)];
  const weather = WEATHER[Math.floor(Math.random() * WEATHER.length)];
  const pet = PETS[Math.floor(Math.random() * PETS.length)];

  // Generate a plausible date (weeks ago)
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30) - 14);
  const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  // Build the letter
  const body = bodyTemplate
    .replace('{location}', location)
    .replace('{personalDetail}', personalDetail)
    .replace('{rank}', rank)
    .replace('{homeFood}', homeFood)
    .replace('{weather}', weather)
    .replace('{date}', dateStr);

  const closingText = closing
    .replace('{name}', soldierName)
    .replace('{relation}', rank === 'Private' ? 'son' : 'son')
    .replace('{familyMember}', familyMember)
    .replace('{pet}', pet.name)
    .replace('{petHimHer}', pet.pronoun);

  const openingWithSpouse = opening.replace('{spouse}', 'My Love');

  // Generate the full letter
  const fullLetter = `${openingWithSpouse}\n\n${body}\n\n${closingText}`;

  // Generate letter metadata
  const letterDate = new Date();
  letterDate.setFullYear(1914 + Math.floor(Math.random() * 5));
  letterDate.setMonth(Math.floor(Math.random() * 12));
  letterDate.setDate(1 + Math.floor(Math.random() * 28));

  return {
    content: fullLetter,
    author: soldierName,
    date: letterDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    location: `Somewhere in ${faction === 'german' ? 'Belgium' : 'France'}`,
    censored: Math.random() > 0.7, // Some letters have censor marks
    occasion: letterType,
  };
};

/**
 * Generate a telegram (for urgent news)
 */
export const generateTelegram = (params) => {
  const {
    soldierName = 'PVT SMITH',
    toFamily = 'SMITH FAMILY',
    type = 'wounded', // 'wounded', 'missing', 'deceased', 'commendation'
    location = 'FRANCE',
  } = params;

  const telegrams = {
    wounded: {
      header: 'WAR OFFICE TELEGRAM',
      body: `REGRET TO INFORM YOU THAT ${soldierName.toUpperCase()} HAS BEEN WOUNDED IN ACTION STOP CURRENTLY RECEIVING TREATMENT AT FIELD HOSPITAL STOP FURTHER NEWS TO FOLLOW STOP`,
    },
    missing: {
      header: 'WAR OFFICE TELEGRAM',
      body: `DEEPLY REGRET TO INFORM YOU THAT ${soldierName.toUpperCase()} IS REPORTED MISSING IN ACTION IN ${location.toUpperCase()} STOP ENQUIRIES ARE BEING MADE STOP`,
    },
    deceased: {
      header: 'WAR OFFICE TELEGRAM',
      body: `IT IS WITH PROFOUND REGRET THAT WE MUST INFORM YOU OF THE DEATH OF ${soldierName.toUpperCase()} WHO FELL IN ACTION IN ${location.toUpperCase()} STOP THE KING AND QUEEN EXTEND THEIR SYMPATHY STOP`,
    },
    commendation: {
      header: 'MINISTRY OF WAR TELEGRAM',
      body: `PLEASED TO INFORM YOU THAT ${soldierName.toUpperCase()} HAS BEEN MENTIONED IN DISPATCHES FOR GALLANTRY IN ${location.toUpperCase()} STOP FORMAL RECOGNITION TO FOLLOW STOP`,
    },
  };

  const telegram = telegrams[type] || telegrams.wounded;

  return {
    ...telegram,
    to: toFamily.toUpperCase(),
    date: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toUpperCase(),
    priority: type === 'deceased' ? 'PRIORITY' : 'STANDARD',
  };
};

/**
 * Collection of famous real WWI letter excerpts (paraphrased for copyright) - expanded
 */
export const HISTORIC_LETTER_THEMES = [
  {
    theme: 'Christmas Truce 1914',
    excerpt: 'The strangest thing happened today. We sang carols with the enemy...',
  },
  {
    theme: 'First Day of the Somme',
    excerpt: 'The whistles blew and over we went. What happened next...',
  },
  {
    theme: 'Gas Attack',
    excerpt: 'A strange yellow cloud came drifting towards us. At first we did not understand...',
  },
  {
    theme: 'Trench Life',
    excerpt: 'We have not been dry for three weeks now. The mud is everywhere...',
  },
  {
    theme: 'Going Over the Top',
    excerpt: 'The officers checked their watches. At 7:30, the whistles would blow...',
  },
  {
    theme: 'First Sight of a Tank',
    excerpt: 'We thought it was some great beast. A metal monster crawling across no-man\'s land...',
  },
  {
    theme: 'Night Raid',
    excerpt: 'We blackened our faces and fixed bayonets. In silence, we crept towards their wire...',
  },
  {
    theme: 'The Mail Call',
    excerpt: 'When the letters arrive, everything stops. For a moment, we are home again...',
  },
  {
    theme: 'Artillery Bombardment',
    excerpt: 'The ground shakes without ceasing. You cannot think. You cannot sleep...',
  },
  {
    theme: 'No Man\'s Land',
    excerpt: 'Between our trenches lies a wasteland. Trees stripped bare, craters filled with water...',
  },
  {
    theme: 'The Armistice',
    excerpt: 'At eleven o\'clock, the guns fell silent. After four years, peace...',
  },
  {
    theme: 'Stand-To at Dawn',
    excerpt: 'Every morning before sunrise, we man the fire step. The most dangerous time...',
  },
];

/**
 * Generate a postcard message (shorter, more casual)
 */
export const generatePostcard = (params) => {
  const {
    soldierName = 'Tommy',
    faction = 'british',
  } = params;

  const postcardMessages = {
    british: [
      'Greetings from France! Weather cold but spirits high. Home soon, I hope. - {name}',
      'Just a quick note to say I\'m well. Missing you all terribly. Chin up! - {name}',
      'Still here, still fighting, still thinking of home. Send chocolate! - {name}',
      'The lads send their regards. We\'re managing. Don\'t worry about me. - {name}',
    ],
    french: [
      'Bonjour from the front! The war continues but so does hope. - {name}',
      'A quick word to say I am safe. Thinking of you always. - {name}',
      'France holds firm. I hold your picture. À bientôt. - {name}',
    ],
    german: [
      'Brief greetings from the field. All is well. Thinking of home. - {name}',
      'The war goes on but spirits remain high. Write soon. - {name}',
      'Short note only - we move soon. Love to all. - {name}',
    ],
    american: [
      'Made it to France in one piece! Quite an adventure. More soon. - {name}',
      'Greetings from "Over There"! The boys are in good spirits. - {name}',
      'Quick note home - we\'re giving Fritz what for! Miss you. - {name}',
    ],
  };

  const messages = postcardMessages[faction] || postcardMessages.british;
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    message: message.replace('{name}', soldierName),
    location: faction === 'german' ? 'Somewhere in Belgium' : 'Somewhere in France',
    date: new Date(1914 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28))
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    censorStamp: Math.random() > 0.5,
  };
};

export default {
  generateLetter,
  generateTelegram,
  generatePostcard,
  HISTORIC_LETTER_THEMES,
};
