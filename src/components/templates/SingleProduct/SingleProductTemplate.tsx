import { type ComponentPropsWithoutRef, type FC } from "react";
import Image from "next/image";
import { Typography } from "@/components/base/Typography/Typography";
import { Button } from "@/components/base/Button/Button";
import { type ProductGetByIdQuery } from "@/services/api/graphql/configs/graphql";

export interface SingleProductTemplateProps extends ComponentPropsWithoutRef<"section"> {
	product: ProductGetByIdQuery["product"];
}

export const SingleProductTemplate: FC<SingleProductTemplateProps> = (props) => {
	const { product } = props;

	if (!product) return null;

	return (
		<section className="py-4">
			<header>
				<Typography as="h1" styling="h-24" weight="medium" text={product.name} />
				{/* <Typography as="h2" styling="p-16" text={product.category} /> */}
			</header>

			<div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-2">
				<div className="relative aspect-video md:max-w-xl">
					<Image
						src={product.images[0]?.url || ""}
						alt={product.name}
						className="rounded-lg object-contain"
						fill
						sizes="100%"
					/>
				</div>

				<div className="grid grid-rows-3 justify-between gap-8">
					<Typography as="p" styling="p-16" text={product.description} />

					<Typography as="p" styling="h-24" text={product.price.toString()} />

					<Button disabled className="w-fit">
						Dodaj do koszyka
					</Button>
				</div>
			</div>
		</section>
	);
};
