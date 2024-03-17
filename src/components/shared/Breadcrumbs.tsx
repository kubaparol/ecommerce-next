"use client";

import {
	Breadcrumbs as NextUIBreadcrumbs,
	BreadcrumbItem as NextUIBreadcrumbItem,
	type BreadcrumbsProps as NextUIBreadcrumbProps,
	type BreadcrumbItemProps as NextUIBreadcrumbItemProps,
} from "@nextui-org/react";

export interface BreadcrumbsProps extends NextUIBreadcrumbProps {
	items: NextUIBreadcrumbItemProps[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
	const { items, ...rest } = props;

	if (items.length === 0) return null;

	return (
		<>
			<NextUIBreadcrumbs {...rest}>
				{items.map((item, index) => (
					<NextUIBreadcrumbItem key={index} {...item}>
						{item.children}
					</NextUIBreadcrumbItem>
				))}
			</NextUIBreadcrumbs>
		</>
	);
};
