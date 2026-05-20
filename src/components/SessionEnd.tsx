import { useState } from 'react';
import { MAX_POINTS_PER_SESSION, type SongResult } from '../types';
import { buildSessionShare, copyToClipboard } from '../lib/share';
import { findSongById } from '../data/songs';
import { averageScore, type Stats } from '../lib/storage';

type Props = {
  results: SongResult[];
  stats: Stats;
  onRestart: () => void;
};

function caption(score: number): string {
  if (score === MAX_POINTS_PER_SESSION) return 'Perfect ear.';
  if (score >= MAX_POINTS_PER_SESSION - 2) return 'Great run.';
  if (score >= MAX_POINTS_PER_SESSION / 2) return 'Not bad.';
  if (score > 0) return 'Tough round.';
  return 'Better luck next time.';
}

export function SessionEnd({ results, stats, onRestart }: Props) {
  const [copied, setCopied] = useState(false);
  const share = buildSessionShare(results);
  const total = results.reduce((s, r) => s + r.points, 0);

  async function handleShare() {
    const ok = await copyToClipboard(share);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="session-end">
      <div className="session-score">
        <div className="score-big">
          {total}
          <span className="score-denom">/{MAX_POINTS_PER_SESSION}</span>
        </div>
        <div className="score-caption">{caption(total)}</div>
      </div>

      <ul className="session-list">
        {results.map((r, i) => {
          const song = findSongById(r.songId);
          return (
            <li
              key={i}
              className={r.won ? 'session-item win' : 'session-item lose'}
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

      <div className="end-actions">
        <button className="primary-btn" onClick={handleShare}>
          {copied ? 'Copied!' : 'Share'}
        </button>
        <button className="secondary-btn" onClick={onRestart}>
          Play again
        </button>
      </div>

      <div className="stats-row">
        <span>{stats.sessionsPlayed} sessions</span>
        <span>·</span>
        <span>Avg {averageScore(stats).toFixed(1)}</span>
        <span>·</span>
        <span>Best {stats.bestScore}</span>
      </div>
    </div>
  );
}
