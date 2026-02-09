import type { PagedParams } from '../../PagedParams';

export interface GetAnodyneProductStylesParams extends PagedParams {
  term?: string;
  categoryId?: string;
  genderValue?: string;
}
