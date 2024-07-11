import { AugmentMedia, UpdateAugmentMedia } from '@hike/types';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { updateAugmentMedia } from '../../api/augment.service';

export const useUpdateAugmentMedia = (
  mediaId: string,
  mutationOptions?: MutationOptions<AugmentMedia, Error, UpdateAugmentMedia, unknown>
) => {
  return useMutation({
    mutationKey: ['augment', 'media', mediaId],
    mutationFn: async (updateAugmentMediaDto: UpdateAugmentMedia) => {
      return await updateAugmentMedia(mediaId, updateAugmentMediaDto);
    },
    ...mutationOptions
  });
};
