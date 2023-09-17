import { type ComponentPropsWithoutRef, type FC } from "react";
import Link from "next/link";
import { ProductItem, type ProductItemProps } from "@/components/UI/ProductItem/ProductItem";
import { ProjectUrls } from "@/const";
import { Pagination } from "@/components/UI/Pagination/Pagination";

export interface ProductsListTemplateProps extends ComponentPropsWithoutRef<"section"> {
	products: ProductItemProps[];
}

export const ProductsListTemplate: FC<ProductsListTemplateProps> = (props) => {
	const { products } = props;

	return (
		<section>
			<ul
				data-testid="products-list"
				className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
			>
				{products.map((product) => (
					<li key={product.id}>
						<Link href={`${ProjectUrls.Product}/${product.id}`}>
							<ProductItem {...product} />
						</Link>
					</li>
				))}
			</ul>

			<Pagination numOfPages={5} className="mt-12 grid place-items-center" />
		</section>
	);
};
