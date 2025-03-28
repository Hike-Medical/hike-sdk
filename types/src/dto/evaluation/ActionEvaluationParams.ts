/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface ActionEvaluationParams {
  evaluationId: string;
  notes?: string;
  companyIds?: string[];
}
