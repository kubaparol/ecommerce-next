"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { removeItem } from "@/app/cart/actions";

export const RemoveFromCart = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<Button
			variant="destructive"
			size="sm"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<Trash size="16" />
		</Button>
	);
};
