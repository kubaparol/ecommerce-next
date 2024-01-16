import { notFound } from "next/navigation";
import { DATA_PER_PAGE, ProjectUrls } from "@/const";
import { graphqlFetcher } from "@/services";
import {
	CollectionGetBySlugDocument,
	ProductsCollectionGetQuantityDocument,
	ProductsGetQuantityDocument,
} from "@/services/api/graphql/configs/graphql";
import { calculateNumOfPages, calculateSkip } from "@/utils";
import { CollectionTemplate } from "@/components/templates/Collection/CollectionTemplate";

export async function generateStaticParams() {
	const { productsConnection } = await graphqlFetcher(ProductsGetQuantityDocument);
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function CategoryPage({ params }: { params: { page: string; slug: string } }) {
	const page = Number(params.page);
	const skip = calculateSkip(page, DATA_PER_PAGE);

	const { collections } = await graphqlFetcher(CollectionGetBySlugDocument, {
		slug: params.slug,
		first: DATA_PER_PAGE,
		skip,
	});

	const { productsConnection } = await graphqlFetcher(ProductsCollectionGetQuantityDocument, {
		slug: params.slug,
	});
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);

	if (!collections[0]) {
		return notFound();
	}

	return (
		<CollectionTemplate
			collection={collections[0]}
			numOfPages={numOfPages}
			page={page}
			baseUrl={ProjectUrls.category(params.slug)}
		/>
	);
}
