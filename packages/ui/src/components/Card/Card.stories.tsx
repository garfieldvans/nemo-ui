import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["elevated", "outlined", "filled"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: "Konten sederhana di dalam card.",
  },
};

export const WithSubComponents: Story = {
  render: () => (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader
        title="Pengaturan Akun"
        subtitle="Kelola informasi profil dan keamanan Anda"
        action={<Badge color="success">Aktif</Badge>}
      />
      <CardBody>
        Informasi akun Anda sudah diperbarui. Pastikan email tercantum benar agar
        notifikasi penting tetap sampai.
      </CardBody>
      <CardFooter>
        <Button size="sm">Simpan</Button>
        <Button size="sm" variant="text">
          Batal
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={4} wrap>
      <Card variant="elevated" style={{ width: 200 }}>
        Elevated
      </Card>
      <Card variant="outlined" style={{ width: 200 }}>
        Outlined
      </Card>
      <Card variant="filled" style={{ width: 200 }}>
        Filled
      </Card>
    </Stack>
  ),
};