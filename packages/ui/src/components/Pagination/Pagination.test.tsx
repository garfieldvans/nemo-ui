import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders page buttons up to pageCount when small", () => {
    render(<Pagination pageCount={5} />);
    for (let i = 1; i <= 5; i += 1) {
      expect(screen.getByRole("button", { name: `Halaman ${i}` })).toBeDefined();
    }
  });

  it("marks the first page active by default", () => {
    render(<Pagination pageCount={5} />);
    expect(screen.getByRole("button", { name: "Halaman 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("collapses with ellipsis on large pageCount", () => {
    render(<Pagination pageCount={20} defaultPage={10} />);
    expect(screen.getByRole("button", { name: "Halaman 1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Halaman 20" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Halaman 10" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    // Halaman jauh dari jendela tidak dirender sebagai tombol.
    expect(screen.queryByRole("button", { name: "Halaman 15" })).toBeNull();
    // Ada elipsis tersembunyi dari screen reader.
    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });

  it("calls onChange when a page is clicked (uncontrolled)", () => {
    const onChange = vi.fn();
    render(<Pagination pageCount={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Halaman 3" }));
    expect(onChange).toHaveBeenCalledWith(3);
    // Uncontrolled → internal state ikut bergerak.
    expect(screen.getByRole("button", { name: "Halaman 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not move internally when controlled", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Pagination page={1} pageCount={5} onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Halaman 4" }));
    expect(onChange).toHaveBeenCalledWith(4);
    // Controlled: tetap di halaman 1 sampai parent update.
    expect(screen.getByRole("button", { name: "Halaman 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    rerender(<Pagination page={4} pageCount={5} onChange={onChange} />);
    expect(screen.getByRole("button", { name: "Halaman 4" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("disables prev/first at the start and next/last at the end", () => {
    const start = render(<Pagination pageCount={5} page={1} />);
    expect(screen.getByRole("button", { name: "Halaman sebelumnya" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Halaman pertama" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Halaman berikutnya" })).toBeEnabled();
    start.unmount();

    // defaultPage hanya berlaku saat mount awal → render instance baru.
    render(<Pagination pageCount={5} defaultPage={5} />);
    expect(screen.getByRole("button", { name: "Halaman berikutnya" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Halaman terakhir" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Halaman sebelumnya" })).toBeEnabled();
  });

  it("navigates with prev/next buttons", () => {
    const onChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Halaman sebelumnya" }));
    expect(onChange).toHaveBeenLastCalledWith(2);
    // Uncontrolled: state internal ikut bergerak ke 2 → next menuju 3.
    fireEvent.click(screen.getByRole("button", { name: "Halaman berikutnya" }));
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it("jumps to first/last with the double-chevron buttons", () => {
    const onChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Halaman terakhir" }));
    expect(onChange).toHaveBeenLastCalledWith(5);
    fireEvent.click(screen.getByRole("button", { name: "Halaman pertama" }));
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it("labels the nav region", () => {
    render(<Pagination pageCount={3} ariaLabel="Halaman pesanan" />);
    expect(screen.getByRole("navigation", { name: "Halaman pesanan" })).toBeDefined();
  });

  it("clamps goto calls within 1..pageCount", () => {
    const onChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={5} onChange={onChange} />);
    // Klik Halaman terakhir saat sudah di akhir → tetap 5, tidak overflow.
    fireEvent.click(screen.getByRole("button", { name: "Halaman 5" }));
    expect(onChange).toHaveBeenCalledWith(5);
    expect(screen.getByRole("button", { name: "Halaman 5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
