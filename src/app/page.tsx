import Link from "next/link";
import { buttonVariants } from "@/components/base/Button/Button";

export default function Home() {
	return (
		<main className="h- grid place-items-center">
			<Link href="/products" className={buttonVariants({ variant: "default" })}>
				Go to products
			</Link>
		</main>
	);
}
