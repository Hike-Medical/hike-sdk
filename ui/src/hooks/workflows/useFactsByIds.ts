import { getFactsByIds, type FactWithAttachment } from '@hike/services';
import type { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFactsByIdsOptions
  extends Omit<UseQueryOptions<FactWithAttachment[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  factIds: string[];
  queryKey?: QueryKey;
}

export const useFactsByIds = ({ workflowId, factIds, queryKey, ...options }: UseFactsByIdsOptions) => {
  return useQuery({
    queryKey: queryKey || ['workflow', workflowId, 'facts', 'by-ids', factIds],
    queryFn: () => getFactsByIds(workflowId, factIds),
    enabled: !!workflowId && factIds.length > 0,
    ...options
  });
};
