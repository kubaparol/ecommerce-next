"use client";

import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";
import { type FC, useState } from "react";
import { usePathname } from "next/navigation";
import { CartTable } from "./CartTable";
import { type CartGetByIdQuery, type CartFragment } from "@/services/api/graphql/configs/graphql";
import { ProjectUrls } from "@/constants";

export type CartItem = CartFragment["orderItems"][number];

export interface CartProps {
	cart: CartGetByIdQuery["order"];
}

export const Cart: FC<CartProps> = (props) => {
	const { cart } = props;

	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{pathname !== ProjectUrls.cart && (
				<Button
					variant="light"
					aria-label="Cart"
					startContent={<ShoppingBag />}
					onClick={() => setIsOpen(!isOpen)}
				>
					{/* <span>{items.length || 0}</span> */}
				</Button>
			)}

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="4xl">
				<ModalContent>
					<ModalHeader>My Cart</ModalHeader>

					<ModalBody className="p-0">
						<CartTable cart={cart} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
