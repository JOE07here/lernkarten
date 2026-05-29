// German alphabet (das Alphabet).
//   letter  — the letter
//   name    — an English approximation of how the letter NAME sounds
//   say     — text the 🔊 button speaks (defaults to the letter itself; set
//             explicitly where reading the bare character is unreliable)
//   word    — an example word (Anlaut) + its English meaning
export const letters = [
  { letter: 'A', name: 'ah', word: 'Apfel', wordEn: 'apple' },
  { letter: 'B', name: 'beh', word: 'Ball', wordEn: 'ball' },
  { letter: 'C', name: 'tseh', word: 'Computer', wordEn: 'computer' },
  { letter: 'D', name: 'deh', word: 'Dose', wordEn: 'can / tin' },
  { letter: 'E', name: 'eh', word: 'Elefant', wordEn: 'elephant' },
  { letter: 'F', name: 'eff', word: 'Fisch', wordEn: 'fish' },
  { letter: 'G', name: 'geh', word: 'Gabel', wordEn: 'fork' },
  { letter: 'H', name: 'hah', word: 'Haus', wordEn: 'house' },
  { letter: 'I', name: 'ee', word: 'Igel', wordEn: 'hedgehog' },
  { letter: 'J', name: 'yot', say: 'Jott', word: 'Jacke', wordEn: 'jacket' },
  { letter: 'K', name: 'kah', word: 'Katze', wordEn: 'cat' },
  { letter: 'L', name: 'ell', word: 'Lampe', wordEn: 'lamp' },
  { letter: 'M', name: 'emm', word: 'Maus', wordEn: 'mouse' },
  { letter: 'N', name: 'enn', word: 'Nase', wordEn: 'nose' },
  { letter: 'O', name: 'oh', word: 'Obst', wordEn: 'fruit' },
  { letter: 'P', name: 'peh', word: 'Pferd', wordEn: 'horse' },
  { letter: 'Q', name: 'koo', say: 'Qu', word: 'Quelle', wordEn: 'spring / source' },
  { letter: 'R', name: 'err', word: 'Rose', wordEn: 'rose' },
  { letter: 'S', name: 'ess', word: 'Sonne', wordEn: 'sun' },
  { letter: 'T', name: 'teh', word: 'Tisch', wordEn: 'table' },
  { letter: 'U', name: 'oo', word: 'Uhr', wordEn: 'clock' },
  { letter: 'V', name: 'fow', say: 'Vau', word: 'Vogel', wordEn: 'bird' },
  { letter: 'W', name: 'veh', word: 'Wasser', wordEn: 'water' },
  { letter: 'X', name: 'iks', say: 'Ix', word: 'Xylophon', wordEn: 'xylophone' },
  { letter: 'Y', name: 'üpsilon', say: 'Ypsilon', word: 'Yoga', wordEn: 'yoga' },
  { letter: 'Z', name: 'tsett', say: 'Zett', word: 'Zebra', wordEn: 'zebra' },
  { letter: 'Ä', name: 'eh (a-Umlaut)', say: 'Ä', word: 'Äpfel', wordEn: 'apples' },
  { letter: 'Ö', name: 'ö — like British “ur”', say: 'Ö', word: 'Öl', wordEn: 'oil' },
  { letter: 'Ü', name: 'ü — “ee” with round lips', say: 'Ü', word: 'Übung', wordEn: 'exercise' },
  { letter: 'ß', name: 'ess-tsett', say: 'Eszett', word: 'Straße', wordEn: 'street' },
]
