import { Link } from "../router";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">
            <span className="site-brand__mark" aria-hidden="true">
              N
            </span>
            Nemo UI
          </div>
          <p style={{ margin: "10px 0 0" }}>
            Komponen React beraksesibilitas tinggi, bertema token.
          </p>
        </div>
        <nav className="site-footer__nav" aria-label="Navigasi footer">
          <Link to="/docs">Dokumentasi</Link>
          <Link to="/docs/getting-started">Memulai</Link>
          <Link to="/docs/components">Komponen</Link>
          <Link to="/playground">Playground</Link>
        </nav>
      </div>
    </footer>
  );
}
