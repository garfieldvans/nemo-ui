import type { ReactNode } from "react";

export type ComponentGroup =
  | "Actions"
  | "Forms"
  | "Feedback"
  | "Navigation"
  | "Overlays"
  | "Data display"
  | "Layout";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface DocExample {
  id: string;
  title: string;
  description?: string;
  /** Cuplikan kode yang ditampilkan di tab "Kode". */
  code: string;
  /** Demo live — dirender di tab "Pratinjau". */
  preview: ReactNode;
  /** Pratinjau ditumpuk vertikal (cocok untuk form). */
  stack?: boolean;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  group: ComponentGroup;
  summary: string;
  examples: DocExample[];
  props: PropRow[];
  /** Tabel tambahan untuk sub-komponen (mis. CardHeader, Menu.Item). */
  sections?: { title: string; rows: PropRow[] }[];
  /** Catatan tambahan di bawah API reference. */
  notes?: string[];
}
