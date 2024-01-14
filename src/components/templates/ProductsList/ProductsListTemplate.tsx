import { type ComponentPropsWithoutRef, type FC } from "react";
import Link from "next/link";
import { ProductItem } from "@/components/UI/ProductItem/ProductItem";
import { ProjectUrls } from "@/const";
import { Pagination } from "@/components/UI/Pagination/Pagination";
import { ProductsGetListQuery } from "@/services/api/graphql/configs/graphql";

export interface ProductsListTemplateProps extends ComponentPropsWithoutRef<"section"> {
	products: ProductsGetListQuery["products"];
	numOfPages: number;
}

export const ProductsListTemplate: FC<ProductsListTemplateProps> = (props) => {
	const { products, numOfPages } = props;

	return (
		<section>
			<ul
				data-testid="products-list"
				className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
			>
				{products.map((product) => (
					<li key={product.id}>
						<Link href={`${ProjectUrls.Product}/${product.id}`}>
							<ProductItem product={product} />
						</Link>
					</li>
				))}
			</ul>

			<Pagination numOfPages={numOfPages} className="mt-12 grid place-items-center" />
		</section>
	);
};
