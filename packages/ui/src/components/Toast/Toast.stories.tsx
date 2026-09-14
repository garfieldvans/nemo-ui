import type { Meta, StoryObj } from "@storybook/react";

import { ToastProvider } from "./ToastProvider";
import type { ToastProviderProps } from "./Toast.types";
import { useToast } from "./useToast";
import { Button } from "../Button/Button";

const meta: Meta<typeof ToastProvider> = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "top-center",
        "bottom-right",
        "bottom-left",
        "bottom-center",
      ],
    },
    maxToasts: { control: { type: "number", min: 1, max: 10 } },
  },
  args: {
    placement: "top-right",
    maxToasts: 5,
  },
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

function ToastDemo({ placement }: { placement?: ToastProviderProps["placement"] }) {
  const toast = useToast();
  return (
    <ToastProvider placement={placement}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button color="success" onClick={() => toast.success("Tersimpan!", { message: "Perubahan sudah disimpan." })}>
          Success
        </Button>
        <Button color="error" onClick={() => toast.error("Gagal", { message: "Coba lagi beberapa saat.", duration: 6000 })}>
          Error
        </Button>
        <Button color="warning" onClick={() => toast.warning("Hampir penuh", { message: "Bersihkan penyimpanan." })}>
          Warning
        </Button>
        <Button variant="outlined" onClick={() => toast.info("Info", { message: "Tersedia pembaruan baru." })}>
          Info
        </Button>
        <Button variant="text" onClick={() => toast.dismissAll()}>
          Dismiss all
        </Button>
      </div>
    </ToastProvider>
  );
}

export const Default: Story = {
  render: (args) => <ToastDemo placement={args.placement} />,
};

export const CustomDuration: Story = {
  render: () => (
    <ToastProvider>
      <DurationDemo />
    </ToastProvider>
  ),
};

function DurationDemo() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.info("Umur pendek", { message: "Hilang setelah 1 detik.", duration: 1000 })
      }
    >
      Toast 1 detik
    </Button>
  );
}

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <ActionDemo />
    </ToastProvider>
  ),
};

function ActionDemo() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.error("Unggahan gagal", {
          message: "File terlalu besar.",
          action: (
            <Button size="sm" color="error" variant="outlined">
              Coba lagi
            </Button>
          ),
          duration: 0,
        })
      }
    >
      Toast dengan aksi
    </Button>
  );
}

export const Placements: Story = {
  render: () => (
    <ToastProvider>
      <PlacementGrid />
    </ToastProvider>
  ),
};

function PlacementGrid() {
  const toast = useToast();
  const placements = [
    "top-right",
    "top-left",
    "top-center",
    "bottom-right",
    "bottom-left",
    "bottom-center",
  ] as const;
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {placements.map((p) => (
        <Button
          key={p}
          variant="outlined"
          size="sm"
          onClick={() => toast.info(p, { message: `Muncul di ${p}` })}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}