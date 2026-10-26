import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

import { Modal } from "./Modal";
import type { ModalProps } from "./Modal.types";

function ToggleHarness({
  children,
  ...props
}: Omit<ModalProps, "open" | "onOpenChange" | "children"> & { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
      <Modal open={open} onOpenChange={setOpen} {...props}>
        {children}
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("renders dialog with aria-modal when open", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        Isi modal
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Isi modal")).toBeDefined();
  });

  it("renders nothing when closed", () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        Isi modal
      </Modal>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("wires aria-labelledby and aria-describedby", () => {
    render(
      <Modal open onOpenChange={() => {}} title="Judul" description="Deskripsi">
        Isi
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    const title = screen.getByText("Judul");
    const desc = screen.getByText("Deskripsi");
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
    expect(dialog.getAttribute("aria-describedby")).toBe(desc.id);
  });

  it("closes on Escape", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        Isi
      </Modal>
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close on Escape when closeOnEsc=false", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} closeOnEsc={false}>
        Isi
      </Modal>
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when clicking the overlay backdrop", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        Isi
      </Modal>
    );
    const overlay = document.querySelector("[data-nemo-overlay]") as HTMLElement;
    fireEvent.mouseDown(overlay);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when clicking inside the panel", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        Isi
      </Modal>
    );
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes via the window close button", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="Judul">
        Isi
      </Modal>
    );
    fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("moves initial focus to data-autofocus element", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <button type="button" data-autofocus>
          ok
        </button>
      </Modal>
    );
    // close button (header) muncul lebih dulu di DOM, tapi data-autofocus menang.
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "ok" }));
  });

  it("locks page scroll while open and restores after close", () => {
    const { rerender } = render(
      <Modal open onOpenChange={() => {}}>
        Isi
      </Modal>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal open={false} onOpenChange={() => {}}>
        Isi
      </Modal>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("restores focus to the opener when closed", () => {
    render(
      <ToggleHarness title="Judul">
        Isi
      </ToggleHarness>
    );
    const openBtn = screen.getByRole("button", { name: "open" });
    // jsdom tidak fokus saat klik → set fokus eksplisit dulu (seperti browser asli)
    openBtn.focus();
    fireEvent.click(openBtn);
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(openBtn);
  });

  it("renders footer slot and merges className", () => {
    const { container } = render(
      <Modal
        open
        onOpenChange={() => {}}
        title="Judul"
        className="custom-modal"
        footer={<button type="button">Simpan</button>}
      >
        Isi
      </Modal>
    );
    expect(screen.getByRole("button", { name: "Simpan" })).toBeDefined();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("custom-modal");
    expect(dialog).toHaveAttribute("data-size", "md");
    void container;
  });
});