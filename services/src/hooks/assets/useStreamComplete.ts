import { StreamCompleteParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { handleStreamComplete } from '../../api/asset.service';
import { HikeError } from '../../errors/HikeError';

interface StreamCompleteContext {
  assetId: string;
  params: StreamCompleteParams;
}

export const useStreamComplete = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, StreamCompleteContext>
) => {
  return useMutation({
    mutationKey: ['streamComplete'],
    mutationFn: ({ assetId, params }: StreamCompleteContext) => handleStreamComplete(assetId, params),
    ...mutationOptions
  });
};
