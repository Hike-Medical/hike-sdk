import type { PagedParams } from '../PagedParams';

export interface GetPatientsParams extends PagedParams {
  hasEvaluation?: boolean;
  sortBy?: 'firstName' | 'lastName' | 'birthDate' | 'createdAt' | 'updatedAt';
}
