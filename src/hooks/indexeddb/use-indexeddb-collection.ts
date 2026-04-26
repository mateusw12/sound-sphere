"use client";

import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

type OwnerAwareList<TItem> = (owner: string | undefined) => Promise<TItem[]>;

type UseIndexedDbCollectionParams<TItem> = {
  namespace: string;
  list: OwnerAwareList<TItem>;
};

export function useIndexedDbCollection<TItem>({
  namespace,
  list,
}: UseIndexedDbCollectionParams<TItem>) {
  const { data: session } = useSession();
  const owner = session?.user?.email ?? undefined;

  const cacheKey = `${namespace}:${owner ?? "guest"}`;
  const { data, isLoading, mutate, error } = useSWR<TItem[]>(
    cacheKey,
    () => list(owner),
  );

  const items = useMemo(() => data ?? [], [data]);

  const runAndRefresh = useCallback(
    async <TResult>(action: (currentOwner: string | undefined) => Promise<TResult>) => {
      const result = await action(owner);
      await mutate();
      return result;
    },
    [owner, mutate],
  );

  return {
    owner,
    items,
    isLoading,
    error,
    refresh: mutate,
    runAndRefresh,
  };
}
