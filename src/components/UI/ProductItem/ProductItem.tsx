import { type FC, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import { AspectRatio } from "@/components/base/AspectRatio/AspectRatio";
import { Typography } from "@/components/base/Typography/Typography";

export interface ProductItemProps extends ComponentPropsWithoutRef<"div"> {
	id: string;
	imageUrl: string;
	name: string;
	price: string;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { imageUrl, name, price, className, ...rest } = props;

	return (
		<div {...rest} className={cn("overflow-hidden rounded-lg border border-slate-400", className)}>
			<AspectRatio ratio={16 / 9}>
				<Image src={imageUrl} alt={name} className="object-cover" layout="fill" objectFit="cover" />
			</AspectRatio>

			<div className="p-4">
				<Typography as="h3" text={name} className="mb-2" styling="p-14" />
				<Typography as="p" text={price} styling="p-14" />
			</div>
		</div>
	);
};
