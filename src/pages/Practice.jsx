import { useEffect, useMemo, useState } from 'react'
import { decks } from '../data/germanA1.js'
import { speak, ttsSupported } from '../speak.js'

/* ---- answer checking helpers ---- */
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[.!?,;:"'’()]/g, ' ')
    .replace(/\b(the|to|a|an)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Acceptable English answers from a card's `back` (drop "(...)", split on / and ,).
const acceptableAnswers = (back) =>
  back
    .replace(/\([^)]*\)/g, ' ')
    .split(/[/,]| or /i)
    .map(norm)
    .filter(Boolean)

// The cloze keyword = last word of the front (the noun for "das Haus", etc.).
const keywordOf = (front) => front.trim().split(/\s+/).pop()

// Build a cloze {prompt, answer, hint} if the keyword appears in the example.
function clozeFor(card) {
  if (!card.example) return null
  const kw = keywordOf(card.front)
  const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
  if (!re.test(card.example)) return null
  return { prompt: card.example.replace(re, '_____'), answer: kw, hint: card.exampleEn, speak: card.example }
}

export default function Practice() {
  const [deckId, setDeckId] = useState(decks[0].id)
  const [mode, setMode] = useState('type') // type | cloze
  const deck = decks.find((d) => d.id === deckId)

  const pool = useMemo(() => {
    if (mode === 'cloze') return deck.cards.map(clozeFor).filter(Boolean).map((c, i) => ({ ...c, _i: i }))
    return deck.cards
  }, [deck, mode])

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Übungen — practice</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Active recall beats flipping: type the answer or fill the gap.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={deckId}
          onChange={(e) => setDeckId(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {decks.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <div className="flex gap-1 rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
          {[
            { id: 'type', label: 'Type answer' },
            { id: 'cloze', label: 'Fill the gap' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                mode === m.id ? 'bg-white text-slate-900 shadow dark:bg-slate-600 dark:text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <Exercise key={`${deckId}-${mode}`} pool={pool} mode={mode} lang={deck.language} />
    </div>
  )
}

function Exercise({ pool, mode, lang }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * Math.max(pool.length, 1)))
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('typing')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setIdx(Math.floor(Math.random() * Math.max(pool.length, 1)))
    setValue('')
    setStatus('typing')
  }, [pool])

  if (!pool.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        No fill-in-the-blank items in this deck — pick another deck or try “Type answer”.
      </div>
    )
  }

  const item = pool[idx]
  const correctAnswer = mode === 'cloze' ? item.answer : item.back

  function check(e) {
    e?.preventDefault()
    if (status === 'correct') return
    const ok =
      mode === 'cloze'
        ? value.trim().toLowerCase() === item.answer.toLowerCase()
        : acceptableAnswers(item.back).includes(norm(value))
    setTotal((t) => t + 1)
    if (ok) {
      setStatus('correct')
      setScore((s) => s + 1)
      if (ttsSupported) speak(mode === 'cloze' ? item.speak : item.front, lang)
    } else {
      setStatus('wrong')
    }
  }
  function next() {
    setIdx(Math.floor(Math.random() * pool.length))
    setValue('')
    setStatus('typing')
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-500 dark:text-slate-400">Score: <b className="text-slate-900 dark:text-white">{score}/{total}</b></div>

      <form onSubmit={check} className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        {mode === 'cloze' ? (
          <>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{item.prompt}</p>
            {item.hint && <p className="mt-2 text-sm italic text-slate-500 dark:text-slate-400">{item.hint}</p>}
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Translate to English</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{item.front}</p>
          </>
        )}

        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === 'cloze' ? 'the missing word' : 'your answer'}
          className={`mt-4 w-full max-w-sm rounded-lg border bg-white px-3 py-2 text-center text-lg text-slate-900 outline-none dark:bg-slate-800 dark:text-white ${
            status === 'correct' ? 'border-emerald-500' : status === 'wrong' ? 'border-rose-500' : 'border-slate-300 focus:border-indigo-500 dark:border-slate-700'
          }`}
        />

        {status === 'correct' && <p className="mt-3 font-semibold text-emerald-600 dark:text-emerald-400">✓ Correct!</p>}
        {status === 'wrong' && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
            Answer: <b>{correctAnswer}</b>
          </p>
        )}

        <div className="mt-4 flex justify-center gap-2">
          {status === 'typing' ? (
            <button type="submit" className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Check</button>
          ) : (
            <button type="button" onClick={next} className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Next →</button>
          )}
          {status === 'typing' && (
            <button type="button" onClick={() => setStatus('wrong')} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Show answer
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
