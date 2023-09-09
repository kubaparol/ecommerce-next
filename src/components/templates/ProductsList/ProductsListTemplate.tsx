import { type ComponentPropsWithoutRef, type FC } from "react";
import { ProductItem, type ProductItemProps } from "@/components/UI/ProductItem/ProductItem";

export interface ProductsListTemplateProps extends ComponentPropsWithoutRef<"section"> {
	products: ProductItemProps[];
}

export const ProductsListTemplate: FC<ProductsListTemplateProps> = (props) => {
	const { products } = props;

	return (
		<section>
			<ul data-testid="products-list" className="flex flex-wrap gap-6">
				{products.map((product) => (
					<li key={product.id}>
						<ProductItem {...product} />
					</li>
				))}
			</ul>
		</section>
	);
};
