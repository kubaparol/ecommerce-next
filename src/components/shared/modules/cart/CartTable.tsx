"use client";

import {
	Button,
	Divider,
	Image,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useCallback, type FC, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RemoveProductFromCartButton } from "./RemoveProductFromCartButton";
import { ChangeProductCartQuantity } from "./ChangeProductCartQuantity";
import { type CartGetByIdQuery, type CartFragment } from "@/services/api/graphql/configs/graphql";
import { formatPrice } from "@/utils";

type Column = "name" | "price" | "quantity" | "id" | "images";
export type CartItem = CartFragment["orderItems"][number];

const columns: { name: string; key: Column }[] = [
	{ name: "Product", key: "name" },
	{ name: "Quantity", key: "quantity" },
	{ name: "Price", key: "price" },
	{ name: "", key: "id" },
];

export interface CartTableProps {
	cart: CartGetByIdQuery["order"];
	noScroll?: boolean;
}

export const CartTable: FC<CartTableProps> = (props) => {
	const { cart, noScroll = false } = props;

	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, [router]);

	useEffect(() => {
		if (cart) {
			setItems(cart.orderItems);
		}
	}, [cart]);

	const [items, setItems] = useState<CartItem[]>([]);

	const totalPrice = useMemo(() => {
		return items.reduce((acc, item) => (item.product?.price || 0) * item.quantity + acc, 0);
	}, [items]);

	const renderCell = useCallback((item: CartItem, columnKey: Column) => {
		switch (columnKey) {
			case "name": {
				return (
					<div className="flex items-center gap-2">
						<Image
							as={NextImage}
							width={50}
							height={50}
							src={item.product?.images[0]?.url || ""}
							alt={item.product?.name}
						/>
						<p className="text-md">{item?.product?.name}</p>
					</div>
				);
			}
			case "quantity": {
				return (
					<div className="flex w-fit items-center gap-2">
						<ChangeProductCartQuantity
							action="decrement"
							itemId={item.id}
							setItems={setItems}
							quantity={item.quantity - 1}
							isDisabled={item.quantity === 1}
						/>

						<p className="min-w-6 text-center">{item.quantity}</p>

						<ChangeProductCartQuantity
							action="increment"
							itemId={item.id}
							setItems={setItems}
							quantity={item.quantity + 1}
						/>
					</div>
				);
			}
			case "price": {
				return <p className="w-fit">{formatPrice(item.product?.price || 0)}</p>;
			}
			case "id": {
				return <RemoveProductFromCartButton itemId={item.id} setItems={setItems} />;
			}
			default:
				return null;
		}
	}, []);

	return (
		<>
			<Table
				shadow="none"
				isHeaderSticky
				classNames={{ base: !noScroll && "max-h-[520px]" }}
				aria-label="Table with cart items"
			>
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
				</TableHeader>

				<TableBody items={items} emptyContent="Your cart is empty">
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey as Column)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>

			{items.length > 0 && (
				<>
					<Divider />

					<div className="flex-between m-4 rounded-2xl bg-primary-50 p-4 shadow-sm">
						<p className="text-lg font-semibold">
							<span className="font-normal">Total:</span> {formatPrice(totalPrice || 0)}
						</p>

						<Button as={Link} color="primary" href="/payment">
							Proceed to Checkout
						</Button>
					</div>
				</>
			)}
		</>
	);
};
