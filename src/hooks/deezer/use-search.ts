"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { DeezerArtist, DeezerAlbum, DeezerListResponse, DeezerPlaylist, DeezerTrack } from "@/lib/dto";
import { SearchService } from "@/lib/services";

export function useSearchTracks(query: string) {
  const shouldFetch = query.trim().length > 1;
  return useSWR<DeezerListResponse<DeezerTrack>>(
    shouldFetch ? SearchService.tracks(query) : null,
    fetcher,
  );
}

export function useSearchArtists(query: string) {
  const shouldFetch = query.trim().length > 1;
  return useSWR<DeezerListResponse<DeezerArtist>>(
    shouldFetch ? SearchService.artists(query) : null,
    fetcher,
  );
}

export function useSearchAlbums(query: string) {
  const shouldFetch = query.trim().length > 1;
  return useSWR<DeezerListResponse<DeezerAlbum>>(
    shouldFetch ? SearchService.albums(query) : null,
    fetcher,
  );
}

export function useSearchPlaylists(query: string) {
  const shouldFetch = query.trim().length > 1;
  return useSWR<DeezerListResponse<DeezerPlaylist>>(
    shouldFetch ? SearchService.playlists(query) : null,
    fetcher,
  );
}

export function useTopPlaylists() {
  return useSWR<DeezerListResponse<DeezerPlaylist>>(SearchService.playlists("top"), fetcher);
}
