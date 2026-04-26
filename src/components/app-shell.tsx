"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { MusicPlayer } from "@/components/music-player";
import { PlayerProvider } from "@/components/player-context";

type Theme = "light" | "dark";

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const saved = window.localStorage.getItem("soundsphere-theme") as Theme | null;
    return saved ?? "dark";
  });

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
        <main className="content">{children}</main>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  );
}
