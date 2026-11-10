import { useState } from "react";
import { componentDocs, searchComponents } from "../docs";
import { Link, useRoute } from "../router";
import { ComponentSearch } from "./ComponentSearch";

const startLinks = [
  { href: "/docs", label: "Pengenalan" },
  { href: "/docs/getting-started", label: "Memulai" },
  { href: "/docs/theming", label: "Tema & warna" },
  { href: "/docs/components", label: "Semua komponen" },
];

export function SiteSidebar() {
  const path = useRoute();
  const [query, setQuery] = useState("");
  const matches = searchComponents(query);
  const isSearching = query.trim().length > 0;

  return (
    <aside className="site-sidebar" aria-label="Navigasi dokumentasi">
      {/* Halaman indeks punya kolom pencarian sendiri untuk grid komponen. */}
      {path === "/docs/components" ? null : (
        <ComponentSearch value={query} onChange={setQuery} />
      )}

      <div className="site-sidebar__group">
        <p className="site-sidebar__title">Mulai</p>
        {startLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="site-sidebar__link"
            aria-current={path === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="site-sidebar__group">
        <p className="site-sidebar__title">
          Komponen
          <span className="site-sidebar__count" aria-live="polite">
            {isSearching ? `${matches.length} hasil` : componentDocs.length}
          </span>
        </p>
        {matches.map((doc) => {
          const href = `/docs/components/${doc.slug}`;
          return (
            <Link
              key={doc.slug}
              to={href}
              className="site-sidebar__link"
              aria-current={path === href ? "page" : undefined}
            >
              {doc.name}
            </Link>
          );
        })}
        {matches.length === 0 ? (
          <p className="site-sidebar__empty" role="status">
            Tidak ada komponen yang cocok dengan “{query.trim()}”.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
