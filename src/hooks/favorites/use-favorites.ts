"use client";

import { useCallback, useMemo } from "react";
import {
  isFavorite,
  listFavorites,
  removeFavorite,
  upsertFavorite,
} from "@/lib/indexeddb";
import { FavoriteKind } from "@/lib/enum";
import type { FavoriteItem } from "@/lib/indexeddb/types";
import { useIndexedDbCollection } from "@/hooks/indexeddb";

type FavoritePayload = {
  kind: FavoriteKind;
  entityId: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
};

export function useFavorites() {
  const { owner, items, isLoading, refresh, runAndRefresh } =
    useIndexedDbCollection<FavoriteItem>({
      namespace: "favorites",
      list: listFavorites,
    });

  const toggleFavorite = useCallback(
    async (payload: FavoritePayload) => {
      return await runAndRefresh(async (currentOwner) => {
        const exists = await isFavorite(
          currentOwner,
          payload.kind,
          payload.entityId,
        );

        if (exists) {
          await removeFavorite(currentOwner, payload.kind, payload.entityId);
        } else {
          await upsertFavorite(currentOwner, {
            entityId: payload.entityId,
            kind: payload.kind,
            title: payload.title,
            subtitle: payload.subtitle,
            image: payload.image,
            href: payload.href,
          });
        }

        return !exists;
      });
    },
    [runAndRefresh],
  );

  const groups = useMemo(
    () => ({
      tracks: items.filter((item) => item.kind === FavoriteKind.Track),
      artists: items.filter((item) => item.kind === FavoriteKind.Artist),
      albums: items.filter((item) => item.kind === FavoriteKind.Album),
      playlists: items.filter((item) => item.kind === FavoriteKind.Playlist),
    }),
    [items],
  );

  return {
    owner,
    items,
    groups,
    loading: isLoading,
    refresh,
    toggleFavorite,
  };
}
