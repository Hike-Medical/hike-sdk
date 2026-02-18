import { getWorkbenchComplete } from '@hike/services';
import { GetCompleteWorkbenchParams, HikeError, WorkbenchExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetWorkbenchOptions
  extends Omit<UseQueryOptions<WorkbenchExtended, HikeError<null>>, 'queryFn' | 'queryKey'> {
  workbenchId: string;
  params?: GetCompleteWorkbenchParams;
  queryKey?: QueryKey;
}

export const useGetCompleteWorkbench = ({ workbenchId, params, queryKey = [], ...options }: UseGetWorkbenchOptions) =>
  useQuery<WorkbenchExtended, HikeError<null>>({
    queryKey: ['workbenchId', workbenchId, params, queryKey],
    queryFn: async () => await getWorkbenchComplete(workbenchId, params),
    ...options
  });
