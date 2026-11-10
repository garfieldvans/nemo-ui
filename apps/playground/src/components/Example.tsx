import { useState } from "react";
import type { DocExample } from "../docs/types";
import { CodeBlock } from "./CodeBlock";

type ExampleTab = "preview" | "code";

export function Example({
  example,
  idPrefix,
}: {
  example: DocExample;
  /** Pemisah id agar beberapa dokumen bisa dirender di satu halaman. */
  idPrefix?: string;
}) {
  const [tab, setTab] = useState<ExampleTab>("preview");
  const anchorId = idPrefix ? `${idPrefix}-${example.id}` : example.id;
  const panelId = `example-${anchorId}-panel`;

  return (
    <div className="site-example" id={anchorId}>
      <div className="site-example__bar">
        <button
          type="button"
          role="tab"
          className="site-example__tab"
          aria-selected={tab === "preview"}
          aria-controls={panelId}
          onClick={() => setTab("preview")}
        >
          Pratinjau
        </button>
        <button
          type="button"
          role="tab"
          className="site-example__tab"
          aria-selected={tab === "code"}
          aria-controls={panelId}
          onClick={() => setTab("code")}
        >
          Kode
        </button>
        <span className="site-example__spacer" />
      </div>
      <div id={panelId} role="tabpanel">
        {tab === "preview" ? (
          <div
            className={`site-example__body${
              example.stack ? " site-example__body--stack" : ""
            }`}
          >
            {example.preview}
          </div>
        ) : (
          <CodeBlock code={example.code} />
        )}
      </div>
    </div>
  );
}
