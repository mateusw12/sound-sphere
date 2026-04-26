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
  const hasMinQuery = query.length >= 2;

  const { data: tracks, isLoading: isLoadingTracks } = useSearchTracks(query);
  const { data: artists, isLoading: isLoadingArtists } = useSearchArtists(query);
  const { data: albums, isLoading: isLoadingAlbums } = useSearchAlbums(query);
  const { data: playlists, isLoading: isLoadingPlaylists } = useSearchPlaylists(query);

  const trackResults = (tracks?.data ?? []).slice(0, 12);
  const artistResults = (artists?.data ?? []).slice(0, 8);
  const albumResults = (albums?.data ?? []).slice(0, 8);
  const playlistResults = (playlists?.data ?? []).slice(0, 8);

  const isSearching = hasMinQuery && (isLoadingTracks || isLoadingArtists || isLoadingAlbums || isLoadingPlaylists);
  const hasAnyResults =
    trackResults.length > 0 ||
    artistResults.length > 0 ||
    albumResults.length > 0 ||
    playlistResults.length > 0;

  return (
    <section className="search-page-panel">
      <div className="search-shell">
        <label htmlFor="search" className="search-label">
          Busque por faixas, artistas e albuns
        </label>
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="search"
            value={rawQuery}
            onChange={(event) => setRawQuery(event.target.value)}
            className="search-input"
            placeholder="Ex.: Daft Punk"
          />
        </div>
      </div>

      {!hasMinQuery ? <p className="search-state muted">Comece digitando para buscar.</p> : null}

      {isSearching ? <p className="search-state">Buscando resultados...</p> : null}

      {hasMinQuery && !isSearching && !hasAnyResults ? (
        <p className="search-state">
          Nenhum resultado para <strong>{query}</strong>.
        </p>
      ) : null}

      {hasMinQuery && !isSearching && hasAnyResults ? (
        <>
          {trackResults.length > 0 ? (
            <section className="section-block search-result-block">
              <div className="search-section-head">
                <h2>Faixas</h2>
                <span>{trackResults.length}</span>
              </div>
              <div className="grid-cards">
                {trackResults.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            </section>
          ) : null}

          {artistResults.length > 0 ? (
            <section className="section-block search-result-block">
              <div className="search-section-head">
                <h2>Artistas</h2>
                <span>{artistResults.length}</span>
              </div>
              <div className="grid-cards">
                {artistResults.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          ) : null}

          {albumResults.length > 0 ? (
            <section className="section-block search-result-block">
              <div className="search-section-head">
                <h2>Albuns</h2>
                <span>{albumResults.length}</span>
              </div>
              <div className="grid-cards">
                {albumResults.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          ) : null}

          {playlistResults.length > 0 ? (
            <section className="section-block search-result-block">
              <div className="search-section-head">
                <h2>Playlists</h2>
                <span>{playlistResults.length}</span>
              </div>
              <div className="grid-cards">
                {playlistResults.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
