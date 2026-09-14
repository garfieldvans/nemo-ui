import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders title and description", () => {
    render(
      <Alert tone="success" title="Tersimpan">
        Data sudah diperbarui
      </Alert>
    );
    expect(screen.getByText("Tersimpan")).toBeDefined();
    expect(screen.getByText("Data sudah diperbarui")).toBeDefined();
  });

  it("defaults error/warning to role=alert", () => {
    render(
      <Alert tone="error">
        Gagal
      </Alert>
    );
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("defaults success/info to role=status", () => {
    render(
      <Alert tone="success">
        Berhasil
      </Alert>
    );
    expect(screen.getByRole("status")).toBeDefined();
  });

  it("allows overriding the role", () => {
    render(
      <Alert tone="success" role="alert">
        Berhasil
      </Alert>
    );
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <Alert tone="info" closable onClose={onClose}>
        Perhatian
      </Alert>
    );
    fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render a close button when not closable", () => {
    render(
      <Alert tone="info">
        Perhatian
      </Alert>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders an action slot", () => {
    render(
      <Alert tone="warning" action={<button type="button">Coba lagi</button>}>
        Ada masalah
      </Alert>
    );
    expect(screen.getByRole("button", { name: "Coba lagi" })).toBeDefined();
  });

  it("supports filled variant", () => {
    const { container } = render(
      <Alert tone="error" variant="filled">
        Gagal
      </Alert>
    );
    expect(container.firstElementChild).toHaveAttribute("data-variant", "filled");
    expect(container.firstElementChild).toHaveAttribute("data-tone", "error");
  });

  it("merges className", () => {
    const { container } = render(
      <Alert tone="info" className="custom">
        Info
      </Alert>
    );
    expect(container.firstElementChild).toHaveClass("custom");
  });
});