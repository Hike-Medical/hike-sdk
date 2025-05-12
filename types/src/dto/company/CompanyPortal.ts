import { isType } from '../../guards/isType';

/**
 * The type of portal for a company.
 *
 * @note
 * Type-safe union and runtime representation are both available.
 */
export const CompanyPortal = {
  clinical: 'clinical',
  employer: 'employer',
  operations: 'operations'
} as const;

/**
 * The type of portal for a company.
 */
export type CompanyPortal = (typeof CompanyPortal)[keyof typeof CompanyPortal];

/**
 * Check if a value is a valid company portal.
 */
export const isCompanyPortal = isType(CompanyPortal);
