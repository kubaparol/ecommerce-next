"use client";

import { Suspense, type FC } from "react";

import Link from "next/link";
import { ActiveLink } from "./ActiveLink";
import { Logo } from "./Logo";
import { SearchField } from "./SearchField";
import { ProjectUrls } from "@/constants";
import {
	type CollectionsGetListQuery,
	type CategoriesGetListQuery,
} from "@/services/api/graphql/configs/graphql";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export interface HeaderProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
}

export const Header: FC<HeaderProps> = (props) => {
	const { collections, categories } = props;

	return (
		<header className="border-b">
			<div className="wrapper flex items-center justify-between">
				<Link href={ProjectUrls.home} title="Home">
					<Logo />
				</Link>

				<Suspense>
					<SearchField className="max-w-[400px]" />
				</Suspense>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Kategorie</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="grid gap-2 whitespace-nowrap p-4">
									<li>
										<NavigationMenuLink asChild>
											<ActiveLink href={ProjectUrls.products} label="Wszystkie produkty" />
										</NavigationMenuLink>
									</li>

									{categories.map((category) => (
										<li key={category.id}>
											<NavigationMenuLink asChild>
												<ActiveLink
													href={ProjectUrls.category(category.slug)}
													label={category.name}
												/>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Kolekcje</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="grid gap-2 whitespace-nowrap p-4">
									{collections.map((collection) => (
										<li key={collection.id}>
											<NavigationMenuLink asChild>
												<ActiveLink
													href={ProjectUrls.collection(collection.slug)}
													label={collection.name}
												/>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
};
