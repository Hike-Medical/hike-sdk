import { PagedResponse, SearchWorkbenchParams, WorkbenchExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { searchWorkbenches } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseSearchWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkbenchExtended[]>, ResponseError<null>>, 'queryFn' | 'queryKey'> {
  params: SearchWorkbenchParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useSearchWorkbenches = ({ params, companyIds, queryKey = [], ...options }: UseSearchWorkbenchesOptions) =>
  useQuery({
    queryKey: ['searchWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await searchWorkbenches(params, companyIds),
    ...options
  });
