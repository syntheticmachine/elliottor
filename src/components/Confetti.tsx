import { useEffect, useMemo, useState, type CSSProperties } from 'react';

type Props = {
  count?: number;
  /** Longer = more dramatic. Default 1900ms. */
  durationMs?: number;
  /** Anchor: where particles emit from. */
  origin?: 'center' | 'top';
};

const PALETTE = [
  '#d8392c', // poster red
  '#b62b21', // deep red
  '#e8b340', // warm gold
  '#0a0a0a', // ink black
  '#f8efdb', // cream highlight
];

type Particle = {
  x: number; // px from origin
  y: number; // px from origin (positive = down)
  r: number; // rotation deg
  dur: number; // seconds
  delay: number;
  size: number;
  color: string;
  shape: 'rect' | 'square' | 'streak';
};

function makeParticles(n: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < n; i++) {
    // Burst outward from origin, biased upward initially, then gravity pulls
    // them down. Spread covers a 240° arc above the origin.
    const angle = (Math.random() * 280 - 230) * (Math.PI / 180); // mostly upward
    const force = 140 + Math.random() * 220;
    const dx = Math.cos(angle) * force;
    // Initial upward dy plus a gravity term (always positive)
    const initialDy = Math.sin(angle) * force;
    const gravity = 180 + Math.random() * 200;
    const dy = initialDy + gravity;

    const shapes: Particle['shape'][] = ['rect', 'square', 'streak'];

    out.push({
      x: dx,
      y: dy,
      r: (Math.random() - 0.5) * 1440,
      dur: 1.4 + Math.random() * 0.9,
      delay: Math.random() * 0.18,
      size: 6 + Math.random() * 6,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    });
  }
  return out;
}

export function Confetti({ count = 40, durationMs = 1900, origin = 'center' }: Props) {
  const [active, setActive] = useState(true);
  const particles = useMemo(() => makeParticles(count), [count]);

  useEffect(() => {
    const t = window.setTimeout(() => setActive(false), durationMs + 400);
    return () => window.clearTimeout(t);
  }, [durationMs]);

  if (!active) return null;

  const originClass = origin === 'top' ? 'confetti origin-top' : 'confetti origin-center';

  return (
    <div className={originClass} aria-hidden="true">
      {particles.map((p, i) => {
        const w = p.shape === 'streak' ? p.size * 0.4 : p.size;
        const h = p.shape === 'square' ? p.size : p.size * 1.4;
        const style: CSSProperties = {
          // CSS custom properties drive the keyframe
          ['--x' as string]: `${p.x}px`,
          ['--y' as string]: `${p.y}px`,
          ['--r' as string]: `${p.r}deg`,
          ['--dur' as string]: `${p.dur}s`,
          ['--delay' as string]: `${p.delay}s`,
          width: `${w}px`,
          height: `${h}px`,
          background: p.color,
          borderRadius: p.shape === 'square' ? '1px' : '1.5px',
        };
        return <span key={i} className="confetti-particle" style={style} />;
      })}
    </div>
  );
}
