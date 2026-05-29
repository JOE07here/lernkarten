import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Decks', icon: '📚', end: true },
  { to: '/alphabet', label: 'ABC', icon: '🔤' },
  { to: '/numbers', label: 'Zahlen', icon: '🔢' },
  { to: '/stats', label: 'Progress', icon: '📊' },
]

// Fixed bottom tab bar — phones only (hidden on sm+ where the header nav shows).
export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden dark:border-slate-800 dark:bg-slate-900/95 [padding-bottom:env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-3xl grid-cols-4">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`
            }
          >
            <span className="text-xl">{it.icon}</span>
            {it.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
