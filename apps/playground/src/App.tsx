import {
  colors,
  spacing,
  radius,
  shadows,
  Button,
  Input,
  Textarea,
  Typography,
  ThemeProvider,
  useTheme,
} from "@nemo/ui";
import { useState } from "react";

function PlaygroundContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const { mode, setMode } = useTheme();

  return (
    <div
      style={{
        padding: spacing[6],
        borderRadius: radius.lg,
        boxShadow: shadows.md,
        backgroundColor: colors.neutral[50],
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing[4] }}>
        <div>
          <Typography variant="h1" color="neutral">
            Nemo UI Playground
          </Typography>
          <Typography variant="body" color="neutral">
            Contoh penggunaan semua komponen Nemo UI
          </Typography>
        </div>
        <Button
          variant="outlined"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* Button Section */}
      <section style={{ marginBottom: spacing[8] }}>
        <Typography variant="h3" color="neutral" style={{ marginBottom: spacing[3] }}>
          Button
        </Typography>
        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variasi default (filled)
        </Typography>
        <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap", marginBottom: spacing[4] }}>
          <Button>Primary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variant: outlined
        </Typography>
        <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap", marginBottom: spacing[4] }}>
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" color="success">Success</Button>
          <Button variant="outlined" color="warning">Warning</Button>
          <Button variant="outlined" color="error">Error</Button>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variant: text
        </Typography>
        <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap", marginBottom: spacing[4] }}>
          <Button variant="text">Primary</Button>
          <Button variant="text" color="success">Success</Button>
          <Button variant="text" color="warning">Warning</Button>
          <Button variant="text" color="error">Error</Button>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Ukuran (size)
        </Typography>
        <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap", marginBottom: spacing[4], alignItems: "center" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Disabled state
        </Typography>
        <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap" }}>
          <Button disabled>Disabled</Button>
          <Button variant="outlined" disabled>Outlined Disabled</Button>
          <Button variant="text" disabled>Text Disabled</Button>
        </div>
      </section>

      {/* Input Section */}
      <section style={{ marginBottom: spacing[8] }}>
        <Typography variant="h3" color="neutral" style={{ marginBottom: spacing[3] }}>
          Input
        </Typography>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variant: outlined (default)
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} helperText="Minimal 8 karakter" />
          <Input label="Search" placeholder="Search..." leftIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          } value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variant: filled
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Filled Email" placeholder="you@example.com" type="email" variant="filled" />
          <Input label="Filled Password" placeholder="Enter password" type="password" variant="filled" helperText="Minimal 8 karakter" />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Variant: ghost
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Ghost Email" placeholder="you@example.com" type="email" variant="ghost" />
          <Input label="Ghost Password" placeholder="Enter password" type="password" variant="ghost" helperText="Minimal 8 karakter" />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Status states
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Error state" placeholder="Error" error="Format tidak valid" />
          <Input label="Warning state" placeholder="Warning" warning="Perhatian: data tidak lengkap" />
          <Input label="Success state" placeholder="Success" success="Data valid" value="valid@email.com" />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Ukuran (size)
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Small" placeholder="Small size" size="sm" />
          <Input label="Medium" placeholder="Medium size" size="md" />
          <Input label="Large" placeholder="Large size" size="lg" />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          With right icon (actionable)
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input
            label="Password Toggle"
            type="password"
            placeholder="Enter password"
            rightIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Clearable input
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input
            label="Clearable"
            placeholder="Type and clear"
            clearable
            defaultValue="Try clearing me"
          />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Floating label
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Floating Label" placeholder=" " floatingLabel />
          <Input label="Email" placeholder=" " type="email" floatingLabel />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Prefix & Suffix
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="With Prefix" placeholder="000" prefix="$" />
          <Input label="With Suffix" placeholder="Search..." suffix={<span>@domain.com</span>} />
          <Input label="Both" placeholder="Amount" prefix="IDR" suffix=".00" />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Full width
        </Typography>
        <div style={{ maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Full Width Input" placeholder="Full width" fullWidth />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Disabled state
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Disabled Input" placeholder="Disabled" disabled />
          <Input label="Disabled with value" value="Cannot edit" disabled />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Required field indicator
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "400px", marginBottom: spacing[4] }}>
          <Input label="Required Field" placeholder="Required" required />
          <Input label="Optional Field" placeholder="Optional" />
        </div>
      </section>

      {/* Textarea Section */}
      <section style={{ marginBottom: spacing[8] }}>
        <Typography variant="h3" color="neutral" style={{ marginBottom: spacing[3] }}>
          Textarea
        </Typography>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Basic variants
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea label="Outlined (default)" placeholder="Enter your message..." rows={4} />
          <Textarea label="Filled" placeholder="Enter your message..." variant="filled" rows={4} />
          <Textarea label="Ghost" placeholder="Enter your message..." variant="ghost" rows={4} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          With character count
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea label="With max length" placeholder="Max 100 characters" maxLength={100} showCount rows={3} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Status states
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea label="Error" placeholder="Error state" error="Pesan terlalu pendek" rows={3} />
          <Textarea label="Warning" placeholder="Warning state" warning="Perhatian: karakter mendekati batas" rows={3} />
          <Textarea label="Success" placeholder="Success state" success="Pesan valid" rows={3} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Sizes
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea label="Small" placeholder="Small size" size="sm" rows={3} />
          <Textarea label="Medium" placeholder="Medium size" size="md" rows={3} />
          <Textarea label="Large" placeholder="Large size" size="lg" rows={3} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Clearable & floating label
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea label="Clearable" placeholder="Type and clear" clearable defaultValue="Try clearing me" rows={3} />
          <Textarea label="Floating Label" placeholder=" " floatingLabel rows={3} />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          With left icon
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px", marginBottom: spacing[4] }}>
          <Textarea
            label="With Icon"
            placeholder="Add a note..."
            leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
            rows={4}
          />
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Disabled & Readonly
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3], maxWidth: "500px" }}>
          <Textarea label="Disabled" placeholder="Disabled" disabled rows={3} />
          <Textarea label="Readonly" value="This is readonly content" readOnly rows={3} />
        </div>
      </section>

      {/* Typography Section */}
      <section style={{ marginBottom: spacing[8] }}>
        <Typography variant="h3" color="neutral" style={{ marginBottom: spacing[3] }}>
          Typography
        </Typography>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Heading variants
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[4] }}>
          <Typography variant="h1" color="neutral">Heading 1</Typography>
          <Typography variant="h2" color="neutral">Heading 2</Typography>
          <Typography variant="h3" color="neutral">Heading 3</Typography>
          <Typography variant="h4" color="neutral">Heading 4</Typography>
          <Typography variant="h5" color="neutral">Heading 5</Typography>
          <Typography variant="h6" color="neutral">Heading 6</Typography>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Body variants
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[4] }}>
          <Typography variant="body" color="neutral">Body text - Default</Typography>
          <Typography variant="body" color="primary">Body text - Primary color</Typography>
          <Typography variant="body" color="success">Body text - Success color</Typography>
          <Typography variant="body" color="warning">Body text - Warning color</Typography>
          <Typography variant="body" color="error">Body text - Error color</Typography>
          <Typography variant="body" color="info">Body text - Info color</Typography>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Other variants
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[4] }}>
          <Typography variant="caption" color="neutral">Caption text</Typography>
          <Typography variant="overline" color="neutral">Overline text</Typography>
          <Typography variant="button" color="neutral">Button text</Typography>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Alignment
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[4] }}>
          <Typography variant="body" color="neutral" align="left">Left aligned</Typography>
          <Typography variant="body" color="neutral" align="center">Center aligned</Typography>
          <Typography variant="body" color="neutral" align="right">Right aligned</Typography>
        </div>

        <Typography variant="body" color="neutral" style={{ marginBottom: spacing[3] }}>
          Semantic HTML elements (as prop)
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[4] }}>
          <Typography as="label" htmlFor="email" variant="body" color="neutral">
            Label element
          </Typography>
          <Typography as="span" variant="body" color="primary">
            Span element
          </Typography>
          <Typography as="p" variant="body" color="success">
            Paragraph element
          </Typography>
        </div>
      </section>

      {/* Combined Example */}
      <section>
        <Typography variant="h3" color="neutral" style={{ marginBottom: spacing[3] }}>
          Combined Form Example
        </Typography>
        <div style={{ backgroundColor: colors.neutral[50], padding: spacing[6], borderRadius: radius.lg, boxShadow: shadows.sm, maxWidth: "480px" }}>
          <Typography variant="h4" color="neutral" style={{ marginBottom: spacing[1] }}>
            Login
          </Typography>
          <Typography variant="body" color="neutral" style={{ marginBottom: spacing[5] }}>
            Masukkan kredensial Anda untuk melanjutkan
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[4], marginBottom: spacing[4] }}>
            <Input label="Email" type="email" placeholder="you@example.com" leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            } />
            <Input label="Password" type="password" placeholder="Enter password" leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            } rightIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            } helperText="Minimal 8 karakter" />
          </div>
          <Button style={{ width: "100%" }}>Masuk</Button>
          <Typography variant="caption" color="neutral" align="center" style={{ marginTop: spacing[3] }}>
            Belum punya akun? <a href="#" style={{ color: colors.primary[600] }}>Daftar di sini</a>
          </Typography>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PlaygroundContent />
    </ThemeProvider>
  );
}

export default App;