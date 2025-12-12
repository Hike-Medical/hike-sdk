export type EligibilityReason =
  | 'NO_USER'
  | 'NOT_ACTIVE'
  | 'HAS_PATIENT_ROLE'
  | 'NOT_IN_ROSTER'
  | 'ROSTER_EMAIL_MATCH'
  | 'ROSTER_PHONE_MATCH'
  | 'EXTERNAL_ID_MATCH'
  | 'NO_AUTH_NEEDED';
