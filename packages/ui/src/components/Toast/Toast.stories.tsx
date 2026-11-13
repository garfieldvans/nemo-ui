import type { Meta, StoryObj } from "@storybook/react";

import { ToastProvider } from "./ToastProvider";
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

function ToastButtons() {
  const toast = useToast();
  return (
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
  );
}

export const Default: Story = {
  render: (args) => (
    <ToastProvider placement={args.placement} maxToasts={args.maxToasts}>
      <ToastButtons />
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

export const CustomDuration: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ToastProvider>
      <DurationDemo />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
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

const placements = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

// Satu provider per posisi: tiap provider punya viewport sendiri, jadi toast
// benar-benar muncul di sudut yang dipilih (bukan satu viewport default).
export const Placements: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 12,
      }}
    >
      {placements.map((p) => (
        <ToastProvider key={p} placement={p}>
          <PlacementButton placement={p} />
        </ToastProvider>
      ))}
    </div>
  ),
};

function PlacementButton({ placement }: { placement: (typeof placements)[number] }) {
  const toast = useToast();
  return (
    <Button
      variant="outlined"
      size="sm"
      onClick={() =>
        toast.info(placement, {
          message: `Muncul di ${placement}`,
          duration: 2000,
        })
      }
    >
      {placement}
    </Button>
  );
}