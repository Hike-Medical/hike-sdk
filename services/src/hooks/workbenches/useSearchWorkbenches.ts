import { PagedResponse, SearchWorkbenchParams, WorkbenchExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { searchWorkbenches } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export interface UseSearchWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkbenchExtended[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
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
