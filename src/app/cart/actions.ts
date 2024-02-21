"use server";

import { graphqlFetcher } from "@/services";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/services/api/graphql/configs/graphql";

export const removeItem = async (itemId: string) => {
	await graphqlFetcher({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
	});
};

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	await graphqlFetcher({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
};
