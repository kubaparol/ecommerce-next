import { type FC } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/base/AspectRatio/AspectRatio";
import { Typography } from "@/components/base/Typography/Typography";
import { Card, CardContent, CardHeader } from "@/components/base/Card/Card";

export interface ProductItemProps {
	id: string;
	imageUrl: string;
	name: string;
	price: string;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { imageUrl, name, price } = props;

	return (
		<Card>
			<CardHeader>
				<AspectRatio ratio={16 / 9}>
					<Image
						src={imageUrl}
						alt={name}
						className="rounded-lg object-cover"
						layout="fill"
						objectFit="cover"
					/>
				</AspectRatio>
			</CardHeader>

			<CardContent>
				<Typography as="h3" text={name} className="mb-2" styling="p-14" />
				<Typography as="p" text={price} styling="p-16" weight="medium" />
			</CardContent>
		</Card>
	);
};
