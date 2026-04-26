import type { DeezerImageSet } from "@/lib/dto/image-set.dto";

export type DeezerArtist = DeezerImageSet & {
  id: number;
  name: string;
  tracklist?: string;
  nb_fan?: number;
};
