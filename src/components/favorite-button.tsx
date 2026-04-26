"use client";

import { useMemo } from "react";
import { useFavorites } from "@/hooks/favorites/use-favorites";
import type { FavoriteKind } from "@/lib/indexeddb";

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
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      title={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
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
      {props.compact ? (
        active ? (
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M10 15.7L4.4 10.6C2.9 9.3 2.8 7 4.1 5.5C5.4 4 7.6 3.9 9.1 5.2L10 6L10.9 5.2C12.4 3.9 14.6 4 15.9 5.5C17.2 7 17.1 9.3 15.6 10.6L10 15.7Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M10 15.7L4.4 10.6C2.9 9.3 2.8 7 4.1 5.5C5.4 4 7.6 3.9 9.1 5.2L10 6L10.9 5.2C12.4 3.9 14.6 4 15.9 5.5C17.2 7 17.1 9.3 15.6 10.6L10 15.7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M10 7.2V10.8M8.2 9H11.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )
      ) : active ? (
        "Favoritado"
      ) : (
        "Favoritar"
      )}
    </button>
  );
}
