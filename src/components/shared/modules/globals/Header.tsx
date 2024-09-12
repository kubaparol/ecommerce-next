import { Suspense, type FC } from "react";

import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import { Bird, ChevronDown } from "lucide-react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Dropdown } from "../../Dropdown";
import { Cart } from "../cart/Cart";
import { ActiveLink } from "./ActiveLink";
import { MobileMenu } from "./MobileMenu";
import { SearchField } from "./SearchField";
import {
	type CollectionsGetListQuery,
	type CategoriesGetListQuery,
	type CartGetByIdQuery,
} from "@/services/api/graphql/configs/graphql";
import { ProjectUrls } from "@/constants";

export interface HeaderProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
	cart: CartGetByIdQuery["order"];
}

export const Header: FC<HeaderProps> = async (props) => {
	const { collections, categories, cart } = props;

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

			<NavbarContent justify="end" className="gap-3">
				<li>
					<Cart cart={cart} />
				</li>

				<li className="whitespace-nowrap">
					<SignedIn>
						<UserButton />
					</SignedIn>

					<SignedOut>
						<SignInButton />
					</SignedOut>
				</li>

				<li>
					<MobileMenu collections={collections} categories={categories} />
				</li>
			</NavbarContent>
		</Navbar>
	);
};
