import { type FC } from "react";

import Link from "next/link";
import { Bird } from "lucide-react";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/const";
import {
	type CollectionsGetListQuery,
	type CategoriesGetListQuery,
} from "@/services/api/graphql/configs/graphql";

export interface HeaderProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
}

export const Header: FC<HeaderProps> = (props) => {
	const { collections, categories } = props;

	return (
		<header className="bg-base-200 px-6 py-4">
			<div className="mx-auto flex max-w-[1400px] items-center justify-between">
				<Link
					href={ProjectUrls.home}
					className="flex h-12 w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 px-4 duration-300"
				>
					<Bird />
					Logo
				</Link>

				<div className="flex items-center gap-6">
					<div className="dropdown-end dropdown-bottom dropdown-hover dropdown">
						<div tabIndex={0} role="button" className="btn m-1">
							<p>Kategorie</p>
						</div>
						<ul
							tabIndex={0}
							className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
						>
							<li>
								<ActiveLink href={ProjectUrls.products} label="Wszystkie produkty" />
							</li>
							{categories.map((category) => (
								<li key={category.id}>
									<ActiveLink href={ProjectUrls.category(category.slug)} label={category.name} />
								</li>
							))}
						</ul>
					</div>

					<div className="dropdown-end dropdown-bottom dropdown-hover dropdown">
						<div tabIndex={0} role="button" className="btn m-1">
							<p>Kolekcje</p>
						</div>
						<ul
							tabIndex={0}
							className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
						>
							{collections.map((collection) => (
								<li key={collection.id}>
									<ActiveLink
										href={ProjectUrls.collection(collection.slug)}
										label={collection.name}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};
