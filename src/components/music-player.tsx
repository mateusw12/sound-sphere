"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/player-context";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

    audio.onended = () => playNext();

    return () => {
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
    <footer className="player-shell">
      <div className="player-left">
        <p className="player-title">{currentTrack.title}</p>
        <p className="player-artist">{currentTrack.artist}</p>
        {queue.length > 0 ? <p className="player-artist">Fila: {queue.length} itens</p> : null}
      </div>
      <div className="player-actions">
        <button className="button" type="button" onClick={isPlaying ? pause : resume}>
          {isPlaying ? "Pausar" : "Tocar"}
        </button>
        <button className="button ghost" type="button" onClick={stop}>
          Parar
        </button>
        <button className="button ghost" type="button" onClick={playNext}>
          Proxima
        </button>
        <button className="button ghost" type="button" onClick={() => void clearPlaybackQueue()}>
          Limpar fila
        </button>
      </div>

      <div className="player-note">
        <p className="player-artist">A fila toca cada preview em sequencia automaticamente.</p>
      </div>
    </footer>
  );
}
