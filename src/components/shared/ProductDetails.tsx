"use client";

import { type FC } from "react";
import {
	Button,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	getKeyValue,
	useDisclosure,
} from "@nextui-org/react";
import { Heart, Ruler, ShoppingCart } from "lucide-react";
import { Tabs } from "./Tabs";

export interface ProductDetailsProps {}

export const ProductDetails: FC<ProductDetailsProps> = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// temp;
	const sizes = [
		{ key: "XS", title: "XS" },
		{ key: "SMALL", title: "SMALL" },
		{ key: "MEDIUM", title: "MEDIUM" },
		{ key: "LARGE", title: "LARGE" },
		{ key: "XL", title: "XL" },
	];

	const rows = [
		{
			key: "Chest",
			name: "Chest",
			XS: "34-36",
			SMALL: "36-38",
			MEDIUM: "38-40",
			LARGE: "40-42",
			XL: "42-44",
		},
		{
			key: "Waist",
			name: "Waist",
			XS: "28-30",
			SMALL: "30-32",
			MEDIUM: "32-34",
			LARGE: "34-36",
			XL: "36-38",
		},
		{
			key: "Hip",
			name: "Hip",
			XS: "34-36",
			SMALL: "36-38",
			MEDIUM: "38-40",
			LARGE: "40-42",
			XL: "42-44",
		},
	];

	const columns = [
		{ key: "name", label: "Name" },
		{
			key: "XS",
			label: "XS",
		},
		{
			key: "SMALL",
			label: "SMALL",
		},
		{
			key: "MEDIUM",
			label: "MEDIUM",
		},
		{
			key: "LARGE",
			label: "LARGE",
		},
		{
			key: "XL",
			label: "XL",
		},
	];

	return (
		<>
			<div className="flex flex-col justify-between gap-8">
				<div className="grid gap-4">
					<div className="flex flex-wrap items-center gap-2">
						<Tabs items={sizes} color="default" />
						<Button
							size="sm"
							variant="light"
							startContent={<Ruler size={20} />}
							className="w-fit border"
							onPress={onOpen}
						>
							View size guide
						</Button>
					</div>

					<Chip variant="dot" color="success" size="sm">
						In stock - Order before 2pm for Express Delivery
					</Chip>
				</div>
				<div className="mt-auto grid grid-cols-[auto_1fr] gap-4">
					<Tooltip content="Add to wishlist">
						<Button size="lg" variant="flat" color="warning" endContent={<Heart />} isIconOnly />
					</Tooltip>
					<Button
						size="lg"
						color="primary"
						endContent={
							<span className="transition-transform duration-300 group-hover:translate-x-1">
								<ShoppingCart />
							</span>
						}
						className="group group-hover:translate-x-1"
					>
						Add to cart
					</Button>
				</div>
			</div>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Size guide</ModalHeader>
					<ModalBody>
						<Table aria-label="Example table with dynamic content">
							<TableHeader columns={columns}>
								{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
							</TableHeader>

							<TableBody items={rows}>
								{(item) => (
									<TableRow key={item.key}>
										{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
									</TableRow>
								)}
							</TableBody>
						</Table>
					</ModalBody>
					<ModalFooter>
						<p className="text-xs font-extralight text-default-500">
							Products are designed and sewn in Poland. The dimensions of the products may vary
							slightly from the dimensions given in the table (tolerance of 1-2cm applies).
						</p>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
