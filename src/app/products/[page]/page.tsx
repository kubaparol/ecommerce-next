import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";
import { DATA_PER_PAGE } from "@/const";
import { graphqlFetcher } from "@/services";
import {
	ProductsGetListDocument,
	ProductsGetQuantityDocument,
} from "@/services/api/graphql/configs/graphql";
import { calculateNumOfPages, calculateSkip } from "@/utils";

export async function generateStaticParams() {
	const { productsConnection } = await graphqlFetcher(ProductsGetQuantityDocument);
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function ProductsPage({ params }: { params: { page: string } }) {
	const skip = calculateSkip(Number(params.page), DATA_PER_PAGE);

	const { products } = await graphqlFetcher(ProductsGetListDocument, {
		first: DATA_PER_PAGE,
		skip,
	});

	const { productsConnection } = await graphqlFetcher(ProductsGetQuantityDocument);
	const count = productsConnection.aggregate.count;
	const numOfPages = calculateNumOfPages(count, DATA_PER_PAGE);

	return <ProductsListTemplate products={products} numOfPages={numOfPages} />;
}
