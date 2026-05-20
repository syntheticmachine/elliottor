export type Song = {
  id: string;
  title: string;
  album: string;
  youtubeId: string;
  startSeconds: number;
  /** Which pool the song belongs to. 'normal' = released catalog,
   *  'rare' = hard-mode-only (demos, unreleased studio rarities, covers). */
  pool?: 'normal' | 'rare';
};

export type GameMode = 'normal' | 'hard';

/** Album name used in the dropdown for all Grand Mal Studio Rarities tracks. */
const RARITIES = 'Studio Rarities';

// To add a song: find an official audio upload on YouTube, copy the video ID
// (the v= param), and pick a startSeconds where the vocals/melody are
// recognizable but not the exact opening note.
export const SONGS: Song[] = [
  // Roman Candle (1994)
  { id: 'roman-candle', title: 'Roman Candle', album: 'Roman Candle', youtubeId: '7ZrcTh2-uvQ', startSeconds: 30 },

  // Elliott Smith (1995)
  { id: 'needle-in-the-hay', title: 'Needle in the Hay', album: 'Elliott Smith', youtubeId: 'EgNgvCLRqWc', startSeconds: 35 },
  { id: 'christian-brothers', title: 'Christian Brothers', album: 'Elliott Smith', youtubeId: 'E34ewVKNYFs', startSeconds: 35 },
  { id: 'clementine', title: 'Clementine', album: 'Elliott Smith', youtubeId: '7mUeCIF_EjA', startSeconds: 25 },
  { id: 'coming-up-roses', title: 'Coming Up Roses', album: 'Elliott Smith', youtubeId: 'wYqZiK6gGo8', startSeconds: 30 },
  { id: 'st-ides-heaven', title: 'St. Ides Heaven', album: 'Elliott Smith', youtubeId: 'MJIXDOVRtVk', startSeconds: 30 },
  { id: 'the-biggest-lie', title: 'The Biggest Lie', album: 'Elliott Smith', youtubeId: 'Kc1VMXQar2Y', startSeconds: 25 },

  // Either/Or (1997)
  { id: 'speed-trials', title: 'Speed Trials', album: 'Either/Or', youtubeId: 'UuizNQUOFCI', startSeconds: 25 },
  { id: 'alameda', title: 'Alameda', album: 'Either/Or', youtubeId: 'WcRgqXYmzZE', startSeconds: 25 },
  { id: 'ballad-of-big-nothing', title: 'Ballad of Big Nothing', album: 'Either/Or', youtubeId: 'OalXKnQAZp4', startSeconds: 30 },
  { id: 'between-the-bars', title: 'Between the Bars', album: 'Either/Or', youtubeId: '5VTY0HRtwlQ', startSeconds: 25 },
  { id: 'pictures-of-me', title: 'Pictures of Me', album: 'Either/Or', youtubeId: 'TKIxDKOfGv8', startSeconds: 30 },
  { id: 'rose-parade', title: 'Rose Parade', album: 'Either/Or', youtubeId: 'PWOYmZs43MM', startSeconds: 25 },
  { id: 'punch-and-judy', title: 'Punch and Judy', album: 'Either/Or', youtubeId: '9yE405jfEP8', startSeconds: 25 },
  { id: 'angeles', title: 'Angeles', album: 'Either/Or', youtubeId: 'rQEEvDcMurE', startSeconds: 30 },
  { id: 'cupids-trick', title: "Cupid's Trick", album: 'Either/Or', youtubeId: 'B0LBHaL4iSw', startSeconds: 35 },
  { id: '245-am', title: '2:45 AM', album: 'Either/Or', youtubeId: 'FGKoJVXG98g', startSeconds: 30 },
  { id: 'say-yes', title: 'Say Yes', album: 'Either/Or', youtubeId: '8bxmk09lCzk', startSeconds: 20 },

  // Good Will Hunting OST (1997)
  { id: 'miss-misery', title: 'Miss Misery', album: 'Good Will Hunting OST', youtubeId: 'tbXPeNfObYo', startSeconds: 30 },

  // XO (1998)
  { id: 'sweet-adeline', title: 'Sweet Adeline', album: 'XO', youtubeId: '0hopdWwHAZM', startSeconds: 50 },
  { id: 'tomorrow-tomorrow', title: 'Tomorrow Tomorrow', album: 'XO', youtubeId: 'dEscwi6OZWk', startSeconds: 30 },
  { id: 'waltz-2', title: 'Waltz #2 (XO)', album: 'XO', youtubeId: 'RWn9ocrMhlE', startSeconds: 40 },
  { id: 'baby-britain', title: 'Baby Britain', album: 'XO', youtubeId: 'xqOY5iQ0DeU', startSeconds: 20 },
  { id: 'pitseleh', title: 'Pitseleh', album: 'XO', youtubeId: 'Pg7y4czi3UQ', startSeconds: 40 },
  { id: 'independence-day', title: 'Independence Day', album: 'XO', youtubeId: 'HM5Oo2rY59k', startSeconds: 25 },
  { id: 'bled-white', title: 'Bled White', album: 'XO', youtubeId: 'Tfb4VNJKjKw', startSeconds: 30 },
  { id: 'waltz-1', title: 'Waltz #1', album: 'XO', youtubeId: 'S2rDhHRbToI', startSeconds: 30 },
  { id: 'amity', title: 'Amity', album: 'XO', youtubeId: 'wfKs3KTLwY0', startSeconds: 25 },
  { id: 'bottle-up-and-explode', title: 'Bottle Up and Explode!', album: 'XO', youtubeId: 'F2Be7vCN0D4', startSeconds: 25 },
  { id: 'everybody-cares', title: 'Everybody Cares, Everybody Understands', album: 'XO', youtubeId: 'pv2E99jb5Lw', startSeconds: 35 },
  { id: 'i-didnt-understand', title: "I Didn't Understand", album: 'XO', youtubeId: 'lFIkik2I_Pc', startSeconds: 20 },

  // Figure 8 (2000)
  { id: 'son-of-sam', title: 'Son of Sam', album: 'Figure 8', youtubeId: 'B6sYRE65QIc', startSeconds: 35 },
  { id: 'somebody-i-used-to-know', title: 'Somebody That I Used to Know', album: 'Figure 8', youtubeId: 't7mc3Gckfcg', startSeconds: 25 },
  { id: 'junk-bond-trader', title: 'Junk Bond Trader', album: 'Figure 8', youtubeId: 'MVk4EApZ33I', startSeconds: 35 },
  { id: 'everything-reminds-me-of-her', title: 'Everything Reminds Me of Her', album: 'Figure 8', youtubeId: 'SNgIz0b5lHU', startSeconds: 30 },
  { id: 'everything-means-nothing-to-me', title: 'Everything Means Nothing to Me', album: 'Figure 8', youtubeId: 'm2NCuoVMhjk', startSeconds: 30 },
  { id: 'stupidity-tries', title: 'Stupidity Tries', album: 'Figure 8', youtubeId: 'sTRCJHDVL00', startSeconds: 30 },
  { id: 'happiness', title: 'Happiness/The Gondola Man', album: 'Figure 8', youtubeId: 'Hadz9rZH5zI', startSeconds: 40 },

  // From a Basement on the Hill (2004)
  { id: 'coast-to-coast', title: 'Coast to Coast', album: 'From a Basement on the Hill', youtubeId: 'y-ALdfkLYYk', startSeconds: 40 },
  { id: 'lets-get-lost', title: "Let's Get Lost", album: 'From a Basement on the Hill', youtubeId: 'w1Mi-WfZcZk', startSeconds: 30 },
  { id: 'pretty-ugly-before', title: 'Pretty (Ugly Before)', album: 'From a Basement on the Hill', youtubeId: 'yAf01cef70U', startSeconds: 25 },
  { id: 'twilight', title: 'Twilight', album: 'From a Basement on the Hill', youtubeId: 'JF6hxl0_FGo', startSeconds: 30 },
  { id: 'a-fond-farewell', title: 'A Fond Farewell', album: 'From a Basement on the Hill', youtubeId: 'sLfKDBM4860', startSeconds: 25 },
  { id: 'kings-crossing', title: "King's Crossing", album: 'From a Basement on the Hill', youtubeId: 'LmoPKlWDKRE', startSeconds: 35 },
  { id: 'strung-out-again', title: 'Strung Out Again', album: 'From a Basement on the Hill', youtubeId: 'o1923C0Qs9g', startSeconds: 30 },
  { id: 'a-distorted-reality', title: 'A Distorted Reality is Now a Necessity to Be Free', album: 'From a Basement on the Hill', youtubeId: '206gAmQ-5ek', startSeconds: 35 },
  { id: 'shooting-star', title: 'Shooting Star', album: 'From a Basement on the Hill', youtubeId: 'BN7Fez5LQgI', startSeconds: 30 },
  { id: 'memory-lane', title: 'Memory Lane', album: 'From a Basement on the Hill', youtubeId: 'L-uDPv7iQEo', startSeconds: 25 },

  // ---- HARD MODE: Grand Mal Studio Rarities (unreleased / demos / covers) ----
  // All tagged pool: 'rare' — appear only when game mode is 'hard'.
  // startSeconds are conservative defaults; tune per-track if any land on silence.
  { id: 'rare-some-song', title: 'Some Song', album: RARITIES, youtubeId: 'EyXrjNBwbBw', startSeconds: 35, pool: 'rare' },
  { id: 'rare-a-living-will', title: 'A Living Will', album: RARITIES, youtubeId: 'GgNR9fKShY8', startSeconds: 35, pool: 'rare' },
  { id: 'rare-how-to-take-a-fall', title: 'How to Take a Fall', album: RARITIES, youtubeId: 'kuBnNOQh1Cs', startSeconds: 35, pool: 'rare' },
  { id: 'rare-the-enemy-is-you', title: 'The Enemy Is You', album: RARITIES, youtubeId: 'IOnkUGtElio', startSeconds: 35, pool: 'rare' },
  { id: 'rare-figure-it-out', title: "I Don't Think I'm Ever Gonna Figure It Out", album: RARITIES, youtubeId: 'DTkmzW6urvY', startSeconds: 35, pool: 'rare' },
  { id: 'rare-cant-answer-you', title: "I Can't Answer You Anymore", album: RARITIES, youtubeId: 'ZXdbY06zy98', startSeconds: 35, pool: 'rare' },
  { id: 'rare-division-day', title: 'Division Day', album: RARITIES, youtubeId: 'qedAPrnBxpg', startSeconds: 30, pool: 'rare' },
  { id: 'rare-no-name-6', title: 'No Name #6', album: RARITIES, youtubeId: 'Nyw7KcO6E4I', startSeconds: 35, pool: 'rare' },
  { id: 'rare-the-real-estate', title: 'The Real Estate', album: RARITIES, youtubeId: 'd1bhZ6vXpBA', startSeconds: 35, pool: 'rare' },
  { id: 'rare-no-confidence-man', title: 'No Confidence Man', album: RARITIES, youtubeId: 'DgjeD5O5QY0', startSeconds: 35, pool: 'rare' },
  { id: 'rare-thirteen', title: 'Thirteen', album: RARITIES, youtubeId: 'N3hapzoPeE0', startSeconds: 35, pool: 'rare' },
  { id: 'rare-trouble', title: 'Trouble', album: RARITIES, youtubeId: '5wEhmScv18M', startSeconds: 35, pool: 'rare' },
  { id: 'rare-because', title: 'Because', album: RARITIES, youtubeId: 'Hl6xRxPGXmc', startSeconds: 35, pool: 'rare' },
  { id: 'rare-figure-8', title: 'Figure 8', album: RARITIES, youtubeId: 'uzy0-lWYNtQ', startSeconds: 30, pool: 'rare' },
  { id: 'rare-our-thing', title: 'Our Thing', album: RARITIES, youtubeId: 'RMHHECMWpB4', startSeconds: 35, pool: 'rare' },
  { id: 'rare-place-pigalle', title: 'Place Pigalle', album: RARITIES, youtubeId: 'hlXzAxrROow', startSeconds: 35, pool: 'rare' },
  { id: 'rare-true-love', title: 'True Love', album: RARITIES, youtubeId: 'PNwbQTF37p8', startSeconds: 35, pool: 'rare' },
  { id: 'rare-poisoned-well', title: 'From the Poisoned Well', album: RARITIES, youtubeId: 'IvLRiTcoZ_I', startSeconds: 35, pool: 'rare' },
  { id: 'rare-cecilia-amanda', title: 'Cecilia Amanda', album: RARITIES, youtubeId: 'A5Es7wlO1XM', startSeconds: 35, pool: 'rare' },
  { id: 'rare-suicide-machine', title: 'Suicide Machine', album: RARITIES, youtubeId: '3VivPgfY-7Q', startSeconds: 35, pool: 'rare' },
  { id: 'rare-o-so-slow', title: 'O So Slow', album: RARITIES, youtubeId: '8TfA2QH2RYw', startSeconds: 35, pool: 'rare' },
  { id: 'rare-mr-goodmorning', title: 'Mr. Goodmorning', album: RARITIES, youtubeId: '8xi-y6779nc', startSeconds: 35, pool: 'rare' },
  { id: 'rare-turn-the-record-over', title: "Let's Turn the Record Over", album: RARITIES, youtubeId: 'zev1pT6E2lA', startSeconds: 35, pool: 'rare' },
  { id: 'rare-taking-a-fall', title: 'Taking a Fall', album: RARITIES, youtubeId: 'IUANhQHjCvM', startSeconds: 35, pool: 'rare' },
  { id: 'rare-abused', title: 'Abused', album: RARITIES, youtubeId: 'pC-SorgnB7U', startSeconds: 35, pool: 'rare' },
  { id: 'rare-stickman', title: 'Stickman', album: RARITIES, youtubeId: 'EAhD0Wm9PfM', startSeconds: 35, pool: 'rare' },
  { id: 'rare-see-you-in-heaven', title: 'See You in Heaven', album: RARITIES, youtubeId: 'zzL3xiLWI8s', startSeconds: 35, pool: 'rare' },
  { id: 'rare-dancing-on-highway', title: 'Dancing on the Highway', album: RARITIES, youtubeId: 'p2xUkz00fqg', startSeconds: 35, pool: 'rare' },
  { id: 'rare-everythings-okay', title: "Everything's Okay", album: RARITIES, youtubeId: 'syw_7jyzk3c', startSeconds: 35, pool: 'rare' },
  { id: 'rare-burned-out', title: 'Burned Out, Still Glowing', album: RARITIES, youtubeId: '231euKxW-XY', startSeconds: 35, pool: 'rare' },
  { id: 'rare-crazy-fucker', title: 'Crazy Fucker', album: RARITIES, youtubeId: 'eGEX7ckDVKE', startSeconds: 35, pool: 'rare' },
  { id: 'rare-brand-new-game', title: 'Brand New Game', album: RARITIES, youtubeId: 'e_8alZSw3Eg', startSeconds: 35, pool: 'rare' },
  { id: 'rare-no-more', title: 'No More', album: RARITIES, youtubeId: '9ORB7tzhZbs', startSeconds: 35, pool: 'rare' },
  { id: 'rare-splitzville', title: 'Splitzville', album: RARITIES, youtubeId: '0PFJ67V-GDk', startSeconds: 35, pool: 'rare' },
  { id: 'rare-yay', title: 'Yay!', album: RARITIES, youtubeId: '5vDHai8ZTd8', startSeconds: 35, pool: 'rare' },
  { id: 'rare-ill-be-back', title: "I'll Be Back", album: RARITIES, youtubeId: 'S0IS_tkfW1c', startSeconds: 35, pool: 'rare' },
  { id: 'rare-revolution', title: 'Revolution', album: RARITIES, youtubeId: 'Ip4KKefpc0g', startSeconds: 35, pool: 'rare' },
  { id: 'rare-no-life', title: 'No Life', album: RARITIES, youtubeId: 'R1ofEwLr6f0', startSeconds: 35, pool: 'rare' },
  { id: 'rare-stained-glass-eyes', title: 'Stained Glass Eyes', album: RARITIES, youtubeId: '5a0rI73Tcq8', startSeconds: 35, pool: 'rare' },
  { id: 'rare-the-assassin', title: 'The Assassin', album: RARITIES, youtubeId: '2vDxtRLCZIE', startSeconds: 35, pool: 'rare' },
  { id: 'rare-like-a-cop', title: 'Like a Cop', album: RARITIES, youtubeId: 'Bw0aC1dnpqo', startSeconds: 35, pool: 'rare' },
  { id: 'rare-where-i-get-it-from', title: 'Where I Get It From', album: RARITIES, youtubeId: 'R4fqsf9Fcrc', startSeconds: 35, pool: 'rare' },
  { id: 'rare-she-wont-look', title: "She Won't Ever Look at Me", album: RARITIES, youtubeId: 'p8EFGT4Llac', startSeconds: 35, pool: 'rare' },
  { id: 'rare-shiva', title: 'Shiva Opens Her Arms', album: RARITIES, youtubeId: 'DWETxVHtPmQ', startSeconds: 35, pool: 'rare' },
  { id: 'rare-gonna-get-crushed', title: "I'm Gonna Get Crushed", album: RARITIES, youtubeId: 'RdVtLwLkvWk', startSeconds: 35, pool: 'rare' },
  { id: 'rare-coraliza', title: 'Coraliza', album: RARITIES, youtubeId: 'Pl7UVPsnQWM', startSeconds: 35, pool: 'rare' },
  { id: 'rare-everybody-has-it', title: 'Everybody Has It', album: RARITIES, youtubeId: 'Jnsv3sVYxvY', startSeconds: 35, pool: 'rare' },
  { id: 'rare-concrete-jungle', title: 'Concrete Jungle', album: RARITIES, youtubeId: '80Ntm17kPBY', startSeconds: 35, pool: 'rare' },
  { id: 'rare-the-machine', title: 'The Machine', album: RARITIES, youtubeId: '1e1XmHPTT5w', startSeconds: 35, pool: 'rare' },
  { id: 'rare-melodic-noise', title: 'Melodic Noise', album: RARITIES, youtubeId: 'R28pJBIfmXY', startSeconds: 35, pool: 'rare' },
  { id: 'rare-snowbunny', title: "Snowbunny's Serenade", album: RARITIES, youtubeId: '5Ak-gnICL0U', startSeconds: 35, pool: 'rare' },
  { id: 'rare-two-timed', title: 'Two Timed', album: RARITIES, youtubeId: 'x6TsDMF1h4I', startSeconds: 35, pool: 'rare' },
  { id: 'rare-some-rock-song', title: 'Some Rock Song', album: RARITIES, youtubeId: '1yGSM45fNpU', startSeconds: 35, pool: 'rare' },
  { id: 'rare-you-make-it-seem', title: 'You Make It Seem Like Nothing', album: RARITIES, youtubeId: 'u-Pe-POydT4', startSeconds: 35, pool: 'rare' },
];

/** Pool of songs for a given game mode. Hard mode uses ONLY the rare pool. */
export function songsForMode(mode: GameMode): Song[] {
  if (mode === 'hard') return SONGS.filter((s) => s.pool === 'rare');
  return SONGS.filter((s) => s.pool !== 'rare');
}

export function pickRandomSong(): Song {
  return SONGS[Math.floor(Math.random() * SONGS.length)];
}

export function findSongById(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
