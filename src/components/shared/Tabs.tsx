"use client";

import {
	Tabs as NextUITabs,
	Tab as NextUITab,
	type TabsProps as NextUITabsProps,
	type TabItemProps as NextUITabItemProps,
} from "@nextui-org/react";

export interface TabsProps extends NextUITabsProps {
	items: NextUITabItemProps[];
}

export const Tabs: React.FC<TabsProps> = (props) => {
	const { items, ...rest } = props;

	if (items.length === 0) return null;

	return (
		<>
			<NextUITabs {...rest}>
				{items.map((item, index) => (
					<NextUITab key={index} {...item} />
				))}
			</NextUITabs>
		</>
	);
};
