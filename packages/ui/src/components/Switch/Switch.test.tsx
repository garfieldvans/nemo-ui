import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders a switch (role=switch)", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeDefined();
  });

  it("renders the label text", () => {
    render(<Switch label="Notifikasi" />);
    expect(screen.getByText("Notifikasi")).toBeDefined();
  });

  it("toggles checked state when clicked", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifikasi" />);
    const input = screen.getByRole("switch");
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("supports defaultChecked (uncontrolled)", () => {
    render(<Switch label="Aktif" defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("honors controlled checked prop", async () => {
    const user = userEvent.setup();
    render(<Switch label="Kontrolled" checked />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("is disabled and blocks toggling", async () => {
    const user = userEvent.setup();
    render(<Switch label="Terkunci" disabled />);
    const input = screen.getByRole("switch");
    expect(input).toBeDisabled();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("shows error with alert role", () => {
    render(<Switch label="Mode" error="Gagal mengubah mode" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Gagal mengubah mode");
  });

  it("shows helper text", () => {
    render(<Switch label="Mode" helperText="Nonaktifkan saat tidak dipakai" />);
    expect(screen.getByText("Nonaktifkan saat tidak dipakai")).toBeDefined();
  });

  it("merges a custom className", () => {
    render(<Switch label="Test" className="custom-cls" />);
    expect(document.querySelector(".custom-cls")).not.toBeNull();
  });

  it("applies size and color classes", () => {
    render(<Switch label="Kecil" size="sm" color="success" />);
    const label = screen.getByText("Kecil").closest("label");
    expect(label?.className).toContain("switch--sm");
  });
});