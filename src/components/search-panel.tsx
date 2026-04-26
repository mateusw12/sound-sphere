"use client";

import { useMemo, useState } from "react";
import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";
import { PlaylistCard } from "@/components/playlist-card";
import { TrackCard } from "@/components/track-card";
import {
  useSearchAlbums,
  useSearchArtists,
  useSearchPlaylists,
  useSearchTracks,
} from "@/hooks/deezer";

export function SearchPanel() {
  const [rawQuery, setRawQuery] = useState("");
  const query = useMemo(() => rawQuery.trim(), [rawQuery]);

  const { data: tracks, isLoading: isLoadingTracks } = useSearchTracks(query);
  const { data: artists, isLoading: isLoadingArtists } = useSearchArtists(query);
  const { data: albums, isLoading: isLoadingAlbums } = useSearchAlbums(query);
  const { data: playlists, isLoading: isLoadingPlaylists } = useSearchPlaylists(query);

  return (
    <section>
      <div className="search-shell">
        <label htmlFor="search" className="search-label">
          Busque por faixas, artistas e albuns
        </label>
        <input
          id="search"
          value={rawQuery}
          onChange={(event) => setRawQuery(event.target.value)}
          className="search-input"
          placeholder="Ex.: Daft Punk"
        />
      </div>

      {query.length < 2 ? <p>Digite pelo menos 2 caracteres para buscar.</p> : null}

      {isLoadingTracks || isLoadingArtists || isLoadingAlbums || isLoadingPlaylists ? (
        <p>Buscando...</p>
      ) : null}

      <section className="section-block">
        <h2>Faixas</h2>
        <div className="grid-cards">
          {(tracks?.data ?? []).slice(0, 12).map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Artistas</h2>
        <div className="grid-cards">
          {(artists?.data ?? []).slice(0, 8).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Albuns</h2>
        <div className="grid-cards">
          {(albums?.data ?? []).slice(0, 8).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Playlists</h2>
        <div className="grid-cards">
          {(playlists?.data ?? []).slice(0, 8).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </section>
  );
}
