import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">404</p>
        <h1>Pagina nao encontrada</h1>
      </header>
      <Link href="/" className="button-link">
        Voltar para home
      </Link>
    </section>
  );
}
