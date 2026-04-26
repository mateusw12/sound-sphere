"use client";

import { DragEvent, useState } from "react";
import { usePlayer } from "@/components/player-context";

export function QueuePanel() {
  const {
    queue,
    currentQueueId,
    queueLoading,
    playFromQueue,
    removeFromQueue,
    reorderPlaybackQueue,
    clearPlaybackQueue,
  } = usePlayer();
  const [draggedId, setDraggedId] = useState<string | null>(null);

  function onDragStart(id: string) {
    setDraggedId(id);
  }

  async function onDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    const ordered = [...queue];
    const from = ordered.findIndex((item) => item.id === draggedId);
    const to = ordered.findIndex((item) => item.id === targetId);

    if (from < 0 || to < 0) {
      setDraggedId(null);
      return;
    }

    const [moved] = ordered.splice(from, 1);
    ordered.splice(to, 0, moved);

    await reorderPlaybackQueue(ordered.map((item) => item.id));
    setDraggedId(null);
  }

  return (
    <aside className="queue-panel">
      <header className="queue-header">
        <div>
          <p className="kicker">Fila</p>
          <h3>Proximas musicas</h3>
        </div>
        <button className="button ghost compact" type="button" onClick={() => void clearPlaybackQueue()}>
          Limpar
        </button>
      </header>

      {queueLoading ? <p>Carregando fila...</p> : null}
      {!queueLoading && queue.length === 0 ? <p>Nenhuma musica na fila.</p> : null}

      <div className="queue-list">
        {queue.map((item, index) => (
          <article
            key={item.id}
            className={item.id === currentQueueId ? "queue-card active" : "queue-card"}
            draggable
            onDragStart={() => onDragStart(item.id)}
            onDragOver={(event: DragEvent<HTMLElement>) => event.preventDefault()}
            onDrop={() => {
              void onDrop(item.id);
            }}
          >
            <div className="queue-order">{index + 1}</div>
            <button type="button" className="queue-track" onClick={() => playFromQueue(item.id)}>
              <strong>{item.title}</strong>
              <span>{item.artist}</span>
            </button>
            <button
              type="button"
              className="queue-remove"
              onClick={() => void removeFromQueue(item.id)}
            >
              Remover
            </button>
          </article>
        ))}
      </div>
    </aside>
  );
}
