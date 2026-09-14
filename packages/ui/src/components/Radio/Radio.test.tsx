import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ComponentProps } from "react";

import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

describe("Radio (standalone)", () => {
  it("renders a radio input with name and value", () => {
    render(<Radio name="gender" value="male" label="Laki-laki" />);
    const input = screen.getByRole("radio");
    expect(input).toHaveAttribute("name", "gender");
    expect(input).toHaveAttribute("value", "male");
  });

  it("renders the label text", () => {
    render(<Radio name="x" value="a" label="Opsi A" />);
    expect(screen.getByText("Opsi A")).toBeDefined();
  });

  it("can be checked (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(<Radio name="x" value="a" label="Opsi A" defaultChecked />);
    const input = screen.getByRole("radio");
    expect(input).toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("is disabled and blocks selecting", async () => {
    const user = userEvent.setup();
    render(<Radio name="x" value="a" label="Terkunci" disabled />);
    const input = screen.getByRole("radio");
    expect(input).toBeDisabled();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("shows error with alert role", () => {
    render(<Radio name="x" value="a" label="Opsi" error="Pilih salah satu" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pilih salah satu");
  });
});

describe("RadioGroup", () => {
  const options = ["Starter", "Pro", "Enterprise"];

  function renderGroup(
    props: Omit<ComponentProps<typeof RadioGroup>, "name" | "children"> = {}
  ) {
    const utils = render(
      <RadioGroup name="plan" label="Pilih paket" {...props}>
        {options.map((o) => (
          <Radio key={o} value={o} label={o} />
        ))}
      </RadioGroup>
    );
    const radios = options.map((o) => screen.getByRole("radio", { name: o }));
    return { utils, radios };
  }

  it("renders a radiogroup with label", () => {
    renderGroup();
    const group = screen.getByRole("radiogroup");
    const labelledby = group.getAttribute("aria-labelledby");
    expect(labelledby).not.toBeNull();
    expect(document.getElementById(labelledby as string)?.textContent).toContain(
      "Pilih paket"
    );
  });

  it("shares the group name across all radios", () => {
    renderGroup();
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toHaveAttribute("name", "plan");
    });
  });

  it("selects via group value (controlled)", () => {
    renderGroup({ value: "Pro" });
    const pro = screen.getByRole("radio", { name: "Pro" });
    const starter = screen.getByRole("radio", { name: "Starter" });
    expect(pro).toBeChecked();
    expect(starter).not.toBeChecked();
  });

  it("calls onChange with the selected radio value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ onChange });
    await user.click(screen.getByRole("radio", { name: "Enterprise" }));
    expect(onChange).toHaveBeenCalledWith("Enterprise");
  });

  it("supports uncontrolled with defaultValue", () => {
    renderGroup({ defaultValue: "Starter" });
    expect(screen.getByRole("radio", { name: "Starter" })).toBeChecked();
  });

  it("disables all radios when disabled", () => {
    renderGroup({ disabled: true });
    screen.getAllByRole("radio").forEach((r) => expect(r).toBeDisabled());
  });

  it("ignores disabled radios when selecting via controlled value", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup name="plan" value={undefined} defaultValue="Starter">
        <Radio value="Starter" label="Starter" />
        <Radio value="Locked" label="Locked" disabled />
      </RadioGroup>
    );
    const locked = screen.getByRole("radio", { name: "Locked" });
    expect(locked).toBeDisabled();
    await user.click(locked);
    expect(locked).not.toBeChecked();
  });

  it("applies horizontal orientation class", () => {
    renderGroup({ orientation: "horizontal" });
    expect(screen.getByRole("radiogroup").className).toContain(
      "options--horizontal"
    );
  });

  it("shows group error with alert role", () => {
    renderGroup({ error: "Wajib memilih paket" });
    expect(screen.getByRole("alert")).toHaveTextContent("Wajib memilih paket");
  });

  it("merges a custom className", () => {
    renderGroup({ className: "custom-cls" });
    expect(document.querySelector(".custom-cls")).not.toBeNull();
  });
});