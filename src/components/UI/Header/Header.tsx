import { type FC } from "react";

import Link from "next/link";
import { Bird } from "lucide-react";
import { ProjectUrls } from "@/const";
import { type CategoriesGetListQuery } from "@/services/api/graphql/configs/graphql";

export interface HeaderProps {
	categories: CategoriesGetListQuery["categories"];
}

export const Header: FC<HeaderProps> = (props) => {
	const { categories } = props;

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

				<div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
					<div tabIndex={0} role="button" className="btn m-1">
						<p>Kategorie</p>
					</div>
					<ul
						tabIndex={0}
						className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<Link href={ProjectUrls.products}>Wszystkie produkty</Link>
						</li>
						{categories.map((category) => (
							<li key={category.id}>
								<Link href={ProjectUrls.category(category.name.toLowerCase())}>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
};
