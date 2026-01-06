/**
 * Tags used for categorizing workflows that need review
 */
export const REVIEW_TAGS = {
  MISSING_CERTIFYING_PHYSICIAN: 'Add Missing Certifying Physician Info',
  MISSING_PRESCRIBER: 'Add Missing Prescriber Information',
  MISSING_PATIENT: 'Add Missing Patient Information',
  PRESCRIPTION_INCOMPLETE: 'Prescription Incomplete',
  FIX_FAX_NUMBER: 'Fix fax number',
  UNCERTAIN_DOC_TYPE: 'Uncertain doc type',
  OFFICE_NOTE: 'Unresolved Office Note'
} as const;

export type ReviewTagKey = keyof typeof REVIEW_TAGS;
export type ReviewTagValue = (typeof REVIEW_TAGS)[ReviewTagKey];
