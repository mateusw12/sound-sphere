import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="about-page">
      <header className="hero compact">
        <p className="kicker">Sobre</p>
        <h1>Conheca o SoundSphere</h1>
      </header>

      <section className="about-hero">
        <Image
          src="/assets/branding/sound-sphere.png"
          alt="Logo SoundSphere"
          width={520}
          height={520}
          className="about-logo"
          priority
        />
        <div className="about-content">
          <h2>Musica, descoberta e experiencia premium</h2>
          <p>
            O SoundSphere e uma plataforma para explorar artistas, albuns, playlists e faixas em alta,
            com foco em navegacao rapida e visual moderno.
          </p>
          <p>
            A aplicacao integra dados da Deezer, possui autenticacao com Google, favoritos persistidos e
            fila de reproducao com ordenacao por arrastar.
          </p>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h3>Descoberta de conteudo</h3>
          <p>Charts em tempo real, busca por categorias e paginas dedicadas por artista, album e playlist.</p>
        </article>
        <article className="about-card">
          <h3>Player inteligente</h3>
          <p>Mini player flutuante, controle de progresso, fila lateral e reproducao em sequencia.</p>
        </article>
        <article className="about-card">
          <h3>Biblioteca pessoal</h3>
          <p>Favoritos separados por tipo, persistencia local e fluxo limpo para organizar o que voce curte.</p>
        </article>
      </section>
    </section>
  );
}
