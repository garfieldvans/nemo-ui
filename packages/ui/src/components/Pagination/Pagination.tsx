import { useCallback, useState } from "react";
import styles from "./Pagination.module.scss";

import type { PaginationProps } from "./Pagination.types";
import { clsx } from "../../utils/clsx";

type PageItem = number | "gap";

/** Jendela halaman: selalu ada 1 terakhir, ellipsis saat ada celah. */
function buildPages(page: number, pageCount: number, siblingCount: number): PageItem[] {
  if (pageCount <= 1 + 2 * siblingCount + 4) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const first = 1;
  const last = pageCount;
  const from = Math.max(first + 1, page - siblingCount);
  const to = Math.min(last - 1, page + siblingCount);
  const mid: PageItem[] = [];
  if (from > first + 1) mid.push("gap");
  for (let i = from; i <= to; i += 1) mid.push(i);
  if (to < last - 1) mid.push("gap");
  return [first, ...mid, last];
}

function ChevronIcon({ double = false, direction }: { double?: boolean; direction: "left" | "right" }) {
  const rotate = direction === "right" ? undefined : "180 0 0 0";
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...(rotate ? { style: { transform: "scaleX(-1)" } } : {})}
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      {double && (
        <polyline points={direction === "left" ? "19 18 13 12 19 6" : "5 18 11 12 5 6"} />
      )}
    </svg>
  );
}

export function Pagination({
  page,
  defaultPage = 1,
  pageCount,
  onChange,
  siblingCount = 1,
  size = "md",
  ariaLabel = "Navigasi halaman",
  className,
  style,
}: PaginationProps) {
  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage);
  const current = isControlled ? page : internalPage;

  const goto = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(1, next), pageCount);
      if (!isControlled) setInternalPage(clamped);
      onChange?.(clamped);
    },
    [isControlled, onChange, pageCount],
  );

  const pages = buildPages(current, pageCount, siblingCount);
  const canPrev = current > 1;
  const canNext = current < pageCount;

  const buttonClasses = (active: boolean, extra?: string) =>
    clsx(
      styles.button,
      styles[`button--${size}`],
      active && styles["button--active"],
      extra,
    );

  return (
    <nav aria-label={ariaLabel} className={clsx(styles.nav, className)} style={style}>
      <button
        type="button"
        className={buttonClasses(false, styles["button--nav"])}
        aria-label="Halaman pertama"
        disabled={!canPrev}
        onClick={() => goto(1)}
      >
        <ChevronIcon double direction="left" />
      </button>
      <button
        type="button"
        className={buttonClasses(false, styles["button--nav"])}
        aria-label="Halaman sebelumnya"
        disabled={!canPrev}
        onClick={() => goto(current - 1)}
      >
        <ChevronIcon direction="left" />
      </button>

      {pages.map((item, index) =>
        item === "gap" ? (
          <span
            key={`gap-${index}`}
            className={clsx(styles.gap, size === "sm" && styles["gap--sm"])}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={buttonClasses(item === current)}
            aria-label={`Halaman ${item}`}
            aria-current={item === current ? "page" : undefined}
            onClick={() => goto(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={buttonClasses(false, styles["button--nav"])}
        aria-label="Halaman berikutnya"
        disabled={!canNext}
        onClick={() => goto(current + 1)}
      >
        <ChevronIcon direction="right" />
      </button>
      <button
        type="button"
        className={buttonClasses(false, styles["button--nav"])}
        aria-label="Halaman terakhir"
        disabled={!canNext}
        onClick={() => goto(pageCount)}
      >
        <ChevronIcon double direction="right" />
      </button>
    </nav>
  );
}

Pagination.displayName = "Pagination";
