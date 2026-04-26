"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-block">
      <header className="hero compact">
        <p className="kicker">Erro</p>
        <h1>Algo deu errado</h1>
      </header>
      <p>{error.message}</p>
      <button type="button" className="button" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
