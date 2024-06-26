type FormatterCache = Record<string, Intl.NumberFormat>;

const currencyFormatters: FormatterCache = {};
const currencyFormattersRounded: FormatterCache = {};

const getFormatter = (currencyCode = 'USD', rounded = false, locale: string | null = null): Intl.NumberFormat => {
  const resolvedLocale = locale ?? new Intl.NumberFormat().resolvedOptions().locale;
  const cache = rounded ? currencyFormattersRounded : currencyFormatters;
  const key = `${currencyCode}:${resolvedLocale}`;

  if (!cache[key]) {
    cache[key] = new Intl.NumberFormat(resolvedLocale, {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: rounded ? 0 : 2,
      maximumFractionDigits: rounded ? 0 : 2
    });
  }

  // Assert value always defined since above condition handles
  return cache[key]!;
};

/**
 * Format a numeric value as currency.
 */
export const formatCurrency = (
  value: number,
  currencyCode?: string | null,
  rounded?: boolean,
  locale?: string
): string => getFormatter(currencyCode ?? undefined, rounded, locale).format(value);
