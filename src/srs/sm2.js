// SM-2 spaced-repetition algorithm (the one Anki is based on).
//
// Each card keeps three numbers:
//   repetitions — how many times in a row it was answered well
//   interval    — days until it's next due
//   ease        — multiplier (>= 1.3) that grows/shrinks with performance
//
// The user grades a card 0..3 which we map to SM-2's 0..5 quality scale:
//   0 Again, 1 Hard, 2 Good, 3 Easy

export const RATINGS = [
  { grade: 0, label: 'Again', quality: 0, color: 'bg-rose-600 hover:bg-rose-500' },
  { grade: 1, label: 'Hard', quality: 3, color: 'bg-amber-600 hover:bg-amber-500' },
  { grade: 2, label: 'Good', quality: 4, color: 'bg-emerald-600 hover:bg-emerald-500' },
  { grade: 3, label: 'Easy', quality: 5, color: 'bg-sky-600 hover:bg-sky-500' },
]

const DAY_MS = 24 * 60 * 60 * 1000

export function freshState() {
  return { repetitions: 0, interval: 0, ease: 2.5, dueDate: Date.now(), lastReview: null }
}

// Returns a new state object; does not mutate the input.
export function review(state, quality, now = Date.now()) {
  let { repetitions, interval, ease } = state

  if (quality < 3) {
    // Failed recall — reset the streak and show again soon (in ~10 minutes).
    repetitions = 0
    interval = 0
    return {
      repetitions,
      interval,
      ease, // ease is left unchanged on a lapse in classic SM-2
      dueDate: now + 10 * 60 * 1000,
      lastReview: now,
    }
  }

  repetitions += 1
  if (repetitions === 1) interval = 1
  else if (repetitions === 2) interval = 6
  else interval = Math.round(interval * ease)

  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (ease < 1.3) ease = 1.3

  return {
    repetitions,
    interval,
    ease,
    dueDate: now + interval * DAY_MS,
    lastReview: now,
  }
}

export function isDue(state, now = Date.now()) {
  return !state || state.dueDate <= now
}
