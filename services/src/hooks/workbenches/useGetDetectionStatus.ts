import { DetectionStatusResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getDetectionStatusForWorkbench } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetDetectionStatusOptions
  extends Omit<UseQueryOptions<DetectionStatusResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGetDetectionStatus = ({ workbenchId, queryKey = [], ...options }: UseGetDetectionStatusOptions) =>
  useQuery<DetectionStatusResponse, HikeError<null>>({
    queryKey: ['detectionStatus', workbenchId, queryKey],
    queryFn: async () => await getDetectionStatusForWorkbench(workbenchId),
    ...options
  });
