import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    color: {
      control: "select",
      options: ["default", "subtle"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px" }}>
        <p style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>Konten di atas</p>
        <Story />
        <p style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>Konten di bawah</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center", height: "80px", gap: "12px", padding: "24px" }}>
        <span style={{ fontFamily: "system-ui, sans-serif" }}>Kiri</span>
        <Story />
        <span style={{ fontFamily: "system-ui, sans-serif" }}>Kanan</span>
      </div>
    ),
  ],
};

export const Subtle: Story = {
  args: {
    orientation: "horizontal",
    color: "subtle",
  },
};