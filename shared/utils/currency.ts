/**
 * Formats a numeric amount into a localized currency string.
 * Supports 'en' and 'es' locales specifically for AstroAssist.
 */
export function formatCurrency(amount: number, locale: string = "en"): string {
  const currency = "USD"; // Default for AstroAssist
  const formatter = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

/**
 * Parses a price string (e.g., "$1,200.00") into a clean number (1200).
 * Handles common currency symbols and delimiters.
 */
export function parsePrice(price: string): number {
  if (!price) return 0;
  
  // Remove currency symbols, commas, and any non-numeric/decimal characters
  const cleanValue = price.replace(/[^0-9.-]+/g, "");
  const numericValue = parseFloat(cleanValue);
  
  return isNaN(numericValue) ? 0 : numericValue;
}
