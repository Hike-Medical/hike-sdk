import { AugmentMedia, UpdateAugmentMedia } from '@hike/types';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { updateAugmentMedia } from '../../api/augment.service';

interface UpdateAugmentMediaDto {
  mediaId: string;
  body: UpdateAugmentMedia;
}

export const useUpdateAugmentMedia = (
  mutationOptions?: MutationOptions<AugmentMedia, Error, UpdateAugmentMediaDto, unknown>
) => {
  return useMutation({
    mutationKey: ['updateAugmentMedia'],
    mutationFn: async ({ mediaId, body }: UpdateAugmentMediaDto) => {
      return await updateAugmentMedia(mediaId, body);
    },
    ...mutationOptions
  });
};
