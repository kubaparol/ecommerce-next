import { useMemo } from "react";
import { type Route } from "next";
import { ProjectUrls } from "../constants";

interface Link {
	label: string;
	href: Route;
}

export const useMenuLinks = () => {
	const menuLinks = useMemo<Link[]>(() => {
		return [
			{ label: "Home", href: ProjectUrls.home },
			{ label: "All", href: ProjectUrls.products },
		];
	}, []);

	return { menuLinks };
};
