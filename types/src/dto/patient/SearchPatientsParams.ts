import type { PagedParams } from '../PagedParams';

export interface SearchPatientsParams extends PagedParams {
  term: string;
  sortBy?: 'firstName' | 'lastName' | 'birthDate';
}
