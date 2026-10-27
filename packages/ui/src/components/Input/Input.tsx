import styles from "./Input.module.scss";

import type { InputProps, TextareaProps } from "./Input.types";
import { clsx } from "../../utils/clsx";
import { useRef, useImperativeHandle, forwardRef } from "react";

type InputRef = Pick<HTMLInputElement, "focus" | "blur" | "select" | "setSelectionRange">;
type TextareaRef = Pick<HTMLTextAreaElement, "focus" | "blur" | "select" | "setSelectionRange">;

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      variant = "outlined",
      size = "md",
      status = "default",
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      leftIcon,
      rightIcon,
      rightIconAction,
      rightIconDisabled = false,
      prefix,
      suffix,
      fullWidth = false,
      clearable = false,
      onClear,
      floatingLabel = false,
      className = "",
      id,
      disabled,
      readOnly,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      select: () => inputRef.current?.select(),
      setSelectionRange: (start: number, end: number) =>
        inputRef.current?.setSelectionRange(start, end),
    }));

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);
    const statusClass = hasError ? "error" : hasWarning ? "warning" : hasSuccess ? "success" : status;
    const showClear = clearable && value && !disabled && !readOnly;

    const wrapperClasses = clsx(
      styles["input-wrapper"],
      fullWidth && styles["input-wrapper--full-width"],
      className
    );

    const containerClasses = clsx(
      styles["input-container"],
      styles[`input-container--${variant}`],
      statusClass !== "default" && styles[`input-container--${statusClass}`],
      disabled && styles["input-container--disabled"],
      readOnly && styles["input-container--readonly"],
      (value && floatingLabel) && styles["input-container--has-value"],
      label && floatingLabel && styles["input-container--floating-label"]
    );

    const inputClasses = clsx(
      styles.input,
      styles[`input--${size}`],
      Boolean(leftIcon) && styles[`input--with-left-icon`],
      Boolean(rightIcon) && styles[`input--with-right-icon`],
      Boolean(prefix) && styles[`input--with-prefix`],
      Boolean(suffix) && styles[`input--with-suffix`],
      showClear && styles[`input--with-clear`]
    );

    const helperTextClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"]
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
      onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleRightIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!rightIconDisabled) {
        rightIconAction?.(e);
      }
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label
            className={clsx(styles.label, floatingLabel && styles["label--floating"], required && styles["label--required"])}
            htmlFor={inputId}
          >
            {label}
            {required && <span className={styles["required-asterisk"]} aria-hidden="true">*</span>}
          </label>
        )}
        <div className={containerClasses}>
          {prefix && <span className={styles.prefix} aria-hidden="true">{prefix}</span>}
          {leftIcon && (
            <span className={clsx(styles.icon, styles["icon--left"])} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={inputRef}
            id={inputId}
            className={inputClasses}
            aria-invalid={hasError}
            aria-errormessage={hasError ? `${inputId}-helper` : undefined}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            {...props}
          />
          {suffix && <span className={styles.suffix} aria-hidden="true">{suffix}</span>}
          {rightIcon && (
            <button
              type="button"
              className={clsx(styles.icon, styles["icon--right"], styles["icon--button"], rightIconDisabled && styles["icon--disabled"])}
              onClick={handleRightIconClick}
              disabled={rightIconDisabled}
              aria-label={rightIconAction ? "Action" : undefined}
            >
              {rightIcon}
            </button>
          )}
          {showClear && (
            <button
              type="button"
              className={clsx(styles.icon, styles["icon--right"], styles["icon--clear"])}
              onClick={handleClear}
              aria-label="Clear input"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        {showHelper && (
          <span id={`${inputId}-helper`} className={helperTextClasses} role="alert" aria-live="polite">
            {error || warning || success || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<TextareaRef, TextareaProps>(
  (
    {
      variant = "outlined",
      size = "md",
      status = "default",
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      leftIcon,
      rightIcon,
      rightIconAction,
      rightIconDisabled = false,
      prefix,
      suffix,
      fullWidth = false,
      clearable = false,
      onClear,
      floatingLabel = false,
      className = "",
      id,
      disabled,
      readOnly,
      value,
      onChange,
      rows = 3,
      maxLength,
      showCount = false,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      blur: () => textareaRef.current?.blur(),
      select: () => textareaRef.current?.select(),
      setSelectionRange: (start: number, end: number) =>
        textareaRef.current?.setSelectionRange(start, end),
    }));

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);
    const statusClass = hasError ? "error" : hasWarning ? "warning" : hasSuccess ? "success" : status;
    const showClear = clearable && value && !disabled && !readOnly;
    const charCount = typeof value === "string" ? value.length : 0;
    const showCharCount = showCount && maxLength;

    const wrapperClasses = clsx(
      styles["input-wrapper"],
      fullWidth && styles["input-wrapper--full-width"],
      className
    );

    const containerClasses = clsx(
      styles["input-container"],
      styles[`input-container--${variant}`],
      statusClass !== "default" && styles[`input-container--${statusClass}`],
      styles["input-container--textarea"],
      disabled && styles["input-container--disabled"],
      readOnly && styles["input-container--readonly"],
      (value && floatingLabel) && styles["input-container--has-value"],
      label && floatingLabel && styles["input-container--floating-label"]
    );

    const textareaClasses = clsx(
      styles.textarea,
      styles[`textarea--${size}`],
      Boolean(leftIcon) && styles[`textarea--with-left-icon`],
      Boolean(rightIcon) && styles[`textarea--with-right-icon`],
      showClear && styles[`textarea--with-clear`]
    );

    const helperTextClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"]
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
      onChange?.(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    };

    const handleRightIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!rightIconDisabled) {
        rightIconAction?.(e);
      }
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label
            className={clsx(styles.label, floatingLabel && styles["label--floating"], required && styles["label--required"])}
            htmlFor={inputId}
          >
            {label}
            {required && <span className={styles["required-asterisk"]} aria-hidden="true">*</span>}
          </label>
        )}
        <div className={containerClasses}>
          {prefix && <span className={styles.prefix} aria-hidden="true">{prefix}</span>}
          {leftIcon && (
            <span className={clsx(styles.icon, styles["icon--left"], styles["icon--textarea"])} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <textarea
            ref={textareaRef}
            id={inputId}
            className={textareaClasses}
            aria-invalid={hasError}
            aria-errormessage={hasError ? `${inputId}-helper` : undefined}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            value={value}
            onChange={onChange}
            {...props}
          />
          {suffix && <span className={styles.suffix} aria-hidden="true">{suffix}</span>}
          {rightIcon && (
            <button
              type="button"
              className={clsx(styles.icon, styles["icon--right"], styles["icon--button"], styles["icon--textarea"], rightIconDisabled && styles["icon--disabled"])}
              onClick={handleRightIconClick}
              disabled={rightIconDisabled}
              aria-label={rightIconAction ? "Action" : undefined}
            >
              {rightIcon}
            </button>
          )}
          {showClear && (
            <button
              type="button"
              className={clsx(styles.icon, styles["icon--right"], styles["icon--clear"], styles["icon--textarea"])}
              onClick={handleClear}
              aria-label="Clear textarea"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        {showHelper && (
          <div className={clsx(styles["helper-row"], showCharCount && styles["helper-row--with-count"])}>
            <span id={`${inputId}-helper`} className={helperTextClasses} role="alert" aria-live="polite">
              {error || warning || success || helperText}
            </span>
            {showCharCount && (
              <span className={clsx(styles["char-count"], charCount > maxLength && styles["char-count--exceeded"])}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";