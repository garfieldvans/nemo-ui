import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outlined", "dot"],
    },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const colors = ["primary", "success", "warning", "error", "neutral"] as const;

function StoryRow({
  variant,
  label,
}: {
  variant: "filled" | "outlined" | "dot";
  label: string;
}) {
  return (
    <div>
      <p style={{ fontFamily: "system-ui, sans-serif", marginBottom: 8 }}>{label}</p>
      <Stack direction="row" spacing={2} wrap>
        {colors.map((c) => (
          <Badge key={c} color={c} variant={variant}>
            {variant === "dot" ? undefined : c}
          </Badge>
        ))}
      </Stack>
    </div>
  );
}

export const Filled: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <StoryRow variant="filled" label="Filled" />
      <StoryRow variant="outlined" label="Outlined" />
      <StoryRow variant="dot" label="Dot" />
    </Stack>
  ),
};

export const Colors: Story = {
  args: {
    children: "Badge",
  },
  render: (args) => (
    <Stack direction="row" spacing={2} wrap>
      {colors.map((c) => (
        <Badge key={c} {...args} color={c}>
          {c}
        </Badge>
      ))}
    </Stack>
  ),
};

export const SmSize: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const MdSize: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};