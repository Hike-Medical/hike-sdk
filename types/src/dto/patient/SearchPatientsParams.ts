import type { PagedParams } from '../PagedParams';

export interface SearchPatientsParams extends PagedParams {
  firstName?: string;
  lastName?: string;
  externalId?: string;
  sortBy?: 'firstName' | 'lastName' | 'birthDate';
}
