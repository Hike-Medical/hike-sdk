import type { PagedParams } from '../PagedParams';

export interface GetUsersParams extends PagedParams {
  userIds?: string[];
}
