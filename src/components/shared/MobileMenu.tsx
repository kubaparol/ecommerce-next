"use client";

import { type FC, useEffect, useRef } from "react";
import { useCycle, motion } from "framer-motion";
import { Link } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "@/hooks";
import {
	type CategoriesGetListQuery,
	type CollectionsGetListQuery,
} from "@/services/api/graphql/configs/graphql";
import { ProjectUrls } from "@/constants";

export interface MobileMenuProps {
	collections: CollectionsGetListQuery["collections"];
	categories: CategoriesGetListQuery["categories"];
}

export const MobileMenu: FC<MobileMenuProps> = (props) => {
	const { collections, categories } = props;

	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef<HTMLDivElement>(null);
	const { height } = useDimensions(containerRef);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<>
			<motion.div animate={isOpen ? "open" : "closed"}>
				<MenuToggle
					toggle={toggleOpen}
					className="grid md:hidden"
					aria-label={isOpen ? "Close menu" : "Open menu"}
				/>
			</motion.div>

			<motion.div
				ref={containerRef}
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				className="fixed right-0 top-[64px] flex h-[calc(100vh-64px)] w-full flex-col overflow-auto bg-white"
				custom={height}
				variants={sidebar}
			>
				<div className="p-4">
					<p className="text-sm font-extralight text-gray-400">Categories</p>

					<ul className="mt-2 grid gap-3">
						{categories.map((c) => (
							<li key={c.id}>
								<Link
									size="md"
									color="foreground"
									href={ProjectUrls.category(c.slug)}
									showAnchorIcon
									anchorIcon={<ArrowRight size={16} />}
									className="w-full  justify-between"
								>
									{c.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="p-4">
					<p className="text-sm font-extralight text-gray-400">Collections</p>

					<ul className="mt-2 grid gap-3">
						{collections.map((c) => (
							<li key={c.id}>
								<Link
									size="md"
									color="foreground"
									href={ProjectUrls.category(c.slug)}
									showAnchorIcon
									anchorIcon={<ArrowRight size={16} />}
									className="w-full justify-between"
								>
									{c.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<footer className="border-border mt-auto border-t p-2">
					<p className="text-center text-sm font-extralight text-gray-400">
						© 2024 Bird. All rights reserved.
					</p>
				</footer>
			</motion.div>
		</>
	);
};

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 100% 0px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(0px at 100% 0px)",
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};
