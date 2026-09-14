import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Spinner color="primary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="error" />
      <Spinner color="neutral" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Spinner size="sm" label="Memuat" /> Memuat data…
    </span>
  ),
};