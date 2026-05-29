// Text-to-speech using the browser's built-in Web Speech API.
//
// The important bit for correct German: `speechSynthesis.getVoices()` is often
// EMPTY on first call (voices load asynchronously). If we don't wait for them,
// we fall back to the default English voice — which reads German letters wrong
// ("C" -> "see", "J" -> "jay", "Z" -> "zee"). So we cache voices, refresh them
// on the `voiceschanged` event, and always prefer a real German voice.

export const ttsSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window

let cachedVoices = []

function refreshVoices() {
  if (!ttsSupported) return
  const v = window.speechSynthesis.getVoices()
  if (v && v.length) cachedVoices = v
}

if (ttsSupported) {
  refreshVoices()
  // Fired once the engine has loaded its voice list.
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices)
}

// Pick the best available German voice. Prefer higher-quality "enhanced/premium/
// natural" voices, then any local (on-device) German voice, then any de-* voice.
function germanVoice(lang = 'de-DE') {
  if (!cachedVoices.length) refreshVoices()
  const prefix = lang.slice(0, 2).toLowerCase()
  const german = cachedVoices.filter((v) => v.lang?.toLowerCase().startsWith(prefix))
  if (!german.length) return null

  const quality = /(enhanced|premium|natural|neural)/i
  return (
    german.find((v) => quality.test(v.name)) ||
    german.find((v) => v.localService) ||
    german[0]
  )
}

export function hasGermanVoice() {
  if (!cachedVoices.length) refreshVoices()
  return cachedVoices.some((v) => v.lang?.toLowerCase().startsWith('de'))
}

export function speak(text, lang = 'de-DE') {
  if (!ttsSupported) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  const voice = germanVoice(lang)
  if (voice) u.voice = voice
  u.rate = 0.85
  window.speechSynthesis.speak(u)
}
