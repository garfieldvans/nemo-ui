import { useState, type ReactNode } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentSearch } from "../components/ComponentSearch";
import { SiteSidebar } from "../components/SiteSidebar";
import {
  componentDocs,
  componentGroups,
  GROUP_ORDER,
  searchComponents,
} from "../docs";
import { Link } from "../router";

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-docs">
      <SiteSidebar />
      <div className="site-content">{children}</div>
    </div>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="site-breadcrumb" aria-label="Breadcrumb">
      <Link to="/docs">Dokumentasi</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
}

const installSnippet = `pnpm add @nemo/ui
# atau
npm install @nemo/ui`;

const providerSnippet = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@nemo/ui";
import "@nemo/ui/index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider mode="light">
      <App />
    </ThemeProvider>
  </StrictMode>
);`;

const usageSnippet = `import { Button, Card, CardBody } from "@nemo/ui";

export function Contoh() {
  return (
    <Card>
      <CardBody>
        <Button onClick={() => alert("Halo!")}>Klik saya</Button>
      </CardBody>
    </Card>
  );
}`;

export function DocsOverview() {
  return (
    <DocsLayout>
      <Breadcrumb current="Pengenalan" />
      <header className="site-doc-head">
        <h1>Dokumentasi</h1>
        <p className="site-doc-summary">
          Nemo UI adalah kumpulan komponen React yang memakai token desain untuk
          warna, jarak, radius, dan bayangan. Semua komponen mendukung mode
          terang dan gelap tanpa konfigurasi tambahan.
        </p>
      </header>

      <div className="site-prose">
        <h2 className="site-h2">Yang ada di dalamnya</h2>
        <p className="site-p">
          Ada {componentDocs.length} komponen yang dikelompokkan ke dalam{" "}
          {componentGroups.length} kategori. Setiap halaman komponen berisi
          contoh yang bisa dijalankan, cuplikan kode, dan tabel API lengkap
          dengan nilai default.
        </p>
        <ul>
          {componentGroups.map((group) => (
            <li key={group.group}>
              <Link
                to={`/docs/components#${group.group
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="site-link"
              >
                {group.group}
              </Link>{" "}
              — {group.docs.length} komponen
            </li>
          ))}
        </ul>

        <h2 className="site-h2">Langkah berikutnya</h2>
      </div>

      <div className="site-grid" style={{ marginTop: 12 }}>
        <Link to="/docs/getting-started" className="site-component-link">
          <strong>Memulai</strong>
          <span>Install paket dan pasang ThemeProvider di aplikasi kamu.</span>
        </Link>
        <Link to="/docs/theming" className="site-component-link">
          <strong>Tema &amp; warna</strong>
          <span>Cara kerja token, palet, dan override warna perusahaan.</span>
        </Link>
        <Link to="/docs/components" className="site-component-link">
          <strong>Daftar komponen</strong>
          <span>Jelajahi seluruh komponen berdasarkan kategori.</span>
        </Link>
      </div>
    </DocsLayout>
  );
}

export function GettingStarted() {
  return (
    <DocsLayout>
      <Breadcrumb current="Memulai" />
      <header className="site-doc-head">
        <h1>Memulai</h1>
        <p className="site-doc-summary">
          Tiga langkah untuk memakai Nemo UI: install paket, muat stylesheet,
          lalu bungkus aplikasi dengan ThemeProvider.
        </p>
      </header>

      <div className="site-prose">
        <h2 className="site-h2">1. Install</h2>
        <p className="site-p">
          Paket dipublikasikan sebagai <code className="site-inline-code">
            @nemo/ui
          </code>{" "}
          dan membutuhkan React 18 ke atas.
        </p>
      </div>
      <CodeBlock code={installSnippet} standalone />

      <div className="site-prose">
        <h2 className="site-h2">2. Muat stylesheet &amp; provider</h2>
        <p className="site-p">
          Stylesheet berisi token CSS dan gaya komponen. ThemeProvider mengatur
          mode terang/gelap serta menyuntikkan token tema ke dalam wrapper.
        </p>
      </div>
      <CodeBlock code={providerSnippet} standalone />

      <div className="site-prose">
        <h2 className="site-h2">3. Pakai komponen</h2>
        <p className="site-p">
          Import komponen dari root paket. Semua props bertipe, jadi editor akan
          menampilkan pilihan varian dan warna yang tersedia.
        </p>
      </div>
      <CodeBlock code={usageSnippet} standalone />

      <div className="site-prose">
        <h2 className="site-h2">Mengganti mode</h2>
        <p className="site-p">
          Panggil <code className="site-inline-code">useTheme()</code> di dalam
          provider untuk membaca dan mengganti mode:
        </p>
      </div>
      <CodeBlock
        code={`import { useTheme } from "@nemo/ui";

function ToggleMode() {
  const { mode, setMode } = useTheme();
  return (
    <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      Mode: {mode}
    </button>
  );
}`}
        standalone
      />

      <div className="site-prose">
        <h2 className="site-h2">Selanjutnya</h2>
        <p className="site-p">
          Pelajari cara kerja token di{" "}
          <Link to="/docs/theming" className="site-link">
            halaman tema
          </Link>{" "}
          atau langsung buka{" "}
          <Link to="/docs/components/button" className="site-link">
            dokumentasi komponen pertama
          </Link>
          .
        </p>
      </div>
    </DocsLayout>
  );
}

const tokenSnippet = `.kartu {
  background: var(--nemo-neutral-0);
  color: var(--nemo-neutral-900);
  border: 1px solid var(--nemo-neutral-200);
  border-radius: var(--nemo-radius-md, 8px);
  padding: var(--nemo-spacing-6, 24px);
}`;

const overrideSnippet = `import { ThemeProvider } from "@nemo/ui";

<ThemeProvider
  mode="dark"
  theme={{
    colors: {
      primary: { 500: "#0EA5E9", 600: "#0284C7" },
    },
  }}
>
  <App />
</ThemeProvider>;`;

export function Theming() {
  return (
    <DocsLayout>
      <Breadcrumb current="Tema & warna" />
      <header className="site-doc-head">
        <h1>Tema &amp; warna</h1>
        <p className="site-doc-summary">
          Semua komponen membaca warna, jarak, dan radius dari CSS variable
          berawalan <code className="site-inline-code">--nemo-</code>. Ganti
          variabelnya, seluruh UI ikut berubah.
        </p>
      </header>

      <div className="site-prose">
        <h2 className="site-h2">Token di CSS</h2>
        <p className="site-p">
          Gunakan token yang sama di komponen buatanmu supaya tetap konsisten
          saat mode atau palet berganti. Nilai neutral 300–900 otomatis dibalik
          pada mode gelap.
        </p>
      </div>
      <CodeBlock code={tokenSnippet} standalone />

      <div className="site-prose">
        <h2 className="site-h2">Palet bawaan</h2>
        <p className="site-p">
          Sembilan palet tersedia dan bisa diganti dari pemilih di header
          dokumentasi ini. Pilihan palet disimpan di localStorage, begitu juga
          mode terang/gelap.
        </p>
        <ul>
          <li>Sapphire — biru tenang, palet default.</li>
          <li>Deep Sea — biru gelap dengan aksen dingin.</li>
          <li>Monochrome — netral dengan aksen merah.</li>
          <li>Cinnamon — cokelat hangat.</li>
          <li>Mint — hijau segar.</li>
          <li>Cinnabar — merah menyala.</li>
          <li>Glaucous — biru keabu-abuan.</li>
          <li>Lime — hijau limau.</li>
          <li>Gunmetal — abu-abu gelap kebiruan.</li>
        </ul>

        <h2 className="site-h2">Override per aplikasi</h2>
        <p className="site-p">
          Untuk warna brand sendiri, kirim objek <code className="site-inline-code">
            theme
          </code>{" "}
          ke provider. Objek ini digabung dalam ke token default, jadi cukup
          isi bagian yang ingin diubah.
        </p>
      </div>
      <CodeBlock code={overrideSnippet} standalone />

      <div className="site-prose">
        <h2 className="site-h2">Mode gelap</h2>
        <p className="site-p">
          Prop <code className="site-inline-code">mode</code> hanya menentukan
          nilai awal; setelah itu gunakan <code className="site-inline-code">
            setMode
          </code>{" "}
          dari <code className="site-inline-code">useTheme()</code>. Provider
          menulis <code className="site-inline-code">data-theme</code> pada
          wrapper sehingga selector CSS bisa menyesuaikan diri.
        </p>
      </div>
    </DocsLayout>
  );
}

export function ComponentsIndex() {
  const [query, setQuery] = useState("");
  const matches = searchComponents(query);
  const isSearching = query.trim().length > 0;

  const groups = isSearching
    ? GROUP_ORDER.map((group) => ({
        group,
        docs: matches.filter((doc) => doc.group === group),
      })).filter((group) => group.docs.length > 0)
    : componentGroups;

  return (
    <DocsLayout>
      <Breadcrumb current="Semua komponen" />
      <header className="site-doc-head">
        <h1>Semua komponen</h1>
        <p className="site-doc-summary">
          {componentDocs.length} komponen, dikelompokkan berdasarkan fungsinya.
          Klik salah satu untuk melihat contoh dan tabel API.
        </p>
      </header>

      <ComponentSearch
        value={query}
        onChange={setQuery}
        className="site-index-search"
      />

      {isSearching ? (
        <p className="site-index-status" aria-live="polite">
          {matches.length > 0
            ? `${matches.length} komponen cocok dengan “${query.trim()}”.`
            : `Tidak ada komponen yang cocok dengan “${query.trim()}”.`}
        </p>
      ) : null}

      {groups.map((group) => (
        <section key={group.group}>
          <h2
            className="site-h2"
            id={group.group.toLowerCase().replace(/\s+/g, "-")}
          >
            {group.group}
          </h2>
          <div className="site-grid">
            {group.docs.map((doc) => (
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
        </section>
      ))}
    </DocsLayout>
  );
}
