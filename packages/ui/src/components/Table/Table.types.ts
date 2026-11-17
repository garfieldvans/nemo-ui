import type { CSSProperties, ReactNode } from "react";

export type TableSize = "sm" | "md";
export type TableAlign = "left" | "center" | "right";
export type TableSortDirection = "asc" | "desc";

export interface TableSortState {
  /** Kunci kolom yang diurutkan. */
  key: string;
  direction: TableSortDirection;
}

export interface TableColumn<T> {
  /** Kunci kolom — dipakai sebagai akses default ke field row (jika tanpa render). */
  key: string;
  header: ReactNode;
  /** Renderer sel kustom; default: ambil row[key] dan String(). */
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  width?: number | string;
  /** Aktifkan pengurutan lewat klik header. */
  sortable?: boolean;
  /** Nilai pembanding saat diurutkan; default: row[key]. */
  sortValue?: (row: T) => string | number | null | undefined;
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
  /**
   * Urutan terkontrol. Jika diberikan (termasuk null), Table tidak menyimpan
   * urutan sendiri dan sepenuhnya mengikuti nilai ini — berguna saat data
   * diurutkan di server.
   */
  sort?: TableSortState | null;
  /** Urutan awal saat uncontrolled; kosong berarti mengikuti urutan data. */
  defaultSort?: TableSortState;
  /** Dipanggil setiap urutan berubah (null saat kembali ke urutan data). */
  onSortChange?: (sort: TableSortState | null) => void;
  /** Tampilkan kolom checkbox untuk memilih baris. */
  selectable?: boolean;
  /** Kunci baris terpilih (controlled). */
  selectedKeys?: string[];
  /** Pilihan awal saat uncontrolled. */
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  /** Header tetap terlihat saat tabel digulir. */
  stickyHeader?: boolean;
  /** Batas tinggi area tabel agar gulir vertikal aktif. */
  maxHeight?: number | string;
  className?: string;
  style?: CSSProperties;
}
