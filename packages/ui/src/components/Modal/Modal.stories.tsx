import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import type { ModalProps } from "./Modal.types";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    open: false,
    title: "Konfirmasi",
    description: "Yakin melanjutkan aksi ini?",
    size: "md",
    closeOnOverlay: true,
    closeOnEsc: true,
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

function ModalDemo(props: Partial<ModalProps>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Buka modal</Button>
      <Modal open={open} onOpenChange={setOpen} {...props}>
        <p>
          Modal digunakan untuk konten yang butuh perhatian penuh pengguna: konfirmasi,
          formulir ringkas, atau detail task. Fokus terkunci di dalam, scroll halaman
          terkunci, dan Escape / klik backdrop menutup.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <ModalDemo size="sm" title="Size sm" description="max-width 400px">
        <p>Modal berukuran kecil untuk konfirmasi singkat.</p>
      </ModalDemo>
      <ModalDemo size="md" title="Size md" description="max-width 480px">
        <p>Modal default — pas untuk formulir ringkas.</p>
      </ModalDemo>
      <ModalDemo size="lg" title="Size lg" description="max-width 640px">
        <p>Modal lebar untuk konten yang lebih banyak.</p>
      </ModalDemo>
    </Stack>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      title="Hapus project?"
      footer={
        <>
          <Button variant="text" color="error">
            Tidak
          </Button>
          <Button color="error">Hapus</Button>
        </>
      }
    >
      <p>Aksi ini permanen dan tidak bisa dibatalkan.</p>
    </ModalDemo>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <ModalDemo>
      <p>Modal tanpa header — konten penuh sejak atas. Tutup via backdrop atau Escape.</p>
    </ModalDemo>
  ),
};