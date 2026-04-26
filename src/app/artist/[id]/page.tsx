"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { AlbumCard } from "@/components/album-card";
import { AudioTrackList } from "@/components/audio-track-list";
import { useArtist, useArtistAlbums, useArtistTop } from "@/hooks/deezer";

export default function ArtistPage() {
  const [activeTab, setActiveTab] = useState<"tracks" | "albums">("tracks");
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: artist, isLoading: isLoadingArtist } = useArtist(id);
  const { data: topTracks, isLoading: isLoadingTop } = useArtistTop(id);
  const { data: albums, isLoading: isLoadingAlbums } = useArtistAlbums(id);

  if (isLoadingArtist || isLoadingTop || isLoadingAlbums) {
    return <p>Carregando artista...</p>;
  }

  if (!artist) {
    return <p>Artista nao encontrado.</p>;
  }

  return (
    <section>
      <header className="hero compact">
        <p className="kicker">Artist</p>
        <h1>{artist.name}</h1>
      </header>

      <div className="artist-tabs" role="tablist" aria-label="Conteudo do artista">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "tracks"}
          className={activeTab === "tracks" ? "artist-tab active" : "artist-tab"}
          onClick={() => setActiveTab("tracks")}
        >
          Musicas
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "albums"}
          className={activeTab === "albums" ? "artist-tab active" : "artist-tab"}
          onClick={() => setActiveTab("albums")}
        >
          Albuns
        </button>
      </div>

      {activeTab === "tracks" ? (
        <section className="section-block">
          <h2>Top faixas</h2>
          <AudioTrackList tracks={topTracks?.data ?? []} limit={20} emptyMessage="Artista sem faixas." />
        </section>
      ) : (
        <section className="section-block">
          <h2>Albuns</h2>
          <div className="grid-cards">
            {(albums?.data ?? []).slice(0, 10).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
