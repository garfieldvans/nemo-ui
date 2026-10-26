import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
    },
    openDelay: { control: { type: "number", min: 0 } },
    closeDelay: { control: { type: "number", min: 0 } },
    disabled: { control: "boolean" },
    content: { control: "text" },
  },
  args: {
    placement: "top",
    openDelay: 100,
    closeDelay: 50,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "48px 0", display: "inline-block" }}>
      <Tooltip {...args} content="Hover atau fokus untuk info">
        <Button>Simpan</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: "80px 0" }}>
      <Stack direction="row" spacing={8} align="center">
        <Tooltip content="Di atas" placement="top" openDelay={0} closeDelay={0}>
          <Button variant="outlined" size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Di kanan" placement="right" openDelay={0} closeDelay={0}>
          <Button variant="outlined" size="sm">Right</Button>
        </Tooltip>
        <Tooltip content="Di bawah" placement="bottom" openDelay={0} closeDelay={0}>
          <Button variant="outlined" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Di kiri" placement="left" openDelay={0} closeDelay={0}>
          <Button variant="outlined" size="sm">Left</Button>
        </Tooltip>
      </Stack>
    </div>
  ),
};

export const InlineText: Story = {
  render: () => (
    <p style={{ maxWidth: 420 }}>
      Klaim file{" "}
      <Tooltip content="Format .pdf, maks 10 MB" placement="bottom" openDelay={0}>
        <u style={{ cursor: "help" }}>disini</u>
      </Tooltip>{" "}
      untuk mengunggah dokumen pendukung.
    </p>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip content="Tidak muncul" disabled>
      <Button variant="outlined">Tooltip nonaktif</Button>
    </Tooltip>
  ),
};