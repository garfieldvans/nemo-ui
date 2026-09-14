import { useContext } from "react";

import { ToastContext } from "./ToastProvider";
import type { ToastContextValue } from "./Toast.types";

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast harus dipakai di dalam <ToastProvider>.");
  }
  return ctx;
}