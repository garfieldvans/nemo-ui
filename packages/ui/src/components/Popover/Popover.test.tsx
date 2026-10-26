import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const panelAria = () => screen.getByRole("dialog", { name: "Konten popover" });

describe("Popover", () => {
  it("renders the trigger button and toggles the panel", () => {
    render(
      <Popover trigger="Pengaturan" ariaLabel="Konten popover">
        <Button size="sm">Aksi</Button>
      </Popover>
    );
    const trigger = screen.getByRole("button", { name: "Pengaturan" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panelAria()).toBeDefined();

    fireEvent.click(trigger);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes when clicking outside", () => {
    render(
      <>
        <button type="button">luar</button>
        <Popover trigger="Buka" ariaLabel="Konten popover">
          Isi
        </Popover>
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    expect(panelAria()).toBeDefined();

    fireEvent.mouseDown(screen.getByRole("button", { name: "luar" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not close when clicking inside the panel", () => {
    render(
      <Popover trigger="Buka" ariaLabel="Konten popover">
        <button type="button">dalam</button>
      </Popover>
    );
    fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "dalam" }));
    expect(panelAria()).toBeDefined();
  });

  it("closes on Escape", () => {
    render(
      <Popover trigger="Buka" ariaLabel="Konten popover">
        Isi
      </Popover>
    );
    fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Popover
        trigger="Buka"
        open={false}
        onOpenChange={onOpenChange}
        ariaLabel="Konten popover"
      >
        Isi
      </Popover>
    );
    fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).toBeNull();

    rerender(
      <Popover
        trigger="Buka"
        open={true}
        onOpenChange={onOpenChange}
        ariaLabel="Konten popover"
      >
        Isi
      </Popover>
    );
    expect(panelAria()).toBeDefined();
  });

  it("supports defaultOpen", () => {
    render(
      <Popover trigger="Buka" defaultOpen ariaLabel="Konten popover">
        Isi
      </Popover>
    );
    expect(panelAria()).toBeDefined();
  });

  it("sets data-placement and merges className on the panel", () => {
    const rect = (x = 0, y = 0, w = 0, h = 0) =>
      ({ top: y, bottom: y + h, left: x, right: x + w, height: h, width: w }) as DOMRect;
    try {
      render(
        <Popover trigger="Buka" placement="top" ariaLabel="Konten popover" className="custom">
          Isi
        </Popover>
      );
      const trigger = screen.getByRole("button", { name: "Buka" });
      // jsdom memberi rect 0,0 (auto-flip) → stub supaya flip deterministic.
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
        return this === trigger ? rect(100, 200, 50, 30) : rect(0, 0, 200, 40);
      });
      fireEvent.click(trigger);
      const panel = panelAria();
      expect(panel).toHaveAttribute("data-placement", "top");
      expect(panel).toHaveClass("custom");
    } finally {
      vi.restoreAllMocks();
    }
  });
});