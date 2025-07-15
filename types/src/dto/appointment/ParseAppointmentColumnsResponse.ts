import { AppointmentCsvRecord } from './AppointmentCsvRecord';

export interface ParseAppointmentColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof AppointmentCsvRecord, string>>;
}
