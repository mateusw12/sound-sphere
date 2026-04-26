"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useFavorites } from "@/hooks/favorites/use-favorites";
import type { FavoriteKind } from "@/lib/indexeddb";

function FavoriteGroup({
  title,
  items,
  onRemove,
}: {
  title: string;
  items: Array<{
    id: string;
    entityId: string;
    kind: FavoriteKind;
    title: string;
    subtitle?: string;
    href?: string;
  }>;
  onRemove: (item: { kind: FavoriteKind; entityId: string; title: string; subtitle?: string; href?: string }) => void;
}) {
  return (
    <section className="favorites-section">
      <div className="favorites-section-head">
        <h2>{title}</h2>
        <span>{items.length}</span>
      </div>
      {items.length === 0 ? <p className="favorites-empty">Nenhum item salvo.</p> : null}
      <div className="favorites-grid">
        {items.map((item) => (
          <article key={item.id} className="favorites-item">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <div className="favorites-actions">
              {item.href ? (
                <Link className="button-link compact" href={item.href}>
                  Abrir
                </Link>
              ) : null}
              <button
                type="button"
                className="button ghost compact"
                aria-label="Remover dos favoritos"
                title="Remover dos favoritos"
                onClick={() => onRemove(item)}
              >
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4 6H16M7 6V15M10 6V15M13 6V15M6 6L7 4H13L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function FavoritesPage() {
  const { status } = useSession();
  const { groups, loading, toggleFavorite } = useFavorites();

  const handleRemove = (item: {
    kind: FavoriteKind;
    entityId: string;
    title: string;
    subtitle?: string;
    href?: string;
  }) => {
    void toggleFavorite({
      kind: item.kind,
      entityId: item.entityId,
      title: item.title,
      subtitle: item.subtitle,
      href: item.href,
    });
  };

  if (status === "unauthenticated") {
    return (
      <section className="section-block">
        <header className="hero compact">
          <p className="kicker">Favoritos</p>
          <h1>Entre com Google para sincronizar seus favoritos</h1>
        </header>
        <button type="button" className="button" onClick={() => void signIn("google")}>
          Entrar com Google
        </button>
      </section>
    );
  }

  return (
    <section className="section-block favorites-page">
      <header className="hero compact">
        <p className="kicker">Favoritos</p>
        <h1>Sua biblioteca pessoal</h1>
      </header>

      {loading ? <p>Carregando favoritos...</p> : null}

      <FavoriteGroup title="Musicas" items={groups.tracks} onRemove={handleRemove} />
      <FavoriteGroup title="Artistas" items={groups.artists} onRemove={handleRemove} />
      <FavoriteGroup title="Albuns" items={groups.albums} onRemove={handleRemove} />
      <FavoriteGroup title="Playlists" items={groups.playlists} onRemove={handleRemove} />
    </section>
  );
}
