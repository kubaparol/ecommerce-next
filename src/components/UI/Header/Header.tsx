import { type FC } from "react";

import Link from "next/link";
import Brand from "../../../../public/vercel.svg";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/const";
import { useMenuLinks } from "@/hooks/use-menu-links";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
	const {} = props;

	const { menuLinks } = useMenuLinks();

	return (
		<header className="border-b border-b-slate-600 px-6 py-3">
			<div className="mx-auto flex max-w-[1400px] items-center justify-between">
				<Link href={ProjectUrls.Home} className="mr-4 w-full max-w-[100px] md:max-w-[140px]">
					<Brand />
				</Link>

				<nav>
					<ul className="flex gap-10">
						{menuLinks.map((link) => (
							<li key={link.href}>
								<ActiveLink href={link.href} label={link.label} exact />
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
