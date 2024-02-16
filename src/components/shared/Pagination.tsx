import { useMemo, type ComponentPropsWithoutRef, type FC, Fragment } from "react";
import { type Route } from "next";
import { cn, rangeArray } from "@/utils";

import {
	Pagination as ShadcnPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
	current: number;
	total: number;
	baseUrl: string;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { current, total, baseUrl, className, ...rest } = props;

	const pagesToDisplay = useMemo(() => {
		const pages = rangeArray(total);

		if (pages.length <= 6) {
			return pages;
		}

		const distanceToStart = current;
		const distanceToEnd = pages.length - 1 - current;
		const distanceToEdge = Math.min(distanceToStart, distanceToEnd);
		const numberOfVisibleNeighbors = Math.max(1, 4 - distanceToEdge);

		return pages.filter((page) => {
			const isFirstPage = page === 0;
			const isLastPage = page === pages.length - 1;
			const isCurrentPageOrItsNeighbor = Math.abs(current - page) <= numberOfVisibleNeighbors;

			return isFirstPage || isLastPage || isCurrentPageOrItsNeighbor;
		});
	}, [current, total]);

	if (pagesToDisplay.length === 1) {
		return null;
	}

	const shouldDisplayDotsAfterFirstPage = (pageNumber: number, displayedPageIndex: number) => {
		const isFirstPage = pageNumber === 0;

		if (!isFirstPage) return false;

		const isPageGapHigherThanOne = (pagesToDisplay[displayedPageIndex + 1] ?? 0) > pageNumber + 1; // prettier-ignore
		return isPageGapHigherThanOne;
	};

	const shouldDisplayDotsBeforeLastPage = (pageNumber: number, displayedPageIndex: number) => {
		const isLastPage = pageNumber === pagesToDisplay[pagesToDisplay.length - 1];

		if (!isLastPage) return false;

		const isPageGapHigherThanOne = (pagesToDisplay[displayedPageIndex - 1] ?? 0) < pageNumber - 1; // prettier-ignore
		return isPageGapHigherThanOne;
	};

	const previousPageExist = current > 1;
	const nextPageExist = current < total;

	return (
		<ShadcnPagination {...rest} className={cn(className)}>
			<PaginationContent>
				{previousPageExist && (
					<PaginationItem>
						<PaginationPrevious href={`${baseUrl}/${current - 1}` as Route} />
					</PaginationItem>
				)}

				{pagesToDisplay.map((page, index) => (
					<Fragment key={index}>
						{shouldDisplayDotsBeforeLastPage(page, index) && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						<PaginationItem
							className={cn(
								page + 1 === current &&
									"pointer-events-none !cursor-default rounded-sm bg-primary text-white",
							)}
						>
							<PaginationLink href={`${baseUrl}/${page + 1}` as Route}>{page + 1}</PaginationLink>
						</PaginationItem>

						{shouldDisplayDotsAfterFirstPage(page, index) && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
					</Fragment>
				))}

				{nextPageExist && (
					<PaginationItem>
						<PaginationNext href={`${baseUrl}/${current + 1}` as Route} />
					</PaginationItem>
				)}
			</PaginationContent>
		</ShadcnPagination>
	);
};
