import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circle", "rect"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
    },
    lines: { control: { type: "number", min: 1, max: 6 } },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const MultipleLines: Story = {
  args: {
    variant: "text",
    lines: 3,
  },
};

export const Rectangle: Story = {
  args: {
    variant: "rect",
    width: 320,
    height: 80,
  },
};

export const Circle: Story = {
  args: {
    variant: "circle",
    width: 48,
    height: 48,
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: "rect",
    animation: "wave",
    width: 320,
    height: 80,
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, maxWidth: 340 }}>
      <Skeleton variant="circle" width={48} height={48} animation="wave" />
      <div style={{ flex: 1 }}>
        <Skeleton lines={3} animation="wave" />
      </div>
    </div>
  ),
};