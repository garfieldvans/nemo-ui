import { useRef, useEffect, forwardRef, useId } from "react";
import styles from "./Checkbox.module.scss";

import type { CheckboxProps } from "./Checkbox.types";
import { clsx } from "../../utils/clsx";
import { composeRefs } from "../../utils/composeRefs";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      error,
      helperText,
      size = "md",
      color = "primary",
      className,
      style,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `checkbox-${randomId}`;

    // jsdom tidak memetakan property indeterminate ke aria-checked —
    // sinkronkan eksplisit hanya untuk state mixed, native menangani checked/unchecked.
    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;
      input.indeterminate = indeterminate;
      if (indeterminate) {
        input.setAttribute("aria-checked", "mixed");
      } else {
        input.removeAttribute("aria-checked");
      }
    }, [indeterminate]);

    const hasError = Boolean(error);
    const showHelper = hasError || Boolean(helperText);

    const fieldClasses = clsx(styles["checkbox-field"], className);

    const labelClasses = clsx(
      styles.checkbox,
      styles[`checkbox--${size}`],
      disabled && styles["checkbox--disabled"]
    );

    const boxClasses = clsx(
      styles["checkbox-box"],
      styles[`checkbox-box--${color}`]
    );

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"]
    );

    return (
      <div className={fieldClasses} style={style}>
        <label className={labelClasses}>
          <input
            ref={composeRefs(inputRef, ref)}
            type="checkbox"
            id={inputId}
            className={clsx(styles["sr-only"], styles["checkbox-input"])}
            aria-invalid={hasError}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            disabled={disabled}
            {...props}
          />
          <span className={boxClasses} aria-hidden="true">
            {indeterminate ? (
              <svg
                width={size === "sm" ? 8 : 10}
                height={size === "sm" ? 8 : 10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
              </svg>
            ) : (
              <svg
                width={size === "sm" ? 10 : 12}
                height={size === "sm" ? 10 : 12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
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

Checkbox.displayName = "Checkbox";