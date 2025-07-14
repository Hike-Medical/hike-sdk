import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from '../evaluation/EvaluationStatus';

export interface GetSearchParams extends PagedParams {
  term: string;
  evaluationStatus?: EvaluationStatus;
  assignedOnly?: boolean;
}
