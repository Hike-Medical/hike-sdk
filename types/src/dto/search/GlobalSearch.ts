import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from '../evaluation/GetEvaluationsByStatusParams';

export interface GlobalSearchParams extends PagedParams {
  term: string;
  status?: EvaluationStatus;
}
