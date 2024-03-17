import { Button, type ButtonProps } from "@nextui-org/react";
import { type FC } from "react";
import { motion } from "framer-motion";

export interface MenuToggleProps extends ButtonProps {
	toggle: () => void;
}

export const MenuToggle: FC<MenuToggleProps> = (props) => {
	const { toggle, ...rest } = props;

	return (
		<Button
			{...rest}
			variant="light"
			onClick={toggle}
			endContent={
				<svg width="23" height="23" viewBox="0 0 23 23">
					<Path
						d="M 2 2.5 L 20 2.5"
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5" },
							open: { d: "M 3 16.5 L 17 2.5" },
						}}
					/>
					<Path
						d="M 2 9.423 L 20 9.423"
						variants={{
							closed: { opacity: 1 },
							open: { opacity: 0 },
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						d="M 2 16.346 L 20 16.346"
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346" },
							open: { d: "M 3 2.5 L 17 16.346" },
						}}
					/>
				</svg>
			}
			isIconOnly
		/>
	);
};

interface PathProps {
	d?: string;
	variants?: {
		[key: string]: Record<string, string | number>;
	};
	transition?: {
		duration: number;
	};
}

const Path: FC<PathProps> = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 0%, 18%)"
		strokeLinecap="round"
		{...props}
	/>
);
