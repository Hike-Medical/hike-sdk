import { GetRatesOrLabels, getRateEstimates } from '@hike/services';
import { GetRatesResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetShippingRates = (
  options?: UseMutationOptions<GetRatesResponse[], HikeError<null>, GetRatesOrLabels>
) =>
  useMutation({
    mutationKey: ['getShippingRates'],
    mutationFn: async (body) => await getRateEstimates(body),
    ...options
  });
