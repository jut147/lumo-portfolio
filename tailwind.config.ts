import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import shadcnPreset from "./src/lib/shadcn-preset"; // Import the preset

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  presets: [shadcnPreset], // Use the shadcn preset
  theme: {
    // Container settings are in the preset, remove if duplicating
    // extend is kept for custom fonts not in the preset
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...(defaultTheme.fontFamily?.['sans'] || [])],
        mono: ["var(--font-geist-mono)", ...(defaultTheme.fontFamily?.['mono'] || [])],
        display: ["var(--font-display)", ...(defaultTheme.fontFamily?.['sans'] || [])],
      },
      // Colors, borderRadius, keyframes, animation are now in the preset
    },
  },
  // Animate plugin is included in the preset, but can be listed here too
  plugins: [],
} satisfies Config;

export default config;
