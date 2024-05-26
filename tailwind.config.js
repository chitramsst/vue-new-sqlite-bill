/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: { colors: {
      primary: {
        light: '#6D28D9',  // Your custom primary light color
        DEFAULT: "#334155", // Your custom primary color
        dark: '#1F2937',   // Your custom primary dark color
      },
      secondary: {
        light: '#A78BFA',  // Your custom secondary light color
        DEFAULT: '#8B5CF6', // Your custom secondary color
        dark: '#7C3AED',   // Your custom secondary dark color
      },
      border: {
        light: '#A78BFA',  // Your custom secondary light color
        DEFAULT: '#cbd5e1', // Your custom secondary color
        dark: '#7C3AED', 
      },
      sidebar: {
        light: '#A78BFA',  // Your custom secondary light color
        DEFAULT: '#0f172a', // Your custom secondary color
        dark: '#7C3AED', 
      }
      // Add more custom colors here
    },},
  },
  plugins: [],
}

