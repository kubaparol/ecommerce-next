"use client";

import { type FC } from "react";
import { usePathname } from "next/navigation";
import { Button, Link, type ButtonProps } from "@nextui-org/react";
import { cn } from "@/utils";

interface ActiveLinkProps extends ButtonProps {
	label: string;
	exact?: boolean;
}

export const ActiveLink: FC<ActiveLinkProps> = (props) => {
	const { label, exact, href, className, ...rest } = props;

	const pathname = usePathname();

	const isActive = exact ? pathname === href : pathname.startsWith(href as string);

	return (
		<Button
			{...rest}
			as={Link}
			href={href}
			variant={isActive ? "solid" : "light"}
			className={cn(className)}
		>
			{label}
		</Button>
	);
};
