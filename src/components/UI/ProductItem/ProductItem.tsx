import { type FC } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/base/AspectRatio/AspectRatio";
import { Typography } from "@/components/base/Typography/Typography";
import { Card, CardContent, CardHeader } from "@/components/base/Card/Card";

export interface ProductItemProps {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	londDescription: string;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { title, price, image } = props;

	return (
		<Card className="transition hover:scale-105 hover:shadow-xl">
			<CardHeader>
				<AspectRatio ratio={16 / 9}>
					<Image src={image} alt={title} className="rounded-lg object-contain" fill sizes="100%" />
				</AspectRatio>
			</CardHeader>

			<CardContent>
				<Typography as="h3" text={title} className="mb-2" styling="p-14" />
				<Typography as="p" text={price.toString()} styling="p-16" weight="medium" />
			</CardContent>
		</Card>
	);
};
