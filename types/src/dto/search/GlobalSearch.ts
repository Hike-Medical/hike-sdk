import type { Evaluation, Patient } from '../../../prisma/index';
import type { EvaluationStatus } from '../evaluation/GetEvaluationsByStatusParams';
import type { PagedParams } from '../PagedParams';

export type GlobalSearchResponse = {
  patients: Patient[];
  evaluations: Evaluation[];
};

export interface GlobalSearchParams extends PagedParams {
  term: string;
  status?: EvaluationStatus;
}
