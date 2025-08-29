export function formatNumber(
  n: number,
  fractionDigits: number = 0,
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);
}
