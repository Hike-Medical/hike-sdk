import { activateFacility, deactivateFacility } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseToggleFacilityOptions {
  facilityId: string;
  active: boolean;
}

export const useToggleFacility = (options?: UseMutationOptions<void, HikeError<null>, UseToggleFacilityOptions>) =>
  useMutation({
    mutationKey: ['toggleFacility'],
    mutationFn: async ({ facilityId, active }) =>
      active ? await activateFacility(facilityId) : await deactivateFacility(facilityId),
    ...options
  });
