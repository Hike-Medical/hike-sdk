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
) => {
  return useMutation({
    mutationKey: ['updateTrackingInfo'],
    mutationFn: async ({ labelId, body }: UseSaveTrackingInfoContext) => await updateTrackingInfo(labelId, body),
    ...mutationOptions
  });
};
