"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PageSearchBarProps = {
  placeholder?: string;
};

export function PageSearchBar({ placeholder = "Busque musicas, artistas, albuns ou playlists" }: PageSearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();

    if (normalized.length < 2) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(normalized)}`);
  }

  return (
    <form className="search-shell page-search" onSubmit={onSubmit}>
      <label htmlFor="page-search" className="search-label">
        Busca rapida
      </label>
      <div className="search-inline">
        <input
          id="page-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
          placeholder={placeholder}
        />
        <button type="submit" className="button compact" disabled={query.trim().length < 2}>
          Buscar
        </button>
      </div>
    </form>
  );
}
