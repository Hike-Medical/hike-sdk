import { GetRatesResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GetRatesOrLabels, getRateEstimates } from '../api/shipping.service';

export const useGetShippingRates = (
  mutationOptions?: UseMutationOptions<GetRatesResponse[], Error, GetRatesOrLabels>
) => {
  return useMutation({
    mutationKey: ['getShippingRates'],
    mutationFn: async (body: GetRatesOrLabels) => await getRateEstimates(body),
    ...mutationOptions
  });
};
