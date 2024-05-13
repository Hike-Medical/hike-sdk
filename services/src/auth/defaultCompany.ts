import { CompanyRole } from '@hike/types';

/**
 * Returns the first company user has elevated access for.
 */
export const defaultCompany = (companies: Record<string, CompanyRole>) =>
  Object.entries(companies || {}).find(([, role]) => role !== 'PATIENT')?.[0] || null;
