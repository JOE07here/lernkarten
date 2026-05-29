import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import BottomNav from './components/BottomNav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Study from './pages/Study.jsx'
import Stats from './pages/Stats.jsx'
import Alphabet from './pages/Alphabet.jsx'
import Numbers from './pages/Numbers.jsx'
import Days from './pages/Days.jsx'
import Months from './pages/Months.jsx'
import Seasons from './pages/Seasons.jsx'
import Tips from './pages/Tips.jsx'

export default function App() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      {/* pb on mobile leaves room for the fixed bottom tab bar */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24 sm:pb-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study/:deckId" element={<Study />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/days" element={<Days />} />
          <Route path="/months" element={<Months />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        <Footer />
      </main>
      <BottomNav />
    </div>
  )
}
