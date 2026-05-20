import { TIERS } from '../types';

type Props = {
  currentTier: number;
};

export function TierPills({ currentTier }: Props) {
  return (
    <div className="tier-pills">
      {TIERS.map((tier, i) => {
        const isCurrent = i === currentTier;
        const isPast = i < currentTier;
        const cls = isCurrent
          ? 'tier-pill current'
          : isPast
            ? 'tier-pill past'
            : 'tier-pill upcoming';
        return (
          <div key={i} className={cls}>
            <span className="tier-duration">{tier.label}</span>
            <span className="tier-dot">·</span>
            <span className="tier-points">{tier.points}pt</span>
          </div>
        );
      })}
    </div>
  );
}
