import { DB_NAME, STORE_DEFINITIONS } from "@/lib/indexeddb/core/schema";

function createMissingStores(db: IDBDatabase) {
  for (const store of STORE_DEFINITIONS) {
    if (!db.objectStoreNames.contains(store.name)) {
      const objectStore = db.createObjectStore(store.name, store.options);
      for (const index of store.indexes) {
        objectStore.createIndex(index.name, index.keyPath, index.options);
      }
      continue;
    }

    const transaction = (db as unknown as { transaction?: IDBTransaction }).transaction;
    if (!transaction) {
      continue;
    }
  }
}

function needsSchemaUpgrade(db: IDBDatabase) {
  return STORE_DEFINITIONS.some((store) => !db.objectStoreNames.contains(store.name));
}

export async function openAppDatabase() {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      createMissingStores(request.result);
      resolve(request.result);
    };
  });

  if (!needsSchemaUpgrade(db)) {
    return db;
  }

  const nextVersion = db.version + 1;
  db.close();

  return await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, nextVersion);

    request.onupgradeneeded = () => {
      createMissingStores(request.result);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
