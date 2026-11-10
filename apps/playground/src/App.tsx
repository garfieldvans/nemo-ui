import {
  themeNames,
  themeSurfaces,
  toThemeOverride,
  ToastProvider,
  ThemeProvider,
  useTheme,
  type ThemeName,
} from "@nemo/ui";
import { useEffect, useState, type CSSProperties } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { getComponentDoc } from "./docs";
import { ComponentPage } from "./pages/ComponentPage";
import {
  ComponentsIndex,
  DocsOverview,
  GettingStarted,
  Theming,
} from "./pages/Docs";
import { Home } from "./pages/Home";
import { Playground } from "./pages/Playground";
import { Link, useRoute } from "./router";

const THEME_STORAGE_KEY = "nemo-playground-theme";
const MODE_STORAGE_KEY = "nemo-playground-mode";

function loadStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && (themeNames as readonly string[]).includes(stored)) {
      return stored as ThemeName;
    }
  } catch {
    // localStorage bisa diblokir (privacy mode) — pakai default.
  }
  return "sapphireOceanSerenity";
}

function loadStoredMode(): "light" | "dark" {
  try {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // storage tidak tersedia — pakai default.
  }
  return "light";
}

function NotFound() {
  return (
    <div className="site-container" style={{ padding: "96px 24px 128px" }}>
      <p className="site-eyebrow">404</p>
      <h1 style={{ fontSize: 40, letterSpacing: "-0.03em", margin: "12px 0" }}>
        Halaman tidak ditemukan
      </h1>
      <p className="site-lead" style={{ marginBottom: 28 }}>
        Alamat yang kamu buka tidak ada di dokumentasi ini. Coba mulai dari
        halaman utama atau daftar komponen.
      </p>
      <div className="site-cta-row">
        <Link to="/" className="site-button">
          Kembali ke beranda
        </Link>
        <Link to="/docs/components" className="site-button site-button--outlined">
          Lihat komponen
        </Link>
      </div>
    </div>
  );
}

function renderRoute(path: string) {
  if (path === "/") return <Home />;
  if (path === "/playground") return <Playground />;
  if (path === "/docs") return <DocsOverview />;
  if (path === "/docs/getting-started") return <GettingStarted />;
  if (path === "/docs/theming") return <Theming />;
  if (path === "/docs/components") return <ComponentsIndex />;

  if (path.startsWith("/docs/components/")) {
    const slug = path.slice("/docs/components/".length);
    const doc = getComponentDoc(slug);
    if (doc) return <ComponentPage doc={doc} />;
  }

  return <NotFound />;
}

function Site({
  themeName,
  onThemeChange,
}: {
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
}) {
  const path = useRoute();
  const { mode } = useTheme();

  // Sinkronkan color-scheme <html> supaya scrollbar & overscroll ikut mode,
  // dan tulis data-theme agar media query prefers-color-scheme di CSS tidak
  // menyalakan token gelap saat mode terang.
  useEffect(() => {
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // abaikan bila storage tidak tersedia
    }
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  useEffect(() => {
    const slug = path.startsWith("/docs/components/")
      ? path.slice("/docs/components/".length)
      : "";
    const doc = slug ? getComponentDoc(slug) : undefined;
    document.title = doc ? `${doc.name} — Nemo UI` : "Nemo UI — Dokumentasi";
  }, [path]);

  return (
    <div className="site-shell">
      <a href="#main" className="site-skip">
        Lompat ke konten
      </a>
      <SiteHeader themeName={themeName} onThemeChange={onThemeChange} />
      <main id="main" className="site-main">
        {renderRoute(path)}
      </main>
      <SiteFooter />
    </div>
  );
}

function App() {
  const [themeName, setThemeName] = useState<ThemeName>(loadStoredTheme);
  const surfaces = themeSurfaces(themeName);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch {
      // abaikan bila storage tidak tersedia
    }
  }, [themeName]);

  return (
    <ThemeProvider
      className="nemo-page"
      mode={loadStoredMode()}
      theme={toThemeOverride(themeName)}
      surface={false}
      // Canvas mode-aware: inline style provider tidak bisa bercabang per
      // mode, jadi kedua var ini dibaca oleh rule di index.css.
      style={
        {
          "--nemo-canvas-light": surfaces.light,
          "--nemo-canvas-dark": surfaces.dark,
        } as CSSProperties
      }
    >
      <ToastProvider>
        <Site themeName={themeName} onThemeChange={setThemeName} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
