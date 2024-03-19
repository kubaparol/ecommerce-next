"use client";

import { Trash2 } from "lucide-react";
import { type FC, useTransition, type SetStateAction, type Dispatch } from "react";
import { Button, type ButtonProps } from "@nextui-org/react";
import { type CartItem } from "./Cart";
import { removeItem } from "@/app/cart/actions";

export interface RemoveProductFromCartButtonProps extends ButtonProps {
	itemId: string;
	setItems: Dispatch<SetStateAction<CartItem[]>>;
}

export const RemoveProductFromCartButton: FC<RemoveProductFromCartButtonProps> = (props) => {
	const { itemId, setItems, ...rest } = props;

	const [isPending, startTransition] = useTransition();

	const removeItemHandler = () => {
		startTransition(async () => {
			await removeItem(itemId);

			setItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== itemId));
		});
	};

	return (
		<Button
			{...rest}
			size="sm"
			variant="flat"
			color="danger"
			isIconOnly
			endContent={!isPending && <Trash2 />}
			isLoading={isPending}
			aria-label="Remove from cart"
			onClick={removeItemHandler}
		/>
	);
};
