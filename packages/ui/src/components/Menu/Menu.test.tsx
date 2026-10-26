import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";

import { Menu } from "./Menu";
import type { MenuProps } from "./Menu.types";

function renderMenu(props: Partial<MenuProps> & { children?: ReactNode } = {}) {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const { children, ...rest } = props;
  return {
    onEdit,
    onDelete,
    ...render(
      <Menu trigger="Aksi" ariaLabel="Menu aksi" {...rest}>
        {children ?? (
          <>
            <Menu.Item label="Ubah" onSelect={onEdit} />
            <Menu.Divider />
            <Menu.Item label="Hapus" onSelect={onDelete} />
          </>
        )}
      </Menu>
    ),
  };
}

const menu = () => screen.getByRole("menu", { name: "Menu aksi" });
const trigger = () => screen.getByRole("button", { name: "Aksi" });

describe("Menu", () => {
  it("opens on trigger click and shows items + separator", () => {
    renderMenu();
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.click(trigger());
    expect(listOfItems()).toHaveLength(2);
    expect(screen.getByRole("separator")).toBeDefined();
    expect(screen.getByRole("menuitem", { name: "Ubah" })).toBeDefined();
  });

  it("moves active item with ArrowDown and updates aria-activedescendant", () => {
    renderMenu();
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(activeId(list)).toBe(firstItem(list));
    fireEvent.keyDown(list, { key: "ArrowDown" }); // separator dilewati
    expect(activeId(list)).toBe(lastItem(list));
  });

  it("moves back with ArrowUp", () => {
    renderMenu();
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "ArrowDown" }); // ke item terakhir
    fireEvent.keyDown(list, { key: "ArrowUp" });
    // dari item terakhir kembali ke yang pertama
    expect(activeId(list)).toBe(firstItem(list));
  });

  it("skips disabled items while navigating", () => {
    renderMenu({
      children: (
        <>
          <Menu.Item label="Buka" />
          <Menu.Item label="Arsip" disabled />
          <Menu.Item label="Ekspor" />
        </>
      ),
    });
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "ArrowDown" });
    const id = activeId(list);
    const item = document.getElementById(id);
    expect(item).toBeDefined();
    expect(item?.textContent).toBe("Ekspor");
  });

  it("selects the active item with Enter and closes", () => {
    const { onEdit } = renderMenu();
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "Enter" });
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("selects with Space", () => {
    const { onDelete } = renderMenu();
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: " " });
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("selects with mouse click", () => {
    const { onEdit } = renderMenu();
    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("menuitem", { name: "Ubah" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("does not select a disabled item", () => {
    const onDisabled = vi.fn();
    renderMenu({
      children: (
        <>
          <Menu.Item label="Buka" />
          <Menu.Item label="Arsip" disabled onSelect={onDisabled} />
        </>
      ),
    });
    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("menuitem", { name: "Arsip" }));
    expect(screen.getByRole("menu")).toBeDefined();
    expect(onDisabled).not.toHaveBeenCalled();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    renderMenu();
    fireEvent.click(trigger());
    const list = menu();
    fireEvent.keyDown(list, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it("closes when clicking outside", () => {
    renderMenu();
    fireEvent.click(trigger());
    expect(screen.getByRole("menu")).toBeDefined();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn();
    renderMenu({ open: false, onOpenChange });
    fireEvent.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

function listOfItems() {
  return screen.getAllByRole("menuitem");
}

function firstItem(list: HTMLElement): string {
  const id = list.querySelectorAll('[role="menuitem"]')[0].id;
  return id;
}

function lastItem(list: HTMLElement): string {
  const all = list.querySelectorAll('[role="menuitem"]');
  return all[all.length - 1].id;
}

function activeId(list: HTMLElement): string {
  return list.getAttribute("aria-activedescendant") ?? "";
}