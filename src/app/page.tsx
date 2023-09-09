import Link from "next/link";
import { buttonVariants } from "@/components/base/button";

export default function Home() {
	return (
		<main className="grid h-screen place-items-center bg-slate-400">
			<Link href="/products" className={buttonVariants({ variant: "default" })}>
				Go to products
			</Link>
		</main>
	);
}
