import { type NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextResponse): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is not set");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Stripe webhook secret is not set");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	);

	switch (event.type) {
		case "checkout.session.completed": {
			event.data.object.metadata?.cartId;
		}
		case "checkout.session.async_payment_succeeded": {
		}
		case "checkout.session.async_payment_failed": {
		}
		case "checkout.session.expired": {
		}
	}

	return new Response(null, { status: 204 });
}
