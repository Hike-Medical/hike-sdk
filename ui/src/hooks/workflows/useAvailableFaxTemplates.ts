import { getAvailableFaxTemplates } from '@hike/services';
import type { GetAvailableFaxTemplatesResponse, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAvailableFaxTemplatesOptions
  extends Omit<UseQueryOptions<GetAvailableFaxTemplatesResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  queryKey?: QueryKey;
}

export const useAvailableFaxTemplates = ({
  workflowId,
  queryKey = [],
  ...options
}: UseAvailableFaxTemplatesOptions) =>
  useQuery({
    queryKey: ['availableFaxTemplates', workflowId, queryKey],
    queryFn: async () => await getAvailableFaxTemplates(workflowId),
    ...options
  });
