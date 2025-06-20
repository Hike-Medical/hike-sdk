/**
 * Represents a CSV record for an appointment report.
 */
export interface AppointmentCsvRecord {
  'Patient ID': string;
  'Patient Name'?: string | null;
  'Patient First Name'?: string | null;
  'Patient Middle Name'?: string | null;
  'Patient Last Name'?: string | null;
  'Patient Height'?: string | null;
  'Patient Weight'?: string | null;
  Gender?: string | null;
  DOB?: string | null;
  'Email Address'?: string | null;
  'Phone Number'?: string | null;
  'Patient Address 1'?: string | null;
  'Patient Address 2'?: string | null;
  'Patient City'?: string | null;
  'Patient State'?: string | null;
  'Patient Zip'?: string | null;
  'Patient City State Zip'?: string | null;
  'Patient Country'?: string | null;
  Type?: string | null;
  'Device Type'?: string | null;
  'Device Type Side'?: string | null;
  'Device Type Upper/Lower'?: string | null;
  'Appt Date'?: string | null;
  'Start Time, Sortable'?: string | null;
  'Appt Type'?: string | null;
  Status?: string | null;
  'Appt For'?: string | null;
  'Referring Physician'?: string | null;
  'Referring Physician NPI'?: string | null;
  'PCP Physician'?: string | null;
  'PCP Physician NPI'?: string | null;
  'Primary Dx Code'?: string | null;
  'Primary Dx Date'?: string | null;
  'Visit Type'?: string | null;
  'Visit Date'?: string | null;
  Facility?: string | null;
  Location?: string | null;
  'Treating Practitioner'?: string | null;
  'Rx Date'?: string | null;
  'Rx Status'?: string | null;
  'Primary Insurance'?: string | null;
  'Secondary Insurance'?: string | null;
  Comments?: string | null;
  'Created Date'?: string | null;
}
