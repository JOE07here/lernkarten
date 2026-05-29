import { Link } from 'react-router-dom'
import { decks } from '../data/germanA1.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Home() {
  const { stateFor, isDue, loading } = useProgress()
  const { user, isFirebaseConfigured } = useAuth()

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-white">Decks</h1>
        <p className="mt-1 text-sm text-slate-400">
          {user
            ? `Signed in — your progress syncs to the cloud.`
            : isFirebaseConfigured
              ? `You're a guest. Progress is saved in this browser; sign in to sync.`
              : `Guest mode (Firebase not configured). Progress is saved in this browser.`}
        </p>
      </section>

      {decks.map((deck) => {
        const total = deck.cards.length
        const studied = deck.cards.filter((c) => stateFor(c.id).repetitions > 0).length
        const due = deck.cards.filter((c) => isDue(stateFor(c.id))).length

        return (
          <div
            key={deck.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{deck.name}</h2>
                <p className="text-sm text-slate-400">{total} cards</p>
              </div>
              <Link
                to={`/study/${deck.id}`}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                {due > 0 ? `Study ${due} due` : 'Review'}
              </Link>
            </div>

            <div className="mt-4">
              <ProgressBar
                value={studied}
                max={total}
                label={loading ? 'Loading…' : 'Cards started'}
              />
            </div>

            <div className="mt-3 flex gap-4 text-xs text-slate-400">
              <span>🟢 {studied} started</span>
              <span>🔵 {due} due now</span>
              <span>⚪ {total - studied} new</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
