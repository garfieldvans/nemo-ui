import { forwardRef } from "react";
import styles from "./Progress.module.scss";

import type { ProgressProps } from "./Progress.types";
import { clsx } from "../../utils/clsx";

const CIRCLE_SIZE: Record<string, number> = { sm: 32, md: 48, lg: 64 };
const CIRCLE_STROKE: Record<string, number> = { sm: 3, md: 4, lg: 5 };
const CIRCLE_RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      color = "primary",
      variant = "line",
      indeterminate = false,
      label,
      showValue = false,
      className,
      style,
    },
    ref
  ) => {
    const safeMax = max > 0 ? max : 100;
    const pct = indeterminate
      ? 0
      : Math.min(100, Math.max(0, (value / safeMax) * 100));
    const rounded = Math.round(pct);
    const accessibleLabel = label ?? "Progress";

    const ariaProps = {
      role: "progressbar" as const,
      "aria-label": accessibleLabel,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-valuenow": indeterminate ? undefined : value,
    };

    if (variant === "circle") {
      const px = CIRCLE_SIZE[size];
      const stroke = CIRCLE_STROKE[size];
      const dashOffset = CIRCUMFERENCE * (1 - pct / 100);

      return (
        <div
          ref={ref}
          {...ariaProps}
          className={clsx(
            styles.progress,
            styles["progress--circle"],
            styles[`progress--${size}`],
            indeterminate && styles["progress--indeterminate"],
            className
          )}
          style={{ width: px, height: px, ...style }}
        >
          <svg className={styles["progress-circle-svg"]} viewBox="0 0 36 36">
            <circle
              className={styles["progress-circle-track"]}
              cx="18"
              cy="18"
              r={CIRCLE_RADIUS}
              fill="none"
              strokeWidth={stroke}
            />
            <circle
              className={clsx(
                styles["progress-circle-fill"],
                styles[`progress-circle-fill--${color}`]
              )}
              cx="18"
              cy="18"
              r={CIRCLE_RADIUS}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={indeterminate ? undefined : dashOffset}
            />
          </svg>
          {showValue && !indeterminate && (
            <span className={styles["progress-circle-value"]}>{rounded}%</span>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.progress,
          styles["progress--line"],
          styles[`progress--${size}`],
          className
        )}
        style={style}
      >
        <div className={styles["progress-track"]} {...ariaProps}>
          <div
            className={clsx(
              styles["progress-fill"],
              styles[`progress-fill--${color}`],
              indeterminate && styles["progress-fill--indeterminate"]
            )}
            style={indeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
        {showValue && !indeterminate && (
          <span className={styles["progress-value"]}>{rounded}%</span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";