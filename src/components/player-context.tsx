"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  addQueueTrack,
  clearQueue,
  listQueue,
  reorderQueue,
  removeQueueTrack,
  type QueueTrack,
} from "@/lib/indexeddb";
import { useIndexedDbCollection } from "@/hooks/indexeddb";

type PlayerTrack = {
  id: number;
  title: string;
  artist: string;
  preview: string;
  image?: string;
};

type PlayerContextData = {
  currentTrack: PlayerTrack | null;
  currentQueueId: string | null;
  queue: QueueTrack[];
  queueLoading: boolean;
  isPlaying: boolean;
  playTrack: (track: PlayerTrack) => void;
  addToQueue: (track: PlayerTrack) => Promise<void>;
  playFromQueue: (queueId: string) => void;
  removeFromQueue: (queueId: string) => Promise<void>;
  reorderPlaybackQueue: (orderedIds: string[]) => Promise<void>;
  clearPlaybackQueue: () => Promise<void>;
  playNext: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerContextData | undefined>(undefined);

export function PlayerProvider({ children }: PropsWithChildren) {
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [currentQueueId, setCurrentQueueId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { items: queue, isLoading, runAndRefresh } = useIndexedDbCollection<QueueTrack>({
    namespace: "player-queue",
    list: listQueue,
  });

  const toPlayerTrack = (item: QueueTrack): PlayerTrack => ({
    id: item.trackId,
    title: item.title,
    artist: item.artist,
    preview: item.preview,
    image: item.image,
  });

  const value = useMemo<PlayerContextData>(
    () => ({
      currentTrack,
      currentQueueId,
      queue,
      queueLoading: isLoading,
      isPlaying,
      playTrack: (track) => {
        setCurrentTrack(track);
        setCurrentQueueId(null);
        setIsPlaying(true);
      },
      addToQueue: async (track) => {
        if (!track.preview) {
          return;
        }

        await runAndRefresh(async (owner) => {
          await addQueueTrack(owner, {
            trackId: track.id,
            title: track.title,
            artist: track.artist,
            preview: track.preview,
            image: track.image,
          });
        });
      },
      playFromQueue: (queueId) => {
        const item = queue.find((entry) => entry.id === queueId);
        if (!item) {
          return;
        }

        setCurrentTrack(toPlayerTrack(item));
        setCurrentQueueId(item.id);
        setIsPlaying(true);
      },
      removeFromQueue: async (queueId) => {
        await runAndRefresh(async () => {
          await removeQueueTrack(queueId);
        });

        if (queueId === currentQueueId) {
          setCurrentQueueId(null);
        }
      },
      reorderPlaybackQueue: async (orderedIds) => {
        await runAndRefresh(async (owner) => {
          await reorderQueue(owner, orderedIds);
        });
      },
      clearPlaybackQueue: async () => {
        await runAndRefresh(async (owner) => {
          await clearQueue(owner);
        });
        setCurrentQueueId(null);
      },
      playNext: () => {
        if (queue.length === 0) {
          setCurrentQueueId(null);
          setIsPlaying(false);
          return;
        }

        if (!currentQueueId) {
          const first = queue[0];
          setCurrentTrack(toPlayerTrack(first));
          setCurrentQueueId(first.id);
          setIsPlaying(true);
          return;
        }

        const index = queue.findIndex((entry) => entry.id === currentQueueId);
        const next = queue[index + 1];

        if (!next) {
          setCurrentQueueId(null);
          setIsPlaying(false);
          return;
        }

        setCurrentTrack(toPlayerTrack(next));
        setCurrentQueueId(next.id);
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
      resume: () => setIsPlaying(true),
      stop: () => {
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentQueueId(null);
      },
    }),
    [currentTrack, currentQueueId, isLoading, isPlaying, queue, runAndRefresh],
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
