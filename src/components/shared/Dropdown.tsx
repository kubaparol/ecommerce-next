"use client";

import {
	Dropdown as NextUIDropdown,
	DropdownMenu,
	DropdownTrigger,
	type DropdownProps as NextUIDropdownProps,
	type DropdownItemProps,
	DropdownItem,
	Button,
	type ButtonProps,
	type DropdownMenuProps,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useMemo, type FC } from "react";

export interface DropdownProps extends Omit<NextUIDropdownProps, "trigger" | "children"> {
	trigger: ButtonProps;
	menu?: Omit<DropdownMenuProps, "children">;
	items: DropdownItemProps[];
	disableCurrentOption?: boolean;
}

export const Dropdown: FC<DropdownProps> = (props) => {
	const { trigger, menu, items, disableCurrentOption, ...rest } = props;

	const pathname = usePathname();

	const disabledKeys = useMemo(() => {
		if (!disableCurrentOption) return [];

		const activePath = items.filter((i) => pathname.startsWith(i.href as string));

		return activePath.map((i) => i.key) as (string | number)[];
	}, [disableCurrentOption, items, pathname]);

	return (
		<NextUIDropdown {...rest}>
			<DropdownTrigger>
				<Button {...trigger} />
			</DropdownTrigger>

			<DropdownMenu {...menu} disabledKeys={disabledKeys}>
				{items.map(({ key, ...item }) => (
					<DropdownItem key={key} {...item} />
				))}
			</DropdownMenu>
		</NextUIDropdown>
	);
};
