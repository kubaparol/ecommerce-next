"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction, useTransition } from "react";
import { Button, type ButtonProps } from "@nextui-org/react";
import { type CartItem } from "./Cart";
import { changeItemQuantity } from "@/api/cart";

export interface ChangeProductCartQuantityProps extends ButtonProps {
	action: "increment" | "decrement";
	itemId: string;
	quantity: number;
	setItems: Dispatch<SetStateAction<CartItem[]>>;
}

export const ChangeProductCartQuantity: FC<ChangeProductCartQuantityProps> = (props) => {
	const { action, itemId, quantity, setItems, ...rest } = props;

	const [isPending, startTransition] = useTransition();

	const icon = action === "increment" ? <PlusCircle /> : <MinusCircle />;

	const changeItemQuantityHandler = () => {
		startTransition(async () => {
			await changeItemQuantity(itemId, quantity);

			setItems((prevItems) => {
				const itemIndex = prevItems.findIndex((prevItem) => prevItem.id === itemId);

				if (itemIndex === -1) {
					return prevItems;
				}

				const newItems = [...prevItems];
				const item = newItems[itemIndex];

				if (!item) return prevItems;

				item.quantity = quantity;

				console.log(newItems);
				return newItems;
			});
		});
	};

	return (
		<Button
			{...rest}
			size="sm"
			variant="light"
			color="default"
			isIconOnly
			endContent={!isPending && icon}
			isLoading={isPending}
			onClick={changeItemQuantityHandler}
		/>
	);
};
