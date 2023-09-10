import { type ComponentPropsWithoutRef, type FC } from "react";
import {
	type TypographyStyling,
	type TypographyAs,
	type TypographyWeight,
} from "./Typography.type";
import { cn } from "@/utils";

export interface TypographyProps extends ComponentPropsWithoutRef<"p"> {
	as: TypographyAs;
	text: string;
	styling?: TypographyStyling;
	weight?: TypographyWeight;
	isCentered?: boolean;
	isUppercase?: boolean;
	isHidden?: boolean;
	isUnderlined?: boolean;
}

export const Typography: FC<TypographyProps> = (props) => {
	const {
		as: As,
		styling = "p-16",
		weight = "normal",
		isCentered = false,
		isUppercase = false,
		isHidden = false,
		isUnderlined = false,
		className,
		text,
		...rest
	} = props;

	return (
		<As
			{...rest}
			className={cn(
				`${styling === "h-36" && "text-[36px] leading-[48px]"}`,
				`${styling === "h-32" && "text-[32px] leading-[40px]"}`,
				`${styling === "h-24" && "text-[24px] leading-[32px]"}`,
				`${styling === "h-20" && "text-[20px] leading-[24px]"}`,
				`${styling === "h-18" && "text-[18px] leading-[24px]"}`,
				`${styling === "h-16" && "text-[16px] leading-[24px]"}`,
				`${styling === "h-14" && "text-[14px] leading-[20px]"}`,
				`${styling === "h-12" && "text-[12px] leading-[16px]"}`,
				`${styling === "h-10" && "text-[10px] leading-[12px]"}`,
				`${styling === "p-16" && "text-[16px] leading-[24px]"}`,
				`${styling === "p-14" && "text-[14px] leading-[20px]"}`,
				`${styling === "p-12" && "text-[12px] leading-[16px]"}`,
				`${styling === "p-10" && "text-[10px] leading-[12px]"}`,
				`font-${weight}`,
				`${isCentered && "text-center"}`,
				`${isUppercase && "uppercase"}`,
				`${isHidden && "hidden"}`,
				`${isUnderlined && "underline"}`,
				className,
			)}
		>
			{text}
		</As>
	);
};
