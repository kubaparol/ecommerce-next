import { type ComponentPropsWithoutRef, type FC } from "react";
import { notFound } from "next/navigation";
import { Card, Chip, Divider, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { Breadcrumbs } from "../shared/Breadcrumbs";
import { ProductDetails } from "../shared/ProductDetails";
import { type ProductGetByIdQuery } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";

export interface ProductTemplateProps extends ComponentPropsWithoutRef<"section"> {
	product: ProductGetByIdQuery["product"];
	onAddToCartClick: () => void;
}

export const ProductTemplate: FC<ProductTemplateProps> = (props) => {
	const { product } = props;

	if (!product) notFound();

	return (
		<section className="wrapper grid">
			<header className="grid gap-6">
				<Breadcrumbs
					items={[
						{ href: "/", children: "Home" },
						{ href: "/products", children: "Products" },
						{ children: product.name },
					]}
				/>
			</header>

			<Divider className="mb-8 mt-4" />

			<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
				<Card className="aspect-square">
					<Image
						as={NextImage}
						removeWrapper
						isZoomed
						alt="Card background"
						className="h-full w-full rounded-sm object-cover"
						src={product.images[0]?.url || ""}
						fill
						sizes="100%"
					/>
				</Card>

				<div className="grid gap-4">
					<div className="flex gap-2">
						{product.categories.length > 0 && (
							<ul className="flex gap-2">
								{product.categories?.map((category) => (
									<li key={category.id}>
										<Chip variant="flat" color="primary">
											{category.name}
										</Chip>
									</li>
								))}
							</ul>
						)}

						{product.collections.length > 0 && (
							<ul className="flex gap-2">
								{product.collections?.map((collection) => (
									<li key={collection.id}>
										<Chip variant="flat" color="secondary">
											{collection.name}
										</Chip>
									</li>
								))}
							</ul>
						)}
					</div>

					<h2 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl">
						{product.name}
					</h2>

					<p className="text-sm sm:text-medium">{product.description}</p>

					<p className="text-2xl">{formatPrice(product.price)}</p>

					<ProductDetails />
				</div>
			</div>

			<Divider className="my-12" />

			<div></div>
		</section>
	);
};
