import { type Song } from '../data/songs';
import { type SongResult } from '../types';

type Props = {
  song: Song;
  result: SongResult;
  isLast: boolean;
  onNext: () => void;
};

export function SongResultCard({ song, result, isLast, onNext }: Props) {
  return (
    <div className="song-result">
      <div className={result.won ? 'result-banner win' : 'result-banner lose'}>
        {result.won ? `+${result.points} pt${result.points === 1 ? '' : 's'}` : 'Missed'}
      </div>
      <div className="result-song">
        <div className="result-song-title">{song.title}</div>
        <div className="result-song-album">{song.album}</div>
      </div>

      <button className="primary-btn" onClick={onNext}>
        {isLast ? 'See results' : 'Next song'}
      </button>
    </div>
  );
}
