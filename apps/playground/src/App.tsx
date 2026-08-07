import { colors, spacing, radius, shadows, typography } from "@nemo/ui";
import { Button } from "@nemo/ui";

function App() {
  console.log("colors", colors);
  console.log("spacing", spacing);
  console.log("radius", radius);
  console.log("shadows", shadows);
  console.log("typography", typography);

  return (
    <div
      style={{
        padding: spacing[6],
        borderRadius: radius.lg,
        boxShadow: shadows.md,
        backgroundColor: colors.primary[500],
      }}
    >
      <h1
        style={{
          fontSize: typography.h1.fontSize,
          lineHeight: typography.h1.lineHeight,
          fontWeight: typography.h1.fontWeight,
          color: colors.neutral[0],
        }}
      >
        Nemo UI Playground
      </h1>

      <p
        style={{
          fontSize: typography.body.fontSize,
          lineHeight: typography.body.lineHeight,
        }}
      >
        Foundation test berhasil 🎉
      </p>

      <>
        <Button>Default</Button>

        <Button variant="outlined">Outlined</Button>

        <Button variant="text">Text</Button>

        <Button size="sm">Small</Button>

        <Button size="lg">Large</Button>

        <Button disabled>Disabled</Button>
      </>
    </div>
  );
}

export default App;
