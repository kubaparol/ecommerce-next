import { redirect } from "next/navigation";
import { getCartFromCookies, handlePaymentAction } from "../../api/cart";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	return (
		<div className="wrapper mx-auto grid max-w-4xl gap-8 p-4">
			<h1 className="mb-6 text-2xl font-semibold">Order #{cart.id} summary</h1>

			<table className="w-full table-auto">
				<thead className="bg-gray-200">
					<tr>
						<th className="px-4 py-2">Product</th>
						<th className="px-4 py-2">Quantity</th>
						<th className="px-4 py-2">Price</th>
						<th />
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
									{/* <IncrementProductQuantity quantity={item.quantity} itemId={item.id} /> */}
								</td>
								<td className="px-4 py-2">{item.product.price}</td>
								<td>{/* <RemoveFromCart itemId={item.id} /> */}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<form action={handlePaymentAction}>
				<button type="submit" className="w-fit">
					Pay
				</button>
			</form>
		</div>
	);
}
