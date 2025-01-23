export interface DeactivateRosterResponse {
  parsed: number;
  parsedWithIds: number;
  storedWithIds: number;
  patientsChecked: number;
  patientsDeactivated: string[];
  patientsDeleted: string[];
}
