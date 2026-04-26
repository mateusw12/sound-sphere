"use client";

import { useMemo } from "react";
import { useFavorites } from "@/hooks/favorites/use-favorites";
import type { FavoriteKind } from "@/lib/indexeddb/favorites.db";

type FavoriteButtonProps = {
  kind: FavoriteKind;
  entityId: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
  compact?: boolean;
};

export function FavoriteButton(props: FavoriteButtonProps) {
  const { items, toggleFavorite } = useFavorites();

  const active = useMemo(
    () => items.some((item) => item.kind === props.kind && item.entityId === String(props.entityId)),
    [items, props.entityId, props.kind],
  );

  return (
    <button
      type="button"
      className={
        active
          ? props.compact
            ? "button ghost compact active"
            : "button ghost active"
          : props.compact
            ? "button ghost compact"
            : "button ghost"
      }
      onClick={() => {
        void toggleFavorite({
          kind: props.kind,
          entityId: props.entityId,
          title: props.title,
          subtitle: props.subtitle,
          image: props.image,
          href: props.href,
        });
      }}
    >
      {props.compact ? (active ? "Fav" : "+Fav") : active ? "Favoritado" : "Favoritar"}
    </button>
  );
}
