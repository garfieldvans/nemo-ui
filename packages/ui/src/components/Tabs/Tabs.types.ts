import type { CSSProperties, ReactNode } from "react";

export type TabsVariant = "line" | "pill";
export type TabsSize = "sm" | "md";

export interface TabsItem {
  /** Nilai tab — dipakai sebagai identifier controlled/uncontrolled. */
  value: string;
  label: ReactNode;
  disabled?: boolean;
  /** Konten panel yang dirender saat tab ini aktif. */
  content?: ReactNode;
}

export interface TabsProps {
  items: TabsItem[];
  /** Controlled — tentukan tab aktif dari parent. */
  value?: string;
  /** Uncontrolled — tab aktif awal. Default: item enabled pertama. */
  defaultValue?: string;
  /** Dipanggil saat tab berubah (controlled maupun uncontrolled). */
  onChange?: (value: string) => void;
  /** Gaya tablist: garis bawah (line) atau kapsul (pill). Default "line". */
  variant?: TabsVariant;
  size?: TabsSize;
  /** Nama aksesibel tablist (role=tablist butuh nama). */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}
