import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Menu } from "./Menu";
import { Button } from "../Button/Button";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
    },
    offset: { control: { type: "number", min: 0 } },
    defaultOpen: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  args: {
    placement: "bottom",
    offset: 8,
    defaultOpen: false,
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5l4 4L16 6.5" />
    </svg>
  );
}

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "64px 0" }}>
      <Menu
        {...args}
        trigger={<Button variant="outlined">Aksi</Button>}
        ariaLabel="Menu aksi"
      >
        <Menu.Item label="Ubah" icon={<CheckIcon />} />
        <Menu.Item label="Duplikat" />
        <Menu.Divider />
        <Menu.Item label="Hapus" disabled />
      </Menu>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: "96px 0" }}>
      <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
        <Menu trigger={<Button variant="outlined" size="sm">Top</Button>} placement="top" ariaLabel="Menu top">
          <Menu.Item label="Item A" />
          <Menu.Item label="Item B" />
        </Menu>
        <Menu trigger={<Button variant="outlined" size="sm">Right</Button>} placement="right" ariaLabel="Menu right">
          <Menu.Item label="Item A" />
          <Menu.Item label="Item B" />
        </Menu>
        <Menu trigger={<Button variant="outlined" size="sm">Bottom</Button>} placement="bottom" ariaLabel="Menu bottom">
          <Menu.Item label="Item A" />
          <Menu.Item label="Item B" />
        </Menu>
        <Menu trigger={<Button variant="outlined" size="sm">Left</Button>} placement="left" ariaLabel="Menu left">
          <Menu.Item label="Item A" />
          <Menu.Item label="Item B" />
        </Menu>
      </div>
    </div>
  ),
};

function WithSelectedItemDemo() {
  const [active, setActive] = useState("web");
  const views = [
    { value: "web", label: "Tampilan web" },
    { value: "list", label: "Tampilan daftar" },
    { value: "board", label: "Tampilan board" },
  ] as const;
  return (
    <Menu
      trigger={<Button variant="outlined">{views.find((v) => v.value === active)?.label}</Button>}
      ariaLabel="Pilih tampilan"
    >
      {views.map((v) => (
        <Menu.Item
          key={v.value}
          label={v.label}
          icon={v.value === active ? <CheckIcon /> : undefined}
          onSelect={() => {
            setActive(v.value);
          }}
        />
      ))}
    </Menu>
  );
}

export const WithSelectedItem: Story = {
  render: () => <WithSelectedItemDemo />,
};