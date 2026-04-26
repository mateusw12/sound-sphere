"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/player-context";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, pause, resume } = usePlayer();

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

    audio.onended = () => pause();

    return () => {
      audio.onended = null;
    };
  }, [pause]);

  if (!currentTrack) {
    return (
      <footer className="player-shell">
        <p className="player-empty">Selecione uma faixa para ouvir preview de 30 segundos.</p>
      </footer>
    );
  }

  return (
    <footer className="player-shell">
      <div>
        <p className="player-title">{currentTrack.title}</p>
        <p className="player-artist">{currentTrack.artist}</p>
      </div>
      <div className="player-actions">
        <button className="button" type="button" onClick={isPlaying ? pause : resume}>
          {isPlaying ? "Pausar" : "Tocar"}
        </button>
      </div>
    </footer>
  );
}
