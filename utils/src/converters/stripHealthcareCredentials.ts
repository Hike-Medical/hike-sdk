import { HEALTHCARE_CREDENTIAL } from '@hike/types';

/**
 * Removes healthcare credentials from a name.
 */
export const stripHealthcareCredentials = (name: string, source?: string) =>
  name
    .trim()
    .split(/[\s,]+/)
    .filter((token, index) => {
      if (index === 0) return true;
      const normalized = token.replace(/^[.,;:()]+|[.,;:()]+$/g, '').toUpperCase();
      // this is a workaround to handle data errors in Zoho where the last name field sometimes contains a middle initial plus a title
      // I'm only checking for DPM and MD because there might be plausible last names like IDO, etc.
      if (source === 'ZOHO') {
        const credentialsToCheck = new Set(['DPM', 'MD']);
        return !HEALTHCARE_CREDENTIAL.has(normalized) && !credentialsToCheck.has(normalized.substring(1));
      }
      return !HEALTHCARE_CREDENTIAL.has(normalized);
    })
    .join(' ')
    .replace(/,\s*$/, '');
