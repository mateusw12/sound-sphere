import type { DeezerAlbum } from "@/lib/dto/album.dto";
import type { DeezerArtist } from "@/lib/dto/artist.dto";
import type { DeezerListResponse } from "@/lib/dto/list-response.dto";
import type { DeezerTrack } from "@/lib/dto/track.dto";

export type DeezerChartResponse = {
  tracks: DeezerListResponse<DeezerTrack>;
  artists: DeezerListResponse<DeezerArtist>;
  albums: DeezerListResponse<DeezerAlbum>;
};
