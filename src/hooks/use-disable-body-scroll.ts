import { useEffect } from "react";

export const useDisableBodyScroll = (condition: boolean) => {
	useEffect(() => {
		const current = document.body.style.overflow;

		document.body.style.overflow = condition ? "hidden" : current;

		return () => {
			document.body.style.overflow = "";
		};
	}, [condition]);
};
