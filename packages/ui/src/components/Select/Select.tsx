import { useRef, useState, forwardRef, useImperativeHandle, useId } from "react";
import styles from "./Select.module.scss";

import type { SelectProps, SelectRef } from "./Select.types";
import { clsx } from "../../utils/clsx";

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export const Select = forwardRef<SelectRef, SelectProps>(
  (
    {
      options,
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      placeholder = "Pilih opsi",
      variant = "outlined",
      size = "md",
      status = "default",
      leftIcon,
      clearable = true,
      searchable = true,
      disabled = false,
      fullWidth = false,
      value,
      defaultValue,
      name,
      onChange,
      onOpenChange,
      onQueryChange,
      id,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `select-${randomId}`;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);
    const statusClass = hasError ? "error" : hasWarning ? "warning" : hasSuccess ? "success" : status;

    const isSearchable = searchable && !disabled;

    const filteredOptions = isSearchable
      ? options.filter((o) =>
          String(o.label).toLowerCase().includes(query.trim().toLowerCase())
        )
      : options;

    const selectedOption = options.find((o) => o.value === currentValue);
    const selectedLabel = selectedOption ? String(selectedOption.label) : "";

    const effectiveActive =
      filteredOptions.length === 0
        ? -1
        : Math.min(activeIndex, filteredOptions.length - 1);

    const showClear = clearable && Boolean(currentValue) && !disabled;
    const toggleLabel = open ? "Tutup dropdown" : "Buka dropdown";

    const wrapperClasses = clsx(
      styles["select-wrapper"],
      fullWidth && styles["select-wrapper--full-width"],
      className
    );

    const containerClasses = clsx(
      styles["select-container"],
      styles[`select-container--${variant}`],
      statusClass !== "default" && styles[`select-container--${statusClass}`],
      disabled && styles["select-container--disabled"]
    );

    const inputClasses = clsx(
      styles["select-input"],
      styles[`select-input--${size}`],
      showClear && styles["select-input--clearable"],
      Boolean(leftIcon) && styles["select-input--with-left-icon"]
    );

    const chevronClasses = clsx(
      styles["icon-button"],
      styles["select-chevron"],
      open && styles["select-chevron--open"]
    );

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"]
    );

    const openMenu = () => {
      if (disabled) return;
      setOpen(true);
      onOpenChange?.(true);
      const selIdx = filteredOptions.findIndex((o) => o.value === currentValue);
      setActiveIndex(selIdx >= 0 ? selIdx : 0);
    };

    const closeMenu = () => {
      setOpen(false);
      onOpenChange?.(false);
    };

    const selectOption = (nextValue: string) => {
      onChange?.(nextValue);
      if (!isControlled) setInternalValue(nextValue);
      setQuery("");
      closeMenu();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setActiveIndex(0);
      setOpen(true);
      onOpenChange?.(true);
      onQueryChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            openMenu();
          } else {
            setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            openMenu();
          } else {
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
          break;
        case "Enter": {
          if (open && effectiveActive >= 0) {
            const opt = filteredOptions[effectiveActive];
            if (opt && !opt.disabled) {
              e.preventDefault();
              selectOption(opt.value);
            }
          }
          break;
        }
        case "Escape":
          if (open) {
            if (query) {
              setQuery("");
            } else {
              closeMenu();
            }
            e.preventDefault();
          }
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(filteredOptions.length - 1);
          break;
        default:
          break;
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        closeMenu();
      }
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      selectOption("");
      inputRef.current?.focus();
    };

    const optionClasses = (opt: (typeof filteredOptions)[number], i: number) =>
      clsx(
        styles["select-option"],
        i === effectiveActive && styles["select-option--active"],
        selectedOption?.value === opt.value && styles["select-option--selected"],
        opt.disabled && styles["select-option--disabled"]
      );

    return (
      <div className={wrapperClasses} style={style} {...props}>
        {label && (
          <label
            className={clsx(styles.label, required && styles["label--required"])}
            htmlFor={inputId}
          >
            {label}
            {required && (
              <span className={styles["required-asterisk"]} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={containerClasses} onBlur={handleBlur}>
          {leftIcon && (
            <span className={styles["icon-left"]} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            type="text"
            autoComplete="off"
            className={inputClasses}
            placeholder={placeholder}
            value={open ? query : selectedLabel}
            onChange={handleInputChange}
            onClick={() => (open ? undefined : openMenu())}
            onKeyDown={handleKeyDown}
            readOnly={!isSearchable}
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? `${inputId}-listbox` : undefined}
            aria-activedescendant={
              open && effectiveActive >= 0
                ? `${inputId}-opt-${effectiveActive}`
                : undefined
            }
            aria-autocomplete={searchable ? "list" : undefined}
            aria-invalid={hasError}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
          />
          {showClear && (
            <button
              type="button"
              className={clsx(styles["icon-button"], styles["select-clear"])}
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Hapus pilihan"
            >
              <ClearIcon />
            </button>
          )}
          <button
            type="button"
            className={chevronClasses}
            onClick={() => (open ? closeMenu() : (openMenu(), inputRef.current?.focus()))}
            aria-label={toggleLabel}
          >
            <ChevronIcon />
          </button>
          {open && (
            <ul id={`${inputId}-listbox`} className={styles["select-menu"]} role="listbox">
              {filteredOptions.length === 0 ? (
                <li className={styles["select-empty"]} role="option" aria-disabled="true">
                  Opsi tidak ditemukan
                </li>
              ) : (
                filteredOptions.map((opt, i) => (
                  <li
                    key={opt.value}
                    id={`${inputId}-opt-${i}`}
                    role="option"
                    className={optionClasses(opt, i)}
                    aria-selected={selectedOption?.value === opt.value}
                    aria-disabled={opt.disabled || undefined}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => (opt.disabled ? undefined : selectOption(opt.value))}
                  >
                    <span>{opt.label}</span>
                    {opt.description && (
                      <span className={styles["option-description"]}>{opt.description}</span>
                    )}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        {showHelper && (
          <span id={`${inputId}-helper`} className={helperClasses} role="alert" aria-live="polite">
            {error || warning || success || helperText}
          </span>
        )}
        {name && <input type="hidden" name={name} value={currentValue ?? ""} />}
      </div>
    );
  }
);

Select.displayName = "Select";