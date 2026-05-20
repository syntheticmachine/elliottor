import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';
import { loadYouTubeAPI, type YTPlayer } from '../lib/youtube';

type PlayerStatus = 'loading' | 'ready';

export function useYouTubePlayer(hostRef: RefObject<HTMLElement | null>) {
  const playerRef = useRef<YTPlayer | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const loadedIdRef = useRef<string | null>(null);
  // Duration the user requested for the current play. The stop timeout only
  // starts once we observe the player actually entering the PLAYING state,
  // so the user always gets the full clip duration even when buffering or
  // initial load takes a moment.
  const pendingStopMsRef = useRef<number | null>(null);
  const pendingStartSecondsRef = useRef<number>(0);
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
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              // If there's a pending stop request, start the timer now
              // (i.e. measure clip duration from when audio actually starts).
              if (pendingStopMsRef.current != null) {
                const ms = pendingStopMsRef.current;
                const startSec = pendingStartSecondsRef.current;
                pendingStopMsRef.current = null;
                if (stopTimeoutRef.current != null) {
                  window.clearTimeout(stopTimeoutRef.current);
                }
                stopTimeoutRef.current = window.setTimeout(() => {
                  playerRef.current?.pauseVideo();
                  playerRef.current?.seekTo(startSec, true);
                  stopTimeoutRef.current = null;
                }, ms);
              }
            } else if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
          onError: (e) => {
            // Per-video errors (100 = not found, 101/150 = embed disabled,
            // 5 = HTML5 hiccup) don't break the player. Reset loadedId so
            // the next attempt re-loads instead of seeking, and drop any
            // pending stop so the UI doesn't hang waiting for PLAYING.
            // eslint-disable-next-line no-console
            console.warn('[YouTube] video error', e.data);
            loadedIdRef.current = null;
            pendingStopMsRef.current = null;
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
      pendingStopMsRef.current = null;
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
    // Cue the video so the player has the right thumbnail / metadata ready,
    // but DON'T mark it as `loaded` in our ref. cueVideoById only preloads
    // the thumbnail — it doesn't fetch the actual video data. If we treated
    // it as loaded, the next playClip would take the seek+play branch on a
    // not-yet-fetched video, which on mobile (iOS especially) results in
    // the first click producing no audio. Leaving loadedIdRef null means
    // the first play always goes through loadVideoById, which is the call
    // that actually fetches and starts the video while preserving the
    // user-gesture context.
    player.cueVideoById({ videoId, startSeconds });
  }, []);

  const playClip = useCallback(
    (videoId: string, startSeconds: number, durationMs: number) => {
      const player = playerRef.current;
      if (!player) return;
      if (stopTimeoutRef.current != null) {
        window.clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      // Remember the duration + start position. The PLAYING state-change
      // handler will set the stop timer once audio actually begins.
      pendingStopMsRef.current = durationMs;
      pendingStartSecondsRef.current = startSeconds;

      if (loadedIdRef.current !== videoId) {
        // First play of this video — full load.
        player.loadVideoById({ videoId, startSeconds });
        loadedIdRef.current = videoId;
      } else {
        // Subsequent play — seek to start.
        player.seekTo(startSeconds, true);
      }
      // Always call playVideo() synchronously within the user-gesture
      // handler. loadVideoById's implicit autoplay is async and iOS Safari
      // doesn't always honour it as a user gesture, leaving the player
      // stuck on the first click. Calling playVideo() here is either
      // redundant (no-op) or the action that actually unblocks audio.
      player.playVideo();
    },
    [],
  );

  const stop = useCallback(() => {
    if (stopTimeoutRef.current != null) {
      window.clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    pendingStopMsRef.current = null;
    playerRef.current?.pauseVideo();
  }, []);

  return { status, isPlaying, loadAndPause, playClip, stop };
}
