interface SelectPreferredLocaleParams {
  acceptLanguage?: string | null;
  supportedLocales: string[];
  defaultLocale: string;
}

/**
 * Selects the preferred locale based on the 'Accept-Language' header.
 *
 * @param [acceptLanguage] - The 'Accept-Language' header value.
 */
export const selectPreferredLocale = ({
  acceptLanguage,
  supportedLocales,
  defaultLocale
}: SelectPreferredLocaleParams): string =>
  acceptLanguage
    ? parseLanguagePreferences(acceptLanguage, defaultLocale)
        .flatMap(({ locale }) => [locale, locale?.split('-')[0]])
        .find((locale, index, array) => {
          // Prioritize full matches first
          if (supportedLocales.includes(locale ?? '')) {
            return true;
          }
          // Check if it's a base match only if no full match is found
          return index === array.length - 1 && supportedLocales.includes(locale?.split('-')[0] ?? '');
        }) || defaultLocale
    : defaultLocale;

// Parses Quality: https://developer.mozilla.org/en-US/docs/Glossary/Quality_values
const parseLanguagePreferences = (header: string, defaultLocale: string) =>
  header
    .split(',')
    .map((part) => part.trim())
    .filter((item) => item)
    .map((part) => {
      const [locale, qPart] = part.split(';q=').map((item) => item.trim());

      if (!locale) {
        return { locale: defaultLocale, quality: 1.0 };
      }

      const quality = qPart && !isNaN(parseFloat(qPart)) ? parseFloat(qPart) : 0;
      return { locale, quality };
    })
    .sort((a, b) => b.quality - a.quality);
