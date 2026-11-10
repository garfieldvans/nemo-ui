import { Example } from "../components/Example";
import { componentDocs } from "../docs";
import { Link } from "../router";

export function Playground() {
  return (
    <div className="site-playground">
      <header className="site-playground__head">
        <h1>Playground</h1>
        <p>
          Setiap komponen Nemo UI dirender langsung di halaman ini. Ganti palet
          dan mode dari header untuk melihat reaksinya, lalu salin kode dari tab
          Kode pada tiap contoh.
        </p>
      </header>

      <nav className="site-chip-row" aria-label="Lompat ke komponen">
        {componentDocs.map((doc) => (
          <Link key={doc.slug} to={`#${doc.slug}`} className="site-chip">
            {doc.name}
          </Link>
        ))}
      </nav>

      {componentDocs.map((doc) => (
        <section key={doc.slug} id={doc.slug} style={{ marginTop: 56 }}>
          <h2 className="site-h2" style={{ marginTop: 0 }}>
            <Link to={`/docs/components/${doc.slug}`} style={{ color: "inherit" }}>
              {doc.name}
            </Link>
          </h2>
          <p className="site-p" style={{ marginTop: 0 }}>
            {doc.summary}{" "}
            <Link to={`/docs/components/${doc.slug}`} className="site-link">
              Baca API →
            </Link>
          </p>
          {doc.examples.map((example) => (
            <Example
              key={example.id}
              example={example}
              idPrefix={doc.slug}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
