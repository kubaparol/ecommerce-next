"use client";

import { Search } from "lucide-react";
import {
	type FC,
	useState,
	type ComponentPropsWithoutRef,
	useEffect,
	type ChangeEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";
import { cn, removeKeysFromQuery } from "@/utils";
import { ProjectUrls } from "@/constants";
import { useDebouncedValue } from "@/hooks";

export interface SearchFieldProps extends ComponentPropsWithoutRef<"div"> {
	initialValue?: string;
	placeholder?: string;
}

export const SearchField: FC<SearchFieldProps> = (props) => {
	const { initialValue = "", placeholder = "Szukaj...", className, ...rest } = props;

	const router = useRouter();
	const [query, setQuery] = useState<string>(initialValue);
	const [debouncedValue] = useDebouncedValue(query, 300);
	const searchParams = useSearchParams();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		if (debouncedValue) {
			router.push(ProjectUrls.search(debouncedValue));
		} else {
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["query"],
			});

			router.push(newUrl as Route);
		}
	}, [debouncedValue, router, searchParams]);

	return (
		<div
			{...rest}
			className={cn("flex-center w-full overflow-hidden rounded-full bg-grey-50 px-4", className)}
		>
			<Search size={21} />

			<input
				type="text"
				placeholder={placeholder}
				onChange={handleChange}
				className="p-regular-14 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
		</div>
	);
};
