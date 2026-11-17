import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Combobox } from "./Combobox";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types";

const options: ComboboxOption[] = [
  { label: "React", value: "react", description: "Library UI" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular", disabled: true },
];

const renderCombobox = (props: Partial<ComboboxProps> = {}) =>
  render(<Combobox options={options} label="Framework" {...props} />);

const getInput = () => screen.getByRole("combobox");

describe("Combobox", () => {
  it("opens the listbox and filters options while typing", async () => {
    const user = userEvent.setup();
    renderCombobox();

    await user.click(getInput());
    expect(screen.getByRole("listbox")).toBeDefined();
    expect(screen.getAllByRole("option")).toHaveLength(4);

    await user.type(getInput(), "sv");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option", { name: /Svelte/ })).toBeDefined();
  });

  it("selects an option as a chip and reports the array of values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCombobox({ onChange });

    await user.click(getInput());
    await user.click(screen.getByRole("option", { name: /React/ }));

    expect(onChange).toHaveBeenLastCalledWith(["react"]);
    expect(screen.getByRole("button", { name: "Hapus React" })).toBeDefined();
    expect(getInput()).toHaveValue("");
  });

  it("deselects an option when its chip is removed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCombobox({ defaultValue: ["react", "vue"], onChange });

    await user.click(screen.getByRole("button", { name: "Hapus Vue" }));
    expect(onChange).toHaveBeenLastCalledWith(["react"]);
    expect(screen.queryByRole("button", { name: "Hapus Vue" })).toBeNull();
  });

  it("removes the last chip with Backspace when the input is empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCombobox({ defaultValue: ["react", "vue"], onChange });

    await user.click(getInput());
    await user.keyboard("{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith(["react"]);
  });

  it("toggles the active option with ArrowDown and Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCombobox({ onChange });

    await user.click(getInput());
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["vue"]);
  });

  it("ignores disabled options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCombobox({ onChange });

    await user.click(getInput());
    const disabled = screen.getByRole("option", { name: /Angular/ });
    expect(disabled).toHaveAttribute("aria-disabled", "true");

    await user.click(disabled);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows the empty text when no option matches", async () => {
    const user = userEvent.setup();
    renderCombobox({ emptyText: "Tidak ada hasil" });

    await user.type(getInput(), "zzz");
    expect(screen.getByRole("option", { name: "Tidak ada hasil" })).toBeDefined();
  });

  it("submits every selected value through hidden inputs sharing the name", () => {
    const { container } = renderCombobox({ name: "framework", defaultValue: ["react", "vue"] });
    const hidden = [...container.querySelectorAll('input[type="hidden"][name="framework"]')];
    expect(hidden.map((input) => (input as HTMLInputElement).value)).toEqual(["react", "vue"]);
  });
});
