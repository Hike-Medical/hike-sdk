import { HikeError, handleStreamComplete } from '@hike/services';
import { Asset, StreamCompleteParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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
