import { useCallback, useState } from "react";
import type { PropRow } from "../docs/types";

interface CodeBlockProps {
  code: string;
  /** Tambahkan border + margin bila blok kode berdiri sendiri. */
  standalone?: boolean;
  /** Sembunyikan tombol salin untuk blok yang sangat pendek. */
  hideCopy?: boolean;
}

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CodeBlock({ code, standalone, hideCopy }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {
        // Clipboard bisa diblokir — diamkan saja, kode tetap bisa diseleksi.
      });
  }, [code]);

  return (
    <pre className={`site-code${standalone ? " site-code--standalone" : ""}`}>
      <code>{code}</code>
      {!hideCopy && (
        <button
          type="button"
          className="site-copy"
          onClick={copy}
          aria-label={copied ? "Kode disalin" : "Salin kode"}
        >
          <CopyIcon />
          {copied ? "Tersalin" : "Salin"}
        </button>
      )}
    </pre>
  );
}

export function PropTable({
  title,
  rows,
}: {
  title: string;
  rows: PropRow[];
}) {
  return (
    <div className="site-props">
      <div className="site-props__scroll">
        <table>
          <caption
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              whiteSpace: "nowrap",
            }}
          >
            {title} props
          </caption>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Tipe</th>
              <th scope="col">Default</th>
              <th scope="col">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="site-props__name">{row.name}</td>
                <td className="site-props__type">{row.type}</td>
                <td className="site-props__default">{row.default ?? "—"}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
