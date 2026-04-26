"use client";

import { useParams } from "next/navigation";
import { AlbumCard } from "@/components/album-card";
import { TrackCard } from "@/components/track-card";
import { useArtist, useArtistAlbums, useArtistTop } from "@/hooks/deezer";

export default function ArtistPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: artist, isLoading: isLoadingArtist } = useArtist(id);
  const { data: topTracks, isLoading: isLoadingTop } = useArtistTop(id);
  const { data: albums, isLoading: isLoadingAlbums } = useArtistAlbums(id);

  if (isLoadingArtist || isLoadingTop || isLoadingAlbums) {
    return <p>Carregando artista...</p>;
  }

  if (!artist) {
    return <p>Artista nao encontrado.</p>;
  }

  return (
    <section>
      <header className="hero compact">
        <p className="kicker">Artist</p>
        <h1>{artist.name}</h1>
      </header>

      <section className="section-block">
        <h2>Top faixas</h2>
        <div className="grid-cards">
          {(topTracks?.data ?? []).slice(0, 10).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Albuns</h2>
        <div className="grid-cards">
          {(albums?.data ?? []).slice(0, 10).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </section>
  );
}
