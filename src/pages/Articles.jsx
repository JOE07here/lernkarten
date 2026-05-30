import { useMemo, useState } from 'react'
import {
  articleNouns,
  genders,
  definite,
  indefinite,
  negative,
  tables,
  genderHints,
  shuffle,
} from '../data/articles.js'
import { speak, ttsSupported } from '../speak.js'

const ARTICLE_BTN = {
  der: 'border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-blue-500/50 dark:text-blue-300 dark:hover:bg-blue-500/10',
  die: 'border-rose-400 text-rose-600 hover:bg-rose-50 dark:border-rose-500/50 dark:text-rose-300 dark:hover:bg-rose-500/10',
  das: 'border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500/50 dark:text-emerald-300 dark:hover:bg-emerald-500/10',
}

export default function Articles() {
  const [tab, setTab] = useState('practice')
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Artikel — der · die · das</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Practise German gender: pick the right article for each noun.
        </p>
      </header>

      <div className="flex gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        {[
          { id: 'practice', label: 'Üben' },
          { id: 'tables', label: 'Tabelle & Tipps' },
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

      {tab === 'practice' ? <Trainer /> : <Reference />}
    </div>
  )
}

function Trainer() {
  const [type, setType] = useState('definite') // definite | indefinite | negative
  const [caseKey, setCaseKey] = useState('nom') // nom | akk
  const [order, setOrder] = useState(() => shuffle(articleNouns))
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)

  const noun = order[i % order.length]

  // The article string to show for a given gender, per selected type + case.
  const forms = type === 'definite' ? definite[caseKey] : type === 'indefinite' ? indefinite[caseKey] : negative[caseKey]
  const correctArticle = forms[noun.gender]

  function choose(g) {
    if (picked) return
    setPicked(g)
    setTotal((t) => t + 1)
    const right = g === noun.gender
    if (right) {
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
      if (ttsSupported) speak(`${definite.nom[noun.gender]} ${noun.de}`, 'de-DE')
    } else {
      setStreak(0)
    }
  }
  function next() {
    setPicked(null)
    setI((n) => {
      const nx = n + 1
      if (nx % order.length === 0) setOrder(shuffle(articleNouns))
      return nx
    })
  }

  return (
    <div className="space-y-4">
      {/* options */}
      <div className="flex flex-wrap gap-2 text-sm">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option value="definite">Definite (der/die/das)</option>
          <option value="indefinite">Indefinite (ein/eine)</option>
          <option value="negative">Negative (kein/keine)</option>
        </select>
        <select value={caseKey} onChange={(e) => setCaseKey(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option value="nom">Nominative</option>
          <option value="akk">Accusative</option>
        </select>
      </div>

      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Score: <b className="text-slate-900 dark:text-white">{score}/{total}</b></span>
        <span>Streak: <b className="text-slate-900 dark:text-white">{streak} 🔥</b></span>
      </div>

      {/* prompt */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Which article?</p>
        <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
          <span className="text-slate-300 dark:text-slate-600">___</span> {noun.de}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">({noun.en})</p>

        {/* choices: always der/die/das (gender is what we test) */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {genders.map((g) => {
            let cls = ARTICLE_BTN[g] + ' bg-white dark:bg-slate-800'
            if (picked) {
              if (g === noun.gender) cls = 'border-emerald-500 bg-emerald-500 text-white'
              else if (g === picked) cls = 'border-rose-500 bg-rose-500 text-white'
              else cls = 'border-slate-200 bg-white text-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600'
            }
            return (
              <button key={g} onClick={() => choose(g)} className={`rounded-xl border-2 py-4 text-xl font-bold transition ${cls}`}>
                {g}
              </button>
            )
          })}
        </div>

        {picked && (
          <div className="mt-4">
            <p className={`font-semibold ${picked === noun.gender ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {picked === noun.gender ? '✓ Richtig!' : '✗ Not quite.'}
            </p>
            {/* Show the actual article in the chosen type+case (e.g. "einen Mann") */}
            <p className="mt-1 text-lg text-slate-800 dark:text-slate-100">
              {correctArticle} {noun.de}
              <span className="ml-2 text-sm text-slate-400 dark:text-slate-500">· plural: die {noun.pl}</span>
            </p>
            <button onClick={next} className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-500">Next →</button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Tip: always learn a noun together with its article and colour.
      </p>
    </div>
  )
}

function Reference() {
  return (
    <div className="space-y-4">
      {/* Gender hints */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
        <h2 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">💡 How to guess the gender</h2>
        <ul className="space-y-2">
          {genderHints.map((h) => (
            <li key={h.g} className="text-sm text-amber-900/90 dark:text-amber-100/80">
              <b className={h.color}>{h.g}</b>: {h.items}
            </li>
          ))}
          <li className="text-xs italic text-amber-700/80 dark:text-amber-200/70">
            These are patterns, not laws — there are exceptions, so still learn each noun with its article.
          </li>
        </ul>
      </div>

      {/* Article tables */}
      {tables.map((t) => (
        <div key={t.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <h2 className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">{t.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {t.head.map((h) => (
                    <th key={h} className="px-4 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-slate-100 dark:border-slate-800">
                    {row.map((cell, idx) => (
                      <td key={idx} className={`px-4 py-2 ${idx === 0 ? 'font-medium text-slate-500 dark:text-slate-400' : 'font-semibold text-slate-800 dark:text-slate-100'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Note: in the accusative, only the <b>masculine</b> changes (der→den, ein→einen).
      </p>
    </div>
  )
}
