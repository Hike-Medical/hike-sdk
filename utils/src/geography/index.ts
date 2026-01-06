import { STATES_OR_PROVINCES as US_STATES } from './countries/US';

/**
 * Country name variations mapped to ISO 3166-1 alpha-2 codes
 */
export const COUNTRY_VARIATIONS: Record<string, string> = {
  // United States
  'united states': 'US',
  'united states of america': 'US',
  usa: 'US',
  us: 'US',
  'u.s.': 'US',
  'u.s.a.': 'US',
  america: 'US',

  // Canada
  canada: 'CA',
  ca: 'CA',
  can: 'CA'
};

/**
 * Maps ISO 3166-1 alpha-2 country codes to full country names
 */
export const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CA: 'Canada'
};

/**
 * Geography data indexed by ISO 3166-1 alpha-2 country codes
 * Maps country code → state/province name → abbreviation
 */
export const geography = {
  US: US_STATES
};

/**
 * Converts a state/province abbreviation to its full name
 *
 * @param stateCode - The 2-letter state/province abbreviation (e.g., 'CA')
 * @param countryCode - The ISO 3166-1 alpha-2 country code (e.g., 'US')
 * @returns The full state/province name, or the original code if not found
 *
 * @example
 * getStateName('CA', 'US') // 'California'
 * getStateName('NY', 'US') // 'New York'
 */
export const getStateName = (stateCode: string, countryCode: string): string => {
  const stateData = geography[countryCode as keyof typeof geography];
  
  if (!stateData) {
    return stateCode;
  }

  return Object.entries(stateData).find(([, code]) => code === stateCode)?.[0] ?? stateCode;
};

/**
 * Converts an ISO 3166-1 alpha-2 country code to its full name
 *
 * @param countryCode - The 2-letter country code (e.g., 'US')
 * @returns The full country name, or the original code if not found
 *
 * @example
 * getCountryName('US') // 'United States'
 * getCountryName('CA') // 'Canada'
 */
export const getCountryName = (countryCode: string): string => COUNTRY_NAMES[countryCode] ?? countryCode;
