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
      <div className="text-center text-slate-400">
        Deck not found. <Link to="/" className="text-indigo-400">Back to decks</Link>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center text-slate-400">Loading your progress…</div>
  }

  if (queue.length === 0) {
    return (
      <Done deckName={deck.name} message="Nothing due right now. 🎉" />
    )
  }

  if (index >= queue.length) {
    return <Done deckName={deck.name} message="Session complete! 🎉" reviewed={queue.length} />
  }

  const cardId = queue[index]
  const card = deck.cards.find((c) => c.id === cardId)

  function handleRate(quality) {
    rate(cardId, quality)
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-5">
      <ProgressBar value={index} max={queue.length} label="This session" />

      <Flashcard
        card={card}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
        lang={deck.language}
      />

      {flipped ? (
        <RatingButtons state={stateFor(cardId)} onRate={handleRate} />
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="w-full rounded-xl bg-slate-700 py-3 font-medium text-white hover:bg-slate-600"
        >
          Show answer
        </button>
      )}
    </div>
  )
}

function Done({ deckName, message, reviewed }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
      <p className="text-2xl font-bold text-white">{message}</p>
      <p className="mt-2 text-sm text-slate-400">
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
