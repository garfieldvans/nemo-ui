import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup } from "./Avatar";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "radio",
      options: ["circle", "square"],
    },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  args: {
    name: "Nemo UI",
  },
  render: (args) => (
    <Stack direction="row" spacing={3} align="center">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </Stack>
  ),
};

export const Colors: Story = {
  args: {
    name: "NU",
  },
  render: (args) => (
    <Stack direction="row" spacing={3}>
      <Avatar {...args} color="primary" />
      <Avatar {...args} color="success" />
      <Avatar {...args} color="warning" />
      <Avatar {...args} color="error" />
      <Avatar {...args} color="neutral" />
    </Stack>
  ),
};

const imageSrc =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop";

export const WithImage: Story = {
  args: {
    src: imageSrc,
    alt: "User profile",
  },
};

export const Square: Story = {
  args: {
    name: "Nemo UI",
    shape: "square",
    size: "lg",
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Andi Pratama" color="primary" />
      <Avatar name="Budi Santoso" color="success" />
      <Avatar name="Citra Dewi" color="warning" />
      <Avatar name="Dewi Lestari" color="error" />
      <Avatar name="Eko Prasetyo" color="neutral" />
    </AvatarGroup>
  ),
};