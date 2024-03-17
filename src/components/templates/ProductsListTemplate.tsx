import { type ComponentPropsWithoutRef, type FC } from "react";
import { Pagination } from "../shared/Pagination";
import { ProductItem } from "@/components/shared/ProductItem";
import { type ProductListItemFragment } from "@/services/api/graphql/configs/graphql";

export interface ProductsListTemplateProps extends ComponentPropsWithoutRef<"section"> {
	products: ProductListItemFragment[];
	page: number;
	numOfPages: number;
	baseUrl: string;
}

export const ProductsListTemplate: FC<ProductsListTemplateProps> = (props) => {
	const { products, page, numOfPages, baseUrl } = props;

	return (
		<section className="grid gap-12 p-5 md:p-10">
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
				{products.map((product) => (
					<li key={product.id}>
						<ProductItem product={product} />
					</li>
				))}
			</ul>

			<footer className="flex justify-center">
				<Pagination current={page} total={numOfPages} baseUrl={baseUrl} />
			</footer>
		</section>
	);
};
