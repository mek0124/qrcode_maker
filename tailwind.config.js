/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a0022',
        primary: '#8000aa',
        surface: '#330044',
        surface_glass: '#4a0066',
        surface_glass_hover: '#660088',
        text_primary: '#999999',
        text_secondary: '#242424',
        text_muted: '#DBDBDB',
        border_radius_small: '6px',
        border_radius_medium: '10px',
        border_radius_large: '12px'
      },
    },
  },
  plugins: [],
}

