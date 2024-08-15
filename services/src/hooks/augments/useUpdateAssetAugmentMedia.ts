import { AssetAugmentMediaResult, UpdateAssetAugmentMedia } from '@hike/types';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { updateAssetAugmentMedia } from '../../api/augment.service';

interface UpdateAssetAugmentMediaDto {
  mediaId: string;
  body: UpdateAssetAugmentMedia;
}

export const useUpdateAssetAugmentMedia = (
  mutationOptions?: MutationOptions<AssetAugmentMediaResult, Error, UpdateAssetAugmentMediaDto, unknown>
) => {
  return useMutation({
    mutationKey: ['updateAssetAugmentMedia'],
    mutationFn: async ({ mediaId, body }: UpdateAssetAugmentMediaDto) => {
      return await updateAssetAugmentMedia(mediaId, body);
    },
    ...mutationOptions
  });
};
