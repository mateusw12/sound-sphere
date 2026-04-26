"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  addQueueTrack,
  clearQueue,
  listQueue,
  removeQueueTrack,
  type QueueTrack,
} from "@/lib/indexeddb/queue.db";

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
  clearPlaybackQueue: () => Promise<void>;
  playNext: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerContextData | undefined>(undefined);

export function PlayerProvider({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const owner = session?.user?.email ?? undefined;

  const [currentTrack, setCurrentTrack] = useState<PlayerTrack | null>(null);
  const [currentQueueId, setCurrentQueueId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const queueKey = `player-queue:${owner ?? "guest"}`;
  const { data, isLoading, mutate } = useSWR<QueueTrack[]>(queueKey, () => listQueue(owner));
  const queue = useMemo(() => data ?? [], [data]);

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

        await addQueueTrack(owner, {
          trackId: track.id,
          title: track.title,
          artist: track.artist,
          preview: track.preview,
          image: track.image,
        });

        await mutate();
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
        await removeQueueTrack(queueId);

        if (queueId === currentQueueId) {
          setCurrentQueueId(null);
        }

        await mutate();
      },
      clearPlaybackQueue: async () => {
        await clearQueue(owner);
        setCurrentQueueId(null);
        await mutate();
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
    [currentTrack, currentQueueId, isLoading, isPlaying, mutate, owner, queue],
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
