import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormField } from "./FormField";
import { Input } from "../Input/Input";

describe("FormField", () => {
  it("renders a label bound to the control via htmlFor", () => {
    render(
      <FormField label="Nama" htmlFor="name">
        <Input id="name" placeholder="Nama Anda" />
      </FormField>
    );
    expect(screen.getByText("Nama")).toHaveAttribute("for", "name");
    expect(screen.getByLabelText("Nama")).toHaveProperty("placeholder", "Nama Anda");
  });

  it("renders the control children", () => {
    render(
      <FormField label="Nama">
        <Input placeholder="placeholder-ctx" />
      </FormField>
    );
    expect(screen.getByPlaceholderText("placeholder-ctx")).toBeDefined();
  });

  it("marks a required label with an asterisk", () => {
    render(<FormField label="Email" required><Input /></FormField>);
    const label = screen.getByText("Email");
    expect(label.innerHTML).toContain("*");
  });

  it("shows an error with alert role", () => {
    render(<FormField label="Email" error="Email tidak valid"><Input /></FormField>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Email tidak valid");
  });

  it("shows helper text", () => {
    render(<FormField label="Email" helperText="Dipakai untuk login"><Input /></FormField>);
    expect(screen.getByText("Dipakai untuk login")).toBeDefined();
  });

  it("does not render helper when error is present", () => {
    render(
      <FormField label="Email" error="Salah" helperText="Dipakai untuk login">
        <Input />
      </FormField>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Salah");
    expect(screen.queryByText("Dipakai untuk login")).toBeNull();
  });

  it("applies horizontal layout class", () => {
    render(<FormField label="Nama" layout="horizontal"><Input /></FormField>);
    const field = screen.getByText("Nama").closest("div");
    expect(field?.className).toContain("form-field--horizontal");
  });

  it("applies width class", () => {
    render(<FormField label="Nama" width="md"><div /></FormField>);
    const field = screen.getByText("Nama").closest("div");
    expect(field?.className).toContain("form-field--width-md");
  });

  it("merges a custom className", () => {
    render(<FormField label="Nama" className="custom-cls"><div /></FormField>);
    expect(document.querySelector(".custom-cls")).not.toBeNull();
  });
});