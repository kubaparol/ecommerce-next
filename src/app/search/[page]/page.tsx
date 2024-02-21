import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";
import { DATA_PER_PAGE, ProjectUrls } from "@/constants";
import { graphqlFetcher } from "@/services";
import {
	ProductsGetBySearchDocument,
	ProductsSearchGetQuantityDocument,
} from "@/services/api/graphql/configs/graphql";
import { calculateNumOfPages, calculateSkip } from "@/utils";

export default async function SearchResultPage({
	params,
	searchParams,
}: {
	params: { page: string };
	searchParams: { query: string };
}) {
	const page = Number(params.page);
	const skip = calculateSkip(page, DATA_PER_PAGE);
	const search = searchParams.query || "";

	const { products } = await graphqlFetcher({
		query: ProductsGetBySearchDocument,
		variables: {
			first: DATA_PER_PAGE,
			skip,
			search,
		},
	});

	const { productsConnection } = await graphqlFetcher({
		query: ProductsSearchGetQuantityDocument,
		variables: {
			search,
		},
	});
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);

	return (
		<ProductsListTemplate
			products={products}
			numOfPages={numOfPages}
			page={0}
			baseUrl={ProjectUrls.products}
		/>
	);
}
