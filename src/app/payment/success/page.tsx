import { redirect } from "next/navigation";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: {
		payment_intent?: string;
		payment_intent_client_secret?: string;
		redirect_status?: string;
	};
}) {
	if (!searchParams.redirect_status) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key is not set");
	}

	// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	// 	apiVersion: "2023-10-16",
	// 	typescript: true,
	// });

	// const session = await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	return <h2 className="p-10">{searchParams.redirect_status}</h2>;
}
