"use client";

import { useParams } from "next/navigation";
import { TrackCard } from "@/components/track-card";
import { useAlbum, useAlbumTracks } from "@/hooks/deezer";

export default function AlbumPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: album, isLoading: isLoadingAlbum } = useAlbum(id);
  const { data: tracks, isLoading: isLoadingTracks } = useAlbumTracks(id);

  if (isLoadingAlbum || isLoadingTracks) {
    return <p>Carregando album...</p>;
  }

  if (!album) {
    return <p>Album nao encontrado.</p>;
  }

  return (
    <section>
      <header className="hero compact">
        <p className="kicker">Album</p>
        <h1>{album.title}</h1>
        <p>{album.artist?.name}</p>
      </header>

      <section className="section-block">
        <h2>Faixas</h2>
        <div className="grid-cards">
          {(tracks?.data ?? []).slice(0, 20).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </section>
  );
}
