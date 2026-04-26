"use client";

import Link from "next/link";
import Image from "next/image";
import type { DeezerTrack } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";
import { usePlayer } from "@/components/player-context";

type TrackCardProps = {
  track: DeezerTrack;
};

export function TrackCard({ track }: TrackCardProps) {
  const { playTrack } = usePlayer();
  const image = track.album?.cover_medium ?? track.album?.cover;

  return (
    <article className="card">
      {image ? (
        <Image src={image} alt={track.title} width={320} height={320} className="card-cover" />
      ) : null}
      <h3>{track.title}</h3>
      <p>{track.artist.name}</p>
      <div className="card-links">
        <Link href={`/artist/${track.artist.id}`}>Artista</Link>
        {track.album ? <Link href={`/album/${track.album.id}`}>Album</Link> : null}
      </div>
      <button
        className="button"
        type="button"
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
        {track.preview ? "Ouvir preview" : "Sem preview"}
      </button>
      <FavoriteButton
        kind="track"
        entityId={track.id}
        title={track.title}
        subtitle={track.artist.name}
        image={image}
        href={track.album ? `/album/${track.album.id}` : undefined}
      />
    </article>
  );
}
