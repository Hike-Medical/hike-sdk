import { describe, expect, it } from '@jest/globals';
import { formatCurrency } from '../src/converters/formatCurrency';

describe('formatCurrency', () => {
  it('should format currency with two decimal places', () => {
    const value = 1234.56;
    const currencyCode = 'USD';
    const rounded = false;

    const formatted = formatCurrency(value, currencyCode, rounded, 'en-US');

    expect(formatted).toBe('$1,234.56');
  });

  it('should format currency without decimal places when rounded is true', () => {
    const value = 1234.56;
    const rounded = true;

    const formatted = formatCurrency(value, 'USD', rounded, 'en-US');
    const formatted2 = formatCurrency(value, 'EUR', rounded, 'de-DE');
    const formatted3 = formatCurrency(value, 'THB', rounded, 'de-DE');

    expect(formatted).toBe('$1,235');
    expect(formatted2).toBe('1.235 €');
    expect(formatted3).toBe('1.235 ฿');
  });

  it('should handle different currency codes', () => {
    const value = 7890.12;

    const currencyCodes = ['USD', 'EUR', 'GBP', 'THB'];
    const expectedFormats = ['$7,890.12', '€7,890.12', '£7,890.12', '฿7,890.12'];

    const rounded = false;

    currencyCodes.forEach((currencyCode, index) => {
      const formatted = formatCurrency(value, currencyCode, rounded, 'en-US');
      expect(formatted).toBe(expectedFormats[index]);
    });
  });

  it('should reuse formatter for the same currency and rounding option', () => {
    const value1 = 999.99;
    const value2 = 1234.56;
    const currencyCode = 'USD';
    const rounded = false;

    const formatted1 = formatCurrency(value1, currencyCode, rounded, 'en-US');
    const formatted2 = formatCurrency(value2, currencyCode, rounded, 'en-US');

    expect(formatted1).toBe('$999.99');
    expect(formatted2).toBe('$1,234.56');
  });

  it('should use user locale for foreign currency for Germans', () => {
    const value1 = 999.99;
    const value2 = 1234.56;

    const formattedEur1 = formatCurrency(value1, 'EUR', false, 'de-DE');
    const formattedEur2 = formatCurrency(value2, 'EUR', false, 'de-DE');
    const formattedThb1 = formatCurrency(value1, 'THB', false, 'de-DE');
    const formattedThb2 = formatCurrency(value2, 'THB', false, 'de-DE');
    const formattedUsd1 = formatCurrency(value1, 'USD', false, 'de-DE');
    const formattedUsd2 = formatCurrency(value2, 'USD', false, 'de-DE');

    expect(formattedEur1).toBe('999,99 €');
    expect(formattedEur2).toBe('1.234,56 €');
    expect(formattedThb1).toBe('999,99 ฿');
    expect(formattedThb2).toBe('1.234,56 ฿');
    expect(formattedUsd1).toBe('999,99 $');
    expect(formattedUsd2).toBe('1.234,56 $');
  });

  it('should use user locale for foreign currency for Americans', () => {
    const value1 = 999.99;
    const value2 = 1234.56;

    const formattedEur1 = formatCurrency(value1, 'EUR', false, 'en-US');
    const formattedEur2 = formatCurrency(value2, 'EUR', false, 'en-US');
    const formattedThb1 = formatCurrency(value1, 'THB', false, 'en-US');
    const formattedThb2 = formatCurrency(value2, 'THB', false, 'en-US');
    const formattedUsd1 = formatCurrency(value1, 'USD', false, 'en-US');
    const formattedUsd2 = formatCurrency(value2, 'USD', false, 'en-US');

    expect(formattedEur1).toBe('€999.99');
    expect(formattedEur2).toBe('€1,234.56');
    expect(formattedThb1).toBe('฿999.99');
    expect(formattedThb2).toBe('฿1,234.56');
    expect(formattedUsd1).toBe('$999.99');
    expect(formattedUsd2).toBe('$1,234.56');
  });

  it('should default format currency to USD and unrounded assuming server is en-US', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});
