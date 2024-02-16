import { type ComponentPropsWithoutRef, type FC } from "react";
import NextImage from "next/image";
import { ShoppingBasket } from "lucide-react";
import { type ProductGetByIdQuery } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";

export interface SingleProductTemplateProps extends ComponentPropsWithoutRef<"section"> {
	product: ProductGetByIdQuery["product"];
}

export const SingleProductTemplate: FC<SingleProductTemplateProps> = (props) => {
	const { product } = props;

	if (!product) return null;

	return (
		<section className="py-4">
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

					<button className="btn btn-primary w-fit">
						<ShoppingBasket />
						Dodaj do koszyka
					</button>
				</div>
			</div>
		</section>
	);
};
