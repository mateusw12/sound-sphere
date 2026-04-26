"use client";

import { useParams } from "next/navigation";
import { TrackCard } from "@/components/track-card";
import { usePlaylist, usePlaylistTracks } from "@/hooks/deezer";

export default function PlaylistPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: playlist, isLoading: isLoadingPlaylist } = usePlaylist(id);
  const { data: tracks, isLoading: isLoadingTracks } = usePlaylistTracks(id);

  if (isLoadingPlaylist || isLoadingTracks) {
    return <p>Carregando playlist...</p>;
  }

  if (!playlist) {
    return <p>Playlist nao encontrada.</p>;
  }

  return (
    <section>
      <header className="hero compact">
        <p className="kicker">Playlist</p>
        <h1>{playlist.title}</h1>
        <p>{playlist.nb_tracks ? `${playlist.nb_tracks} faixas` : "Playlist"}</p>
      </header>

      <section className="section-block">
        <h2>Faixas da playlist</h2>
        <div className="grid-cards">
          {(tracks?.data ?? []).slice(0, 40).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </section>
  );
}