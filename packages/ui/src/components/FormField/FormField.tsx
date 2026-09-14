import styles from "./FormField.module.scss";

import type { FormFieldProps } from "./FormField.types";
import { clsx } from "../../utils/clsx";

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  layout = "vertical",
  width = "full",
  className,
  style,
}: FormFieldProps) {
  const hasError = Boolean(error);

  const classes = clsx(
    styles["form-field"],
    styles[`form-field--${layout}`],
    width !== "full" && styles[`form-field--width-${width}`],
    className
  );

  const labelClasses = clsx(
    styles["field-label"],
    required && styles["field-label--required"]
  );

  return (
    <div className={classes} style={style}>
      <label className={labelClasses} htmlFor={htmlFor}>
        {label}
        {required && (
          <span className={styles["field-required"]} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className={styles["field-content"]}>
        {children}
        {hasError ? (
          <span className={styles["field-error"]} role="alert" aria-live="polite">
            {error}
          </span>
        ) : helperText ? (
          <span className={styles["field-helper"]}>{helperText}</span>
        ) : null}
      </div>
    </div>
  );
}

FormField.displayName = "FormField";