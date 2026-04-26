"use client";

import Link from "next/link";
import Image from "next/image";
import type { DeezerTrack } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";
import { usePlayer } from "@/components/player-context";
import { FavoriteKind } from "@/lib/enum";

type TrackCardProps = {
  track: DeezerTrack;
};

export function TrackCard({ track }: TrackCardProps) {
  const { playTrack, addToQueue, stop } = usePlayer();
  const image = track.album?.cover_medium ?? track.album?.cover;

  return (
    <article className="card">
      {image ? (
        <Image
          src={image}
          alt={track.title}
          width={320}
          height={320}
          className="card-cover"
        />
      ) : null}
      <h3>{track.title}</h3>
      <p>{track.artist.name}</p>
      <div className="card-links">
        <Link href={`/artist/${track.artist.id}`}>Artista</Link>
        {track.album ? (
          <Link href={`/album/${track.album.id}`}>Album</Link>
        ) : null}
      </div>
      <div className="card-actions">
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
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
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
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect
              x="6"
              y="6"
              width="8"
              height="8"
              rx="1.2"
              fill="currentColor"
            />
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
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
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
    </article>
  );
}
