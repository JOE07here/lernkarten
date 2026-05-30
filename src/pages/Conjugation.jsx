import { useMemo, useState } from 'react'
import { verbs, pronouns, regularEndings } from '../data/grammar.js'
import { speak, ttsSupported } from '../speak.js'

const byKey = Object.fromEntries(pronouns.map((p) => [p.key, p]))

function randomRound() {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const pron = pronouns[Math.floor(Math.random() * pronouns.length)]
  return { verb, pron }
}

export default function Conjugation() {
  const [tab, setTab] = useState('practice')
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Konjugation — present tense</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Conjugate German verbs in the present tense (Präsens).
        </p>
      </header>

      <div className="flex gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        {[
          { id: 'practice', label: 'Üben' },
          { id: 'table', label: 'Tabelle' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              tab === t.id ? 'bg-white text-slate-900 shadow dark:bg-slate-600 dark:text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'practice' ? <Trainer /> : <Tables />}
    </div>
  )
}

function Trainer() {
  const [round, setRound] = useState(randomRound)
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('typing') // typing | correct | wrong
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  const answer = round.verb.forms[round.pron.key]

  function check(e) {
    e?.preventDefault()
    if (status === 'correct') return
    const ok = value.trim().toLowerCase() === answer.toLowerCase()
    if (ok) {
      setStatus('correct')
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
      if (ttsSupported) speak(`${round.pron.say} ${answer}`, 'de-DE')
    } else {
      setStatus('wrong')
      setStreak(0)
    }
  }
  function next() {
    setRound(randomRound())
    setValue('')
    setStatus('typing')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Score: <b className="text-slate-900 dark:text-white">{score}</b></span>
        <span>Streak: <b className="text-slate-900 dark:text-white">{streak} 🔥</b></span>
      </div>

      <form onSubmit={check} className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {round.verb.inf} — {round.verb.en}
        </p>
        <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          {round.pron.label} <span className="text-slate-400 dark:text-slate-600">…</span>
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">({round.pron.en})</p>

        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type the verb form"
          className={`mt-4 w-full max-w-xs rounded-lg border bg-white px-3 py-2 text-center text-lg text-slate-900 outline-none dark:bg-slate-800 dark:text-white ${
            status === 'correct'
              ? 'border-emerald-500'
              : status === 'wrong'
                ? 'border-rose-500'
                : 'border-slate-300 focus:border-indigo-500 dark:border-slate-700'
          }`}
        />

        {status === 'correct' && (
          <p className="mt-3 font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ {round.pron.label} <b>{answer}</b>
          </p>
        )}
        {status === 'wrong' && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
            Not quite — the answer is <b>{answer}</b>.
          </p>
        )}

        <div className="mt-4 flex justify-center gap-2">
          {status === 'typing' ? (
            <button type="submit" className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Check</button>
          ) : (
            <button type="button" onClick={next} className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">Next →</button>
          )}
          {status !== 'correct' && (
            <button type="button" onClick={() => setStatus('wrong')} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Show answer
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

function Tables() {
  return (
    <div className="space-y-4">
      {/* Regular endings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Regular endings (e.g. machen)</h2>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">Take the stem (mach-) and add the ending.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {regularEndings.map((r) => (
            <div key={r.p} className="rounded-lg border border-slate-100 px-3 py-2 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">{r.p}</span>
              <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-300">{r.end}</span>
              <span className="block text-xs text-slate-400 dark:text-slate-500">mach{r.end.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full conjugations */}
      {verbs.map((v) => (
        <button
          key={v.inf}
          onClick={() => ttsSupported && speak(`${v.inf}. ich ${v.forms.ich}, du ${v.forms.du}, er ${v.forms.er}`, 'de-DE')}
          className="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
        >
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">{v.inf} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">— {v.en}</span></h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">{v.type}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
            {pronouns.map((p) => (
              <div key={p.key}>
                <span className="text-slate-500 dark:text-slate-400">{p.label} </span>
                <span className="font-medium text-slate-800 dark:text-slate-100">{v.forms[p.key]}</span>
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  )
}
