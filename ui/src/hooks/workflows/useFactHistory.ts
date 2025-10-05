import { getFactHistory } from '@hike/services';
import type { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface FactHistoryItem {
  id: string;
  key: string;
  value: any;
  source: string;
  sourceAttachmentId?: string;
  metadata?: any;
  version: number;
  acquiredAt: string;
  updatedAt: string;
  active: boolean;
}

interface UseFactHistoryOptions
  extends Omit<UseQueryOptions<FactHistoryItem[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  factKey: string;
  queryKey?: QueryKey;
}

export const useFactHistory = ({ workflowId, factKey, queryKey = [], ...options }: UseFactHistoryOptions) =>
  useQuery({
    queryKey: ['factHistory', workflowId, factKey, queryKey],
    queryFn: async () => await getFactHistory(workflowId, factKey),
    ...options
  });
