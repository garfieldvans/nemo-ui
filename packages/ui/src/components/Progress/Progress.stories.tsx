import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
    variant: { control: "radio", options: ["line", "circle"] },
    value: {
      control: { type: "number", min: 0, max: 100 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 45 },
};

export const WithValueLabel: Story = {
  args: { value: 72, showValue: true },
};

export const Success: Story = {
  args: { value: 100, color: "success", showValue: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Progress value={60} size="sm" showValue />
      <Progress value={60} size="md" showValue />
      <Progress value={60} size="lg" showValue />
    </div>
  ),
};

export const Circle: Story = {
  args: { variant: "circle", value: 68, showValue: true },
};

export const CircleIndeterminate: Story = {
  args: { variant: "circle", indeterminate: true },
};

export const MultipleVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Progress value={82} showValue color="primary" />
      <Progress variant="circle" value={82} showValue color="success" />
    </div>
  ),
};