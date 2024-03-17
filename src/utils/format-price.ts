export const formatPrice = (amount: number, currency = "USD", locale = "en-US"): string => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
};
