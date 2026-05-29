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

export const moreDecks = [
  colorsDeck,
  daysDeck,
  monthsDeck,
  seasonsDeck,
  greetingsDeck,
  cognatesDeck,
  falseFriendsDeck,
]
