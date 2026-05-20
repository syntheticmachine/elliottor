export const SONGS_PER_SESSION = 5;

export const TIERS = [
  { durationMs: 1500, points: 3, label: '1.5s' },
  { durationMs: 3000, points: 2, label: '3s' },
  { durationMs: 5000, points: 1, label: '5s' },
] as const;

export const MAX_TIER_INDEX = TIERS.length - 1;
export const MAX_POINTS_PER_SESSION = SONGS_PER_SESSION * TIERS[0].points;

export type GuessOutcome = 'correct' | 'wrong' | 'skip';

export type Guess = {
  outcome: GuessOutcome;
  tier: number;
  songId?: string;
};

export type SongResult = {
  songId: string;
  guesses: Guess[];
  won: boolean;
  points: number;
};

export type SessionStatus = 'playing' | 'song-complete' | 'session-complete';
