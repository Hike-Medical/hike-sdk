import { CreateFacilityParams, FacilityExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createFacility } from '../../api/facility.service';
import { HikeError } from '../../errors/HikeError';

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
