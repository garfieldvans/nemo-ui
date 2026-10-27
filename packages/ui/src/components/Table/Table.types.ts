import type { CSSProperties, ReactNode } from "react";

export type TableSize = "sm" | "md";
export type TableAlign = "left" | "center" | "right";

export interface TableColumn<T> {
  /** Kunci kolom — dipakai sebagai akses default ke field row (jika tanpa render). */
  key: string;
  header: ReactNode;
  /** Renderer sel kustom; default: ambil row[key] dan String(). */
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  width?: number | string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** Kunci React untuk tiap baris. */
  rowKey: (row: T, index: number) => string;
  caption?: ReactNode;
  /** Selang-seling warna baris genap. */
  striped?: boolean;
  size?: TableSize;
  /** Pesan saat data kosong. Default "Tidak ada data". */
  emptyText?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
