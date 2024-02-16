import { type ComponentPropsWithoutRef, type FC } from "react";
import NextImage from "next/image";
import { ProductItem } from "@/components/shared/ProductItem";
import { Pagination } from "@/components/shared/Pagination";
import { type CollectionGetBySlugQuery } from "@/services/api/graphql/configs/graphql";
export interface CollectionTemplateProps extends ComponentPropsWithoutRef<"section"> {
	collection: CollectionGetBySlugQuery["collections"][number];
	page: number;
	numOfPages: number;
	baseUrl: string;
}

export const CollectionTemplate: FC<CollectionTemplateProps> = (props) => {
	const { collection, page, numOfPages, baseUrl } = props;
	const { name, image, products } = collection;

	return (
		<section className="grid gap-12 p-5 md:p-10">
			<figure className="relative aspect-video">
				<NextImage
					src={image.url}
					alt={name}
					fill
					priority
					sizes="100%"
					className="rounded-md object-cover"
				/>
				<h2 className="absolute bottom-3 left-3 rounded-md bg-black bg-opacity-50 px-3 py-1 text-2xl font-bold text-white shadow-lg sm:text-4xl md:text-6xl lg:text-[92px]">
					{name}
				</h2>
			</figure>

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
				{products.map((product) => (
					<li key={product.id}>
						<ProductItem product={product} />
					</li>
				))}
			</ul>

			{numOfPages > 1 && (
				<footer className="flex justify-center">
					<Pagination current={page} total={numOfPages} baseUrl={baseUrl} />
				</footer>
			)}
		</section>
	);
};
