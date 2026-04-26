"use client";

import { useParams } from "next/navigation";
import { AudioTrackRow } from "@/components/audio-track-row";
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
        <ol className="audio-list">
          {(tracks?.data ?? []).slice(0, 30).map((track, index) => (
            <AudioTrackRow key={track.id} track={track} index={index} />
          ))}
        </ol>
      </section>
    </section>
  );
}
