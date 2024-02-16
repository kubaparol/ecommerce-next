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

	const { categories } = await graphqlFetcher(CategoriesGetListDocument);

	const { collections } = await graphqlFetcher(CollectionsGetListDocument);

	return (
		<>
			<Header categories={categories} collections={collections} />
			<main>{children}</main>
			<Footer />
		</>
	);
};
