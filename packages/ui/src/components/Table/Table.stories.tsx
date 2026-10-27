import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";
import type { TableColumn } from "./Table.types";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table<Member>>;

interface Member {
  id: number;
  nama: string;
  peran: string;
  status: string;
}

const data: Member[] = [
  { id: 1, nama: "Andi Pratama", peran: "Admin", status: "Aktif" },
  { id: 2, nama: "Budi Santoso", peran: "Editor", status: "Aktif" },
  { id: 3, nama: "Citra Dewi", peran: "Viewer", status: "Nonaktif" },
];

const columns: TableColumn<Member>[] = [
  { key: "nama", header: "Nama" },
  { key: "peran", header: "Peran" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => <span>{row.status}</span>,
  },
];

export const Default: Story = {
  args: {
    columns,
    data,
    rowKey: (row: Member) => String(row.id),
    caption: "Daftar anggota tim",
  },
};

export const Striped: Story = {
  args: {
    columns,
    data,
    rowKey: (row: Member) => String(row.id),
    striped: true,
    size: "sm",
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    rowKey: () => "",
    emptyText: "Belum ada anggota",
  },
};
