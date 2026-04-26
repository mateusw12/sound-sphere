"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayer } from "@/components/player-context";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    currentTrack,
    queue,
    isPlaying,
    clearPlaybackQueue,
    playNext,
    pause,
    resume,
    stop,
  } = usePlayer();

  const safeDuration = duration > 0 ? duration : 30;
  const safeCurrentTime = Math.min(currentTime, safeDuration);

  const progress = useMemo(() => {
    if (!safeDuration || Number.isNaN(safeDuration)) {
      return 0;
    }

    return Math.min(100, (safeCurrentTime / safeDuration) * 100);
  }, [safeCurrentTime, safeDuration]);

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value < 0) {
      return "0:00";
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const onSeek = (value: number) => {
    const audio = audioRef.current;

    if (!audio || Number.isNaN(value)) {
      return;
    }

    const next = Math.min(Math.max(value, 0), safeDuration);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    if (!currentTrack?.preview) {
      audio.pause();
      return;
    }

    if (audio.src !== currentTrack.preview) {
      audio.src = currentTrack.preview;
      audio.currentTime = 0;
    }

    if (isPlaying) {
      void audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.onended = null;
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 30);
    };

    audio.onended = () => playNext();

    return () => {
      audio.ontimeupdate = null;
      audio.onloadedmetadata = null;
      audio.onended = null;
    };
  }, [playNext]);

  if (!currentTrack) {
    return (
      <footer className="player-shell">
        <div>
          <p className="player-empty">Selecione uma faixa para ouvir preview de 30 segundos.</p>
          <p className="player-artist">A Deezer limita streaming completo; a fila toca o preview de cada faixa.</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      {!isExpanded ? (
        <button
          type="button"
          className="floating-now-playing"
          onClick={() => setIsExpanded(true)}
          aria-label="Abrir player"
          title="Abrir player"
        >
          <span className="floating-dot" aria-hidden />
          <span className="floating-track-text">
            <strong>{currentTrack.title}</strong>
            <small>{currentTrack.artist}</small>
          </span>
        </button>
      ) : null}

      <aside className={isExpanded ? "floating-player open" : "floating-player"}>
        <div className="floating-player-head">
          <div className="player-left compact">
            <p className="player-title">{currentTrack.title}</p>
            <p className="player-artist">{currentTrack.artist}</p>
          </div>
          <button
            type="button"
            className="icon-button subtle"
            onClick={() => setIsExpanded(false)}
            aria-label="Minimizar player"
            title="Minimizar player"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <label className="sr-only" htmlFor="player-seek">
          Progresso da musica atual
        </label>
        <input
          id="player-seek"
          type="range"
          className="player-progress-slider"
          min={0}
          max={safeDuration}
          step={0.1}
          value={safeCurrentTime}
          onChange={(event) => onSeek(Number(event.target.value))}
          style={{
            background: `linear-gradient(90deg, #1ed760 ${progress}%, color-mix(in srgb, var(--surface-elevated) 72%, transparent) ${progress}%)`,
          }}
          aria-label="Progresso da musica atual"
        />
        <div className="player-time-row">
          <span>{formatTime(safeCurrentTime)}</span>
          <span>{formatTime(safeDuration)}</span>
        </div>

        <div className="player-actions spotify-like">
          <button
            className="icon-button"
            type="button"
            onClick={isPlaying ? pause : resume}
            aria-label={isPlaying ? "Pausar" : "Tocar"}
            title={isPlaying ? "Pausar" : "Tocar"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="6" y="5" width="3" height="10" rx="1" fill="currentColor" />
                <rect x="11" y="5" width="3" height="10" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M7 5L15 10L7 15V5Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button className="icon-button" type="button" onClick={stop} aria-label="Parar" title="Parar">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="6" y="6" width="8" height="8" rx="1.3" fill="currentColor" />
            </svg>
          </button>
          <button className="icon-button" type="button" onClick={playNext} aria-label="Proxima" title="Proxima">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M5 5L12 10L5 15V5Z" fill="currentColor" />
              <path d="M12 5L19 10L12 15V5Z" fill="currentColor" />
            </svg>
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => void clearPlaybackQueue()}
            aria-label="Limpar fila"
            title="Limpar fila"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 6H16M7 6V15M10 6V15M13 6V15M6 6L7 4H13L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {queue.length > 0 ? <p className="player-artist">Fila: {queue.length} itens</p> : null}
      </aside>
    </>
  );
}
