import { type FC } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/base/AspectRatio/AspectRatio";
import { Typography } from "@/components/base/Typography/Typography";
import { Card, CardContent, CardHeader } from "@/components/base/Card/Card";
import { ProductsGetListQuery } from "@/services/api/graphql/configs/graphql";

export interface ProductItemProps {
	product: ProductsGetListQuery["products"][number];
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { name, price, images } = product;

	return (
		<Card className="transition hover:scale-105 hover:shadow-xl">
			<CardHeader>
				<AspectRatio ratio={16 / 9}>
					<Image
						src={images[0]?.url || ""}
						alt={name}
						className="rounded-lg object-contain"
						fill
						sizes="100%"
					/>
				</AspectRatio>
			</CardHeader>

			<CardContent>
				<Typography as="h3" text={name} className="mb-2" styling="p-14" />
				<Typography as="p" text={price.toString()} styling="p-16" weight="medium" />
			</CardContent>
		</Card>
	);
};
