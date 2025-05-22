import { getDetectionStatusForWorkbench } from '@hike/services';
import { DetectionStatusResponse, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

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
