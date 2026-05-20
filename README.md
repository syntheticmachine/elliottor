# Elliottor

A song-guessing game for Elliott Smith fans. Listen to a short clip of one of his songs and try to name it.

Inspired by [Conordle](https://conordle.netlify.app/) and the Figure 8 album poster aesthetic.

## How it works

Each round plays a 1.5 second clip from one of Elliott Smith's songs. Guess correctly for **3 points**. Not sure? Extend to a 3 second clip (**2 points**) or a 5 second clip (**1 point**). Or give up.

A session is 5 songs, max score 15.

## Stack

- Vite + React 19 + TypeScript
- YouTube IFrame API for clip playback (no API key required)
- LocalStorage for session stats
- Plain CSS — no UI framework

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Adding songs

Edit [`src/data/songs.ts`](src/data/songs.ts). Each entry needs:

- `id` — slug-style unique id
- `title` and `album` — for the dropdown and result screen
- `youtubeId` — the `v=` param from any YouTube URL (use an official audio upload when possible)
- `startSeconds` — where in the song to start the clip (pick a recognizable but not-too-obvious moment)

## Build

```bash
npm run build      # outputs dist/
npm run preview    # serves the built bundle locally
```

Deploys cleanly to Netlify, Vercel, or any static host — no server-side code.
