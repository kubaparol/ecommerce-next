import Link from "next/link";
import { type FC } from "react";
import { Bird } from "lucide-react";
import { ProjectUrls } from "@/const";

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
	const {} = props;

	return (
		<footer className="bg-base-200">
			<div className="footer text-base-content mx-auto max-w-[1400px] p-10">
				<aside className="border-red-408 flex h-full flex-col justify-center gap-6">
					<Link
						href={ProjectUrls.home}
						className="flex h-12 w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 px-4 duration-300"
					>
						<Bird />
						Logo
					</Link>

					<p>
						MyShop Industries Ltd.
						<br />
						Providing reliable tech since 1992
					</p>
				</aside>

				<nav>
					<header className="footer-title">Company</header>
					<Link href="/" className="link link-hover">
						About us
					</Link>
					<Link href="/" className="link link-hover">
						Contact
					</Link>
					<Link href="/" className="link link-hover">
						Jobs
					</Link>
					<Link href="/" className="link link-hover">
						Press kit
					</Link>
				</nav>

				<nav>
					<header className="footer-title">Legal</header>
					<Link href="/" className="link link-hover">
						Terms of use
					</Link>
					<Link href="/" className="link link-hover">
						Privacy policy
					</Link>
					<Link href="/" className="link link-hover">
						Cookie policy
					</Link>
				</nav>
			</div>
		</footer>
	);
};
