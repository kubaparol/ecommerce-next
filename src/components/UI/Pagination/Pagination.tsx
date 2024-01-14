import { type ComponentPropsWithoutRef, type FC } from "react";
import Link from "next/link";
import { ProjectUrls } from "@/const";
import { cn } from "@/utils";

export interface PaginationProps extends ComponentPropsWithoutRef<"ul"> {
	current: number;
	totalCount: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { current, totalCount, className, ...rest } = props;

	return (
		<ul {...rest} className={cn("join", className)}>
			{Array.from({ length: totalCount }, (_, i) => i + 1).map((page) => (
				<li key={page}>
					<Link
						href={`${ProjectUrls.products}/${page}`}
						className={cn("join-item btn", current === page && "btn-active")}
					>
						{page}
					</Link>
				</li>
			))}
		</ul>
	);
};
