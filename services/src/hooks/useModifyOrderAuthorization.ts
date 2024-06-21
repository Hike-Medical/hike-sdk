import { OrderAuthorizationStatus, OrderExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { modifyOrderAuthorization } from '../api/order.service';

interface ModifyOrderAuthorizationParams {
  orderId: string;
  authorizationStatus: OrderAuthorizationStatus;
  jwtToken?: string;
}

export const useModifyOrderAuthorization = (
  mutationOptions?: UseMutationOptions<OrderExtended, Error, ModifyOrderAuthorizationParams>
) => {
  return useMutation({
    mutationKey: ['modifyOrder'],
    mutationFn: async (params: ModifyOrderAuthorizationParams) => {
      return await modifyOrderAuthorization(params.orderId, params.authorizationStatus, params.jwtToken);
    },
    ...mutationOptions
  });
};
