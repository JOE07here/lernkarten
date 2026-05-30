import { NavLink } from 'react-router-dom'

const groups = [
  {
    heading: 'Lernen',
    links: [
      { to: '/', label: 'Decks', icon: '📚', end: true },
      { to: '/alphabet', label: 'Alphabet', icon: '🔤' },
      { to: '/numbers', label: 'Zahlen (Numbers)', icon: '🔢' },
    ],
  },
  {
    heading: 'Kalender',
    links: [
      { to: '/days', label: 'Wochentage (Days)', icon: '📅' },
      { to: '/months', label: 'Monate (Months)', icon: '🗓️' },
      { to: '/seasons', label: 'Jahreszeiten (Seasons)', icon: '🍂' },
    ],
  },
  {
    heading: 'Mehr',
    links: [
      { to: '/tips', label: 'Lerntipps (Study tips)', icon: '🧠' },
      { to: '/stats', label: 'Fortschritt (Progress)', icon: '📊' },
      { to: '/profile', label: 'Profil (Profile)', icon: '👤' },
    ],
  },
]

// Slide-in navigation drawer, opened by the header hamburger.
export default function Drawer({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      />

      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 max-w-[82%] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <span className="flex items-center gap-2 font-bold">
            <span className="text-xl">🇩🇪</span> Lernkarten
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {groups.map((g) => (
            <div key={g.heading} className="mb-4">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {g.heading}
              </p>
              {g.links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <span className="text-lg">{l.icon}</span>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
