import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase.js'
import { mergeLocalIntoCloud } from '../storage/progress.js'
import { saveUserProfile } from '../storage/profile.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        // Save/refresh the user's profile, then merge any guest progress.
        await saveUserProfile(u)
        await mergeLocalIntoCloud(u)
      }
      setLoading(false)
    })
  }, [])

  async function signInWithGoogle() {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. See README to add your keys.')
    }
    await signInWithPopup(auth, googleProvider)
  }

  async function signOut() {
    if (isFirebaseConfigured) await fbSignOut(auth)
  }

  const value = { user, loading, signInWithGoogle, signOut, isFirebaseConfigured }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
