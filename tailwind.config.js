/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#fef9e7",
        card: "#FFFFFF",
        ink: "#1C1B18",
        "ink-soft": "#4A463D",
        "ink-faint": "#787262",
        line: "#E8E1CD",
        "line-strong": "#D6CEB5",
        oxblood: {
          DEFAULT: "#7A2E2A",
          dark: "#5E211E",
          light: "#9C4A44",
          tint: "#F5E7E4",
        },
        brass: {
          DEFAULT: "#B8892F",
          tint: "#F7EED9",
        },
        moss: {
          DEFAULT: "#4B5E45",
          tint: "#E9EDE3",
        },
        /* category identity colors from screenshots */
        notes: { DEFAULT: "#56793b", dark: "#43602d", light: "#6c934d", tint: "#edf4ea" },
        papers: { DEFAULT: "#f28a26", dark: "#d97316", light: "#f59e42", tint: "#fdf2e7" },
        extras: { DEFAULT: "#b6766a", dark: "#99594e", light: "#c78d82", tint: "#f8ebe8" },
        refs: { DEFAULT: "#48334d", dark: "#37253b", light: "#66496d", tint: "#f3edf5" },
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "'Iowan Old Style'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,27,24,0.04), 0 8px 24px -12px rgba(28,27,24,0.10)",
        lift: "0 4px 10px rgba(28,27,24,0.06), 0 20px 40px -18px rgba(28,27,24,0.18)",
        glow: "0 2px 8px -2px var(--tw-shadow-color), 0 16px 32px -18px var(--tw-shadow-color)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(28,27,24,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,24,0.05) 1px, transparent 1px)",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
