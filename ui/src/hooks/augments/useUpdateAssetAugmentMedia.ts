import { updateAssetAugmentMedia } from '@hike/services';
import { AssetAugmentMediaResult, UpdateAssetAugmentMedia } from '@hike/types';
import { MutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateAssetAugmentMediaDto {
  mediaId: string;
  body: UpdateAssetAugmentMedia;
}

export const useUpdateAssetAugmentMedia = (
  mutationOptions?: MutationOptions<AssetAugmentMediaResult, Error, UpdateAssetAugmentMediaDto>
) =>
  useMutation({
    mutationKey: ['updateAssetAugmentMedia'],
    mutationFn: async ({ mediaId, body }) => await updateAssetAugmentMedia(mediaId, body),
    ...mutationOptions
  });
