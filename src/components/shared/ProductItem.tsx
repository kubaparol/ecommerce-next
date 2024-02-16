import { type FC } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatPrice } from "@/utils";
import { ProjectUrls } from "@/constants";
import { type ProductListItemFragment } from "@/services/api/graphql/configs/graphql";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export interface ProductItemProps {
	product: ProductListItemFragment;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { id, name, price, images } = product;

	return (
		<Card className="card h-full rounded-lg border border-gray-200 bg-white shadow-sm duration-300">
			<AspectRatio ratio={16 / 9}>
				<NextImage
					src={images[0]?.url || ""}
					alt={name}
					fill
					priority
					sizes="100%"
					className="object-contain py-3"
				/>
			</AspectRatio>

			<CardHeader className="px-4 pt-2">
				<CardTitle className="truncate text-xl font-bold text-gray-900">{name}</CardTitle>
				<CardDescription className="line-clamp-2 text-sm text-gray-700">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ab accusantium cum a
					eligendi expedita dolorum culpa, hic aliquid in minus quibusdam dignissimos at vero
					nesciunt maiores neque recusandae doloremque?
				</CardDescription>
			</CardHeader>

			<CardContent>
				<CardFooter className="flex-between">
					<p className="p-bold-24">{formatPrice(price)}</p>

					<Button asChild>
						<Link href={`${ProjectUrls.product}/${id}`} className="flex-center gap-2">
							Zobacz
							<ArrowRight />
						</Link>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	);
};
