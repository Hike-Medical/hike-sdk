import { ModifyOrderAuthorizationParams, OrderExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { modifyOrderAuthorization } from '../../api/order.service';
import { HikeError } from '../../errors/HikeError';

export const useModifyOrderAuthorization = (
  mutationOptions?: UseMutationOptions<OrderExtended, HikeError<null>, ModifyOrderAuthorizationParams>
) =>
  useMutation({
    mutationKey: ['modifyOrder'],
    mutationFn: async (params) => await modifyOrderAuthorization(params),
    ...mutationOptions
  });
