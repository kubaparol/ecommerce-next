import Link from "next/link";
import { ProjectUrls } from "@/const";

export default function HomePage() {
	return (
		<main className="grid place-items-center">
			<div className="grid gap-6">
				<Link href={ProjectUrls.products} className="btn btn-primary">
					Go to all products
				</Link>
			</div>
		</main>
	);
}
