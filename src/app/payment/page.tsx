import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCartFromCookies } from "@/api/cart";
import { StripeForm } from "@/components/shared/forms/StripeForm";

export default async function PaymentPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const totalAmount = cart.orderItems.reduce((acc, item) => acc + (item.product?.price ?? 0), 0);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalAmount,
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			orderId: cart.id,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error("Missing client_secret");
	}

	return <StripeForm clientSecret={paymentIntent.client_secret} />;
}
