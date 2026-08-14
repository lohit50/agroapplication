/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  './index.html',
	  './src/**/*.{js,ts,jsx,tsx}',  // Add paths to your source files
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
			Green1: '#8eab37',
		  },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  