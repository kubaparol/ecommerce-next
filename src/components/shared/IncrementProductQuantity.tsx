"use client";

import { Plus } from "lucide-react";
import { useOptimistic } from "react";
import { Button } from "../ui/button";
import { changeItemQuantity } from "@/app/cart/actions";

export const IncrementProductQuantity = ({
	quantity,
	itemId,
}: {
	quantity: number;
	itemId: string;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex-center gap-6">
			<span>{optimisticQuantity}</span>

			<Button
				variant="secondary"
				size="sm"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				<Plus size="16" />
			</Button>
		</form>
	);
};