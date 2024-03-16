import { Overlay } from "./Overlay";
import { getCartFromCookies } from "@/api/cart";

export default async function ModalCart() {
	const cart = await getCartFromCookies();

	return (
		<>
			<Overlay />
			<div className="w-sm absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<div className="p-4">
					<ul>
						{cart?.orderItems.map((item) => (
							<li key={item.id}>
								<span>{item.product?.name}</span>
								<span>{item.product?.price}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
