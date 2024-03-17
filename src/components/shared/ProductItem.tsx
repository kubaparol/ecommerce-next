import { type FC } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectUrls } from "@/constants";
import { type ProductListItemFragment } from "@/services/api/graphql/configs/graphql";

export interface ProductItemProps {
	product: ProductListItemFragment;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { id, name, price, images } = product;

	return (
		<div className="card h-full rounded-lg border border-gray-200 bg-white shadow-sm duration-300">
			<NextImage
				src={images[0]?.url || ""}
				alt={name}
				fill
				priority
				sizes="100%"
				className="object-contain py-3"
			/>

			<div className="px-4 pt-2">
				<h1 className="truncate text-xl font-bold text-gray-900">{name}</h1>
				<div className="line-clamp-2 text-sm text-gray-700">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ab accusantium cum a
					eligendi expedita dolorum culpa, hic aliquid in minus quibusdam dignissimos at vero
					nesciunt maiores neque recusandae doloremque?
				</div>
			</div>

			<div>
				<div className="flex-between">
					<p className="p-bold-24">{price}</p>

					<Link href={`${ProjectUrls.product}/${id}`} className="flex-center gap-2">
						Zobacz
						<ArrowRight />
					</Link>
				</div>
			</div>
		</div>
	);
};
