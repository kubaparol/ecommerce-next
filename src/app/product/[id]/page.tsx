import { type Metadata } from "next";
import { type ProductItemProps } from "@/components/UI/ProductItem/ProductItem";
import { SingleProductTemplate } from "@/components/templates/SingleProduct/SingleProductTemplate";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products/" + params.id);
	const product = (await res.json()) as ProductItemProps;

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			title: product.title,
			description: product.description,
			images: [
				{
					url: product.image,
					width: 800,
					height: 600,
					alt: product.title,
				},
			],
		},
	};
};

export default async function ProductPage({ params }: { params: { id: string } }) {
	const productResponse = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.id}`);
	const product = (await productResponse.json()) as ProductItemProps;

	return <SingleProductTemplate product={product} />;
}
