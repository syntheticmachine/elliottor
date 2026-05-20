import { useEffect, useRef, useState } from 'react';
import './App.css';
import logoUrl from '/logo-dark.svg';
import bgUrl from '/bg.jpg';
import { useSession } from './hooks/useSession';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { SongDropdown } from './components/SongDropdown';
import { TierPills } from './components/TierPills';
import { SongDots } from './components/SongDots';
import { SongResultCard } from './components/SongResultCard';
import { SessionEnd } from './components/SessionEnd';
import { loadStats, recordSession, type Stats } from './lib/storage';
import {
  MAX_POINTS_PER_SESSION,
  SONGS_PER_SESSION,
  TIERS,
} from './types';

function App() {
  const session = useSession();
  const ytHostRef = useRef<HTMLDivElement>(null);
  const player = useYouTubePlayer(ytHostRef);
  const [stats, setStats] = useState<Stats>(() => loadStats());
  const recordedKey = useRef<string | null>(null);

  useEffect(() => {
    if (player.status !== 'ready' || !session.currentSong) return;
    player.loadAndPause(
      session.currentSong.youtubeId,
      session.currentSong.startSeconds,
    );
  }, [player.status, player.loadAndPause, session.currentSong]);

  useEffect(() => {
    if (session.status !== 'playing') player.stop();
  }, [session.status, player]);

  useEffect(() => {
    if (session.status !== 'session-complete') return;
    const key = session.results.map((r) => r.songId).join('|');
    if (recordedKey.current === key) return;
    recordedKey.current = key;
    setStats(recordSession(session.score));
  }, [session.status, session.results, session.score]);

  function handlePlay() {
    if (!session.currentSong) return;
    player.playClip(
      session.currentSong.youtubeId,
      session.currentSong.startSeconds,
      session.clipMs,
    );
  }

  function handleRestart() {
    recordedKey.current = null;
    session.restart();
  }

  const nextTier = TIERS[Math.min(session.currentTier + 1, TIERS.length - 1)];

  return (
    <>
      <img src={bgUrl} alt="" aria-hidden="true" className="page-bg" />
      <div className="app">
      <header className="header">
        <img src={logoUrl} alt="Elliottor" className="logo" />
        <div className="score-display">
          <span className="score-label">score</span>
          <span className="score-value">
            {session.score}
            <span className="score-max">/{MAX_POINTS_PER_SESSION}</span>
          </span>
        </div>
      </header>

      {session.status !== 'session-complete' && (
        <div className="progress-row">
          <SongDots results={session.results} />
          <div className="progress-text">
            {Math.min(session.currentIndex + 1, SONGS_PER_SESSION)} / {SONGS_PER_SESSION}
          </div>
        </div>
      )}

      <main className="main">
        {session.status === 'playing' && session.currentSong && (
          <div className="play-screen">
            <div className={`disk-wrap ${player.isPlaying ? 'playing' : ''}`}>
              <span className="disk-pulse" />
              <span className="disk-pulse" />
              <span className="disk-pulse" />
              <div className={`disk ${player.isPlaying ? 'playing' : ''}`}>
                <span className="disk-mark" />
                <span className="disk-mark-sm" />
              </div>
              <div className="disk-gloss" />
            </div>

            <button
              className="play-btn"
              onClick={handlePlay}
              disabled={player.status !== 'ready'}
              aria-label={player.isPlaying ? 'Stop clip' : 'Play clip'}
            >
              <span className="play-icon">{player.isPlaying ? '■' : '▶'}</span>
            </button>

            <TierPills currentTier={session.currentTier} />

            <div className="play-meta">
              {player.isPlaying ? 'Playing' : `${TIERS[session.currentTier].label} clip · ${session.tierPoints}pt available`}
            </div>

            {session.canExtend && (
              <button className="more-btn" onClick={session.extendTier}>
                more ({nextTier.label} · {nextTier.points}pt)
              </button>
            )}

            <SongDropdown
              disabled={player.status !== 'ready'}
              onSelect={(song) => session.submitGuess(song.id)}
            />

            <button className="giveup-btn" onClick={session.giveUp}>
              give up
            </button>
          </div>
        )}

        {session.status === 'song-complete' && session.currentSong && session.finishedResult && (
          <SongResultCard
            song={session.currentSong}
            result={session.finishedResult}
            isLast={session.currentIndex === SONGS_PER_SESSION - 1}
            onNext={session.advance}
          />
        )}

        {session.status === 'session-complete' && (
          <SessionEnd
            results={session.results}
            stats={stats}
            onRestart={handleRestart}
          />
        )}
      </main>

      <div ref={ytHostRef} className="yt-host" />
      </div>
    </>
  );
}

export default App;
