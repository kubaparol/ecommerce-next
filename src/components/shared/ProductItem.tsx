import { type FC } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import { ProjectUrls } from "@/constants";
import { type ProductListItemFragment } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";

export interface ProductItemProps {
	product: ProductListItemFragment;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
	const { product } = props;
	const { id, name, price, images } = product;

	return (
		<Card isFooterBlurred>
			<div className="relative">
				{/* <Button
					endContent={<Heart />}
					isIconOnly
					color="default"
					className="absolute right-2 top-2 z-20"
				/> */}

				<Image
					src={images[0]?.url || ""}
					alt={name}
					shadow="md"
					width="100%"
					className="object-cover"
					removeWrapper
				/>
			</div>

			<CardFooter className="grid w-full border-t-1 border-zinc-100/50 bg-white/50">
				<p className="text-medium font-medium text-black">{name}</p>
				<p className="text-sm text-black">{formatPrice(price)}</p>

				<div className="mt-3 flex items-center justify-between gap-2">
					{/* <Button variant="flat" color="warning" endContent={<ShoppingCart />} isIconOnly /> */}

					<Button
						as={Link}
						href={ProjectUrls.product(id)}
						className="group ml-auto group-hover:translate-x-1"
						color="primary"
					>
						See more
						<span className="transition-transform duration-300 group-hover:translate-x-1">
							<ArrowRight size={18} />
						</span>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
