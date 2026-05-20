export type Song = {
  id: string;
  title: string;
  album: string;
  youtubeId: string;
  startSeconds: number;
};

// To add a song: find an official audio upload on YouTube, copy the video ID
// (the v= param), and pick a startSeconds where the vocals/melody are recognizable.
export const SONGS: Song[] = [
  {
    id: 'between-the-bars',
    title: 'Between the Bars',
    album: 'Either/Or',
    youtubeId: '5VTY0HRtwlQ',
    startSeconds: 25,
  },
  {
    id: 'waltz-2',
    title: 'Waltz #2 (XO)',
    album: 'XO',
    youtubeId: 'RWn9ocrMhlE',
    startSeconds: 40,
  },
  {
    id: 'needle-in-the-hay',
    title: 'Needle in the Hay',
    album: 'Elliott Smith',
    youtubeId: 'EgNgvCLRqWc',
    startSeconds: 35,
  },
  {
    id: 'miss-misery',
    title: 'Miss Misery',
    album: 'Good Will Hunting OST',
    youtubeId: 'tbXPeNfObYo',
    startSeconds: 30,
  },
  {
    id: 'say-yes',
    title: 'Say Yes',
    album: 'Either/Or',
    youtubeId: '8bxmk09lCzk',
    startSeconds: 20,
  },
  {
    id: 'angeles',
    title: 'Angeles',
    album: 'Either/Or',
    youtubeId: 'rQEEvDcMurE',
    startSeconds: 30,
  },
  {
    id: 'son-of-sam',
    title: 'Son of Sam',
    album: 'Figure 8',
    youtubeId: 'B6sYRE65QIc',
    startSeconds: 35,
  },
  {
    id: 'independence-day',
    title: 'Independence Day',
    album: 'XO',
    youtubeId: 'HM5Oo2rY59k',
    startSeconds: 25,
  },
  {
    id: 'pictures-of-me',
    title: 'Pictures of Me',
    album: 'Either/Or',
    youtubeId: 'TKIxDKOfGv8',
    startSeconds: 30,
  },
  {
    id: 'ballad-of-big-nothing',
    title: 'Ballad of Big Nothing',
    album: 'Either/Or',
    youtubeId: 'OalXKnQAZp4',
    startSeconds: 30,
  },
];

export function pickRandomSong(): Song {
  return SONGS[Math.floor(Math.random() * SONGS.length)];
}

export function findSongById(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
