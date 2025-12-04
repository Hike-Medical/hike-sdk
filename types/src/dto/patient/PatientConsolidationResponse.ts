import type { PatientConsolidationMigratedRecords } from './PatientConsolidationMigratedRecords';

export interface PatientConsolidationResponse {
  success: boolean;
  migratedRecords: PatientConsolidationMigratedRecords;
  fromPatientId: string;
  toPatientId: string;
}

