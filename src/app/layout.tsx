import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SoundSphere | Music Discovery",
    template: "%s | SoundSphere",
  },
  description: "Music discovery app built with Next.js and Deezer API",
  icons: {
    icon: "/assets/branding/sound-sphere.png",
    shortcut: "/assets/branding/sound-sphere.png",
    apple: "/assets/branding/sound-sphere.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
