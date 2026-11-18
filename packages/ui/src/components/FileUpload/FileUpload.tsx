import { useEffect, useId, useRef, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./FileUpload.module.scss";

import type { FileUploadProps, FileUploadRejection, FileUploadRef } from "./FileUpload.types";
import { clsx } from "../../utils/clsx";

function UploadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function AlertIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12.5" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
}

function isSameFile(a: File, b: File) {
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
}

export const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(
  (
    {
      label,
      required = false,
      error,
      warning,
      success,
      helperText,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      disabled = false,
      fullWidth = true,
      dropText = "Tarik file ke sini atau klik untuk memilih",
      hint,
      value,
      defaultValue,
      name,
      onChange,
      onReject,
      getFileStatus,
      id,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const zoneRef = useRef<HTMLDivElement>(null);
    const dragDepth = useRef(0);

    const randomId = useId().replace(/:/g, "");
    const inputId = id ?? `file-upload-${randomId}`;

    const isControlled = value !== undefined;
    const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue ?? []);
    const files = isControlled ? value : internalFiles;

    const [dragging, setDragging] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => zoneRef.current?.focus(),
      blur: () => zoneRef.current?.blur(),
      open: () => inputRef.current?.click(),
    }));

    // Salin file ke input native supaya form submit ikut mengirim hasil drag & drop.
    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;
      try {
        if (typeof DataTransfer === "undefined") return;
        const transfer = new DataTransfer();
        files.forEach((file) => transfer.items.add(file));
        input.files = transfer.files;
      } catch {
        // Lingkungan tanpa dukungan DataTransfer (mis. jsdom) — input tetap berfungsi untuk pemilihan manual.
      }
    }, [files]);

    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasSuccess = Boolean(success);
    const showHelper = hasError || hasWarning || hasSuccess || Boolean(helperText);

    const updateFiles = (next: File[]) => {
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    };

    const addFiles = (incoming: File[]) => {
      if (incoming.length === 0) return;

      const accepted: File[] = [];
      const rejected: FileUploadRejection[] = [];
      const limit = maxFiles ?? Number.POSITIVE_INFINITY;
      const next = multiple ? [...files] : [];

      incoming.forEach((file) => {
        if (!matchesAccept(file, accept)) {
          rejected.push({ file, reason: "type" });
        } else if (maxSize !== undefined && file.size > maxSize) {
          rejected.push({ file, reason: "size" });
        } else if (next.some((existing) => isSameFile(existing, file))) {
          // Duplikat diabaikan tanpa dilaporkan sebagai penolakan.
        } else if (next.length >= limit) {
          rejected.push({ file, reason: "count" });
        } else {
          next.push(file);
          accepted.push(file);
        }
      });

      if (rejected.length > 0) onReject?.(rejected);
      if (accepted.length > 0) updateFiles(next);
    };

    const removeFile = (index: number) => {
      updateFiles(files.filter((_, i) => i !== index));
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(Array.from(e.target.files ?? []));
      // Reset agar file yang sama bisa dipilih lagi setelah dihapus.
      e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled) return;
      addFiles(Array.from(e.dataTransfer?.files ?? []));
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      dragDepth.current += 1;
      setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    };

    const openPicker = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    };

    const wrapperClasses = clsx(
      styles["file-upload-wrapper"],
      fullWidth && styles["file-upload-wrapper--full-width"],
      className,
    );

    const zoneClasses = clsx(
      styles["dropzone"],
      dragging && styles["dropzone--dragging"],
      hasError && styles["dropzone--error"],
      hasWarning && styles["dropzone--warning"],
      hasSuccess && styles["dropzone--success"],
      disabled && styles["dropzone--disabled"],
    );

    const helperClasses = clsx(
      styles["helper-text"],
      hasError && styles["helper-text--error"],
      hasWarning && styles["helper-text--warning"],
      hasSuccess && styles["helper-text--success"],
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

        {/* Input file diletakkan di luar area `role="button"` supaya tidak menjadi
            kontrol interaktif bersarang. */}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className={styles["file-input"]}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          name={name}
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleInputChange}
        />

        <div
          ref={zoneRef}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-invalid={hasError || undefined}
          aria-errormessage={hasError ? `${inputId}-helper` : undefined}
          aria-describedby={showHelper ? `${inputId}-helper` : undefined}
          className={zoneClasses}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className={styles["dropzone-icon"]}>
            <UploadIcon />
          </span>
          <span className={styles["dropzone-text"]}>{dropText}</span>
          {hint && <span className={styles["dropzone-hint"]}>{hint}</span>}
        </div>

        {files.length > 0 && (
          <ul className={styles["file-list"]}>
            {files.map((file, index) => {
              const itemState = getFileStatus?.(file);
              const status = itemState?.status;
              const uploading = status === "uploading";
              const progress = Math.min(100, Math.max(0, Math.round(itemState?.progress ?? 0)));
              const statusLabel =
                status === "uploading"
                  ? `Mengunggah ${progress}%`
                  : (itemState?.message ?? (status === "success" ? "Selesai" : "Gagal diunggah"));

              return (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className={clsx(styles["file-item"], status && styles[`file-item--${status}`])}
                  aria-busy={uploading || undefined}
                >
                  <span className={styles["file-icon"]}>
                    <FileIcon />
                  </span>
                  <span className={styles["file-info"]}>
                    <span className={styles["file-name"]}>{file.name}</span>
                    <span className={styles["file-size"]}>{formatSize(file.size)}</span>
                    {uploading && (
                      <span
                        className={styles["file-progress"]}
                        role="progressbar"
                        aria-label={`Progres unggah ${file.name}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        aria-valuetext={`${progress}%`}
                      >
                        <span
                          className={styles["file-progress-bar"]}
                          style={{ width: `${progress}%` }}
                        />
                      </span>
                    )}
                    {status && (
                      <span
                        className={clsx(styles["file-status"], styles[`file-status--${status}`])}
                        role={status === "error" ? "alert" : undefined}
                      >
                        {statusLabel}
                      </span>
                    )}
                  </span>
                  {status && (
                    <span
                      className={clsx(
                        styles["file-status-icon"],
                        styles[`file-status-icon--${status}`],
                      )}
                      aria-hidden="true"
                    >
                      {uploading ? (
                        <span className={styles["file-spinner"]} />
                      ) : status === "success" ? (
                        <CheckIcon />
                      ) : (
                        <AlertIcon />
                      )}
                    </span>
                  )}
                  <button
                    type="button"
                    className={styles["file-remove"]}
                    aria-label={`Hapus ${file.name}`}
                    disabled={disabled || uploading}
                    onClick={() => removeFile(index)}
                  >
                    <RemoveIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {showHelper && (
          <span id={`${inputId}-helper`} className={helperClasses} role="alert" aria-live="polite">
            {error || warning || success || helperText}
          </span>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
