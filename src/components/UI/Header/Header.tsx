import { type FC } from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
	const {} = props;

	return (
		<header className="flex justify-end border-b border-b-slate-600 p-2">
			<ModeToggle />
		</header>
	);
};
