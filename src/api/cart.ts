"use server";

import { cookies } from "next/headers";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import {
	CartGetByIdDocument,
	type CartFragment,
	CartCreateDocument,
	ProductGetByIdDocument,
	CartAddProductDocument,
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
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
			cache: "no-store",
			next: {
				tags: ["shopping-cart"],
			},
		});

		if (cart) {
			return cart;
		}
	}
}

export async function createCart() {
	return graphqlFetcher({ query: CartCreateDocument, cache: "no-store" });
}

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await graphqlFetcher({
		query: ProductGetByIdDocument,
		variables: { id: productId },
		cache: "no-store",
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

export async function handlePaymentAction() {
	"use server";
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is not set");
	}

	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "p24"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price || 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url:
			"https://ecommerce-next-peach.vercel.app/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "https://ecommerce-next-peach.vercel.app/cart/cancel",
	});

	if (!checkoutSession.url) {
		throw new Error("Checkout session URL is not set");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}

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
