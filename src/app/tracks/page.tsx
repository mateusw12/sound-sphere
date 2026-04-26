"use client";

import { TrackCard } from "@/components/track-card";
import { useChart } from "@/hooks/deezer";

export default function TracksPage() {
  const { data, isLoading, error } = useChart();

  if (isLoading) {
    return <p>Carregando musicas...</p>;
  }

  if (error) {
    return <p>Falha ao carregar musicas.</p>;
  }

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Tracks</p>
        <h1>Top musicas do momento</h1>
      </header>

      <div className="grid-cards">
        {(data?.tracks.data ?? []).slice(0, 30).map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}