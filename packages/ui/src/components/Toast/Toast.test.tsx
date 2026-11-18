import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";
import type { ToastProviderProps } from "./Toast.types";

function Trigger({ onClick }: { onClick: (toast: ReturnType<typeof useToast>) => void }) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => onClick(toast)}>
      trigger
    </button>
  );
}

function renderTrigger(
  onClick: (toast: ReturnType<typeof useToast>) => void,
  props: Partial<ToastProviderProps> = {},
) {
  return render(
    <ToastProvider {...props}>
      <Trigger onClick={onClick} />
    </ToastProvider>,
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
      </ToastProvider>,
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
    renderTrigger((toast) => toast.warning("Hampir penuh", { message: "Bersihkan dulu." }));
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
    renderTrigger((toast) => toast.info("Langsung hilang", { duration: 1200 }));
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
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    // Satu di-drop karena cuma 2 slot; paling baru (Dua, Tiga) bertahan.
    expect(screen.queryByText("Satu")).toBeNull();
    expect(screen.getByText("Dua")).toBeDefined();
    expect(screen.getByText("Tiga")).toBeDefined();
  });

  it("does not render a close button when closable is false", () => {
    renderTrigger((toast) => toast.success("Tanpa tombol", { closable: false }));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.queryByRole("button", { name: "Tutup notifikasi" })).toBeNull();
  });

  it("throws when useToast is used outside the provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger onClick={() => {}} />)).toThrow(
      "useToast harus dipakai di dalam <ToastProvider>.",
    );
    consoleError.mockRestore();
  });

  it("stacks multiple toasts in trigger order", () => {
    renderTrigger((toast) => {
      toast.success("Pertama");
      toast.info("Kedua");
      toast.warning("Ketiga");
    });
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    expect(screen.getByText("Pertama")).toBeDefined();
    expect(screen.getByText("Kedua")).toBeDefined();
    expect(screen.getByText("Ketiga")).toBeDefined();

    // Urutan di DOM sesuai urutan pemanggilan (warning = role alert, jadi
    // cek urutan lewat children viewport, bukan lewat role status).
    const region = screen.getByRole("region", { name: "Notifikasi" });
    const texts = Array.from(region.children).map((el) => el.textContent);
    expect(texts[0]).toContain("Pertama");
    expect(texts[1]).toContain("Kedua");
    expect(texts[2]).toContain("Ketiga");
  });

  it("shows one toast at a time in queue mode", () => {
    renderTrigger(
      (toast) => {
        toast.info("Pertama");
        toast.info("Kedua");
      },
      { queue: true },
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    expect(screen.getByText("Pertama")).toBeDefined();
    expect(screen.queryByText("Kedua")).toBeNull();
    expect(screen.getAllByRole("status")).toHaveLength(1);
  });

  it("promotes the next queued toast after the active one closes", () => {
    renderTrigger(
      (toast) => {
        toast.info("Pertama");
        toast.info("Kedua");
      },
      { queue: true },
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    fireEvent.click(screen.getByRole("button", { name: "Tutup notifikasi" }));
    expect(screen.queryByText("Pertama")).toBeNull();
    expect(screen.getByText("Kedua")).toBeDefined();
  });

  it("starts the timer of a queued toast only once it is shown", () => {
    renderTrigger(
      (toast) => {
        toast.info("Pertama", { duration: 1000 });
        toast.info("Kedua", { duration: 1000 });
      },
      { queue: true },
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("Pertama")).toBeNull();
    expect(screen.getByText("Kedua")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("Kedua")).toBeNull();
  });

  it("drops the oldest waiting toast beyond maxToasts", () => {
    renderTrigger(
      (toast) => {
        toast.info("Satu");
        toast.info("Dua");
        toast.info("Tiga");
      },
      { queue: true, maxToasts: 2 },
    );
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    // "Satu" terbuang; antrean tersisa "Dua" (tampil) dan "Tiga" (menunggu).
    expect(screen.getByText("Dua")).toBeDefined();
    expect(screen.queryByText("Satu")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Tutup notifikasi" }));
    expect(screen.getByText("Tiga")).toBeDefined();
    expect(screen.queryByText("Satu")).toBeNull();
  });

  it("keeps independent timers for toasts with different durations", () => {
    renderTrigger((toast) => {
      toast.info("Singkat", { duration: 1000 });
      toast.info("Panjang", { duration: 5000 });
    });
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    // Toast dengan durasi 1000ms sudah hilang, 5000ms masih ada.
    expect(screen.queryByText("Singkat")).toBeNull();
    expect(screen.getByText("Panjang")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.queryByText("Panjang")).toBeNull();
  });

  it("pauses auto-dismiss while hovered and resumes after leave", () => {
    renderTrigger((toast) => toast.success("Hover dulu"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    const toastEl = screen.getByText("Hover dulu").closest('[role="status"]') as HTMLElement;

    // Hover → timer pause.
    fireEvent.mouseEnter(toastEl);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Hover dulu")).toBeDefined();

    // Leave → timer jalan lagi dari awal.
    fireEvent.mouseLeave(toastEl);
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.queryByText("Hover dulu")).toBeNull();
  });

  it("pauses auto-dismiss while keyboard focus is inside the toast", () => {
    renderTrigger((toast) => toast.success("Fokus dulu"));
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));

    const closeButton = screen.getByRole("button", { name: "Tutup notifikasi" });
    act(() => closeButton.focus());
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Fokus dulu")).toBeDefined();

    act(() => closeButton.blur());
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.queryByText("Fokus dulu")).toBeNull();
  });

  it("dismissAll clears toasts that have been visible for a while", () => {
    let calls = 0;
    renderTrigger((toast) => {
      calls += 1;
      if (calls === 1) {
        toast.success("Tahan", { duration: 0 });
        toast.info("Juga tahan", { duration: 0 });
      } else {
        toast.dismissAll();
      }
    });
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.getByText("Tahan")).toBeDefined();
    expect(screen.getByText("Juga tahan")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // duration: 0 → tetap tampil walau waktu berjalan.
    expect(screen.getByText("Tahan")).toBeDefined();
    expect(screen.getByText("Juga tahan")).toBeDefined();

    // Klik kedua → dismissAll.
    fireEvent.click(screen.getByRole("button", { name: "trigger" }));
    expect(screen.queryByText("Tahan")).toBeNull();
    expect(screen.queryByText("Juga tahan")).toBeNull();
  });
});
