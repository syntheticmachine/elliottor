import { useEffect, useMemo, useRef, useState } from 'react';
import { SONGS, type Song } from '../data/songs';

type Props = {
  disabled?: boolean;
  onSelect: (song: Song) => void;
};

function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
}

export function SongDropdown({ disabled, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [selected, setSelected] = useState<Song | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SONGS;
    return SONGS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(song: Song) {
    setSelected(song);
    setQuery(song.title);
    setOpen(false);
  }

  function commit() {
    if (selected) {
      onSelect(selected);
      setSelected(null);
      setQuery('');
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && matches[highlight]) {
        pick(matches[highlight]);
      } else if (selected) {
        commit();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <div className="dropdown-row">
        <input
          ref={inputRef}
          className="dropdown-input"
          type="search"
          placeholder="What song is this?"
          value={query}
          disabled={disabled}
          // "one-time-code" is iOS's strongest AutoFill suppression. It tells
          // Safari this field is for a verification code, so the contact-
          // suggestion bar doesn't appear above the keyboard.
          autoComplete="one-time-code"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          inputMode="search"
          name="elliottor-guess"
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            // On mobile, scroll the input up to the top of the viewport so
            // the keyboard + dropdown have full vertical room below it.
            if (isMobileViewport() && inputRef.current) {
              const el = inputRef.current;
              window.setTimeout(() => {
                const rect = el.getBoundingClientRect();
                const targetTop = window.scrollY + rect.top - 16;
                window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
              }, 200);
            }
          }}
          onBlur={(e) => {
            // Don't scroll back if focus moved to the Guess button (sibling
            // inside the dropdown container) — let the click finish first.
            const next = e.relatedTarget as Node | null;
            if (next && containerRef.current?.contains(next)) return;
            if (isMobileViewport()) {
              window.setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 150);
            }
          }}
          onKeyDown={onKeyDown}
        />
        <button
          className="guess-btn"
          type="button"
          disabled={disabled || !selected}
          onClick={commit}
        >
          Guess
        </button>
      </div>
      {open && matches.length > 0 && (
        <ul className="dropdown-list">
          {matches.slice(0, 8).map((song, i) => (
            <li
              key={song.id}
              className={i === highlight ? 'active' : ''}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(song);
              }}
            >
              <span className="song-title">{song.title}</span>
              <span className="song-album">{song.album}</span>
            </li>
          ))}
        </ul>
      )}
      {open && matches.length === 0 && (
        <div className="dropdown-empty">No songs match.</div>
      )}
    </div>
  );
}
