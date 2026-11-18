import { useRef, useState, forwardRef, useImperativeHandle, useId } from "react";

import styles from "./Combobox.module.scss";

import type { ComboboxOption, ComboboxProps, ComboboxRef } from "./Combobox.types";
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
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export const Combobox = forwardRef<ComboboxRef, ComboboxProps>(
  (
    {
      options,
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      placeholder = "Cari dan pilih opsi",
      emptyText = "Opsi tidak ditemukan",
      filter = true,
      loading = false,
      loadingText = "Memuat opsi...",
      variant = "outlined",
      size = "md",
      status = "default",
      leftIcon,
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
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `combobox-${randomId}`;
    const listboxId = `${inputId}-listbox`;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [internalValues, setInternalValues] = useState<string[]>(defaultValue ?? []);
    const [knownOptions, setKnownOptions] = useState<Record<string, ComboboxOption>>({});

    const isControlled = value !== undefined;
    const currentValues = isControlled ? value : internalValues;
    const selectedSet = new Set(currentValues);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);
    const statusClass = hasError
      ? "error"
      : hasWarning
        ? "warning"
        : hasSuccess
          ? "success"
          : status;

    const normalizedQuery = query.trim().toLowerCase();
    const filteredOptions =
      filter && normalizedQuery
        ? options.filter((option) => String(option.label).toLowerCase().includes(normalizedQuery))
        : options;

    // Opsi yang pernah dipilih disimpan agar chip tetap terbaca ketika hasil
    // pencarian async berganti dan opsi tersebut tidak lagi ada di daftar.
    const selectedOptions = currentValues.map((selectedValue) => {
      return (
        options.find((option) => option.value === selectedValue) ??
        knownOptions[selectedValue] ?? {
          value: selectedValue,
          label: selectedValue,
        }
      );
    });

    const effectiveActive =
      filteredOptions.length === 0 ? -1 : Math.min(activeIndex, filteredOptions.length - 1);

    const wrapperClasses = clsx(
      styles["combobox-wrapper"],
      fullWidth && styles["combobox-wrapper--full-width"],
      className,
    );

    const containerClasses = clsx(
      styles["combobox-container"],
      styles[`combobox-container--${size}`],
      styles[`combobox-container--${variant}`],
      statusClass !== "default" && styles[`combobox-container--${statusClass}`],
      Boolean(leftIcon) && styles["combobox-container--with-left-icon"],
      disabled && styles["combobox-container--disabled"],
    );

    const inputClasses = clsx(styles["combobox-input"], styles[`combobox-input--${size}`]);

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"],
    );

    const openMenu = () => {
      if (disabled || open) return;
      setOpen(true);
      onOpenChange?.(true);
    };

    const closeMenu = () => {
      if (!open) return;
      setOpen(false);
      setQuery("");
      onOpenChange?.(false);
    };

    const commitValues = (nextValues: string[]) => {
      if (!isControlled) setInternalValues(nextValues);
      onChange?.(nextValues);
    };

    const toggleOption = (option: ComboboxOption) => {
      const optionValue = option.value;
      const selecting = !selectedSet.has(optionValue);
      if (selecting) {
        setKnownOptions((previous) => ({ ...previous, [optionValue]: option }));
      }
      commitValues(
        selecting
          ? [...currentValues, optionValue]
          : currentValues.filter((item) => item !== optionValue),
      );
      setQuery("");
      setActiveIndex(0);
      inputRef.current?.focus();
    };

    const removeValue = (optionValue: string) => {
      commitValues(currentValues.filter((item) => item !== optionValue));
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setActiveIndex(0);
      openMenu();
      onQueryChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            openMenu();
          } else {
            setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            openMenu();
          } else {
            setActiveIndex((index) => Math.max(index - 1, 0));
          }
          break;
        case "Enter": {
          if (open && !loading && effectiveActive >= 0) {
            const option = filteredOptions[effectiveActive];
            if (option && !option.disabled) {
              e.preventDefault();
              toggleOption(option);
            }
          }
          break;
        }
        case "Backspace": {
          if (query === "" && currentValues.length > 0) {
            e.preventDefault();
            removeValue(currentValues[currentValues.length - 1]);
          }
          break;
        }
        case "Escape":
          if (open) {
            e.preventDefault();
            if (query) {
              setQuery("");
              onQueryChange?.("");
            } else {
              closeMenu();
            }
          }
          break;
        case "Home":
          if (open) {
            e.preventDefault();
            setActiveIndex(0);
          }
          break;
        case "End":
          if (open) {
            e.preventDefault();
            setActiveIndex(filteredOptions.length - 1);
          }
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

    const handleContainerClick = () => {
      if (disabled) return;
      inputRef.current?.focus();
      openMenu();
    };

    const handleChevronClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (open) {
        closeMenu();
      } else {
        inputRef.current?.focus();
        openMenu();
      }
    };

    return (
      <div className={wrapperClasses} style={style}>
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
        <div className={containerClasses} onClick={handleContainerClick} onBlur={handleBlur}>
          {leftIcon && (
            <span className={styles["icon-left"]} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <div className={styles["combobox-field"]}>
            {selectedOptions.map((option) => (
              <span key={option.value} className={styles["combobox-chip"]}>
                <span className={styles["combobox-chip-label"]}>{option.label}</span>
                <button
                  type="button"
                  className={styles["combobox-chip-remove"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(option.value);
                  }}
                  disabled={disabled}
                  aria-label={`Hapus ${String(option.label)}`}
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              id={inputId}
              role="combobox"
              type="text"
              autoComplete="off"
              className={inputClasses}
              placeholder={currentValues.length === 0 ? placeholder : undefined}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={openMenu}
              onClick={openMenu}
              disabled={disabled}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={open ? listboxId : undefined}
              aria-activedescendant={
                open && effectiveActive >= 0 ? `${inputId}-opt-${effectiveActive}` : undefined
              }
              aria-autocomplete="list"
              aria-invalid={hasError}
              aria-errormessage={hasError ? `${inputId}-helper` : undefined}
              aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            />
          </div>
          <button
            type="button"
            className={clsx(
              styles["icon-button"],
              styles["combobox-chevron"],
              open && styles["combobox-chevron--open"],
            )}
            onClick={handleChevronClick}
            disabled={disabled}
            tabIndex={-1}
            aria-label={open ? "Tutup daftar opsi" : "Buka daftar opsi"}
          >
            <ChevronIcon />
          </button>
          {open && (
            <ul
              id={listboxId}
              className={styles["combobox-menu"]}
              role="listbox"
              aria-multiselectable="true"
              aria-busy={loading || undefined}
            >
              {loading ? (
                <li
                  className={styles["combobox-loading"]}
                  role="option"
                  aria-selected={false}
                  aria-disabled="true"
                >
                  <span className={styles["combobox-spinner"]} aria-hidden="true" />
                  {loadingText}
                </li>
              ) : filteredOptions.length === 0 ? (
                <li className={styles["combobox-empty"]} role="option" aria-disabled="true">
                  {emptyText}
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const selected = selectedSet.has(option.value);
                  return (
                    <li
                      key={option.value}
                      id={`${inputId}-opt-${index}`}
                      role="option"
                      className={clsx(
                        styles["combobox-option"],
                        !loading && index === effectiveActive && styles["combobox-option--active"],
                        selected && styles["combobox-option--selected"],
                        option.disabled && styles["combobox-option--disabled"],
                      )}
                      aria-selected={selected}
                      aria-disabled={option.disabled || undefined}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!option.disabled) toggleOption(option);
                      }}
                    >
                      <span className={styles["combobox-option-text"]}>
                        <span>{option.label}</span>
                        {option.description && (
                          <span className={styles["option-description"]}>{option.description}</span>
                        )}
                      </span>
                      {selected && (
                        <span className={styles["combobox-option-check"]}>
                          <CheckIcon />
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
        {showHelper && (
          <span id={`${inputId}-helper`} className={helperClasses} role="alert" aria-live="polite">
            {error || warning || success || helperText}
          </span>
        )}
        {name &&
          currentValues.map((selectedValue) => (
            <input key={selectedValue} type="hidden" name={name} value={selectedValue} />
          ))}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
