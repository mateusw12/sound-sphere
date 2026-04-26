import type { DeezerImageSet } from "@/lib/dto/image-set.dto";
import type { DeezerArtist } from "@/lib/dto/artist.dto";

export type DeezerAlbum = DeezerImageSet & {
  id: number;
  title: string;
  release_date?: string;
  tracklist?: string;
  artist?: DeezerArtist;
};
