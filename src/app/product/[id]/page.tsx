import { type Metadata } from "next";
import { SingleProductTemplate } from "@/components/templates/SingleProduct/SingleProductTemplate";
import { ProductGetByIdDocument } from "@/services/api/graphql/configs/graphql";
import { graphqlFetcher } from "@/services";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const { product } = await graphqlFetcher(ProductGetByIdDocument, {
		id: params.id,
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
	const { product } = await graphqlFetcher(ProductGetByIdDocument, {
		id: params.id,
	});

	return <SingleProductTemplate product={product} />;
}
