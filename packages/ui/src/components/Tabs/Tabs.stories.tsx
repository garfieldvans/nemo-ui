import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";
import type { TabsItem } from "./Tabs.types";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const items: TabsItem[] = [
  {
    value: "ringkasan",
    label: "Ringkasan",
    content: <p>Ringkasan project dan aktivitas terbaru.</p>,
  },
  {
    value: "anggota",
    label: "Anggota",
    content: <p>Daftar anggota tim beserta perannya.</p>,
  },
  {
    value: "arsip",
    label: "Arsip",
    disabled: true,
    content: <p>Project yang diarsipkan.</p>,
  },
  {
    value: "setelan",
    label: "Setelan",
    content: <p>Pengaturan project.</p>,
  },
];

export const Default: Story = {
  args: {
    items,
    defaultValue: "ringkasan",
    ariaLabel: "Info project",
  },
};

export const Pill: Story = {
  args: {
    items,
    defaultValue: "ringkasan",
    variant: "pill",
    ariaLabel: "Info project",
  },
};
