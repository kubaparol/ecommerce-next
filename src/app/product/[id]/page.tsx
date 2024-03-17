import { type Metadata } from "next";
import { revalidateTag } from "next/cache";
import { ProductGetByIdDocument } from "@/services/api/graphql/configs/graphql";
import { graphqlFetcher } from "@/services";
import { addProductToCart, getOrCreateCart } from "@/api/cart";
import { ProductTemplate } from "@/components/templates/ProductTemplate";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const { product } = await graphqlFetcher({
		query: ProductGetByIdDocument,
		variables: {
			id: params.id,
		},
	});

	return {
		title: product?.name || "",
		description: product?.description || "",
		openGraph: {
			title: product?.name || "",
			description: product?.description || "",
			// images: [
			// 	{
			// 		url: product.image,
			// 		width: 800,
			// 		height: 600,
			// 		alt: product.title,
			// 	},
			// ],
		},
	};
};

export default async function ProductPage({ params }: { params: { id: string } }) {
	const { product } = await graphqlFetcher({
		query: ProductGetByIdDocument,
		variables: {
			id: params.id,
		},
	});

	const addProductToCartHandler = async () => {
		"use server";

		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, params.id);

		revalidateTag("shopping-cart");
	};

	return <ProductTemplate product={product} onAddToCartClick={addProductToCartHandler} />;
}
