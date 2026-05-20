import { SONGS_PER_SESSION, type SongResult } from '../types';

type Props = {
  results: SongResult[];
};

export function SongDots({ results }: Props) {
  return (
    <div className="song-dots">
      {Array.from({ length: SONGS_PER_SESSION }, (_, i) => {
        const result = results[i];
        let cls = 'song-dot';
        if (result) cls += result.won ? ' done win' : ' done lose';
        else if (i === results.length) cls += ' current';
        return <span key={i} className={cls} aria-hidden />;
      })}
    </div>
  );
}
