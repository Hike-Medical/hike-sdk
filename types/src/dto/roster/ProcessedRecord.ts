export interface ProcessedRecord {
  firstName: string;
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
  department?: string | null;
  site?: string | null;
}
