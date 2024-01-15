"use client";

import Link, { type LinkProps } from "next/link";
import { type FC } from "react";
import { usePathname } from "next/navigation";
import { type Route } from "next";
import { cn } from "@/utils";

interface ActiveLinkProps extends LinkProps<Route> {
	label: string;
	exact?: boolean;
}

export const ActiveLink: FC<ActiveLinkProps> = (props) => {
	const { label, exact, href } = props;

	const pathname = usePathname();

	const isActive = exact ? pathname === href : pathname.startsWith(href as string);

	return (
		<Link
			href={href}
			className={cn(
				isActive && "pointer-events-none z-50 !cursor-default bg-secondary hover:bg-secondary",
			)}
		>
			{label}
		</Link>
	);
};
