import { Link } from "@nextui-org/react";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { ProjectUrls } from "@/constants";

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

	const isSuccess = searchParams.redirect_status === "succeeded";

	return (
		<>
			<div className="flex flex-1 flex-col items-center justify-center">
				<div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
					{isSuccess ? (
						<CheckCircleIcon className="mx-auto mb-6 h-24 w-24 text-green-500" />
					) : (
						<AlertCircleIcon className="mx-auto mb-6 h-24 w-24 text-red-500" />
					)}
					<h1 className="mb-4 text-3xl font-bold text-gray-800">
						{isSuccess ? "Payment Successful!" : "Payment Failed!"}
					</h1>
					<p className="mb-6 text-gray-600">
						{isSuccess
							? "Thank you for your purchase. Your payment has been successfully processed."
							: "Unfortunately, your payment could not be processed. Please try again or contact support."}
					</p>
					<Link href={ProjectUrls.home} color={isSuccess ? "success" : "danger"}>
						Back to home
					</Link>
				</div>
			</div>
		</>
	);
}
