import Link from "next/link";
import { type FC } from "react";
import { Logo } from "./Logo";
import { ProjectUrls } from "@/constants";

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
	const {} = props;

	return (
		<footer className="border-t">
			<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
				<Link href={ProjectUrls.home} title="Home">
					<Logo />
				</Link>

				<p>2024 Bird. All Rights reserved.</p>
			</div>
		</footer>
	);
};
