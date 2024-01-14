import { type FC } from "react";

import Link from "next/link";
import { Bird } from "lucide-react";
import { ProjectUrls } from "@/const";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
	const {} = props;

	// const { menuLinks } = useMenuLinks();

	return (
		<header className="bg-base-200 px-6 py-4">
			<div className="mx-auto flex max-w-[1400px] items-center justify-between">
				<Link
					href={ProjectUrls.home}
					className="flex h-12 w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 px-4 duration-300"
				>
					<Bird />
					Logo
				</Link>

				{/* <nav>
					<ul className="flex gap-10">
						{menuLinks.map((link) => (
							<li key={link.href}>
								<ActiveLink href={link.href} label={link.label} exact />
							</li>
						))}
					</ul>
				</nav> */}
			</div>
		</header>
	);
};
