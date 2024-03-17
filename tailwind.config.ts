import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-poppins)"],
			},
		},
	},
	darkMode: ["class"],
	plugins: [nextui()],
} satisfies Config;
