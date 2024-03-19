import Link from "next/link";
import { type FC } from "react";
import { Bird } from "lucide-react";

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
	const {} = props;

	return (
		<footer className="border-border border-t">
			<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row ">
				<Link color="foreground" href="/" className="flex-center gap-1">
					<Bird />
					<p className="font-bold text-inherit">BIRD</p>
				</Link>

				<p className="small">© 2024 Bird. All rights reserved.</p>
			</div>
		</footer>
	);
};
