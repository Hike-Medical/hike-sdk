import { HikeError, modifyOrderAuthorization } from '@hike/services';
import { ModifyOrderAuthorizationParams, OrderExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useModifyOrderAuthorization = (
  mutationOptions?: UseMutationOptions<OrderExtended, HikeError<null>, ModifyOrderAuthorizationParams>
) =>
  useMutation({
    mutationKey: ['modifyOrder'],
    mutationFn: async (params) => await modifyOrderAuthorization(params),
    ...mutationOptions
  });
