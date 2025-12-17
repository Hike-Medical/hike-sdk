import { getWorkflowDataset } from '@hike/services';
import { HikeError, WorkflowDatasetResponse, WorkflowDatasetStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseWorkflowDatasetOptions
  extends Omit<UseQueryOptions<WorkflowDatasetResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  status: WorkflowDatasetStatus;
  perPage?: number;
}

export const useWorkflowDataset = ({ status, perPage = 4, ...queryOptions }: UseWorkflowDatasetOptions) =>
  useQuery({
    queryKey: ['workflowDataset', status, perPage],
    queryFn: async () => await getWorkflowDataset({ status, perPage }),
    ...queryOptions
  });

