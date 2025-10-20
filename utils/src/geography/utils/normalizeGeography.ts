import { COUNTRY_VARIATIONS, geography } from '..';

export interface GeographyInput {
  stateOrProvince?: string | null;
  country?: string | null;
}

export interface NormalizedGeography {
  stateOrProvince: string;
  country: string;
}

/**
 * Normalizes a country name or code to ISO 3166-1 alpha-2 format
 */
const normalizeCountry = (country?: string | null): string =>
  country ? (COUNTRY_VARIATIONS[country.trim().toLowerCase().replace(/\./g, '')] ?? country.trim()) : 'US';

/**
 * Normalizes a state/province name or abbreviation to its standard abbreviation
 */
const normalizeStateOrProvince = (stateOrProvince: string, countryCode: string): string => {
  const data = geography[countryCode] as Record<string, string> | undefined;

  if (!data) {
    return stateOrProvince;
  }

  const sanitized = stateOrProvince.toLowerCase().replace(/\./g, '').trim();

  // Find by full name or return abbreviation if already abbreviated
  return (
    Object.entries(data).find(([name]) => name.toLowerCase() === sanitized)?.[1] ??
    Object.values(data)
      .find((abbr) => abbr.toLowerCase() === sanitized)
      ?.toUpperCase() ??
    stateOrProvince
  );
};

/**
 * Normalizes geography data (country and state/province) to standard formats
 *
 * @param input - Geography data with optional state/province and country
 * @returns Normalized geography with 2-letter country code and state abbreviation
 *
 * @example
 * normalizeGeography({ stateOrProvince: 'California', country: 'USA' })
 * // { stateOrProvince: 'CA', country: 'US' }
 *
 * normalizeGeography({ stateOrProvince: 'New York' })
 * // { stateOrProvince: 'NY', country: 'US' }
 *
 * normalizeGeography({ stateOrProvince: 'ca', country: 'United States' })
 * // { stateOrProvince: 'CA', country: 'US' }
 */
export const normalizeGeography = ({ stateOrProvince, country }: GeographyInput): NormalizedGeography => {
  const normalizedCountry = normalizeCountry(country);
  const normalizedStateOrProvince = normalizeStateOrProvince(stateOrProvince ?? '', normalizedCountry);

  return {
    stateOrProvince: normalizedStateOrProvince,
    country: normalizedCountry
  };
};
