export const calculateNumOfPages = (count: number, perPage: number) => {
	return Math.ceil(count / perPage);
};
