import { type ComponentPropsWithoutRef, type FC } from "react";
import Link from "next/link";
import { type Route } from "next";
import { cn } from "@/utils";

export interface PaginationProps extends ComponentPropsWithoutRef<"ul"> {
	current: number;
	totalCount: number;
	baseUrl: string;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { current, totalCount, baseUrl, className, ...rest } = props;

	return (
		<ul {...rest} className={cn("join", className)}>
			{Array.from({ length: totalCount }, (_, i) => i + 1).map((page) => (
				<li key={page}>
					<Link
						href={`${baseUrl}/${page}` as Route}
						className={cn("btn join-item", current === page && "btn-active")}
					>
						{page}
					</Link>
				</li>
			))}
		</ul>
	);
};
