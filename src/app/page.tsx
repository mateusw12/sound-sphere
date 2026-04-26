"use client";

import { ArtistCard } from "@/components/artist-card";
import { AlbumCard } from "@/components/album-card";
import { TrackCard } from "@/components/track-card";
import { useChart } from "@/hooks/deezer";

export default function HomePage() {
  const { data, isLoading, error } = useChart();

  if (isLoading) {
    return <p>Carregando charts...</p>;
  }

  if (error) {
    return <p>Falha ao carregar chart da Deezer.</p>;
  }

  return (
    <section>
      <header className="hero">
        <p className="kicker">Discover music now</p>
        <h1>Explore o que esta em alta no mundo.</h1>
      </header>

      <section className="section-block">
        <h2>Top Tracks</h2>
        <div className="grid-cards">
          {(data?.tracks.data ?? []).slice(0, 12).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Top Artists</h2>
        <div className="grid-cards">
          {(data?.artists.data ?? []).slice(0, 8).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Top Albums</h2>
        <div className="grid-cards">
          {(data?.albums.data ?? []).slice(0, 8).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </section>
  );
}
