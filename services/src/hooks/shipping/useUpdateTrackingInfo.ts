import { SaveTrackingInfoParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateTrackingInfo } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

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
