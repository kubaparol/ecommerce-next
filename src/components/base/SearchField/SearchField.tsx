"use client";
import { useState, type FC, type ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks";
import { ProjectUrls } from "@/const";

export interface SearchFieldProps {
	initialValue?: string;
}

export const SearchField: FC<SearchFieldProps> = (props) => {
	const { initialValue = "" } = props;

	const router = useRouter();

	const [value, setValue] = useState<string>(initialValue);
	const [debouncedValue] = useDebouncedValue(value, 500);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		if (debouncedValue) {
			router.push(ProjectUrls.search(debouncedValue));
		}
	}, [debouncedValue, router]);

	return (
		<input
			type="text"
			placeholder="Szukaj"
			onChange={handleChange}
			className="input input-bordered input-sm w-full max-w-xs"
		/>
	);
};
