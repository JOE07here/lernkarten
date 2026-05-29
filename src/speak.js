// Text-to-speech using the browser's built-in Web Speech API.
// Picks a German voice when one is available.
export function speak(text, lang = 'de-DE') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang?.toLowerCase().startsWith(lang.slice(0, 2)))
  if (voice) u.voice = voice
  u.rate = 0.9
  window.speechSynthesis.speak(u)
}

export const ttsSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window
