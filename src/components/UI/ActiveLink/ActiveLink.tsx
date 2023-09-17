"use client";

import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import { type FC } from "react";
import { usePathname } from "next/navigation";
import { type Route } from "next";

interface ActiveLinkProps extends LinkProps<Route> {
	label: string;
}

export const ActiveLink: FC<ActiveLinkProps> = (props) => {
	const { label, href } = props;

	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={clsx(
				"transition",
				!isActive && "hover:opacity-50",
				isActive && "cursor-default border-b-2 border-b-zinc-500",
			)}
		>
			{label}
		</Link>
	);
};
