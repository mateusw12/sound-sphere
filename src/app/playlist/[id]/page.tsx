"use client";

import { useParams } from "next/navigation";
import { AudioTrackList } from "@/components/audio-track-list";
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
        <AudioTrackList tracks={tracks?.data ?? []} limit={40} emptyMessage="Playlist sem faixas." />
      </section>
    </section>
  );
}