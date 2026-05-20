import { useEffect, useState } from 'react';
import { MAX_POINTS_PER_SESSION, TIERS, type SongResult } from '../types';
import { buildSessionShare, copyToClipboard } from '../lib/share';
import { findSongById, songsForMode, type GameMode } from '../data/songs';
import { averageScore, type Stats } from '../lib/storage';
import { Confetti } from './Confetti';
import { ModePicker } from './ModePicker';

type Props = {
  results: SongResult[];
  stats: Stats;
  mode: GameMode;
  /** Mode the user picks for the *next* session. Committed when they hit Play again. */
  onModeChange: (mode: GameMode) => void;
  onRestart: () => void;
};

function caption(score: number): string {
  if (score === MAX_POINTS_PER_SESSION) return 'Perfect ear.';
  if (score >= MAX_POINTS_PER_SESSION - 2) return 'Great run.';
  if (score >= MAX_POINTS_PER_SESSION / 2) return 'Not bad.';
  if (score > 0) return 'Tough round.';
  return 'Better luck next time.';
}

function tierClassForPoints(points: number): string {
  const idx = TIERS.findIndex((t) => t.points === points);
  return idx >= 0 ? `tier-${idx}` : 'tier-none';
}

// Animate count-up from 0 to the final score
function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

export function SessionEnd({ results, stats, mode, onModeChange, onRestart }: Props) {
  const [copied, setCopied] = useState(false);
  const share = buildSessionShare(results, mode);
  const total = results.reduce((s, r) => s + r.points, 0);
  const animatedTotal = useCountUp(total, 900);
  const canNativeShare =
    typeof navigator !== 'undefined' && 'share' in navigator;

  // Collection counter is per-mode: the released catalog and rarities pool
  // are independent — heard-count should match the pool you're playing.
  const bucket = stats[mode];
  const poolSize = songsForMode(mode).length;

  async function handleNativeShare() {
    try {
      await navigator.share({ text: share });
    } catch (e) {
      // User dismissed the share sheet — silently exit.
      if ((e as Error).name === 'AbortError') return;
      // Real failure: fall back to clipboard so the user still gets the text.
      const ok = await copyToClipboard(share);
      if (ok) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }
    }
  }

  async function handleCopy() {
    const ok = await copyToClipboard(share);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  const isPerfect = total === MAX_POINTS_PER_SESSION;
  const didWin = total >= MAX_POINTS_PER_SESSION / 2;

  return (
    <div className="session-end enter-pop">
      {isPerfect && <Confetti count={120} durationMs={2800} origin="top" />}
      {!isPerfect && didWin && <Confetti count={45} durationMs={1800} origin="top" />}

      <div className="session-score">
        <div className="score-big">
          {animatedTotal}
          <span className="score-denom">/{MAX_POINTS_PER_SESSION}</span>
        </div>
        <div className="score-caption">{caption(total)}</div>
      </div>

      <ul className="session-list">
        {results.map((r, i) => {
          const song = findSongById(r.songId);
          const tierCls = r.won ? tierClassForPoints(r.points) : 'tier-none';
          return (
            <li
              key={i}
              className={`session-item ${r.won ? 'win' : 'lose'} ${tierCls}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="session-item-num">{i + 1}</span>
              <span className="session-item-title">{song?.title ?? '?'}</span>
              <span className="session-item-tag">
                {r.won ? `+${r.points}` : '0'}
              </span>
            </li>
          );
        })}
      </ul>

      <pre className="share-grid">{share}</pre>

      <div className="collection">
        <div className="collection-row">
          <span className="collection-label">
            your collection{mode === 'hard' ? ' (hard)' : ''}
          </span>
          <span className="collection-count">
            {bucket.songsHeard.length} / {poolSize}
          </span>
        </div>
        <div className="collection-bar">
          <div
            className="collection-bar-fill"
            style={{
              width: `${(bucket.songsHeard.length / Math.max(1, poolSize)) * 100}%`,
            }}
          />
        </div>
      </div>

      <ModePicker mode={mode} onChange={onModeChange} compact />

      <div className="end-actions-stack">
        <div className="end-actions">
          {canNativeShare && (
            <button className="primary-btn" onClick={handleNativeShare}>
              Share
            </button>
          )}
          <button
            className={canNativeShare ? 'secondary-btn' : 'primary-btn'}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button className="secondary-btn end-action-wide" onClick={onRestart}>
          Play again
        </button>
      </div>

      <div className="stats-row">
        <span>{bucket.sessionsPlayed} sessions</span>
        <span>·</span>
        <span>Avg {averageScore(bucket).toFixed(1)}</span>
        <span>·</span>
        <span>Best {bucket.bestScore}</span>
      </div>
    </div>
  );
}
