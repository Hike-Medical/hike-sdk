import { modifyOrderAuthorization } from '@hike/services';
import { HikeError, ModifyOrderAuthorizationParams, OrderExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useModifyOrderAuthorization = (
  options?: UseMutationOptions<OrderExtended, HikeError<null>, ModifyOrderAuthorizationParams>
) =>
  useMutation({
    mutationKey: ['modifyOrder'],
    mutationFn: async (params) => await modifyOrderAuthorization(params),
    ...options
  });
