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

export const Sortable: Story = {
  args: {
    columns: [
      { key: "nama", header: "Nama", sortable: true },
      { key: "peran", header: "Peran", sortable: true },
      ...columns.slice(2),
    ],
    data,
    rowKey: (row: Member) => String(row.id),
    caption: "Klik header untuk mengurutkan",
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data,
    rowKey: (row: Member) => String(row.id),
    selectable: true,
    defaultSelectedKeys: ["1"],
    caption: "Pilih satu atau beberapa baris",
  },
};

export const StickyHeader: Story = {
  args: {
    columns,
    data: [...data, ...data.map((row) => ({ ...row, id: row.id + 10 }))],
    rowKey: (row: Member) => String(row.id),
    stickyHeader: true,
    maxHeight: 160,
    caption: "Header tetap terlihat saat digulir",
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
