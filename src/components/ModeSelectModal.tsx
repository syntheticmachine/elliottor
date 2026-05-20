import { useEffect, useRef } from 'react';
import { ModePicker } from './ModePicker';
import type { GameMode } from '../data/songs';

type Props = {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onClose: () => void;
};

/**
 * Slim modal shown on every page load for returning users so they can pick
 * Normal vs Hard before each session. First-time users skip this — the
 * IntroModal already has the picker baked in.
 */
export function ModeSelectModal({ mode, onModeChange, onClose }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      aria-labelledby="mode-select-title"
      onClick={onClose}
    >
      <div className="intro-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="mode-select-title" className="intro-title">
          Choose your mode
        </h2>

        <p className="mode-select-blurb">
          Normal is the released catalog. Hard pulls from unreleased Grand
          Mal demos, covers, and studio rarities.
        </p>

        <ModePicker mode={mode} onChange={onModeChange} />

        <button ref={buttonRef} className="primary-btn" onClick={onClose}>
          Start →
        </button>
      </div>
    </div>
  );
}
