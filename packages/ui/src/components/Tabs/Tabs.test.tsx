import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Tabs } from "./Tabs";
import type { TabsItem } from "./Tabs.types";

const items: TabsItem[] = [
  { value: "ringkasan", label: "Ringkasan", content: <p>Konten ringkasan</p> },
  { value: "anggota", label: "Anggota", content: <p>Konten anggota</p> },
  { value: "arsip", label: "Arsip", disabled: true, content: <p>Konten arsip</p> },
  { value: "setelan", label: "Setelan", content: <p>Konten setelan</p> },
];

const tab = (name: string) => screen.getByRole("tab", { name });

describe("Tabs", () => {
  it("renders the tablist with all items", () => {
    render(<Tabs items={items} ariaLabel="Info project" />);
    expect(screen.getByRole("tablist", { name: "Info project" })).toBeDefined();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
  });

  it("selects the first enabled item by default", () => {
    render(<Tabs items={items} />);
    expect(tab("Ringkasan")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Konten ringkasan")).toBeDefined();
  });

  it("selects on click and shows the matching panel", () => {
    render(<Tabs items={items} />);
    fireEvent.click(tab("Anggota"));
    expect(tab("Anggota")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Konten anggota")).toBeDefined();
    expect(screen.queryByText("Konten ringkasan")).toBeNull();
  });

  it("does not select a disabled tab on click", () => {
    render(<Tabs items={items} />);
    const disabled = tab("Arsip");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(disabled);
    expect(tab("Ringkasan")).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("Konten arsip")).toBeNull();
  });

  it("moves with ArrowRight/ArrowLeft and skips disabled tabs", () => {
    render(<Tabs items={items} defaultValue="ringkasan" />);
    const list = screen.getByRole("tablist");

    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("Anggota")).toHaveAttribute("aria-selected", "true");
    expect(document.activeElement).toBe(tab("Anggota"));

    // Arsip disabled → langsung ke Setelan.
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("Setelan")).toHaveAttribute("aria-selected", "true");

    // Wrap dari akhir ke awal.
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("Ringkasan")).toHaveAttribute("aria-selected", "true");

    // Mundur: wrap dari awal ke akhir.
    fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(tab("Setelan")).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to first/last enabled with Home/End", () => {
    render(<Tabs items={items} defaultValue="anggota" />);
    const list = screen.getByRole("tablist");

    fireEvent.keyDown(list, { key: "End" });
    expect(tab("Setelan")).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(list, { key: "Home" });
    expect(tab("Ringkasan")).toHaveAttribute("aria-selected", "true");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Tabs items={items} value="ringkasan" onChange={onChange} />,
    );
    fireEvent.click(tab("Anggota"));
    expect(onChange).toHaveBeenCalledWith("anggota");
    // Controlled: panel tidak berubah sampai parent update value.
    expect(screen.getByText("Konten ringkasan")).toBeDefined();

    rerender(<Tabs items={items} value="anggota" onChange={onChange} />);
    expect(screen.getByText("Konten anggota")).toBeDefined();
  });

  it("supports defaultValue (uncontrolled)", () => {
    render(<Tabs items={items} defaultValue="setelan" />);
    expect(tab("Setelan")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Konten setelan")).toBeDefined();
  });

  it("wires tab and panel aria attributes", () => {
    render(<Tabs items={items} defaultValue="ringkasan" />);
    const active = tab("Ringkasan");
    expect(active).toHaveAttribute("aria-selected", "true");

    const panelId = active.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId as string);
    expect(panel).not.toBeNull();
    expect(panel).toHaveAttribute("role", "tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", active.id);
    expect(panel).toHaveTextContent("Konten ringkasan");
  });

  it("uses roving tabIndex: only the active tab is tabbable", () => {
    render(<Tabs items={items} defaultValue="ringkasan" />);
    expect(tab("Ringkasan")).toHaveAttribute("tabindex", "0");
    expect(tab("Anggota")).toHaveAttribute("tabindex", "-1");
  });

  it("renders panel with the item content slot", () => {
    render(
      <Tabs
        items={[{ value: "x", label: "X", content: <button>Lihat</button> }]}
        defaultValue="x"
      />,
    );
    expect(screen.getByRole("button", { name: "Lihat" })).toBeDefined();
  });
});
