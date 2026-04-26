"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { DeezerListResponse, DeezerPlaylist, DeezerTrack } from "@/lib/dto";
import { PlaylistService } from "@/lib/services";

export function usePlaylist(id: string) {
  return useSWR<DeezerPlaylist>(id ? PlaylistService.byId(id) : null, fetcher);
}

export function usePlaylistTracks(id: string) {
  return useSWR<DeezerListResponse<DeezerTrack>>(
    id ? PlaylistService.tracks(id) : null,
    fetcher,
  );
}