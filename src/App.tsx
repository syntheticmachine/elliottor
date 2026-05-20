import { useEffect, useRef, useState } from 'react';
import './App.css';
import logoUrl from '/logo-dark.svg';
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

  // Brief celebration animations on key state changes
  const [scoreBump, setScoreBump] = useState(0);
  const [shakeNonce, setShakeNonce] = useState(0);
  const [tierBumpNonce, setTierBumpNonce] = useState(0);
  const prevScore = useRef(session.score);
  const prevWrongCount = useRef(0);
  const prevTier = useRef(session.currentTier);

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

  // Pulse the score counter whenever the score increases.
  useEffect(() => {
    if (session.score > prevScore.current) {
      setScoreBump((n) => n + 1);
    }
    prevScore.current = session.score;
  }, [session.score]);

  // Shake the play screen + flash the input on each wrong guess.
  useEffect(() => {
    const wrong = session.currentGuesses.filter((g) => g.outcome === 'wrong').length;
    if (wrong > prevWrongCount.current) {
      setShakeNonce((n) => n + 1);
    }
    prevWrongCount.current = wrong;
  }, [session.currentGuesses]);

  // Flash the newly-active tier pill when advancing.
  useEffect(() => {
    if (session.currentTier !== prevTier.current && session.currentTier > 0) {
      setTierBumpNonce((n) => n + 1);
    }
    prevTier.current = session.currentTier;
  }, [session.currentTier]);

  // Reset trackers when starting a new song / restart
  useEffect(() => {
    prevWrongCount.current = 0;
    prevTier.current = 0;
  }, [session.currentIndex]);

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
    <div className="app">
      <header className="header">
        <img src={logoUrl} alt="Elliottor" className="logo" />
        <div className="score-display">
          <span className="score-label">score</span>
          {/* key={scoreBump} restarts the pulse animation on each score change */}
          <span key={scoreBump} className="score-value pulse">
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
          <div key={`shake-${shakeNonce}`} className={`play-screen${shakeNonce ? ' shake' : ''}`}>
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

            <TierPills currentTier={session.currentTier} flashKey={tierBumpNonce} />

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
  );
}

export default App;
