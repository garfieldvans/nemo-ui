import { forwardRef, useId } from "react";
import styles from "./Switch.module.scss";

import type { SwitchProps } from "./Switch.types";
import { clsx } from "../../utils/clsx";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = "md",
      color = "primary",
      error,
      helperText,
      className,
      style,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `switch-${randomId}`;

    const hasError = Boolean(error);
    const showHelper = hasError || Boolean(helperText);

    const fieldClasses = clsx(styles["switch-field"], className);

    const labelClasses = clsx(
      styles.switch,
      styles[`switch--${size}`],
      disabled && styles["switch--disabled"]
    );

    const trackClasses = clsx(styles["switch-track"], styles[`switch-track--${color}`]);

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"]
    );

    return (
      <div className={fieldClasses} style={style}>
        <label className={labelClasses}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={inputId}
            className={clsx(styles["sr-only"], styles["switch-input"])}
            aria-invalid={hasError}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            disabled={disabled}
            {...props}
          />
          <span className={trackClasses} aria-hidden="true">
            <span className={styles["switch-thumb"]} />
          </span>
          {label && <span className={styles.label}>{label}</span>}
        </label>
        {showHelper && (
          <span id={`${inputId}-helper`} className={helperClasses} role="alert" aria-live="polite">
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";