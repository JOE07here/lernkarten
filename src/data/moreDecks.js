// Extra A1 decks. Same card shape as germanA1.js:
// { id, front, back, pos, example, exampleEn, speak }
// Noun fronts keep their article (der/die/das) so the UI can colour-code gender.
import { days, months, seasons } from './calendar.js'

// Build flashcard cards from the shared calendar data so there's one source of truth.
const calendarCards = (items) =>
  items.map((it) => ({
    id: it.id,
    front: it.de,
    back: it.en,
    pos: 'noun',
    example: it.example,
    exampleEn: it.exampleEn,
    speak: it.speak,
  }))

export const colorsDeck = {
  id: 'german-a1-colors',
  name: 'German A1 — Farben (Colors)',
  language: 'de-DE',
  cards: [
    { id: 'col-01', front: 'rot', back: 'red', pos: 'adjective', example: 'Die Rose ist rot.', exampleEn: 'The rose is red.', speak: 'rot' },
    { id: 'col-02', front: 'blau', back: 'blue', pos: 'adjective', example: 'Der Himmel ist blau.', exampleEn: 'The sky is blue.', speak: 'blau' },
    { id: 'col-03', front: 'grün', back: 'green', pos: 'adjective', example: 'Das Gras ist grün.', exampleEn: 'The grass is green.', speak: 'grün' },
    { id: 'col-04', front: 'gelb', back: 'yellow', pos: 'adjective', example: 'Die Banane ist gelb.', exampleEn: 'The banana is yellow.', speak: 'gelb' },
    { id: 'col-05', front: 'schwarz', back: 'black', pos: 'adjective', example: 'Die Katze ist schwarz.', exampleEn: 'The cat is black.', speak: 'schwarz' },
    { id: 'col-06', front: 'weiß', back: 'white', pos: 'adjective', example: 'Der Schnee ist weiß.', exampleEn: 'The snow is white.', speak: 'weiß' },
    { id: 'col-07', front: 'orange', back: 'orange', pos: 'adjective', example: 'Die Orange ist orange.', exampleEn: 'The orange is orange.', speak: 'orange' },
    { id: 'col-08', front: 'braun', back: 'brown', pos: 'adjective', example: 'Der Bär ist braun.', exampleEn: 'The bear is brown.', speak: 'braun' },
    { id: 'col-09', front: 'grau', back: 'grey', pos: 'adjective', example: 'Der Elefant ist grau.', exampleEn: 'The elephant is grey.', speak: 'grau' },
    { id: 'col-10', front: 'rosa', back: 'pink', pos: 'adjective', example: 'Das Schwein ist rosa.', exampleEn: 'The pig is pink.', speak: 'rosa' },
    { id: 'col-11', front: 'lila', back: 'purple', pos: 'adjective', example: 'Die Blume ist lila.', exampleEn: 'The flower is purple.', speak: 'lila' },
  ],
}

export const daysDeck = {
  id: 'german-a1-days',
  name: 'German A1 — Wochentage (Days)',
  language: 'de-DE',
  cards: calendarCards(days),
}

export const monthsDeck = {
  id: 'german-a1-months',
  name: 'German A1 — Monate (Months)',
  language: 'de-DE',
  cards: calendarCards(months),
}

export const seasonsDeck = {
  id: 'german-a1-seasons',
  name: 'German A1 — Jahreszeiten (Seasons)',
  language: 'de-DE',
  cards: calendarCards(seasons),
}

export const greetingsDeck = {
  id: 'german-a1-greetings',
  name: 'German A1 — Begrüßung & Smalltalk',
  language: 'de-DE',
  cards: [
    { id: 'grt-01', front: 'Guten Morgen', back: 'good morning', pos: 'phrase', example: 'Guten Morgen! Hast du gut geschlafen?', exampleEn: 'Good morning! Did you sleep well?', speak: 'Guten Morgen' },
    { id: 'grt-02', front: 'Guten Tag', back: 'hello / good day', pos: 'phrase', example: 'Guten Tag, Frau Müller.', exampleEn: 'Hello, Mrs. Müller.', speak: 'Guten Tag' },
    { id: 'grt-03', front: 'Guten Abend', back: 'good evening', pos: 'phrase', example: 'Guten Abend zusammen.', exampleEn: 'Good evening, everyone.', speak: 'Guten Abend' },
    { id: 'grt-04', front: 'Gute Nacht', back: 'good night', pos: 'phrase', example: 'Gute Nacht, schlaf gut.', exampleEn: 'Good night, sleep well.', speak: 'Gute Nacht' },
    { id: 'grt-05', front: 'Auf Wiedersehen', back: 'goodbye', pos: 'phrase', example: 'Auf Wiedersehen und bis bald.', exampleEn: 'Goodbye and see you soon.', speak: 'Auf Wiedersehen' },
    { id: 'grt-06', front: 'Wie geht es dir?', back: 'how are you? (informal)', pos: 'phrase', example: 'Hallo Anna, wie geht es dir?', exampleEn: 'Hi Anna, how are you?', speak: 'Wie geht es dir?' },
    { id: 'grt-07', front: 'Mir geht es gut', back: "I'm fine", pos: 'phrase', example: 'Danke, mir geht es gut.', exampleEn: "Thanks, I'm fine.", speak: 'Mir geht es gut' },
    { id: 'grt-08', front: 'Wie heißt du?', back: "what's your name? (informal)", pos: 'phrase', example: 'Hallo, wie heißt du?', exampleEn: "Hi, what's your name?", speak: 'Wie heißt du?' },
    { id: 'grt-09', front: 'Ich heiße …', back: 'my name is …', pos: 'phrase', example: 'Ich heiße Joemon.', exampleEn: 'My name is Joemon.', speak: 'Ich heiße Joemon' },
    { id: 'grt-10', front: 'Woher kommst du?', back: 'where are you from?', pos: 'phrase', example: 'Woher kommst du?', exampleEn: 'Where are you from?', speak: 'Woher kommst du?' },
    { id: 'grt-11', front: 'Ich komme aus …', back: 'I come from …', pos: 'phrase', example: 'Ich komme aus Indien.', exampleEn: 'I come from India.', speak: 'Ich komme aus Indien' },
    { id: 'grt-12', front: 'Freut mich', back: 'nice to meet you', pos: 'phrase', example: 'Freut mich, dich kennenzulernen.', exampleEn: 'Nice to meet you.', speak: 'Freut mich' },
    { id: 'grt-13', front: 'Entschuldigung', back: 'excuse me / sorry', pos: 'phrase', example: 'Entschuldigung, wo ist der Bahnhof?', exampleEn: 'Excuse me, where is the station?', speak: 'Entschuldigung' },
    { id: 'grt-14', front: 'Bis bald', back: 'see you soon', pos: 'phrase', example: 'Tschüss, bis bald!', exampleEn: 'Bye, see you soon!', speak: 'Bis bald' },
  ],
}

export const cognatesDeck = {
  id: 'german-a1-cognates',
  name: 'German A1 — Cognates (look like English)',
  language: 'de-DE',
  cards: [
    { id: 'cog-01', front: 'die Hand', back: 'hand', pos: 'noun', example: 'Ich wasche meine Hand.', exampleEn: 'I wash my hand.', speak: 'Hand' },
    { id: 'cog-02', front: 'der Finger', back: 'finger', pos: 'noun', example: 'Mein Finger tut weh.', exampleEn: 'My finger hurts.', speak: 'Finger' },
    { id: 'cog-03', front: 'der Arm', back: 'arm', pos: 'noun', example: 'Mein Arm ist müde.', exampleEn: 'My arm is tired.', speak: 'Arm' },
    { id: 'cog-04', front: 'das Knie', back: 'knee', pos: 'noun', example: 'Mein Knie tut weh.', exampleEn: 'My knee hurts.', speak: 'Knie' },
    { id: 'cog-05', front: 'die Maus', back: 'mouse', pos: 'noun', example: 'Die Maus ist klein.', exampleEn: 'The mouse is small.', speak: 'Maus' },
    { id: 'cog-06', front: 'das Bier', back: 'beer', pos: 'noun', example: 'Das Bier ist kalt.', exampleEn: 'The beer is cold.', speak: 'Bier' },
    { id: 'cog-07', front: 'der Wein', back: 'wine', pos: 'noun', example: 'Der Wein ist rot.', exampleEn: 'The wine is red.', speak: 'Wein' },
    { id: 'cog-08', front: 'die Butter', back: 'butter', pos: 'noun', example: 'Die Butter ist weich.', exampleEn: 'The butter is soft.', speak: 'Butter' },
    { id: 'cog-09', front: 'der Ball', back: 'ball', pos: 'noun', example: 'Der Ball ist rund.', exampleEn: 'The ball is round.', speak: 'Ball' },
    { id: 'cog-10', front: 'der Garten', back: 'garden', pos: 'noun', example: 'Der Garten ist schön.', exampleEn: 'The garden is beautiful.', speak: 'Garten' },
    { id: 'cog-11', front: 'das Boot', back: 'boat', pos: 'noun', example: 'Das Boot ist klein.', exampleEn: 'The boat is small.', speak: 'Boot' },
    { id: 'cog-12', front: 'warm', back: 'warm', pos: 'adjective', example: 'Das Wasser ist warm.', exampleEn: 'The water is warm.', speak: 'warm' },
  ],
}

export const falseFriendsDeck = {
  id: 'german-a1-false-friends',
  name: 'German A1 — Falsche Freunde (false friends)',
  language: 'de-DE',
  cards: [
    { id: 'ff-01', front: 'das Gift', back: 'poison (NOT a gift!)', pos: 'noun', example: 'Vorsicht, das ist Gift!', exampleEn: 'Careful, that is poison!', speak: 'Gift' },
    { id: 'ff-02', front: 'das Handy', back: 'mobile phone (NOT handy)', pos: 'noun', example: 'Mein Handy ist kaputt.', exampleEn: 'My mobile phone is broken.', speak: 'Handy' },
    { id: 'ff-03', front: 'der Chef', back: 'boss (NOT chef/cook)', pos: 'noun', example: 'Mein Chef ist nett.', exampleEn: 'My boss is nice.', speak: 'Chef' },
    { id: 'ff-04', front: 'bald', back: 'soon (NOT bald)', pos: 'adverb', example: 'Bis bald!', exampleEn: 'See you soon!', speak: 'bald' },
    { id: 'ff-05', front: 'das Rad', back: 'wheel / bike (NOT rad)', pos: 'noun', example: 'Ich fahre Rad.', exampleEn: 'I ride a bike.', speak: 'Rad' },
    { id: 'ff-06', front: 'der Rat', back: 'advice (NOT rat)', pos: 'noun', example: 'Ich brauche deinen Rat.', exampleEn: 'I need your advice.', speak: 'Rat' },
    { id: 'ff-07', front: 'die Art', back: 'type / kind (NOT art)', pos: 'noun', example: 'Welche Art von Musik magst du?', exampleEn: 'What kind of music do you like?', speak: 'Art' },
    { id: 'ff-08', front: 'also', back: 'so / therefore (NOT also)', pos: 'adverb', example: 'Also, gehen wir.', exampleEn: "So, let's go.", speak: 'also' },
    { id: 'ff-09', front: 'der See', back: 'lake (NOT see)', pos: 'noun', example: 'Der See ist tief.', exampleEn: 'The lake is deep.', speak: 'See' },
    { id: 'ff-10', front: 'brav', back: 'well-behaved (NOT brave)', pos: 'adjective', example: 'Das Kind ist brav.', exampleEn: 'The child is well-behaved.', speak: 'brav' },
    { id: 'ff-11', front: 'eventuell', back: 'possibly / maybe (NOT eventually)', pos: 'adverb', example: 'Eventuell komme ich später.', exampleEn: "I'll possibly come later.", speak: 'eventuell' },
    { id: 'ff-12', front: 'bekommen', back: 'to receive / get (NOT become)', pos: 'verb', example: 'Ich bekomme ein Geschenk.', exampleEn: 'I receive a present.', speak: 'bekommen' },
  ],
}

export const familyDeck = {
  id: 'german-a1-family',
  name: 'German A1 — Familie (Family)',
  language: 'de-DE',
  cards: [
    { id: 'fam-01', front: 'die Familie', back: 'the family', pos: 'noun', example: 'Meine Familie ist groß.', exampleEn: 'My family is big.', speak: 'Familie' },
    { id: 'fam-02', front: 'die Mutter', back: 'the mother', pos: 'noun', example: 'Meine Mutter kocht gern.', exampleEn: 'My mother likes to cook.', speak: 'Mutter' },
    { id: 'fam-03', front: 'der Vater', back: 'the father', pos: 'noun', example: 'Mein Vater arbeitet viel.', exampleEn: 'My father works a lot.', speak: 'Vater' },
    { id: 'fam-04', front: 'die Eltern', back: 'the parents', pos: 'noun', example: 'Meine Eltern wohnen in Köln.', exampleEn: 'My parents live in Cologne.', speak: 'Eltern' },
    { id: 'fam-05', front: 'der Bruder', back: 'the brother', pos: 'noun', example: 'Mein Bruder ist jünger.', exampleEn: 'My brother is younger.', speak: 'Bruder' },
    { id: 'fam-06', front: 'die Schwester', back: 'the sister', pos: 'noun', example: 'Meine Schwester heißt Anna.', exampleEn: 'My sister is called Anna.', speak: 'Schwester' },
    { id: 'fam-07', front: 'die Geschwister', back: 'the siblings', pos: 'noun', example: 'Hast du Geschwister?', exampleEn: 'Do you have siblings?', speak: 'Geschwister' },
    { id: 'fam-08', front: 'die Großmutter', back: 'the grandmother', pos: 'noun', example: 'Meine Großmutter ist achtzig.', exampleEn: 'My grandmother is eighty.', speak: 'Großmutter' },
    { id: 'fam-09', front: 'der Großvater', back: 'the grandfather', pos: 'noun', example: 'Mein Großvater liest gern.', exampleEn: 'My grandfather likes to read.', speak: 'Großvater' },
    { id: 'fam-10', front: 'die Tochter', back: 'the daughter', pos: 'noun', example: 'Ihre Tochter ist klein.', exampleEn: 'Her daughter is small.', speak: 'Tochter' },
    { id: 'fam-11', front: 'der Sohn', back: 'the son', pos: 'noun', example: 'Ihr Sohn geht zur Schule.', exampleEn: 'Her son goes to school.', speak: 'Sohn' },
    { id: 'fam-12', front: 'das Kind', back: 'the child', pos: 'noun', example: 'Das Kind spielt draußen.', exampleEn: 'The child plays outside.', speak: 'Kind' },
    { id: 'fam-13', front: 'die Frau', back: 'the woman / wife', pos: 'noun', example: 'Seine Frau heißt Maria.', exampleEn: 'His wife is called Maria.', speak: 'Frau' },
    { id: 'fam-14', front: 'der Mann', back: 'the man / husband', pos: 'noun', example: 'Ihr Mann ist Lehrer.', exampleEn: 'Her husband is a teacher.', speak: 'Mann' },
    { id: 'fam-15', front: 'die Tante', back: 'the aunt', pos: 'noun', example: 'Meine Tante wohnt in Wien.', exampleEn: 'My aunt lives in Vienna.', speak: 'Tante' },
    { id: 'fam-16', front: 'der Onkel', back: 'the uncle', pos: 'noun', example: 'Mein Onkel hat einen Hund.', exampleEn: 'My uncle has a dog.', speak: 'Onkel' },
  ],
}

export const foodDeck = {
  id: 'german-a1-food',
  name: 'German A1 — Essen & Trinken (Food & Drink)',
  language: 'de-DE',
  cards: [
    { id: 'food-01', front: 'das Brot', back: 'the bread', pos: 'noun', example: 'Ich esse Brot zum Frühstück.', exampleEn: 'I eat bread for breakfast.', speak: 'Brot' },
    { id: 'food-02', front: 'das Brötchen', back: 'the bread roll', pos: 'noun', example: 'Das Brötchen ist frisch.', exampleEn: 'The bread roll is fresh.', speak: 'Brötchen' },
    { id: 'food-03', front: 'der Käse', back: 'the cheese', pos: 'noun', example: 'Der Käse kommt aus der Schweiz.', exampleEn: 'The cheese is from Switzerland.', speak: 'Käse' },
    { id: 'food-04', front: 'die Butter', back: 'the butter', pos: 'noun', example: 'Die Butter ist im Kühlschrank.', exampleEn: 'The butter is in the fridge.', speak: 'Butter' },
    { id: 'food-05', front: 'das Ei', back: 'the egg', pos: 'noun', example: 'Ich möchte ein Ei.', exampleEn: 'I would like an egg.', speak: 'Ei' },
    { id: 'food-06', front: 'das Obst', back: 'the fruit', pos: 'noun', example: 'Obst ist gesund.', exampleEn: 'Fruit is healthy.', speak: 'Obst' },
    { id: 'food-07', front: 'das Gemüse', back: 'the vegetables', pos: 'noun', example: 'Ich esse viel Gemüse.', exampleEn: 'I eat a lot of vegetables.', speak: 'Gemüse' },
    { id: 'food-08', front: 'das Fleisch', back: 'the meat', pos: 'noun', example: 'Er isst kein Fleisch.', exampleEn: "He doesn't eat meat.", speak: 'Fleisch' },
    { id: 'food-09', front: 'der Fisch', back: 'the fish', pos: 'noun', example: 'Der Fisch schmeckt gut.', exampleEn: 'The fish tastes good.', speak: 'Fisch' },
    { id: 'food-10', front: 'die Suppe', back: 'the soup', pos: 'noun', example: 'Die Suppe ist heiß.', exampleEn: 'The soup is hot.', speak: 'Suppe' },
    { id: 'food-11', front: 'der Kaffee', back: 'the coffee', pos: 'noun', example: 'Ich trinke Kaffee am Morgen.', exampleEn: 'I drink coffee in the morning.', speak: 'Kaffee' },
    { id: 'food-12', front: 'der Tee', back: 'the tea', pos: 'noun', example: 'Möchtest du einen Tee?', exampleEn: 'Would you like a tea?', speak: 'Tee' },
    { id: 'food-13', front: 'das Wasser', back: 'the water', pos: 'noun', example: 'Ein Glas Wasser, bitte.', exampleEn: 'A glass of water, please.', speak: 'Wasser' },
    { id: 'food-14', front: 'die Milch', back: 'the milk', pos: 'noun', example: 'Die Milch ist kalt.', exampleEn: 'The milk is cold.', speak: 'Milch' },
    { id: 'food-15', front: 'der Saft', back: 'the juice', pos: 'noun', example: 'Ich trinke gern Apfelsaft.', exampleEn: 'I like to drink apple juice.', speak: 'Saft' },
    { id: 'food-16', front: 'der Zucker', back: 'the sugar', pos: 'noun', example: 'Nimmst du Zucker?', exampleEn: 'Do you take sugar?', speak: 'Zucker' },
    { id: 'food-17', front: 'das Salz', back: 'the salt', pos: 'noun', example: 'Das Salz ist auf dem Tisch.', exampleEn: 'The salt is on the table.', speak: 'Salz' },
    { id: 'food-18', front: 'das Frühstück', back: 'the breakfast', pos: 'noun', example: 'Das Frühstück ist fertig.', exampleEn: 'Breakfast is ready.', speak: 'Frühstück' },
  ],
}

export const bodyDeck = {
  id: 'german-a1-body',
  name: 'German A1 — Der Körper (The Body)',
  language: 'de-DE',
  cards: [
    { id: 'body-01', front: 'der Kopf', back: 'the head', pos: 'noun', example: 'Mein Kopf tut weh.', exampleEn: 'My head hurts.', speak: 'Kopf' },
    { id: 'body-02', front: 'das Haar', back: 'the hair', pos: 'noun', example: 'Sie hat langes Haar.', exampleEn: 'She has long hair.', speak: 'Haar' },
    { id: 'body-03', front: 'das Auge', back: 'the eye', pos: 'noun', example: 'Sein Auge ist blau.', exampleEn: 'His eye is blue.', speak: 'Auge' },
    { id: 'body-04', front: 'die Nase', back: 'the nose', pos: 'noun', example: 'Die Nase ist kalt.', exampleEn: 'The nose is cold.', speak: 'Nase' },
    { id: 'body-05', front: 'der Mund', back: 'the mouth', pos: 'noun', example: 'Mach den Mund auf!', exampleEn: 'Open your mouth!', speak: 'Mund' },
    { id: 'body-06', front: 'das Ohr', back: 'the ear', pos: 'noun', example: 'Mein Ohr tut weh.', exampleEn: 'My ear hurts.', speak: 'Ohr' },
    { id: 'body-07', front: 'der Zahn', back: 'the tooth', pos: 'noun', example: 'Der Zahn ist weiß.', exampleEn: 'The tooth is white.', speak: 'Zahn' },
    { id: 'body-08', front: 'der Hals', back: 'the neck / throat', pos: 'noun', example: 'Mein Hals tut weh.', exampleEn: 'My throat hurts.', speak: 'Hals' },
    { id: 'body-09', front: 'die Hand', back: 'the hand', pos: 'noun', example: 'Gib mir deine Hand.', exampleEn: 'Give me your hand.', speak: 'Hand' },
    { id: 'body-10', front: 'der Arm', back: 'the arm', pos: 'noun', example: 'Mein Arm ist lang.', exampleEn: 'My arm is long.', speak: 'Arm' },
    { id: 'body-11', front: 'der Finger', back: 'the finger', pos: 'noun', example: 'Ich habe zehn Finger.', exampleEn: 'I have ten fingers.', speak: 'Finger' },
    { id: 'body-12', front: 'das Bein', back: 'the leg', pos: 'noun', example: 'Mein Bein tut weh.', exampleEn: 'My leg hurts.', speak: 'Bein' },
    { id: 'body-13', front: 'der Fuß', back: 'the foot', pos: 'noun', example: 'Mein Fuß ist klein.', exampleEn: 'My foot is small.', speak: 'Fuß' },
    { id: 'body-14', front: 'der Bauch', back: 'the belly / stomach', pos: 'noun', example: 'Mein Bauch tut weh.', exampleEn: 'My stomach hurts.', speak: 'Bauch' },
    { id: 'body-15', front: 'der Rücken', back: 'the back', pos: 'noun', example: 'Mein Rücken tut weh.', exampleEn: 'My back hurts.', speak: 'Rücken' },
    { id: 'body-16', front: 'das Herz', back: 'the heart', pos: 'noun', example: 'Mein Herz schlägt schnell.', exampleEn: 'My heart beats fast.', speak: 'Herz' },
  ],
}

export const moreDecks = [
  colorsDeck,
  daysDeck,
  monthsDeck,
  seasonsDeck,
  familyDeck,
  foodDeck,
  bodyDeck,
  greetingsDeck,
  cognatesDeck,
  falseFriendsDeck,
]
