# Lernkarten — German A1 flashcards 🇩🇪

An Anki-style spaced-repetition flashcard web app for learning German A1
vocabulary. Works on desktop and mobile (installable PWA), pronounces words with
your browser's text-to-speech, and saves your progress — locally as a guest, or
synced to the cloud when you sign in with Google.

## Features

- **Spaced repetition (SM-2)** — the algorithm Anki is built on. Cards you find
  hard come back sooner; easy ones drift further out.
- **Flip cards** with German → English, an example sentence, and a 🔊 pronounce
  button (Web Speech API).
- **Google sign-in** (Firebase Auth) with progress synced to Firestore, so you
  pick up where you left off on any device.
- **Guest mode** — study immediately with no account; progress is saved in the
  browser and merged into your account when you later sign in.
- **Progress bar + stats** page (started / mastered / due).
- **Responsive + PWA** — add it to your phone's home screen.

## Tech stack

Vite · React · React Router · Tailwind CSS v4 · Firebase (Auth + Firestore) ·
vite-plugin-pwa.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL. It works out of the box in **guest mode** (no Firebase
needed). To enable Google login + cloud sync, set up Firebase below.

## Firebase setup (for login + cloud sync)

1. Create a project at <https://console.firebase.google.com>.
2. **Authentication → Sign-in method →** enable **Google**.
3. **Firestore Database →** create a database (production mode is fine).
4. **Firestore → Rules →** paste the contents of [`firestore.rules`](./firestore.rules) and publish.
5. **Project settings → Your apps →** add a **Web app**, copy the SDK config.
6. `cp .env.example .env` and paste the values into `.env`.
7. Restart `npm run dev`. The "Sign in" button now uses Google.

> When you deploy, add your live domain (e.g. `yourname.github.io`) under
> **Authentication → Settings → Authorized domains**, or Google login popups
> will be blocked.

## Deploy to GitHub Pages

1. Push this repo to GitHub. If the repo name is **not** `lernkarten`, update the
   `VITE_BASE` value (to `/<your-repo>/`) in both
   [`vite.config.js`](./vite.config.js) and
   [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
2. Add your Firebase keys as repo secrets: **Settings → Secrets and variables →
   Actions**, one secret per `VITE_FIREBASE_*` variable.
3. **Settings → Pages → Source: GitHub Actions.**
4. Push to `main` — the workflow builds and publishes automatically.

> **Private repos:** GitHub Pages from a *private* repo needs a paid plan
> (Pro/Team/Enterprise). On a free account, either make the repo public, or
> deploy to **Netlify/Vercel** (both serve private repos free and support the
> same build — `npm run build`, output `dist`, with the env vars above).

## Adding words

Edit [`src/data/germanA1.js`](./src/data/germanA1.js). Each card:

```js
{ id: 'a1-036', front: 'die Katze', back: 'the cat', pos: 'noun',
  example: 'Die Katze schläft.', speak: 'die Katze' }
```

`id` must be unique and stable (progress is keyed by it). To add a whole new
deck, export another deck object and include it in the `decks` array.
