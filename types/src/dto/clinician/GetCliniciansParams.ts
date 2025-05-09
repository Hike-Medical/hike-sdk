import type { PagedParams } from '../PagedParams';

export interface GetCliniciansParams extends PagedParams {
  filter?: Partial<Record<'id' | 'name' | 'email', string>>;
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
}
