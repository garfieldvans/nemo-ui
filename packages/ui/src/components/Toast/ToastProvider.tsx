import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Toast.module.scss";

import { useTheme, toCssVarMap } from "../../theme";
import { clsx } from "../../utils/clsx";
import { CloseIcon, ToneIcon } from "../internal/icons";
import type {
  ToastContextValue,
  ToastItem,
  ToastOptions,
  ToastProviderProps,
} from "./Toast.types";

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
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { theme, mode } = useTheme();

  // Portal hidup di document.body, DI LUAR wrapper ThemeProvider → bawa
  // CSS vars + color-scheme secara eksplisit supaya tampilannya ikut tema app.
  const cssVars = useMemo(() => toCssVarMap(theme), [theme]);

  // Node portal dibuat sekali (lazy state), lalu ditempel/dilepas di effect —
  // bukan pakai ref/read langsung di render supaya lolos react-hooks checks.
  const [portalNode] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    const node = document.createElement("div");
    node.setAttribute("data-nemo-toast-portal", "");
    return node;
  });

  useEffect(() => {
    if (!portalNode) return;
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

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
        // Batasi jumlah toast yang tampil; yang paling lama di-drop.
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });
      return id;
    },
    [maxToasts]
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

  return (
    <ToastContext.Provider value={value}>
      {children}
      {portalNode &&
        createPortal(
          <div
            data-theme={mode}
            className={clsx(styles.viewport, styles[`viewport--${placement}`])}
            style={{ ...cssVars, colorScheme: mode }}
            role="region"
            aria-label="Notifikasi"
            aria-live="polite"
            aria-relevant="additions"
          >
            {toasts.map((t) => (
              <ToastView key={t.id} item={t} onDismiss={dismiss} />
            ))}
          </div>,
          portalNode
        )}
    </ToastContext.Provider>
  );
}

function ToastView({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const [paused, setPaused] = useState(false);
  const duration = item.duration ?? DEFAULT_DURATION;

  // Auto-close; pause saat hover. onDismiss stabil (dismiss useCallback) jadi
  // timer tidak ter-reset oleh re-render provider (mis. toast lain masuk).
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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