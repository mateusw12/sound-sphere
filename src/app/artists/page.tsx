"use client";

import { useState } from "react";
import { ArtistCard } from "@/components/artist-card";
import { GenreFilterChips } from "@/components/genre-filter-chips";
import { PageSearchBar } from "@/components/page-search-bar";
import { useChart, useSearchArtists } from "@/hooks/deezer";

export default function ArtistsPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const { data, isLoading, error } = useChart();
  const { data: genreArtists, isLoading: isLoadingGenreArtists } = useSearchArtists(selectedGenre);

  const isGenreMode = selectedGenre.trim().length > 1;

  if ((isLoading && !isGenreMode) || (isGenreMode && isLoadingGenreArtists)) {
    return <p>Carregando artistas...</p>;
  }

  if (error) {
    return <p>Falha ao carregar artistas.</p>;
  }

  const artists = isGenreMode ? (genreArtists?.data ?? []) : (data?.artists.data ?? []).slice(0, 30);

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Artists</p>
        <h1>Artistas em destaque</h1>
      </header>
      <PageSearchBar />
      <GenreFilterChips selected={selectedGenre} onSelect={setSelectedGenre} />

      {isGenreMode ? <p className="genre-result-note">Filtrando artistas por: {selectedGenre}</p> : null}

      <div className="grid-cards">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
}
