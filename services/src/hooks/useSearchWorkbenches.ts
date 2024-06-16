import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { searchWorkbenches } from '../api/workbench.service';
import { PagedResponse, SearchWorkbenchParams, WorkbenchExtended } from '@hike/types';

export const useSearchWorkbenches = (
  params: SearchWorkbenchParams,
  options?: Omit<UseQueryOptions<PagedResponse<WorkbenchExtended[]>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<PagedResponse<WorkbenchExtended[]>>({
    queryKey: ['searchWorkbenches', params],
    queryFn: () => searchWorkbenches(params),
    ...options
  });
};
