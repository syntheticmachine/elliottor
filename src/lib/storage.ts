import { MAX_POINTS_PER_SESSION } from '../types';

const KEY = 'elliotor:sessions:v3';

export type Stats = {
  sessionsPlayed: number;
  totalPoints: number;
  bestScore: number;
  /** Unique song IDs the user has encountered across all sessions. */
  songsHeard: string[];
};

const empty = (): Stats => ({
  sessionsPlayed: 0,
  totalPoints: 0,
  bestScore: 0,
  songsHeard: [],
});

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}

export function recordSession(
  scoreInSession: number,
  songIdsHeard: string[] = [],
): Stats {
  const stats = loadStats();
  stats.sessionsPlayed += 1;
  stats.totalPoints += scoreInSession;
  stats.bestScore = Math.max(stats.bestScore, scoreInSession);
  // Union of previously-heard songs with this session's songs
  const heard = new Set([...stats.songsHeard, ...songIdsHeard]);
  stats.songsHeard = [...heard];
  localStorage.setItem(KEY, JSON.stringify(stats));
  return stats;
}

export function averageScore(stats: Stats): number {
  if (stats.sessionsPlayed === 0) return 0;
  return stats.totalPoints / stats.sessionsPlayed;
}

export { MAX_POINTS_PER_SESSION };
