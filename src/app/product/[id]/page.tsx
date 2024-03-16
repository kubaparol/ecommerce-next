import { type Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { ProductGetByIdDocument } from "@/services/api/graphql/configs/graphql";
import { graphqlFetcher } from "@/services";
import { formatPrice } from "@/utils";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { addProductToCart, getOrCreateCart } from "@/api/cart";

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

	if (!product) notFound();

	async function addProductToCartAction() {
		"use server";

		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, params.id);

		revalidateTag("shopping-cart");
	}

	return (
		<section className="wrapper py-4">
			<header className="border-b pb-4">
				<h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
			</header>

			<div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-2">
				<div className="relative aspect-video md:max-w-xl">
					<NextImage
						src={product.images[0]?.url || ""}
						alt={product.name}
						className="rounded-lg object-contain"
						fill
						sizes="100%"
					/>
				</div>

				<div className="grid gap-8">
					<p className="text-gray-600">{product.description}</p>
					<p className="text-lg font-semibold">{formatPrice(product.price)}</p>

					<form action={addProductToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
		</section>
	);
}
