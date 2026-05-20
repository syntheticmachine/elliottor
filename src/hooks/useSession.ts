import { useCallback, useMemo, useState } from 'react';
import {
  MAX_TIER_INDEX,
  SONGS_PER_SESSION,
  TIERS,
  type Guess,
  type SessionStatus,
  type SongResult,
} from '../types';
import { SONGS, type Song } from '../data/songs';

function pickSessionSongs(): Song[] {
  const pool = [...SONGS];
  const out: Song[] = [];
  const n = Math.min(SONGS_PER_SESSION, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

function pointsForTier(tier: number): number {
  return TIERS[tier]?.points ?? 0;
}

export function useSession() {
  const [songs, setSongs] = useState<Song[]>(() => pickSessionSongs());
  const [results, setResults] = useState<SongResult[]>([]);
  const [currentTier, setCurrentTier] = useState(0);
  const [currentGuesses, setCurrentGuesses] = useState<Guess[]>([]);
  // Tracks the song that's currently in the "song-complete" intermission view.
  const [finishedResult, setFinishedResult] = useState<SongResult | null>(null);

  const currentIndex = results.length;
  const currentSong: Song | null = songs[currentIndex] ?? null;

  const status: SessionStatus = finishedResult
    ? 'song-complete'
    : !currentSong
      ? 'session-complete'
      : 'playing';

  const clipMs = TIERS[currentTier].durationMs;
  const tierPoints = TIERS[currentTier].points;
  const canExtend = currentTier < MAX_TIER_INDEX;

  function finishSong(won: boolean, finalGuesses: Guess[]) {
    if (!currentSong) return;
    const points = won ? pointsForTier(currentTier) : 0;
    setFinishedResult({
      songId: currentSong.id,
      guesses: finalGuesses,
      won,
      points,
    });
  }

  const submitGuess = useCallback(
    (songId: string) => {
      if (!currentSong || status !== 'playing') return;
      const correct = songId === currentSong.id;
      const next: Guess = {
        outcome: correct ? 'correct' : 'wrong',
        tier: currentTier,
        songId,
      };
      const all = [...currentGuesses, next];
      setCurrentGuesses(all);
      if (correct) {
        finishSong(true, all);
      } else if (currentTier < MAX_TIER_INDEX) {
        setCurrentTier(currentTier + 1);
      } else {
        finishSong(false, all);
      }
    },
    [currentSong, status, currentGuesses, currentTier],
  );

  const extendTier = useCallback(() => {
    if (status !== 'playing' || !canExtend) return;
    setCurrentTier((t) => Math.min(t + 1, MAX_TIER_INDEX));
  }, [status, canExtend]);

  const giveUp = useCallback(() => {
    if (!currentSong || status !== 'playing') return;
    const all = [...currentGuesses, { outcome: 'skip' as const, tier: currentTier }];
    setCurrentGuesses(all);
    finishSong(false, all);
  }, [currentSong, status, currentGuesses, currentTier]);

  const advance = useCallback(() => {
    if (!finishedResult) return;
    setResults((prev) => [...prev, finishedResult]);
    setFinishedResult(null);
    setCurrentGuesses([]);
    setCurrentTier(0);
  }, [finishedResult]);

  const restart = useCallback(() => {
    setSongs(pickSessionSongs());
    setResults([]);
    setCurrentGuesses([]);
    setCurrentTier(0);
    setFinishedResult(null);
  }, []);

  const score = results.reduce((sum, r) => sum + r.points, 0);

  return useMemo(
    () => ({
      songs,
      results,
      currentSong,
      currentIndex,
      currentTier,
      currentGuesses,
      clipMs,
      tierPoints,
      canExtend,
      status,
      finishedResult,
      score,
      submitGuess,
      extendTier,
      giveUp,
      advance,
      restart,
    }),
    [
      songs,
      results,
      currentSong,
      currentIndex,
      currentTier,
      currentGuesses,
      clipMs,
      tierPoints,
      canExtend,
      status,
      finishedResult,
      score,
      submitGuess,
      extendTier,
      giveUp,
      advance,
      restart,
    ],
  );
}
