"use server";

import { cookies } from "next/headers";
import {
	CartGetByIdDocument,
	type CartFragment,
	CartCreateDocument,
	ProductGetByIdDocument,
	CartAddProductDocument,
} from "@/services/api/graphql/configs/graphql";
import { graphqlFetcher } from "@/services";

export async function getOrCreateCart(): Promise<CartFragment> {
	const cart = await getCartFromCookies();

	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await createCart();

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		maxAge: 60 * 60 * 24 * 365,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		httpOnly: true,
		secure: true,
		sameSite: "lax",
	});
	return newCart;
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const { order: cart } = await graphqlFetcher({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["shopping-cart"], // <---
			},
		});

		if (cart) {
			return cart;
		}
	}
}

export async function createCart() {
	return graphqlFetcher({ query: CartCreateDocument });
}

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await graphqlFetcher({
		query: ProductGetByIdDocument,
		variables: { id: productId },
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await graphqlFetcher({
		query: CartAddProductDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
	});
}
