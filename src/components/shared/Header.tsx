import { type FC } from "react";

import { Button, Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { Bird, ChevronDown, SearchIcon, ShoppingCart } from "lucide-react";

import { ActiveLink } from "./ActiveLink";
import { Dropdown } from "./Dropdown";
import { MobileMenu } from "./MobileMenu";
import {
	type CollectionsGetListQuery,
	type CategoriesGetListQuery,
} from "@/services/api/graphql/configs/graphql";
import { ProjectUrls } from "@/constants";

export interface HeaderProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
}

export const Header: FC<HeaderProps> = async (props) => {
	const { collections, categories } = props;

	return (
		<Navbar shouldHideOnScroll isBlurred maxWidth="2xl">
			<NavbarContent>
				<Link color="foreground" href="/" className="flex-center gap-1">
					<Bird />
					<p className="font-bold text-inherit">BIRD</p>
				</Link>

				<ul className="md:flex-center hidden gap-1">
					<ActiveLink href={ProjectUrls.products} label="All" />

					<li>
						<Dropdown
							trigger={{
								children: "Categories",
								variant: "light",
								endContent: <ChevronDown size={18} />,
							}}
							menu={{
								"aria-label": "Categories options",
							}}
							items={categories.map((c) => ({
								key: c.id,
								children: c.name,
								as: Link,
								href: ProjectUrls.category(c.slug),
								className: "text-black",
							}))}
							disableCurrentOption
						/>
					</li>

					<li>
						<Dropdown
							trigger={{
								children: "Collections",
								variant: "light",
								endContent: <ChevronDown size={18} />,
							}}
							menu={{
								"aria-label": "Collections options",
							}}
							items={collections.map((c) => ({
								key: c.id,
								children: c.name,
								as: Link,
								href: ProjectUrls.collection(c.slug),
								className: "text-black",
							}))}
							disableCurrentOption
						/>
					</li>
				</ul>
			</NavbarContent>

			<Input
				classNames={{
					base: "max-w-full sm:max-w-md h-10 hidden md:block",
					inputWrapper:
						"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
				}}
				placeholder="Type to search..."
				size="sm"
				startContent={<SearchIcon size={18} />}
				type="search"
			/>

			<NavbarContent justify="end" className="gap-1">
				<Button variant="light" aria-label="Koszyk" as={Link} href={ProjectUrls.cart}>
					<ShoppingCart />
					<span>1</span>
				</Button>

				<MobileMenu collections={collections} categories={categories} />
			</NavbarContent>
		</Navbar>
	);
};
