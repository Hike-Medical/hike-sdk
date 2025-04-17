import { FacilityExtended, UpdateFacilityParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateFacility } from '../../api/facility.service';
import { HikeError } from '../../errors/HikeError';

interface UpdateFacilityContext {
  facilityId: string;
  body: UpdateFacilityParams;
}

export const useUpdateFacility = (
  options?: UseMutationOptions<FacilityExtended, HikeError<null>, UpdateFacilityContext>
) =>
  useMutation({
    mutationKey: ['updateFacility'],
    mutationFn: async ({ facilityId, body }) => await updateFacility(facilityId, body),
    ...options
  });
