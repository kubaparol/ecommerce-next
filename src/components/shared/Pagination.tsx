"use client";

import { type FC } from "react";
import { Pagination as NextUIPagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface PaginationProps {
	current: number;
	total: number;
	baseUrl: string;
}

export const Pagination: FC<PaginationProps> = (props) => {
	const { current, total, baseUrl } = props;

	const router = useRouter();

	if (total <= 1) return null;

	return (
		<NextUIPagination
			showControls
			total={total}
			initialPage={current}
			onChange={(page) => router.push(`${baseUrl}/${page}`)}
			disableAnimation
		/>
	);
};
