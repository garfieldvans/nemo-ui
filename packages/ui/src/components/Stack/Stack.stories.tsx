import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "./Stack";
import { Divider } from "../Divider/Divider";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
    },
    spacing: {
      control: "number",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

function Box({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 24px",
        borderRadius: 8,
        background: "var(--nemo-primary-100, #E8F0FE)",
        color: "var(--nemo-primary-700, #1967D2)",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

export const Column: Story = {
  args: {
    direction: "column",
    spacing: 4,
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: {
    direction: "row",
    spacing: 3,
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const WithDivider: Story = {
  args: {
    direction: "column",
    spacing: 3,
    divider: <Divider />,
  },
  render: (args) => (
    <Stack {...args}>
      <span style={{ fontFamily: "system-ui, sans-serif" }}>Baris pertama</span>
      <span style={{ fontFamily: "system-ui, sans-serif" }}>Baris kedua</span>
      <span style={{ fontFamily: "system-ui, sans-serif" }}>Baris ketiga</span>
    </Stack>
  ),
};