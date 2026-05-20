import { type Song } from '../data/songs';
import { type SongResult, TIERS } from '../types';

type Props = {
  song: Song;
  result: SongResult;
  isLast: boolean;
  onNext: () => void;
};

function tierLabelForPoints(points: number): string | null {
  const tier = TIERS.find((t) => t.points === points);
  return tier ? tier.label : null;
}

export function SongResultCard({ song, result, isLast, onNext }: Props) {
  const tierLabel = result.won ? tierLabelForPoints(result.points) : null;

  return (
    <div className="song-result enter-pop">
      <div className={result.won ? 'result-banner win' : 'result-banner lose'}>
        {result.won
          ? `+${result.points} pt${result.points === 1 ? '' : 's'}`
          : 'Missed'}
      </div>

      <div className="result-song">
        <div className="result-song-title">{song.title}</div>
        <div className="result-song-album">{song.album}</div>
      </div>

      {result.won && tierLabel && (
        <div className="result-tag">Got it on the {tierLabel} clip</div>
      )}

      <button className="primary-btn enter-pop-delay" onClick={onNext} autoFocus>
        {isLast ? 'See results' : 'Next song →'}
      </button>
    </div>
  );
}
