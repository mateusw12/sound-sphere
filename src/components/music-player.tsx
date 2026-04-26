"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/player-context";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    currentQueueId,
    queue,
    isPlaying,
    playFromQueue,
    removeFromQueue,
    clearPlaybackQueue,
    playNext,
    pause,
    resume,
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
        <button className="button ghost" type="button" onClick={playNext}>
          Proxima
        </button>
        <button className="button ghost" type="button" onClick={() => void clearPlaybackQueue()}>
          Limpar fila
        </button>
      </div>

      {queue.length > 0 ? (
        <div className="player-queue">
          {queue.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={item.id === currentQueueId ? "queue-item active" : "queue-item"}
            >
              <button type="button" className="queue-play" onClick={() => playFromQueue(item.id)}>
                {item.title}
              </button>
              <button
                type="button"
                className="queue-remove"
                onClick={() => void removeFromQueue(item.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="player-note">
        <p className="player-artist">A fila toca cada preview em sequencia automaticamente.</p>
      </div>
    </footer>
  );
}
