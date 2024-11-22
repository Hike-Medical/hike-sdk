import { DetectionStatusResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getDetectionStatusForWorkbench } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetDetectionStatusOptions
  extends Omit<UseQueryOptions<DetectionStatusResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGetDetectionStatus = ({ workbenchId, queryKey = [], ...options }: useGetDetectionStatusOptions) =>
  useQuery<DetectionStatusResponse, HikeError<null>>({
    queryKey: ['workbenchId', workbenchId, queryKey],
    queryFn: async () => await getDetectionStatusForWorkbench(workbenchId),
    ...options
  });
