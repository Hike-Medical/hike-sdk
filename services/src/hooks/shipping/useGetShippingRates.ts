import { GetRatesResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GetRatesOrLabels, getRateEstimates } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetShippingRates = (
  mutationOptions?: UseMutationOptions<GetRatesResponse[], ResponseError<null>, GetRatesOrLabels>
) => {
  return useMutation({
    mutationKey: ['getShippingRates'],
    mutationFn: async (body: GetRatesOrLabels) => await getRateEstimates(body),
    ...mutationOptions
  });
};
