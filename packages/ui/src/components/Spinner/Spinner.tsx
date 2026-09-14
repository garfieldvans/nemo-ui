import { forwardRef } from "react";
import styles from "./Spinner.module.scss";

import type { SpinnerProps } from "./Spinner.types";
import { clsx } from "../../utils/clsx";

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    { size = "md", color = "primary", label = "Loading...", className, style },
    ref
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        data-size={size}
        data-color={color}
        className={clsx(styles.spinner, styles[`spinner--${size}`], className)}
        style={style}
      >
        <span className={styles["sr-only"]}>{label}</span>
        <span
          aria-hidden="true"
          className={clsx(styles["spinner-ring"], styles[`spinner-ring--${color}`])}
        />
      </span>
    );
  }
);

Spinner.displayName = "Spinner";