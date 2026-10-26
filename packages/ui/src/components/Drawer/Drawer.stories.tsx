import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import type { DrawerProps } from "./Drawer.types";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    title: { control: "text" },
  },
  args: {
    open: false,
    title: "Detail",
    placement: "right",
    size: "md",
    closeOnOverlay: true,
    closeOnEsc: true,
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

function DrawerDemo(props: Partial<DrawerProps>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Buka drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} {...props}>
        <p>
          Drawer menyajikan konten sekunder dari tepi layar — cocok untuk panel filter,
          detail task, atau aksi kontekstual tanpa meninggalkan halaman.
        </p>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
};

export const Placements: Story = {
  render: () => (
    <Stack spacing={4}>
      <DrawerDemo placement="right" title="Dari kanan" />
      <DrawerDemo placement="left" title="Dari kiri" />
      <DrawerDemo placement="top" title="Dari atas" size="sm" />
      <DrawerDemo placement="bottom" title="Dari bawah" size="sm" />
    </Stack>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <DrawerDemo
      title="Atur filter"
      footer={
        <>
          <Button variant="text">Reset</Button>
          <Button>Terapkan</Button>
        </>
      }
    >
      <p>Kombinasi header, body, dan footer aksi.</p>
    </DrawerDemo>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <DrawerDemo placement="bottom" size="sm">
      <p>Drawer tanpa header — tutup via backdrop atau Escape.</p>
    </DrawerDemo>
  ),
};