import { useEffect, useState } from 'react'
import { letters } from '../data/alphabet.js'
import { speak, ttsSupported, hasGermanVoice } from '../speak.js'

// Speak the explicit `say` form when set, otherwise the bare letter.
const sayLetter = (item) => speak(item.say || item.letter, 'de-DE')

export default function Alphabet() {
  const [selected, setSelected] = useState(letters[0])
  const [noGermanVoice, setNoGermanVoice] = useState(false)

  // Voices load asynchronously; re-check when the list changes so we don't
  // flash a false "no German voice" warning before voices are ready.
  useEffect(() => {
    if (!ttsSupported) return
    const check = () => setNoGermanVoice(!hasGermanVoice())
    check()
    window.speechSynthesis.addEventListener?.('voiceschanged', check)
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', check)
  }, [])

  function pick(item) {
    setSelected(item)
    sayLetter(item)
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Das Alphabet</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tap a letter to hear it and see an example word.
        </p>
        {noGermanVoice && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
            ⚠️ No German voice found on this device, so letters may sound off. Install
            a German voice (e.g. iOS: Settings → Accessibility → Spoken Content →
            Voices → German) for correct, higher-quality audio.
          </p>
        )}
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
              onClick={() => sayLetter(selected)}
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
