"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { DeezerAlbum, DeezerListResponse, DeezerTrack } from "@/lib/dto";
import { AlbumService } from "@/lib/services";

export function useAlbum(id: string) {
  return useSWR<DeezerAlbum>(id ? AlbumService.byId(id) : null, fetcher);
}

export function useAlbumTracks(id: string) {
  return useSWR<DeezerListResponse<DeezerTrack>>(id ? AlbumService.tracks(id) : null, fetcher);
}
