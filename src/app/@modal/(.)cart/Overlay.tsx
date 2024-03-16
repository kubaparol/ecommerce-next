"use client";

import { useRouter } from "next/navigation";

export function Overlay() {
	const rotuer = useRouter();

	return (
		<div
			onClick={() => rotuer.back()}
			className="absolute inset-0 z-30 grid place-items-center bg-slate-700 bg-opacity-75"
		/>
	);
}
