export interface MbiLookupRequest {
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  npi?: string;
  organizationName?: string;
}

export interface MbiLookupResponse {
  mbi?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  controlNumber: string;
  eligibilitySearchId?: string;
}

export interface MbiLookupResult {
  response: MbiLookupResponse;
}

