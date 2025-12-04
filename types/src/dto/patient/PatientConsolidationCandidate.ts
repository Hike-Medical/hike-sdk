import type { PatientConsolidationConfidence } from './PatientConsolidationConfidence';

export interface PatientConsolidationCandidate {
  candidatePatientId: string;
  confidence: PatientConsolidationConfidence;
  orderCount: number;
  lastOrderDate?: string;
}

