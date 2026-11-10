import { primaryColor, themeNames, useTheme, type ThemeName } from "@nemo/ui";
import { Link, useRoute } from "../router";
import { themeLabels } from "../themeLabels";

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function SiteHeader({
  themeName,
  onThemeChange,
}: {
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
}) {
  const path = useRoute();
  const { mode, setMode } = useTheme();
  const isDocs = path === "/docs" || path.startsWith("/docs/");

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-brand">
          <span className="site-brand__mark" aria-hidden="true">
            N
          </span>
          Nemo UI
          <span className="site-brand__badge">v0.1</span>
        </Link>

        <nav className="site-nav" aria-label="Navigasi utama">
          <Link
            to="/"
            className="site-nav__link"
            aria-current={path === "/" ? "page" : undefined}
          >
            Ikhtisar
          </Link>
          <Link
            to="/docs"
            className="site-nav__link"
            aria-current={isDocs ? "page" : undefined}
          >
            Dokumentasi
          </Link>
          <Link
            to="/playground"
            className="site-nav__link"
            aria-current={path === "/playground" ? "page" : undefined}
          >
            Playground
          </Link>
        </nav>

        <div className="site-header__actions">
          <div className="site-palette">
            <span
              className="site-palette__dot"
              style={{ background: primaryColor(themeName) }}
              aria-hidden="true"
            />
            <select
              aria-label="Palet tema"
              className="site-palette__select"
              value={themeName}
              onChange={(event) =>
                onThemeChange(event.target.value as ThemeName)
              }
              title="Palet tema"
            >
              {themeNames.map((name) => (
                <option key={name} value={name}>
                  {themeLabels[name]}
                </option>
              ))}
            </select>
            <svg
              className="site-palette__chevron"
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 4.5 6 7.5l3-3" />
            </svg>
          </div>

          <button
            type="button"
            className="site-icon-button"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            aria-label={
              mode === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"
            }
            title={mode === "dark" ? "Mode terang" : "Mode gelap"}
          >
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
