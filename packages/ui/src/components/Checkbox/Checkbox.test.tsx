import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeDefined();
  });

  it("renders the label text", () => {
    render(<Checkbox label="Setujui syarat" />);
    expect(screen.getByText("Setujui syarat")).toBeDefined();
  });

  it("toggles checked state when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Ingat saya" />);
    const input = screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("supports defaultChecked (uncontrolled)", () => {
    render(<Checkbox label="Aktif" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("honors controlled checked prop", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Kontrolled" checked />);
    const input = screen.getByRole("checkbox");
    await user.click(input);
    // controlled — click should NOT uncheck it
    expect(input).toBeChecked();
  });

  it("sets indeterminate property and mixed state", () => {
    render(<Checkbox label="Semua" indeterminate />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input).toHaveAttribute("aria-checked", "mixed");
  });

  it("clears indeterminate when prop is removed", () => {
    const { rerender } = render(<Checkbox label="Semua" indeterminate />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    rerender(<Checkbox label="Semua" indeterminate={false} />);
    expect(input.indeterminate).toBe(false);
  });

  it("is disabled and blocks toggling", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Terkunci" disabled />);
    const input = screen.getByRole("checkbox");
    expect(input).toBeDisabled();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("shows error with alert role", () => {
    render(<Checkbox label="Syarat" error="Harus disetujui" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Harus disetujui");
  });

  it("shows helper text", () => {
    render(<Checkbox label="Email" helperText="Dipakai untuk notifikasi" />);
    expect(screen.getByText("Dipakai untuk notifikasi")).toBeDefined();
  });

  it("merges a custom className", () => {
    render(<Checkbox label="Test" className="custom-cls" />);
    expect(document.querySelector(".custom-cls")).not.toBeNull();
  });

  it("applies color and size classes", () => {
    render(<Checkbox label="Kecil" color="success" size="sm" />);
    const label = screen.getByText("Kecil").closest("label");
    expect(label?.className).toContain("checkbox--sm");
  });
});