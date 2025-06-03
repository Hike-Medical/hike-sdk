import { updateFacility } from '@hike/services';
import { FacilityExtended, HikeError, UpdateFacilityParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateFacilityOptions {
  facilityId: string;
  body: UpdateFacilityParams;
}

export const useUpdateFacility = (
  options?: UseMutationOptions<FacilityExtended, HikeError<null>, UpdateFacilityOptions>
) =>
  useMutation({
    mutationKey: ['updateFacility'],
    mutationFn: async ({ facilityId, body }) => await updateFacility(facilityId, body),
    ...options
  });
