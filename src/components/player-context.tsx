"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type PlayerTrack = {
  id: number;
  title: string;
  artist: string;
  preview: string;
};

type PlayerContextData = {
  currentTrack: PlayerTrack | null;
  isPlaying: boolean;
  playTrack: (track: PlayerTrack) => void;
  pause: () => void;
  resume: () => void;
};

const PlayerContext = createContext<PlayerContextData | undefined>(undefined);

export function PlayerProvider({ children }: PropsWithChildren) {
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const value = useMemo<PlayerContextData>(
    () => ({
      currentTrack,
      isPlaying,
      playTrack: (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
      resume: () => setIsPlaying(true),
    }),
    [currentTrack, isPlaying],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }

  return context;
}

export type { PlayerTrack };
