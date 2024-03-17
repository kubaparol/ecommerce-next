import { type Route } from "next";

export const ProjectUrls = Object.freeze({
	home: "/",
	products: "/products",
	cart: "/cart",
	product: (id: string) => `/product/${id}` as Route,
	category: (slug: string) => `/category/${slug}` as Route,
	collection: (slug: string) => `/collection/${slug}` as Route,
	search: (search: string) => `/search?query=${search}` as Route,
});
