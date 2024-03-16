import { type Route } from "next";

export const ProjectUrls = Object.freeze({
	home: "/",
	products: "/products",
	product: "/product",
	cart: "/cart",
	category: (slug: string) => `/category/${slug}` as Route,
	collection: (slug: string) => `/collection/${slug}` as Route,
	search: (search: string) => `/search?query=${search}` as Route,
});
