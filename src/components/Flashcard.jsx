import { speak, ttsSupported } from '../speak.js'

export default function Flashcard({ card, flipped, onFlip, lang }) {
  return (
    <div className="[perspective:1200px]">
      <div
        onClick={onFlip}
        className={`card-flip relative h-72 w-full cursor-pointer ${
          flipped ? 'is-flipped' : ''
        }`}
      >
        {/* Front */}
        <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center shadow-xl">
          <span className="mb-3 rounded-full bg-slate-700 px-3 py-0.5 text-xs uppercase tracking-wide text-slate-300">
            {card.pos}
          </span>
          <p className="text-4xl font-bold text-white">{card.front}</p>
          {ttsSupported && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                speak(card.speak || card.front, lang)
              }}
              className="mt-5 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
            >
              🔊 Hören
            </button>
          )}
          <p className="absolute bottom-4 text-xs text-slate-500">Tap to flip</p>
        </div>

        {/* Back */}
        <div className="card-face card-face--back absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-indigo-700 bg-indigo-950 p-6 text-center shadow-xl">
          <p className="text-3xl font-bold text-white">{card.back}</p>
          {card.example && (
            <p className="mt-4 max-w-xs text-sm italic text-indigo-200">
              “{card.example}”
            </p>
          )}
          {ttsSupported && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                speak(card.example || card.front, lang)
              }}
              className="mt-5 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
            >
              🔊 Beispiel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
