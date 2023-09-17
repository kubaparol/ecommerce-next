import { type FC } from "react";

import Link from "next/link";
import Brand from "../../../../public/vercel.svg";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/app/const";
import { useMenuLinks } from "@/app/hooks/use-menu-links";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
	const {} = props;

	const { menuLinks } = useMenuLinks();

	return (
		<header className="flex items-center justify-between border-b border-b-slate-600 px-6 py-3">
			<Link href={ProjectUrls.Home} className="w-full max-w-[100px] md:max-w-[140px]">
				<Brand />
			</Link>

			<nav>
				<ul className="flex gap-10">
					{menuLinks.map((link) => (
						<li key={link.href}>
							<ActiveLink href={link.href} label={link.label} />
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
