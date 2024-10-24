export interface ProcessedRecord {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  employeeId: string;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  jobFunction?: string | null;
  facilityName?: string | null;
  facilityAddress1?: string | null;
  facilityAddress2?: string | null;
  facilityCity?: string | null;
  facilityState?: string | null;
  facilityZip?: string | null;
  personalAddress1?: string | null;
  personalAddress2?: string | null;
  personalCity?: string | null;
  personalState?: string | null;
  personalZip?: string | null;
  department?: string | null;
  site?: string | null;
}
