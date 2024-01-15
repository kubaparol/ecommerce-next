import { type FC } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/utils";
import { ProjectUrls } from "@/const";
import { type ProductListItemFragment } from "@/services/api/graphql/configs/graphql";

export interface ProductItemProps {
	product: ProductListItemFragment;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { id, name, price, images } = product;

	return (
		<div className="card h-full bg-base-100 shadow-xl">
			<figure className="relative m-6 aspect-square">
				<NextImage
					src={images[0]?.url || ""}
					alt={name}
					fill
					priority
					sizes="100%"
					className="object-contain"
				/>
			</figure>

			<div className="card-body grid gap-8">
				<h2 className="card-title">{name}</h2>

				<div className="card-actions items-center justify-between">
					<p className="text-lg">{formatPrice(price)}</p>
					<Link href={`${ProjectUrls.product}/${id}`} className="btn btn-primary">
						Zobacz
						<ArrowRight />
					</Link>
				</div>
			</div>
		</div>
	);
};
