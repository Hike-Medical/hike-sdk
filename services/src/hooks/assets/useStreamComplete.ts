import { Asset, StreamCompleteParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { handleStreamComplete } from '../../api/asset.service';
import { HikeError } from '../../errors/HikeError';

interface StreamCompleteContext {
  assetId: string;
  params: StreamCompleteParams;
}

export const useStreamComplete = (
  mutationOptions?: UseMutationOptions<Asset, HikeError<null>, StreamCompleteContext>
) =>
  useMutation({
    mutationKey: ['streamComplete'],
    mutationFn: ({ assetId, params }) => handleStreamComplete(assetId, params),
    ...mutationOptions
  });
