import { ProductsListTemplate } from "@/components/templates/ProductsListTemplate";
import { DATA_PER_PAGE, ProjectUrls } from "@/constants";
import { graphqlFetcher } from "@/services";
import {
	ProductsGetListDocument,
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

export default async function ProductsPage({ params }: { params: { page: string } }) {
	const page = Number(params.page);
	const skip = calculateSkip(page, DATA_PER_PAGE);

	const { products } = await graphqlFetcher({
		query: ProductsGetListDocument,
		variables: {
			first: DATA_PER_PAGE,
			skip,
		},
		next: {
			revalidate: 15,
		},
	});

	const { productsConnection } = await graphqlFetcher({ query: ProductsGetQuantityDocument });
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);

	return (
		<ProductsListTemplate
			products={products}
			numOfPages={numOfPages}
			page={page}
			baseUrl={ProjectUrls.products}
		/>
	);
}
