import { PagedParams } from '../PagedParams';

export interface GetPastTenseStationsParams extends PagedParams {
  previousStatus: string;
  searchQuery?: string;
}
