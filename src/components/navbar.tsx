"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

type NavbarProps = {
  onToggleTheme: () => void;
  themeLabel: string;
};

export function Navbar({ onToggleTheme, themeLabel }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/tracks", label: "Musicas" },
    { href: "/artists", label: "Artistas" },
    { href: "/albums", label: "Albuns" },
    { href: "/playlists", label: "Playlists" },
    { href: "/search", label: "Search" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <header className="nav-shell">
      <Link href="/" className="brand">
        SoundSphere
      </Link>

      <nav className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname.startsWith(link.href) && link.href !== "/" ? "nav-link active" : pathname === link.href ? "nav-link active" : "nav-link"}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={themeLabel}>
          <span>{themeLabel.toLowerCase().includes("claro") ? "☀" : "☾"}</span>
        </button>
        {status === "authenticated" ? (
          <button type="button" className="button" onClick={() => void signOut()}>
            Sair
          </button>
        ) : (
          <button type="button" className="button" onClick={() => void signIn("google")}>
            Entrar
          </button>
        )}
        {session?.user?.name ? <span className="session-chip">{session.user.name}</span> : null}
      </div>
    </header>
  );
}
