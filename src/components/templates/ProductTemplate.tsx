import { type ComponentPropsWithoutRef, type FC } from "react";
import { notFound } from "next/navigation";
import { Card, Chip, Divider, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { Breadcrumbs } from "../shared/Breadcrumbs";
import { AddToCartForm } from "../shared/forms/AddToCartForm";
import { type ProductGetByIdQuery } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";
import { ProjectUrls } from "@/constants";

export interface ProductTemplateProps extends ComponentPropsWithoutRef<"section"> {
	product: ProductGetByIdQuery["product"];
	onAddToCartClick: () => Promise<void>;
}

export const ProductTemplate: FC<ProductTemplateProps> = (props) => {
	const { product, onAddToCartClick } = props;

	if (!product) notFound();

	return (
		<section className="grid">
			<header className="grid gap-6">
				<Breadcrumbs
					underline="hover"
					items={[
						{ href: "/", children: "Home" },
						{ href: ProjectUrls.products, children: "Products" },
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

					<Chip variant="dot" color="success" size="sm">
						In stock - Order before 2pm for Express Delivery
					</Chip>

					<div className="mt-auto grid h-fit w-full gap-4">
						<AddToCartForm onFormSubmit={onAddToCartClick} />

						{/* <Button
							as={Link}
							size="sm"
							variant="light"
							startContent={<Ruler size={20} />}
							className="w-fit border"
							href={ProjectUrls.sizeGuide}
							isDisabled
						>
							View size guide
						</Button> */}
					</div>
				</div>
			</div>

			<Divider className="my-12" />
		</section>
	);
};
