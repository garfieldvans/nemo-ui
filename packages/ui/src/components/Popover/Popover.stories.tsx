import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Popover } from "./Popover";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
    },
    offset: { control: { type: "number", min: 0 } },
    defaultOpen: { control: "boolean" },
  },
  args: {
    placement: "bottom",
    offset: 8,
    defaultOpen: false,
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "64px 0" }}>
      <Popover
        {...args}
        trigger={<Button variant="outlined">Atur filter</Button>}
        ariaLabel="Panel filter"
      >
        <Stack spacing={2}>
          <p style={{ margin: 0, fontWeight: 600 }}>Filter daftar</p>
          <p style={{ margin: 0, color: "var(--nemo-neutral-600)" }}>
            Pilih kriteria untuk menyaring data.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button size="sm" variant="text">Reset</Button>
            <Button size="sm">Terapkan</Button>
          </div>
        </Stack>
      </Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: "96px 0" }}>
      <Stack direction="row" spacing={8} align="center">
        <Popover
          trigger={<Button variant="outlined" size="sm">Top</Button>}
          placement="top"
          ariaLabel="Popover top"
        >
          Panel atas.
        </Popover>
        <Popover
          trigger={<Button variant="outlined" size="sm">Right</Button>}
          placement="right"
          ariaLabel="Popover right"
        >
          Panel kanan.
        </Popover>
        <Popover
          trigger={<Button variant="outlined" size="sm">Bottom</Button>}
          placement="bottom"
          ariaLabel="Popover bottom"
        >
          Panel bawah.
        </Popover>
        <Popover
          trigger={<Button variant="outlined" size="sm">Left</Button>}
          placement="left"
          ariaLabel="Popover left"
        >
          Panel kiri.
        </Popover>
      </Stack>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => (
    <ControlledDemo />
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      trigger={<Button>Label (controlled)</Button>}
      open={open}
      onOpenChange={setOpen}
      ariaLabel="Popover controlled"
    >
      Klik di luar atau Escape untuk menutup.
    </Popover>
  );
}