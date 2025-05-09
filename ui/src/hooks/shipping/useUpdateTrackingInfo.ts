import { HikeError, updateTrackingInfo } from '@hike/services';
import { SaveTrackingInfoParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseSaveTrackingInfoContext {
  labelId: string;
  body: SaveTrackingInfoParams;
}

export const useUpdateTrackingInfo = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, UseSaveTrackingInfoContext>
) =>
  useMutation({
    mutationKey: ['updateTrackingInfo'],
    mutationFn: async ({ labelId, body }) => await updateTrackingInfo(labelId, body),
    ...mutationOptions
  });
