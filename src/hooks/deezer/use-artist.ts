"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { DeezerAlbum, DeezerArtist, DeezerListResponse, DeezerTrack } from "@/lib/dto";
import { ArtistService } from "@/lib/services";

export function useArtist(id: string) {
  return useSWR<DeezerArtist>(id ? ArtistService.byId(id) : null, fetcher);
}

export function useArtistTop(id: string) {
  return useSWR<DeezerListResponse<DeezerTrack>>(id ? ArtistService.top(id) : null, fetcher);
}

export function useArtistAlbums(id: string) {
  return useSWR<DeezerListResponse<DeezerAlbum>>(id ? ArtistService.albums(id) : null, fetcher);
}
