import { useMemo } from "react";
import { ProductsListTemplate } from "@/components/templates/ProductsList/ProductsListTemplate";

export default function Products() {
	const exampleProducts = useMemo(() => {
		return [
			{
				id: "1",
				imageUrl:
					"https://imagedelivery.net/-hi2cHwhP-MX2yaQ4Kdm5Q/0114e995-cc41-4245-3a7c-8cf10cec5100/medium",
				name: "Laptop XYZ",
				price: "$999.99",
			},
			{
				id: "2",
				imageUrl:
					"https://imagedelivery.net/-hi2cHwhP-MX2yaQ4Kdm5Q/b4025ed2-4e1d-4d21-f568-704942cd0800/medium",
				name: "Smartphone ABC",
				price: "$599.99",
			},
			{
				id: "3",
				imageUrl:
					"https://imagedelivery.net/-hi2cHwhP-MX2yaQ4Kdm5Q/963cb0f8-7ff5-4b42-94a9-d1c74aedcc00/medium",
				name: "Kwiaty Delux",
				price: "$29.99",
			},
			{
				id: "4",
				imageUrl:
					"https://imagedelivery.net/-hi2cHwhP-MX2yaQ4Kdm5Q/f507f5b7-8cea-4871-07f3-ccca25279e00/medium",
				name: "Zabawka dla kota",
				price: "$19.99",
			},
		];
	}, []);

	return (
		<main>
			<ProductsListTemplate products={exampleProducts} />
		</main>
	);
}
