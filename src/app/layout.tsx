import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DefaultLayout } from "@/components/layouts/Default/DefaultLayout";

import "../styles/globals.css";
import { cn } from "@/utils";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pl">
			<body className={cn("flex min-h-screen flex-col", poppins.variable)}>
				<DefaultLayout>{children}</DefaultLayout>
			</body>
		</html>
	);
}
