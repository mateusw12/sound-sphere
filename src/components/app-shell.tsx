"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { MusicPlayer } from "@/components/music-player";
import { PlayerProvider } from "@/components/player-context";
import { QueuePanel } from "@/components/queue-panel";
import { useAuth } from "@/components/auth-context";
import { Theme } from "@/lib/enum";

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, hydrated } = useAuth();

  const isAuthPage = pathname === "/";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("soundsphere-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!isAuthenticated && !isAuthPage) {
      router.replace("/");
      return;
    }

    if (isAuthenticated && isAuthPage) {
      router.replace("/home");
    }
  }, [hydrated, isAuthenticated, isAuthPage, router]);

  if (!hydrated) {
    return null;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <PlayerProvider>
      <div className="app-bg" />
      <div className="layout">
        <Navbar
          onToggleTheme={() => setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark))}
          themeLabel={theme === Theme.Dark ? "Tema claro" : "Tema escuro"}
        />
        <section className="content-grid">
          <main className="content">{children}</main>
          <QueuePanel />
        </section>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  );
}
