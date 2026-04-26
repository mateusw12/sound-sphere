export type FavoriteKind = "track" | "artist" | "album" | "playlist";

export type FavoriteItem = {
  id: string;
  entityId: string;
  kind: FavoriteKind;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
  owner?: string;
  createdAt: number;
};

const DB_NAME = "soundsphere-db";
const DB_VERSION = 1;
const STORE = "favorites";

async function openDB() {
  return await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("by-kind", "kind", { unique: false });
        store.createIndex("by-owner", "owner", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function key(owner: string | undefined, kind: FavoriteKind, entityId: string | number) {
  return `${owner ?? "guest"}:${kind}:${entityId}`;
}

export async function upsertFavorite(
  owner: string | undefined,
  payload: {
    entityId: string | number;
    kind: FavoriteKind;
    title: string;
    subtitle?: string;
    image?: string;
    href?: string;
  },
) {
  const db = await openDB();
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
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function removeFavorite(owner: string | undefined, kind: FavoriteKind, entityId: string | number) {
  const db = await openDB();
  const itemKey = key(owner, kind, entityId);

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(itemKey);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function listFavorites(owner: string | undefined) {
  const db = await openDB();

  return await new Promise<FavoriteItem[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();

    request.onsuccess = () => {
      const rows = (request.result as FavoriteItem[]).filter((item) => (owner ?? "guest") === (item.owner ?? "guest"));
      resolve(rows.sort((a, b) => b.createdAt - a.createdAt));
    };

    request.onerror = () => reject(request.error);
  });
}

export async function isFavorite(owner: string | undefined, kind: FavoriteKind, entityId: string | number) {
  const db = await openDB();
  const itemKey = key(owner, kind, entityId);

  return await new Promise<boolean>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(itemKey);
    request.onsuccess = () => resolve(Boolean(request.result));
    request.onerror = () => reject(request.error);
  });
}
