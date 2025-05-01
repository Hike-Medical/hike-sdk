import { HikeError, getWorkbench } from '@hike/services';
import { WorkbenchExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetWorkbenchOptions
  extends Omit<UseQueryOptions<WorkbenchExtended, HikeError<null>>, 'queryFn' | 'queryKey'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGetWorkbench = ({ workbenchId, queryKey = [], ...options }: UseGetWorkbenchOptions) =>
  useQuery<WorkbenchExtended, HikeError<null>>({
    queryKey: ['workbenchId', workbenchId, queryKey],
    queryFn: async () => await getWorkbench(workbenchId),
    ...options
  });
