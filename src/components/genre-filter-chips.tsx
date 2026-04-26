"use client";

import type { CSSProperties } from "react";

type GenreFilterChipsProps = {
  selected: string;
  onSelect: (genre: string) => void;
};

const GENRES = [
  { label: "Pop", color: "#ff8ba7" },
  { label: "Rock", color: "#ff6b6b" },
  { label: "Hip Hop", color: "#f7b733" },
  { label: "Sertanejo", color: "#c2a36d" },
  { label: "Eletronica", color: "#58d4ff" },
  { label: "MPB", color: "#8fd694" },
  { label: "Jazz", color: "#c792ea" },
  { label: "Funk", color: "#7ee081" },
  { label: "Indie", color: "#73b4ff" },
  { label: "Reggae", color: "#f2d16b" },
];

export function GenreFilterChips({ selected, onSelect }: GenreFilterChipsProps) {
  return (
    <section className="genre-filters" aria-label="Filtro por genero musical">
      <button
        type="button"
        className={selected === "" ? "genre-chip active" : "genre-chip"}
        style={{ "--chip-accent": "#9aa8bf" } as CSSProperties}
        onClick={() => onSelect("")}
      >
        <span className="genre-chip-icon" aria-hidden>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4V13.5C8 14.88 6.88 16 5.5 16C4.12 16 3 14.88 3 13.5C3 12.12 4.12 11 5.5 11C6.08 11 6.62 11.2 7.05 11.53V6.1L14 4V10.5C14 11.88 12.88 13 11.5 13C10.12 13 9 11.88 9 10.5C9 9.12 10.12 8 11.5 8C12.08 8 12.62 8.2 13.05 8.53V5.35L8 6.9Z" fill="currentColor" />
          </svg>
        </span>
        Todos
      </button>
      {GENRES.map((genre) => (
        <button
          key={genre.label}
          type="button"
          className={selected === genre.label ? "genre-chip active" : "genre-chip"}
          style={{ "--chip-accent": genre.color } as CSSProperties}
          onClick={() => onSelect(genre.label)}
        >
          <span className="genre-chip-icon" aria-hidden>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V13.5C8 14.88 6.88 16 5.5 16C4.12 16 3 14.88 3 13.5C3 12.12 4.12 11 5.5 11C6.08 11 6.62 11.2 7.05 11.53V6.1L14 4V10.5C14 11.88 12.88 13 11.5 13C10.12 13 9 11.88 9 10.5C9 9.12 10.12 8 11.5 8C12.08 8 12.62 8.2 13.05 8.53V5.35L8 6.9Z" fill="currentColor" />
            </svg>
          </span>
          {genre.label}
        </button>
      ))}
    </section>
  );
}
