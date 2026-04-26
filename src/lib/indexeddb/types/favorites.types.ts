import { FavoriteKind } from "@/lib/enum";

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

export type FavoriteUpsertPayload = {
  entityId: string | number;
  kind: FavoriteKind;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
};
