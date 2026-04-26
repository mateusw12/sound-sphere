import type { DeezerImageSet } from "@/lib/dto/image-set.dto";

export type DeezerPlaylist = DeezerImageSet & {
  id: number;
  title: string;
  picture_medium?: string;
  nb_tracks?: number;
};
