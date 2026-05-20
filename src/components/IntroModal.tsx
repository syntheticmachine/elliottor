import { useEffect, useRef } from 'react';

type Props = {
  onClose: () => void;
  /** Global play count across all users; null while loading or unavailable. */
  playCount?: number | null;
};

export function IntroModal({ onClose, playCount }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape; autofocus the Start button for keyboard flow.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    buttonRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="intro-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onClick={onClose}
    >
      <div className="intro-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="intro-title" className="intro-title">
          How to play
        </h2>

        <ol className="intro-list">
          <li>
            <span className="intro-num">1</span>
            <span>Hit play to hear a <strong>1.5 second clip</strong> of an Elliott Smith song.</span>
          </li>
          <li>
            <span className="intro-num">2</span>
            <span>Name the song to score <strong>3 points</strong>.</span>
          </li>
          <li>
            <span className="intro-num">3</span>
            <span>Need more time? Tap <strong>more</strong> for a longer clip — fewer points.</span>
          </li>
        </ol>

        <div className="intro-foot">5 songs per session · 15 points max</div>

        {playCount != null && playCount > 0 && (
          <div className="intro-plays">
            <span className="intro-plays-num">{playCount.toLocaleString()}</span>{' '}
            {playCount === 1 ? 'game played' : 'games played'}
          </div>
        )}

        <button ref={buttonRef} className="primary-btn" onClick={onClose}>
          Start →
        </button>
      </div>
    </div>
  );
}
