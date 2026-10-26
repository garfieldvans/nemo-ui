import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

import { Drawer } from "./Drawer";
import type { DrawerProps } from "./Drawer.types";

function Harness(
  props: Omit<Partial<DrawerProps>, "open" | "onOpenChange"> & { open?: boolean }
) {
  const initial = props.open ?? true;
  const [open, setOpen] = useState(initial);
  return (
    <Drawer open={open} onOpenChange={setOpen} {...props}>
      Isi drawer
    </Drawer>
  );
}

describe("Drawer", () => {
  it("renders dialog from the right by default", () => {
    render(<Harness />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-placement", "right");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(screen.getByText("Isi drawer")).toBeDefined();
  });

  it("renders nothing when closed", () => {
    render(<Harness open={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("applies the requested placement", () => {
    const { rerender } = render(<Harness placement="top" title="Judul" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-placement", "top");
    rerender(<Harness placement="left" title="Judul" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-placement", "left");
  });

  it("wires aria-labelledby to the title", () => {
    render(<Harness title="Judul Drawer" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-labelledby")).toBe(screen.getByText("Judul Drawer").id);
  });

  it("closes on Escape", () => {
    render(<Harness title="Judul" />);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not close on Escape when closeOnEsc=false", () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} closeOnEsc={false}>
        Isi
      </Drawer>
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes on backdrop click", () => {
    render(<Harness title="Judul" />);
    const overlay = document.querySelector("[data-nemo-overlay]") as HTMLElement;
    fireEvent.mouseDown(overlay);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not close when clicking inside the panel", () => {
    render(<Harness title="Judul" />);
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("closes via the close button", () => {
    render(<Harness title="Judul" />);
    fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("locks scroll while open and restores after close", () => {
    const { rerender } = render(<Harness />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Harness open={false} />);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("renders footer slot and merges className", () => {
    render(
      <Harness title="Judul" className="custom-drawer" footer={<button type="button">Simpan</button>} />
    );
    expect(screen.getByRole("button", { name: "Simpan" })).toBeDefined();
    expect(screen.getByRole("dialog")).toHaveClass("custom-drawer");
  });
});