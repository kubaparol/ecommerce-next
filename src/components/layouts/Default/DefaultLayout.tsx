import { type PropsWithChildren, type FC } from "react";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { graphqlFetcher } from "@/services";
import {
	CategoriesGetListDocument,
	CollectionsGetListDocument,
} from "@/services/api/graphql/configs/graphql";

export interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout: FC<DefaultLayoutProps> = async (props) => {
	const { children } = props;

	const { categories } = await graphqlFetcher({ query: CategoriesGetListDocument });

	const { collections } = await graphqlFetcher({ query: CollectionsGetListDocument });

	return (
		<>
			<Header categories={categories} collections={collections} />
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
};
