"use client";

import { ShoppingBasket } from "lucide-react";
import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();

	return (
		<button className="button flex-center w-full gap-4 sm:w-fit" disabled={pending}>
			Dodaj do koszyka
			<ShoppingBasket />
		</button>
	);
};
