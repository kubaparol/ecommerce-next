import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { type ReactNode } from "react";

import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Bird Store",
	description: "The best bird store in the world",
};

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="pl">
				<body className={poppins.variable}>
					<Providers>
						<DefaultLayout>{children}</DefaultLayout>
					</Providers>

					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
