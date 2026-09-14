import { useMemo, useState, useId } from "react";
import styles from "./Radio.module.scss";

import type { RadioGroupProps, RadioGroupContextValue } from "./Radio.types";
import { RadioGroupContext } from "./RadioGroupContext";
import { clsx } from "../../utils/clsx";

export function RadioGroup({
  children,
  name,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
  label,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
  style,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      name,
      value: currentValue,
      onChange: (next) => {
        setInternalValue(next);
        onChange?.(next);
      },
      disabled,
    }),
    [name, currentValue, disabled, onChange]
  );

  const hasError = Boolean(error);
  const showHelper = hasError || Boolean(helperText);

  const randomId = useId().replace(/:/g, "");
  const labelId = `radiogroup-label-${randomId}`;
  const helperId = `radiogroup-helper-${randomId}`;

  const optionsClasses = clsx(
    styles.options,
    orientation === "horizontal" && styles["options--horizontal"],
    disabled && styles["options--disabled"]
  );

  return (
    <div className={clsx(styles["radio-group"], className)} style={style}>
      {label && (
        <span id={labelId} className={styles["group-label"]}>
          {label}
          {required && (
            <span className={styles["group-required"]} aria-hidden="true">
              *
            </span>
          )}
        </span>
      )}
      <RadioGroupContext.Provider value={contextValue}>
        <div
          role="radiogroup"
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={showHelper ? helperId : undefined}
          aria-invalid={hasError}
          className={optionsClasses}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
      {showHelper && (
        <span id={helperId} className={clsx(styles["helper-text"], hasError && styles["helper-text--error"])} role="alert" aria-live="polite">
          {error || helperText}
        </span>
      )}
    </div>
  );
}

RadioGroup.displayName = "RadioGroup";