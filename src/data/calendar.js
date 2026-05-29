// Calendar vocabulary — single source of truth for both the visual pages
// (Days / Months / Seasons) and the flashcard decks built in moreDecks.js.
//   de        — German (with article; all are masculine → der)
//   speak     — word read aloud by 🔊 (no article)
//   en        — English
//   emoji     — the "image" shown on the visual card
//   note      — optional memory hook
//   example / exampleEn — example sentence + translation

export const days = [
  { id: 'day-01', de: 'der Montag', speak: 'Montag', en: 'Monday', emoji: '🌙', note: 'Mond = moon → “Moon-day”.', example: 'Am Montag arbeite ich.', exampleEn: 'On Monday I work.' },
  { id: 'day-02', de: 'der Dienstag', speak: 'Dienstag', en: 'Tuesday', emoji: '🗓️', note: '', example: 'Am Dienstag habe ich Deutsch.', exampleEn: 'On Tuesday I have German.' },
  { id: 'day-03', de: 'der Mittwoch', speak: 'Mittwoch', en: 'Wednesday', emoji: '🐪', note: 'Mitte + Woche = “mid-week”.', example: 'Mittwoch ist die Mitte der Woche.', exampleEn: 'Wednesday is the middle of the week.' },
  { id: 'day-04', de: 'der Donnerstag', speak: 'Donnerstag', en: 'Thursday', emoji: '⚡', note: 'Donner = thunder → Thor’s day.', example: 'Am Donnerstag gehe ich einkaufen.', exampleEn: 'On Thursday I go shopping.' },
  { id: 'day-05', de: 'der Freitag', speak: 'Freitag', en: 'Friday', emoji: '🎉', note: 'from Freya — sounds like “free”, almost weekend!', example: 'Freitag ist mein Lieblingstag.', exampleEn: 'Friday is my favourite day.' },
  { id: 'day-06', de: 'der Samstag', speak: 'Samstag', en: 'Saturday', emoji: '🧺', note: 'also “Sonnabend” in northern Germany.', example: 'Am Samstag schlafe ich lange.', exampleEn: 'On Saturday I sleep in.' },
  { id: 'day-07', de: 'der Sonntag', speak: 'Sonntag', en: 'Sunday', emoji: '☀️', note: 'Sonne = sun → “Sun-day”.', example: 'Am Sonntag besuche ich meine Familie.', exampleEn: 'On Sunday I visit my family.' },
]

export const months = [
  { id: 'mon-01', de: 'der Januar', speak: 'Januar', en: 'January', emoji: '❄️', example: 'Im Januar ist es kalt.', exampleEn: 'In January it is cold.' },
  { id: 'mon-02', de: 'der Februar', speak: 'Februar', en: 'February', emoji: '⛄', example: 'Der Februar ist kurz.', exampleEn: 'February is short.' },
  { id: 'mon-03', de: 'der März', speak: 'März', en: 'March', emoji: '🌱', example: 'Im März beginnt der Frühling.', exampleEn: 'Spring begins in March.' },
  { id: 'mon-04', de: 'der April', speak: 'April', en: 'April', emoji: '🌧️', example: 'Im April regnet es oft.', exampleEn: 'In April it often rains.' },
  { id: 'mon-05', de: 'der Mai', speak: 'Mai', en: 'May', emoji: '🌷', example: 'Der Mai ist warm.', exampleEn: 'May is warm.' },
  { id: 'mon-06', de: 'der Juni', speak: 'Juni', en: 'June', emoji: '☀️', example: 'Im Juni werden die Tage lang.', exampleEn: 'In June the days get long.' },
  { id: 'mon-07', de: 'der Juli', speak: 'Juli', en: 'July', emoji: '🏖️', example: 'Im Juli mache ich Urlaub.', exampleEn: 'In July I go on holiday.' },
  { id: 'mon-08', de: 'der August', speak: 'August', en: 'August', emoji: '🌻', example: 'Der August ist heiß.', exampleEn: 'August is hot.' },
  { id: 'mon-09', de: 'der September', speak: 'September', en: 'September', emoji: '🍇', example: 'Im September beginnt die Schule.', exampleEn: 'School starts in September.' },
  { id: 'mon-10', de: 'der Oktober', speak: 'Oktober', en: 'October', emoji: '🍺', example: 'Im Oktober ist das Oktoberfest.', exampleEn: 'The Oktoberfest is in October.' },
  { id: 'mon-11', de: 'der November', speak: 'November', en: 'November', emoji: '🍂', example: 'Der November ist grau.', exampleEn: 'November is grey.' },
  { id: 'mon-12', de: 'der Dezember', speak: 'Dezember', en: 'December', emoji: '🎄', example: 'Im Dezember ist Weihnachten.', exampleEn: 'Christmas is in December.' },
]

export const seasons = [
  { id: 'sea-01', de: 'der Frühling', speak: 'Frühling', en: 'spring', emoji: '🌸', sub: 'März · April · Mai', example: 'Im Frühling blühen die Blumen.', exampleEn: 'In spring the flowers bloom.' },
  { id: 'sea-02', de: 'der Sommer', speak: 'Sommer', en: 'summer', emoji: '☀️', sub: 'Juni · Juli · August', example: 'Im Sommer ist es warm.', exampleEn: 'In summer it is warm.' },
  { id: 'sea-03', de: 'der Herbst', speak: 'Herbst', en: 'autumn / fall', emoji: '🍂', sub: 'September · Oktober · November', example: 'Im Herbst fallen die Blätter.', exampleEn: 'In autumn the leaves fall.' },
  { id: 'sea-04', de: 'der Winter', speak: 'Winter', en: 'winter', emoji: '❄️', sub: 'Dezember · Januar · Februar', example: 'Im Winter schneit es.', exampleEn: 'In winter it snows.' },
]
