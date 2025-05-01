import { HikeError, updateFacility } from '@hike/services';
import { FacilityExtended, UpdateFacilityParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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
