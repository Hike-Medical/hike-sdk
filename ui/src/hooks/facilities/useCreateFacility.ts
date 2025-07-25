import { createFacility } from '@hike/services';
import { CreateFacilityParams, FacilityExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateFacility = (
  options?: UseMutationOptions<FacilityExtended, HikeError<null>, CreateFacilityParams>
) =>
  useMutation({
    mutationKey: ['createFacility'],
    mutationFn: async (params) => await createFacility(params),
    ...options
  });
