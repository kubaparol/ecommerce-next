import { type FC } from "react";

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
	const {} = props;

	return (
		<footer className="bg-orange-200 p-4 text-center">
			<div className="mx-auto max-w-[1400px]">Footer</div>
		</footer>
	);
};
