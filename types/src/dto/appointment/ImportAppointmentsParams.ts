import { AppointmentCsvRecord } from './AppointmentCsvRecord';

export interface ImportAppointmentsParams {
  fileKey: string;
  columnMapping: Partial<Record<keyof AppointmentCsvRecord, string>>;
  timeZone?: string;
}
