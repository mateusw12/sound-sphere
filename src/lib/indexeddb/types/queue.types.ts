export type QueueTrack = {
  id: string;
  trackId: number;
  title: string;
  artist: string;
  preview: string;
  image?: string;
  owner?: string;
  createdAt: number;
  position?: number;
};

export type QueueTrackPayload = {
  trackId: number;
  title: string;
  artist: string;
  preview: string;
  image?: string;
};
