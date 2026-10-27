import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";

import { Input, Textarea } from "./Input";

describe("Input", () => {
  it("should render", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("should render with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeDefined();
  });

  it("should render with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeDefined();
  });

  it("should render with error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Invalid email")).toBeDefined();
  });

  it("should render with helper text", () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeDefined();
  });

  it("should handle user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here..." />);
    const input = screen.getByPlaceholderText("Type here...");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("should be disabled", async () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("transitions status from default to error to warning to success", () => {
    const { rerender } = render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("alert")).toBeNull();

    rerender(<Input label="Email" error="Format tidak valid" />);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Format tidak valid");
    expect(input.getAttribute("aria-errormessage")).toBeTruthy();

    rerender(<Input label="Email" warning="Perlu dicek" />);
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Perlu dicek");
    expect(input.getAttribute("aria-errormessage")).toBeNull();
    expect(input.getAttribute("aria-describedby")).toBeTruthy();

    rerender(<Input label="Email" success="Data valid" />);
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Data valid");
  });

  it("keeps helper text when error is cleared", () => {
    const { rerender } = render(<Input label="Email" error="Wajib diisi" helperText="Isi email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Wajib diisi");

    rerender(<Input label="Email" helperText="Isi email" />);
    // Span helper tetap memakai role="alert" (perilaku komponen saat ini);
    // yang penting pesan error hilang dan diganti helperText.
    expect(screen.queryByText("Wajib diisi")).toBeNull();
    expect(screen.getByRole("alert")).toHaveTextContent("Isi email");
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-invalid", "true");
  });

  it("reflects controlled value changes from the parent", () => {
    const { rerender } = render(<Input label="Email" value="awal" onChange={() => {}} />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveValue("awal");

    rerender(<Input label="Email" value="diperbarui" onChange={() => {}} />);
    expect(input).toHaveValue("diperbarui");
  });

  it("fires onChange when typing in a controlled input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Email" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Email"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("clears a controlled input via the clear button", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    let value = "isi awal";
    function Harness() {
      const [, force] = useState(0);
      return (
        <Input
          label="Cari"
          value={value}
          clearable
          onClear={() => {
            value = "";
            onClear();
            force((n) => n + 1);
          }}
          onChange={() => {}}
        />
      );
    }
    render(<Harness />);
    expect(screen.getByLabelText("Cari")).toHaveValue("isi awal");

    await user.click(screen.getByRole("button", { name: "Clear input" }));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Cari")).toHaveValue("");
    // Setelah value kosong, tombol clear hilang.
    expect(screen.queryByRole("button", { name: "Clear input" })).toBeNull();
  });

  it("does not show clear button when disabled or readonly", () => {
    const { rerender } = render(<Input value="isi" clearable onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Clear input" })).toBeDefined();

    rerender(<Input value="isi" clearable disabled onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: "Clear input" })).toBeNull();

    rerender(<Input value="isi" clearable readOnly onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: "Clear input" })).toBeNull();
  });

  it("forwards controlled value and onChange to Textarea", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Textarea label="Pesan" value="awal" onChange={onChange} />);
    const textarea = screen.getByLabelText("Pesan");
    expect(textarea).toHaveValue("awal");

    rerender(<Textarea label="Pesan" value="diperbarui" onChange={onChange} />);
    expect(textarea).toHaveValue("diperbarui");

    await user.type(textarea, "x");
    expect(onChange).toHaveBeenCalled();
  });
});