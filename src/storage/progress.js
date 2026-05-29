// Progress persistence with two backends:
//   - guest (no login): browser localStorage
//   - logged in: Firestore document at users/{uid}
//
// Shape stored in both cases is a map of cardId -> SM-2 state.
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

const LOCAL_KEY = 'lernkarten:progress'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}
  } catch {
    return {}
  }
}

function writeLocal(progress) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(progress))
}

// Load the full progress map for the current user (or guest).
export async function loadProgress(user) {
  if (user && db) {
    const snap = await getDoc(doc(db, 'users', user.uid))
    return snap.exists() ? snap.data().progress || {} : {}
  }
  return readLocal()
}

// Persist the full progress map.
export async function saveProgress(user, progress) {
  if (user && db) {
    await setDoc(
      doc(db, 'users', user.uid),
      { progress, updatedAt: Date.now() },
      { merge: true },
    )
    return
  }
  writeLocal(progress)
}

// On login, merge any guest progress into the cloud, keeping whichever
// review is more recent per card, then clear local.
export async function mergeLocalIntoCloud(user) {
  if (!user || !db) return
  const local = readLocal()
  if (Object.keys(local).length === 0) return

  const cloud = await loadProgress(user)
  const merged = { ...cloud }
  for (const [id, state] of Object.entries(local)) {
    const existing = merged[id]
    if (!existing || (state.lastReview || 0) > (existing.lastReview || 0)) {
      merged[id] = state
    }
  }
  await saveProgress(user, merged)
  localStorage.removeItem(LOCAL_KEY)
}
