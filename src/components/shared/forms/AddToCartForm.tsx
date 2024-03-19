"use client";

import { Button } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";
import { useTransition, type FC } from "react";

export interface AddToCartFormProps {
	onFormSubmit: () => Promise<void>;
}

export const AddToCartForm: FC<AddToCartFormProps> = (props) => {
	const { onFormSubmit } = props;

	const [isPending, startTransition] = useTransition();

	const onSubmit = async () => {
		startTransition(async () => {
			await onFormSubmit();
		});
	};

	return (
		<form>
			<Button
				type="submit"
				size="lg"
				color="primary"
				endContent={<ShoppingBag />}
				formAction={onSubmit}
				className="w-full"
				isLoading={isPending}
			>
				Add to cart
			</Button>
		</form>
	);
};
