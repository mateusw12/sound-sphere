import { openAppDatabase } from "@/lib/indexeddb/core/database";
import { normalizeOwner } from "@/lib/indexeddb/core/owner";
import { STORES } from "@/lib/indexeddb/core/schema";
import type { QueueTrack, QueueTrackPayload } from "@/lib/indexeddb/types/queue.types";

function key(owner: string | undefined, trackId: number, createdAt: number) {
  return `${normalizeOwner(owner)}:queue:${trackId}:${createdAt}`;
}

function sortQueue(rows: QueueTrack[]) {
  return rows.sort((a, b) => {
    const left = a.position ?? Number.MAX_SAFE_INTEGER;
    const right = b.position ?? Number.MAX_SAFE_INTEGER;

    if (left !== right) {
      return left - right;
    }

    return a.createdAt - b.createdAt;
  });
}

export class QueueRepository {
  static async add(owner: string | undefined, payload: QueueTrackPayload) {
    const db = await openAppDatabase();
    const createdAt = Date.now();
    const existing = await this.list(owner);

    const item: QueueTrack = {
      id: key(owner, payload.trackId, createdAt),
      trackId: payload.trackId,
      title: payload.title,
      artist: payload.artist,
      preview: payload.preview,
      image: payload.image,
      owner,
      createdAt,
      position: existing.length + 1,
    };

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.queue, "readwrite");
      tx.objectStore(STORES.queue).put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  static async list(owner: string | undefined) {
    const db = await openAppDatabase();

    return await new Promise<QueueTrack[]>((resolve, reject) => {
      const tx = db.transaction(STORES.queue, "readonly");
      const request = tx.objectStore(STORES.queue).getAll();

      request.onsuccess = () => {
        const currentOwner = normalizeOwner(owner);
        const rows = (request.result as QueueTrack[]).filter(
          (item) => currentOwner === normalizeOwner(item.owner),
        );
        resolve(sortQueue(rows));
      };

      request.onerror = () => reject(request.error);
    });
  }

  static async remove(queueId: string) {
    const db = await openAppDatabase();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.queue, "readwrite");
      tx.objectStore(STORES.queue).delete(queueId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  static async clear(owner: string | undefined) {
    const tracks = await this.list(owner);
    const db = await openAppDatabase();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.queue, "readwrite");
      const store = tx.objectStore(STORES.queue);
      tracks.forEach((item) => store.delete(item.id));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  static async reorder(owner: string | undefined, orderedIds: string[]) {
    const tracks = await this.list(owner);
    const byId = new Map(tracks.map((item) => [item.id, item]));
    const db = await openAppDatabase();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.queue, "readwrite");
      const store = tx.objectStore(STORES.queue);

      orderedIds.forEach((id, index) => {
        const item = byId.get(id);
        if (!item) {
          return;
        }

        store.put({
          ...item,
          position: index + 1,
        });
      });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}
