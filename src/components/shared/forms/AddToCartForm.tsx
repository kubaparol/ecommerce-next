"use client";

import { Button } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition, type FC } from "react";
import { ProjectUrls } from "@/constants";

export interface AddToCartFormProps {
	onFormSubmit: () => Promise<void>;
}

export const AddToCartForm: FC<AddToCartFormProps> = (props) => {
	const { onFormSubmit } = props;

	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onSubmit = () => {
		startTransition(async () => {
			try {
				await onFormSubmit();

				router.push(ProjectUrls.cart);
			} catch (error) {
				console.error("Error during form submission:", error);
			}
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
