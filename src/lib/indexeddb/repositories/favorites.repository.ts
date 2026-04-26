import { openAppDatabase } from "@/lib/indexeddb/core/database";
import { STORES } from "@/lib/indexeddb/core/schema";
import { normalizeOwner } from "@/lib/indexeddb/core/owner";
import type {
  FavoriteItem,
  FavoriteUpsertPayload,
} from "@/lib/indexeddb/types/favorites.types";
import { FavoriteKind } from "@/lib/enum";

function key(
  owner: string | undefined,
  kind: FavoriteKind,
  entityId: string | number,
) {
  return `${normalizeOwner(owner)}:${kind}:${entityId}`;
}

export class FavoritesRepository {
  static async upsert(
    owner: string | undefined,
    payload: FavoriteUpsertPayload,
  ) {
    const db = await openAppDatabase();
    const item: FavoriteItem = {
      entityId: String(payload.entityId),
      kind: payload.kind,
      title: payload.title,
      subtitle: payload.subtitle,
      image: payload.image,
      href: payload.href,
      owner,
      id: key(owner, payload.kind, payload.entityId),
      createdAt: Date.now(),
    };

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.favorites, "readwrite");
      tx.objectStore(STORES.favorites).put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  static async remove(
    owner: string | undefined,
    kind: FavoriteKind,
    entityId: string | number,
  ) {
    const db = await openAppDatabase();
    const itemKey = key(owner, kind, entityId);

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.favorites, "readwrite");
      tx.objectStore(STORES.favorites).delete(itemKey);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  static async list(owner: string | undefined) {
    const db = await openAppDatabase();

    return await new Promise<FavoriteItem[]>((resolve, reject) => {
      const tx = db.transaction(STORES.favorites, "readonly");
      const request = tx.objectStore(STORES.favorites).getAll();

      request.onsuccess = () => {
        const currentOwner = normalizeOwner(owner);
        const rows = (request.result as FavoriteItem[]).filter(
          (item) => currentOwner === normalizeOwner(item.owner),
        );
        resolve(rows.sort((a, b) => b.createdAt - a.createdAt));
      };

      request.onerror = () => reject(request.error);
    });
  }

  static async exists(
    owner: string | undefined,
    kind: FavoriteKind,
    entityId: string | number,
  ) {
    const db = await openAppDatabase();
    const itemKey = key(owner, kind, entityId);

    return await new Promise<boolean>((resolve, reject) => {
      const tx = db.transaction(STORES.favorites, "readonly");
      const request = tx.objectStore(STORES.favorites).get(itemKey);
      request.onsuccess = () => resolve(Boolean(request.result));
      request.onerror = () => reject(request.error);
    });
  }
}
