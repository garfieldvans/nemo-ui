import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { DatePicker } from "./DatePicker";
import type { DatePickerProps } from "./DatePicker.types";

const JULY_16 = new Date(2026, 6, 16);

const renderPicker = (props: Partial<DatePickerProps> = {}) =>
  render(<DatePicker label="Tanggal" {...props} />);

const getInput = () => screen.getByLabelText("Tanggal") as HTMLInputElement;
const getDay = (label: string) => screen.getByRole("button", { name: label });

describe("DatePicker", () => {
  it("shows the default value using dd/mm/yyyy", () => {
    renderPicker({ defaultValue: JULY_16 });
    expect(getInput()).toHaveValue("16/07/2026");
  });

  it("opens the calendar and shows the month of the selected date", async () => {
    const user = userEvent.setup();
    renderPicker({ defaultValue: JULY_16 });

    await user.click(getInput());

    expect(screen.getByRole("dialog", { name: "Pilih tanggal" })).toBeDefined();
    expect(screen.getByText("Juli 2026")).toBeDefined();
    expect(getDay("16 Juli 2026")).toBeDefined();
  });

  it("selects a day with the mouse and closes the calendar", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPicker({ defaultValue: JULY_16, onChange });

    await user.click(getInput());
    await user.click(getDay("20 Juli 2026"));

    expect((onChange.mock.calls[0][0] as Date).getTime()).toBe(new Date(2026, 6, 20).getTime());
    expect(getInput()).toHaveValue("20/07/2026");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("accepts a manually typed date and commits it with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPicker({ onChange });

    await user.click(getInput());
    await user.type(getInput(), "16/07/2026");
    await user.keyboard("{Enter}");

    expect((onChange.mock.calls[0][0] as Date).getTime()).toBe(JULY_16.getTime());
    expect(getInput()).toHaveValue("16/07/2026");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("restores the previous value when the typed text is invalid", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPicker({ defaultValue: JULY_16, onChange });

    await user.clear(getInput());
    await user.type(getInput(), "31/02/2026");
    await user.tab();

    expect(onChange).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("16/07/2026");
  });

  it("disables days outside min and max", async () => {
    const user = userEvent.setup();
    renderPicker({
      defaultValue: JULY_16,
      min: new Date(2026, 6, 10),
      max: new Date(2026, 6, 25),
    });

    await user.click(getInput());

    expect(getDay("9 Juli 2026")).toBeDisabled();
    expect(getDay("26 Juli 2026")).toBeDisabled();
    expect(getDay("16 Juli 2026")).toBeEnabled();
  });

  it("clears the value with the clear button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderPicker({ defaultValue: JULY_16, onChange, name: "tanggal" });

    await user.click(screen.getByRole("button", { name: "Hapus tanggal" }));

    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(getInput()).toHaveValue("");
    expect(container.querySelector('input[type="hidden"][name="tanggal"]')).toHaveValue("");
  });

  it("moves the active day with the keyboard and selects it with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPicker({ defaultValue: JULY_16, onChange });

    await user.click(getInput());
    await user.keyboard("{ArrowRight}{ArrowDown}{Enter}");

    expect((onChange.mock.calls[0][0] as Date).getTime()).toBe(new Date(2026, 6, 24).getTime());
    expect(getInput()).toHaveValue("24/07/2026");
  });

  it("navigates between months", async () => {
    const user = userEvent.setup();
    renderPicker({ defaultValue: JULY_16 });

    await user.click(getInput());
    await user.click(screen.getByRole("button", { name: "Bulan sebelumnya" }));
    expect(screen.getByText("Juni 2026")).toBeDefined();

    await user.click(screen.getByRole("button", { name: "Bulan berikutnya" }));
    await user.click(screen.getByRole("button", { name: "Bulan berikutnya" }));
    expect(screen.getByText("Agustus 2026")).toBeDefined();
  });

  it("supports the yyyy-mm-dd format for display, typing, and the hidden input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderPicker({
      format: "yyyy-mm-dd",
      defaultValue: JULY_16,
      onChange,
      name: "tanggal",
    });

    expect(getInput()).toHaveValue("2026-07-16");
    expect(container.querySelector('input[type="hidden"][name="tanggal"]')).toHaveValue("2026-07-16");

    await user.click(getInput());
    await user.clear(getInput());
    await user.type(getInput(), "2026-12-01{Enter}");

    expect((onChange.mock.calls[0][0] as Date).getTime()).toBe(new Date(2026, 11, 1).getTime());
    expect(getInput()).toHaveValue("2026-12-01");
  });

  it("renders error state and helper message", () => {
    renderPicker({ error: "Tanggal wajib diisi." });

    expect(getInput()).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert").textContent).toBe("Tanggal wajib diisi.");
  });
});
