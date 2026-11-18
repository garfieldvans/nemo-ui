// vitest-axe 0.1 hanya menambah namespace `Vi` (gaya Vitest lama), jadi matcher
// perlu dideklarasikan ulang untuk modul `vitest` versi sekarang.
import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
