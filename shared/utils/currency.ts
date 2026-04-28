/**
 * Formats a numeric amount into a localized currency string.
 * Supports 'en' and 'es' locales specifically for AstroAssist.
 */
export function formatCurrency(amount: number | null | undefined, locale: string = "en"): string {
  const safeAmount = typeof amount === "number" && !isNaN(amount) ? amount : 0;
  
  const currency = "USD"; // Default for AstroAssist
  const formatter = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(safeAmount);
}

/**
 * Parses a price string (e.g., "$1,200.00") into a clean number (1200).
 * Handles common currency symbols and delimiters.
 */
export function parsePrice(price: string | number | null | undefined): number {
  if (price === null || price === undefined) return 0;
  if (typeof price === "number") return isNaN(price) ? 0 : price;
  
  // Remove currency symbols, commas, and any non-numeric/decimal characters
  const cleanValue = price.replace(/[^0-9.-]+/g, "");
  const numericValue = parseFloat(cleanValue);
  
  return isNaN(numericValue) ? 0 : numericValue;
}
