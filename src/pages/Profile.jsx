import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { decks } from '../data/germanA1.js'
import { loadUserProfile } from '../storage/profile.js'

function fmtDate(ts) {
  // Firestore Timestamp -> Date, or pass through a Date/number.
  const d = ts?.toDate ? ts.toDate() : ts ? new Date(ts) : null
  return d ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '—'
}

export default function Profile() {
  const { user, signInWithGoogle, signOut, isFirebaseConfigured } = useAuth()
  const { stateFor, isDue, reset } = useProgress()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let active = true
    if (user) loadUserProfile(user).then((p) => active && setProfile(p))
    return () => {
      active = false
    }
  }, [user])

  // Stats across all decks.
  const all = decks.flatMap((d) => d.cards)
  const states = all.map((c) => stateFor(c.id))
  const started = states.filter((s) => s.repetitions > 0).length
  const mastered = states.filter((s) => s.interval >= 6).length
  const due = states.filter((s) => isDue(s)).length

  function handleReset() {
    if (confirm('Reset all your study progress? This cannot be undone.')) reset()
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>

      {/* Signed-out / guest states */}
      {!user && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-5xl">👤</p>
          <p className="mt-3 font-medium text-slate-900 dark:text-white">
            {isFirebaseConfigured ? "You're not signed in" : 'Guest mode'}
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {isFirebaseConfigured
              ? 'Sign in with Google to create a profile and sync your progress across devices.'
              : 'Sign-in isn’t set up yet (no Firebase keys). Your progress is saved in this browser for now.'}
          </p>
          {isFirebaseConfigured && (
            <button
              onClick={() => signInWithGoogle().catch((e) => alert(e.message))}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
            >
              Sign in with Google
            </button>
          )}
        </div>
      )}

      {/* Signed-in profile card */}
      {user && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="h-16 w-16 rounded-full" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white">
                {(user.displayName || user.email || '?')[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                {user.displayName || 'Learner'}
              </p>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <Detail label="Signed in with" value="Google" />
            <Detail label="Member since" value={fmtDate(profile?.createdAt)} />
            <Detail label="Last login" value={fmtDate(profile?.lastLoginAt)} />
            <Detail label="Sync" value="Cloud (Firestore)" />
          </dl>

          <button
            onClick={signOut}
            className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total cards" value={all.length} />
        <Stat label="Started" value={started} />
        <Stat label="Mastered" value={mastered} accent="text-emerald-500 dark:text-emerald-400" />
        <Stat label="Due now" value={due} accent="text-sky-500 dark:text-sky-400" />
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
        <p className="text-sm font-medium text-rose-800 dark:text-rose-300">Danger zone</p>
        <p className="mb-3 mt-1 text-xs text-rose-700/80 dark:text-rose-300/70">
          Clear all your study progress (keeps your account).
        </p>
        <button
          onClick={handleReset}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-800 dark:text-slate-100">{value}</dd>
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
