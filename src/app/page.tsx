"use client";

import { ArtistCard } from "@/components/artist-card";
import { AlbumCard } from "@/components/album-card";
import { TrackCard } from "@/components/track-card";
import { PageSearchBar } from "@/components/page-search-bar";
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
    <section className="home-page">
      <header className="hero">
        <p className="kicker">Discover music now</p>
        <h1>Explore o que esta em alta no mundo.</h1>
      </header>
      <div className="home-search-wrap">
        <PageSearchBar />
      </div>

      <section className="section-block home-section">
        <div className="home-section-head">
          <div>
            <h2>Top Tracks</h2>
            <p>As faixas com maior movimento agora.</p>
          </div>
        </div>
        <div className="grid-cards">
          {(data?.tracks.data ?? []).slice(0, 16).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="section-block home-section">
        <div className="home-section-head">
          <div>
            <h2>Top Artists</h2>
            <p>Artistas em evidência nas paradas.</p>
          </div>
        </div>
        <div className="grid-cards">
          {(data?.artists.data ?? []).slice(0, 10).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="section-block home-section">
        <div className="home-section-head">
          <div>
            <h2>Top Albums</h2>
            <p>Albuns com melhor desempenho global.</p>
          </div>
        </div>
        <div className="grid-cards">
          {(data?.albums.data ?? []).slice(0, 10).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </section>
  );
}
