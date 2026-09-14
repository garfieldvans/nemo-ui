import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

function Trigger({
  onClick,
}: {
  onClick: (toast: ReturnType<typeof useToast>) => void;
}) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => onClick(toast)}>
      trigger
    </button>
  );
}

function renderTrigger(onClick: (toast: ReturnType<typeof useToast>) => void) {
  return render(
    <ToastProvider>
      <Trigger onClick={onClick} />
    </ToastProvider>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ToastProvider", () => {
  it("renders nothing until a toast is shown", () => {
    render(
      <ToastProvider>
        <span>konten</span>
      </ToastProvider>
    );
    expect(screen.getByText("konten")).toBeDefined();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("shows a success toast as status", () => {
    renderTrigger((toast) => toast.success("Tersimpan!"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.getByRole("status")).toBeDefined();
    expect(screen.getByText("Tersimpan!")).toBeDefined();
  });

  it("shows an error toast as alert", () => {
    renderTrigger((toast) => toast.error("Gagal menyimpan"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("supports warning and info helpers with a message", () => {
    renderTrigger((toast) =>
      toast.warning("Hampir penuh", { message: "Bersihkan dulu." })
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.getByText("Hampir penuh")).toBeDefined();
    expect(screen.getByText("Bersihkan dulu.")).toBeDefined();
  });

  it("auto-dismisses after the default duration", () => {
    renderTrigger((toast) => toast.success("Kedipan"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.getByText("Kedipan")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.queryByText("Kedipan")).toBeNull();
  });

  it("honors a custom duration", () => {
    renderTrigger((toast) =>
      toast.info("Langsung hilang", { duration: 1200 })
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    act(() => {
      vi.advanceTimersByTime(1199);
    });
    expect(screen.getByText("Langsung hilang")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByText("Langsung hilang")).toBeNull();
  });

  it("persists when duration is 0", () => {
    renderTrigger((toast) => toast.success("Tetap tampil", { duration: 0 }));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Tetap tampil")).toBeDefined();
  });

  it("dismisses via the close button", () => {
    renderTrigger((toast) => toast.success("Bisa ditutup"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    fireEvent.click(screen.getByRole("button", { name: "Tutup notifikasi" }));
    expect(screen.queryByText("Bisa ditutup")).toBeNull();
  });

  it("dismisses by id returned from show", () => {
    renderTrigger((toast) => {
      const id = toast.show({ title: "Akan dihapus", tone: "info" });
      toast.dismiss(id);
    });
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.queryByText("Akan dihapus")).toBeNull();
  });

  it("dismisses all toasts", () => {
    renderTrigger((toast) => {
      toast.info("Satu");
      toast.warning("Dua");
      toast.dismissAll();
    });
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.queryByText("Satu")).toBeNull();
    expect(screen.queryByText("Dua")).toBeNull();
  });

  it("caps stacked toasts at maxToasts", () => {
    render(
      <ToastProvider maxToasts={2}>
        <Trigger
          onClick={(toast) => {
            toast.success("Satu");
            toast.success("Dua");
            toast.success("Tiga");
          }}
        />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    // Satu di-drop karena cuma 2 slot; paling baru (Dua, Tiga) bertahan.
    expect(screen.queryByText("Satu")).toBeNull();
    expect(screen.getByText("Dua")).toBeDefined();
    expect(screen.getByText("Tiga")).toBeDefined();
  });

  it("does not render a close button when closable is false", () => {
    renderTrigger((toast) =>
      toast.success("Tanpa tombol", { closable: false })
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.queryByRole("button", { name: "Tutup notifikasi" })).toBeNull();
  });

  it("throws when useToast is used outside the provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger onClick={() => {}} />)).toThrow(
      "useToast harus dipakai di dalam <ToastProvider>."
    );
    consoleError.mockRestore();
  });
});