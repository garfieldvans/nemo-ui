import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    pageCount: 10,
    defaultPage: 4,
  },
};

export const ManyPages: Story = {
  args: {
    pageCount: 50,
    defaultPage: 25,
  },
};

export const Small: Story = {
  args: {
    pageCount: 5,
    defaultPage: 1,
    size: "sm",
  },
};
