"use server";

import { graphqlFetcher } from "@/services";
import { CartSetProductQuantityDocument } from "@/services/api/graphql/configs/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	await graphqlFetcher({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
};
