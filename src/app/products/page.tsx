import { type ProductItemProps } from "@/components/UI/ProductItem/ProductItem";
import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";

export default async function ProductsPage() {
	const productsResponse = await fetch("https://naszsklep-api.vercel.app/api/products?take=4");
	const products = (await productsResponse.json()) as ProductItemProps[];

	return <ProductsListTemplate products={products} />;
}
