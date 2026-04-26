import type { DeezerAlbum } from "@/lib/dto/album.dto";
import type { DeezerArtist } from "@/lib/dto/artist.dto";

export type DeezerTrack = {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  rank?: number;
  artist: DeezerArtist;
  album?: DeezerAlbum;
};
