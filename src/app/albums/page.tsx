"use client";

import { AlbumCard } from "@/components/album-card";
import { PageSearchBar } from "@/components/page-search-bar";
import { useChart } from "@/hooks/deezer";

export default function AlbumsPage() {
  const { data, isLoading, error } = useChart();

  if (isLoading) {
    return <p>Carregando albuns...</p>;
  }

  if (error) {
    return <p>Falha ao carregar albuns.</p>;
  }

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Albums</p>
        <h1>Albuns mais ouvidos</h1>
      </header>
      <PageSearchBar />

      <div className="grid-cards">
        {(data?.albums.data ?? []).slice(0, 30).map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}
