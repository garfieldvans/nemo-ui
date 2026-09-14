import { forwardRef } from "react";
import styles from "./Skeleton.module.scss";

import type { SkeletonProps } from "./Skeleton.types";
import { clsx } from "../../utils/clsx";

function toPx(value: number | string | undefined): string | undefined {
  if (typeof value === "number") return `${value}px`;
  return value;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      lines = 1,
      animation = "pulse",
      label,
      className,
      style,
    },
    ref
  ) => {
    const count = variant === "text" ? Math.max(1, lines) : 1;

    const defaultWidth =
      width ?? (variant === "text" ? undefined : variant === "circle" ? 40 : "100%");
    const defaultHeight =
      height ?? (variant === "text" ? 16 : variant === "circle" ? 40 : 56);

    const bars = Array.from({ length: count }, (_, i) => {
      const lastShort = variant === "text" && count > 1 && i === count - 1;
      const barWidth = variant === "text" ? (lastShort ? undefined : defaultWidth) : defaultWidth;
      return {
        key: i,
        width: toPx(barWidth),
        height: toPx(defaultHeight),
        // Baris terakhir lebih pendek (60%) dari baris pertama — pola loading umum.
        lastShort,
      };
    });

    const rootClasses = clsx(
      styles.skeleton,
      styles[`skeleton--${variant}`],
      className
    );

    return (
      <div
        ref={ref}
        className={rootClasses}
        style={style}
        aria-hidden={label ? undefined : true}
      >
        {label && <span className={styles["sr-only"]}>{label}</span>}
        {bars.map((bar) => (
          <span
            key={bar.key}
            data-variant={variant}
            data-animation={animation}
            data-short={bar.lastShort ? true : undefined}
            className={clsx(
              styles["skeleton-bar"],
              styles[`skeleton-bar--${variant}`],
              styles[`skeleton-bar--${animation}`],
              bar.lastShort && styles["skeleton-bar--short"]
            )}
            style={
              bar.lastShort && bar.width === undefined
                ? { height: bar.height }
                : { width: bar.width, height: bar.height }
            }
          />
        ))}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";