import { Workbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getWorkbench } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetWorkbenchOptions
  extends Omit<UseQueryOptions<Workbench, HikeError<null>>, 'queryFn' | 'queryKey'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGetWorkbench = ({ workbenchId, queryKey = [], ...options }: useGetWorkbenchOptions) =>
  useQuery<Workbench, HikeError<null>>({
    queryKey: ['workbenchId', workbenchId, queryKey],
    queryFn: async () => await getWorkbench(workbenchId),
    ...options
  });
