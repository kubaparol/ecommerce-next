import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { graphqlFetcher } from "@/services";
import { CartGetByIdDocument } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";
import { IncrementProductQuantity } from "@/components/shared/IncrementProductQuantity";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { order: cart } = await graphqlFetcher({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
	});

	if (!cart) {
		redirect("/");
	}

	return (
		<div className="wrapper mx-auto max-w-4xl p-4">
			<h1 className="mb-6 text-2xl font-semibold">Order #{cart.id} summary</h1>

			<table className="w-full table-auto">
				<thead className="bg-gray-200">
					<tr>
						<th className="px-4 py-2">Product</th>
						<th className="px-4 py-2">Quantity</th>
						<th className="px-4 py-2">Price</th>
					</tr>
				</thead>

				<tbody className="text-sm">
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}

						return (
							<tr key={item.product.id} className="border-b bg-white text-center">
								<td className="px-4 py-2">{item.product.name}</td>
								<td className=" px-4 py-2">
									<IncrementProductQuantity quantity={item.quantity} itemId={item.id} />
								</td>
								<td className="px-4 py-2">{formatPrice(item.product.price)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
