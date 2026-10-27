import styles from "./Table.module.scss";

import type { TableProps } from "./Table.types";
import { clsx } from "../../utils/clsx";

function defaultCell<T>(row: T, key: string): React.ReactNode {
  const value = (row as Record<string, unknown>)[key];
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return String(value);
  return String(value);
}

export function Table<T>({
  columns,
  data,
  rowKey,
  caption,
  striped = false,
  size = "md",
  emptyText = "Tidak ada data",
  className,
  style,
}: TableProps<T>) {
  const tableClasses = clsx(
    styles.table,
    styles[`table--${size}`],
    striped && styles["table--striped"],
    className,
  );

  return (
    <div className={styles.wrapper} style={style}>
      <table className={tableClasses}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width, textAlign: col.align }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={rowKey(row, index)}>
                {columns.map((col) => (
                  <td key={col.key} style={{ textAlign: col.align }}>
                    {col.render ? col.render(row, index) : defaultCell(row, col.key)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = "Table";
