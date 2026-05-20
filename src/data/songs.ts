export type Song = {
  id: string;
  title: string;
  album: string;
  youtubeId: string;
  startSeconds: number;
};

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
];

export function pickRandomSong(): Song {
  return SONGS[Math.floor(Math.random() * SONGS.length)];
}

export function findSongById(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
