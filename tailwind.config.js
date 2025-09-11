// /** @type {import('tailwindcss').Config} */


// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         neuBase: "#e6ecf8", // background + base color
//         neuText: "#4a5568", // text gray (dark slate)
//       },
//       boxShadow: {
//         // Raised effect (card/button default)
//         neu: "9px 9px 16px #c5c9d6, -9px -9px 16px #ffffff",

//         // Inset effect (inputs/pressed button)
//         neuInset: "inset 6px 6px 12px #c5c9d6, inset -6px -6px 12px #ffffff",

//         // Stronger raised (for hover emphasis)
//         neuLg: "12px 12px 24px #c5c9d6, -12px -12px 24px #ffffff",

//         // Stronger inset (for active states)
//         neuInsetLg: "inset 8px 8px 16px #c5c9d6, inset -8px -8px 16px #ffffff",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // 🔹 Enable class-based dark mode
  // theme: {
  //   extend: {
  //     colors: {
  //       // Light mode (existing)
  //       neuBase: "#e6ecf8", // background + base color
  //       neuText: "#4a5568", // text gray (dark slate)

  //       // Dark mode (metallic charcoal)
  //       neuBaseDark: "#1C1C1C", // charcoal black background
  //       neuTextDark: "#E0E0E0", // light gray text
  //     },
  //     boxShadow: {
  //       // Light mode
  //       neu: "9px 9px 16px #c5c9d6, -9px -9px 16px #ffffff",
  //       neuInset: "inset 6px 6px 12px #c5c9d6, inset -6px -6px 12px #ffffff",
  //       neuLg: "12px 12px 24px #c5c9d6, -12px -12px 24px #ffffff",
  //       neuInsetLg: "inset 8px 8px 16px #c5c9d6, inset -8px -8px 16px #ffffff",

  //       // Dark mode (metallic black)
  //       neuDark: "10px 10px 20px #181818, -10px -10px 20px #444444",
  //       neuInsetDark:
  //         "inset 6px 6px 12px #373C40, inset -6px -6px 12px #2e2e2e",
  //       neuLgDark: "12px 12px 24px #0d0d0d, -12px -12px 24px #2e2e2e",
  //       neuInsetLgDark:
  //         "inset 8px 8px 16px #0d0d0d, inset -8px -8px 16px #2e2e2e",
  //     },
  //   },
  // },

  theme: {
    extend: {
      colors: {
        // Light mode (existing)
        neuBase: "#e6ecf8", // background + base color
        neuText: "#4a5568", // text gray (dark slate)

        // Dark mode (metallic charcoal) - Adjusted for a better metallic feel
        neuBaseDark: "#333333", // softer charcoal background
        neuTextDark: "#E0E0E0", // light gray text
      },
      boxShadow: {
        // Light mode
        neu: "9px 9px 16px #c5c9d6, -9px -9px 16px #ffffff",
        neuInset: "inset 6px 6px 12px #c5c9d6, inset -6px -6px 12px #ffffff",
        neuLg: "12px 12px 24px #c5c9d6, -12px -12px 24px #ffffff",
        neuInsetLg: "inset 8px 8px 16px #c5c9d6, inset -8px -8px 16px #ffffff",

        // Dark mode (metallic black) - Adjusted for the new charcoal base
        neuDark: "10px 10px 20px #2A2A2A, -10px -10px 20px #404040",
        neuInsetDark:
          "inset 6px 6px 12px #2A2A2A, inset -6px -6px 12px #404040",
        neuLgDark: "12px 12px 24px #2A2A2A, -12px -12px 24px #404040",
        neuInsetLgDark:
          "inset 8px 8px 16px #2A2A2A, inset -8px -8px 16px #404040",
      },
    },
  },
  plugins: [],
};
