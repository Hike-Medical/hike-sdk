import { deleteFacility } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface DeleteFacilityRequest {
  facilityId: string;
}

export const useDeleteFacility = (
  options?: Omit<UseMutationOptions<void, HikeError<null>, DeleteFacilityRequest>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: async ({ facilityId }: DeleteFacilityRequest) => await deleteFacility(facilityId),
    ...options
  });
