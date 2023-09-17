import clsx from "clsx";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/const";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
	numOfPages: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { numOfPages, className, ...rest } = props;

	return (
		<nav {...rest} className={clsx(className)}>
			<ul aria-label="pagination" className="mt-4 flex items-center justify-center gap-8">
				{Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => (
					<li key={page}>
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
						{/* @ts-ignore */}
						<ActiveLink href={`${ProjectUrls.Products}/${page}`} label={page.toString()} />
					</li>
				))}
			</ul>
		</nav>
	);
};
