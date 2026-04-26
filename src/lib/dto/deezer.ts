export type DeezerImageSet = {
  cover?: string;
  cover_medium?: string;
  cover_big?: string;
  picture?: string;
  picture_medium?: string;
  picture_big?: string;
};

export type DeezerArtist = DeezerImageSet & {
  id: number;
  name: string;
  tracklist?: string;
  nb_fan?: number;
};

export type DeezerAlbum = DeezerImageSet & {
  id: number;
  title: string;
  release_date?: string;
  tracklist?: string;
  artist?: DeezerArtist;
};

export type DeezerTrack = {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  rank?: number;
  artist: DeezerArtist;
  album?: DeezerAlbum;
};

export type DeezerPlaylist = DeezerImageSet & {
  id: number;
  title: string;
  picture_medium?: string;
  nb_tracks?: number;
};

export type DeezerListResponse<T> = {
  data: T[];
  total?: number;
  next?: string;
};

export type DeezerChartResponse = {
  tracks: DeezerListResponse<DeezerTrack>;
  artists: DeezerListResponse<DeezerArtist>;
  albums: DeezerListResponse<DeezerAlbum>;
};
