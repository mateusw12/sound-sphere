export const DB_NAME = "soundsphere-db";

export enum FavoriteField {
  Kind = "kind",
  Owner = "owner",
}

export enum FavoriteIndexName {
  ByKind = "by-kind",
  ByOwner = "by-owner",
}

export enum QueueField {
  Owner = "owner",
  CreatedAt = "createdAt",
}

export enum QueueIndexName {
  ByOwner = "by-owner",
  ByCreated = "by-created",
}

type StoreDefinition = {
  name: string;
  options: IDBObjectStoreParameters;
  indexes: Array<{ name: string; keyPath: string | string[]; options?: IDBIndexParameters }>;
};

export const STORES = {
  favorites: "favorites",
  queue: "queue",
} as const;

export const STORE_DEFINITIONS: StoreDefinition[] = [
  {
    name: STORES.favorites,
    options: { keyPath: "id" },
    indexes: [
      { name: FavoriteIndexName.ByKind, keyPath: FavoriteField.Kind, options: { unique: false } },
      { name: FavoriteIndexName.ByOwner, keyPath: FavoriteField.Owner, options: { unique: false } },
    ],
  },
  {
    name: STORES.queue,
    options: { keyPath: "id" },
    indexes: [
      { name: QueueIndexName.ByOwner, keyPath: QueueField.Owner, options: { unique: false } },
      { name: QueueIndexName.ByCreated, keyPath: QueueField.CreatedAt, options: { unique: false } },
    ],
  },
];
