import { handleStreamComplete } from '@hike/services';
import { Asset, HikeError, StreamCompleteParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface StreamCompleteContext {
  assetId: string;
  params: StreamCompleteParams;
}

export const useStreamComplete = (options?: UseMutationOptions<Asset, HikeError<null>, StreamCompleteContext>) =>
  useMutation({
    mutationKey: ['streamComplete'],
    mutationFn: ({ assetId, params }) => handleStreamComplete(assetId, params),
    ...options
  });
