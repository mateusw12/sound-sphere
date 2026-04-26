"use client";

import { useState } from "react";
import { GenreFilterChips } from "@/components/genre-filter-chips";
import { TrackCard } from "@/components/track-card";
import { PageSearchBar } from "@/components/page-search-bar";
import { useChart, useSearchTracks } from "@/hooks/deezer";

export default function TracksPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const { data, isLoading, error } = useChart();
  const { data: genreTracks, isLoading: isLoadingGenreTracks } = useSearchTracks(selectedGenre);

  const isGenreMode = selectedGenre.trim().length > 1;

  if ((isLoading && !isGenreMode) || (isGenreMode && isLoadingGenreTracks)) {
    return <p>Carregando musicas...</p>;
  }

  if (error) {
    return <p>Falha ao carregar musicas.</p>;
  }

  const tracks = isGenreMode ? (genreTracks?.data ?? []) : (data?.tracks.data ?? []).slice(0, 50);

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Tracks</p>
        <h1>Top musicas do momento</h1>
      </header>
      <PageSearchBar placeholder="Buscar e abrir na pagina de pesquisa" />
      <GenreFilterChips selected={selectedGenre} onSelect={setSelectedGenre} />

      {isGenreMode ? <p className="genre-result-note">Filtrando musicas por: {selectedGenre}</p> : null}

      <div className="grid-cards">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}