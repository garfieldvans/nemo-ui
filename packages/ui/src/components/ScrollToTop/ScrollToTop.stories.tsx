import type { Meta, StoryObj } from "@storybook/react";

import { ScrollToTop } from "./ScrollToTop";

const meta: Meta<typeof ScrollToTop> = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  parameters: { controls: { disable: true } },
};

export default meta;

type Story = StoryObj<typeof ScrollToTop>;

function TallContent() {
  return (
    <div style={{ display: "grid", gap: 12, padding: 24 }}>
      {Array.from({ length: 30 }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          Baris {index + 1} — gulir halaman untuk melihat tombol kembali ke atas muncul.
        </p>
      ))}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <>
      <TallContent />
      <ScrollToTop threshold={200} />
    </>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <>
      <TallContent />
      <ScrollToTop threshold={200} showLabel position="bottom-left" />
    </>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <>
      <TallContent />
      <ScrollToTop threshold={200} size="lg" position="bottom-center" />
    </>
  ),
};
