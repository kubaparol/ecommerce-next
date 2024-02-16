export const rangeArray = (a: number, b = 0) => {
	const array = [];

	for (let i = Math.min(a, b); i < Math.max(a, b); i++) {
		array.push(i);
	}

	return array;
};
