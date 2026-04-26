"use client";

import { DragEvent, useEffect, useState } from "react";
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
  const [movedId, setMovedId] = useState<string | null>(null);

  useEffect(() => {
    if (!movedId) {
      return;
    }

    const timeoutId = window.setTimeout(() => setMovedId(null), 260);
    return () => window.clearTimeout(timeoutId);
  }, [movedId]);

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
    setMovedId(draggedId);
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
            className={[
              "queue-card",
              item.id === currentQueueId ? "active" : "",
              item.id === draggedId ? "dragging" : "",
              item.id === movedId ? "moved" : "",
            ]
              .join(" ")
              .trim()}
            draggable
            onDragStart={() => onDragStart(item.id)}
            onDragEnd={() => setDraggedId(null)}
            onDragOver={(event: DragEvent<HTMLElement>) => event.preventDefault()}
            onDrop={() => {
              void onDrop(item.id);
            }}
          >
            <div className="queue-order">{index + 1}</div>
            <span className="queue-drag-handle" aria-hidden>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="4" r="1" />
                <circle cx="11" cy="4" r="1" />
                <circle cx="5" cy="8" r="1" />
                <circle cx="11" cy="8" r="1" />
                <circle cx="5" cy="12" r="1" />
                <circle cx="11" cy="12" r="1" />
              </svg>
            </span>
            <button type="button" className="queue-track" onClick={() => playFromQueue(item.id)}>
              <strong>{item.title}</strong>
              <span>{item.artist}</span>
            </button>
            <button
              type="button"
              className="queue-remove"
              aria-label="Remover da fila"
              title="Remover da fila"
              onClick={() => void removeFromQueue(item.id)}
            >
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 6H16M7 6V15M10 6V15M13 6V15M6 6L7 4H13L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </article>
        ))}
      </div>
    </aside>
  );
}
