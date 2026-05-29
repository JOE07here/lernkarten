import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import Drawer from './Drawer.jsx'

export default function Navbar() {
  const { user, signInWithGoogle, signOut, isFirebaseConfigured } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {/* hamburger icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="hidden text-sm sm:inline">Menu</span>
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="text-xl">🇩🇪</span>
              <span>Lernkarten</span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {user ? (
              <button
                onClick={signOut}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                title="Sign out"
              >
                {user.photoURL && <img src={user.photoURL} alt="" className="h-6 w-6 rounded-full" />}
                <span className="hidden sm:inline">Sign out</span>
              </button>
            ) : (
              <button
                onClick={() => signInWithGoogle().catch((e) => alert(e.message))}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
              >
                {isFirebaseConfigured ? 'Sign in' : 'Guest'}
              </button>
            )}
          </div>
        </nav>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
