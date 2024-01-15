import { type Route } from "next";

export const ProjectUrls = Object.freeze({
	home: "/",
	products: "/products",
	product: "/product",
	category: (slug: string) => `/categories/${slug}` as Route,
});
