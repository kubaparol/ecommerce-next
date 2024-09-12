import { getCartFromCookies } from "../../api/cart";
import { CartTable } from "@/components/shared/modules/cart/CartTable";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	return (
		<div className="wrapper mx-auto grid max-w-4xl gap-8 p-4">
			{!cart ? (
				<h1>Your cart is empty</h1>
			) : (
				<>
					<div className="grid gap-1">
						<h1 className="text-2xl font-semibold">Order summary</h1>
						<span className="text-sm font-light text-gray-500">ID: #{cart.id}</span>
					</div>

					<CartTable cart={cart} noScroll />
				</>
			)}
		</div>
	);
}
