import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Select } from "./Select";
import type { SelectOption } from "./Select.types";

const options: SelectOption[] = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
  { value: "vip", label: "VIP", disabled: true },
];

describe("Select", () => {
  it("renders a combobox with placeholder", () => {
    render(<Select options={options} placeholder="Pilih paket" />);
    const combo = screen.getByRole("combobox");
    expect(combo).toHaveAttribute("role", "combobox");
    expect(combo).toHaveProperty("placeholder", "Pilih paket");
  });

  it("renders the label", () => {
    render(<Select options={options} label="Paket" />);
    expect(screen.getByLabelText("Paket")).toBeDefined();
  });

  it("opens the listbox when clicked", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    await user.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("id", "plan-listbox");
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("selects an option on click and closes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select id="plan" options={options} onChange={onChange} />);
    const combo = screen.getByRole("combobox");
    await user.click(combo);
    await user.click(screen.getByRole("option", { name: "Pro" }));
    expect(onChange).toHaveBeenCalledWith("pro");
    expect(combo).toHaveValue("Pro");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("skips disabled options on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    const vip = screen.getByRole("option", { name: "VIP" });
    expect(vip).toHaveAttribute("aria-disabled", "true");
    await user.click(vip);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("filters options while typing", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    await user.type(screen.getByRole("combobox"), "pro");
    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("Pro")).toBeDefined();
    expect(within(listbox).queryByText("Starter")).toBeNull();
    expect(within(listbox).queryByText("Enterprise")).toBeNull();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    await user.type(screen.getByRole("combobox"), "zzz");
    const empty = screen.getByText("Opsi tidak ditemukan");
    expect(empty).toHaveAttribute("role", "option");
  });

  it("selects the active option with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    const combo = screen.getByRole("combobox");
    await user.click(combo);
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith("pro");
    expect(combo).toHaveValue("Pro");
  });

  it("moves aria-activedescendant on ArrowDown/ArrowUp", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    const combo = screen.getByRole("combobox");
    await user.click(combo);
    await user.keyboard("{ArrowDown}");
    expect(combo).toHaveAttribute("aria-activedescendant", "plan-opt-1");
    await user.keyboard("{ArrowUp}");
    expect(combo).toHaveAttribute("aria-activedescendant", "plan-opt-0");
  });

  it("closes the menu with Escape", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    const combo = screen.getByRole("combobox");
    await user.click(combo);
    expect(screen.getByRole("listbox")).toBeDefined();
    await user.keyboard("{Escape}");
    expect(combo).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("clears the query with Escape first", async () => {
    const user = userEvent.setup();
    render(<Select options={options} id="plan" />);
    const combo = screen.getByRole("combobox");
    await user.type(combo, "pro");
    expect(screen.getByRole("listbox")).toBeDefined();
    await user.keyboard("{Escape}");
    // query cleared, menu still open, all options back
    expect(combo).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("clears selection with the clear button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} defaultValue="pro" onChange={onChange} />);
    const combo = screen.getByRole("combobox");
    expect(combo).toHaveValue("Pro");
    await user.click(screen.getByRole("button", { name: "Hapus pilihan" }));
    expect(onChange).toHaveBeenCalledWith("");
    expect(combo).toHaveValue("");
  });

  it("is read-only when searchable is disabled", async () => {
    const user = userEvent.setup();
    render(<Select options={options} searchable={false} defaultValue="pro" />);
    const combo = screen.getByRole("combobox");
    expect(combo).toHaveProperty("readOnly", true);
    await user.click(combo);
    expect(screen.getByRole("listbox")).toBeDefined();
  });

  it("is disabled and does not open", async () => {
    const user = userEvent.setup();
    render(<Select options={options} disabled />);
    const combo = screen.getByRole("combobox");
    expect(combo).toBeDisabled();
    await user.click(combo);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("shows error with alert role and aria-errormessage", () => {
    render(<Select options={options} id="plan" error="Wajib dipilih" />);
    const combo = screen.getByRole("combobox");
    expect(combo).toHaveAttribute("aria-invalid", "true");
    expect(combo).toHaveAttribute("aria-errormessage", "plan-helper");
    expect(screen.getByRole("alert")).toHaveTextContent("Wajib dipilih");
  });

  it("shows helper text", () => {
    render(<Select options={options} id="plan" helperText="Minimal satu paket" />);
    const combo = screen.getByRole("combobox");
    expect(screen.getByText("Minimal satu paket")).toBeDefined();
    // Helper biasa tidak boleh ditandai sebagai error.
    expect(combo).toHaveAttribute("aria-describedby", "plan-helper");
    expect(combo).not.toHaveAttribute("aria-invalid", "true");
    expect(combo).not.toHaveAttribute("aria-errormessage");
  });

  it("shows the selected label from a controlled value", () => {
    render(<Select options={options} value="enterprise" />);
    expect(screen.getByRole("combobox")).toHaveValue("Enterprise");
  });

  it("shows the selected label from defaultValue (uncontrolled)", () => {
    render(<Select options={options} defaultValue="starter" />);
    expect(screen.getByRole("combobox")).toHaveValue("Starter");
  });

  it("renders a hidden input with name/value for native forms", () => {
    render(<Select options={options} name="plan" value="pro" />);
    const hidden = document.querySelector('input[name="plan"]') as HTMLInputElement;
    expect(hidden.type).toBe("hidden");
    expect(hidden.value).toBe("pro");
  });
});