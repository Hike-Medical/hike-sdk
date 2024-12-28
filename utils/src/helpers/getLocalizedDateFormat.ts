/**
 * Generates a locale-aware date format string (e.g., "MM / DD / YYYY") based on the user's locale
 * or a specified locale. Allows customization of the separator between date components and adding spaces around the separator.
 *
 * @param {object} options - Options for customizing the date format.
 * @param {string} [options.locale] - Locale string (e.g., "en-US", "en-GB"). Defaults to the user's browser locale.
 * @param {string} [options.separator] - Separator string (e.g., "/", "-", " | "). Defaults to the locale's separator.
 * @param {boolean} [options.addSpaces] - Whether to add spaces around the separator. Defaults to `false`.
 * @returns {string} A date format string representing the specified or user's locale with the chosen separator.
 */
export const getLocalizedDateFormat = (
  options: { locale?: string; separator?: string; addSpaces?: boolean } = {}
): string => {
  const { locale, separator, addSpaces = false } = options;

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const formatMap: Record<string, string> = {
    year: 'YYYY',
    month: 'MM',
    day: 'DD'
  };

  // Extract the default separator from a test date
  const parts = formatter.formatToParts(new Date(2000, 11, 31));

  // Use the provided separator or fallback to the default
  const defaultSeparator = parts.find((part) => part.type === 'literal')?.value.trim();
  let usedSeparator = separator ?? defaultSeparator ?? '/';

  if (addSpaces) {
    usedSeparator = ` ${usedSeparator} `;
  }

  return parts
    .filter((part) => formatMap[part.type])
    .map((part) => formatMap[part.type])
    .join(usedSeparator);
};
