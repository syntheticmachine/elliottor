import { TIERS } from '../types';

type Props = {
  currentTier: number;
  /** Increments each time we advance a tier — drives the flash animation. */
  flashKey?: number;
};

export function TierPills({ currentTier, flashKey = 0 }: Props) {
  return (
    <div className="tier-pills">
      {TIERS.map((tier, i) => {
        const isCurrent = i === currentTier;
        const isPast = i < currentTier;
        const base = isCurrent
          ? 'tier-pill current'
          : isPast
            ? 'tier-pill past'
            : 'tier-pill upcoming';
        // Flash the current pill whenever flashKey changes (i.e. just advanced)
        const flash = isCurrent && flashKey > 0 ? ' just-activated' : '';
        return (
          <div
            key={isCurrent ? `current-${flashKey}` : `pill-${i}`}
            className={base + flash}
          >
            <span className="tier-duration">{tier.label}</span>
            <span className="tier-dot">·</span>
            <span className="tier-points">{tier.points}pt</span>
          </div>
        );
      })}
    </div>
  );
}
