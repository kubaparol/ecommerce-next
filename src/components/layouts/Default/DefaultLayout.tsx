import { type PropsWithChildren, type FC } from "react";
import { Footer } from "@/components/UI/Footer/Footer";
import { Header } from "@/components/UI/Header/Header";
import { graphqlFetcher } from "@/services";
import { CategoriesGetListDocument } from "@/services/api/graphql/configs/graphql";

export interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout: FC<DefaultLayoutProps> = async (props) => {
	const { children } = props;

	const { categories } = await graphqlFetcher(CategoriesGetListDocument);

	return (
		<>
			<Header categories={categories} />
			<main className="min-h-[calc(100vh_-_311px)] bg-zinc-100 px-4 py-10">
				<div className="mx-auto max-w-[1400px]">{children}</div>
			</main>
			<Footer />
		</>
	);
};
