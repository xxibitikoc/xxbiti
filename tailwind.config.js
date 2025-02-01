const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      smoke: "#f5f6f7",
      harp: "#ebedf0",
      seashell: "#f0f2f5",
      facebook: "#1877f2",
      yellow: "#ffdf00",
      green: "#52B800",
      mercury: "#e5e7eb",
      citrine: "#e2c822",
      mimosa: "#fff9d7",
      dark: "#1d2129",
      neutral: {
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
      },
      lime: {
        600: "#65a30d",
      },
      grey: {
        light: "#dddfe2",
        ghost: "#ccd0d5",
      },
    },
  },
  plugins: [],
};

export default config;
