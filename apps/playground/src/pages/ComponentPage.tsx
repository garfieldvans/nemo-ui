import { PropTable } from "../components/CodeBlock";
import { CodeBlock } from "../components/CodeBlock";
import { Example } from "../components/Example";
import { componentDocs } from "../docs";
import type { ComponentDoc } from "../docs/types";
import { Link } from "../router";
import { DocsLayout } from "./Docs";

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const index = componentDocs.findIndex((item) => item.slug === doc.slug);
  const previous = index > 0 ? componentDocs[index - 1] : undefined;
  const next =
    index >= 0 && index < componentDocs.length - 1
      ? componentDocs[index + 1]
      : undefined;

  return (
    <DocsLayout>
      <nav className="site-breadcrumb" aria-label="Breadcrumb">
        <Link to="/docs">Dokumentasi</Link>
        <span aria-hidden="true">/</span>
        <Link to="/docs/components">Komponen</Link>
        <span aria-hidden="true">/</span>
        <span>{doc.name}</span>
      </nav>

      <header className="site-doc-head">
        <h1>{doc.name}</h1>
        <p className="site-doc-summary">{doc.summary}</p>
        <div className="site-doc-import">
          <p className="site-doc-import__label">Import</p>
          <CodeBlock
            code={`import { ${doc.name} } from "@nemo/ui";`}
            standalone
            hideCopy
          />
        </div>
      </header>

      <h2 className="site-h2" id="contoh">
        Contoh
      </h2>
      {doc.examples.map((example) => (
        <section key={example.id}>
          <h3 className="site-h3">{example.title}</h3>
          {example.description && (
            <p className="site-p">{example.description}</p>
          )}
          <Example example={example} />
        </section>
      ))}

      <h2 className="site-h2" id="api">
        API Reference
      </h2>
      <p className="site-p">
        Semua props bersifat opsional kecuali ditandai. Atribut HTML native pada
        elemen dasar ikut diteruskan.
      </p>
      <PropTable title={doc.name} rows={doc.props} />

      {doc.sections?.map((section) => (
        <section key={section.title}>
          <h3 className="site-h3">{section.title}</h3>
          <PropTable title={section.title} rows={section.rows} />
        </section>
      ))}

      {doc.notes && doc.notes.length > 0 && (
        <div className="site-prose">
          {doc.notes.map((note) => (
            <p key={note} className="site-p">
              {note}
            </p>
          ))}
        </div>
      )}

      <nav className="site-pager" aria-label="Navigasi komponen">
        {previous ? (
          <Link
            to={`/docs/components/${previous.slug}`}
            className="site-pager__link"
          >
            <span className="site-pager__label">Sebelumnya</span>
            <span className="site-pager__name">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/docs/components/${next.slug}`}
            className="site-pager__link site-pager__link--next"
          >
            <span className="site-pager__label">Berikutnya</span>
            <span className="site-pager__name">{next.name}</span>
          </Link>
        )}
      </nav>
    </DocsLayout>
  );
}
