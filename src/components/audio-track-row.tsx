"use client";

import Link from "next/link";
import type { DeezerTrack } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";
import { usePlayer } from "@/components/player-context";
import { FavoriteKind } from "@/lib/indexeddb";

type AudioTrackRowProps = {
  track: DeezerTrack;
  index: number;
};

export function AudioTrackRow({ track, index }: AudioTrackRowProps) {
  const { playTrack, addToQueue, stop } = usePlayer();
  const image = track.album?.cover_medium ?? track.album?.cover;

  return (
    <li className="audio-row">
      <span className="audio-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="audio-main">
        <strong>{track.title}</strong>
        <div className="audio-meta">
          <Link href={`/artist/${track.artist.id}`}>{track.artist.name}</Link>
          {track.album ? <Link href={`/album/${track.album.id}`}>{track.album.title}</Link> : null}
        </div>
      </div>
      <div className="audio-actions">
        <button
          className="button compact"
          type="button"
          aria-label="Tocar preview"
          title="Tocar preview"
          disabled={!track.preview}
          onClick={() => {
            if (!track.preview) {
              return;
            }

            playTrack({
              id: track.id,
              title: track.title,
              artist: track.artist.name,
              preview: track.preview,
            });
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M7 5L15 10L7 15V5Z" fill="currentColor" />
          </svg>
        </button>

        <button
          className="button ghost compact"
          type="button"
          aria-label="Parar"
          title="Parar"
          onClick={stop}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="6" y="6" width="8" height="8" rx="1.2" fill="currentColor" />
          </svg>
        </button>

        <button
          className="button ghost compact"
          type="button"
          aria-label="Adicionar na fila"
          title="Adicionar na fila"
          disabled={!track.preview}
          onClick={() => {
            if (!track.preview) {
              return;
            }

            void addToQueue({
              id: track.id,
              title: track.title,
              artist: track.artist.name,
              preview: track.preview,
              image,
            });
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M4.5 6.5H13.5M4.5 10H13.5M4.5 13.5H10.5M14.5 12V16M12.5 14H16.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <FavoriteButton
          compact
          kind={FavoriteKind.Track}
          entityId={track.id}
          title={track.title}
          subtitle={track.artist.name}
          image={image}
          href={track.album ? `/album/${track.album.id}` : undefined}
        />
      </div>
    </li>
  );
}
