import { useMemo, useState } from "react";

import styles from "./Table.module.scss";

import type { TableColumn, TableProps, TableSortState } from "./Table.types";
import { clsx } from "../../utils/clsx";
import { Checkbox } from "../Checkbox/Checkbox";
import { Pagination } from "../Pagination/Pagination";

function defaultCell<T>(row: T, key: string): React.ReactNode {
  const value = (row as Record<string, unknown>)[key];
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return String(value);
  return String(value);
}

function cellValue<T>(row: T, column: TableColumn<T>): string | number | null | undefined {
  if (column.sortValue) return column.sortValue(row);
  const value = (row as Record<string, unknown>)[column.key];
  if (typeof value === "number" || typeof value === "string") return value;
  return value === null || value === undefined ? value : String(value);
}

function compareValues(
  a: string | number | null | undefined,
  b: string | number | null | undefined,
) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  const left = a === null || a === undefined ? "" : String(a);
  const right = b === null || b === undefined ? "" : String(b);
  return left.localeCompare(right, "id", { numeric: true });
}

export function Table<T>({
  columns,
  data,
  rowKey,
  caption,
  striped = false,
  size = "md",
  emptyText = "Tidak ada data",
  sort: sortProp,
  defaultSort,
  onSortChange,
  pagination,
  selectable = false,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  stickyHeader = false,
  maxHeight,
  className,
  style,
}: TableProps<T>) {
  const [internalSort, setInternalSort] = useState<TableSortState | null>(defaultSort ?? null);
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultSelectedKeys ?? []);
  const [internalPage, setInternalPage] = useState(pagination?.defaultPage ?? 1);

  const controlledSort = sortProp !== undefined;
  const sort = controlledSort ? sortProp : internalSort;
  const controlledSelection = selectedKeys !== undefined;
  const currentSelection = controlledSelection ? selectedKeys : internalSelected;
  const selectedSet = new Set(currentSelection);

  const sortedData = useMemo(() => {
    if (!sort) return data;
    const column = columns.find((col) => col.key === sort.key);
    if (!column) return data;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...data].sort(
      (a, b) => compareValues(cellValue(a, column), cellValue(b, column)) * factor,
    );
  }, [columns, data, sort]);

  const pageSize = pagination?.pageSize ?? 10;
  // Dengan `pageCount`, data sudah dipotong pemanggil sehingga Table hanya menampilkannya.
  const serverPaged = pagination?.pageCount !== undefined;
  const pageCount = pagination
    ? serverPaged
      ? Math.max(1, pagination.pageCount ?? 1)
      : Math.max(1, Math.ceil(sortedData.length / pageSize))
    : 1;
  const controlledPage = pagination?.page !== undefined;
  const currentPage = Math.min(
    Math.max(1, controlledPage ? (pagination?.page ?? 1) : internalPage),
    pageCount,
  );
  const pageOffset = pagination && !serverPaged ? (currentPage - 1) * pageSize : 0;
  const pageData =
    pagination && !serverPaged ? sortedData.slice(pageOffset, pageOffset + pageSize) : sortedData;
  const totalRows = pagination
    ? (pagination.total ?? (serverPaged ? undefined : sortedData.length))
    : undefined;

  const handlePageChange = (next: number) => {
    if (!controlledPage) setInternalPage(next);
    pagination?.onChange?.(next);
  };

  const allKeys = pageData.map((row, index) => rowKey(row, pageOffset + index));
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedSet.has(key));
  const someSelected = allKeys.some((key) => selectedSet.has(key));

  const commitSelection = (keys: string[]) => {
    if (!controlledSelection) setInternalSelected(keys);
    onSelectionChange?.(keys);
  };

  const toggleRow = (key: string) => {
    const next = selectedSet.has(key)
      ? currentSelection.filter((item) => item !== key)
      : [...currentSelection, key];
    commitSelection(next);
  };

  const toggleAll = () => {
    if (allSelected) {
      commitSelection(currentSelection.filter((key) => !allKeys.includes(key)));
    } else {
      commitSelection([...currentSelection, ...allKeys.filter((key) => !selectedSet.has(key))]);
    }
  };

  const handleSort = (key: string) => {
    let next: TableSortState | null;
    if (!sort || sort.key !== key) {
      next = { key, direction: "asc" };
    } else if (sort.direction === "asc") {
      next = { key, direction: "desc" };
    } else {
      next = null;
    }
    if (!controlledSort) setInternalSort(next);
    onSortChange?.(next);
  };

  const tableClasses = clsx(
    styles.table,
    styles[`table--${size}`],
    striped && styles["table--striped"],
    stickyHeader && styles["table--sticky"],
    className,
  );

  const wrapperClasses = clsx(
    styles.wrapper,
    maxHeight !== undefined && styles["wrapper--scrollable"],
  );

  const firstColSpan = columns.length + (selectable ? 1 : 0);
  const showPagination = Boolean(pagination) && pageCount > 1;

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <div className={wrapperClasses} style={maxHeight !== undefined ? { maxHeight } : undefined}>
        <table className={tableClasses}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className={styles["checkbox-cell"]}>
                  <Checkbox
                    size="sm"
                    checked={allSelected}
                    indeterminate={!allSelected && someSelected}
                    disabled={pageData.length === 0}
                    onChange={toggleAll}
                    aria-label="Pilih semua baris"
                  />
                </th>
              )}
              {columns.map((col) => {
                const active = sort?.key === col.key;
                const ariaSort = active
                  ? sort.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : "none";
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={col.sortable ? ariaSort : undefined}
                    style={{ width: col.width, textAlign: col.align }}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className={styles["sort-button"]}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.header}
                        <svg
                          className={clsx(
                            styles["sort-icon"],
                            active && styles["sort-icon--active"],
                            active && sort.direction === "asc" && styles["sort-icon--asc"],
                          )}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={firstColSpan}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              pageData.map((row, index) => {
                const key = rowKey(row, pageOffset + index);
                const selected = selectedSet.has(key);
                return (
                  <tr key={key} className={clsx(selected && styles["table__row--selected"])}>
                    {selectable && (
                      <td className={styles["checkbox-cell"]}>
                        <Checkbox
                          size="sm"
                          checked={selected}
                          onChange={() => toggleRow(key)}
                          aria-label={`Pilih baris ${key}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} style={{ textAlign: col.align }}>
                        {col.render ? col.render(row, index) : defaultCell(row, col.key)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showPagination && pagination && (
        <div className={styles["pagination"]}>
          <span className={styles["pagination-info"]}>
            {totalRows !== undefined
              ? `${totalRows} baris · halaman ${currentPage} dari ${pageCount}`
              : `Halaman ${currentPage} dari ${pageCount}`}
          </span>
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            size={pagination.size}
            ariaLabel={pagination.ariaLabel ?? "Navigasi halaman tabel"}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

Table.displayName = "Table";
