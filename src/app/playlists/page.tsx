"use client";

import { PlaylistCard } from "@/components/playlist-card";
import { useTopPlaylists } from "@/hooks/deezer";

export default function PlaylistsPage() {
  const { data, isLoading, error } = useTopPlaylists();

  if (isLoading) {
    return <p>Carregando playlists...</p>;
  }

  if (error) {
    return <p>Falha ao carregar playlists.</p>;
  }

  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Playlists</p>
        <h1>Playlists para descobrir agora</h1>
      </header>

      <div className="grid-cards">
        {(data?.data ?? []).slice(0, 30).map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
}
