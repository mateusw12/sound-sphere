"use client";

import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  FavoriteKind,
  type FavoriteItem,
  isFavorite,
  listFavorites,
  removeFavorite,
  upsertFavorite,
} from "@/lib/indexeddb";

type FavoritePayload = {
  kind: FavoriteKind;
  entityId: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
};

export function useFavorites() {
  const { data: session } = useSession();
  const owner = session?.user?.email ?? undefined;

  const cacheKey = `favorites:${owner ?? "guest"}`;
  const { data, isLoading, mutate } = useSWR<FavoriteItem[]>(cacheKey, () => listFavorites(owner));
  const items = useMemo(() => data ?? [], [data]);

  const toggleFavorite = useCallback(
    async (payload: FavoritePayload) => {
      const exists = await isFavorite(owner, payload.kind, payload.entityId);

      if (exists) {
        await removeFavorite(owner, payload.kind, payload.entityId);
      } else {
        await upsertFavorite(owner, {
          entityId: payload.entityId,
          kind: payload.kind,
          title: payload.title,
          subtitle: payload.subtitle,
          image: payload.image,
          href: payload.href,
        });
      }

      await mutate();
      return !exists;
    },
    [owner, mutate],
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
    refresh: mutate,
    toggleFavorite,
  };
}
