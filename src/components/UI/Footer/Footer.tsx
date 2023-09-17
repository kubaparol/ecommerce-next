import Link from "next/link";
import { type FC } from "react";
import Brand from "../../../../public/vercel.svg";
import { ProjectUrls } from "@/const";

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
	const {} = props;

	return (
		<footer className="border-t border-t-slate-600 px-6 py-3">
			<div className="mx-auto flex max-w-[1400px] items-center justify-between">
				<Link href={ProjectUrls.Home} className="mr-4 w-full max-w-[100px] md:max-w-[140px]">
					<Brand />
				</Link>
			</div>
		</footer>
	);
};
