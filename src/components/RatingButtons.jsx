import { RATINGS, review } from '../srs/sm2.js'

// Shows the four grade buttons plus a hint of when the card will next appear.
export default function RatingButtons({ state, onRate }) {
  function nextLabel(quality) {
    const next = review(state, quality)
    if (next.interval === 0) return '<10m'
    if (next.interval === 1) return '1d'
    return `${next.interval}d`
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {RATINGS.map((r) => (
        <button
          key={r.grade}
          onClick={() => onRate(r.quality)}
          className={`flex flex-col items-center rounded-xl py-3 font-medium text-white transition ${r.color}`}
        >
          <span>{r.label}</span>
          <span className="mt-0.5 text-[11px] opacity-80">{nextLabel(r.quality)}</span>
        </button>
      ))}
    </div>
  )
}
