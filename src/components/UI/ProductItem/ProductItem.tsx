import { type FC, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import { AspectRatio } from "@/components/base/aspect-ratio";

export interface ProductItemProps extends ComponentPropsWithoutRef<"div"> {
	id: string;
	imageUrl: string;
	name: string;
	price: string;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { imageUrl, name, price, className, ...rest } = props;

	return (
		<div {...rest} className={cn(className)}>
			<div className="w-[350px]">
				<AspectRatio ratio={16 / 9}>
					<Image
						src={imageUrl}
						alt={name}
						className="rounded-md object-cover"
						layout="fill"
						objectFit="cover"
					/>
				</AspectRatio>
			</div>

			<p>{price}</p>
			<h3>{name}</h3>
		</div>
	);
};
