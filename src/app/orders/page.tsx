import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { graphqlFetcher } from "@/services";
import { OrdersGetByEmailDocument } from "@/services/api/graphql/configs/graphql";

export default async function OrdersPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const email = user?.emailAddresses[0]?.emailAddress;

	if (!email) {
		return <p>No email</p>;
	}

	const { orders } = await graphqlFetcher({
		query: OrdersGetByEmailDocument,
		variables: { email },
	});

	return <pre>{JSON.stringify(orders, null, 2)}</pre>;
}
