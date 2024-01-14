import { type FC } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type ProductsGetListQuery } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";
import { ProjectUrls } from "@/const";

export interface ProductItemProps {
	product: ProductsGetListQuery["products"][number];
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { id, name, price, images } = product;

	return (
		<div className="card bg-base-100 h-full shadow-xl">
			<figure className="relative m-6 aspect-square">
				<NextImage
					src={images[0]?.url || ""}
					alt={name}
					layout="fill"
					objectFit="contain"
					priority
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
