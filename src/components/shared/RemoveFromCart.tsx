"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "@/app/cart/actions";

export const RemoveFromCart = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<Trash size="16" />
		</button>
	);
};
