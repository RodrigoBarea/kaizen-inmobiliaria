import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-surface": "#1a1c1c",
        "on-tertiary-fixed-variant": "#005236",
        "inverse-on-surface": "#f1f1f1",
        "tertiary-fixed-dim": "#4edea3",
        "background": "#f9f9f9",
        "on-primary-fixed": "#410000",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "on-secondary-fixed-variant": "#474746",
        "primary-fixed-dim": "#ffb4a8",
        "on-background": "#1a1c1c",
        "surface-variant": "#e2e2e2",
        "on-error-container": "#93000a",
        "outline-variant": "#e9bcb5",
        "surface-dim": "#dadada",
        "secondary-fixed": "#e5e2e1",
        "primary-fixed": "#ffdad4",
        "on-secondary-fixed": "#1c1b1b",
        "primary-container": "#e60000",
        "on-surface-variant": "#5f3f3a",
        "surface-bright": "#f9f9f9",
        "inverse-primary": "#ffb4a8",
        "surface-container-low": "#f3f3f3",
        "error-container": "#ffdad6",
        "on-primary-container": "#fff7f5",
        "outline": "#946e68",
        "on-secondary-container": "#636262",
        "primary": "#b70100",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#930100",
        "surface-container": "#eeeeee",
        "surface-container-highest": "#e2e2e2",
        "surface-tint": "#c00000",
        "tertiary-container": "#008259",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#e1ffec",
        "surface": "#f9f9f9",
        "on-primary": "#ffffff",
        "inverse-surface": "#2f3131",
        "secondary-container": "#e2dfde",
        "on-tertiary-fixed": "#002113",
        "tertiary": "#006645",
        "surface-container-high": "#e8e8e8",
        "error": "#ba1a1a",
        "secondary-fixed-dim": "#c8c6c5",
        "secondary": "#5f5e5e",
        "tertiary-fixed": "#6ffbbe"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        unit: "8px",
        gutter: "24px",
        "container-max": "1280px"
      },
      fontFamily: {
        "label-md": ["var(--font-open-sans)", "Open Sans", "sans-serif"],
        "headline-md": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "headline-sm": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        caption: ["var(--font-open-sans)", "Open Sans", "sans-serif"],
        "body-lg": ["var(--font-open-sans)", "Open Sans", "sans-serif"],
        "display-lg-mobile": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "display-lg": ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "body-md": ["var(--font-open-sans)", "Open Sans", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
