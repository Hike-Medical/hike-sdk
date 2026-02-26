import { createWorkOrders } from '@hike/services';
import type { CreateWorkOrderParams, HikeError, WorkOrderResult } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateWorkOrders = (
  options?: UseMutationOptions<WorkOrderResult[], HikeError<null>, CreateWorkOrderParams>
) =>
  useMutation({
    mutationKey: ['createWorkOrders'],
    mutationFn: async (params) => await createWorkOrders(params),
    ...options
  });
