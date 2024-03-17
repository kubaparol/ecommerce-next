"use client";

import { type FC, useEffect, useRef } from "react";
import { useCycle, motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "@/hooks";

export interface MobileMenuProps {}

export const MobileMenu: FC<MobileMenuProps> = (props) => {
	const {} = props;

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
				<MenuToggle toggle={toggleOpen} className="grid md:hidden" />
			</motion.div>

			<motion.div
				ref={containerRef}
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				className="fixed right-0 top-[64px] h-screen w-full bg-white"
				custom={height}
				variants={sidebar}
			></motion.div>
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
