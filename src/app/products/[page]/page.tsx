import { type ProductItemProps } from "@/components/UI/ProductItem/ProductItem";
import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";

export async function generateStaticParams() {
	const productsResponse = await fetch(`https://naszsklep-api.vercel.app/api/products?take=20`);
	const products = (await productsResponse.json()) as ProductItemProps[];
	const numOfPages = Math.ceil(products.length / 20);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function ProductsPage({ params }: { params: { page: string } }) {
	const productsResponse = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=20&offset=${params.page}`,
	);
	const products = (await productsResponse.json()) as ProductItemProps[];

	return <ProductsListTemplate products={products} />;
}
