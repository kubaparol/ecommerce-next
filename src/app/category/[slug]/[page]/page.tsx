import { notFound } from "next/navigation";
import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";
import { DATA_PER_PAGE, ProjectUrls } from "@/constants";
import { graphqlFetcher } from "@/services";
import {
	ProductsCategoryGetQuantityDocument,
	ProductsGetByCategoryDocument,
	ProductsGetQuantityDocument,
} from "@/services/api/graphql/configs/graphql";
import { calculateNumOfPages, calculateSkip } from "@/utils";

export async function generateStaticParams() {
	const { productsConnection } = await graphqlFetcher({ query: ProductsGetQuantityDocument });
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function CategoryPage({ params }: { params: { page: string; slug: string } }) {
	const page = Number(params.page);
	const skip = calculateSkip(page, DATA_PER_PAGE);

	const { categories } = await graphqlFetcher({
		query: ProductsGetByCategoryDocument,
		variables: {
			slug: params.slug,
			first: DATA_PER_PAGE,
			skip,
		},
	});

	const { productsConnection } = await graphqlFetcher({
		query: ProductsCategoryGetQuantityDocument,
		variables: {
			slug: params.slug,
		},
	});
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);

	if (!categories[0]) {
		return notFound();
	}

	return (
		<ProductsListTemplate
			products={categories[0].products}
			numOfPages={numOfPages}
			page={page}
			baseUrl={ProjectUrls.category(params.slug)}
		/>
	);
}
