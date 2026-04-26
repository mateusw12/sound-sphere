"use client";

import { ArtistCard } from "@/components/artist-card";
import { PageSearchBar } from "@/components/page-search-bar";
import { useChart } from "@/hooks/deezer";

export default function ArtistsPage() {
  const { data, isLoading, error } = useChart();

  if (isLoading) {
    return <p>Carregando artistas...</p>;
  }

  if (error) {
    return <p>Falha ao carregar artistas.</p>;
  }

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Artists</p>
        <h1>Artistas em destaque</h1>
      </header>
      <PageSearchBar />

      <div className="grid-cards">
        {(data?.artists.data ?? []).slice(0, 30).map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
}
