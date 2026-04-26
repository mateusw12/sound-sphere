import Image from "next/image";

export default function RootLoading() {
  return (
    <section className="loading-screen" aria-live="polite" aria-busy="true">
      <div className="loading-logo-shell">
        <Image
          src="/assets/branding/sound-sphere.png"
          alt="Carregando SoundSphere"
          width={140}
          height={140}
          className="loading-logo"
          priority
        />
      </div>
      <p className="kicker">Loading</p>
      <h1>Carregando SoundSphere...</h1>
      <p className="loading-text">Preparando sua experiencia musical.</p>
    </section>
  );
}
