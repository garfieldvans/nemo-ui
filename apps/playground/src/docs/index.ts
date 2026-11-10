import { contentDocs } from "./content";
import { feedbackDocs } from "./feedback";
import { formsDocs } from "./forms";
import { navigationDocs } from "./navigation";
import { overlaysDocs } from "./overlays";
import type { ComponentDoc, ComponentGroup } from "./types";

/** Semua komponen, urut alfabetis seperti daftar di sidebar. */
export const componentDocs: ComponentDoc[] = [
  ...contentDocs,
  ...formsDocs,
  ...feedbackDocs,
  ...navigationDocs,
  ...overlaysDocs,
].sort((a, b) => a.name.localeCompare(b.name));

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find((doc) => doc.slug === slug);
}

/** Filter komponen berdasarkan nama, slug, kategori, atau ringkasan. */
export function searchComponents(query: string): ComponentDoc[] {
  const term = query.trim().toLowerCase();
  if (!term) return componentDocs;

  return componentDocs.filter((doc) =>
    [doc.name, doc.slug, doc.group, doc.summary]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

export const GROUP_ORDER: ComponentGroup[] = [
  "Actions",
  "Forms",
  "Navigation",
  "Feedback",
  "Overlays",
  "Data display",
  "Layout",
];

export const componentGroups = GROUP_ORDER.map((group) => ({
  group,
  docs: componentDocs.filter((doc) => doc.group === group),
}));

export type { ComponentDoc, PropRow } from "./types";
