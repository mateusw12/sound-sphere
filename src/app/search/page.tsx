import { SearchPanel } from "@/components/search-panel";

export default function SearchPage() {
  return (
    <section>
      <header className="hero compact">
        <p className="kicker">Search</p>
        <h1>Encontre sua proxima faixa favorita.</h1>
      </header>
      <SearchPanel />
    </section>
  );
}
