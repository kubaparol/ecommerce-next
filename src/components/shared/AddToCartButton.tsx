"use client";

import { ShoppingBasket } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const AddToCartButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button size="lg" className="button flex-center w-full gap-4 sm:w-fit" disabled={pending}>
			Dodaj do koszyka
			<ShoppingBasket />
		</Button>
	);
};
