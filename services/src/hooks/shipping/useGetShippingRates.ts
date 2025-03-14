import { GetRatesResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GetRatesOrLabels, getRateEstimates } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useGetShippingRates = (
  mutationOptions?: UseMutationOptions<GetRatesResponse[], HikeError<null>, GetRatesOrLabels>
) =>
  useMutation({
    mutationKey: ['getShippingRates'],
    mutationFn: async (body) => await getRateEstimates(body),
    ...mutationOptions
  });
