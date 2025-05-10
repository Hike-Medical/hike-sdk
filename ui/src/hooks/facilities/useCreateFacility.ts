import { HikeError, createFacility } from '@hike/services';
import { CreateFacilityParams, FacilityExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateFacilityContext {
  body: CreateFacilityParams;
}

export const useCreateFacility = (
  options?: UseMutationOptions<FacilityExtended, HikeError<null>, CreateFacilityContext>
) =>
  useMutation({
    mutationKey: ['createFacility'],
    mutationFn: async ({ body }) => await createFacility(body),
    ...options
  });
