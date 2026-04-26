"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { MusicPlayer } from "@/components/music-player";
import { PlayerProvider } from "@/components/player-context";
import { QueuePanel } from "@/components/queue-panel";

type Theme = "light" | "dark";

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("soundsphere-theme", theme);
  }, [theme]);

  return (
    <PlayerProvider>
      <div className="app-bg" />
      <div className="layout">
        <Navbar
          onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          themeLabel={theme === "dark" ? "Tema claro" : "Tema escuro"}
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
