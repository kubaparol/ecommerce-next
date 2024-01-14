import { type ComponentPropsWithoutRef, type FC } from "react";
import { ProductItem } from "@/components/UI/ProductItem/ProductItem";
import { Pagination } from "@/components/UI/Pagination/Pagination";
import { type ProductsGetListQuery } from "@/services/api/graphql/configs/graphql";

export interface ProductsListTemplateProps extends ComponentPropsWithoutRef<"section"> {
	products: ProductsGetListQuery["products"];
	page: number;
	numOfPages: number;
}

export const ProductsListTemplate: FC<ProductsListTemplateProps> = (props) => {
	const { products, page, numOfPages } = props;

	return (
		<section className="grid gap-20">
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
				{products.map((product) => (
					<li key={product.id}>
						<ProductItem product={product} />
					</li>
				))}
			</ul>

			<footer className="flex justify-center">
				<Pagination current={page} totalCount={numOfPages} />
			</footer>
		</section>
	);
};
