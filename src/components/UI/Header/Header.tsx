import { type FC } from "react";

import Link from "next/link";
import { Bird, Search } from "lucide-react";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/const";
import {
	type CollectionsGetListQuery,
	type CategoriesGetListQuery,
} from "@/services/api/graphql/configs/graphql";
import { SearchField } from "@/components/base/SearchField/SearchField";

export interface HeaderProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
}

export const Header: FC<HeaderProps> = (props) => {
	const { collections, categories } = props;

	return (
		<header className="navbar bg-base-200 px-3">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<details>
								<summary>Kategorie</summary>
								<ul className="p-2">
									<li>
										<ActiveLink href={ProjectUrls.products} label="Wszystkie produkty" />
									</li>
									{categories.map((category) => (
										<li key={category.id}>
											<ActiveLink
												href={ProjectUrls.category(category.slug)}
												label={category.name}
											/>
										</li>
									))}
								</ul>
							</details>
						</li>

						<li>
							<details>
								<summary>Kolekcje</summary>
								<ul className="p-2">
									{collections.map((collection) => (
										<li key={collection.id}>
											<ActiveLink
												href={ProjectUrls.collection(collection.slug)}
												label={collection.name}
											/>
										</li>
									))}
								</ul>
							</details>
						</li>
					</ul>
				</div>

				<Link href={ProjectUrls.home} className="btn btn-ghost flex text-xl">
					<Bird />
					Logo
				</Link>
			</div>

			<div className="navbar-center z-10 hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<details>
							<summary>Kategorie</summary>
							<ul className="p-2">
								<li>
									<ActiveLink href={ProjectUrls.products} label="Wszystkie produkty" />
								</li>
								{categories.map((category) => (
									<li key={category.id}>
										<ActiveLink href={ProjectUrls.category(category.slug)} label={category.name} />
									</li>
								))}
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary>Kolekcje</summary>
							<ul className="p-2">
								{collections.map((collection) => (
									<li key={collection.id}>
										<ActiveLink
											href={ProjectUrls.collection(collection.slug)}
											label={collection.name}
										/>
									</li>
								))}
							</ul>
						</details>
					</li>
				</ul>
			</div>

			<div className="navbar-end">
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
						<Search />
					</div>
					<div
						tabIndex={0}
						className="card dropdown-content card-compact z-[1] mt-3 w-72 bg-base-100 shadow"
					>
						<div className="card-body">
							<span className="text-sm font-medium">Wyszukaj produkt:</span>
							<SearchField />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
