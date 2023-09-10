import { type FC } from "react";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
	const {} = props;

	return (
		<header className="bg-orange-200 p-4 text-center">
			<div className="mx-auto max-w-[1400px]">Header</div>
		</header>
	);
};
