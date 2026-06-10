import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lilac: "#eecef8",
        plum: "#342033",
        ink: "#171018",
        aubergine: "#251525",
        mulberry: "#6f3f68",
        ivory: "#fff9f1",
        porcelain: "#fffdf9",
        gold: "#b99655",
        champagne: "#f5dfab",
        sage: "#73816a",
        herb: "#43533a",
        rose: "#b36d7a"
      },
      fontFamily: {
        sans: ["var(--font-body)", "Nunito Sans", "Inter", "sans-serif"],
        serif: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"]
      },
      boxShadow: {
        petal: "0 22px 70px rgba(52, 32, 51, 0.13)",
        float: "0 18px 42px rgba(111, 63, 104, 0.16)"
      },
      backgroundImage: {
        paper:
          "linear-gradient(135deg, rgba(238, 206, 248, 0.24), rgba(255, 249, 241, 0) 34%), radial-gradient(circle at 80% 10%, rgba(185, 150, 85, 0.12), transparent 28%)",
        atelier:
          "radial-gradient(circle at 78% 18%, rgba(238, 206, 248, 0.22), transparent 30%), radial-gradient(circle at 8% 70%, rgba(185, 150, 85, 0.22), transparent 28%), linear-gradient(135deg, #171018, #2a172a 48%, #162015)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
