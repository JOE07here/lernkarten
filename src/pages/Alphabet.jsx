import { useState } from 'react'
import { letters } from '../data/alphabet.js'
import { speak, ttsSupported } from '../speak.js'

export default function Alphabet() {
  const [selected, setSelected] = useState(letters[0])

  function pick(item) {
    setSelected(item)
    speak(item.letter, 'de-DE')
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Das Alphabet</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tap a letter to hear it and see an example word.
        </p>
      </header>

      {/* Detail card for the selected letter */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-center dark:border-indigo-700 dark:bg-indigo-950">
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl font-bold text-indigo-900 dark:text-white">
            {selected.letter}
          </span>
          <div className="text-left">
            <p className="text-sm text-indigo-600 dark:text-indigo-300">
              said “{selected.name}”
            </p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-white">
              {selected.letter} wie {selected.word}
            </p>
            <p className="text-xs text-indigo-500 dark:text-indigo-300/80">
              ({selected.word} = {selected.wordEn})
            </p>
          </div>
        </div>
        {ttsSupported && (
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => speak(selected.letter, 'de-DE')}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
            >
              🔊 Buchstabe
            </button>
            <button
              onClick={() => speak(selected.word, 'de-DE')}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
            >
              🔊 Wort
            </button>
          </div>
        )}
      </div>

      {/* Letter grid */}
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
        {letters.map((item) => (
          <button
            key={item.letter}
            onClick={() => pick(item)}
            className={`flex aspect-square items-center justify-center rounded-xl border text-xl font-bold transition ${
              selected.letter === item.letter
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {item.letter}
          </button>
        ))}
      </div>
    </div>
  )
}
