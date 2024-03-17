import { Suspense, type FC } from "react";

import { Button, Link, Navbar, NavbarContent } from "@nextui-org/react";
import { Bird, ChevronDown, ShoppingCart } from "lucide-react";

import { ActiveLink } from "./ActiveLink";
import { Dropdown } from "./Dropdown";
import { MobileMenu } from "./MobileMenu";
import { SearchField } from "./SearchField";
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
				<li>
					<Link color="foreground" href="/" className="flex-center gap-1">
						<Bird />
						<p className="font-bold text-inherit">BIRD</p>
					</Link>
				</li>

				<li>
					<ul className="md:flex-center hidden gap-1">
						<li>
							<ActiveLink href={ProjectUrls.products} label="All" />
						</li>

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
				</li>
			</NavbarContent>

			<Suspense>
				<SearchField />
			</Suspense>

			<NavbarContent justify="end" className="gap-1">
				<li>
					<Button variant="light" aria-label="Koszyk" as={Link} href={ProjectUrls.cart}>
						<ShoppingCart />
						<span>1</span>
					</Button>
				</li>

				<li>
					<MobileMenu collections={collections} categories={categories} />
				</li>
			</NavbarContent>
		</Navbar>
	);
};
