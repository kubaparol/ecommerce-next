import clsx from "clsx";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { type Route } from "next";
import { ActiveLink } from "../ActiveLink/ActiveLink";
import { ProjectUrls } from "@/const";

export interface PaginationProps extends ComponentPropsWithoutRef<"ul"> {
	numOfPages: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { numOfPages, className, ...rest } = props;

	return (
		<ul
			{...rest}
			aria-label="pagination"
			className={clsx("mt-4 flex items-center justify-center gap-8", className)}
		>
			{Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => (
				<li key={page}>
					<ActiveLink href={`${ProjectUrls.Products}/${page}` as Route} label={page.toString()} />
				</li>
			))}
		</ul>
	);
};
