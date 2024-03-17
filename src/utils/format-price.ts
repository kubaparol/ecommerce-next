export const formatPrice = (amount: number, currency = "PLN", locale = "pl-PL"): string => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
};
