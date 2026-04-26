"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useFavorites } from "@/hooks/favorites/use-favorites";

function FavoriteGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    href?: string;
  }>;
}) {
  return (
    <section className="section-block">
      <h2>{title}</h2>
      {items.length === 0 ? <p>Nenhum item salvo.</p> : null}
      <div className="favorites-grid">
        {items.map((item) => (
          <article key={item.id} className="favorites-item">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            {item.href ? (
              <Link className="button-link" href={item.href}>
                Abrir
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function FavoritesPage() {
  const { status } = useSession();
  const { groups, loading } = useFavorites();

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
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Favoritos</p>
        <h1>Sua biblioteca pessoal</h1>
      </header>

      {loading ? <p>Carregando favoritos...</p> : null}

      <FavoriteGroup title="Musicas" items={groups.tracks} />
      <FavoriteGroup title="Artistas" items={groups.artists} />
      <FavoriteGroup title="Albuns" items={groups.albums} />
      <FavoriteGroup title="Playlists" items={groups.playlists} />
    </section>
  );
}
