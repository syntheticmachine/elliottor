import { MAX_POINTS_PER_SESSION } from '../types';
import type { GameMode } from '../data/songs';

const KEY_V3 = 'elliotor:sessions:v3';
const KEY = 'elliotor:sessions:v4';
const MODE_KEY = 'elliotor:mode:v1';

export type ModeStats = {
  sessionsPlayed: number;
  totalPoints: number;
  bestScore: number;
  /** Unique song IDs the user has encountered across all sessions in this mode. */
  songsHeard: string[];
};

export type Stats = {
  normal: ModeStats;
  hard: ModeStats;
};

const emptyMode = (): ModeStats => ({
  sessionsPlayed: 0,
  totalPoints: 0,
  bestScore: 0,
  songsHeard: [],
});

const empty = (): Stats => ({
  normal: emptyMode(),
  hard: emptyMode(),
});

/** v3 → v4 migration: old single-bucket stats become the `normal` mode. */
function migrate(): Stats | null {
  try {
    const v3 = localStorage.getItem(KEY_V3);
    if (!v3) return null;
    const old = JSON.parse(v3) as Partial<ModeStats>;
    return {
      normal: { ...emptyMode(), ...old },
      hard: emptyMode(),
    };
  } catch {
    return null;
  }
}

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Stats>;
      return {
        normal: { ...emptyMode(), ...(parsed.normal ?? {}) },
        hard: { ...emptyMode(), ...(parsed.hard ?? {}) },
      };
    }
    const migrated = migrate();
    if (migrated) {
      localStorage.setItem(KEY, JSON.stringify(migrated));
      return migrated;
    }
    return empty();
  } catch {
    return empty();
  }
}

export function recordSession(
  mode: GameMode,
  scoreInSession: number,
  songIdsHeard: string[] = [],
): Stats {
  const stats = loadStats();
  const bucket = stats[mode];
  bucket.sessionsPlayed += 1;
  bucket.totalPoints += scoreInSession;
  bucket.bestScore = Math.max(bucket.bestScore, scoreInSession);
  const heard = new Set([...bucket.songsHeard, ...songIdsHeard]);
  bucket.songsHeard = [...heard];
  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    // ignore — private mode or quota exceeded
  }
  return stats;
}

export function averageScore(bucket: ModeStats): number {
  if (bucket.sessionsPlayed === 0) return 0;
  return bucket.totalPoints / bucket.sessionsPlayed;
}

/* --- Persisted game mode --- */

export function loadMode(): GameMode {
  try {
    const raw = localStorage.getItem(MODE_KEY);
    return raw === 'hard' ? 'hard' : 'normal';
  } catch {
    return 'normal';
  }
}

export function saveMode(mode: GameMode): void {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    // ignore
  }
}

/* --- First-visit intro flag --- */

const INTRO_KEY = 'elliotor:intro-seen:v1';

export function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    localStorage.setItem(INTRO_KEY, '1');
  } catch {
    // ignore — private mode or quota exceeded
  }
}

/* --- One-time mode-selection prompt ---
   Returning users who finished the intro before Hard mode shipped never saw
   the mode picker. We surface a small dedicated picker on their next visit
   so they make an explicit choice. After that, the picker on the intro
   modal and the session-end screen are sufficient. */

const MODE_PICKED_KEY = 'elliotor:mode-picked:v1';

export function hasPickedMode(): boolean {
  try {
    return localStorage.getItem(MODE_PICKED_KEY) === '1';
  } catch {
    return false;
  }
}

export function markModePicked(): void {
  try {
    localStorage.setItem(MODE_PICKED_KEY, '1');
  } catch {
    // ignore — private mode or quota exceeded
  }
}

export { MAX_POINTS_PER_SESSION };
