import { useEffect, useMemo, useState } from 'react'
import {
  germanNumber,
  numberParts,
  referenceGroups,
  buildPool,
  quizPool,
  PART_BANK,
  shuffle,
  randomFrom,
} from '../data/numbers.js'
import { speak, ttsSupported } from '../speak.js'

const TABS = [
  { id: 'learn', label: 'Lernen', hint: 'Browse' },
  { id: 'build', label: 'Bauen', hint: 'Build' },
  { id: 'quiz', label: 'Hören', hint: 'Listen' },
]

export default function Numbers() {
  const [tab, setTab] = useState('learn')

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Zahlen 0–1000</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          See how German numbers are built from parts, then practise.
        </p>
      </header>

      <div className="flex gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              tab === t.id
                ? 'bg-white text-slate-900 shadow dark:bg-slate-600 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'learn' && <Learn />}
      {tab === 'build' && <Build />}
      {tab === 'quiz' && <Quiz />}
    </div>
  )
}

/* ---------------- Lernen: browse + explore ---------------- */
function Learn() {
  const [n, setN] = useState(16)
  const value = Math.max(0, Math.min(1000, Number(n) || 0))
  const parts = numberParts(value)

  return (
    <div className="space-y-5">
      {/* Explorer */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Try any number (0–1000)
        </label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="1000"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            onClick={() => setN(Math.floor(Math.random() * 1001))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            🎲 Random
          </button>
          {ttsSupported && (
            <button
              onClick={() => speak(germanNumber(value), 'de-DE')}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
            >
              🔊 Hören
            </button>
          )}
        </div>
        <p className="mt-4 break-words text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          {germanNumber(value)}
        </p>
        <p className="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">
          {parts.join(' + ')}
        </p>
      </div>

      {/* Reference groups */}
      {referenceGroups.map((g) => (
        <div
          key={g.title}
          className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{g.title}</h2>
          <div className="grid gap-2">
            {g.numbers.map((num) => (
              <button
                key={num}
                onClick={() => speak(germanNumber(num), 'de-DE')}
                className="flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-2 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
              >
                <span className="w-12 shrink-0 text-lg font-bold text-slate-900 dark:text-white">
                  {num}
                </span>
                <span className="flex-1">
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    {germanNumber(num)}
                  </span>
                  <span className="block font-mono text-xs text-slate-400 dark:text-slate-500">
                    {numberParts(num).join(' + ')}
                  </span>
                </span>
                {ttsSupported && <span className="text-slate-400">🔊</span>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Bauen: build a number from parts ---------------- */
function makeTiles(target) {
  const correct = numberParts(target)
  const distractors = shuffle(PART_BANK.filter((p) => !correct.includes(p))).slice(0, 4)
  const tiles = shuffle([...correct, ...distractors]).map((text, i) => ({
    id: `${i}-${text}`,
    text,
    used: false,
  }))
  return tiles
}

function Build() {
  const [target, setTarget] = useState(() => randomFrom(buildPool))
  const [tiles, setTiles] = useState(() => makeTiles(target))
  const [assembled, setAssembled] = useState([])
  const [status, setStatus] = useState('playing') // playing | correct | wrong
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  function newRound() {
    const next = randomFrom(buildPool)
    setTarget(next)
    setTiles(makeTiles(next))
    setAssembled([])
    setStatus('playing')
  }

  function tap(tile) {
    if (tile.used || status === 'correct') return
    setTiles((ts) => ts.map((t) => (t.id === tile.id ? { ...t, used: true } : t)))
    setAssembled((a) => [...a, tile])
    setStatus('playing')
  }

  function undo() {
    if (status === 'correct') return
    const last = assembled[assembled.length - 1]
    if (!last) return
    setAssembled((a) => a.slice(0, -1))
    setTiles((ts) => ts.map((t) => (t.id === last.id ? { ...t, used: false } : t)))
    setStatus('playing')
  }

  function check() {
    const guess = assembled.map((t) => t.text).join('')
    if (guess === germanNumber(target)) {
      setStatus('correct')
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
      if (ttsSupported) speak(germanNumber(target), 'de-DE')
    } else {
      setStatus('wrong')
      setStreak(0)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Score: <b className="text-slate-900 dark:text-white">{score}</b></span>
        <span>Streak: <b className="text-slate-900 dark:text-white">{streak} 🔥</b></span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Build this number</p>
        <p className="my-2 text-5xl font-bold text-slate-900 dark:text-white">{target}</p>
        {ttsSupported && (
          <button
            onClick={() => speak(germanNumber(target), 'de-DE')}
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-500"
          >
            🔊 Hören
          </button>
        )}

        {/* Assembled answer */}
        <div className="mt-4 min-h-12 rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700">
          {assembled.length === 0 ? (
            <span className="text-sm text-slate-400 dark:text-slate-500">Tap the parts below…</span>
          ) : (
            <span className="break-words text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              {assembled.map((t) => t.text).join('')}
            </span>
          )}
        </div>

        {status === 'correct' && (
          <p className="mt-3 font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Richtig! {target} = {germanNumber(target)}
          </p>
        )}
        {status === 'wrong' && (
          <p className="mt-3 font-semibold text-rose-600 dark:text-rose-400">
            ✗ Not quite — try again or undo.
          </p>
        )}
      </div>

      {/* Tiles */}
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => tap(tile)}
            disabled={tile.used}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {tile.text}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={undo}
          className="rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          ↶ Undo
        </button>
        {status === 'correct' ? (
          <button onClick={newRound} className="rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-500">
            Next →
          </button>
        ) : (
          <button onClick={check} className="rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-500">
            Check
          </button>
        )}
        <button
          onClick={newRound}
          className="rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Skip ⟳
        </button>
      </div>
    </div>
  )
}

/* ---------------- Hören: listening quiz ---------------- */
function makeOptions(target) {
  const opts = new Set([target])
  while (opts.size < 4) opts.add(randomFrom(quizPool))
  return shuffle([...opts])
}

function Quiz() {
  const [target, setTarget] = useState(() => randomFrom(quizPool))
  const [options, setOptions] = useState(() => makeOptions(target))
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  // Speak the number whenever a new round starts.
  useEffect(() => {
    if (ttsSupported) speak(germanNumber(target), 'de-DE')
  }, [target])

  function newRound() {
    const next = randomFrom(quizPool)
    setTarget(next)
    setOptions(makeOptions(next))
    setPicked(null)
  }

  function choose(opt) {
    if (picked !== null) return
    setPicked(opt)
    setTotal((t) => t + 1)
    if (opt === target) setScore((s) => s + 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Score: <b className="text-slate-900 dark:text-white">{score}/{total}</b></span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Which number did you hear?</p>
        <button
          onClick={() => speak(germanNumber(target), 'de-DE')}
          className="mt-4 rounded-full bg-indigo-600 px-6 py-3 text-lg text-white hover:bg-indigo-500"
        >
          🔊 Play again
        </button>
        {picked !== null && (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            It was <b>{target}</b> = {germanNumber(target)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isAnswer = opt === target
          const isPicked = opt === picked
          let cls =
            'border-slate-300 bg-white text-slate-900 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
          if (picked !== null) {
            if (isAnswer) cls = 'border-emerald-500 bg-emerald-500 text-white'
            else if (isPicked) cls = 'border-rose-500 bg-rose-500 text-white'
            else cls = 'border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600'
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className={`rounded-xl border py-6 text-2xl font-bold transition ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <button
          onClick={newRound}
          className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500"
        >
          Next →
        </button>
      )}
    </div>
  )
}
