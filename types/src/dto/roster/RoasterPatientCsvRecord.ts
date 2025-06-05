/**
 * Represents a CSV record for an roster import.
 */
export interface RoasterPatientCsvRecord {
  'Employee ID': string;
  'Full Name'?: string | null;
  'First Name'?: string | null;
  'Middle Name'?: string | null;
  'Last Name'?: string | null;
  Gender?: string | null;
  DOB?: string | null;
  'Email Address'?: string | null;
  'Phone Number'?: string | null;
  'Address 1'?: string | null;
  'Address 2'?: string | null;
  City?: string | null;
  State?: string | null;
  Zip?: string | null;
  'City State Zip'?: string | null;
  Country?: string | null;
  'Job Title'?: string | null;
  Department?: string | null;
  Facility?: string | null;
  'Facility Address 1'?: string | null;
  'Facility Address 2'?: string | null;
  'Facility City'?: string | null;
  'Facility State'?: string | null;
  'Facility Zip'?: string | null;
  'Facility Country'?: string | null;
  Site?: string | null;
  'Site Address 1'?: string | null;
  'Site Address 2'?: string | null;
  'Site City'?: string | null;
  'Site State'?: string | null;
  'Site Zip'?: string | null;
  'Site Country'?: string | null;
}
