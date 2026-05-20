import type { GameMode } from '../data/songs';

type Props = {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
  /** Compact variant fits inside the session-end card. */
  compact?: boolean;
};

const COPY: Record<GameMode, { label: string; sub: string }> = {
  normal: { label: 'Normal', sub: 'released songs' },
  hard: { label: 'Hard', sub: 'rare / unreleased' },
};

/**
 * Two-button segmented control to pick between the released-catalog "Normal"
 * pool and the studio-rarities "Hard" pool. Visible on the intro modal and
 * the session-end screen so the choice is changeable between runs.
 */
export function ModePicker({ mode, onChange, compact }: Props) {
  return (
    <div className={`mode-picker${compact ? ' compact' : ''}`} role="radiogroup" aria-label="Difficulty">
      {(['normal', 'hard'] as const).map((m) => {
        const active = m === mode;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            className={`mode-option${active ? ' active' : ''}`}
            onClick={() => onChange(m)}
          >
            <span className="mode-option-label">{COPY[m].label}</span>
            <span className="mode-option-sub">{COPY[m].sub}</span>
          </button>
        );
      })}
    </div>
  );
}
