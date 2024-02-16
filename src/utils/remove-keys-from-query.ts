import qs from "query-string";

export interface RemoveKeysFromQueryParams {
	params: string;
	keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveKeysFromQueryParams) => {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true },
	);
};
