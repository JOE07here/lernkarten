import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const { user, signInWithGoogle, signOut, isFirebaseConfigured } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Decks' },
    { to: '/alphabet', label: 'Alphabet' },
    { to: '/numbers', label: 'Numbers' },
    { to: '/stats', label: 'Progress' },
  ]

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-xl">🇩🇪</span>
          <span>Lernkarten</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Section links live in the header on tablet/desktop; phones use the bottom bar */}
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  pathname === l.to
                    ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="ml-1 rounded-md p-2 text-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <button
              onClick={signOut}
              className="ml-1 flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
              className="ml-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
            >
              {isFirebaseConfigured ? 'Sign in' : 'Guest'}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
