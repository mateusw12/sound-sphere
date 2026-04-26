"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AlbumCard } from "@/components/album-card";
import { AudioTrackList } from "@/components/audio-track-list";
import { useArtist, useArtistAlbums, useArtistTop } from "@/hooks/deezer";
import { ArtistTab } from "@/lib/enum";

export default function ArtistPage() {
  const [activeTab, setActiveTab] = useState<ArtistTab>(ArtistTab.Tracks);
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: artist, isLoading: isLoadingArtist } = useArtist(id);
  const { data: topTracks, isLoading: isLoadingTop } = useArtistTop(id);
  const { data: albums, isLoading: isLoadingAlbums } = useArtistAlbums(id);
  const artistImage = artist?.picture_medium ?? artist?.picture_big ?? artist?.picture;

  const formatCount = (value?: number) => {
    if (!value || value < 0) {
      return "0";
    }

    return new Intl.NumberFormat("pt-BR").format(value);
  };

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

      <section className="artist-overview">
        {artistImage ? (
          <Image
            src={artistImage}
            alt={artist.name}
            width={220}
            height={220}
            className="artist-overview-image"
          />
        ) : null}
        <div className="artist-overview-content">
          <h2>Sobre o artista</h2>
          <div className="artist-overview-stats">
            <article>
              <span>Fans</span>
              <strong>{formatCount(artist.nb_fan)}</strong>
            </article>
            <article>
              <span>Top faixas</span>
              <strong>{formatCount(topTracks?.data?.length)}</strong>
            </article>
            <article>
              <span>Albuns</span>
              <strong>{formatCount(albums?.data?.length)}</strong>
            </article>
          </div>
        </div>
      </section>

      <div className="artist-tabs artist-tabs-shell" role="tablist" aria-label="Conteudo do artista">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === ArtistTab.Tracks}
          className={activeTab === ArtistTab.Tracks ? "artist-tab active" : "artist-tab"}
          onClick={() => setActiveTab(ArtistTab.Tracks)}
        >
          Musicas
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === ArtistTab.Albums}
          className={activeTab === ArtistTab.Albums ? "artist-tab active" : "artist-tab"}
          onClick={() => setActiveTab(ArtistTab.Albums)}
        >
          Albuns
        </button>
      </div>

      {activeTab === ArtistTab.Tracks ? (
        <section className="section-block artist-pane artist-pane-tracks">
          <h2>Top faixas</h2>
          <AudioTrackList tracks={topTracks?.data ?? []} limit={20} emptyMessage="Artista sem faixas." />
        </section>
      ) : (
        <section className="section-block artist-pane artist-pane-albums">
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
