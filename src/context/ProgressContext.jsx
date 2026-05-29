import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'
import { loadProgress, saveProgress } from '../storage/progress.js'
import { freshState, review, isDue } from '../srs/sm2.js'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  // (Re)load whenever the signed-in user changes.
  useEffect(() => {
    if (authLoading) return
    let active = true
    setLoading(true)
    loadProgress(user).then((p) => {
      if (active) {
        setProgress(p || {})
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [user, authLoading])

  const stateFor = useCallback((cardId) => progress[cardId] || freshState(), [progress])

  const rate = useCallback(
    (cardId, quality) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          [cardId]: review(prev[cardId] || freshState(), quality),
        }
        // Fire-and-forget persistence; UI updates immediately.
        saveProgress(user, next).catch((e) => console.error('save failed', e))
        return next
      })
    },
    [user],
  )

  const value = { progress, loading, stateFor, rate, isDue }
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  return useContext(ProgressContext)
}
