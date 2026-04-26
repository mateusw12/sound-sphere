import { QueueRepository } from "@/lib/indexeddb/repositories/queue.repository";
import type { QueueTrack, QueueTrackPayload } from "@/lib/indexeddb/types/queue.types";

export type { QueueTrack };

export async function addQueueTrack(
  owner: string | undefined,
  payload: QueueTrackPayload,
) {
  await QueueRepository.add(owner, payload);
}

export async function listQueue(owner: string | undefined) {
  return await QueueRepository.list(owner);
}

export async function removeQueueTrack(queueId: string) {
  await QueueRepository.remove(queueId);
}

export async function clearQueue(owner: string | undefined) {
  await QueueRepository.clear(owner);
}

export async function reorderQueue(owner: string | undefined, orderedIds: string[]) {
  await QueueRepository.reorder(owner, orderedIds);
}
