import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { decks } from '../data/germanA1.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Flashcard from '../components/Flashcard.jsx'
import RatingButtons from '../components/RatingButtons.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Study() {
  const { deckId } = useParams()
  const deck = decks.find((d) => d.id === deckId)
  const { stateFor, rate, isDue, loading } = useProgress()

  // Build the study queue once (when progress finishes loading): all due cards.
  // New cards count as due. Snapshotted so re-grading doesn't reshuffle mid-session.
  const queue = useMemo(() => {
    if (!deck || loading) return []
    return deck.cards.filter((c) => isDue(stateFor(c.id))).map((c) => c.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, loading])

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!deck) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        Deck not found.{' '}
        <Link to="/" className="text-indigo-500 dark:text-indigo-400">Back to decks</Link>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center text-slate-500 dark:text-slate-400">Loading your progress…</div>
  }

  if (queue.length === 0) {
    return <Done deckName={deck.name} message="Nothing due right now. 🎉" />
  }

  if (index >= queue.length) {
    return <Done deckName={deck.name} message="Session complete! 🎉" reviewed={queue.length} />
  }

  const cardId = queue[index]
  const card = deck.cards.find((c) => c.id === cardId)

  // Move through the queue without grading (manual browsing).
  function go(delta) {
    setFlipped(false)
    setIndex((i) => Math.min(queue.length, Math.max(0, i + delta)))
  }

  // Grade the card (updates SRS schedule) and advance.
  function handleRate(quality) {
    rate(cardId, quality)
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  const navBtn =
    'rounded-xl border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'

  return (
    <div className="space-y-5">
      <ProgressBar value={index} max={queue.length} label="This session" />
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Card {index + 1} of {queue.length}
      </p>

      <Flashcard
        card={card}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
        lang={deck.language}
      />

      {/* Previous · Show answer/Hide · Next */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-2">
        <button onClick={() => go(-1)} disabled={index === 0} className={navBtn}>
          ← Previous
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="rounded-xl bg-slate-200 py-3 font-medium text-slate-900 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          {flipped ? 'Hide answer' : 'Show answer'}
        </button>
        <button onClick={() => go(1)} className={navBtn}>
          Next →
        </button>
      </div>

      {flipped && (
        <div className="space-y-1">
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            How well did you know it?
          </p>
          <RatingButtons state={stateFor(cardId)} onRate={handleRate} />
        </div>
      )}
    </div>
  )
}

function Done({ deckName, message, reviewed }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{message}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {reviewed ? `You reviewed ${reviewed} cards in ${deckName}.` : deckName}
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
      >
        Back to decks
      </Link>
    </div>
  )
}
