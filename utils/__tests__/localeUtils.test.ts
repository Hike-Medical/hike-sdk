import { describe, expect, test } from '@jest/globals';
import { selectPreferredLocale } from '../src/helpers/localeUtils';

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'fr-CA'];
const DEFAULT_LOCALE = 'en';

describe('localeUtils tests', () => {
  describe('selectPreferredLocale', () => {
    test('returns default locale when header is null', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: null,
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe(DEFAULT_LOCALE);
    });

    test('returns base match for supported locale', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'en-GB',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('en');
    });

    test('returns highest quality match', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'fr-CA;q=0.8, es;q=0.9',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('es');
    });

    test('returns default locale for unsupported locale', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'de-DE',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe(DEFAULT_LOCALE);
    });

    test('returns first supported locale in mixed list', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'de-DE, en-GB;q=0.7, fr-FR;q=0.8',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('fr');
    });

    test('handles empty quality values gracefully', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'es;q=, fr-CA',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('es');
    });

    test('ignores empty locale entries', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'es, , fr-CA',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('es');
    });

    test('returns default locale when all locales are unsupported', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'de-DE, it-IT',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe(DEFAULT_LOCALE);
    });

    test('returns first locale when multiple supported locales have the same quality', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'fr-CA;q=0.8, es;q=0.8',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('fr-CA');
    });

    test('handles malformed quality values', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: 'es;q=abc, fr-CA;q=0.9',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe('fr-CA');
    });

    test('returns default locale for empty string', () => {
      expect(
        selectPreferredLocale({
          acceptLanguage: '',
          supportedLocales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE
        })
      ).toBe(DEFAULT_LOCALE);
    });
  });
});
