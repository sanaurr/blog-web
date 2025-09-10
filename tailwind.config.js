/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//     },
//   },
//   plugins: [],
// };
// tailwind.config.js

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neuBase: "#e6ecf8", // background + base color
        neuText: "#4a5568", // text gray (dark slate)
      },
      boxShadow: {
        // Raised effect (card/button default)
        neu: "9px 9px 16px #c5c9d6, -9px -9px 16px #ffffff",

        // Inset effect (inputs/pressed button)
        neuInset: "inset 6px 6px 12px #c5c9d6, inset -6px -6px 12px #ffffff",

        // Stronger raised (for hover emphasis)
        neuLg: "12px 12px 24px #c5c9d6, -12px -12px 24px #ffffff",

        // Stronger inset (for active states)
        neuInsetLg: "inset 8px 8px 16px #c5c9d6, inset -8px -8px 16px #ffffff",
      },
    },
  },
  plugins: [],
};
