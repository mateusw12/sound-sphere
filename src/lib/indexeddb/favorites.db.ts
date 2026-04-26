import { FavoritesRepository } from "@/lib/indexeddb/repositories/favorites.repository";
import type {
  FavoriteUpsertPayload,
} from "@/lib/indexeddb/types/favorites.types";
import { FavoriteKind } from "../enum";

export async function upsertFavorite(
  owner: string | undefined,
  payload: FavoriteUpsertPayload,
) {
  await FavoritesRepository.upsert(owner, payload);
}

export async function removeFavorite(
  owner: string | undefined,
  kind: FavoriteKind,
  entityId: string | number,
) {
  await FavoritesRepository.remove(owner, kind, entityId);
}

export async function listFavorites(owner: string | undefined) {
  return await FavoritesRepository.list(owner);
}

export async function isFavorite(
  owner: string | undefined,
  kind: FavoriteKind,
  entityId: string | number,
) {
  return await FavoritesRepository.exists(owner, kind, entityId);
}
