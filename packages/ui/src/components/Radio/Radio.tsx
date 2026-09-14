import { forwardRef, useContext, useId } from "react";
import styles from "./Radio.module.scss";

import type { RadioProps } from "./Radio.types";
import { RadioGroupContext } from "./RadioGroupContext";
import { clsx } from "../../utils/clsx";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      helperText,
      size = "md",
      color = "primary",
      className,
      style,
      id,
      name,
      checked,
      disabled,
      ...props
    },
    ref
  ) => {
    const group = useContext(RadioGroupContext);
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `radio-${randomId}`;

    const finalName = name ?? group?.name;
    const finalDisabled = disabled == null ? group?.disabled : disabled;

    // Prop eksplisit menang; fallback ke checked value dari group.
    const finalChecked =
      checked !== undefined
        ? checked
        : group?.value !== undefined
          ? group.value === value
          : undefined;

    const hasError = Boolean(error);
    const showHelper = hasError || Boolean(helperText);

    const fieldClasses = clsx(styles["radio-field"], className);

    const labelClasses = clsx(
      styles.radio,
      styles[`radio--${size}`],
      finalDisabled && styles["radio--disabled"]
    );

    const controlClasses = clsx(
      styles["radio-control"],
      styles[`radio-control--${color}`]
    );

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"]
    );

    return (
      <div className={fieldClasses} style={style}>
        <label className={labelClasses}>
          <input
            ref={ref}
            type="radio"
            value={value}
            name={finalName}
            id={inputId}
            className={clsx(styles["sr-only"], styles["radio-input"])}
            checked={finalChecked}
            disabled={finalDisabled}
            aria-invalid={hasError}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            onChange={(e) => {
              onChange?.(e);
              group?.onChange?.(value);
            }}
            {...props}
          />
          <span className={controlClasses} aria-hidden="true">
            <span className={styles["radio-dot"]} />
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

Radio.displayName = "Radio";