import { ModifyOrderAuthorizationParams, OrderExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { modifyOrderAuthorization } from '../../api/order.service';
import { HikeError } from '../../errors/HikeError';

export const useModifyOrderAuthorization = (
  mutationOptions?: UseMutationOptions<OrderExtended, HikeError<null>, ModifyOrderAuthorizationParams>
) => {
  return useMutation({
    mutationKey: ['modifyOrder'],
    mutationFn: async (params: ModifyOrderAuthorizationParams) => await modifyOrderAuthorization(params),
    ...mutationOptions
  });
};
