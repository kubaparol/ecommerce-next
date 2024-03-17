"use client";

import { SearchIcon } from "lucide-react";
import { type FC, useState, useEffect, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";
import { Input } from "@nextui-org/react";
import { removeKeysFromQuery } from "@/utils";
import { ProjectUrls } from "@/constants";
import { useDebouncedValue } from "@/hooks";

export interface SearchFieldProps {
	initialValue?: string;
	placeholder?: string;
}

export const SearchField: FC<SearchFieldProps> = (props) => {
	const { initialValue = "", placeholder = "Search..." } = props;

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
		<Input
			classNames={{
				base: "max-w-full sm:max-w-md h-10 hidden md:block",
				inputWrapper:
					"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
			}}
			placeholder={placeholder}
			size="sm"
			startContent={<SearchIcon size={18} />}
			type="search"
			onChange={handleChange}
		/>
	);
};
