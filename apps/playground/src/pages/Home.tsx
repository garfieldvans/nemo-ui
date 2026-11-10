import { CodeBlock } from "../components/CodeBlock";
import { componentDocs } from "../docs";
import { Link } from "../router";

const installSnippet = `pnpm add @nemo/ui`;

const usageSnippet = `import { ThemeProvider, Button } from "@nemo/ui";
import "@nemo/ui/index.css";

export default function App() {
  return (
    <ThemeProvider>
      <Button>Halo Nemo</Button>
    </ThemeProvider>
  );
}`;

const features = [
  {
    title: "Aksesibel secara default",
    description:
      "Peran ARIA, focus trap, navigasi keyboard, dan kontras warna sudah ditangani komponennya.",
  },
  {
    title: "Berbasis token tema",
    description:
      "Semua warna, jarak, dan radius mengalir dari token CSS var — ganti palet tanpa menyentuh komponen.",
  },
  {
    title: "TypeScript first",
    description:
      "Setiap prop bertipe ketat, sehingga salah pakai varian atau warna langsung ketahuan saat compile.",
  },
  {
    title: "Ringan & tanpa gaya global",
    description:
      "CSS module per komponen, tanpa runtime CSS-in-JS, dan aman dipakai berdampingan dengan Tailwind.",
  },
];

export function Home() {
  return (
    <>
      <section className="site-hero">
        <div className="site-hero__inner">
          <span className="site-eyebrow">React component library</span>
          <h1>Komponen siap pakai untuk antarmuka yang rapi.</h1>
          <p className="site-lead">
            Nemo UI mengumpulkan {componentDocs.length} komponen React yang
            aksesibel, konsisten, dan mudah diubah temanya — dari tombol sampai
            tabel data. Salin contohnya, tempel ke project, selesai.
          </p>
          <div className="site-cta-row site-hero__actions">
            <Link to="/docs/getting-started" className="site-button site-button--lg">
              Mulai sekarang
            </Link>
            <Link
              to="/docs/components"
              className="site-button site-button--outlined site-button--lg"
            >
              Jelajahi komponen
            </Link>
            <Link
              to="/playground"
              className="site-button site-button--text site-button--lg"
            >
              Buka playground
            </Link>
          </div>
          <div className="site-hero__meta">
            <span>{componentDocs.length} komponen</span>
            <span>TypeScript</span>
            <span>Mode terang &amp; gelap</span>
            <span>9 palet warna</span>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="site-section__head">
            <div>
              <h2>Mulai dalam satu menit</h2>
              <p>
                Install paket, bungkus aplikasi dengan provider, lalu pakai
                komponen seperti komponen React biasa.
              </p>
            </div>
            <Link to="/docs/getting-started" className="site-link">
              Panduan lengkap →
            </Link>
          </div>

          <div className="site-docs" style={{ padding: 0, display: "block" }}>
            <p className="site-doc-import__label">1. Install</p>
            <CodeBlock code={installSnippet} standalone hideCopy />
            <p className="site-doc-import__label">2. Pakai</p>
            <CodeBlock code={usageSnippet} standalone hideCopy />
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="site-section__head">
            <div>
              <h2>Kenapa Nemo UI</h2>
              <p>
                Dibuat untuk tim yang ingin tampilan konsisten tanpa menulis
                ulang lapisan aksesibilitas dan tema.
              </p>
            </div>
          </div>
          <div className="site-features">
            {features.map((feature) => (
              <div key={feature.title} className="site-card site-feature">
                <div className="site-feature__icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="site-section__head">
            <div>
              <h2>Semua komponen</h2>
              <p>
                {componentDocs.length} komponen dengan dokumentasi API lengkap
                dan contoh yang bisa langsung disalin.
              </p>
            </div>
            <Link to="/docs/components" className="site-link">
              Lihat daftar lengkap →
            </Link>
          </div>
          <div className="site-grid">
            {componentDocs.map((doc) => (
              <Link
                key={doc.slug}
                to={`/docs/components/${doc.slug}`}
                className="site-component-link"
              >
                <strong>{doc.name}</strong>
                <span>{doc.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section" style={{ borderBottom: "none" }}>
        <div className="site-container">
          <div className="site-cta-panel">
            <div>
              <h2>Coba semuanya sekaligus</h2>
              <p>
                Playground menampilkan setiap komponen dalam keadaan hidup —
                ganti palet dan mode dari header.
              </p>
            </div>
            <Link to="/playground" className="site-button site-button--lg">
              Buka playground
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
