/**
 * WWI Tactical Game - War Diary System
 * Multi-language narrative entries that tell the story of a soldier through the Great War
 */

// ============================================================================
// ENGLISH DIARY ENTRIES
// ============================================================================
const DIARY_ENTRIES_EN = {
  british: {
    intro: {
      date: 'August 5th, 1914',
      location: 'Manchester, England',
      title: 'The Call to Arms',
      entry: `The posters are everywhere now. "Your Country Needs YOU" - Lord Kitchener's finger pointing at every young man who passes.

Tommy Jenkins from down the street signed up yesterday, as did half the lads from the factory. They say it'll be over by Christmas. An adventure, they call it.

Mother wept when I told her I'd enlisted with the Manchester Regiment. Father shook my hand and said nothing, but I saw the pride in his eyes. Or was it fear?

Tomorrow I report to barracks. God save the King, and God bring us all home safe.`
    },
    firstBattle: {
      date: 'October 1914',
      location: 'Ypres, Belgium',
      title: 'Baptism of Fire',
      entry: `Nothing prepared me for this. The recruiting posters showed men charging gloriously. They didn't show the mud, the rats, the constant thunder of artillery.

We lost Sergeant Williams today. One moment he was telling us to keep our heads down, the next... gone. Just like that.

The Germans are dug in across No Man's Land. We can see the smoke from their cigarettes some mornings. Strange to think they're just lads like us, waiting in the mud.

I've learned to sleep through the shelling now. What choice do we have?`
    },
    midCampaign: {
      date: 'July 1916',
      location: 'The Somme, France',
      title: 'The Big Push',
      entry: `They promised us the artillery would destroy the German wire. They lied, or they were wrong, or perhaps they just hoped.

Twenty thousand of our boys fell on the first day. Twenty thousand. I can't comprehend such numbers anymore.

I've stopped learning the names of new replacements. It's easier that way. The old hands understand - we nod, we share our rations, we watch each other's backs. But names? Names are for civilians.

My hands shake now, even when the guns are silent. The medical officer says it's nothing. "Soldier on," he says.`
    },
    lateCampaign: {
      date: 'April 1918',
      location: 'Arras, France',
      title: 'The Spring Offensive',
      entry: `The Germans have thrown everything at us. Their new storm troopers hit us like a hurricane. We fell back, and back again.

But we held. Somehow, we held.

The Americans are here now, fresh-faced and eager like we once were. I want to warn them, to tell them what awaits. But they'll learn soon enough, as we all did.

Four years. Four years of this hell. I've forgotten what silence sounds like. What peace feels like. Do birds still sing in England?`
    },
    victory: {
      date: 'November 11th, 1918',
      location: 'France',
      title: 'The Eleventh Hour',
      entry: `At 11 o'clock, the guns fell silent.

I stood in the trench, unable to move. After four years of constant noise - the shells, the rifles, the screams - the silence was deafening. Men wept openly. Some laughed. Some did both.

It's over. We won, they say. But looking at the empty spaces where friends once stood, I wonder what winning really means.

I'm going home. But the man who returns won't be the eager boy who left Manchester in 1914. That boy died somewhere in the mud of France.

May God help us remember, so this never happens again.`
    },
    veteranDeath: {
      title: 'Another Empty Space',
      entry: `{name} is gone.

I keep expecting to hear their voice, to see them checking their kit or sharing a cigarette. But there's only silence now.

We buried them at dawn, as we always do. A wooden cross marks the spot - one among thousands. Will anyone remember them in years to come?

I will. Until my last breath, I will remember.`
    }
  },

  german: {
    intro: {
      date: 'August 2nd, 1914',
      location: 'Berlin, Germany',
      title: 'For the Fatherland',
      entry: `War has been declared! The crowds in the streets are singing, waving flags, embracing strangers. "To Paris!" they cry.

Father says this is Germany's destiny - to take her rightful place among the great nations. The Kaiser himself appeared on the balcony, and the cheering shook the very stones.

I have joined the Brandenburg Regiment, following three generations of our family. Mother gave me grandfather's watch and made me promise to bring it home safely.

By autumn, they say, I shall be marching through the Arc de Triomphe. For Kaiser, for country, for glory!`
    },
    firstBattle: {
      date: 'September 1914',
      location: 'Marne, France',
      title: 'The Tide Turns',
      entry: `Paris was so close. We could see the Eiffel Tower from our positions. Victory seemed certain.

Then came the order to retreat. Retreat! After all we had fought for.

Now we dig. We dig trenches that seem to stretch to eternity. The war of movement is over. This has become something else entirely - a war of attrition, of endurance.

The French and British face us across a sea of mud and wire. We fire at shadows and pray we don't become shadows ourselves.

What happened to our quick victory?`
    },
    midCampaign: {
      date: 'February 1916',
      location: 'Verdun, France',
      title: 'The Meat Grinder',
      entry: `"They shall not pass" - that is what the French say of Verdun. They are right. We have tried, God knows we have tried, but the fortress holds.

General Falkenhayn says we will bleed France white here. But looking at the bodies of my comrades, I wonder - who is bleeding whom?

The artillery never stops. The ground itself seems to cry out in agony. Whole forests reduced to splinters, villages erased from the map.

I have stopped writing to my family about what I see here. Some things cannot be put into words. Some things should not be.`
    },
    lateCampaign: {
      date: 'March 1918',
      location: 'Western Front',
      title: 'One Last Gamble',
      entry: `The spring offensive has begun - our last chance before the Americans arrive in force. Operation Michael, they call it.

We attacked at dawn through fog and poison gas. The British lines crumbled before us. For a moment, it felt like 1914 again - movement, advance, victory within grasp.

But the old problems return. We outrun our supplies. The men are exhausted, starving. We capture British supply depots and stop to eat their food, their coffee, their chocolate.

The offensive is losing momentum. I fear this was our last throw of the dice.`
    },
    victory: {
      date: 'November 11th, 1918',
      location: 'Germany',
      title: 'Silence Falls',
      entry: `The armistice is signed. The war is over.

We did not win. After four years, after millions of dead, after all the suffering - we did not win.

The Kaiser has fled. Revolution stirs in the cities. The world we knew is gone, swept away like leaves in autumn.

I am going home, but to what? The farm may still be there, but the Germany I left no longer exists. My friends, my comrades - so many are gone forever.

We fought with honor. History may judge us harshly, but we fought for our homes, our families, our country. That must count for something.`
    },
    veteranDeath: {
      title: 'An Empty Place',
      entry: `{name} has fallen.

We shared everything - our bread, our ammunition, our fears. In this hell of mud and iron, they were my brother, closer than blood.

The chaplain said words over the grave, but I heard nothing. What words can give meaning to such loss?

Another cross. Another name for the memorial that will one day be built. Will future generations understand what we sacrificed here?`
    }
  },

  french: {
    intro: {
      date: 'August 3rd, 1914',
      location: 'Paris, France',
      title: 'The Fatherland in Danger',
      entry: `General mobilization! The bells ring across France, calling her sons to arms.

The Boche have invaded Belgium. Memories of 1870 burn fresh - the humiliation of Sedan, the loss of Alsace-Lorraine. This time, France will prevail!

I reported to the 75th Infantry this morning. The regiment formed up in the square, our red trousers bright in the summer sun. The crowd threw flowers. Girls kissed us. Old men wept and saluted.

We march to the frontier tomorrow. Alsace awaits liberation. France awaits her revenge!

Long live France!`
    },
    firstBattle: {
      date: 'September 1914',
      location: 'The Marne, France',
      title: 'The Miracle',
      entry: `Paris was saved. The taxis carried our men to the front, and we held the line at the Marne.

But at what cost? The red trousers are gone now - too visible, they said, after so many fell in the first charges. The élan we were promised would carry us to victory? It proved no match for German machine guns.

We are digging in along the Aisne. This is not the war of movement we trained for. This is something new, something terrible.

My friend Jean-Pierre fell yesterday. He was running forward, his bayonet fixed, singing the Marseillaise. He never reached the German line.`
    },
    midCampaign: {
      date: 'February 1916',
      location: 'Verdun, France',
      title: 'They Shall Not Pass',
      entry: `Verdun. The ancient fortress, the symbol of France. The Germans have attacked with everything they have.

We have been ordered to hold at any cost. "They shall not pass" - General Pétain's words echo in every bunker, every trench.

The bombardment never ceases. The earth itself bleeds here. Fort Douaumont has fallen, but we fight on. Every meter of French soil is sacred.

I do not know if I will survive this place. But I know that France will endure. We will hold Verdun, whatever the cost.

Courage! France remembers her sons.`
    },
    lateCampaign: {
      date: 'April 1917',
      location: 'Chemin des Dames',
      title: 'The Mutiny',
      entry: `The offensive has failed. Nivelle promised us breakthrough, victory, an end to the nightmare. Instead, we gained nothing and lost everything.

Men are refusing to attack. Not from cowardice - never that - but from the madness of it all. We will defend France to our last breath, but we will no longer walk into machine guns for generals who lunch in châteaux.

General Pétain has taken command. He speaks to us like men, not cattle. He promises no more futile attacks. We believe him.

The war continues, but something has changed. We have found our voice.`
    },
    victory: {
      date: 'November 11th, 1918',
      location: 'France',
      title: 'Victory',
      entry: `It is finished.

At the eleventh hour of the eleventh day of the eleventh month, the guns fell silent. I stood in the trench and wept - for joy, for sorrow, for all we have lost.

France is free. Alsace and Lorraine return to us. The sacrifice of a million Frenchmen has not been in vain.

But looking at the devastated landscape, the ruined villages, the endless cemeteries - I wonder what we have truly won.

We have saved France, but the France of my childhood is gone forever. May our children never know such horror.

Peace to the dead.`
    },
    veteranDeath: {
      title: 'A Fallen Comrade',
      entry: `{name} has left us.

In the trenches, we became more than comrades. We became brothers, bound by mud and blood and shared suffering.

I will write to their family, though what words can ease such loss? I will tell them of their courage, their sacrifice, their love for France.

Another name for the monuments we will build. Another empty chair at a family table.

Rest now, my friend. France remembers.`
    }
  },

  american: {
    intro: {
      date: 'April 7th, 1917',
      location: 'New York City, USA',
      title: 'Over There',
      entry: `President Wilson has declared war! America is finally joining the fight.

The recruitment offices are packed. They're playing that new song everywhere - "Over There." The boys are going over there, and we won't come back till it's over, over there!

I signed up this morning with the 1st Infantry Division - the "Big Red One." Pa says I'm foolish, that this isn't our fight. But the Lusitania, the Zimmermann telegram, the Belgian atrocities - how can we stand aside?

I've never been to Europe. Never thought I'd see Paris, or fight alongside the British and French. What an adventure this will be!

Here we come, Kaiser!`
    },
    firstBattle: {
      date: 'October 1917',
      location: 'Lorraine, France',
      title: 'Welcome to the War',
      entry: `Training is over. We've moved up to a quiet sector to learn the ropes from the French.

Quiet, they call it. The shelling never stops. The trenches are worse than anything I imagined - mud, rats, the constant stench of death.

The French veterans look at us with a mixture of pity and amusement. They've been at this for three years. Three years! They move through this nightmare like ghosts, knowing instinctively when to duck, when to run, when to freeze.

I'm learning fast. We all are. The naive boy who sailed from New York is already fading. In his place, something harder is growing.`
    },
    midCampaign: {
      date: 'June 1918',
      location: 'Belleau Wood, France',
      title: 'Devil Dogs',
      entry: `They told the Marines to retreat. "Retreat?" said our sergeant. "Hell, we just got here!"

Belleau Wood is a nightmare - a forest of shattered trees and hidden machine guns. The Germans are dug in deep, and they fight like demons.

But so do we. The French are calling us "Teufel Hunden" - Devil Dogs. We've earned that name in blood.

The American way of war is different, they say. We don't just hold ground - we take it. Whatever the cost.

I've lost count of how many attacks we've made into those woods. But we're winning. Inch by bloody inch, we're winning.`
    },
    lateCampaign: {
      date: 'September 1918',
      location: 'Meuse-Argonne, France',
      title: 'The Final Push',
      entry: `The biggest American offensive of the war has begun. Over a million Doughboys are pushing through the Argonne Forest toward Sedan.

The German lines are crumbling, but they don't surrender easily. Every hill, every village, every crossroads is a battle. The Hindenburg Line - supposedly impregnable - is breaking.

Sergeant York captured 132 Germans single-handed yesterday. That's the kind of story they'll tell back home. They won't tell about the boys who didn't make it, who died in the mud just short of victory.

We can feel the end coming. After all this suffering, can it really be almost over?`
    },
    victory: {
      date: 'November 11th, 1918',
      location: 'France',
      title: 'Armistice Day',
      entry: `At 11:00 AM, the war ended. The Great War. The War to End All Wars.

Some of the boys fired their rifles into the air. Others just stood there, stunned. After months of constant fighting, the silence feels wrong somehow.

I'm sitting on a hill overlooking the Meuse valley. The sun is breaking through the clouds for the first time in days. Somewhere, church bells are ringing.

We did it. America helped finish what the Allies started. But looking at the crosses stretching to the horizon, I wonder if it was worth it.

I'm going home. Back to a country that will never truly understand what we saw here. But I know. And I'll never forget.

Over there is finally over.`
    },
    veteranDeath: {
      title: 'Taps',
      entry: `{name} didn't make it.

We grew up in the same town, signed up on the same day, crossed the Atlantic on the same ship. Now I'm going home, and they're staying here forever, in French soil so far from home.

The bugler played Taps as we lowered them into the grave. That mournful melody will haunt me for the rest of my days.

Rest easy, buddy. You died fighting for something bigger than yourself. That has to count for something. It has to.

I'll find your folks when I get home. I'll tell them you were brave, that you died a hero. It's what they need to hear. It's what I need to believe.`
    }
  }
};

// ============================================================================
// GERMAN DIARY ENTRIES (Authentic German)
// ============================================================================
const DIARY_ENTRIES_DE = {
  british: {
    intro: {
      date: '5. August 1914',
      location: 'Manchester, England',
      title: 'Der Ruf zu den Waffen',
      entry: `Die Plakate sind jetzt überall. "Dein Land braucht DICH" - Lord Kitcheners Finger zeigt auf jeden jungen Mann, der vorbeigeht.

Tommy Jenkins aus unserer Straße hat sich gestern gemeldet, ebenso wie die Hälfte der Burschen aus der Fabrik. Sie sagen, es wird bis Weihnachten vorbei sein. Ein Abenteuer, nennen sie es.

Mutter weinte, als ich ihr sagte, dass ich mich beim Manchester Regiment gemeldet habe. Vater schüttelte mir die Hand und sagte nichts, aber ich sah den Stolz in seinen Augen. Oder war es Angst?

Morgen melde ich mich in der Kaserne. Gott schütze den König, und Gott bringe uns alle sicher nach Hause.`
    },
    firstBattle: {
      date: 'Oktober 1914',
      location: 'Ypern, Belgien',
      title: 'Feuertaufe',
      entry: `Nichts hat mich darauf vorbereitet. Die Rekrutierungsplakate zeigten Männer im glorreichen Angriff. Sie zeigten nicht den Schlamm, die Ratten, den ständigen Donner der Artillerie.

Wir haben Sergeant Williams heute verloren. Einen Moment lang sagte er uns noch, wir sollen die Köpfe unten halten, im nächsten... war er fort. Einfach so.

Die Deutschen sind jenseits des Niemandslandes eingegraben. Manchmal morgens können wir den Rauch ihrer Zigaretten sehen. Seltsam zu denken, dass sie nur Burschen wie wir sind, die im Schlamm warten.

Ich habe gelernt, durch den Beschuss hindurch zu schlafen. Welche Wahl haben wir?`
    },
    midCampaign: {
      date: 'Juli 1916',
      location: 'Die Somme, Frankreich',
      title: 'Der große Vorstoß',
      entry: `Sie versprachen uns, die Artillerie würde den deutschen Stacheldraht zerstören. Sie haben gelogen, oder sie lagen falsch, oder vielleicht haben sie nur gehofft.

Zwanzigtausend unserer Jungs fielen am ersten Tag. Zwanzigtausend. Ich kann solche Zahlen nicht mehr begreifen.

Ich habe aufgehört, die Namen der neuen Ersatzleute zu lernen. So ist es einfacher. Die alten Hasen verstehen das - wir nicken, teilen unsere Rationen, passen aufeinander auf. Aber Namen? Namen sind für Zivilisten.

Meine Hände zittern jetzt, selbst wenn die Geschütze schweigen. Der Sanitätsoffizier sagt, es sei nichts. "Weitermachen", sagt er.`
    },
    lateCampaign: {
      date: 'April 1918',
      location: 'Arras, Frankreich',
      title: 'Die Frühjahrsoffensive',
      entry: `Die Deutschen haben alles gegen uns geworfen. Ihre neuen Sturmtruppen trafen uns wie ein Orkan. Wir wichen zurück, und wieder zurück.

Aber wir hielten. Irgendwie hielten wir.

Die Amerikaner sind jetzt hier, frisch und eifrig wie wir einst waren. Ich möchte sie warnen, ihnen sagen, was auf sie wartet. Aber sie werden es bald genug lernen, wie wir alle.

Vier Jahre. Vier Jahre dieser Hölle. Ich habe vergessen, wie Stille klingt. Wie sich Frieden anfühlt. Singen in England noch die Vögel?`
    },
    victory: {
      date: '11. November 1918',
      location: 'Frankreich',
      title: 'Die elfte Stunde',
      entry: `Um 11 Uhr verstummten die Geschütze.

Ich stand im Schützengraben, unfähig mich zu bewegen. Nach vier Jahren ständigen Lärms - die Granaten, die Gewehre, die Schreie - war die Stille ohrenbetäubend. Männer weinten offen. Manche lachten. Manche taten beides.

Es ist vorbei. Wir haben gewonnen, sagen sie. Aber wenn ich die leeren Plätze betrachte, wo einst Freunde standen, frage ich mich, was Gewinnen wirklich bedeutet.

Ich gehe nach Hause. Aber der Mann, der zurückkehrt, wird nicht der eifrige Junge sein, der 1914 Manchester verließ. Dieser Junge starb irgendwo im Schlamm Frankreichs.

Möge Gott uns helfen zu erinnern, damit dies nie wieder geschieht.`
    },
    veteranDeath: {
      title: 'Ein weiterer leerer Platz',
      entry: `{name} ist fort.

Ich erwarte immer noch, ihre Stimme zu hören, sie bei der Ausrüstungsprüfung oder beim Teilen einer Zigarette zu sehen. Aber jetzt ist da nur Stille.

Wir haben sie bei Tagesanbruch begraben, wie immer. Ein Holzkreuz markiert die Stelle - eines unter Tausenden. Wird sich in Jahren noch jemand an sie erinnern?

Ich werde es. Bis zu meinem letzten Atemzug werde ich mich erinnern.`
    }
  },

  german: {
    intro: {
      date: '2. August 1914',
      location: 'Berlin, Deutschland',
      title: 'Für das Vaterland',
      entry: `Der Krieg ist erklärt! Die Menschenmassen in den Straßen singen, schwenken Fahnen, umarmen Fremde. "Nach Paris!" rufen sie.

Vater sagt, dies ist Deutschlands Schicksal - seinen rechtmäßigen Platz unter den großen Nationen einzunehmen. Der Kaiser selbst erschien auf dem Balkon, und der Jubel ließ die Steine erzittern.

Ich bin dem Brandenburgischen Regiment beigetreten, der Tradition dreier Generationen unserer Familie folgend. Mutter gab mir Großvaters Uhr und ließ mich versprechen, sie sicher nach Hause zu bringen.

Bis zum Herbst, sagen sie, werde ich durch den Arc de Triomphe marschieren. Für den Kaiser, für das Vaterland, für den Ruhm!`
    },
    firstBattle: {
      date: 'September 1914',
      location: 'Marne, Frankreich',
      title: 'Die Wende',
      entry: `Paris war so nah. Wir konnten den Eiffelturm von unseren Stellungen aus sehen. Der Sieg schien gewiss.

Dann kam der Befehl zum Rückzug. Rückzug! Nach allem, wofür wir gekämpft hatten.

Jetzt graben wir. Wir graben Schützengräben, die sich bis in die Ewigkeit zu erstrecken scheinen. Der Bewegungskrieg ist vorbei. Dies ist zu etwas ganz anderem geworden - ein Zermürbungskrieg, ein Krieg der Ausdauer.

Die Franzosen und Briten stehen uns gegenüber über ein Meer aus Schlamm und Draht. Wir schießen auf Schatten und beten, dass wir nicht selbst zu Schatten werden.

Was ist mit unserem schnellen Sieg geschehen?`
    },
    midCampaign: {
      date: 'Februar 1916',
      location: 'Verdun, Frankreich',
      title: 'Die Hölle von Verdun',
      entry: `"Ils ne passeront pas" - Sie werden nicht durchkommen - das sagen die Franzosen über Verdun. Sie haben recht. Wir haben es versucht, Gott weiß, wir haben es versucht, aber die Festung hält.

General Falkenhayn sagt, wir werden Frankreich hier ausbluten lassen. Aber wenn ich die Leichen meiner Kameraden betrachte, frage ich mich - wer lässt hier wen ausbluten?

Die Artillerie hört nie auf. Der Boden selbst scheint vor Qual zu schreien. Ganze Wälder zu Splittern zermalmt, Dörfer von der Landkarte getilgt.

Ich habe aufgehört, meiner Familie zu schreiben, was ich hier sehe. Manche Dinge lassen sich nicht in Worte fassen. Manche Dinge sollten es nicht.`
    },
    lateCampaign: {
      date: 'März 1918',
      location: 'Westfront',
      title: 'Das letzte Würfelspiel',
      entry: `Die Frühjahrsoffensive hat begonnen - unsere letzte Chance, bevor die Amerikaner in voller Stärke eintreffen. Operation Michael, nennen sie es.

Wir griffen im Morgengrauen durch Nebel und Giftgas an. Die britischen Linien brachen vor uns zusammen. Für einen Moment fühlte es sich wieder wie 1914 an - Bewegung, Vormarsch, der Sieg zum Greifen nah.

Aber die alten Probleme kehren zurück. Wir überholen unseren Nachschub. Die Männer sind erschöpft, am Verhungern. Wir erobern britische Versorgungsdepots und halten an, um ihr Essen zu essen, ihren Kaffee, ihre Schokolade.

Die Offensive verliert an Schwung. Ich fürchte, dies war unser letzter Wurf.`
    },
    victory: {
      date: '11. November 1918',
      location: 'Deutschland',
      title: 'Stille',
      entry: `Der Waffenstillstand ist unterzeichnet. Der Krieg ist vorbei.

Wir haben nicht gewonnen. Nach vier Jahren, nach Millionen von Toten, nach all dem Leid - wir haben nicht gewonnen.

Der Kaiser ist geflohen. Revolution regt sich in den Städten. Die Welt, die wir kannten, ist verschwunden, hinweggefegt wie Blätter im Herbst.

Ich gehe nach Hause, aber wohin? Der Bauernhof mag noch da sein, aber das Deutschland, das ich verließ, existiert nicht mehr. Meine Freunde, meine Kameraden - so viele sind für immer fort.

Wir kämpften mit Ehre. Die Geschichte mag uns hart beurteilen, aber wir kämpften für unsere Heimat, unsere Familien, unser Vaterland. Das muss für etwas zählen.`
    },
    veteranDeath: {
      title: 'Ein leerer Platz',
      entry: `{name} ist gefallen.

Wir teilten alles - unser Brot, unsere Munition, unsere Ängste. In dieser Hölle aus Schlamm und Eisen waren sie mir ein Bruder, näher als Blut.

Der Feldkaplan sprach Worte über dem Grab, aber ich hörte nichts. Welche Worte können einem solchen Verlust Sinn geben?

Ein weiteres Kreuz. Ein weiterer Name für das Denkmal, das eines Tages errichtet werden wird. Werden künftige Generationen verstehen, was wir hier geopfert haben?`
    }
  },

  french: {
    intro: {
      date: '3. August 1914',
      location: 'Paris, Frankreich',
      title: 'Das Vaterland in Gefahr',
      entry: `Generalmobilmachung! Die Glocken läuten in ganz Frankreich und rufen ihre Söhne zu den Waffen.

Die Boches sind in Belgien einmarschiert. Erinnerungen an 1870 brennen frisch - die Demütigung von Sedan, der Verlust von Elsass-Lothringen. Diesmal wird Frankreich siegen!

Ich meldete mich heute Morgen beim 75. Infanterieregiment. Das Regiment formierte sich auf dem Platz, unsere roten Hosen leuchtend in der Sommersonne. Die Menge warf Blumen. Mädchen küssten uns. Alte Männer weinten und salutierten.

Wir marschieren morgen zur Grenze. Das Elsass wartet auf die Befreiung. Frankreich wartet auf seine Revanche!

Es lebe Frankreich!`
    },
    firstBattle: {
      date: 'September 1914',
      location: 'Die Marne, Frankreich',
      title: 'Das Wunder',
      entry: `Paris wurde gerettet. Die Taxis brachten unsere Männer an die Front, und wir hielten die Linie an der Marne.

Aber zu welchem Preis? Die roten Hosen sind jetzt weg - zu auffällig, sagten sie, nachdem so viele bei den ersten Angriffen fielen. Der Élan, von dem man uns versprach, er würde uns zum Sieg tragen? Er war den deutschen Maschinengewehren nicht gewachsen.

Wir graben uns entlang der Aisne ein. Dies ist nicht der Bewegungskrieg, für den wir ausgebildet wurden. Dies ist etwas Neues, etwas Schreckliches.

Mein Freund Jean-Pierre fiel gestern. Er rannte vorwärts, das Bajonett aufgepflanzt, die Marseillaise singend. Er erreichte nie die deutsche Linie.`
    },
    midCampaign: {
      date: 'Februar 1916',
      location: 'Verdun, Frankreich',
      title: 'Sie werden nicht durchkommen',
      entry: `Verdun. Die alte Festung, das Symbol Frankreichs. Die Deutschen haben mit allem angegriffen, was sie haben.

Wir haben den Befehl, um jeden Preis zu halten. "Ils ne passeront pas" - General Pétains Worte hallen in jedem Bunker, jedem Schützengraben wider.

Das Bombardement hört nie auf. Die Erde selbst blutet hier. Fort Douaumont ist gefallen, aber wir kämpfen weiter. Jeder Meter französischen Bodens ist heilig.

Ich weiß nicht, ob ich diesen Ort überleben werde. Aber ich weiß, dass Frankreich überdauern wird. Wir werden Verdun halten, koste es, was es wolle.

Mut! Frankreich erinnert sich an seine Söhne.`
    },
    lateCampaign: {
      date: 'April 1917',
      location: 'Chemin des Dames',
      title: 'Die Meuterei',
      entry: `Die Offensive ist gescheitert. Nivelle versprach uns den Durchbruch, den Sieg, ein Ende des Albtraums. Stattdessen gewannen wir nichts und verloren alles.

Männer weigern sich anzugreifen. Nicht aus Feigheit - niemals das - sondern wegen des Wahnsinns von allem. Wir werden Frankreich bis zum letzten Atemzug verteidigen, aber wir werden nicht mehr in Maschinengewehre laufen für Generäle, die in Schlössern zu Mittag essen.

General Pétain hat das Kommando übernommen. Er spricht mit uns wie mit Männern, nicht wie mit Vieh. Er verspricht keine sinnlosen Angriffe mehr. Wir glauben ihm.

Der Krieg geht weiter, aber etwas hat sich verändert. Wir haben unsere Stimme gefunden.`
    },
    victory: {
      date: '11. November 1918',
      location: 'Frankreich',
      title: 'Der Sieg',
      entry: `Es ist vorbei.

In der elften Stunde des elften Tages des elften Monats verstummten die Geschütze. Ich stand im Schützengraben und weinte - vor Freude, vor Trauer, für alles, was wir verloren haben.

Frankreich ist frei. Elsass und Lothringen kehren zu uns zurück. Das Opfer einer Million Franzosen war nicht umsonst.

Aber wenn ich die verwüstete Landschaft betrachte, die zerstörten Dörfer, die endlosen Friedhöfe - frage ich mich, was wir wirklich gewonnen haben.

Wir haben Frankreich gerettet, aber das Frankreich meiner Kindheit ist für immer verschwunden. Mögen unsere Kinder niemals solches Grauen kennenlernen.

Friede den Toten.`
    },
    veteranDeath: {
      title: 'Ein gefallener Kamerad',
      entry: `{name} hat uns verlassen.

In den Schützengräben wurden wir mehr als Kameraden. Wir wurden Brüder, verbunden durch Schlamm und Blut und gemeinsames Leid.

Ich werde ihrer Familie schreiben, obwohl welche Worte können einen solchen Verlust lindern? Ich werde ihnen von ihrem Mut erzählen, ihrem Opfer, ihrer Liebe zu Frankreich.

Ein weiterer Name für die Denkmäler, die wir errichten werden. Ein weiterer leerer Stuhl an einem Familientisch.

Ruhe nun, mein Freund. Frankreich erinnert sich.`
    }
  },

  american: {
    intro: {
      date: '7. April 1917',
      location: 'New York City, USA',
      title: 'Over There',
      entry: `Präsident Wilson hat den Krieg erklärt! Amerika tritt endlich in den Kampf ein.

Die Rekrutierungsbüros sind überfüllt. Überall spielen sie dieses neue Lied - "Over There". Die Jungs gehen dorthin, und wir kommen nicht zurück, bis es vorbei ist, dort drüben!

Ich habe mich heute Morgen bei der 1. Infanteriedivision gemeldet - der "Big Red One". Pa sagt, ich sei töricht, dass dies nicht unser Kampf sei. Aber die Lusitania, das Zimmermann-Telegramm, die belgischen Gräueltaten - wie können wir abseits stehen?

Ich war noch nie in Europa. Hätte nie gedacht, dass ich Paris sehen würde, oder an der Seite der Briten und Franzosen kämpfen würde. Was für ein Abenteuer das sein wird!

Wir kommen, Kaiser!`
    },
    firstBattle: {
      date: 'Oktober 1917',
      location: 'Lothringen, Frankreich',
      title: 'Willkommen im Krieg',
      entry: `Die Ausbildung ist vorbei. Wir sind in einen ruhigen Sektor verlegt worden, um von den Franzosen zu lernen.

Ruhig, nennen sie es. Der Beschuss hört nie auf. Die Schützengräben sind schlimmer als alles, was ich mir vorgestellt habe - Schlamm, Ratten, der ständige Gestank des Todes.

Die französischen Veteranen betrachten uns mit einer Mischung aus Mitleid und Belustigung. Sie machen das seit drei Jahren. Drei Jahre! Sie bewegen sich durch diesen Albtraum wie Geister, wissen instinktiv, wann sie sich ducken, wann sie rennen, wann sie erstarren müssen.

Ich lerne schnell. Wir alle lernen schnell. Der naive Junge, der von New York aus in See stach, verblasst bereits. An seiner Stelle wächst etwas Härteres.`
    },
    midCampaign: {
      date: 'Juni 1918',
      location: 'Wald von Belleau, Frankreich',
      title: 'Teufelshunde',
      entry: `Sie sagten den Marines, sie sollten sich zurückziehen. "Zurückziehen?" sagte unser Sergeant. "Zur Hölle, wir sind gerade erst angekommen!"

Der Wald von Belleau ist ein Albtraum - ein Wald aus zersplitterten Bäumen und versteckten Maschinengewehren. Die Deutschen haben sich tief eingegraben, und sie kämpfen wie die Teufel.

Aber wir auch. Die Franzosen nennen uns "Teufel Hunden". Wir haben uns diesen Namen in Blut verdient.

Die amerikanische Art des Krieges ist anders, sagen sie. Wir halten nicht nur Boden - wir nehmen ihn. Koste es, was es wolle.

Ich habe aufgehört zu zählen, wie viele Angriffe wir in diesen Wald gemacht haben. Aber wir gewinnen. Zoll für blutigen Zoll gewinnen wir.`
    },
    lateCampaign: {
      date: 'September 1918',
      location: 'Maas-Argonnen, Frankreich',
      title: 'Der letzte Vorstoß',
      entry: `Die größte amerikanische Offensive des Krieges hat begonnen. Über eine Million Doughboys drängen durch den Argonnenwald auf Sedan zu.

Die deutschen Linien bröckeln, aber sie ergeben sich nicht leicht. Jeder Hügel, jedes Dorf, jede Kreuzung ist ein Kampf. Die Hindenburg-Linie - angeblich unüberwindlich - bricht.

Sergeant York hat gestern 132 Deutsche im Alleingang gefangen genommen. Das ist die Art von Geschichte, die sie zu Hause erzählen werden. Sie werden nicht von den Jungs erzählen, die es nicht geschafft haben, die im Schlamm starben, kurz vor dem Sieg.

Wir können spüren, dass das Ende kommt. Nach all diesem Leid, kann es wirklich fast vorbei sein?`
    },
    victory: {
      date: '11. November 1918',
      location: 'Frankreich',
      title: 'Waffenstillstandstag',
      entry: `Um 11:00 Uhr endete der Krieg. Der Große Krieg. Der Krieg, der alle Kriege beenden sollte.

Einige der Jungs feuerten ihre Gewehre in die Luft. Andere standen nur da, fassungslos. Nach Monaten des ständigen Kampfes fühlt sich die Stille irgendwie falsch an.

Ich sitze auf einem Hügel mit Blick auf das Maastal. Die Sonne bricht zum ersten Mal seit Tagen durch die Wolken. Irgendwo läuten Kirchenglocken.

Wir haben es geschafft. Amerika hat geholfen, das zu beenden, was die Alliierten begonnen hatten. Aber wenn ich die Kreuze betrachte, die sich bis zum Horizont erstrecken, frage ich mich, ob es das wert war.

Ich gehe nach Hause. Zurück in ein Land, das nie wirklich verstehen wird, was wir hier gesehen haben. Aber ich weiß es. Und ich werde es nie vergessen.

Over there ist endlich vorbei.`
    },
    veteranDeath: {
      title: 'Zapfenstreich',
      entry: `{name} hat es nicht geschafft.

Wir wuchsen in derselben Stadt auf, meldeten uns am selben Tag, überquerten den Atlantik auf demselben Schiff. Jetzt gehe ich nach Hause, und sie bleiben hier für immer, in französischer Erde, so weit von zu Hause entfernt.

Der Hornist spielte den Zapfenstreich, als wir sie ins Grab hinabließen. Diese traurige Melodie wird mich für den Rest meiner Tage verfolgen.

Ruhe sanft, Kumpel. Du bist für etwas Größeres als dich selbst gestorben. Das muss für etwas zählen. Es muss.

Ich werde deine Leute finden, wenn ich nach Hause komme. Ich werde ihnen sagen, dass du tapfer warst, dass du als Held gestorben bist. Es ist das, was sie hören müssen. Es ist das, was ich glauben muss.`
    }
  }
};

// ============================================================================
// FRENCH DIARY ENTRIES (Authentic French)
// ============================================================================
const DIARY_ENTRIES_FR = {
  british: {
    intro: {
      date: '5 août 1914',
      location: 'Manchester, Angleterre',
      title: 'L\'appel aux armes',
      entry: `Les affiches sont partout maintenant. "Votre Pays a Besoin de VOUS" - le doigt de Lord Kitchener pointé vers chaque jeune homme qui passe.

Tommy Jenkins de notre rue s'est engagé hier, ainsi que la moitié des gars de l'usine. Ils disent que ce sera fini à Noël. Une aventure, disent-ils.

Mère a pleuré quand je lui ai dit que je m'étais engagé dans le Régiment de Manchester. Père m'a serré la main sans rien dire, mais j'ai vu la fierté dans ses yeux. Ou était-ce de la peur?

Demain je me présente à la caserne. Dieu protège le Roi, et que Dieu nous ramène tous sains et saufs.`
    },
    firstBattle: {
      date: 'Octobre 1914',
      location: 'Ypres, Belgique',
      title: 'Baptême du feu',
      entry: `Rien ne m'avait préparé à cela. Les affiches de recrutement montraient des hommes chargeant glorieusement. Elles ne montraient pas la boue, les rats, le tonnerre constant de l'artillerie.

Nous avons perdu le Sergent Williams aujourd'hui. Un moment il nous disait de garder la tête baissée, l'instant d'après... parti. Comme ça.

Les Allemands sont retranchés de l'autre côté du No Man's Land. Certains matins, nous pouvons voir la fumée de leurs cigarettes. Étrange de penser qu'ils sont juste des gars comme nous, attendant dans la boue.

J'ai appris à dormir malgré les bombardements maintenant. Quel choix avons-nous?`
    },
    midCampaign: {
      date: 'Juillet 1916',
      location: 'La Somme, France',
      title: 'La grande offensive',
      entry: `Ils nous avaient promis que l'artillerie détruirait les barbelés allemands. Ils ont menti, ou ils se trompaient, ou peut-être espéraient-ils simplement.

Vingt mille de nos gars sont tombés le premier jour. Vingt mille. Je ne peux plus comprendre de tels chiffres.

J'ai arrêté d'apprendre les noms des nouveaux remplaçants. C'est plus facile ainsi. Les anciens comprennent - nous hochons la tête, partageons nos rations, veillons les uns sur les autres. Mais les noms? Les noms sont pour les civils.

Mes mains tremblent maintenant, même quand les canons se taisent. L'officier médical dit que ce n'est rien. "Continue soldat," dit-il.`
    },
    lateCampaign: {
      date: 'Avril 1918',
      location: 'Arras, France',
      title: 'L\'offensive de printemps',
      entry: `Les Allemands ont tout jeté contre nous. Leurs nouveaux troupes d'assaut nous ont frappés comme un ouragan. Nous avons reculé, encore et encore.

Mais nous avons tenu. D'une manière ou d'une autre, nous avons tenu.

Les Américains sont là maintenant, le visage frais et enthousiastes comme nous l'étions autrefois. Je voudrais les avertir, leur dire ce qui les attend. Mais ils apprendront assez tôt, comme nous tous.

Quatre ans. Quatre ans de cet enfer. J'ai oublié à quoi ressemble le silence. Ce que la paix procure comme sensation. Les oiseaux chantent-ils encore en Angleterre?`
    },
    victory: {
      date: '11 novembre 1918',
      location: 'France',
      title: 'La onzième heure',
      entry: `À 11 heures, les canons se sont tus.

Je me tenais dans la tranchée, incapable de bouger. Après quatre ans de bruit constant - les obus, les fusils, les cris - le silence était assourdissant. Les hommes pleuraient ouvertement. Certains riaient. Certains faisaient les deux.

C'est fini. Nous avons gagné, disent-ils. Mais en regardant les places vides où se tenaient autrefois des amis, je me demande ce que gagner signifie vraiment.

Je rentre chez moi. Mais l'homme qui revient ne sera pas le garçon enthousiaste qui a quitté Manchester en 1914. Ce garçon est mort quelque part dans la boue de France.

Que Dieu nous aide à nous souvenir, pour que cela n'arrive plus jamais.`
    },
    veteranDeath: {
      title: 'Une autre place vide',
      entry: `{name} est parti.

Je continue à m'attendre à entendre leur voix, à les voir vérifier leur équipement ou partager une cigarette. Mais maintenant il n'y a que le silence.

Nous les avons enterrés à l'aube, comme toujours. Une croix de bois marque l'endroit - une parmi des milliers. Quelqu'un se souviendra-t-il d'eux dans les années à venir?

Moi, je m'en souviendrai. Jusqu'à mon dernier souffle, je m'en souviendrai.`
    }
  },

  german: {
    intro: {
      date: '2 août 1914',
      location: 'Berlin, Allemagne',
      title: 'Pour la patrie',
      entry: `La guerre est déclarée! Les foules dans les rues chantent, agitent des drapeaux, embrassent des étrangers. "Vers Paris!" crient-ils.

Père dit que c'est le destin de l'Allemagne - prendre sa place légitime parmi les grandes nations. Le Kaiser lui-même est apparu au balcon, et les acclamations ont fait trembler les pierres.

J'ai rejoint le Régiment de Brandebourg, suivant trois générations de notre famille. Mère m'a donné la montre de grand-père et m'a fait promettre de la ramener saine et sauve.

D'ici l'automne, disent-ils, je marcherai sous l'Arc de Triomphe. Pour le Kaiser, pour le pays, pour la gloire!`
    },
    firstBattle: {
      date: 'Septembre 1914',
      location: 'La Marne, France',
      title: 'Le reflux',
      entry: `Paris était si proche. Nous pouvions voir la Tour Eiffel depuis nos positions. La victoire semblait certaine.

Puis vint l'ordre de battre en retraite. Battre en retraite! Après tout ce pour quoi nous avions combattu.

Maintenant nous creusons. Nous creusons des tranchées qui semblent s'étendre jusqu'à l'éternité. La guerre de mouvement est terminée. C'est devenu quelque chose de complètement différent - une guerre d'usure, d'endurance.

Les Français et les Britanniques nous font face de l'autre côté d'une mer de boue et de barbelés. Nous tirons sur des ombres et prions pour ne pas devenir nous-mêmes des ombres.

Qu'est-il advenu de notre victoire rapide?`
    },
    midCampaign: {
      date: 'Février 1916',
      location: 'Verdun, France',
      title: 'Le hachoir à viande',
      entry: `"Ils ne passeront pas" - c'est ce que disent les Français de Verdun. Ils ont raison. Nous avons essayé, Dieu sait que nous avons essayé, mais la forteresse tient.

Le général Falkenhayn dit que nous allons saigner la France à blanc ici. Mais en regardant les corps de mes camarades, je me demande - qui saigne qui?

L'artillerie ne s'arrête jamais. Le sol lui-même semble crier d'agonie. Des forêts entières réduites en éclats, des villages effacés de la carte.

J'ai arrêté d'écrire à ma famille ce que je vois ici. Certaines choses ne peuvent pas être mises en mots. Certaines choses ne devraient pas l'être.`
    },
    lateCampaign: {
      date: 'Mars 1918',
      location: 'Front Ouest',
      title: 'Le dernier pari',
      entry: `L'offensive de printemps a commencé - notre dernière chance avant que les Américains n'arrivent en force. L'Opération Michael, l'appellent-ils.

Nous avons attaqué à l'aube à travers le brouillard et les gaz toxiques. Les lignes britanniques se sont effondrées devant nous. Pendant un moment, c'était comme en 1914 - le mouvement, l'avance, la victoire à portée de main.

Mais les vieux problèmes reviennent. Nous dépassons nos approvisionnements. Les hommes sont épuisés, affamés. Nous capturons des dépôts britanniques et nous arrêtons pour manger leur nourriture, leur café, leur chocolat.

L'offensive perd son élan. Je crains que ce soit notre dernier coup de dés.`
    },
    victory: {
      date: '11 novembre 1918',
      location: 'Allemagne',
      title: 'Le silence tombe',
      entry: `L'armistice est signé. La guerre est finie.

Nous n'avons pas gagné. Après quatre ans, après des millions de morts, après toute cette souffrance - nous n'avons pas gagné.

Le Kaiser s'est enfui. La révolution gronde dans les villes. Le monde que nous connaissions a disparu, emporté comme des feuilles en automne.

Je rentre chez moi, mais vers quoi? La ferme est peut-être encore là, mais l'Allemagne que j'ai quittée n'existe plus. Mes amis, mes camarades - tant sont partis pour toujours.

Nous avons combattu avec honneur. L'histoire nous jugera peut-être durement, mais nous avons combattu pour nos foyers, nos familles, notre pays. Cela doit compter pour quelque chose.`
    },
    veteranDeath: {
      title: 'Une place vide',
      entry: `{name} est tombé.

Nous avons tout partagé - notre pain, nos munitions, nos peurs. Dans cet enfer de boue et de fer, ils étaient mon frère, plus proche que le sang.

L'aumônier a prononcé des mots sur la tombe, mais je n'ai rien entendu. Quels mots peuvent donner un sens à une telle perte?

Une autre croix. Un autre nom pour le mémorial qui sera un jour construit. Les générations futures comprendront-elles ce que nous avons sacrifié ici?`
    }
  },

  french: {
    intro: {
      date: '3 août 1914',
      location: 'Paris, France',
      title: 'La Patrie en danger',
      entry: `Mobilisation générale! Les cloches sonnent dans toute la France, appelant ses fils aux armes.

Les Boches ont envahi la Belgique. Les souvenirs de 1870 brûlent encore - l'humiliation de Sedan, la perte de l'Alsace-Lorraine. Cette fois, la France vaincra!

Je me suis présenté au 75e d'Infanterie ce matin. Le régiment s'est formé sur la place, nos pantalons rouges éclatants sous le soleil d'été. La foule lançait des fleurs. Les filles nous embrassaient. Les vieux pleuraient et saluaient.

Nous marchons vers la frontière demain. L'Alsace attend sa libération. La France attend sa revanche!

Vive la France!`
    },
    firstBattle: {
      date: 'Septembre 1914',
      location: 'La Marne, France',
      title: 'Le Miracle',
      entry: `Paris fut sauvé. Les taxis ont transporté nos hommes au front, et nous avons tenu la ligne à la Marne.

Mais à quel prix? Les pantalons rouges ont disparu maintenant - trop visibles, disaient-ils, après que tant sont tombés lors des premières charges. L'élan qu'on nous avait promis nous mènerait à la victoire? Il s'est révélé impuissant face aux mitrailleuses allemandes.

Nous nous enterrons le long de l'Aisne. Ce n'est pas la guerre de mouvement pour laquelle nous avons été formés. C'est quelque chose de nouveau, quelque chose de terrible.

Mon ami Jean-Pierre est tombé hier. Il courait en avant, sa baïonnette au canon, chantant la Marseillaise. Il n'a jamais atteint la ligne allemande.`
    },
    midCampaign: {
      date: 'Février 1916',
      location: 'Verdun, France',
      title: 'Ils ne passeront pas',
      entry: `Verdun. L'antique forteresse, le symbole de la France. Les Allemands ont attaqué avec tout ce qu'ils ont.

Nous avons reçu l'ordre de tenir coûte que coûte. "Ils ne passeront pas" - les mots du Général Pétain résonnent dans chaque casemate, chaque tranchée.

Le bombardement ne cesse jamais. La terre elle-même saigne ici. Le Fort Douaumont est tombé, mais nous combattons toujours. Chaque mètre de sol français est sacré.

Je ne sais pas si je survivrai à cet endroit. Mais je sais que la France durera. Nous tiendrons Verdun, quoi qu'il en coûte.

Courage! La France se souvient de ses fils.`
    },
    lateCampaign: {
      date: 'Avril 1917',
      location: 'Chemin des Dames',
      title: 'Les Mutineries',
      entry: `L'offensive a échoué. Nivelle nous avait promis la percée, la victoire, la fin du cauchemar. Au lieu de cela, nous n'avons rien gagné et tout perdu.

Les hommes refusent d'attaquer. Pas par lâcheté - jamais cela - mais à cause de la folie de tout cela. Nous défendrons la France jusqu'à notre dernier souffle, mais nous n'irons plus nous jeter sur les mitrailleuses pour des généraux qui déjeunent dans des châteaux.

Le Général Pétain a pris le commandement. Il nous parle comme à des hommes, pas comme à du bétail. Il promet plus d'attaques futiles. Nous le croyons.

La guerre continue, mais quelque chose a changé. Nous avons trouvé notre voix.`
    },
    victory: {
      date: '11 novembre 1918',
      location: 'France',
      title: 'La Victoire',
      entry: `C'est fini.

À la onzième heure du onzième jour du onzième mois, les canons se sont tus. Je me tenais dans la tranchée et j'ai pleuré - de joie, de chagrin, pour tout ce que nous avons perdu.

La France est libre. L'Alsace et la Lorraine nous reviennent. Le sacrifice d'un million de Français n'aura pas été vain.

Mais en regardant le paysage dévasté, les villages en ruines, les cimetières sans fin - je me demande ce que nous avons vraiment gagné.

Nous avons sauvé la France, mais la France de mon enfance a disparu pour toujours. Puissent nos enfants ne jamais connaître une telle horreur.

Paix aux morts.`
    },
    veteranDeath: {
      title: 'Un camarade tombé',
      entry: `{name} nous a quittés.

Dans les tranchées, nous sommes devenus plus que des camarades. Nous sommes devenus des frères, liés par la boue, le sang et la souffrance partagée.

J'écrirai à leur famille, bien que quels mots peuvent apaiser une telle perte? Je leur parlerai de leur courage, de leur sacrifice, de leur amour pour la France.

Un autre nom pour les monuments que nous construirons. Une autre chaise vide à une table familiale.

Repose maintenant, mon ami. La France se souvient.`
    }
  },

  american: {
    intro: {
      date: '7 avril 1917',
      location: 'New York City, USA',
      title: 'Over There',
      entry: `Le Président Wilson a déclaré la guerre! L'Amérique rejoint enfin le combat.

Les bureaux de recrutement sont bondés. Ils jouent cette nouvelle chanson partout - "Over There". Les gars vont là-bas, et nous ne reviendrons pas tant que ce ne sera pas fini, là-bas!

Je me suis engagé ce matin dans la 1ère Division d'Infanterie - la "Big Red One". Pa dit que je suis fou, que ce n'est pas notre guerre. Mais le Lusitania, le télégramme Zimmermann, les atrocités belges - comment pouvons-nous rester à l'écart?

Je ne suis jamais allé en Europe. Je n'aurais jamais pensé voir Paris, ou combattre aux côtés des Britanniques et des Français. Quelle aventure ce sera!

On arrive, Kaiser!`
    },
    firstBattle: {
      date: 'Octobre 1917',
      location: 'Lorraine, France',
      title: 'Bienvenue à la guerre',
      entry: `L'entraînement est terminé. Nous avons été transférés dans un secteur calme pour apprendre les ficelles auprès des Français.

Calme, disent-ils. Les bombardements ne s'arrêtent jamais. Les tranchées sont pires que tout ce que j'avais imaginé - la boue, les rats, la puanteur constante de la mort.

Les vétérans français nous regardent avec un mélange de pitié et d'amusement. Ils font ça depuis trois ans. Trois ans! Ils se déplacent dans ce cauchemar comme des fantômes, sachant instinctivement quand se baisser, quand courir, quand se figer.

J'apprends vite. Nous apprenons tous vite. Le garçon naïf qui a navigué depuis New York s'efface déjà. À sa place, quelque chose de plus dur grandit.`
    },
    midCampaign: {
      date: 'Juin 1918',
      location: 'Bois de Belleau, France',
      title: 'Les Chiens du Diable',
      entry: `Ils ont dit aux Marines de battre en retraite. "Battre en retraite?" a dit notre sergent. "Bon sang, on vient juste d'arriver!"

Le Bois de Belleau est un cauchemar - une forêt d'arbres brisés et de mitrailleuses cachées. Les Allemands sont profondément retranchés, et ils se battent comme des démons.

Mais nous aussi. Les Français nous appellent "Teufel Hunden" - Chiens du Diable. Nous avons mérité ce nom dans le sang.

La manière américaine de faire la guerre est différente, disent-ils. Nous ne tenons pas seulement le terrain - nous le prenons. Quel qu'en soit le prix.

J'ai perdu le compte des attaques que nous avons menées dans ces bois. Mais nous gagnons. Centimètre par centimètre sanglant, nous gagnons.`
    },
    lateCampaign: {
      date: 'Septembre 1918',
      location: 'Meuse-Argonne, France',
      title: 'L\'ultime offensive',
      entry: `La plus grande offensive américaine de la guerre a commencé. Plus d'un million de Sammies poussent à travers la forêt d'Argonne vers Sedan.

Les lignes allemandes s'effondrent, mais ils ne se rendent pas facilement. Chaque colline, chaque village, chaque carrefour est une bataille. La Ligne Hindenburg - prétendument imprenable - cède.

Le Sergent York a capturé 132 Allemands à lui seul hier. C'est le genre d'histoire qu'ils raconteront au pays. Ils ne parleront pas des gars qui n'ont pas survécu, qui sont morts dans la boue juste avant la victoire.

Nous sentons que la fin approche. Après toute cette souffrance, est-ce vraiment presque fini?`
    },
    victory: {
      date: '11 novembre 1918',
      location: 'France',
      title: 'Le Jour de l\'Armistice',
      entry: `À 11h00, la guerre a pris fin. La Grande Guerre. La Guerre pour mettre fin à toutes les guerres.

Certains gars ont tiré leurs fusils en l'air. D'autres sont juste restés là, hébétés. Après des mois de combat constant, le silence semble étrange d'une certaine façon.

Je suis assis sur une colline surplombant la vallée de la Meuse. Le soleil perce les nuages pour la première fois depuis des jours. Quelque part, des cloches d'église sonnent.

Nous l'avons fait. L'Amérique a aidé à finir ce que les Alliés avaient commencé. Mais en regardant les croix s'étendant jusqu'à l'horizon, je me demande si ça en valait la peine.

Je rentre chez moi. Dans un pays qui ne comprendra jamais vraiment ce que nous avons vu ici. Mais moi je sais. Et je n'oublierai jamais.

Over there, c'est enfin fini.`
    },
    veteranDeath: {
      title: 'Sonnerie aux morts',
      entry: `{name} n'a pas survécu.

Nous avons grandi dans la même ville, nous nous sommes engagés le même jour, avons traversé l'Atlantique sur le même bateau. Maintenant je rentre chez moi, et ils restent ici pour toujours, dans la terre française si loin de chez eux.

Le clairon a joué la sonnerie aux morts quand nous les avons descendus dans la tombe. Cette mélodie lugubre me hantera pour le reste de mes jours.

Repose en paix, mon pote. Tu es mort en te battant pour quelque chose de plus grand que toi. Ça doit compter pour quelque chose. Ça doit.

Je trouverai ta famille quand je rentrerai. Je leur dirai que tu étais courageux, que tu es mort en héros. C'est ce qu'ils ont besoin d'entendre. C'est ce que j'ai besoin de croire.`
    }
  }
};

// ============================================================================
// DIARY SYSTEM FUNCTIONS
// ============================================================================

// Get all entries for a specific language
function getEntriesForLanguage(language) {
  switch (language) {
    case 'de':
      return DIARY_ENTRIES_DE;
    case 'fr':
      return DIARY_ENTRIES_FR;
    default:
      return DIARY_ENTRIES_EN;
  }
}

// Get a diary entry for a specific event
export function getDiaryEntry(factionId, entryType, replacements = {}, language = 'en') {
  const entries = getEntriesForLanguage(language);
  const factionEntries = entries[factionId] || entries.british;
  const entry = factionEntries[entryType];

  if (!entry) return null;

  // Apply any text replacements (like veteran names)
  let processedEntry = { ...entry };
  if (replacements.name && processedEntry.entry) {
    processedEntry.entry = processedEntry.entry.replace('{name}', replacements.name);
  }

  return processedEntry;
}

// Get intro entry for a faction
export function getIntroEntry(factionId, language = 'en') {
  return getDiaryEntry(factionId, 'intro', {}, language);
}

// Determine which diary entry to show based on campaign progress
export function getProgressDiaryEntry(factionId, completedMissions = [], veterans = [], language = 'en') {
  const missionCount = completedMissions.length;

  if (missionCount === 0) {
    return getDiaryEntry(factionId, 'intro', {}, language);
  } else if (missionCount <= 3) {
    return getDiaryEntry(factionId, 'firstBattle', {}, language);
  } else if (missionCount <= 10) {
    return getDiaryEntry(factionId, 'midCampaign', {}, language);
  } else if (missionCount <= 18) {
    return getDiaryEntry(factionId, 'lateCampaign', {}, language);
  } else {
    return getDiaryEntry(factionId, 'victory', {}, language);
  }
}

// Get memorial entry for a fallen veteran
export function getVeteranDeathEntry(factionId, veteranName, language = 'en') {
  return getDiaryEntry(factionId, 'veteranDeath', { name: veteranName }, language);
}

// Get all unlocked diary entries for the War Diary screen
export function getUnlockedDiaryEntries(factionId, completedMissions = [], fallenVeterans = [], language = 'en') {
  const entries = [];
  const missionCount = completedMissions.length;

  // Always have intro
  const intro = getDiaryEntry(factionId, 'intro', {}, language);
  if (intro) {
    entries.push({ ...intro, type: 'intro', unlocked: true });
  }

  // First battle entry (after any mission)
  if (missionCount >= 1) {
    const firstBattle = getDiaryEntry(factionId, 'firstBattle', {}, language);
    if (firstBattle) {
      entries.push({ ...firstBattle, type: 'firstBattle', unlocked: true });
    }
  } else {
    entries.push({ type: 'firstBattle', unlocked: false, title: '??? ' + getLockedTitle('firstBattle', language) });
  }

  // Mid campaign (after 5 missions)
  if (missionCount >= 5) {
    const mid = getDiaryEntry(factionId, 'midCampaign', {}, language);
    if (mid) {
      entries.push({ ...mid, type: 'midCampaign', unlocked: true });
    }
  } else {
    entries.push({ type: 'midCampaign', unlocked: false, title: '??? ' + getLockedTitle('midCampaign', language) });
  }

  // Late campaign (after 12 missions)
  if (missionCount >= 12) {
    const late = getDiaryEntry(factionId, 'lateCampaign', {}, language);
    if (late) {
      entries.push({ ...late, type: 'lateCampaign', unlocked: true });
    }
  } else {
    entries.push({ type: 'lateCampaign', unlocked: false, title: '??? ' + getLockedTitle('lateCampaign', language) });
  }

  // Victory (after all 20 missions)
  if (missionCount >= 20) {
    const victory = getDiaryEntry(factionId, 'victory', {}, language);
    if (victory) {
      entries.push({ ...victory, type: 'victory', unlocked: true });
    }
  } else {
    entries.push({ type: 'victory', unlocked: false, title: '??? ' + getLockedTitle('victory', language) });
  }

  // Add memorial entries for fallen veterans
  if (fallenVeterans && fallenVeterans.length > 0) {
    fallenVeterans.forEach((veteran) => {
      const memorial = getVeteranDeathEntry(factionId, veteran.name || getUnknownSoldierText(language), language);
      if (memorial) {
        entries.push({
          ...memorial,
          type: 'memorial',
          unlocked: true,
          veteranName: veteran.name,
          date: veteran.fallDate || getUnknownText(language),
          location: veteran.fallLocation || getWesternFrontText(language)
        });
      }
    });
  }

  return entries;
}

// Helper function for locked entry titles
function getLockedTitle(type, language) {
  const titles = {
    en: {
      firstBattle: 'First Battle',
      midCampaign: 'The War Continues',
      lateCampaign: 'The Final Year',
      victory: 'The End'
    },
    de: {
      firstBattle: 'Erste Schlacht',
      midCampaign: 'Der Krieg geht weiter',
      lateCampaign: 'Das letzte Jahr',
      victory: 'Das Ende'
    },
    fr: {
      firstBattle: 'Première bataille',
      midCampaign: 'La guerre continue',
      lateCampaign: 'La dernière année',
      victory: 'La fin'
    }
  };
  return titles[language]?.[type] || titles.en[type];
}

// Helper for "Unknown Soldier" text
function getUnknownSoldierText(language) {
  const texts = { en: 'Unknown Soldier', de: 'Unbekannter Soldat', fr: 'Soldat Inconnu' };
  return texts[language] || texts.en;
}

// Helper for "Unknown" text
function getUnknownText(language) {
  const texts = { en: 'Unknown', de: 'Unbekannt', fr: 'Inconnu' };
  return texts[language] || texts.en;
}

// Helper for "The Western Front" text
function getWesternFrontText(language) {
  const texts = { en: 'The Western Front', de: 'Die Westfront', fr: 'Le Front Ouest' };
  return texts[language] || texts.en;
}

// Export all entries for reference
export const DIARY_ENTRIES = DIARY_ENTRIES_EN;
export const DIARY_ENTRIES_GERMAN = DIARY_ENTRIES_DE;
export const DIARY_ENTRIES_FRENCH = DIARY_ENTRIES_FR;

export default {
  DIARY_ENTRIES,
  DIARY_ENTRIES_GERMAN,
  DIARY_ENTRIES_FRENCH,
  getDiaryEntry,
  getIntroEntry,
  getProgressDiaryEntry,
  getVeteranDeathEntry,
  getUnlockedDiaryEntries
};
