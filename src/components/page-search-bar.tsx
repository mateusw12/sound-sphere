"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PageSearchBarProps = {
  placeholder?: string;
};

export function PageSearchBar({ placeholder = "Busque musicas, artistas, albuns ou playlists" }: PageSearchBarProps) {
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();

    if (normalized.length < 2) {
      return;
    }

    setSubmitting(true);
    router.push(`/search?q=${encodeURIComponent(normalized)}`);
  }

  return (
    <form className="search-shell page-search" onSubmit={onSubmit}>
      <label htmlFor="page-search" className="search-label">
        Busca rapida
      </label>
      <div className="search-inline">
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="page-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-input"
            placeholder={placeholder}
          />
        </div>
        <button type="submit" className="button compact" disabled={query.trim().length < 2 || submitting}>
          {submitting ? (
            <span className="search-button-loading">
              <Image
                src="/assets/branding/sound-sphere.png"
                alt=""
                width={16}
                height={16}
                className="search-button-loading-logo"
                aria-hidden
              />
              Buscando...
            </span>
          ) : (
            "Buscar"
          )}
        </button>
      </div>
    </form>
  );
}
