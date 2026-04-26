"use client";

import Image from "next/image";
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
  const isGenreLoading = isGenreMode && (isLoadingGenreArtists || !genreArtists);

  if (isLoading && !isGenreMode) {
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

      {isGenreLoading ? (
        <div className="inline-loading" aria-live="polite" aria-busy="true">
          <Image
            src="/assets/branding/sound-sphere.png"
            alt="Carregando artistas"
            width={42}
            height={42}
            className="inline-loading-logo"
          />
          <p>Buscando artistas do genero...</p>
        </div>
      ) : artists.length === 0 ? (
        <p className="search-state">Nenhum artista encontrado para este genero.</p>
      ) : (
        <div className="grid-cards">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </section>
  );
}
