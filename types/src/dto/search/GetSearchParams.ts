import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from '../evaluation/GetEvaluationsParams';

export interface GetSearchParams extends PagedParams {
  term: string;
  status?: EvaluationStatus;
}
