/**
 * Internal company slugs that are considered "inside clinic" orders
 * Orders from these companies are not considered "outside clinic"
 */
export const INTERNAL_COMPANY_SLUGS = new Set(['cpo', 'hike']);

/**
 * Exception list of company slugs that are always considered "outside clinic" orders (marked blue)
 * These companies are prioritized even if they don't have clinicalCustomization in preferences
 */
export const OUTSIDE_CLINIC_EXCEPTION_SLUGS = new Set(['orthofeet']);

/**
 * Check if a company represents an outside clinic order (marked blue)
 * Outside clinic orders include:
 * - All non-rushed clinical orders (companies with clinicalCustomization in preferences)
 * - Exception companies (e.g., Orthofeet)
 *
 * @param companySlug - The company slug to check
 * @param companyPreferences - The company preferences JSON object
 * @returns true if the company is outside clinic
 */
export const isOutsideClinic = (companySlug?: string | null, companyPreferences?: any): boolean => {
  // If no company slug, not outside clinic
  if (!companySlug) {
    return false;
  }

  const slugLower = companySlug.toLowerCase();

  // Internal companies (Hike, CPO) are never outside clinic
  if (INTERNAL_COMPANY_SLUGS.has(slugLower)) {
    return false;
  }

  // Exception companies are always considered outside clinic
  if (OUTSIDE_CLINIC_EXCEPTION_SLUGS.has(slugLower)) {
    return true;
  }

  // For other companies, check if they have clinicalCustomization in preferences
  return companyPreferences?.clinicalCustomization !== undefined;
};
