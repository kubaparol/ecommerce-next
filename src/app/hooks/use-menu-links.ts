import { useMemo } from "react";
import { type Route } from "next";
import { ProjectUrls } from "../const";

interface Link {
	label: string;
	href: Route;
}

export const useMenuLinks = () => {
	const menuLinks = useMemo<Link[]>(() => {
		return [
			{ label: "Home", href: ProjectUrls.Home },
			{ label: "All", href: ProjectUrls.Products },
		];
	}, []);

	return { menuLinks };
};
