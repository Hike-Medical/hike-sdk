import { updateTrackingInfo } from '@hike/services';
import { HikeError, SaveTrackingInfoParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseSaveTrackingInfoContext {
  labelId: string;
  body: SaveTrackingInfoParams;
}

export const useUpdateTrackingInfo = (
  options?: UseMutationOptions<void, HikeError<null>, UseSaveTrackingInfoContext>
) =>
  useMutation({
    mutationKey: ['updateTrackingInfo'],
    mutationFn: async ({ labelId, body }) => await updateTrackingInfo(labelId, body),
    ...options
  });
