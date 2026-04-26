export type QueueTrack = {
  id: string;
  trackId: number;
  title: string;
  artist: string;
  preview: string;
  image?: string;
  owner?: string;
  createdAt: number;
};

const DB_NAME = "soundsphere-db";
const STORE = "queue";

async function openDB() {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => resolve(request.result);
  });

  if (db.objectStoreNames.contains(STORE)) {
    return db;
  }

  const nextVersion = db.version + 1;
  db.close();

  return await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, nextVersion);

    request.onupgradeneeded = () => {
      const upgraded = request.result;

      if (!upgraded.objectStoreNames.contains(STORE)) {
        const store = upgraded.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("by-owner", "owner", { unique: false });
        store.createIndex("by-created", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function key(owner: string | undefined, trackId: number, createdAt: number) {
  return `${owner ?? "guest"}:queue:${trackId}:${createdAt}`;
}

export async function addQueueTrack(
  owner: string | undefined,
  payload: {
    trackId: number;
    title: string;
    artist: string;
    preview: string;
    image?: string;
  },
) {
  const db = await openDB();
  const createdAt = Date.now();

  const item: QueueTrack = {
    id: key(owner, payload.trackId, createdAt),
    trackId: payload.trackId,
    title: payload.title,
    artist: payload.artist,
    preview: payload.preview,
    image: payload.image,
    owner,
    createdAt,
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function listQueue(owner: string | undefined) {
  const db = await openDB();

  return await new Promise<QueueTrack[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();

    request.onsuccess = () => {
      const rows = (request.result as QueueTrack[])
        .filter((item) => (owner ?? "guest") === (item.owner ?? "guest"))
        .sort((a, b) => a.createdAt - b.createdAt);
      resolve(rows);
    };

    request.onerror = () => reject(request.error);
  });
}

export async function removeQueueTrack(queueId: string) {
  const db = await openDB();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(queueId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearQueue(owner: string | undefined) {
  const tracks = await listQueue(owner);
  const db = await openDB();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    tracks.forEach((item) => store.delete(item.id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
