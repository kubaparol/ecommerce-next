import { type PropsWithChildren, type FC } from "react";
import { Header } from "../shared/modules/globals/Header";
import { Footer } from "../shared/modules/globals/Footer";
import { graphqlFetcher } from "@/services";
import {
	CategoriesGetListDocument,
	CollectionsGetListDocument,
} from "@/services/api/graphql/configs/graphql";
import { getCartFromCookies } from "@/api/cart";

export interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout: FC<DefaultLayoutProps> = async (props) => {
	const { children } = props;

	const { categories } = await graphqlFetcher({ query: CategoriesGetListDocument });
	const { collections } = await graphqlFetcher({ query: CollectionsGetListDocument });
	const cart = await getCartFromCookies();

	return (
		<>
			<Header categories={categories} collections={collections} cart={cart} />
			<main className="wrapper flex min-h-[calc(100vh-64px-57px)] flex-col">{children}</main>
			<Footer />
		</>
	);
};
