// Dev-only comparison page for vinyl design variants.
// Visit ?demo=vinyl in the URL to see this view instead of the game.

import './VinylDemo.css';

type Variant = {
  id: string;
  title: string;
  description: string;
  className: string;
  /** Extra inner elements unique to this variant. */
  extras?: React.ReactNode;
  /** Wrapping extras (e.g. EQ bars sitting next to the disc). */
  outerExtras?: React.ReactNode;
  /** Optional inline style override on the disk (e.g. label color). */
  diskStyle?: React.CSSProperties;
};

function Tonearm() {
  return (
    <svg className="vd-tonearm" viewBox="0 0 120 120" aria-hidden>
      {/* Pivot bracket - sits at upper right outside the disc */}
      <circle cx="100" cy="20" r="11" fill="#3a3530" />
      <circle cx="100" cy="20" r="6" fill="#d4cfc5" />
      <circle cx="100" cy="20" r="2.5" fill="#1a1714" />

      {/* Counterweight stub behind the pivot */}
      <line
        x1="100"
        y1="20"
        x2="115"
        y2="14"
        stroke="#8a8478"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="116" cy="13" r="5" fill="#3a3530" />

      {/* Main arm extending toward the disc */}
      <line
        x1="100"
        y1="20"
        x2="42"
        y2="78"
        stroke="#a6a098"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="20"
        x2="42"
        y2="78"
        stroke="#6a655d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Cartridge / head sitting on the disc */}
      <rect
        x="34"
        y="72"
        width="16"
        height="11"
        rx="1.5"
        fill="#1a1714"
        transform="rotate(-45 42 78)"
      />
    </svg>
  );
}

function ProgressRing() {
  return (
    <svg className="vd-ring" viewBox="0 0 100 100" aria-hidden>
      <circle
        className="vd-ring-track"
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="rgba(216, 57, 44, 0.18)"
        strokeWidth="2"
      />
      <circle
        className="vd-ring-fill"
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="#d8392c"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
      />
    </svg>
  );
}

function EqBars() {
  return (
    <div className="vd-eq" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="vd-eq-bar" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
  );
}

function CrackleParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + Math.random();
    const dist = 95 + Math.random() * 28;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    return (
      <span
        key={i}
        className="vd-crackle"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2.4 + Math.random() * 2}s`,
        }}
      />
    );
  });
  return <>{particles}</>;
}

function LightSweep() {
  return <div className="vd-sweep" aria-hidden />;
}

const VARIANTS: Variant[] = [
  {
    id: 'baseline',
    title: 'Current',
    description: 'What we have today',
    className: '',
  },
  {
    id: 'tonearm',
    title: '+ Tonearm',
    description: 'Classic record-player anatomy',
    className: 'has-tonearm',
    extras: <Tonearm />,
  },
  {
    id: 'ring',
    title: '+ Clip-progress ring',
    description: 'Shows how much clip time is left',
    className: 'has-ring',
    extras: <ProgressRing />,
  },
  {
    id: 'eq',
    title: '+ EQ bars',
    description: 'Pseudo-rhythm visualizer',
    className: 'has-eq',
    outerExtras: <EqBars />,
  },
  {
    id: 'crackle',
    title: '+ Crackle particles',
    description: 'Tiny floating dust',
    className: 'has-crackle',
    extras: <CrackleParticles />,
  },
  {
    id: 'sweep',
    title: '+ Light sweep',
    description: 'Highlight catches the disc',
    className: 'has-sweep',
    extras: <LightSweep />,
  },
  {
    id: 'label-xo',
    title: 'Album label · XO',
    description: 'Deep green label per album',
    className: 'has-album-label',
    diskStyle: { ['--label-color' as string]: '#1f5a3a' },
  },
  {
    id: 'label-figure8',
    title: 'Album label · Figure 8',
    description: 'Black label, red highlight',
    className: 'has-album-label label-figure8',
    diskStyle: { ['--label-color' as string]: '#0a0a0a' },
  },
  {
    id: 'full',
    title: '🥇 Full Player Kit',
    description: 'Tonearm + ring + smooth motor',
    className: 'has-tonearm has-ring has-smooth',
    extras: (
      <>
        <ProgressRing />
        <Tonearm />
      </>
    ),
  },
];

function VinylCard({ variant }: { variant: Variant }) {
  return (
    <div className="vd-card">
      <div className="vd-card-title">{variant.title}</div>
      <div className={`vd-stage ${variant.className}`}>
        <div className={`vd-disk-wrap`}>
          {variant.outerExtras}
          <div className="vd-disk" style={variant.diskStyle}>
            <span className="vd-disk-mark" />
            <span className="vd-disk-mark-sm" />
            {variant.extras}
          </div>
        </div>
      </div>
      <div className="vd-card-desc">{variant.description}</div>
    </div>
  );
}

export function VinylDemo() {
  return (
    <div className="vd-page">
      <header className="vd-header">
        <h1>Vinyl variants</h1>
        <p>
          All discs are spinning so you can see each effect live. Pick favourites
          — they can be combined. Reply with the variant titles you want me to
          ship.
        </p>
        <p className="vd-back">
          <a href="/">← back to the game</a>
        </p>
      </header>

      <div className="vd-grid">
        {VARIANTS.map((v) => (
          <VinylCard key={v.id} variant={v} />
        ))}
      </div>
    </div>
  );
}
