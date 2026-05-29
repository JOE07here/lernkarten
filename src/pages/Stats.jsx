import { decks } from '../data/germanA1.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Stats() {
  const { stateFor, isDue, loading } = useProgress()
  const allCards = decks.flatMap((d) => d.cards)

  const total = allCards.length
  const states = allCards.map((c) => stateFor(c.id))
  const started = states.filter((s) => s.repetitions > 0).length
  const mastered = states.filter((s) => s.interval >= 6).length
  const due = states.filter((s) => isDue(s)).length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your progress</h1>

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Total" value={total} />
            <Stat label="Started" value={started} />
            <Stat label="Mastered" value={mastered} accent="text-emerald-400" />
            <Stat label="Due now" value={due} accent="text-sky-400" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <ProgressBar value={mastered} max={total} label="Mastery (interval ≥ 6 days)" />
            <div className="mt-4">
              <ProgressBar value={started} max={total} label="Cards started" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ label, value, accent = 'text-slate-900 dark:text-white' }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}
