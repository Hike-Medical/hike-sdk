import { createFacility } from '@hike/services';
import { CreateFacilityParams, Facility, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateFacility = (
  options?: Omit<UseMutationOptions<Facility, HikeError<null>, CreateFacilityParams>, 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['createFacility'],
    mutationFn: async (params) => await createFacility(params),
    ...options
  });
