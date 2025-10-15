/**
 * Internal company slugs that are considered "inside clinic" orders
 * Orders from these companies are not considered "outside clinic"
 */
export const INTERNAL_COMPANY_SLUGS = new Set(['cpo', 'hike']);

/**
 * Check if a company represents an outside clinic order
 * An "outside clinic" is a clinic that is not Hike, CPO that has a company.preferences key
 * inside the json called "clinicalCustomization"
 * @param companySlug - The company slug to check
 * @param companyPreferences - The company preferences JSON object
 * @returns true if the company is outside clinic (has clinicalCustomization preference)
 */
export const isOutsideClinic = (companySlug?: string | null, companyPreferences?: any): boolean => {
  // If no company slug, not outside clinic
  if (!companySlug) {
    return false;
  }

  // Internal companies (Hike, CPO) are never outside clinic
  if (INTERNAL_COMPANY_SLUGS.has(companySlug.toLowerCase())) {
    return false;
  }

  // For other companies, check if they have clinicalCustomization in preferences
  return companyPreferences?.clinicalCustomization !== undefined;
};
