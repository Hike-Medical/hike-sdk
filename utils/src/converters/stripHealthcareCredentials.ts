import { HEALTHCARE_CREDENTIAL } from '@hike/types';

/**
 * Removes healthcare credentials from a name.
 */
export const stripHealthcareCredentials = (name: string) =>
  name
    .trim()
    .split(/[\s+,-]+/)
    .filter((token, index) => {
      if (index === 0) return true;
      const normalized = token.replace(/^[.,;:()]+|[.,;:()]+$/g, '').toUpperCase();
      return !HEALTHCARE_CREDENTIAL.has(normalized);
    })
    .join(' ')
    .replace(/,\s*$/, '');
