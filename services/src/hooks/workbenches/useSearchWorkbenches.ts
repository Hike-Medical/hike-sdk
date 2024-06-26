import { PagedResponse, SearchWorkbenchParams, WorkbenchExtended } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { searchWorkbenches } from '../../api/workbench.service';

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
