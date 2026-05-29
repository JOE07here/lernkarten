import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, signInWithGoogle, signOut, isFirebaseConfigured } = useAuth()
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Decks' },
    { to: '/stats', label: 'Progress' },
  ]

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-xl">🇩🇪</span>
          <span>Lernkarten</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                pathname === l.to
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={signOut}
              className="ml-2 flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-slate-800"
              title="Sign out"
            >
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="h-6 w-6 rounded-full" />
              )}
              <span className="hidden sm:inline">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => signInWithGoogle().catch((e) => alert(e.message))}
              className="ml-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
            >
              {isFirebaseConfigured ? 'Sign in' : 'Guest'}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
