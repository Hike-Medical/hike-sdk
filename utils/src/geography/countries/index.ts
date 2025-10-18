import { STATES_OR_PROVINCES as US_STATES } from './US';

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
 * Geography data indexed by ISO 3166-1 alpha-2 country codes
 * Maps country code → state/province name → abbreviation
 */
export const geography = {
  US: US_STATES
};
