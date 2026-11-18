import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import styles from "./Toast.module.scss";

import { clsx } from "../../utils/clsx";
import { CloseIcon, ToneIcon } from "../internal/icons";
import { Portal } from "../internal/Portal";
import type { ToastContextValue, ToastItem, ToastOptions, ToastProviderProps } from "./Toast.types";

export const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;
const DEFAULT_CLOSABLE = true;

// Counter modul-level (bukan Math.random) supaya aman dari react-hooks/purity.
let toastIdCounter = 0;
function nextId(): string {
  toastIdCounter += 1;
  return `toast-${toastIdCounter}`;
}

export function ToastProvider({
  children,
  placement = "top-right",
  maxToasts = 5,
  queue = false,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const show = useCallback(
    (options: ToastOptions): string => {
      const id = nextId();
      const item: ToastItem = {
        ...options,
        id,
        tone: options.tone ?? "info",
        closable: options.closable ?? DEFAULT_CLOSABLE,
        duration: options.duration ?? DEFAULT_DURATION,
      };
      setToasts((prev) => {
        const next = [...prev, item];
        // Batasi jumlah toast yang disimpan (tampil + menunggu); yang paling
        // lama di-drop supaya antrean tidak tumbuh tanpa batas.
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });
      return id;
    },
    [maxToasts],
  );

  const value = useMemo<ToastContextValue>(() => {
    const toneFactory =
      (tone: ToastItem["tone"]) =>
      (title: ReactNode, options?: Omit<ToastOptions, "title">): string =>
        show({ ...options, tone, title });
    return {
      show,
      success: toneFactory("success"),
      info: toneFactory("info"),
      warning: toneFactory("warning"),
      error: toneFactory("error"),
      dismiss,
      dismissAll,
      toasts,
    };
  }, [show, dismiss, dismissAll, toasts]);

  // Mode antrean: hanya toast terdepan yang tampil, sisanya menunggu dan
  // otomatis naik begitu toast aktif hilang dari daftar.
  const visibleToasts = queue ? toasts.slice(0, 1) : toasts;

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <div
          className={clsx(styles.viewport, styles[`viewport--${placement}`])}
          role="region"
          aria-label="Notifikasi"
          aria-live="polite"
          aria-relevant="additions"
        >
          {visibleToasts.map((t) => (
            <ToastView key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const duration = item.duration ?? DEFAULT_DURATION;
  // Hover dan fokus keyboard dihitung terpisah agar mouse yang keluar saat
  // fokus masih di dalam toast tidak melanjutkan timer.
  const paused = hovered || focused;

  // Auto-close; pause saat hover atau fokus. onDismiss stabil (dismiss useCallback)
  // jadi timer tidak ter-reset oleh re-render provider (mis. toast lain masuk).
  useEffect(() => {
    if (paused || duration <= 0) return;
    const timer = setTimeout(() => onDismiss(item.id), duration);
    return () => clearTimeout(timer);
  }, [paused, duration, item.id, onDismiss]);

  return (
    <div
      className={clsx(styles.toast, styles[`toast--${item.tone}`])}
      role={item.tone === "error" || item.tone === "warning" ? "alert" : "status"}
      aria-atomic="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        // Fokus pindah antar anak toast tidak dihitung keluar.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      <span className={styles["toast-icon"]} aria-hidden="true">
        <ToneIcon tone={item.tone} />
      </span>
      {(item.title || item.message) && (
        <div className={styles["toast-content"]}>
          {item.title && <div className={styles["toast-title"]}>{item.title}</div>}
          {item.message && <div className={styles["toast-message"]}>{item.message}</div>}
        </div>
      )}
      {item.action && <div className={styles["toast-action"]}>{item.action}</div>}
      {item.closable && (
        <button
          type="button"
          className={styles["toast-close"]}
          onClick={() => onDismiss(item.id)}
          aria-label="Tutup notifikasi"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
}
