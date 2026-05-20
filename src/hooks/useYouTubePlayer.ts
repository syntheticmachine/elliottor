import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';
import { loadYouTubeAPI, type YTPlayer } from '../lib/youtube';

type PlayerStatus = 'loading' | 'ready';

export function useYouTubePlayer(hostRef: RefObject<HTMLElement | null>) {
  const playerRef = useRef<YTPlayer | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const loadedIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<PlayerStatus>('loading');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;

    const mountTarget = document.createElement('div');
    host.appendChild(mountTarget);

    loadYouTubeAPI().then((YT) => {
      if (cancelled) {
        mountTarget.remove();
        return;
      }
      playerRef.current = new YT.Player(mountTarget, {
        height: '0',
        width: '0',
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            playerRef.current?.setVolume(80);
            setStatus('ready');
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setIsPlaying(true);
            else if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            )
              setIsPlaying(false);
          },
          onError: (e) => {
            // Per-video errors (100=not found, 101/150=embed disabled, 5=HTML5 error)
            // don't break the player — they just mean this specific video failed.
            // Reset the loaded ID so the next attempt re-loads instead of seeking.
            // eslint-disable-next-line no-console
            console.warn('[YouTube] video error', e.data);
            loadedIdRef.current = null;
            setIsPlaying(false);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (stopTimeoutRef.current != null) {
        window.clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      try {
        playerRef.current?.destroy();
      } catch {
        // already torn down
      }
      playerRef.current = null;
      loadedIdRef.current = null;
      while (host.firstChild) host.removeChild(host.firstChild);
    };
  }, [hostRef]);

  const loadAndPause = useCallback((videoId: string, startSeconds: number) => {
    const player = playerRef.current;
    if (!player) return;
    if (loadedIdRef.current === videoId) return;
    loadedIdRef.current = videoId;
    player.cueVideoById({ videoId, startSeconds });
  }, []);

  const playClip = useCallback(
    (videoId: string, startSeconds: number, durationMs: number) => {
      const player = playerRef.current;
      if (!player) return;
      if (stopTimeoutRef.current != null) {
        window.clearTimeout(stopTimeoutRef.current);
      }
      if (loadedIdRef.current !== videoId) {
        // First play of this video — full load.
        player.loadVideoById({ videoId, startSeconds });
        loadedIdRef.current = videoId;
      } else {
        // Replay: just seek and play. Avoids a full reload that can trigger
        // transient HTML5 errors during a session.
        player.seekTo(startSeconds, true);
        player.playVideo();
      }
      stopTimeoutRef.current = window.setTimeout(() => {
        player.pauseVideo();
        player.seekTo(startSeconds, true);
        stopTimeoutRef.current = null;
      }, durationMs);
    },
    [],
  );

  const stop = useCallback(() => {
    if (stopTimeoutRef.current != null) {
      window.clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    playerRef.current?.pauseVideo();
  }, []);

  return { status, isPlaying, loadAndPause, playClip, stop };
}
