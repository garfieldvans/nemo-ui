import { useId, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./DatePicker.module.scss";

import type { DatePickerProps, DatePickerRef } from "./DatePicker.types";
import { clsx } from "../../utils/clsx";
import {
  addDays,
  addMonths,
  buildMonthMatrix,
  formatDate,
  formatLongDate,
  formatMonthLabel,
  isSameDay,
  isSameMonth,
  parseDateText,
  startOfDay,
  startOfMonth,
  toISODate,
  weekdayLabels,
} from "./dateUtils";

function CalendarIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
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
      aria-hidden="true"
    >
      {direction === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
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
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      placeholder,
      format = "dd/mm/yyyy",
      variant = "outlined",
      size = "md",
      status = "default",
      leftIcon,
      clearable = true,
      disabled = false,
      readOnly = false,
      fullWidth = false,
      value,
      defaultValue,
      min,
      max,
      weekStartsOn = 1,
      name,
      onChange,
      onOpenChange,
      id,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `datepicker-${randomId}`;
    const calendarId = `${inputId}-calendar`;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? value : internalValue;

    const [open, setOpen] = useState(false);
    const [viewMonth, setViewMonth] = useState<Date>(() =>
      startOfMonth(selected ?? new Date())
    );
    const [activeDate, setActiveDate] = useState<Date>(() => startOfDay(selected ?? new Date()));

    // `draft` menyimpan teks yang sedang diketik; `null` berarti tampilkan nilai terpilih.
    const [draft, setDraft] = useState<string | null>(null);
    const formatted = selected ? formatDate(selected, format) : "";
    const text = draft ?? formatted;

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);
    const statusClass = hasError ? "error" : hasWarning ? "warning" : hasSuccess ? "success" : status;

    const isInteractive = !disabled && !readOnly;
    const showClear = clearable && Boolean(selected) && !disabled && !readOnly;
    const inputPlaceholder = placeholder ?? format;

    const isOutOfRange = (date: Date) => {
      if (min && date.getTime() < startOfDay(min).getTime()) return true;
      if (max && date.getTime() > startOfDay(max).getTime()) return true;
      return false;
    };

    const days = useMemo(
      () => buildMonthMatrix(viewMonth, weekStartsOn),
      [viewMonth, weekStartsOn]
    );
    const labels = useMemo(() => weekdayLabels(weekStartsOn), [weekStartsOn]);
    const today = startOfDay(new Date());

    const commit = (date: Date | null) => {
      if (!isControlled) setInternalValue(date);
      onChange?.(date);
    };

    const openCalendar = () => {
      if (!isInteractive) return;
      const base = selected ? startOfDay(selected) : today;
      setViewMonth(startOfMonth(base));
      setActiveDate(base);
      if (!open) {
        setOpen(true);
        onOpenChange?.(true);
      }
    };

    const closeCalendar = () => {
      if (!open) return;
      setOpen(false);
      onOpenChange?.(false);
    };

    const selectDate = (date: Date) => {
      if (isOutOfRange(date)) return;
      const day = startOfDay(date);
      commit(day);
      setActiveDate(day);
      setViewMonth(startOfMonth(day));
      setDraft(null);
      closeCalendar();
      inputRef.current?.focus();
    };

    /** Mengubah teks menjadi nilai; teks yang tidak valid dikembalikan ke nilai terpilih. */
    const commitText = () => {
      const parsed = parseDateText(text, format);
      if (parsed && !isOutOfRange(parsed)) {
        commit(parsed);
        setViewMonth(startOfMonth(parsed));
        setActiveDate(parsed);
        setDraft(null);
        return;
      }
      if (!parsed && text.trim() === "") {
        commit(null);
        setDraft(null);
        return;
      }
      // Teks tidak valid: kembali ke nilai terpilih.
      setDraft(null);
    };

    const moveActive = (next: Date) => {
      setActiveDate(next);
      if (!isSameMonth(next, viewMonth)) setViewMonth(startOfMonth(next));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextText = e.target.value;
      setDraft(nextText);
      const parsed = parseDateText(nextText, format);
      if (parsed && !isOutOfRange(parsed)) {
        setViewMonth(startOfMonth(parsed));
        setActiveDate(parsed);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (open) moveActive(addDays(activeDate, -1));
          break;
        case "ArrowRight":
          e.preventDefault();
          if (open) moveActive(addDays(activeDate, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (open) moveActive(addDays(activeDate, -7));
          break;
        case "ArrowDown":
          e.preventDefault();
          if (open) {
            moveActive(addDays(activeDate, 7));
          } else {
            openCalendar();
          }
          break;
        case "PageUp":
          e.preventDefault();
          moveActive(addMonths(activeDate, e.shiftKey ? -12 : -1));
          break;
        case "PageDown":
          e.preventDefault();
          moveActive(addMonths(activeDate, e.shiftKey ? 12 : 1));
          break;
        case "Home": {
          if (!open) break;
          e.preventDefault();
          const offset = (activeDate.getDay() - weekStartsOn + 7) % 7;
          moveActive(addDays(activeDate, -offset));
          break;
        }
        case "End": {
          if (!open) break;
          e.preventDefault();
          const offset = (activeDate.getDay() - weekStartsOn + 7) % 7;
          moveActive(addDays(activeDate, 6 - offset));
          break;
        }
        case "Enter":
          if (open) {
            e.preventDefault();
            if (!isOutOfRange(activeDate)) selectDate(activeDate);
          } else {
            commitText();
          }
          break;
        case "Escape":
          if (open) {
            e.preventDefault();
            setDraft(null);
            closeCalendar();
          }
          break;
        case "Tab":
          // Perubahan teks di-commit lewat handleBlur.
          closeCalendar();
          break;
        default:
          break;
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      if (open) closeCalendar();
      if (text !== formatted) commitText();
    };

    const toggleCalendar = () => {
      if (open) {
        closeCalendar();
      } else {
        inputRef.current?.focus();
        openCalendar();
      }
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      commit(null);
      setDraft(null);
      closeCalendar();
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      open: () => openCalendar(),
      close: () => closeCalendar(),
    }));

    const wrapperClasses = clsx(
      styles["datepicker-wrapper"],
      fullWidth && styles["datepicker-wrapper--full-width"],
      className
    );

    const containerClasses = clsx(
      styles["datepicker-container"],
      styles[`datepicker-container--${variant}`],
      styles[`datepicker-container--${size}`],
      statusClass !== "default" && styles[`datepicker-container--${statusClass}`],
      disabled && styles["datepicker-container--disabled"],
      showClear && styles["datepicker-container--clearable"],
      Boolean(leftIcon) && styles["datepicker-container--with-left-icon"]
    );

    const inputClasses = clsx(styles["datepicker-input"], styles[`datepicker-input--${size}`]);

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"]
    );

    const activeId = `${calendarId}-day-${toISODate(activeDate)}`;

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
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className={inputClasses}
            placeholder={inputPlaceholder}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={() => openCalendar()}
            onFocus={() => openCalendar()}
            disabled={disabled}
            readOnly={readOnly}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? calendarId : undefined}
            aria-activedescendant={open ? activeId : undefined}
            aria-invalid={hasError}
            aria-errormessage={hasError ? `${inputId}-helper` : undefined}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
          />

          {showClear && (
            <button
              type="button"
              className={clsx(styles["icon-button"], styles["clear-button"])}
              aria-label="Hapus tanggal"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <ClearIcon />
            </button>
          )}

          <button
            type="button"
            className={clsx(styles["icon-button"], styles["calendar-toggle"])}
            aria-label={open ? "Tutup kalender" : "Buka kalender"}
            tabIndex={-1}
            disabled={disabled || readOnly}
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleCalendar}
          >
            <CalendarIcon />
          </button>

          {open && (
            <div
              id={calendarId}
              className={styles.calendar}
              role="dialog"
              aria-label="Pilih tanggal"
            >
              <div className={styles["calendar-header"]}>
                <button
                  type="button"
                  className={styles["calendar-nav"]}
                  aria-label="Bulan sebelumnya"
                  tabIndex={-1}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setViewMonth((month) => addMonths(month, -1))}
                >
                  <ChevronIcon direction="left" />
                </button>
                <span className={styles["calendar-title"]} aria-live="polite">
                  {formatMonthLabel(viewMonth)}
                </span>
                <button
                  type="button"
                  className={styles["calendar-nav"]}
                  aria-label="Bulan berikutnya"
                  tabIndex={-1}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setViewMonth((month) => addMonths(month, 1))}
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>

              <table className={styles["calendar-grid"]} role="grid">
                <thead>
                  <tr role="row">
                    {labels.map((dayLabel) => (
                      <th key={dayLabel} scope="col" role="columnheader" className={styles["calendar-weekday"]}>
                        {dayLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }, (_, row) => (
                    <tr key={row} role="row">
                      {days.slice(row * 7, row * 7 + 7).map((day) => {
                        const iso = toISODate(day);
                        const outOfRange = isOutOfRange(day);
                        const isSelected = isSameDay(day, selected);
                        const isOutside = !isSameMonth(day, viewMonth);

                        return (
                          <td
                            key={iso}
                            role="gridcell"
                            aria-selected={isSelected}
                            className={styles["calendar-cell"]}
                          >
                            <button
                              id={`${calendarId}-day-${iso}`}
                              type="button"
                              tabIndex={-1}
                              className={clsx(
                                styles["calendar-day"],
                                isOutside && styles["calendar-day--outside"],
                                isSameDay(day, today) && styles["calendar-day--today"],
                                isSelected && styles["calendar-day--selected"],
                                isSameDay(day, activeDate) && open && styles["calendar-day--active"]
                              )}
                              aria-label={formatLongDate(day)}
                              aria-current={isSameDay(day, today) ? "date" : undefined}
                              disabled={outOfRange}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => selectDate(day)}
                            >
                              {day.getDate()}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showHelper && (
          <span id={`${inputId}-helper`} className={helperClasses} role="alert" aria-live="polite">
            {error || warning || success || helperText}
          </span>
        )}

        {name && <input type="hidden" name={name} value={selected ? toISODate(selected) : ""} />}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
