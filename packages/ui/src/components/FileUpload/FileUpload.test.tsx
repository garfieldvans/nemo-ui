import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { FileUpload } from "./FileUpload";
import type { FileUploadProps } from "./FileUpload.types";

const makeFile = (name: string, size = 8, type = "text/plain") =>
  new File([new Uint8Array(size)], name, { type });

const renderUpload = (props: Partial<FileUploadProps> = {}) =>
  render(<FileUpload label="Lampiran" {...props} />);

const getInput = () => screen.getByLabelText("Lampiran") as HTMLInputElement;
const getZone = () => screen.getByRole("button", { name: /Tarik file/ });

describe("FileUpload", () => {
  it("lists the picked file with its size and reports it through onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderUpload({ onChange });

    await user.upload(getInput(), makeFile("laporan.pdf", 2048));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as File[]).map((f) => f.name)).toEqual(["laporan.pdf"]);
    expect(screen.getByText("laporan.pdf")).toBeDefined();
    expect(screen.getByText("2.0 KB")).toBeDefined();
  });

  it("removes a file from the list", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderUpload({ defaultValue: [makeFile("a.txt"), makeFile("b.txt")], onChange });

    await user.click(screen.getByRole("button", { name: "Hapus a.txt" }));

    expect((onChange.mock.calls[0][0] as File[]).map((f) => f.name)).toEqual(["b.txt"]);
    expect(screen.queryByText("a.txt")).toBeNull();
  });

  it("rejects files larger than maxSize", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onReject = vi.fn();
    renderUpload({ maxSize: 10, onChange, onReject });

    await user.upload(getInput(), makeFile("besar.bin", 50));

    expect(onChange).not.toHaveBeenCalled();
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onReject.mock.calls[0][0][0]).toMatchObject({ reason: "size" });
    expect(screen.queryByText("besar.bin")).toBeNull();
  });

  it("rejects dropped files that do not match accept", () => {
    const onReject = vi.fn();
    const onChange = vi.fn();
    renderUpload({ accept: ".pdf", onChange, onReject });

    fireEvent.drop(getZone(), {
      dataTransfer: { files: [new File(["x"], "foto.png", { type: "image/png" })] },
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(onReject.mock.calls[0][0][0]).toMatchObject({
      file: expect.objectContaining({ name: "foto.png" }),
      reason: "type",
    });
  });

  it("accepts dropped files matching accept and the size limit", () => {
    const onChange = vi.fn();
    renderUpload({ accept: "image/*", maxSize: 1024, onChange });

    fireEvent.drop(getZone(), {
      dataTransfer: { files: [new File(["x"], "foto.png", { type: "image/png" })] },
    });

    expect((onChange.mock.calls[0][0] as File[]).map((f) => f.name)).toEqual(["foto.png"]);
  });

  it("keeps only the latest file when multiple is false", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderUpload({ multiple: false, onChange });

    await user.upload(getInput(), makeFile("a.txt"));
    await user.upload(getInput(), makeFile("b.txt"));

    expect((onChange.mock.calls[1][0] as File[]).map((f) => f.name)).toEqual(["b.txt"]);
    expect(screen.queryByText("a.txt")).toBeNull();
  });

  it("enforces maxFiles and reports the extra files as rejected", async () => {
    const user = userEvent.setup();
    const onReject = vi.fn();
    const onChange = vi.fn();
    renderUpload({ maxFiles: 2, onChange, onReject });

    await user.upload(getInput(), [makeFile("a.txt"), makeFile("b.txt"), makeFile("c.txt")]);

    expect((onChange.mock.calls[0][0] as File[]).map((f) => f.name)).toEqual(["a.txt", "b.txt"]);
    expect(onReject.mock.calls[0][0][0]).toMatchObject({
      file: expect.objectContaining({ name: "c.txt" }),
      reason: "count",
    });
  });

  it("shows the error message and marks the zone invalid", () => {
    renderUpload({ required: true, error: "Unggah minimal satu file." });

    expect(getZone()).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert").textContent).toBe("Unggah minimal satu file.");
  });

  it("does not open the picker when disabled", async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");
    renderUpload({ disabled: true, defaultValue: [makeFile("a.txt")] });

    await user.click(getZone());

    expect(clickSpy).not.toHaveBeenCalled();
    expect(getZone()).toHaveAttribute("aria-disabled", "true");
    expect(getInput()).toBeDisabled();
    expect(screen.getByRole("button", { name: "Hapus a.txt" })).toBeDisabled();

    clickSpy.mockRestore();
  });
});
