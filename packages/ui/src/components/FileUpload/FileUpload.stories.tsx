import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { FileUpload } from "./FileUpload";
import type { FileUploadRejection } from "./FileUpload.types";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: "Lampiran",
    helperText: "Bisa lebih dari satu file.",
  },
};

export const SingleFile: Story = {
  args: {
    label: "Foto profil",
    multiple: false,
    accept: "image/*",
    hint: "PNG atau JPG, maksimal 2 MB",
    maxSize: 2 * 1024 * 1024,
  },
};

export const WithError: Story = {
  args: {
    label: "Dokumen",
    required: true,
    accept: ".pdf",
    error: "Unggah minimal satu dokumen.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Lampiran",
    disabled: true,
    defaultValue: [new File(["contoh"], "laporan.pdf", { type: "application/pdf" })],
  },
};

export const UploadStatus: Story = {
  args: {
    label: "Lampiran",
    defaultValue: [
      new File(["laporan"], "laporan.pdf", { type: "application/pdf" }),
      new File(["foto"], "foto.png", { type: "image/png" }),
      new File(["arsip"], "arsip.zip", { type: "application/zip" }),
    ],
    getFileStatus: (file) => {
      if (file.name === "laporan.pdf") return { status: "uploading", progress: 60 };
      if (file.name === "foto.png") return { status: "success" };
      return { status: "error", message: "Gagal: koneksi terputus" };
    },
  },
};

const ControlledExample = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<FileUploadRejection[]>([]);

  return (
    <div style={{ display: "grid", gap: 8, width: 360 }}>
      <FileUpload
        label="Bukti pembayaran (controlled)"
        accept="image/*,.pdf"
        maxSize={1024 * 1024}
        maxFiles={3}
        value={files}
        onChange={setFiles}
        onReject={setRejected}
        helperText={`${files.length} dari 3 file terpilih.`}
      />
      {rejected.length > 0 && (
        <span style={{ fontSize: 12, color: "var(--nemo-error-text, #a50e0e)" }}>
          {rejected.length} file ditolak (jenis, ukuran, atau jumlah melebihi batas).
        </span>
      )}
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: { controls: { disable: true } },
};
