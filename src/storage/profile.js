// User profile persistence in Firestore.
//
// We store the user's details in the same users/{uid} document that holds their
// progress, under a nested `profile` map:
//   users/{uid} = { profile: {...}, progress: {...}, updatedAt }
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'

// Called on sign-in: create the profile the first time, then keep it fresh.
export async function saveUserProfile(user) {
  if (!user || !db) return
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)

  const profile = {
    uid: user.uid,
    displayName: user.displayName || null,
    email: user.email || null,
    photoURL: user.photoURL || null,
    provider: user.providerData?.[0]?.providerId || 'google.com',
    lastLoginAt: serverTimestamp(),
  }
  // Set createdAt only once (first sign-in).
  if (!snap.exists() || !snap.data()?.profile?.createdAt) {
    profile.createdAt = serverTimestamp()
  }

  await setDoc(ref, { profile }, { merge: true })
}

// Read the stored profile (e.g. to show "member since").
export async function loadUserProfile(user) {
  if (!user || !db) return null
  const snap = await getDoc(doc(db, 'users', user.uid))
  return snap.exists() ? snap.data().profile || null : null
}
