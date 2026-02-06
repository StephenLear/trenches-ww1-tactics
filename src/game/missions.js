// WW1 Tactical Game - Mission Data
// All 15 campaign missions (1914-1918)

// Faction alignments: 'entente' = British/French/American side, 'central' = German/Ottoman side
// When player faction doesn't match, positions are flipped

export const MISSIONS = {
  1: {
    id: 1,
    name: "Hold the Line",
    location: "Western Front, France",
    date: "February 1916",
    weather: 'rain',
    briefing: "The German artillery has been hammering us for days. Hold this trench at all costs. A medic has joined us - keep him alive to tend the wounded.",
    objective: "Eliminate all German forces",
    victoryLog: "We held the line. The survivors are hardened veterans now.",
    defeatLog: "The line broke. We fought hard, but it wasn't enough.",
    diaryEntry: {
      before: "February 14th, 1916\n\nThe mud here is endless. We've been in these trenches for three days now, and the German artillery hasn't stopped. A medic arrived yesterday - Doc they call him. Good to have someone who can patch us up. Tomorrow, I reckon Fritz will come in force. We're ready.",
      afterVictory: "February 15th, 1916\n\nWe held them. Doc saved at least three men who would have bled out. The men who made it through are different now. Harder. We're veterans now.",
      afterDefeat: "February 15th, 1916\n\nWe didn't hold. Even Doc couldn't save them all. I'll carry their names with me."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 5, y: 6 },
      { id: 3, type: 'machinegun', team: 'player', x: 3, y: 7 },
      { id: 4, type: 'officer', team: 'player', x: 4, y: 7 },
      { id: 5, type: 'medic', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 7, type: 'infantry', team: 'enemy', x: 5, y: 1 },
      { id: 8, type: 'machinegun', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' },
      { x: 4, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' }, { x: 6, y: 6, type: 'trench' },
      { x: 1, y: 1, type: 'trench' }, { x: 2, y: 1, type: 'trench' }, { x: 3, y: 1, type: 'trench' },
      { x: 4, y: 1, type: 'trench' }, { x: 5, y: 1, type: 'trench' }, { x: 6, y: 1, type: 'trench' },
      { x: 2, y: 3, type: 'mud' }, { x: 3, y: 3, type: 'mud' }, { x: 4, y: 3, type: 'mud' }, { x: 5, y: 3, type: 'mud' },
      { x: 2, y: 4, type: 'mud' }, { x: 3, y: 4, type: 'mud' }, { x: 4, y: 4, type: 'mud' }, { x: 5, y: 4, type: 'mud' },
      { x: 3, y: 2, type: 'barbed_wire' }, { x: 4, y: 2, type: 'barbed_wire' },
      { x: 3, y: 5, type: 'barbed_wire' }, { x: 4, y: 5, type: 'barbed_wire' }
    ]
  },
  2: {
    id: 2,
    name: "Cavalry's Last Charge",
    location: "Eastern Front, Poland",
    date: "August 1914",
    weather: 'clear',
    briefing: "The old ways meet the new. Lead a cavalry charge against the German positions - but beware their machine guns. This may be the last great cavalry charge of the war.",
    objective: "Capture the supply depot",
    victoryLog: "The charge succeeded, but at terrible cost. Cavalry has no place in modern war.",
    defeatLog: "The machine guns cut us down. The age of cavalry is over.",
    diaryEntry: {
      before: "August 20th, 1914\n\nThey've given us horses and sabers, like it's still Napoleon's time. The officers speak of glory and honor. But I've seen the German machine guns. Still, orders are orders. We ride at dawn.",
      afterVictory: "August 21st, 1914\n\nWe took the depot, but the cost... The machine guns scythed through us like wheat. Those who survived will never forget the sound. War has changed.",
      afterDefeat: "August 21st, 1914\n\nThe charge failed. The horses fell, the men fell. Modern war has no room for cavalry glory."
    },
    units: [
      { id: 1, type: 'cavalry', team: 'player', x: 0, y: 7 },
      { id: 2, type: 'cavalry', team: 'player', x: 1, y: 7 },
      { id: 3, type: 'cavalry', team: 'player', x: 2, y: 7 },
      { id: 4, type: 'officer', team: 'player', x: 1, y: 6 },
      { id: 5, type: 'infantry', team: 'enemy', x: 6, y: 1 },
      { id: 6, type: 'infantry', team: 'enemy', x: 7, y: 2 },
      { id: 7, type: 'machinegun', team: 'enemy', x: 7, y: 0 }
    ],
    terrain: [
      { x: 7, y: 0, type: 'objective' },
      { x: 3, y: 4, type: 'mud' }, { x: 4, y: 4, type: 'mud' }, { x: 5, y: 4, type: 'mud' }
    ]
  },
  3: {
    id: 3,
    name: "Iron Beasts",
    location: "Somme, France",
    date: "September 1916",
    weather: 'fog',
    briefing: "The new 'landships' have arrived. Command calls them tanks. Use them to break through the German lines - they can crush barbed wire and shrug off small arms fire. The fog will give you cover to close the distance.",
    objective: "Eliminate all German forces",
    victoryLog: "The tanks worked! The Germans fled in terror. A new era of warfare has begun.",
    defeatLog: "Even the tanks couldn't save us. Many broke down, others got stuck. The promise of easy victory was a lie.",
    diaryEntry: {
      before: "September 15th, 1916\n\nThey showed us the tanks yesterday. Massive iron beasts that crawl across the ground. The crew say they're invincible. I hope they're right - today we find out.",
      afterVictory: "September 16th, 1916\n\nThe tanks broke through! Germans ran in terror from these metal monsters. War will never be the same.",
      afterDefeat: "September 16th, 1916\n\nThe tanks failed us. Mechanical problems, stuck in mud, picked off by artillery. So much for invincible."
    },
    units: [
      { id: 1, type: 'tank', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'tank', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 0, y: 6 },
      { id: 4, type: 'infantry', team: 'player', x: 4, y: 6 },
      { id: 5, type: 'officer', team: 'player', x: 2, y: 6 },
      { id: 6, type: 'medic', team: 'player', x: 2, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 5, y: 2 },
      { id: 8, type: 'infantry', team: 'enemy', x: 6, y: 2 },
      { id: 9, type: 'machinegun', team: 'enemy', x: 7, y: 1 }
    ],
    terrain: [
      { x: 7, y: 0, type: 'objective' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' }, { x: 5, y: 4, type: 'barbed_wire' },
      { x: 1, y: 5, type: 'crater' }, { x: 4, y: 5, type: 'crater' }, { x: 6, y: 5, type: 'crater' },
      { x: 2, y: 2, type: 'crater' }, { x: 5, y: 2, type: 'crater' },
      { x: 0, y: 3, type: 'trench' }, { x: 1, y: 3, type: 'trench' }
    ]
  },
  4: {
    id: 4,
    name: "Sniper's Alley",
    location: "Ypres Salient, Belgium",
    date: "March 1917",
    weather: 'rain',
    briefing: "The Germans have snipers picking off our officers. We're sending in our own marksmen. Find and eliminate the enemy snipers before they eliminate us.",
    objective: "Eliminate all enemy snipers",
    victoryLog: "Their snipers are dead. We can move freely again.",
    defeatLog: "We couldn't find them in time. More officers fell to their bullets.",
    diaryEntry: {
      before: "March 5th, 1917\n\nEvery time an officer raises his head, crack - another one dead. German snipers have this whole sector covered. Command's sending in our best shots to deal with them.",
      afterVictory: "March 6th, 1917\n\nWe got them. A deadly game of cat and mouse, but our lads were better. The officers can breathe again.",
      afterDefeat: "March 6th, 1917\n\nWe lost. The German snipers were too good, too well hidden. We paid the price."
    },
    units: [
      { id: 1, type: 'sniper', team: 'player', x: 0, y: 7 },
      { id: 2, type: 'sniper', team: 'player', x: 2, y: 7 },
      { id: 3, type: 'scout', team: 'player', x: 1, y: 6 },
      { id: 4, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 5, type: 'sniper', team: 'enemy', x: 7, y: 0 },
      { id: 6, type: 'sniper', team: 'enemy', x: 5, y: 2 },
      { id: 7, type: 'infantry', team: 'enemy', x: 6, y: 1 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 3 }
    ],
    terrain: [
      { x: 1, y: 3, type: 'crater' }, { x: 3, y: 4, type: 'crater' }, { x: 5, y: 5, type: 'crater' },
      { x: 2, y: 1, type: 'crater' }, { x: 6, y: 3, type: 'crater' },
      { x: 0, y: 4, type: 'trench' }, { x: 1, y: 4, type: 'trench' }, { x: 2, y: 4, type: 'trench' },
      { x: 5, y: 1, type: 'trench' }, { x: 6, y: 1, type: 'trench' }, { x: 7, y: 1, type: 'trench' }
    ]
  },
  5: {
    id: 5,
    name: "Artillery Duel",
    location: "Verdun, France",
    date: "June 1916",
    weather: 'clear',
    briefing: "The German guns are tearing our lines apart. We've brought up our own artillery. Silence their batteries before they destroy us completely.",
    objective: "Destroy all enemy artillery",
    victoryLog: "Their guns are silent. The bombardment has stopped. We can rebuild.",
    defeatLog: "We couldn't stop them. The shelling continues. How much more can we take?",
    diaryEntry: {
      before: "June 10th, 1916\n\nVerdun. They call it the 'meat grinder'. The German artillery never stops. Shells fall day and night. But now we have guns of our own. Time to give them a taste.",
      afterVictory: "June 11th, 1916\n\nWe got their guns. The silence is almost unnerving after months of constant shelling. Small mercy.",
      afterDefeat: "June 11th, 1916\n\nWe failed. The shells keep falling. Verdun will be our grave."
    },
    units: [
      { id: 1, type: 'artillery', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'artillery', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 0, y: 6 },
      { id: 4, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'scout', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'artillery', team: 'enemy', x: 6, y: 0 },
      { id: 7, type: 'artillery', team: 'enemy', x: 4, y: 0 },
      { id: 8, type: 'infantry', team: 'enemy', x: 5, y: 2 },
      { id: 9, type: 'infantry', team: 'enemy', x: 7, y: 2 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 6, y: 1 }
    ],
    terrain: [
      { x: 0, y: 7, type: 'trench' }, { x: 1, y: 7, type: 'trench' }, { x: 2, y: 7, type: 'trench' }, { x: 3, y: 7, type: 'trench' },
      { x: 2, y: 3, type: 'crater' }, { x: 3, y: 3, type: 'crater' }, { x: 4, y: 3, type: 'crater' },
      { x: 1, y: 4, type: 'crater' }, { x: 5, y: 4, type: 'crater' },
      { x: 3, y: 2, type: 'crater' }, { x: 6, y: 3, type: 'crater' }
    ]
  },
  6: {
    id: 6,
    name: "Gallipoli Landing",
    location: "Gallipoli Peninsula, Turkey",
    date: "April 1915",
    weather: 'clear',
    briefing: "The beach landing begins at dawn. We've brought everything - tanks to push through, medics to save the wounded. Take those cliffs!",
    objective: "Capture the clifftop position",
    victoryLog: "We took the cliffs. The new equipment made the difference. But the cost...",
    defeatLog: "The landing failed. Even tanks couldn't save us from those machine guns.",
    specialMechanic: 'beach',
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 2, y: 7 },
      { id: 3, type: 'tank', team: 'player', x: 3, y: 7 },
      { id: 4, type: 'medic', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'officer', team: 'player', x: 1, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 1, y: 2 },
      { id: 7, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 8, type: 'machinegun', team: 'enemy', x: 3, y: 3 },
      { id: 9, type: 'infantry', team: 'enemy', x: 0, y: 3 }
    ],
    terrain: [
      { x: 0, y: 0, type: 'objective' },
      { x: 0, y: 7, type: 'water' }, { x: 1, y: 7, type: 'water' }, { x: 2, y: 7, type: 'water' }, { x: 3, y: 7, type: 'water' }, { x: 4, y: 7, type: 'water' },
      { x: 0, y: 6, type: 'beach' }, { x: 1, y: 6, type: 'beach' }, { x: 2, y: 6, type: 'beach' }, { x: 3, y: 6, type: 'beach' }, { x: 4, y: 6, type: 'beach' }, { x: 5, y: 6, type: 'beach' },
      { x: 0, y: 5, type: 'beach' }, { x: 1, y: 5, type: 'beach' }, { x: 2, y: 5, type: 'beach' }, { x: 3, y: 5, type: 'beach' }, { x: 4, y: 5, type: 'beach' },
      { x: 0, y: 1, type: 'mountain' }, { x: 1, y: 1, type: 'mountain' },
      { x: 0, y: 2, type: 'mountain' }, { x: 1, y: 2, type: 'mountain' }
    ]
  },
  7: {
    id: 7,
    name: "Alpine Assault",
    location: "Italian Alps",
    date: "June 1917",
    weather: 'fog',
    briefing: "The final push. Take the Austrian mountain position. Use everything we've learned. Artillery for suppression, snipers for their officers, medics for our wounded.",
    objective: "Eliminate all Austrian forces",
    specialMechanic: 'altitude',
    victoryLog: "The mountain is ours. Four years of war, and we've mastered every terrain, every weapon. Is this what victory feels like?",
    defeatLog: "The mountain defeated us. After everything we've been through... the Alps were our grave.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 4, y: 7 },
      { id: 3, type: 'sniper', team: 'player', x: 2, y: 6 },
      { id: 4, type: 'medic', team: 'player', x: 5, y: 6 },
      { id: 5, type: 'artillery', team: 'player', x: 1, y: 7 },
      { id: 6, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 7, type: 'infantry', team: 'enemy', x: 3, y: 1 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 2 },
      { id: 9, type: 'machinegun', team: 'enemy', x: 3, y: 0 },
      { id: 10, type: 'sniper', team: 'enemy', x: 5, y: 1 }
    ],
    terrain: [
      { x: 0, y: 0, type: 'mountain' }, { x: 1, y: 0, type: 'mountain' }, { x: 2, y: 0, type: 'mountain' },
      { x: 3, y: 0, type: 'mountain' }, { x: 4, y: 0, type: 'mountain' }, { x: 5, y: 0, type: 'mountain' },
      { x: 0, y: 1, type: 'mountain' }, { x: 1, y: 1, type: 'mountain' }, { x: 2, y: 1, type: 'mountain' },
      { x: 3, y: 1, type: 'mountain' }, { x: 4, y: 1, type: 'mountain' }, { x: 5, y: 1, type: 'mountain' },
      { x: 1, y: 2, type: 'mountain' }, { x: 2, y: 2, type: 'mountain' },
      { x: 3, y: 2, type: 'mountain' }, { x: 4, y: 2, type: 'mountain' },
      { x: 2, y: 3, type: 'mountain' }, { x: 3, y: 3, type: 'mountain' }
    ]
  },
  8: {
    id: 8,
    name: "Battle of Mons",
    location: "Mons, Belgium",
    date: "August 23, 1914",
    weather: 'clear',
    briefing: "The British Expeditionary Force stands alone. Hold the line against the German advance for 6 turns until the retreat order comes. You don't need to kill them all - just survive!",
    objective: "Survive 6 turns to retreat",
    specialVictory: 'survive_turns',
    turnsToSurvive: 6,
    victoryLog: "We held them long enough. The retreat was ordered. We lived to fight another day.",
    defeatLog: "The line collapsed too soon. We couldn't hold long enough to complete the withdrawal.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 6 },
      { id: 3, type: 'infantry', team: 'player', x: 5, y: 6 },
      { id: 4, type: 'officer', team: 'player', x: 3, y: 7 },
      { id: 5, type: 'machinegun', team: 'player', x: 2, y: 7 },
      { id: 6, type: 'medic', team: 'player', x: 4, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 9, type: 'infantry', team: 'enemy', x: 6, y: 0 },
      { id: 10, type: 'infantry', team: 'enemy', x: 1, y: 0 },
      { id: 11, type: 'machinegun', team: 'enemy', x: 3, y: 0 },
      { id: 12, type: 'officer', team: 'enemy', x: 4, y: 0 }
    ],
    terrain: [
      { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' }, { x: 4, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' },
      { x: 1, y: 5, type: 'trench' }, { x: 2, y: 5, type: 'trench' }, { x: 3, y: 5, type: 'trench' }, { x: 4, y: 5, type: 'trench' }, { x: 5, y: 5, type: 'trench' },
      { x: 0, y: 3, type: 'water' }, { x: 0, y: 4, type: 'water' }, { x: 7, y: 3, type: 'water' }, { x: 7, y: 4, type: 'water' },
      { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' }, { x: 4, y: 3, type: 'barbed_wire' }, { x: 5, y: 3, type: 'barbed_wire' },
      { x: 1, y: 2, type: 'crater' }, { x: 4, y: 2, type: 'crater' }, { x: 6, y: 2, type: 'crater' }
    ]
  },
  9: {
    id: 9,
    name: "Gas Attack",
    location: "Second Ypres, Belgium",
    date: "April 22, 1915",
    weather: 'fog',
    briefing: "The Germans have unleashed something new and terrible - poison gas. It hangs thick in the fog. We must evacuate our positions before the gas kills us all. Rally your people and retreat to safety!",
    objective: "Retreat from the gas zone",
    specialVictory: 'retreat',
    victoryLog: "We escaped the gas. The men coughed and wheezed, but we all made it out alive. This is a new kind of horror.",
    defeatLog: "We couldn't escape the gas in time. The men fell gasping. War will never be the same.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 2, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 4, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 3, y: 6 },
      { id: 4, type: 'medic', team: 'player', x: 3, y: 7 },
      { id: 5, type: 'officer', team: 'player', x: 2, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 7, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 8, type: 'machinegun', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 2, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' }, { x: 4, y: 6, type: 'trench' },
      { x: 1, y: 5, type: 'trench' }, { x: 3, y: 5, type: 'trench' }, { x: 5, y: 5, type: 'trench' },
      { x: 2, y: 4, type: 'crater' }, { x: 4, y: 4, type: 'crater' },
      { x: 1, y: 3, type: 'crater' }, { x: 3, y: 3, type: 'crater' }, { x: 5, y: 3, type: 'crater' },
      { x: 0, y: 0, type: 'objective' }, { x: 1, y: 0, type: 'objective' }
    ]
  },
  10: {
    id: 10,
    name: "Jutland Defense",
    location: "North Sea Coast",
    date: "May 31, 1916",
    weather: 'rain',
    briefing: "The coast guard reports enemy landing forces approaching. Our artillery batteries must hold this position. If we lose the guns, the coast falls. Defend the batteries at all costs!",
    objective: "Protect the coastal batteries",
    specialVictory: 'protect_artillery',
    victoryLog: "The landing force was repelled. The artillery stands ready. The coast is secure.",
    defeatLog: "We lost the batteries. The enemy holds the coast. Germany controls the seas now.",
    units: [
      { id: 1, type: 'artillery', team: 'player', x: 1, y: 0 },
      { id: 2, type: 'artillery', team: 'player', x: 6, y: 0 },
      { id: 3, type: 'infantry', team: 'player', x: 0, y: 2 },
      { id: 4, type: 'infantry', team: 'player', x: 7, y: 2 },
      { id: 5, type: 'machinegun', team: 'player', x: 3, y: 3 },
      { id: 6, type: 'infantry', team: 'enemy', x: 1, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 3, y: 7 },
      { id: 8, type: 'infantry', team: 'enemy', x: 5, y: 7 },
      { id: 9, type: 'infantry', team: 'enemy', x: 7, y: 7 },
      { id: 10, type: 'infantry', team: 'enemy', x: 2, y: 7 },
      { id: 11, type: 'infantry', team: 'enemy', x: 6, y: 7 },
      { id: 12, type: 'tank', team: 'enemy', x: 3, y: 6 },
      { id: 13, type: 'officer', team: 'enemy', x: 4, y: 7 }
    ],
    terrain: [
      { x: 0, y: 0, type: 'beach' }, { x: 1, y: 0, type: 'beach' }, { x: 2, y: 0, type: 'beach' },
      { x: 3, y: 0, type: 'beach' }, { x: 4, y: 0, type: 'beach' }, { x: 5, y: 0, type: 'beach' }, { x: 6, y: 0, type: 'beach' },
      { x: 2, y: 3, type: 'crater' }, { x: 5, y: 4, type: 'crater' },
      { x: 0, y: 5, type: 'water' }, { x: 1, y: 5, type: 'water' }, { x: 6, y: 5, type: 'water' }, { x: 7, y: 5, type: 'water' }
    ]
  },
  11: {
    id: 11,
    name: "Brusilov Offensive",
    location: "Eastern Front, Galicia",
    date: "June 4, 1916",
    weather: 'clear',
    briefing: "The Russian attack has begun. We punch through the Austro-Hungarian lines. Cavalry will exploit the breakthrough while we advance with tanks and artillery. This is our moment - drive forward!",
    objective: "Break through enemy lines",
    specialVictory: 'break_through',
    victoryLog: "We broke through! The cavalry charges through the gap. The enemy line is shattered. This is how wars are won.",
    defeatLog: "We couldn't break the line. The barbed wire held and the enemy reinforcements arrived. Another stalemate.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 0, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 2, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 4, y: 7 },
      { id: 4, type: 'cavalry', team: 'player', x: 1, y: 6 },
      { id: 5, type: 'tank', team: 'player', x: 3, y: 6 },
      { id: 6, type: 'artillery', team: 'player', x: 5, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 1, y: 1 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 9, type: 'infantry', team: 'enemy', x: 6, y: 1 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 2, y: 0 },
      { id: 11, type: 'machinegun', team: 'enemy', x: 5, y: 0 },
      { id: 12, type: 'officer', team: 'enemy', x: 3, y: 1 }
    ],
    terrain: [
      { x: 1, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' },
      { x: 1, y: 3, type: 'mud' }, { x: 2, y: 3, type: 'mud' }, { x: 3, y: 3, type: 'mud' }, { x: 4, y: 3, type: 'mud' }, { x: 5, y: 3, type: 'mud' },
      { x: 1, y: 2, type: 'mud' }, { x: 2, y: 2, type: 'mud' }, { x: 3, y: 2, type: 'mud' }, { x: 4, y: 2, type: 'mud' }, { x: 5, y: 2, type: 'mud' },
      { x: 0, y: 0, type: 'objective' }, { x: 1, y: 0, type: 'objective' }, { x: 2, y: 0, type: 'objective' }
    ]
  },
  12: {
    id: 12,
    name: "Vimy Ridge",
    location: "Vimy Ridge, France",
    date: "April 9, 1917",
    weather: 'rain',
    briefing: "The ridge is heavily fortified and held by experienced German defenders. We attack uphill against machine gun fire and artillery. But today, the Canadians prove their worth. Take the ridge!",
    objective: "Capture the ridge top",
    specialVictory: 'capture_objectives',
    victoryLog: "We reached the top! The Canadian assault succeeded where others failed. Vimy Ridge is ours. This victory will echo through the ages.",
    defeatLog: "The ridge held. We couldn't push through their defenses. The machine guns were too many.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'tank', team: 'player', x: 2, y: 7 },
      { id: 4, type: 'sniper', team: 'player', x: 0, y: 6 },
      { id: 5, type: 'medic', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 1, y: 1 },
      { id: 7, type: 'infantry', team: 'enemy', x: 3, y: 0 },
      { id: 8, type: 'infantry', team: 'enemy', x: 5, y: 1 },
      { id: 9, type: 'machinegun', team: 'enemy', x: 2, y: 0 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 4, y: 1 },
      { id: 11, type: 'artillery', team: 'enemy', x: 6, y: 0 }
    ],
    terrain: [
      { x: 0, y: 0, type: 'mountain' }, { x: 1, y: 0, type: 'mountain' }, { x: 2, y: 0, type: 'mountain' },
      { x: 3, y: 0, type: 'mountain' }, { x: 4, y: 0, type: 'mountain' }, { x: 5, y: 0, type: 'mountain' },
      { x: 0, y: 1, type: 'mountain' }, { x: 1, y: 1, type: 'mountain' }, { x: 2, y: 1, type: 'mountain' },
      { x: 3, y: 1, type: 'mountain' }, { x: 4, y: 1, type: 'mountain' },
      { x: 1, y: 2, type: 'mountain' }, { x: 3, y: 2, type: 'mountain' },
      { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' }, { x: 4, y: 3, type: 'barbed_wire' },
      { x: 1, y: 5, type: 'crater' }, { x: 3, y: 5, type: 'crater' }, { x: 5, y: 5, type: 'crater' },
      { x: 0, y: 0, type: 'objective' }
    ]
  },
  13: {
    id: 13,
    name: "Passchendaele",
    location: "Ypres Salient, Belgium",
    date: "October 12, 1917",
    weather: 'rain',
    briefing: "The mud. The endless mud. Passchendaele has become hell on earth. Every step sinks deep. Casualty rates are catastrophic. But we must advance. The village ruins are the objective. Move carefully, stay alive.",
    objective: "Capture the village ruins",
    specialVictory: 'capture_objectives',
    victoryLog: "We reached the ruins. Passchendaele is ours. The victory cost everything, but we hold the ground.",
    defeatLog: "Passchendaele defeated us. We couldn't advance through the mud. The battle continues.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 5, y: 7 },
      { id: 4, type: 'tank', team: 'player', x: 2, y: 7 },
      { id: 5, type: 'medic', team: 'player', x: 4, y: 7 },
      { id: 6, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 7, type: 'sniper', team: 'player', x: 6, y: 7 },
      { id: 8, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 9, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 3, y: 0 },
      { id: 11, type: 'infantry', team: 'enemy', x: 6, y: 2 }
    ],
    terrain: [
      { x: 2, y: 4, type: 'mud' }, { x: 3, y: 4, type: 'mud' }, { x: 4, y: 4, type: 'mud' }, { x: 5, y: 4, type: 'mud' },
      { x: 2, y: 5, type: 'mud' }, { x: 3, y: 5, type: 'mud' }, { x: 4, y: 5, type: 'mud' }, { x: 5, y: 5, type: 'mud' },
      { x: 1, y: 2, type: 'crater' }, { x: 3, y: 2, type: 'crater' }, { x: 5, y: 2, type: 'crater' },
      { x: 0, y: 3, type: 'crater' }, { x: 6, y: 3, type: 'crater' },
      { x: 0, y: 0, type: 'objective' }
    ]
  },
  14: {
    id: 14,
    name: "Spring Offensive",
    location: "Western Front, France",
    date: "March 21, 1918",
    weather: 'fog',
    briefing: "The Germans launch their final massive assault. We're heavily outnumbered. Our defensive line must hold. Use machine gun positions to maximum effect and coordinate artillery barrages. This is our last stand before American reinforcements arrive!",
    objective: "Survive the assault",
    specialVictory: 'survive_waves',
    victoryLog: "We held the line. The German assault broke against our defenses. Reinforcements are on the way. We can do this!",
    defeatLog: "The German offensive broke through. Our line collapsed. They pour through the gap.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 0, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 3, type: 'machinegun', team: 'player', x: 1, y: 7 },
      { id: 4, type: 'machinegun', team: 'player', x: 3, y: 7 },
      { id: 5, type: 'artillery', team: 'player', x: 5, y: 7 },
      { id: 6, type: 'officer', team: 'player', x: 2, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 1, y: 0 },
      { id: 8, type: 'infantry', team: 'enemy', x: 3, y: 0 },
      { id: 9, type: 'infantry', team: 'enemy', x: 5, y: 0 },
      { id: 10, type: 'infantry', team: 'enemy', x: 0, y: 1 },
      { id: 11, type: 'cavalry', team: 'enemy', x: 2, y: 1 },
      { id: 12, type: 'cavalry', team: 'enemy', x: 6, y: 1 },
      { id: 13, type: 'tank', team: 'enemy', x: 4, y: 2 }
    ],
    terrain: [
      { x: 0, y: 6, type: 'trench' }, { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' },
      { x: 3, y: 6, type: 'trench' }, { x: 4, y: 6, type: 'trench' },
      { x: 0, y: 5, type: 'trench' }, { x: 2, y: 5, type: 'trench' }, { x: 4, y: 5, type: 'trench' },
      { x: 1, y: 4, type: 'barbed_wire' }, { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' },
      { x: 1, y: 3, type: 'crater' }, { x: 3, y: 3, type: 'crater' }, { x: 5, y: 3, type: 'crater' }
    ]
  },
  15: {
    id: 15,
    name: "Hundred Days",
    location: "Amiens, France",
    date: "August 8, 1918",
    weather: 'clear',
    briefing: "The final offensive begins. We have all the tools now - tanks, artillery, cavalry, snipers, medics. Break the Hindenburg Line. End the war. This is our moment of total victory!",
    objective: "Break the Hindenburg Line",
    specialVictory: 'capture_objectives',
    victoryLog: "The Hindenburg Line is broken! The war is ending! After four years of hell, victory is finally ours!",
    defeatLog: "The line still holds. But reinforcements are coming. The war continues, but we sense the end is near.",
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'tank', team: 'player', x: 0, y: 6 },
      { id: 4, type: 'tank', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'cavalry', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'artillery', team: 'player', x: 5, y: 7 },
      { id: 7, type: 'sniper', team: 'player', x: 6, y: 6 },
      { id: 8, type: 'medic', team: 'player', x: 2, y: 5 },
      { id: 9, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 10, type: 'infantry', team: 'enemy', x: 4, y: 0 },
      { id: 11, type: 'infantry', team: 'enemy', x: 6, y: 1 },
      { id: 12, type: 'machinegun', team: 'enemy', x: 3, y: 0 },
      { id: 13, type: 'machinegun', team: 'enemy', x: 5, y: 1 },
      { id: 14, type: 'artillery', team: 'enemy', x: 7, y: 0 },
      { id: 15, type: 'tank', team: 'enemy', x: 4, y: 2 }
    ],
    terrain: [
      { x: 2, y: 0, type: 'objective' }, { x: 4, y: 0, type: 'objective' }, { x: 6, y: 0, type: 'objective' },
      { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' }, { x: 5, y: 4, type: 'barbed_wire' },
      { x: 0, y: 3, type: 'trench' }, { x: 1, y: 3, type: 'trench' }, { x: 2, y: 4, type: 'trench' },
      { x: 3, y: 5, type: 'crater' }, { x: 5, y: 5, type: 'crater' }, { x: 6, y: 4, type: 'crater' }
    ]
  },
  16: {
    id: 16,
    name: "Tannenberg",
    location: "East Prussia, Germany",
    date: "August 26, 1914",
    weather: 'clear',
    briefing: "The Russian Second Army has invaded East Prussia. General Hindenburg has a plan - encircle and destroy them in the forests near Tannenberg. Execute the flanking maneuver and trap the enemy!",
    objective: "Encircle and eliminate Russian forces",
    victoryLog: "Complete victory! The Russian Second Army is destroyed. Tannenberg will echo through history as Germany's greatest triumph in the East.",
    defeatLog: "The encirclement failed. The Russians escape to fight another day. East Prussia remains threatened.",
    diaryEntry: {
      before: "August 26th, 1914\n\nThe Russians outnumber us, but our officers say they're disorganized. Hindenburg's plan is bold - we swing around their flank while they stumble through the forests. If it works, we trap their entire army.",
      afterVictory: "August 30th, 1914\n\nIt worked. The Russian army is gone - captured, killed, scattered. I've never seen such a complete victory. The Eastern Front is saved.",
      afterDefeat: "August 30th, 1914\n\nThey slipped away. Our flanking move was too slow. The war in the East continues."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 0, y: 4 },
      { id: 2, type: 'infantry', team: 'player', x: 7, y: 4 },
      { id: 3, type: 'cavalry', team: 'player', x: 0, y: 6 },
      { id: 4, type: 'cavalry', team: 'player', x: 7, y: 6 },
      { id: 5, type: 'artillery', team: 'player', x: 3, y: 7 },
      { id: 6, type: 'officer', team: 'player', x: 4, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 3, y: 3 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 3 },
      { id: 9, type: 'infantry', team: 'enemy', x: 3, y: 2 },
      { id: 10, type: 'infantry', team: 'enemy', x: 4, y: 2 },
      { id: 11, type: 'artillery', team: 'enemy', x: 3, y: 1 },
      { id: 12, type: 'officer', team: 'enemy', x: 4, y: 1 }
    ],
    terrain: [
      { x: 1, y: 2, type: 'forest' }, { x: 2, y: 2, type: 'forest' }, { x: 5, y: 2, type: 'forest' }, { x: 6, y: 2, type: 'forest' },
      { x: 1, y: 3, type: 'forest' }, { x: 2, y: 3, type: 'forest' }, { x: 5, y: 3, type: 'forest' }, { x: 6, y: 3, type: 'forest' },
      { x: 0, y: 1, type: 'forest' }, { x: 7, y: 1, type: 'forest' },
      { x: 3, y: 4, type: 'mud' }, { x: 4, y: 4, type: 'mud' }
    ]
  },
  17: {
    id: 17,
    name: "Cambrai",
    location: "Cambrai, France",
    date: "November 20, 1917",
    weather: 'fog',
    briefing: "The first mass tank assault in history begins today. Over 400 tanks will advance without preliminary bombardment - complete surprise! Smash through the Hindenburg Line and show the world what armor can do!",
    objective: "Break through the Hindenburg Line",
    specialVictory: 'capture_objectives',
    victoryLog: "Breakthrough achieved! The tanks crushed the wire and overran the trenches. This is the future of warfare!",
    defeatLog: "The tanks bogged down and were picked off by artillery. The Hindenburg Line still holds.",
    diaryEntry: {
      before: "November 20th, 1917\n\nHundreds of tanks lined up in the fog. No artillery barrage - we're going in silent, using surprise. The infantry will follow once we break through. This could change everything.",
      afterVictory: "November 21st, 1917\n\nWe broke through! Miles of German trenches overrun in hours. Church bells are ringing in England for the first time since 1914. The tank has proven itself.",
      afterDefeat: "November 21st, 1917\n\nToo many tanks broke down. German artillery found their range. We gained ground but couldn't hold it."
    },
    units: [
      { id: 1, type: 'tank', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'tank', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'tank', team: 'player', x: 5, y: 7 },
      { id: 4, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'infantry', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 7, type: 'infantry', team: 'enemy', x: 2, y: 2 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 2 },
      { id: 9, type: 'machinegun', team: 'enemy', x: 3, y: 1 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 5, y: 1 },
      { id: 11, type: 'artillery', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 1, y: 0, type: 'objective' }, { x: 3, y: 0, type: 'objective' }, { x: 5, y: 0, type: 'objective' },
      { x: 1, y: 2, type: 'trench' }, { x: 2, y: 2, type: 'trench' }, { x: 3, y: 2, type: 'trench' },
      { x: 4, y: 2, type: 'trench' }, { x: 5, y: 2, type: 'trench' }, { x: 6, y: 2, type: 'trench' },
      { x: 1, y: 3, type: 'barbed_wire' }, { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' },
      { x: 4, y: 3, type: 'barbed_wire' }, { x: 5, y: 3, type: 'barbed_wire' }, { x: 6, y: 3, type: 'barbed_wire' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' }, { x: 5, y: 4, type: 'barbed_wire' }
    ]
  },
  18: {
    id: 18,
    name: "Belleau Wood",
    location: "Belleau Wood, France",
    date: "June 6, 1918",
    weather: 'clear',
    briefing: "The US Marines have arrived to stop the German advance on Paris. The forest is heavily defended, but the Marines are determined. 'Retreat? Hell, we just got here!' Clear Belleau Wood and prove American mettle!",
    objective: "Clear the forest of German forces",
    victoryLog: "Belleau Wood is ours! The Marines fought like devils. The Germans call us 'Devil Dogs' now - a name we'll wear with pride.",
    defeatLog: "The forest proved too costly. We hold part of it, but at terrible price. The fight continues.",
    diaryEntry: {
      before: "June 6th, 1918\n\nFirst real combat for us Marines. The French say fall back, but our captain says we attack. The woods ahead are full of German machine guns. We go in at dawn.",
      afterVictory: "June 26th, 1918\n\nThree weeks of fighting, but we took it. The Germans retreated calling us 'Teufel Hunden' - Devil Dogs. We paid in blood, but Belleau Wood is American now.",
      afterDefeat: "June 26th, 1918\n\nThe wood is a graveyard. Too many good Marines lie among those trees. We gained ground but couldn't hold it all."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 5, y: 7 },
      { id: 4, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'infantry', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 7, type: 'medic', team: 'player', x: 3, y: 7 },
      { id: 8, type: 'machinegun', team: 'enemy', x: 2, y: 2 },
      { id: 9, type: 'machinegun', team: 'enemy', x: 4, y: 2 },
      { id: 10, type: 'infantry', team: 'enemy', x: 3, y: 1 },
      { id: 11, type: 'infantry', team: 'enemy', x: 1, y: 1 },
      { id: 12, type: 'infantry', team: 'enemy', x: 5, y: 1 },
      { id: 13, type: 'sniper', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 1, y: 1, type: 'forest' }, { x: 2, y: 1, type: 'forest' }, { x: 3, y: 1, type: 'forest' }, { x: 4, y: 1, type: 'forest' }, { x: 5, y: 1, type: 'forest' },
      { x: 1, y: 2, type: 'forest' }, { x: 2, y: 2, type: 'forest' }, { x: 3, y: 2, type: 'forest' }, { x: 4, y: 2, type: 'forest' }, { x: 5, y: 2, type: 'forest' },
      { x: 2, y: 3, type: 'forest' }, { x: 3, y: 3, type: 'forest' }, { x: 4, y: 3, type: 'forest' },
      { x: 1, y: 4, type: 'crater' }, { x: 5, y: 4, type: 'crater' },
      { x: 3, y: 0, type: 'forest' }
    ]
  },
  19: {
    id: 19,
    name: "Meuse-Argonne",
    location: "Meuse-Argonne, France",
    date: "September 26, 1918",
    weather: 'rain',
    briefing: "The largest American offensive of the war begins. Over a million doughboys will attack along a 24-mile front. Break through the German defenses and push toward Sedan. This will end the war!",
    objective: "Break through all defensive lines",
    specialVictory: 'capture_objectives',
    victoryLog: "The Meuse-Argonne offensive succeeds! German resistance crumbles. The Kaiser's army is broken - the war will end within weeks!",
    defeatLog: "The offensive stalls in the Argonne Forest. Heavy casualties, minimal gains. The war drags on.",
    diaryEntry: {
      before: "September 26th, 1918\n\nA million of us going over the top. The biggest attack America has ever launched. The forest ahead looks peaceful, but it's full of German guns. We go at 5:30 AM.",
      afterVictory: "November 1st, 1918\n\nWe broke through! The Germans are retreating everywhere. Word is the Kaiser has fled. It's almost over - we can feel it.",
      afterDefeat: "November 1st, 1918\n\nThe Argonne ate us alive. So many lost in those woods. We're still pushing, but it's slower than anyone hoped."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 5, y: 7 },
      { id: 4, type: 'tank', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'tank', team: 'player', x: 4, y: 6 },
      { id: 6, type: 'artillery', team: 'player', x: 0, y: 7 },
      { id: 7, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 8, type: 'medic', team: 'player', x: 6, y: 7 },
      { id: 9, type: 'infantry', team: 'enemy', x: 2, y: 3 },
      { id: 10, type: 'infantry', team: 'enemy', x: 4, y: 3 },
      { id: 11, type: 'machinegun', team: 'enemy', x: 3, y: 2 },
      { id: 12, type: 'machinegun', team: 'enemy', x: 5, y: 2 },
      { id: 13, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 14, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 15, type: 'artillery', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 2, y: 0, type: 'objective' }, { x: 4, y: 0, type: 'objective' },
      { x: 1, y: 2, type: 'forest' }, { x: 2, y: 2, type: 'forest' }, { x: 5, y: 2, type: 'forest' }, { x: 6, y: 2, type: 'forest' },
      { x: 1, y: 3, type: 'trench' }, { x: 2, y: 3, type: 'trench' }, { x: 3, y: 3, type: 'trench' },
      { x: 4, y: 3, type: 'trench' }, { x: 5, y: 3, type: 'trench' }, { x: 6, y: 3, type: 'trench' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' }, { x: 5, y: 4, type: 'barbed_wire' },
      { x: 1, y: 5, type: 'crater' }, { x: 3, y: 5, type: 'crater' }, { x: 5, y: 5, type: 'crater' }
    ]
  },
  20: {
    id: 20,
    name: "The Eleventh Hour",
    location: "Western Front",
    date: "November 11, 1918",
    weather: 'fog',
    briefing: "The armistice is signed - the war ends at 11:00 AM! But fighting continues until the last moment. Survive until the eleventh hour. Hold your positions and keep your men alive until the guns fall silent forever.",
    objective: "Survive until 11:00 AM (8 turns)",
    specialVictory: 'survive_turns',
    turnsToSurvive: 8,
    victoryLog: "11:00 AM - Silence. The guns stop. The Great War is over. You survived to see peace. Never forget those who didn't.",
    defeatLog: "So close to peace... but the final hours claimed more lives. The war ends, but not for everyone.",
    diaryEntry: {
      before: "November 11th, 1918\n\nWord came at dawn - armistice signed, war ends at 11 AM. But until then, we fight. Six more hours of war. Six more hours to survive. So close now.",
      afterVictory: "November 11th, 1918 - 11:00 AM\n\nSilence. After four years, silence. Men are crying, laughing, staring at nothing. I survived. We survived. It's over. It's finally over.",
      afterDefeat: "November 11th, 1918 - 11:00 AM\n\nThe guns stopped, but too late for some of us. To die in the last hours of a war that's already ended... there's no sense to it. There never was."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 4, y: 6 },
      { id: 3, type: 'machinegun', team: 'player', x: 3, y: 7 },
      { id: 4, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 5, type: 'medic', team: 'player', x: 4, y: 7 },
      { id: 6, type: 'sniper', team: 'player', x: 1, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 8, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 9, type: 'infantry', team: 'enemy', x: 3, y: 0 },
      { id: 10, type: 'machinegun', team: 'enemy', x: 5, y: 0 },
      { id: 11, type: 'artillery', team: 'enemy', x: 1, y: 0 }
    ],
    terrain: [
      { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' },
      { x: 4, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' },
      { x: 2, y: 5, type: 'trench' }, { x: 3, y: 5, type: 'trench' }, { x: 4, y: 5, type: 'trench' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' },
      { x: 1, y: 3, type: 'crater' }, { x: 3, y: 3, type: 'crater' }, { x: 5, y: 3, type: 'crater' },
      { x: 2, y: 2, type: 'crater' }, { x: 4, y: 2, type: 'crater' }
    ]
  },
  21: {
    id: 21,
    name: "Christmas Truce",
    location: "Ypres Salient, Belgium",
    date: "December 25, 1914",
    weather: 'snow',
    briefing: "An unofficial ceasefire has broken out along parts of the front. But command insists we maintain vigilance. A German patrol is testing our lines - engage only if necessary, but protect your position. Perhaps some humanity remains in this war.",
    objective: "Hold your position",
    specialVictory: 'survive_turns',
    turnsToSurvive: 5,
    victoryLog: "The day passed. Some men exchanged gifts with the enemy. For one day, we remembered we were all human. Tomorrow, the war resumes.",
    defeatLog: "The truce broke down. Shots were fired, men died on Christmas Day. The war shows no mercy.",
    diaryEntry: {
      before: "December 25th, 1914\n\nChristmas. Snow falls on No Man's Land. Last night, the Germans sang 'Stille Nacht' and we answered with carols. This morning, men from both sides met in the middle. Shared cigarettes. But officers are nervous. We must stay alert.",
      afterVictory: "December 26th, 1914\n\nWe held our position without bloodshed. Some lads played football with the Germans. For one blessed day, the guns were silent. I'll never forget it.",
      afterDefeat: "December 26th, 1914\n\nIt couldn't last. Someone fired, and the truce ended in blood. Even Christmas cannot stop this madness."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 4, y: 6 },
      { id: 3, type: 'machinegun', team: 'player', x: 3, y: 7 },
      { id: 4, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 5, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 6, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 7, type: 'officer', team: 'enemy', x: 3, y: 0 }
    ],
    terrain: [
      { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' }, { x: 3, y: 6, type: 'trench' },
      { x: 4, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' },
      { x: 1, y: 1, type: 'trench' }, { x: 2, y: 1, type: 'trench' }, { x: 3, y: 1, type: 'trench' },
      { x: 4, y: 1, type: 'trench' }, { x: 5, y: 1, type: 'trench' },
      { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' }, { x: 4, y: 3, type: 'barbed_wire' },
      { x: 2, y: 4, type: 'barbed_wire' }, { x: 3, y: 4, type: 'barbed_wire' }, { x: 4, y: 4, type: 'barbed_wire' }
    ]
  },
  22: {
    id: 22,
    name: "Siege of Kut",
    location: "Kut-al-Amara, Mesopotamia",
    date: "January 1916",
    weather: 'clear',
    briefing: "Our garrison at Kut is surrounded by Ottoman forces. Supplies are running out. Break through the siege lines and reach the besieged troops before they're forced to surrender!",
    objective: "Break through to the garrison",
    specialVictory: 'capture_objectives',
    victoryLog: "We broke through! The garrison is relieved. The men of Kut will live to fight another day.",
    defeatLog: "The relief force failed. Kut must surrender. Thousands march into Ottoman captivity.",
    diaryEntry: {
      before: "January 15th, 1916\n\nGeneral Townshend's force is trapped at Kut. Starving, diseased, but still fighting. We're the relief column - fight through the Ottoman lines or watch our countrymen die.",
      afterVictory: "January 20th, 1916\n\nWe made it through! The look on those men's faces when they saw us... we saved them from a terrible fate.",
      afterDefeat: "January 20th, 1916\n\nWe couldn't break through. Kut has fallen. The prisoners march into the desert. Few will return."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 7 },
      { id: 3, type: 'cavalry', team: 'player', x: 5, y: 7 },
      { id: 4, type: 'artillery', team: 'player', x: 2, y: 6 },
      { id: 5, type: 'officer', team: 'player', x: 3, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 2, y: 3 },
      { id: 7, type: 'infantry', team: 'enemy', x: 4, y: 3 },
      { id: 8, type: 'machinegun', team: 'enemy', x: 3, y: 2 },
      { id: 9, type: 'infantry', team: 'enemy', x: 1, y: 1 },
      { id: 10, type: 'infantry', team: 'enemy', x: 5, y: 1 }
    ],
    terrain: [
      { x: 2, y: 0, type: 'objective' }, { x: 3, y: 0, type: 'objective' }, { x: 4, y: 0, type: 'objective' },
      { x: 1, y: 3, type: 'trench' }, { x: 2, y: 3, type: 'trench' }, { x: 3, y: 3, type: 'trench' },
      { x: 4, y: 3, type: 'trench' }, { x: 5, y: 3, type: 'trench' },
      { x: 0, y: 4, type: 'mud' }, { x: 1, y: 4, type: 'mud' }, { x: 6, y: 4, type: 'mud' }, { x: 7, y: 4, type: 'mud' },
      { x: 2, y: 5, type: 'crater' }, { x: 5, y: 5, type: 'crater' }
    ]
  },
  23: {
    id: 23,
    name: "Zeppelin Raid",
    location: "London, England",
    date: "September 1916",
    weather: 'night',
    briefing: "German Zeppelins are bombing London! Our anti-aircraft batteries and night fighters must bring them down before they devastate the city. Protect the civilians!",
    objective: "Destroy all Zeppelins",
    victoryLog: "The Zeppelins burn! London is saved. The terror weapons have been defeated by courage and skill.",
    defeatLog: "The bombs fell on London. Fires rage through the city. The Zeppelins escaped into the night.",
    diaryEntry: {
      before: "September 2nd, 1916\n\nAir raid warning! The Zeppelins are coming - those great silver monsters in the sky. Our searchlights sweep the darkness. We have to stop them before they reach the city.",
      afterVictory: "September 3rd, 1916\n\nWe got them! Saw one catch fire and fall like a flaming comet. The people cheered in the streets. The sky belongs to us now.",
      afterDefeat: "September 3rd, 1916\n\nThey bombed the East End. Homes destroyed, families killed. We couldn't stop them all."
    },
    units: [
      { id: 1, type: 'artillery', team: 'player', x: 1, y: 7 },
      { id: 2, type: 'artillery', team: 'player', x: 4, y: 7 },
      { id: 3, type: 'artillery', team: 'player', x: 6, y: 7 },
      { id: 4, type: 'scout', team: 'player', x: 3, y: 6 },
      { id: 5, type: 'infantry', team: 'player', x: 2, y: 6 },
      { id: 6, type: 'infantry', team: 'enemy', x: 1, y: 0 },
      { id: 7, type: 'infantry', team: 'enemy', x: 4, y: 0 },
      { id: 8, type: 'infantry', team: 'enemy', x: 6, y: 1 }
    ],
    terrain: [
      { x: 0, y: 7, type: 'objective' }, { x: 3, y: 7, type: 'objective' }, { x: 7, y: 7, type: 'objective' },
      { x: 2, y: 4, type: 'crater' }, { x: 5, y: 4, type: 'crater' },
      { x: 1, y: 2, type: 'crater' }, { x: 6, y: 3, type: 'crater' }
    ]
  },
  24: {
    id: 24,
    name: "Caporetto",
    location: "Isonzo Front, Italy",
    date: "October 24, 1917",
    weather: 'fog',
    briefing: "The combined German-Austrian offensive has smashed through Italian lines! Fight a desperate rearguard action to allow the army to retreat. Every minute you hold buys time for thousands to escape.",
    objective: "Survive the onslaught (7 turns)",
    specialVictory: 'survive_turns',
    turnsToSurvive: 7,
    victoryLog: "We held long enough! The Italian army has escaped across the Piave. The line stabilizes. Italy fights on.",
    defeatLog: "The rearguard collapsed too quickly. The retreat became a rout. Caporetto will be remembered as a disaster.",
    diaryEntry: {
      before: "October 24th, 1917\n\nThey came out of the fog - German stormtroopers, Austrian infantry, endless waves. The front collapsed. Now we're the rearguard. Hold them back or watch the whole army die.",
      afterVictory: "October 30th, 1917\n\nWe bought them time. The army escaped, regrouped. Italy will not fall. Our sacrifice meant something.",
      afterDefeat: "October 30th, 1917\n\nWe couldn't hold them. The retreat became chaos. So many captured, so many dead. Caporetto haunts us."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 1, y: 6 },
      { id: 2, type: 'infantry', team: 'player', x: 3, y: 6 },
      { id: 3, type: 'infantry', team: 'player', x: 5, y: 6 },
      { id: 4, type: 'machinegun', team: 'player', x: 2, y: 7 },
      { id: 5, type: 'machinegun', team: 'player', x: 4, y: 7 },
      { id: 6, type: 'officer', team: 'player', x: 3, y: 7 },
      { id: 7, type: 'infantry', team: 'enemy', x: 1, y: 0 },
      { id: 8, type: 'infantry', team: 'enemy', x: 3, y: 0 },
      { id: 9, type: 'infantry', team: 'enemy', x: 5, y: 0 },
      { id: 10, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 11, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 12, type: 'cavalry', team: 'enemy', x: 6, y: 1 },
      { id: 13, type: 'officer', team: 'enemy', x: 3, y: 1 }
    ],
    terrain: [
      { x: 0, y: 6, type: 'trench' }, { x: 1, y: 6, type: 'trench' }, { x: 2, y: 6, type: 'trench' },
      { x: 3, y: 6, type: 'trench' }, { x: 4, y: 6, type: 'trench' }, { x: 5, y: 6, type: 'trench' },
      { x: 1, y: 4, type: 'mountain' }, { x: 2, y: 4, type: 'mountain' },
      { x: 5, y: 4, type: 'mountain' }, { x: 6, y: 4, type: 'mountain' },
      { x: 0, y: 3, type: 'mountain' }, { x: 7, y: 3, type: 'mountain' },
      { x: 3, y: 3, type: 'crater' }, { x: 4, y: 3, type: 'crater' }
    ]
  },
  25: {
    id: 25,
    name: "Return to Peace",
    location: "Western Front",
    date: "November 1918",
    weather: 'clear',
    briefing: "The final battle. Push the enemy back one last time. After four years of hell, this is it - the war to end all wars reaches its conclusion. Make it count. Make it mean something.",
    objective: "Achieve total victory",
    victoryLog: "Victory! The Great War is over. 17 million dead, empires fallen, the world forever changed. We survived. Never again.",
    defeatLog: "So close to the end... but the final push failed. The war continues, but we know - it cannot last much longer.",
    diaryEntry: {
      before: "November 10th, 1918\n\nRumors of armistice. Kaiser fled. German army retreating everywhere. One final push and it's over. Four years of mud, blood, and death - ending tomorrow. Let's finish this.",
      afterVictory: "November 11th, 1918\n\nIt's over. We won. I'm going home. To everyone who didn't make it - I'll never forget you. Never.",
      afterDefeat: "November 11th, 1918\n\nThe attack failed, but it doesn't matter. The armistice is signed anyway. We're going home. The war is over."
    },
    units: [
      { id: 1, type: 'infantry', team: 'player', x: 0, y: 7 },
      { id: 2, type: 'infantry', team: 'player', x: 2, y: 7 },
      { id: 3, type: 'infantry', team: 'player', x: 4, y: 7 },
      { id: 4, type: 'tank', team: 'player', x: 1, y: 6 },
      { id: 5, type: 'tank', team: 'player', x: 3, y: 6 },
      { id: 6, type: 'cavalry', team: 'player', x: 5, y: 6 },
      { id: 7, type: 'artillery', team: 'player', x: 6, y: 7 },
      { id: 8, type: 'sniper', team: 'player', x: 7, y: 6 },
      { id: 9, type: 'medic', team: 'player', x: 2, y: 6 },
      { id: 10, type: 'officer', team: 'player', x: 3, y: 7 },
      { id: 11, type: 'infantry', team: 'enemy', x: 2, y: 1 },
      { id: 12, type: 'infantry', team: 'enemy', x: 4, y: 1 },
      { id: 13, type: 'machinegun', team: 'enemy', x: 3, y: 0 },
      { id: 14, type: 'machinegun', team: 'enemy', x: 5, y: 1 },
      { id: 15, type: 'artillery', team: 'enemy', x: 1, y: 0 }
    ],
    terrain: [
      { x: 1, y: 0, type: 'objective' }, { x: 3, y: 0, type: 'objective' }, { x: 5, y: 0, type: 'objective' },
      { x: 1, y: 2, type: 'trench' }, { x: 2, y: 2, type: 'trench' }, { x: 3, y: 2, type: 'trench' },
      { x: 4, y: 2, type: 'trench' }, { x: 5, y: 2, type: 'trench' },
      { x: 2, y: 3, type: 'barbed_wire' }, { x: 3, y: 3, type: 'barbed_wire' }, { x: 4, y: 3, type: 'barbed_wire' },
      { x: 1, y: 4, type: 'crater' }, { x: 3, y: 4, type: 'crater' }, { x: 5, y: 4, type: 'crater' },
      { x: 0, y: 5, type: 'crater' }, { x: 6, y: 5, type: 'crater' }
    ]
  }
};

// Mission alignment data - which faction historically attacked/defended
// 'entente' = British/French/American, 'central' = German
const MISSION_ALIGNMENTS = {
  1: { defaultSide: 'entente', centralBriefing: "The British have been entrenched for days. Storm their positions and break through the Western Front. Your medic will keep your men fighting." },
  2: { defaultSide: 'entente', centralBriefing: "Russian cavalry approaches our supply depot. Set up defensive positions and let the machine guns do their work. The age of cavalry charges ends today." },
  3: { defaultSide: 'entente', centralBriefing: "British 'landships' are advancing through the fog. These iron beasts are terrifying but vulnerable to artillery. Hold the line and destroy these metal monsters." },
  4: { defaultSide: 'entente', centralBriefing: "British snipers have pinned down our assault teams. Use your own marksmen to clear the ruins and advance through the shattered village." },
  5: { defaultSide: 'entente', centralBriefing: "British artillery threatens our positions. Use counter-battery fire to silence their guns before they destroy our trenches." },
  6: { defaultSide: 'entente', centralBriefing: "ANZAC forces are landing at Gallipoli. You command the Ottoman defenders - hold the cliffs and push them back into the sea!" },
  7: { defaultSide: 'entente', centralBriefing: "Italian troops are advancing through the Alpine passes. Defend the high ground and use the terrain to your advantage." },
  8: { defaultSide: 'entente', centralBriefing: "The British Expeditionary Force is retreating through Mons. Press the attack but beware - they fight hard even in retreat." },
  9: { defaultSide: 'central', centralBriefing: "Deploy the new chemical weapons against the French lines. The gas will spread terror - advance behind the cloud and seize their positions." },
  10: { defaultSide: 'entente', centralBriefing: "British destroyers threaten our coastal guns. Man the shore batteries and sink their ships before they bombard our positions." },
  11: { defaultSide: 'central', centralBriefing: "The Russians are attacking in force! Hold the line against Brusilov's offensive - if we break here, the Eastern Front collapses." },
  12: { defaultSide: 'entente', centralBriefing: "Canadian forces assault Vimy Ridge. Defend the heights at all costs - this position controls the entire sector." },
  13: { defaultSide: 'entente', centralBriefing: "British forces advance through the Passchendaele mud. The conditions are hellish but favor the defender. Hold your ground." },
  14: { defaultSide: 'central', centralBriefing: "Launch the Spring Offensive! Break through the British lines before American reinforcements arrive. This is Germany's last chance for victory." },
  15: { defaultSide: 'entente', centralBriefing: "Allied forces launch their final offensive. Fight a desperate rearguard action - every hour of delay matters for the armistice negotiations." },
  16: { defaultSide: 'central', centralBriefing: "Execute Hindenburg's masterplan! Encircle the Russian Second Army in the forests of Tannenberg. This victory will save East Prussia!" },
  17: { defaultSide: 'entente', centralBriefing: "Hundreds of British tanks approach through the fog! Man the anti-tank guns and hold the Hindenburg Line. These iron beasts must be stopped!" },
  18: { defaultSide: 'entente', centralBriefing: "American Marines are attacking Belleau Wood! Hold the forest at all costs - stop the Americans before they reach the Marne!" },
  19: { defaultSide: 'entente', centralBriefing: "A million Americans are advancing through the Argonne! Execute a fighting retreat - every day we hold delays their advance toward Germany." },
  20: { defaultSide: 'entente', centralBriefing: "The armistice is signed - the war ends at 11:00 AM! But our enemies still attack. Survive until the eleventh hour and hold the line until peace comes." },
  21: { defaultSide: 'entente', centralBriefing: "Christmas Day. An unofficial truce has spread along parts of the front. Some men have even exchanged gifts. But orders are orders - maintain vigilance. If the British attack, we defend." },
  22: { defaultSide: 'entente', centralBriefing: "The British relief force approaches Kut! Hold the siege lines. If they break through, months of siege warfare will be wasted. Let them starve." },
  23: { defaultSide: 'central', centralBriefing: "Launch the Zeppelin raid on London! Bring terror to the British homeland. Avoid their searchlights and anti-aircraft guns - bomb the docks and industrial areas!" },
  24: { defaultSide: 'central', centralBriefing: "The offensive at Caporetto begins! Smash through the Italian lines with stormtrooper tactics. Break them completely - advance to the Piave!" },
  25: { defaultSide: 'entente', centralBriefing: "The final battle. Germany fights a desperate rearguard. Hold as long as possible - every hour delays the inevitable surrender. Fight for honor." }
};

// Grid size for position flipping
const GRID_SIZE = 8;

/**
 * Get a mission adapted for the player's faction
 * If playing as German against an Entente mission, flip positions so player defends
 * @param {number} missionId - Mission ID
 * @param {string} factionId - Player's faction ('british', 'french', 'german', 'american')
 * @returns {Object} Mission data with potentially flipped positions and briefing
 */
export function getMissionForFaction(missionId, factionId = 'british') {
  const mission = MISSIONS[missionId];
  if (!mission) return null;

  const alignment = MISSION_ALIGNMENTS[missionId];
  if (!alignment) return mission;

  // Determine if player is on the "Central Powers" side
  const playerIsCentral = factionId === 'german';
  const missionIsEntente = alignment.defaultSide === 'entente';

  // If German player on Entente mission, or Entente player on Central mission - flip!
  const shouldFlip = (playerIsCentral && missionIsEntente) || (!playerIsCentral && !missionIsEntente);

  if (!shouldFlip) {
    return mission;
  }

  // Create flipped version
  const flippedUnits = mission.units.map(unit => ({
    ...unit,
    // Flip Y position (0 becomes 7, 7 becomes 0, etc.)
    y: GRID_SIZE - 1 - unit.y,
    // Swap teams
    team: unit.team === 'player' ? 'enemy' : 'player'
  }));

  // Flip terrain Y positions too
  const flippedTerrain = mission.terrain.map(t => ({
    ...t,
    y: GRID_SIZE - 1 - t.y
  }));

  return {
    ...mission,
    briefing: alignment.centralBriefing || mission.briefing,
    units: flippedUnits,
    terrain: flippedTerrain,
    isFlipped: true // Flag to indicate this is a flipped mission
  };
}
