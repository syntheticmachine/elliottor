import { MAX_POINTS_PER_SESSION, TIERS, type SongResult } from '../types';
import { findSongById, type GameMode } from '../data/songs';

// Square per song, color-coded by points earned:
//   3pt (1.5s win) → 🟩 green
//   2pt (3s win)   → 🟨 yellow
//   1pt (5s win)   → 🟧 orange
//   0pt (missed)   → ⬛ black
function squareFor(result: SongResult): string {
  if (!result.won) return '⬛';
  if (result.points === TIERS[0].points) return '🟩';
  if (result.points === TIERS[1].points) return '🟨';
  return '🟧';
}

export function buildSessionShare(
  results: SongResult[],
  mode: GameMode = 'normal',
): string {
  const totalPoints = results.reduce((s, r) => s + r.points, 0);
  const modeTag = mode === 'hard' ? ' Hard' : '';
  const header = `Elliottor${modeTag} ${totalPoints}/${MAX_POINTS_PER_SESSION}`;
  const lines = results.map((r) => {
    const title = findSongById(r.songId)?.title ?? '?';
    return `${squareFor(r)} ${title}`;
  });
  return `${header}\n${lines.join('\n')}\nhttps://elliottor.com`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
