import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Table } from "./Table";
import type { TableColumn } from "./Table.types";

interface Row {
  id: number;
  nama: string;
  peran: string;
}

const rows: Row[] = [
  { id: 1, nama: "Andi", peran: "Admin" },
  { id: 2, nama: "Budi", peran: "Editor" },
];

const columns: TableColumn<Row>[] = [
  { key: "nama", header: "Nama" },
  { key: "peran", header: "Peran" },
];

const renderTable = (props: Partial<Parameters<typeof Table<Row>>[0]> = {}) =>
  render(
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      {...props}
    />,
  );

describe("Table", () => {
  it("renders headers and cells from keys", () => {
    renderTable();
    expect(screen.getByText("Nama")).toBeDefined();
    expect(screen.getByText("Peran")).toBeDefined();
    expect(screen.getByText("Andi")).toBeDefined();
    expect(screen.getByText("Admin")).toBeDefined();
    expect(screen.getByText("Budi")).toBeDefined();
  });

  it("uses a custom render for a column", () => {
    renderTable({
      columns: [
        ...columns,
        {
          key: "badge",
          header: "Status",
          render: (row) => <strong>{row.peran === "Admin" ? "AKTIF" : "-"}</strong>,
        },
      ],
    });
    expect(screen.getByText("AKTIF")).toBeDefined();
  });

  it("renders null/undefined cells as empty string", () => {
    renderTable({
      columns: [{ key: "hilang", header: "Kosong" }],
      data: [{ id: 1, nama: "X", peran: "Y" }] as Row[],
    });
    // Tidak melempar; sel kosong tetap dirender.
    expect(screen.getByText("Kosong")).toBeDefined();
    expect(screen.getByRole("columnheader", { name: "Kosong" })).toBeDefined();
  });

  it("applies column align as inline style", () => {
    renderTable({
      columns: [{ key: "peran", header: "Peran", align: "right" }],
    });
    const header = screen.getByRole("columnheader", { name: "Peran" });
    expect(header.style.textAlign).toBe("right");
    const cell = screen.getByText("Admin").closest("td");
    expect(cell?.style.textAlign).toBe("right");
  });

  it("shows the empty state when data is empty", () => {
    renderTable({ data: [], emptyText: "Belum ada anggota" });
    expect(screen.getByText("Belum ada anggota")).toBeDefined();
    const cell = screen.getByText("Belum ada anggota").closest("td");
    expect(cell).toHaveAttribute("colspan", String(columns.length));
    expect(screen.queryByText("Andi")).toBeNull();
  });

  it("renders the caption", () => {
    renderTable({ caption: "Daftar anggota" });
    expect(screen.getByText("Daftar anggota")).toBeDefined();
  });

  it("applies striped and size classes", () => {
    const { container } = renderTable({ striped: true, size: "sm" });
    const table = container.querySelector("table");
    expect(table?.className).toContain("table--striped");
    expect(table?.className).toContain("table--sm");
  });

  it("renders one row per datum with rowKey", () => {
    const { container } = renderTable();
    const bodyRows = container.querySelectorAll("tbody tr");
    expect(bodyRows).toHaveLength(2);
  });

  it("sorts on header click and cycles asc, desc, then unsorted", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const { container } = renderTable({
      columns: [
        { key: "nama", header: "Nama", sortable: true },
        { key: "peran", header: "Peran" },
      ],
      onSortChange,
    });
    const firstName = () =>
      container.querySelector("tbody tr td")?.textContent;

    expect(screen.getByRole("columnheader", { name: "Nama" })).toHaveAttribute(
      "aria-sort",
      "none",
    );

    await user.click(screen.getByRole("button", { name: "Nama" }));
    expect(screen.getByRole("columnheader", { name: "Nama" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(firstName()).toBe("Andi");
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "nama", direction: "asc" });

    await user.click(screen.getByRole("button", { name: "Nama" }));
    expect(screen.getByRole("columnheader", { name: "Nama" })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    expect(firstName()).toBe("Budi");

    await user.click(screen.getByRole("button", { name: "Nama" }));
    expect(screen.getByRole("columnheader", { name: "Nama" })).toHaveAttribute(
      "aria-sort",
      "none",
    );
    expect(firstName()).toBe("Andi");
    expect(onSortChange).toHaveBeenLastCalledWith(null);
  });

  it("selects rows and toggles all rows via checkboxes", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    renderTable({ selectable: true, onSelectionChange });

    const rowOne = screen.getByRole("checkbox", { name: "Pilih baris 1" });
    await user.click(rowOne);
    expect(rowOne).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(["1"]);

    const selectAll = screen.getByRole("checkbox", { name: "Pilih semua baris" });
    expect(selectAll).not.toBeChecked();
    await user.click(selectAll);
    expect(onSelectionChange).toHaveBeenLastCalledWith(["1", "2"]);
    expect(rowOne).toBeChecked();

    await user.click(selectAll);
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
    expect(rowOne).not.toBeChecked();
  });

  it("keeps the header sticky within a scrollable wrapper", () => {
    const { container } = renderTable({ stickyHeader: true, maxHeight: 200 });
    const table = container.querySelector("table");
    expect(table?.className).toContain("table--sticky");
    const wrapper = table?.parentElement as HTMLElement;
    expect(wrapper.className).toContain("wrapper--scrollable");
    expect(wrapper.style.maxHeight).toBe("200px");
  });
});
